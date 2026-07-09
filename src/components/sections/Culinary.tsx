import { Reveal } from "@/components/site/Reveal";

const UMKM = [
  { name: "Warung Bu Sri", food: "Nasi Pecel & Ikan Bakar", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=70" },
  { name: "Kedai Segoro", food: "Sea Food & Kelapa Muda", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=70" },
  { name: "Warung Pak Tarno", food: "Sate Ayam & Gule", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=70" },
  { name: "Kopi Ombak", food: "Kopi Nusantara & Cemilan", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=70" },
  { name: "Warung Ibu Yati", food: "Bakso & Mie Ayam", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=70" },
  { name: "Es Degan Jolosutro", food: "Es Kelapa & Jus Buah", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=70" },
];

export function Culinary() {
  return (
    <section id="kuliner" className="bg-accent/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Kuliner & UMKM
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            Kuliner & UMKM Pantai Jolosutro
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Nikmati sajian khas pesisir sekaligus mendukung ekonomi warga sekitar
            melalui warung-warung UMKM lokal di sepanjang kawasan pantai.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {UMKM.map((u, i) => (
            <Reveal key={u.name} delay={i * 60}>
              <article className="group overflow-hidden rounded-3xl bg-card shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={u.img}
                    alt={u.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{u.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{u.food}</p>
                  <span className="mt-3 inline-flex rounded-full bg-secondary/30 px-3 py-1 text-xs font-semibold text-primary">
                    UMKM Lokal
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
