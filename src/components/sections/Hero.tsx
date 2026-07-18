import { ChevronDown, MapPin } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Panorama pantai tropis"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.25_0.08_240/0.55)] via-[oklch(0.2_0.06_240/0.35)] to-[oklch(0.15_0.05_240/0.85)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 pb-16 text-center text-white md:px-6">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur md:text-sm">
            🎟️ Tiket Masuk GRATIS
          </span>
          <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur md:text-sm">
            🚗 Area Parkir Luas
          </span>
        </div>

        <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight drop-shadow md:text-7xl lg:text-8xl">
          Pantai Jolosutro
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-xl">
          Pesona Pantai Selatan Blitar yang asri, bersih, dan ramah keluarga.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/75 md:text-sm">
          <MapPin className="h-4 w-4" />
          Desa Ringinrejo, Kec. Wates, Kab. Blitar — Jawa Timur
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#fasilitas"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105 md:text-base"
          >
            Jelajahi Fasilitas
          </a>
          <a
            href="#video"
            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 md:text-base"
          >
            ▶ Tonton Video
          </a>
        </div>
      </div>

      <a
        href="#tentang"
        aria-label="Gulir ke bawah"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80 hover:text-white"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
      <div className="absolute bottom-0 z-0 h-[12rem] w-full bg-gradient-to-t from-[#faf4e6] via-[#faf4e6]/60 to-[#faf4e6]/0"></div>
    </section>
  );
}
