import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#fasilitas", label: "Fasilitas" },
  { href: "#konservasi", label: "Konservasi Penyu" },
  { href: "#ecopark", label: "EcoPark" },
  { href: "#kuliner", label: "Kuliner" },
  { href: "#blog", label: "Blog" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar({ variant = "landing" }: { variant?: "landing" | "solid" }) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isLanding = variant === "landing";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link
          to="/"
          className={cn(
            "font-display text-lg font-bold tracking-tight md:text-xl",
            scrolled ? "text-primary" : isLanding ? "text-white" : "text-primary",
          )}
        >
          Pantai Jolosutro
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={isLanding ? n.href : `/${n.href}`}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground/80 hover:bg-accent hover:text-primary"
                  : isLanding
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-foreground/80 hover:bg-accent hover:text-primary",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={isLanding ? "#lokasi" : "/#lokasi"}
            className={cn(
              "hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all md:inline-flex",
              scrolled
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                : isLanding
                  ? "border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  : "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <MapPin className="h-4 w-4" />
            Lihat Lokasi
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : isLanding
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-primary/10 text-primary hover:bg-primary/20",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300",
          open ? "max-h-[540px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={isLanding ? n.href : `/${n.href}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 hover:bg-accent hover:text-primary"
            >
              {n.label}
            </a>
          ))}
          <a
            href={isLanding ? "#lokasi" : "/#lokasi"}
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <MapPin className="h-4 w-4" /> Lihat Lokasi
          </a>
        </nav>
      </div>
    </header>
  );
}
