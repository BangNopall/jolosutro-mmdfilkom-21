import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { getAllPublishedPosts } from "@/lib/public.functions";

const allPostsQuery = queryOptions({
  queryKey: ["posts", "all"],
  queryFn: () => getAllPublishedPosts(),
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(allPostsQuery),
  head: () => ({
    meta: [
      { title: "Blog — Pantai Jolosutro" },
      { name: "description", content: "Kumpulan artikel, cerita, dan berita seputar Pantai Jolosutro, Wates, Blitar." },
    ],
  }),
  component: BlogList,
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Tidak ditemukan.</div>,
});

function fmt(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function BlogList() {
  const { data: posts } = useSuspenseQuery(allPostsQuery);
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>
          <h1 className="mt-4 font-display text-4xl font-bold text-primary md:text-6xl">Blog Pantai Jolosutro</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
            Cerita, informasi, dan pengumuman terbaru dari kawasan Pantai Jolosutro.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.length === 0 && <p className="text-muted-foreground">Belum ada artikel.</p>}
            {posts.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-3xl bg-card shadow-card transition-transform hover:-translate-y-1">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover_image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70"}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {fmt(p.published_at || p.created_at)}
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.title}</Link>
                  </h2>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
