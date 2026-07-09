# Website Resmi Pantai Jolosutro — Final Plan

Website pariwisata single-page + sistem blog + admin dashboard, terintegrasi Lovable Cloud (database, auth, storage). Semua konfirmasi kamu sudah dimasukkan.

## Stack

TanStack Start + React + TS + Tailwind v4 + shadcn/ui + Lovable Cloud (Supabase di balik layar untuk DB, Auth, Storage). Routing pakai file-based routing TanStack (`src/routes/`) — fungsinya sama dengan React Router.

## Design system

- Palet warna sebagai token oklch di `src/styles.css` (dipakai lewat `bg-primary`, `bg-secondary`, `bg-accent`, `bg-background`, bukan hex hardcoded):
  - Primary `#008DDA`, Secondary `#41C9E2`, Accent `#ACE2E1`, Background `#F7EEDD`
- Font Poppins (heading) + Inter (body) via `<link>` Google Fonts di `__root.tsx`
- Kartu rounded, shadow lembut, animasi fade-in/slide-up saat scroll (Intersection Observer), ikon `lucide-react`

## Halaman & routing

**`/` — landing single-page, smooth-scroll** dengan 12 section: Navbar sticky (transparan→solid, drawer mobile, CTA "Lihat Lokasi"), Hero full-bleed, Tentang (2 kolom + statistik), Fasilitas (10 kartu icon, bg accent), Konservasi Penyu, EcoPark, UMKM Kuliner (6 kartu dummy), Video comprof (YouTube embed), Preview Blog (3 post terbaru), Maps, Kritik & Saran, Footer.

**Halaman lain:**
- `/blog` — list semua post published + pagination
- `/blog/$slug` — detail artikel (markdown via `react-markdown`, OG image dari `cover_image`)
- `/auth` — form login admin email + password (menggantikan `/admin/login`, konvensi integrasi Supabase Lovable)
- `/_authenticated/admin` — dashboard admin (auth gate managed oleh integrasi), 2 tab: "Kelola Blog" (CRUD + toggle publish + upload cover ke Storage) & "Kritik & Saran Masuk" (tabel + hapus) + tombol logout

## Konfirmasi kamu yang di-apply

**Maps** — iframe `https://maps.google.com/maps?q=Pantai+Jolosutro+Ringinrejo+Wates+Blitar&output=embed` (tanpa koordinat manual).

**Footer sosmed** — link placeholder: Instagram `pantaijolosutro`, Facebook `pantaijolosutro`, TikTok `@pantaijolosutro`, YouTube `@pantaijolosutro`.

**Seed 3 akun admin** — dibuat lewat migration pakai Supabase Auth Admin API di dalam `DO $$ ... $$` block (hash password via `crypt()`), lalu insert `user_roles` role `admin` untuk ketiganya. Semua punya akses penuh sama (satu level "authenticated admin", tanpa sub-role):
- `admin@pantaijolosutro.id` / `Jolosutro#2026`
- `konten1@pantaijolosutro.id` / `Jolosutro#2026`
- `konten2@pantaijolosutro.id` / `Jolosutro#2026`

**Konten & foto** — semua placeholder (Unsplash untuk foto, konten dummy Bahasa Indonesia realistis, 6 UMKM hardcoded, 3 artikel blog dummy `is_published = true`). Semuanya dapat diedit manual tanpa build ulang.

## Backend

**Tabel:**
- `blog_posts` — persis sesuai spek (id, title, slug unique, cover_image, excerpt, content, author, is_published, created_at, published_at)
- `feedback` — persis sesuai spek (id, name, email, message, rating 1–5 check, created_at)
- `user_roles` + enum `app_role` + fungsi `has_role()` (SECURITY DEFINER) — pola aman standar Lovable

**RLS + GRANT:**
- `blog_posts`: anon SELECT hanya `is_published = true`; admin (via `has_role`) full CRUD
- `feedback`: anon INSERT; admin SELECT/DELETE
- `user_roles`: user baca role sendiri; admin full manage

**Storage:** bucket publik `blog-images` untuk cover artikel (upload dari editor admin).

**Server functions (TanStack `createServerFn`):**
- Publik (server publishable client): `getPublishedPosts`, `getPostBySlug`, `submitFeedback` (validasi Zod) — dipakai loader `/`, `/blog`, `/blog/$slug` agar SSR & OG tag bekerja
- Admin (`requireSupabaseAuth` + cek `has_role('admin')`): CRUD post, list/delete feedback

## SEO

- `__root.tsx`: title & description Pantai Jolosutro (menggantikan default "Lovable App"), OG/Twitter tags
- `/blog` dan `/blog/$slug` masing-masing punya `head()` sendiri; `$slug` pakai `cover_image` sebagai OG image
- Hero `<h1>` tunggal, section pakai `<h2>`, `loading="lazy"` di semua `<img>` non-hero

## Urutan build

1. Aktifkan Lovable Cloud
2. Migration: enum + `user_roles` + `has_role()` + `blog_posts` + `feedback` + RLS + GRANT + seed 3 artikel + seed 3 akun admin
3. Buat bucket storage `blog-images`
4. Design tokens, font, meta di `styles.css` & `__root.tsx`
5. Komponen reusable (Navbar, Footer, SectionWrapper + hook animasi scroll)
6. Route `/` dengan semua 12 section
7. Server functions publik + `/blog` & `/blog/$slug`
8. `/auth` + dashboard admin `/_authenticated/admin` (2 tab, editor post + upload cover, tabel feedback)
9. Verifikasi build & smoke test lewat preview

Kalau plan ini sudah oke, klik **Implement plan** dan saya mulai build satu jalan.
