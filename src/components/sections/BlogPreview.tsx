import { Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getRecentPosts, type PublicPost } from "@/lib/public.functions";

export const recentPostsQuery = queryOptions({
  queryKey: ["posts", "recent", 3],
  queryFn: () => getRecentPosts({ data: { limit: 3 } }),
});

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function excerpt(post: PublicPost) {
  const src = post.excerpt || post.content || "";
  const clean = src.replace(/[#*_>`]/g, "").trim();
  return clean.length > 150 ? clean.slice(0, 150).trim() + "..." : clean;
}

export function BlogPreview() {
  const { data: posts } = useSuspenseQuery(recentPostsQuery);

  return (
    <section id="blog" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              Blog & Berita
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
              Cerita Terbaru dari Pantai Jolosutro
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
          >
            Lihat Semua Artikel <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.length === 0 && (
            <p className="text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
          )}
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-transform duration-300 hover:-translate-y-1">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover_image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70"}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(p.published_at || p.created_at)}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{excerpt(p)}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
                  >
                    Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
