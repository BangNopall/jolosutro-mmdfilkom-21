import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getPostBySlug } from "@/lib/public.functions";
import { formatDate } from "@/lib/utils";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", "slug", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Pantai Jolosutro` },
          { name: "description", content: loaderData.excerpt || loaderData.title },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt || "" },
          ...(loaderData.cover_image
            ? [
                { property: "og:image", content: loaderData.cover_image },
                { name: "twitter:image", content: loaderData.cover_image },
              ]
            : []),
        ]
      : [],
  }),
  component: PostPage,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p>Artikel tidak ditemukan.</p>
      <Link to="/blog" className="mt-3 inline-block text-primary underline">Kembali ke Blog</Link>
    </div>
  ),
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  if (!post) return null;
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-4 md:px-6">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary">
            <ArrowLeft className="h-4 w-4" /> Semua Artikel
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-primary md:text-5xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formatDate(post.published_at || post.created_at)}</span>
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
          </div>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="mt-6 w-full rounded-3xl object-cover shadow-card" loading="lazy" />
          )}
          {post.excerpt && <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>}
          <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-primary">
            <ReactMarkdown>{post.content || ""}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
