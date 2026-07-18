import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractCloudinaryPublicId,
} from "@/lib/cloudinary.server";

async function assertAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: not an admin");
}

export type AdminPost = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  excerpt: string | null;
  content: string | null;
  author: string;
  is_published: boolean;
  created_at: string;
  published_at: string | null;
};

export const listAllPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminPost[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminPost[];
  });

export const checkSlugAvailability = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        slug: z.string().min(1),
        excludeId: z.string().uuid().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    let query = context.supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", data.slug)
      .limit(1);
    if (data.excludeId) {
      query = query.neq("id", data.excludeId);
    }
    const { data: existing, error } = await query;
    if (error) throw new Error(error.message);
    return { available: !existing || existing.length === 0 };
  });

const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan tanda hubung"),
  cover_image: z.string().trim().max(500).optional().or(z.literal("")),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().max(200000).optional().or(z.literal("")),
  author: z.string().trim().min(1).max(100),
  is_published: z.boolean(),
});

export const savePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => postSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const payload = {
      title: data.title,
      slug: data.slug,
      cover_image: data.cover_image || null,
      excerpt: data.excerpt || null,
      content: data.content || null,
      author: data.author,
      is_published: data.is_published,
      published_at: data.is_published ? new Date().toISOString() : null,
    };
    if (data.id) {
      // Fetch the old post to check if cover_image changed
      const { data: oldPost } = await context.supabase
        .from("blog_posts")
        .select("cover_image")
        .eq("id", data.id)
        .single();

      const oldImage = oldPost?.cover_image ?? null;
      const newImage = data.cover_image || null;

      // Best-effort: delete old Cloudinary image if it changed
      if (oldImage && oldImage !== newImage) {
        const publicId = extractCloudinaryPublicId(oldImage);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      const { error } = await context.supabase.from("blog_posts").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }
    const { data: inserted, error } = await context.supabase
      .from("blog_posts")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: inserted!.id };
  });

export const togglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), is_published: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("blog_posts")
      .update({
        is_published: data.is_published,
        published_at: data.is_published ? new Date().toISOString() : null,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    // Fetch cover_image before deleting so we can clean up Cloudinary
    const { data: post } = await context.supabase
      .from("blog_posts")
      .select("cover_image")
      .eq("id", data.id)
      .single();

    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    // Best-effort: delete image from Cloudinary after DB delete succeeds
    if (post?.cover_image) {
      const publicId = extractCloudinaryPublicId(post.cover_image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    return { ok: true as const };
  });

export const uploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        base64: z.string().min(1),
        filename: z.string().min(1).max(255),
        mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { url, publicId } = await uploadToCloudinary(data.base64, "jolosutro/blog");
    return { url, publicId };
  });

export type FeedbackRow = {
  id: string;
  name: string;
  email: string | null;
  message: string;
  rating: number | null;
  created_at: string;
};

export const listFeedback = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<FeedbackRow[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as FeedbackRow[];
  });

export const deleteFeedback = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("feedback").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
