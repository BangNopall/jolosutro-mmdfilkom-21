# Jolosutro Beach Guide — Production-Ready Launch

## Problem
Aplikasi wisata Pantai Jolosutro telah dibangun via Lovable.ai namun belum siap produksi: terdapat 30+ gap di error handling, keamanan, SEO, dan observabilitas yang akan menyebabkan crash, kebocoran data, atau pengalaman buruk untuk pengunjung dan admin. Pemilik tidak dapat melanjutkan pengembangan mandiri karena kredit Lovable habis, dan membutuhkan aplikasi yang langsung bisa digunakan publik.

## Evidence
- Audit langsung menemukan: 8 gap error handling, 5 isu keamanan kritis, kode `console.error()` di production path, tidak ada robots.txt/sitemap, fallback image hardcoded ke Unsplash
- App dibangun dengan Lovable.ai (scaffold-generated) — kualitas foundation baik, tapi finishing production belum dilakukan
- Supabase RLS sudah ada, schema sudah solid — backend aman, frontend perlu penguatan

## Users
- **Primary**: Admin pantai (1 orang) — mengelola blog dan feedback pengunjung via dashboard
- **Secondary**: Wisatawan umum — mencari info, membaca blog, mengirim masukan
- **Not for**: Platform multi-tenant, pengguna selain admin Pantai Jolosutro

## Hypothesis
We believe **hardening error handling, keamanan, SEO, dan deployment Vercel** will **menghasilkan aplikasi siap publik** untuk **admin dan wisatawan Pantai Jolosutro**.
We'll know we're right when **app bisa diakses publik tanpa crash, SEO terindeks, dan admin bisa mengelola konten**.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| Zero runtime crashes | 0 unhandled errors di prod | Vercel logs |
| SEO crawlable | robots.txt + sitemap tersedia | Browser/Google |
| Admin flow end-to-end | Login → CRUD blog → logout berhasil | Manual test |
| Public flow end-to-end | Home → Blog → Feedback berhasil | Manual test |
| Build sukses | `bun run build` exit 0 | CI/CD |

## Scope

**MVP** — Fix semua bug dan gap production, lalu deploy ke Vercel

**Out of scope**
- Rate limiting server-side — membutuhkan Redis/middleware layer, post-launch
- Email notifications feedback — integrasi email provider, post-launch
- Analytics/monitoring (Sentry, etc.) — post-launch
- Pagination blog — posts masih sedikit, post-launch
- Search blog — post-launch
- Password reset flow — Supabase handles via email, konfigurasi di dashboard Supabase

## Delivery Milestones

| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Fix bugs & error handling | App tidak crash, semua state ditangani | pending | — |
| 2 | SEO & public assets | robots.txt, sitemap, meta tags per halaman | pending | — |
| 3 | Security hardening | CSP headers, .env.example, console.error dihapus | pending | — |
| 4 | Code quality | Shared utils, TypeScript types, dead code | pending | — |
| 5 | Deploy ke Vercel | App live, env vars dikonfigurasi | pending | — |

## Open Questions
- [ ] Custom domain tersedia? (jika ada, konfigurasikan di Vercel)
- [ ] Google Maps embed key masih valid di production?
- [ ] Video section — URL video sudah final?

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Vercel build fail karena TanStack Start config | Medium | High | Test build lokal dulu |
| Supabase env vars salah di prod | Low | High | Validate di deployment step |
| Lovable sync conflict setelah edit manual | Medium | Medium | Commit clean, jangan rebase |

---
*Status: DRAFT — requirements only. Implementation planning via /plan.*
