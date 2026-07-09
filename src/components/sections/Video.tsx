import { Reveal } from "@/components/site/Reveal";

export function Video() {
  return (
    <section id="video" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Company Profile
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-5xl">
            Kenali Lebih Dekat Pantai Jolosutro
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Saksikan sekilas keindahan pantai, kegiatan warga, dan program konservasi
            dalam video singkat berikut.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-border/50">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                title="Video Company Profile Pantai Jolosutro"
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/ScMzIvxBSi4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
