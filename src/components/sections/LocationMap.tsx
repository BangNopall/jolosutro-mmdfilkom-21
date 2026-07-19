import { Reveal } from "@/components/site/Reveal";
import { MapPin, Clock, Ticket } from "lucide-react";

export function LocationMap() {
  return (
    <section id="lokasi" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-5 md:px-6">
        <Reveal className="md:col-span-2">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Lokasi
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            Cara Menuju Pantai Jolosutro
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Berlokasi di pesisir selatan Kabupaten Blitar, ± 45 km dari pusat kota Blitar. Dapat
            diakses dengan sepeda motor maupun mobil pribadi.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Alamat</div>
                <p className="text-sm text-muted-foreground">
                  Desa Ringinrejo, Kecamatan Wates, Kabupaten Blitar, Jawa Timur 66194
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Jam Buka</div>
                <p className="text-sm text-muted-foreground">Setiap hari, 06.00 – 18.00 WIB</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Ticket className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Retribusi</div>
                <p className="text-sm text-muted-foreground">
                  Tiket masuk GRATIS · Parkir Motor Rp 2.000 · Mobil Rp 5.000
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={100} className="md:col-span-3">
          {/*
            Wrapper dikunci ke rasio asli gambar frame (2400x1792 ≈ 4:3)
            supaya persentase padding di bawah selalu pas dengan garis
            border seashell, di semua ukuran layar.
          */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl">
            {/* Layer 1: frame seashell, tampil utuh tanpa terpotong */}
            <img
              src="/seashell-frame.png"
              alt="Frame dekoratif seashell"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain"
            />

            {/* Layer 2: peta, diposisikan pas di area kosong tengah frame */}
            <div className="absolute inset-[20%_15%_18%_15%] overflow-hidden rounded-md z-10">
              <iframe
                title="Peta Lokasi Pantai Jolosutro"
                src="https://maps.google.com/maps?q=Pantai+Jolosutro+Ringinrejo+Wates+Blitar&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}