import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getPostBySlug, getRecommendedPosts } from "@/lib/public.functions";
import { formatDate } from "@/lib/utils";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", "slug", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

const recommendedQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", "recommended", slug],
    queryFn: () => getRecommendedPosts({ data: { excludeSlug: slug, limit: 3 } }),
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
  const { data: recommendedPosts } = useSuspenseQuery(recommendedQuery(slug));
  const wavePattern = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 200' width='80' height='200'>
      <path d='M0 0 v200 h55 Q80 150 55 100 Q30 50 55 0 z' fill='#72d3e4' opacity='0.3'/>
      <path d='M0 0 v200 h40 Q60 150 40 100 Q20 50 40 0 z' fill='#72d3e4'/>
    </svg>
  `);
  if (!post) return null;
  return (
    <>
      <Navbar variant="solid" />
      <main className="relative min-h-screen bg-background pt-24 pb-20">
        <div className="absolute left-0 top-0 z-0 hidden h-full w-[20rem] flex-row md:flex">
          <div className="h-full flex-1 bg-[#72d3e4]"></div>
          <div 
            className="h-full w-[5rem]"
            style={{
              backgroundImage: `url("data:image/svg+xml,${wavePattern}")`,
              backgroundRepeat: "repeat-y",
              backgroundSize: "100% auto"
            }}
          ></div>
          
        </div>
        <div className="mx-auto max-w-[86rem] px-4 md:px-6">
          <div className="grid gap-5  md:grid-cols-[20rem_minmax(0,1fr)_20rem] md:justify-center">
            <aside></aside>
            <article className="mx-auto w-full">
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

            <aside className="mx-auto w-full max-w-[16rem] md:max-w-none">
              <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
                <div className="mb-5">
                  <p className="text-sm font-semibold text-primary">Rekomendasi Artikel</p>
                  <p className="mt-1 text-sm text-muted-foreground">Baca artikel lain yang mungkin menarik.</p>
                </div>

                {recommendedPosts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada rekomendasi lain saat ini.</p>
                ) : (
                  <div className="space-y-4">
                    {recommendedPosts.map((item) => (
                      <Link
                        key={item.id}
                        to="/blog/$slug"
                        params={{ slug: item.slug }}
                        className="block rounded-3xl border border-border bg-background p-4 transition hover:-translate-y-0.5"
                      >
                        <div className="flex flex-col  justify-between gap-2">
                          <h2 className="text-sm font-semibold text-primary">{item.title}</h2>
                          <span className="text-xs text-muted-foreground">{formatDate(item.published_at || item.created_at)}</span>
                        </div>
                        
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
