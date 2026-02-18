# AGRON Work: Vercel Deploy Guide

## 1) Create Vercel Project

1. Open Vercel and import repository: `mkof14/argon-work`.
2. In project setup, set **Root Directory** to:
   - `apps/agron-work-web`
3. Framework should be detected as **Next.js**.
4. App already includes `apps/agron-work-web/vercel.json` for function limits.

## 2) Build Settings

Use defaults when Root Directory is `apps/agron-work-web`:

- Install command: `npm install`
- Build command: `npm run build`
- Output command/runtime: default Next.js

## 3) Environment Variables

Set in Vercel Project Settings -> Environment Variables:

- `NEXT_PUBLIC_WORK_SITE_URL=https://<your-vercel-domain>`
- `AGRON_WORK_AUTH_SECRET=<strong-random-secret>`
- `AGRON_WORK_USE_POSTGRES=1`
- `AGRON_WORK_DATABASE_URL=<postgres-connection-string>`
- `AGRON_WORK_DB_TABLE=agron_work_kv`
- `AGRON_WORK_DATA_DIR=/tmp/agron-work-data`
- `AGRON_WORK_ADMIN_EMAILS=<comma-separated-admin-emails>`
- `AGRON_WORK_SUPER_ADMIN_EMAILS=<comma-separated-super-admin-emails>`
- `AGRON_WORK_QUICK_ADMIN_EMAIL=<admin-email>`
- `AGRON_WORK_ALLOW_QUICK_ADMIN_IN_PROD=0`
- `GOOGLE_CLIENT_ID=<optional>`
- `GOOGLE_CLIENT_SECRET=<optional>`

## 4) Notes About Storage

Storage now supports PostgreSQL first, JSON fallback:

- when `AGRON_WORK_USE_POSTGRES=1` and DB URL is set, app reads/writes from Postgres table,
- when DB is disabled or unavailable, app falls back to JSON file store.

JSON fallback behavior in Vercel serverless:

- writable path is ephemeral (`/tmp`),
- data is not persistent across deployments/cold starts.

This project now auto-resolves writable storage and supports:
- `AGRON_WORK_DATA_DIR=/tmp/agron-work-data`

Recommended production mode:
- enable Postgres (`AGRON_WORK_USE_POSTGRES=1`),
- use managed DB (Vercel Postgres / Neon / Supabase),
- keep JSON fallback only for local/dev safety.

Optional one-time data migration from JSON to Postgres:
- run from app folder: `npm run migrate:postgres`
- required envs: `AGRON_WORK_DATABASE_URL` (or `DATABASE_URL`) and optional `AGRON_WORK_DB_TABLE`

## 5) Security/SEO Included

Already configured:

- Security headers via `next.config.mjs`
- `robots.txt` via `app/robots.ts`
- `sitemap.xml` via `app/sitemap.ts`
- `manifest.webmanifest` via `app/manifest.ts`
- OpenGraph/Twitter metadata and structured data in layout/FAQ

## 6) Post-Deploy Smoke Check

Open and verify:

1. `/`
2. `/search`
3. `/jobs`
4. `/profile` (auth + avatar upload)
5. `/faq`
6. `/robots.txt`
7. `/sitemap.xml`
8. `/manifest.webmanifest`
9. `/api/health`

Quick checks:

- Header/Footer render correctly
- FAQ appears in footer links
- Profile photo upload works
- Resume document upload works
- Auth session route responds
- Public health endpoint returns `status: ok`

## 7) Optional Performance Hardening

- Install `sharp` dependency for better image optimization on Node runtime.
- Add real monitoring/logging (Sentry or Vercel Observability).
- Add persistent DB-backed storage for profile/resume/admin data.
