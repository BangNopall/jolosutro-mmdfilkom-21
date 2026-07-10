# 🏖️ Pantai Jolosutro — Website Resmi

Website resmi **Pantai Jolosutro**, destinasi wisata pantai selatan Jawa Timur yang terletak di Desa Ringinrejo, Kecamatan Wates, Kabupaten Blitar. Menampilkan informasi wisata lengkap, blog, program konservasi penyu, dan sistem manajemen konten untuk admin.

![Pantai Jolosutro](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Fitur

- **Landing Page** — Hero section, tentang pantai, fasilitas, konservasi penyu, EcoPark, kuliner UMKM, video company profile, peta lokasi, dan form kritik & saran
- **Blog Publik** — Daftar artikel dan halaman detail dengan konten Markdown
- **Form Feedback** — Pengunjung dapat mengirim pesan dan rating bintang (1–5)
- **Admin Dashboard** — CRUD artikel blog dan manajemen masukan pengunjung
- **Autentikasi** — Login email + password via Supabase Auth
- **RBAC** — Sistem role berbasis database (`admin`) dengan Row Level Security
- **SSR** — Server-Side Rendering dengan prefetch data di route loader
- **Scroll Animation** — Reveal on scroll via IntersectionObserver
- **Responsive** — Navbar mobile drawer, layout adaptif semua breakpoint
- **Dark Mode** — Dukungan tema gelap penuh
- **SEO** — Meta tags, Open Graph, Twitter Card, per-halaman head management

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| UI Framework | React 19 |
| Meta-framework (SSR) | TanStack Start |
| Routing | TanStack Router (file-based) |
| Server State | TanStack Query v5 |
| Backend / Auth / DB | Supabase (PostgreSQL) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (new-york) + Radix UI |
| Validasi | Zod |
| Bundler | Vite 8 |
| Server Runtime | Nitro (Cloudflare Workers) |
| Package Manager | npm |
| Language | TypeScript (strict) |

> Dokumentasi tech stack lengkap tersedia di [TECH_STACK.md](./TECH_STACK.md).

---

## 📁 Struktur Project

```
src/
├── routes/                      # File-based routing (auto-generated)
│   ├── __root.tsx               # Root layout: HTML shell, SEO, QueryClientProvider
│   ├── index.tsx                # Homepage (/)
│   ├── auth.tsx                 # Halaman login (/auth)
│   ├── blog.index.tsx           # Daftar artikel (/blog)
│   ├── blog.$slug.tsx           # Detail artikel (/blog/:slug)
│   └── _authenticated/
│       ├── route.tsx            # Route guard (redirect jika belum login)
│       └── admin.tsx            # Dashboard admin (/admin)
│
├── components/
│   ├── sections/                # 10 section homepage
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Facilities.tsx
│   │   ├── Conservation.tsx
│   │   ├── EcoPark.tsx
│   │   ├── Culinary.tsx
│   │   ├── Video.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── LocationMap.tsx
│   │   └── Feedback.tsx
│   ├── site/
│   │   ├── Navbar.tsx           # Sticky navbar + mobile drawer
│   │   ├── Footer.tsx
│   │   └── Reveal.tsx           # Scroll reveal wrapper (IntersectionObserver)
│   └── ui/                      # 46 komponen shadcn/ui
│
├── integrations/supabase/
│   ├── client.ts                # Browser Supabase client
│   ├── client.server.ts         # Server Supabase client (service role)
│   ├── auth-middleware.ts       # Validasi Bearer token di server functions
│   ├── auth-attacher.ts         # Attach JWT ke setiap serverFn RPC
│   └── types.ts                 # Auto-generated DB types
│
├── lib/
│   ├── public.functions.ts      # Server functions publik (blog, feedback)
│   ├── admin.functions.ts       # Server functions admin (CRUD blog & feedback)
│   └── utils.ts                 # Utility: cn(), formatDate()
│
├── hooks/
│   └── use-mobile.tsx           # Breakpoint hook
│
├── start.ts                     # Entry: middleware registration
├── server.ts                    # Cloudflare Worker handler
├── router.tsx                   # Router + QueryClient setup
└── styles.css                   # Tailwind v4 + design tokens + animations

supabase/
└── migrations/                  # SQL migrations (schema + RLS + seed data)
```

---

## 🚀 Memulai

### Prasyarat

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [npm](https://www.npmjs.com/) (sudah termasuk dalam Node.js)
- Akun [Supabase](https://supabase.com/) (project aktif)

### Instalasi

```bash
# Clone repository
git clone https://github.com/<username>/jolosutro-beach-guide.git
cd jolosutro-beach-guide

# Install dependencies
npm install
```

### Konfigurasi Environment

Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
SUPABASE_URL=https://<project-id>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

> **Catatan:** `VITE_*` digunakan untuk client-side (Vite build-time), sedangkan variabel tanpa prefix untuk server-side (SSR/serverFn).

### Menjalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🗄️ Setup Database

Jalankan semua migration Supabase secara berurutan:

```bash
# Dengan Supabase CLI (local)
supabase db push

# Atau jalankan manual di Supabase SQL Editor
# File ada di supabase/migrations/
```

Migration akan membuat:
- Tabel `blog_posts`, `feedback`, `user_roles`
- Enum `app_role` (`admin`)
- RLS policies untuk semua tabel
- Function `has_role()` (SECURITY DEFINER)
- Seed data: 3 artikel blog awal

### Membuat Admin Pertama

Setelah mendaftar/login, jalankan query berikut di Supabase SQL Editor:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user-uuid-dari-auth.users>', 'admin');
```

---

## 📜 Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan dev server |
| `npm run build` | Build production |
| `npm run preview` | Preview hasil build |
| `npm run lint` | Lint dengan ESLint |
| `npm run format` | Format dengan Prettier |
| `npx tsc --noEmit` | Type check |

---

## 🗺️ Halaman & Routing

| Route | Akses | Deskripsi |
|---|---|---|
| `/` | Publik | Homepage lengkap |
| `/blog` | Publik | Daftar semua artikel published |
| `/blog/:slug` | Publik | Detail artikel (render Markdown) |
| `/auth` | Publik | Halaman login admin |
| `/admin` | 🔒 Admin | Dashboard kelola blog & feedback |

---

## 🔐 Keamanan & Auth

Sistem autentikasi berlapis tiga:

1. **Route Guard** — `_authenticated/route.tsx` redirect ke `/auth` jika tidak ada sesi
2. **Server Middleware** — `requireSupabaseAuth` memvalidasi Bearer JWT di setiap server function
3. **RBAC Check** — `assertAdmin()` memanggil `has_role()` RPC untuk memverifikasi role admin di database

Seluruh operasi tulis (INSERT/UPDATE/DELETE) pada `blog_posts` dan pembacaan `feedback` hanya bisa dilakukan oleh user dengan role `admin`.

---

## 🌊 Design System

Palet warna terinspirasi dari pantai tropis:

| Token | Warna | Hex |
|---|---|---|
| `--primary` | Ocean Blue | `#008DDA` |
| `--secondary` | Turquoise | `#41C9E2` |
| `--accent` | Soft Mint | `#ACE2E1` |
| `--background` | Sand Cream | `#F7EEDD` |

Font:
- **Poppins** — heading & display
- **Inter** — body text

---

## ☁️ Deployment

Project di-deploy ke **Cloudflare Workers** via Nitro:

```bash
npm run build
# Output ada di .output/server/ — siap deploy ke Cloudflare Workers
```

Project ini juga terhubung ke platform **Lovable.dev** untuk visual editing.

> ⚠️ **Lovable Integration:** Jangan lakukan `force-push`, `rebase`, `amend`, atau `squash` pada commit yang sudah di-push. Selalu jaga branch terhubung dalam kondisi berjalan.

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru: `git checkout -b feat/nama-fitur`
3. Commit dengan format conventional commits: `feat: tambah fitur X`
4. Push dan buat Pull Request

---

## 📍 Tentang Pantai Jolosutro

**Pantai Jolosutro** berlokasi di Desa Ringinrejo, Kecamatan Wates, Kabupaten Blitar, Jawa Timur. Pantai ini dikenal dengan:

- Pasir bersih dan ombak khas Samudra Hindia
- **Tiket masuk GRATIS** dan area parkir luas
- Program konservasi penyu bersama warga lokal
- UMKM kuliner khas Blitar
- Area EcoPark untuk edukasi lingkungan

**Jam buka:** Setiap hari  
**Lokasi:** ±1,5 jam dari pusat Kota Blitar ke arah selatan

---

*Website ini dibangun dan dikelola oleh Pengelola Pantai Jolosutro bersama komunitas Desa Ringinrejo.*
