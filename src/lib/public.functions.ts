import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function serverPublicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type PublicPost = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  excerpt: string | null;
  content: string | null;
  author: string;
  published_at: string | null;
  created_at: string;
};

export const getRecentPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(20).optional() }).parse(input ?? {}),
  )
  .handler(async ({ data }): Promise<PublicPost[]> => {
    const supabase = serverPublicClient();
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, cover_image, excerpt, content, author, published_at, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(data.limit ?? 3);
    if (error) throw new Error(error.message);
    return posts ?? [];
  });

export const getAllPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicPost[]> => {
    const supabase = serverPublicClient();
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, cover_image, excerpt, content, author, published_at, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false });
    if (error) throw new Error(error.message);
    return posts ?? [];
  },
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }): Promise<PublicPost | null> => {
    const supabase = serverPublicClient();
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, cover_image, excerpt, content, author, published_at, created_at")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post;
  });

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100),
  email: z.string().trim().email("Email tidak valid").max(255).optional().or(z.literal("")),
  message: z.string().trim().min(3, "Pesan minimal 3 karakter").max(2000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
});

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => feedbackSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = serverPublicClient();
    const { error } = await supabase.from("feedback").insert({
      name: data.name,
      email: data.email ? data.email : null,
      message: data.message,
      rating: data.rating ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
