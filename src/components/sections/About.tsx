import { Reveal } from "@/components/site/Reveal";

const GALLERY = [
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=70",
];

const STATS = [
  { value: "GRATIS", label: "Tiket Masuk" },
  { value: "Setiap Hari", label: "Buka" },
  { value: "Luas", label: "Area Parkir" },
  { value: "1 KM+", label: "Garis Pantai" },
];

export function About() {
  return (
    <section id="tentang" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <Reveal className="flex flex-col justify-center">
          <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Tentang Kami
          </span>
          <h2 className="font-display text-3xl font-bold text-primary md:text-5xl">
            Pantai Selatan yang Bersih & Ramah Keluarga
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Pantai Jolosutro terletak di Desa Ringinrejo, Kecamatan Wates, Kabupaten
            Blitar. Terkenal dengan hamparan pasirnya yang bersih, ombak selatan
            yang khas, serta program konservasi penyu aktif yang dijalankan warga
            sekitar bersama pengelola.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Tempat ini cocok untuk liburan keluarga, memancing, berkemah, hingga
            menikmati kuliner khas pesisir bersama pelaku UMKM setempat.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-card p-4 text-center shadow-card"
              >
                <div className="font-display text-lg font-bold text-primary md:text-xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="grid grid-cols-2 gap-3 md:gap-4">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className={
                "overflow-hidden rounded-3xl shadow-card " +
                (i === 0 ? "row-span-2 h-full" : "h-40 md:h-48")
              }
            >
              <img
                src={src}
                alt={`Foto Pantai Jolosutro ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
