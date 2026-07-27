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
      { property: "og:image", content: "https://www.pantaijolosutro.site/img/jolosutro-background.png" },
      { name: "twitter:image", content: "https://www.pantaijolosutro.site/img/jolosutro-background.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pantai Jolosutro",
          url: "https://www.pantaijolosutro.site/",
          description: "Website resmi Pantai Jolosutro, Desa Ringinrejo, Wates, Blitar. Pesona pantai selatan yang asri, bersih, ramah keluarga, dengan program konservasi penyu.",
          publisher: {
            "@type": "Organization",
            name: "Pengelola Pantai Jolosutro",
            logo: {
              "@type": "ImageObject",
              url: "https://www.pantaijolosutro.site/favicon.ico"
            }
          }
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: "Pantai Jolosutro",
          description: "Pesona pantai selatan yang asri, bersih, ramah keluarga, dengan program konservasi penyu.",
          url: "https://www.pantaijolosutro.site/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Desa Ringinrejo, Kecamatan Wates",
            addressLocality: "Blitar",
            addressRegion: "Jawa Timur",
            addressCountry: "ID"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -8.3183,
            longitude: 112.3828
          },
          publicAccess: true
        })
      }
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
