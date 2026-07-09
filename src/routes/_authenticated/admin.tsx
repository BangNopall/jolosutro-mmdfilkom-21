import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllPosts, savePost, togglePublish, deletePost,
  listFeedback, deleteFeedback,
  type AdminPost, type FeedbackRow,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Dashboard Admin — Pantai Jolosutro" }] }),
  component: Admin,
});

function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 200);
}

function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"blog" | "feedback">("blog");

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /></Link>
            <h1 className="font-display text-lg font-bold text-primary md:text-xl">Dashboard Admin</h1>
          </div>
          <button onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-3 md:px-6">
          {[
            { id: "blog", label: "Kelola Blog" },
            { id: "feedback", label: "Kritik & Saran" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as never)}
              className={"rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
                (tab === t.id ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/70")}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {tab === "blog" ? <BlogAdmin /> : <FeedbackAdmin />}
      </div>
    </main>
  );
}

function BlogAdmin() {
  const qc = useQueryClient();
  const list = useServerFn(listAllPosts);
  const save = useServerFn(savePost);
  const toggle = useServerFn(togglePublish);
  const del = useServerFn(deletePost);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => list(),
  });

  const [editing, setEditing] = useState<Partial<AdminPost> | null>(null);
  const [autoSlug, setAutoSlug] = useState(true);

  function newPost() {
    setEditing({ title: "", slug: "", cover_image: "", excerpt: "", content: "", author: "Admin Pantai Jolosutro", is_published: false });
    setAutoSlug(true);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      await save({ data: {
        id: editing.id, title: editing.title || "", slug: editing.slug || "",
        cover_image: editing.cover_image || "", excerpt: editing.excerpt || "",
        content: editing.content || "", author: editing.author || "Admin Pantai Jolosutro",
        is_published: !!editing.is_published,
      }});
      toast.success("Tersimpan.");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan.");
    }
  }

  async function onToggle(p: AdminPost) {
    await toggle({ data: { id: p.id, is_published: !p.is_published } });
    qc.invalidateQueries({ queryKey: ["admin", "posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  }

  async function onDelete(p: AdminPost) {
    if (!confirm(`Hapus "${p.title}"?`)) return;
    await del({ data: { id: p.id } });
    qc.invalidateQueries({ queryKey: ["admin", "posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-primary">Kelola Blog</h2>
        <button onClick={newPost}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Post Baru
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-accent/60 text-left">
            <tr>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Dibuat</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Memuat...</td></tr>}
            {!isLoading && posts.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Belum ada post.</td></tr>}
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-border/60">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">/{p.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={"rounded-full px-2 py-0.5 text-xs font-medium " +
                    (p.is_published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onToggle(p)} title={p.is_published ? "Unpublish" : "Publish"}
                      className="rounded-lg p-2 hover:bg-accent">
                      {p.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button onClick={() => { setEditing(p); setAutoSlug(false); }} title="Edit"
                      className="rounded-lg p-2 hover:bg-accent"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => onDelete(p)} title="Hapus"
                      className="rounded-lg p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={onSave} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-card p-6 shadow-soft">
            <h3 className="font-display text-xl font-bold text-primary">{editing.id ? "Edit Post" : "Post Baru"}</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Judul</label>
                <input required value={editing.title || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setEditing({ ...editing, title: v, slug: autoSlug ? slugify(v) : editing.slug });
                  }}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Slug</label>
                <input required value={editing.slug || ""}
                  onChange={(e) => { setAutoSlug(false); setEditing({ ...editing, slug: e.target.value }); }}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Cover Image URL</label>
                <input type="url" value={editing.cover_image || ""}
                  onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Excerpt</label>
                <textarea rows={2} value={editing.excerpt || ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Konten (Markdown)</label>
                <textarea rows={12} value={editing.content || ""}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 font-mono text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Penulis</label>
                <input value={editing.author || ""}
                  onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!editing.is_published}
                  onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
                Publish sekarang
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)}
                className="rounded-full border border-input bg-background px-4 py-2 text-sm hover:bg-accent">Batal</button>
              <button type="submit"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function FeedbackAdmin() {
  const qc = useQueryClient();
  const list = useServerFn(listFeedback);
  const del = useServerFn(deleteFeedback);
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", "feedback"],
    queryFn: () => list(),
  });

  async function onDelete(f: FeedbackRow) {
    if (!confirm(`Hapus masukan dari ${f.name}?`)) return;
    await del({ data: { id: f.id } });
    qc.invalidateQueries({ queryKey: ["admin", "feedback"] });
  }

  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-primary">Kritik & Saran Masuk</h2>
      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-accent/60 text-left">
            <tr>
              <th className="px-4 py-3">Nama / Email</th>
              <th className="px-4 py-3">Pesan</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Memuat...</td></tr>}
            {!isLoading && rows.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Belum ada masukan.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/60 align-top">
                <td className="px-4 py-3">
                  <div className="font-medium">{r.name}</div>
                  {r.email && <div className="text-xs text-muted-foreground">{r.email}</div>}
                </td>
                <td className="px-4 py-3 max-w-md whitespace-pre-wrap">{r.message}</td>
                <td className="px-4 py-3">
                  {r.rating ? (
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  ) : <span className="text-muted-foreground">-</span>}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(r.created_at).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onDelete(r)}
                    className="rounded-lg p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
