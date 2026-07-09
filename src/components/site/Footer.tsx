import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

// TikTok tidak ada di lucide — inline SVG kecil
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5 3a5.5 5.5 0 0 0 5 5v3a8.4 8.4 0 0 1-5-1.6V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a3 3 0 1 0 2 2.8V3h3z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://instagram.com/pantaijolosutro", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/pantaijolosutro", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com/@pantaijolosutro", label: "TikTok", Icon: TikTokIcon },
  { href: "https://youtube.com/@pantaijolosutro", label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer id="kontak" className="bg-[oklch(0.22_0.05_240)] text-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">Pantai Jolosutro</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Destinasi wisata pantai selatan Blitar yang asri, bersih, dan ramah keluarga.
            Dikelola bersama warga Desa Ringinrejo, Kecamatan Wates.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">Kontak</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-secondary" />
              <span>Desa Ringinrejo, Kec. Wates, Kabupaten Blitar, Jawa Timur 66194</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-secondary" />
              <a href="tel:+6281234567890" className="hover:text-white">+62 812-3456-7890 (Pengelola)</a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-secondary" />
              <a href="mailto:info@pantaijolosutro.id" className="hover:text-white">info@pantaijolosutro.id</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">Jam Operasional</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Senin – Minggu: 06.00 – 18.00 WIB</li>
            <li>Tiket masuk: <span className="font-semibold text-white">GRATIS</span></li>
            <li>Parkir: Motor Rp 2.000 • Mobil Rp 5.000</li>
          </ul>
          <div className="mt-5">
            <Link
              to="/blog"
              className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
              Baca Blog Kami
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} Pengelola Wisata Pantai Jolosutro. All rights reserved.</p>
          <p>
            Desa Ringinrejo · Kecamatan Wates · Kabupaten Blitar · Jawa Timur ·{" "}
            <Link to="/auth" className="underline underline-offset-2 hover:text-white">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
