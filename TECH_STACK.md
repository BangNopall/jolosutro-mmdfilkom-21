# Tech Stack — Pantai Jolosutro Beach Guide

> Dokumentasi lengkap framework, library, dan tooling yang digunakan dalam project `jolosutro-beach-guide`.

---

## 🧩 Overview

| Layer | Teknologi |
|---|---|
| UI Framework | React 19 |
| Meta-framework (SSR) | TanStack Start |
| Routing | TanStack Router (file-based) |
| Server State | TanStack Query |
| Backend / Auth / DB | Supabase |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Bundler | Vite 8 |
| Server Runtime | Nitro (Cloudflare Workers) |
| Package Manager | Bun |
| Language | TypeScript (strict mode) |

---

## ⚛️ Frontend

### React 19
- Versi terbaru React dengan dukungan penuh concurrent features
- Digunakan sebagai fondasi seluruh UI
- **Versi:** `^19.2.0`

### TanStack Start
- Meta-framework SSR di atas TanStack Router
- Menggantikan API Routes dengan `createServerFn()` — RPC type-safe langsung dari komponen
- Mendukung SSR, loader data, dan middleware
- **Versi:** `^1.168.26`

### TanStack Router
- File-based routing: setiap file di `src/routes/` otomatis menjadi route
- Route tree di-generate otomatis ke `src/routeTree.gen.ts`
- Mendukung nested layouts, route guards (`beforeLoad`), dan type-safe params
- **Versi:** `^1.170.16`

### TanStack Query
- Manajemen server state (caching, prefetch, invalidasi)
- Digunakan bersama route loader untuk prefetch data sebelum render
- `useSuspenseQuery` untuk data fetching tanpa loading state manual
- **Versi:** `^5.101.1`

---

## 🗄️ Backend & Database

### Supabase
Platform Backend-as-a-Service yang menyediakan:

| Fitur | Keterangan |
|---|---|
| **PostgreSQL** | Database utama dengan Row Level Security (RLS) |
| **Auth** | Email + password authentication |
| **RPC Functions** | `has_role()` — SECURITY DEFINER function untuk RBAC |
| **SDK** | `@supabase/supabase-js ^2.110.1` |

#### Tiga Tabel Utama

```
blog_posts   — konten artikel (title, slug, content Markdown, is_published)
feedback     — kritik & saran pengunjung (name, email, message, rating 1–5)
user_roles   — RBAC: relasi user_id → role ENUM('admin')
```

#### Dua Supabase Client

| Client | File | Kegunaan |
|---|---|---|
| Browser client | `src/integrations/supabase/client.ts` | Auth session, client-side |
| Server admin client | `src/integrations/supabase/client.server.ts` | Bypass RLS, server-only |

---

## 🎨 Styling

### Tailwind CSS v4
- Versi terbaru dengan konfigurasi via CSS (`@theme inline`) — tanpa `tailwind.config.js`
- Source scanning dikonfigurasi lewat `@source "../src"`
- **Versi:** `^4.2.1`

### tw-animate-css
- Plugin animasi CSS untuk Tailwind
- **Versi:** `^1.3.4`

### Design Tokens (oklch color space)

```css
--primary:    oklch(0.60 0.16 235)   /* Ocean Blue  #008DDA */
--secondary:  oklch(0.79 0.12 220)   /* Turquoise   #41C9E2 */
--accent:     oklch(0.90 0.05 200)   /* Soft Mint   #ACE2E1 */
--background: oklch(0.968 0.019 88)  /* Sand Cream  #F7EEDD */
```

**oklch** dipilih karena lebih perceptually uniform dibanding hex/rgb, dan menghasilkan transisi warna yang lebih natural. Dark mode support penuh.

### Tipografi

| Font | Peran |
|---|---|
| **Poppins** (500–800) | Display / heading (`font-display`) |
| **Inter** (400–700) | Body text (`font-sans`) |

---

## 🧱 UI Components

### shadcn/ui (new-york style)
- 46 komponen siap pakai di `src/components/ui/`
- Tidak di-install sebagai package — source code langsung ada di repo
- Komponen yang digunakan antara lain: `Button`, `Card`, `Badge`, `Dialog`, `Accordion`, `Calendar`, `Tabs`, `Toast`, dll
- Konfigurasi di `components.json`

### Radix UI
- Primitif headless UI (aksesibel, tanpa styling) yang menjadi fondasi shadcn/ui
- Setiap komponen Radix di-install sebagai package terpisah (e.g. `@radix-ui/react-dialog`)

### Lucide React
- Library ikon SVG
- **Versi:** `^0.575.0`

### Sonner
- Toast notifications (posisi `top-center`, dengan `richColors`)
- **Versi:** `^2.0.7`

---

## 🔧 Tooling & Build

### Vite 8
- Bundler utama dengan HMR
- Plugin yang digunakan:
  - `@vitejs/plugin-react` — fast refresh
  - `@tailwindcss/vite` — integrasi Tailwind v4
  - `@tanstack/router-plugin` — generate route tree otomatis
  - `vite-tsconfig-paths` — path alias `@/*`
- **Versi:** `^8.0.16`

### Nitro
- Server engine untuk deploy ke Cloudflare Workers
- Output ke `.output/server/`
- Custom `src/server.ts` untuk normalisasi error h3
- **Versi:** `3.0.260603-beta`

### Bun
- Package manager dan JavaScript runtime
- Menggantikan Node.js + npm/pnpm
- Konfigurasi di `bunfig.toml`

### TypeScript
- Strict mode aktif
- Path alias: `@/*` → `src/*`
- **Versi:** `^5.8.3`

---

## ✅ Validasi

### Zod
- Schema validation untuk semua input server function
- Digunakan di `public.functions.ts` dan `admin.functions.ts`
- **Versi:** `^3.24.2`

---

## 📦 Library Pendukung Lainnya

| Library | Versi | Kegunaan |
|---|---|---|
| `react-markdown` | `^10.1.0` | Render konten blog dari Markdown |
| `react-hook-form` | `^7.71.2` | Form state management |
| `@hookform/resolvers` | `^5.2.2` | Integrasi Zod dengan React Hook Form |
| `date-fns` | `^4.1.0` | Format tanggal (Indonesia locale) |
| `embla-carousel-react` | `^8.6.0` | Carousel / slider |
| `recharts` | `^2.15.4` | Charting (tersedia tapi belum digunakan aktif) |
| `react-resizable-panels` | `^4.6.5` | Panel yang bisa di-resize |
| `cmdk` | `^1.1.1` | Command palette |
| `vaul` | `^1.1.2` | Drawer mobile |
| `input-otp` | `^1.4.2` | Input OTP |
| `clsx` + `tailwind-merge` | — | Utility class merging (`cn()`) |
| `class-variance-authority` | `^0.7.1` | Variant-based component styling |

---

## 🔗 Platform & Integrasi

### Lovable.dev
- Platform visual editor yang terhubung ke repo
- Menambahkan error reporting (`src/lib/lovable-error-reporting.ts`)
- **Catatan:** Jangan force-push, rebase, amend, atau squash commit yang sudah di-push

### Cloudflare Workers
- Target deployment via Nitro
- Konfigurasi di `.output/server/wrangler.json`
- Zero cold start, edge computing global

---

## 🗺️ Diagram Arsitektur

```
Browser
  │
  ├─ TanStack Router (file-based routing)
  │     ├─ / (Homepage — 10 sections)
  │     ├─ /blog (Article list)
  │     ├─ /blog/:slug (Article detail)
  │     ├─ /auth (Login page)
  │     └─ /admin (CMS Dashboard — protected)
  │
  ├─ TanStack Query (server state + cache)
  │     └─ prefetch via route loaders
  │
  └─ Supabase JS Client (Auth session)

        │ serverFn RPC (Bearer JWT)
        ▼

TanStack Start Server
  │
  ├─ attachSupabaseAuth middleware (inject JWT ke header)
  ├─ requireSupabaseAuth middleware (validasi token)
  ├─ public.functions.ts (getRecentPosts, getPostBySlug, submitFeedback)
  └─ admin.functions.ts (listAllPosts, savePost, togglePublish, deletePost, ...)
        │
        ▼

Supabase PostgreSQL
  ├─ blog_posts (RLS: anon baca published, admin full access)
  ├─ feedback (RLS: anon insert, admin view/delete)
  └─ user_roles (RBAC via has_role() RPC function)

        │
        ▼

Cloudflare Workers (via Nitro)
```

---

*Diperbarui: Juli 2026*
