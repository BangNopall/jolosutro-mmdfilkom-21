import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Star, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { submitFeedback } from "@/lib/public.functions";

export function Feedback() {
  const submit = useServerFn(submitFeedback);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Nama dan pesan wajib diisi.");
      return;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Format email tidak valid.");
      return;
    }
    setBusy(true);
    try {
      await submit({ data: { name, email, message, rating: rating || null } });
      toast.success("Terima kasih! Masukan Anda telah kami terima.");
      setName(""); setEmail(""); setMessage(""); setRating(0);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengirim.";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="masukan"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.60 0.16 235) 0%, oklch(0.72 0.14 220) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-5 md:px-6">
        <Reveal className="md:col-span-2 text-white">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            Kritik & Saran
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Suara Anda Membantu Kami Berbenah
          </h2>
          <p className="mt-4 max-w-md text-white/90 md:text-lg">
            Sampaikan pesan, kesan, atau saran Anda setelah berkunjung ke Pantai
            Jolosutro. Setiap masukan akan menjadi bahan evaluasi bagi pengelola
            dan warga.
          </p>
        </Reveal>

        <Reveal delay={100} className="md:col-span-3">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-card p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Nama <span className="text-destructive">*</span></label>
                <input
                  type="text" required maxLength={100}
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none ring-primary/20 transition focus:ring-4"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email (opsional)</label>
                <input
                  type="email" maxLength={255}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none ring-primary/20 transition focus:ring-4"
                  placeholder="email@contoh.com"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-foreground">
                Kritik & Saran <span className="text-destructive">*</span>
              </label>
              <textarea
                required minLength={3} maxLength={2000} rows={5}
                value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-y rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none ring-primary/20 transition focus:ring-4"
                placeholder="Ceritakan pengalaman & saran Anda..."
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-medium">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n === rating ? 0 : n)}
                    aria-label={`Beri ${n} bintang`}
                    className="rounded-full p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={
                        "h-6 w-6 " +
                        (n <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {busy ? "Mengirim..." : "Kirim Masukan"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
