import { Reveal } from "@/components/site/Reveal";
import { ShieldCheck, HeartHandshake, Leaf } from "lucide-react";

const GALLERY = [
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=70",
];

const POINTS = [
  { icon: ShieldCheck, title: "Perlindungan Habitat", text: "Menjaga kawasan bertelur agar tetap alami dan aman dari gangguan." },
  { icon: HeartHandshake, title: "Kolaborasi Warga", text: "Warga desa dan pengelola bahu-membahu memantau serta merawat tukik hingga siap dilepasliarkan." },
  { icon: Leaf, title: "Edukasi Wisatawan", text: "Sosialisasi kepada pengunjung untuk tidak membuang sampah dan menjaga habitat penyu." },
];

export function Conservation() {
  return (
    <section id="konservasi" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-6">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80"
              alt="Penyu di pantai"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-soft md:block">
              <div className="font-display text-2xl font-bold">Konservasi Aktif</div>
              <div className="text-xs opacity-90">Bersama warga Desa Ringinrejo</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="inline-flex rounded-full bg-secondary/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Konservasi Penyu
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            Menjaga Rumah Penyu di Pesisir Selatan Blitar
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Pantai Jolosutro merupakan salah satu titik penting bertelurnya penyu
            di pesisir selatan Kabupaten Blitar. Bersama warga, pengelola menjaga
            habitat, memantau sarang telur, dan melepasliarkan tukik yang telah
            menetas ke laut lepas.
          </p>

          <ul className="mt-6 space-y-4">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/30 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{title}</div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Kegiatan konservasi ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover shadow-card"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
