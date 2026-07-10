# jolosutro-beach-guide

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Type check:** `npx tsc --noEmit`

## Stack

- React 19 + TanStack Start (SSR) + TanStack Router + TanStack Query
- Vite + Tailwind CSS v4 + shadcn/ui (new-york style) + Radix UI
- Supabase (auth + DB + storage) — credentials in `.env`
- TypeScript strict mode; path alias `@/*` → `src/*`
- Package manager: **npm**

## Lovable Integration

⚠️ This project is connected to [Lovable](https://lovable.dev).
- Do **not** force-push, rebase, amend, or squash already-pushed commits
- Keep the connected branch in a working state at all times

## Supabase

- Migrations live in `supabase/migrations/`
- Use `supabase/config.toml` for local config
- Never commit `.env` secrets

## Notes

- shadcn components: `@/components/ui/`
- Custom hooks: `src/hooks/`
- Route tree is auto-generated: `src/routeTree.gen.ts` — do not edit manually
