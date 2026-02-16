# AGRON Platform

AGRON is a full-cycle drone pilot training and operations platform for certification, simulation, field practice, and enterprise deployment.

## Repository structure

- `apps/web`: marketing + learning portal (desktop/mobile responsive)
- `apps/api`: backend API (auth, courses, payments, simulation, reports)
- `apps/mobile`: mobile app bootstrap (planned React Native/Expo)
- `packages/ui`: shared design system tokens/components
- `packages/types`: shared TypeScript contracts
- `docs`: product, architecture, and sprint documentation

## Local run

```bash
npm install --workspaces --include-workspace-root
npm run dev:web
```

Open:
- http://localhost:3000/en

Supported locales:
- `/en` (default)
- `/ru`
- `/uk`
- `/es`
- `/ar` (RTL)
- `/he` (RTL)

## Web API routes

Implemented route handlers:
- `POST /api/lead`
- `POST /api/corporate-inquiry`
- `POST /api/waitlist`
- `POST /api/auth/request-magic-link`
- `POST /api/auth/verify-magic-link`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/auth/google/start`
- `GET /api/auth/google/callback`

## Storage behavior

- Development fallback: local append-only files under `apps/web/data/*.ndjson`
- Production (Vercel): Supabase REST storage using env vars:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

If Supabase vars are missing in production, form writes fail intentionally to prevent silent data loss.

## SEO and i18n

Implemented:
- Localized URL structure `/{locale}/...`
- `robots.txt` via `app/robots.ts`
- XML sitemap via `app/sitemap.ts`
- Locale alternates metadata in `app/[locale]/layout.tsx`
- `x-default` pointing to `/en`

## Deploy to Vercel

Use the step-by-step guide:
- `docs/VERCEL_DEPLOY.md`

Quick summary:
1. Create Vercel project from this repo.
2. Set root directory to `apps/web`.
3. Add env vars from `apps/web/.env.example`.
4. Run Supabase schema migration `apps/api/migrations/002_web_forms.sql`.
5. Deploy and validate forms, i18n/RTL, and SEO.

## Basic QA checklist

- [ ] Open all pages in `en/ru/uk/es/ar/he`
- [ ] Verify language switcher works and persists
- [ ] Verify RTL in `ar` and `he` (header/forms/footer)
- [ ] Submit lead, corporate inquiry, and waitlist forms
- [ ] Confirm rows are written in Supabase
- [ ] Verify `robots.txt` and `sitemap.xml`
- [ ] Validate auth flow (Magic Link + Google OAuth if configured)
