import { Reveal } from "@/components/site/Reveal";
import { Sprout, BookOpen, Bike } from "lucide-react";
import { WavePatternTop } from "../ui/wave-pattern/WavePattern";

const GALLERY = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1470114716159-e389f8712fda?auto=format&fit=crop&w=800&q=70",
];

const FEATURES = [
  { icon: Sprout, title: "Area Hijau", desc: "Ruang terbuka teduh dengan pepohonan pantai, cocok untuk piknik keluarga." },
  { icon: BookOpen, title: "Spot Edukasi Lingkungan", desc: "Papan informasi ekosistem pesisir & konservasi penyu untuk pengunjung." },
  { icon: Bike, title: "Jalur Santai", desc: "Jalur pejalan kaki mengelilingi area EcoPark yang nyaman & aman." },
];

export function EcoPark() {
  return (
    <section id="ecopark" className="relative bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            EcoPark
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            EcoPark Pantai Jolosutro
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Kawasan wisata ramah lingkungan yang memadukan keindahan pantai,
            edukasi, serta ruang publik yang nyaman bagi keluarga.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border/60 bg-card p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
          {GALLERY.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Foto EcoPark ${i + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
          ))}
        </Reveal>
      </div>
        <WavePatternTop/>
    </section>
  );
}
