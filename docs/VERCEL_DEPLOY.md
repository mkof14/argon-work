# Vercel Deploy Guide (AGRON Web)

## 1. Vercel project setup
1. Import repository into Vercel.
2. Set **Root Directory** to `apps/web` (critical for web-only deploys in this monorepo).
3. Framework preset: `Next.js`.
4. Node version: `20.x`.

## 2. Environment variables (Production + Preview)
Use `apps/web/.env.example` values and set:

- `NEXT_PUBLIC_SITE_URL` = your deployed domain, e.g. `https://agron.vercel.app`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTH_SECRET` (long random secret)
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)
- `GOOGLE_REDIRECT_URI` = `https://<your-domain>/api/auth/google/callback`

Notes:
- If `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are missing in production, form API routes will fail intentionally to avoid losing lead data.
- `NEXT_PUBLIC_API_URL` is optional for current setup (web uses internal `/api/*` routes).

## 3. Supabase schema
Run SQL migrations from:
- `apps/api/migrations/002_web_forms.sql`

This creates:
- `leads`
- `corporate_inquiries`
- `waitlist`

## 4. Google OAuth setup (optional)
In Google Cloud OAuth client settings:
- Authorized redirect URI:
  - `https://<your-domain>/api/auth/google/callback`

## 5. Deploy verification
After deployment, verify:
1. `/<locale>` pages resolve (`en, ru, uk, es, ar, he`).
2. `ar` and `he` render RTL correctly.
3. Header/footer language switch works and persists.
4. `POST /api/lead`, `/api/corporate-inquiry`, `/api/waitlist` return `{ ok: true }` and rows appear in Supabase.
5. Metadata has canonical + hreflang + x-default.
6. `robots.txt` and `sitemap.xml` are reachable.
7. Auth endpoints work:
   - `/api/auth/request-magic-link`
   - `/api/auth/verify-magic-link`
   - `/api/auth/google/start`

## 6. Troubleshooting
- `Cannot find module './xxxx.js'` in dev: stop dev server, remove `apps/web/.next`, restart.
- Form 500 errors on Vercel: verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in the target environment.
- Google login redirect errors: verify `GOOGLE_REDIRECT_URI` exactly matches Vercel domain callback URL.
