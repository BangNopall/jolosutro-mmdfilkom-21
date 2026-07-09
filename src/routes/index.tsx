import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Facilities } from "@/components/sections/Facilities";
import { Conservation } from "@/components/sections/Conservation";
import { EcoPark } from "@/components/sections/EcoPark";
import { Culinary } from "@/components/sections/Culinary";
import { Video } from "@/components/sections/Video";
import { BlogPreview, recentPostsQuery } from "@/components/sections/BlogPreview";
import { LocationMap } from "@/components/sections/LocationMap";
import { Feedback } from "@/components/sections/Feedback";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(recentPostsQuery),
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" },
    ],
  }),
  component: HomePage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-destructive">Gagal memuat: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-8">Halaman tidak ditemukan.</div>,
});

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Facilities />
        <Conservation />
        <EcoPark />
        <Culinary />
        <Video />
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Memuat artikel...</div>}>
          <BlogPreview />
        </Suspense>
        <LocationMap />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
