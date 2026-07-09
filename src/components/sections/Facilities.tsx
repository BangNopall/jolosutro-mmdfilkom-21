import { Reveal } from "@/components/site/Reveal";
import {
  Fish, Camera, Info, Bath, Church, Droplets, TreePine,
  Tent, Car, Waves,
} from "lucide-react";

const ITEMS = [
  { icon: Fish, label: "Spot Mancing" },
  { icon: Camera, label: "Spot Foto" },
  { icon: Info, label: "Pusat Informasi Wisata" },
  { icon: Bath, label: "Kamar Mandi / Toilet" },
  { icon: Church, label: "Mushola" },
  { icon: Droplets, label: "Fasilitas Air Bersih" },
  { icon: TreePine, label: "Area Bersantai" },
  { icon: Tent, label: "Area Camping" },
  { icon: Car, label: "Area Parkir Luas" },
  { icon: Waves, label: "Pantai Bersih" },
];

export function Facilities() {
  return (
    <section id="fasilitas" className="bg-accent/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Fasilitas
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            Lengkap & Nyaman untuk Semua Pengunjung
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Kami menyiapkan berbagai fasilitas dasar hingga area rekreasi supaya
            kunjungan Anda ke Pantai Jolosutro terasa aman dan menyenangkan.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {ITEMS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 40}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-card p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft md:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <div className="text-sm font-semibold text-foreground md:text-base">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
