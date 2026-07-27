import { Reveal } from "@/components/site/Reveal";

const UMKM = [
  { name: "Warung Denok", food: "Aneka Macam Seafood, Bakso & Mie ayam", price: "Rp10.000 - Rp100.000",img: "/images/kuliner/warung-denok.png" },
  { name: "Warung Abah Gatol", food: "Nasi Campur & Lalapan, Aneka Macam Seafood, & Minuman Segar", price: "Rp10.000 - Rp50.000",img: "/images/kuliner/warung-abah-gatol.png" },
  { name: "Warung Mbak Pila", food: "Nasi Campur & Minuman Segar",price: "Rp10.000 - Rp25.000", img: "/images/kuliner/warung-mbak-pila.png" },
  { name: "Warung Puntodewo", food: "Spesialis Gurita & Aneka Macam Seafood", price: "Rp20.000 - Rp100.000",img: "/images/kuliner/warung-puntodewo.png" },
  { name: "Warunge Mbak Yuni", food: "Soto, Rujak, & Minuman Segar", price: "Rp10.000 - Rp25.000",img: "/images/kuliner/warung-mbak-yuni.png" },
  { name: "Donut Taste", food: "Aneka Donat & Camilan", price: "Rp5.000 - Rp20.000",img: "/images/kuliner/donut-taste.png" },
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
                  <p className="mt-3 text-sm font-semibold text primary"> 💰 {u.price} </p>
                  <span className="mt-3 inline-flex rounded-full bg-second  </p>ary/30 px-3 py-1 text-xs font-semibold text-primary">
                    UMKM
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
