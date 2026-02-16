# AGRON Mobile Architecture (React Native Bare)

## Scope (Phase 1)
- Auth (email magic link)
- Programs hub (Part 107, Flight Skills, Simulator, Corporate)
- Simulator runtime bridge (WebView or native renderer)
- Progress and analytics
- Subscription entitlements
- Corporate seat workflows

## Module Layout
- `src/modules/auth`: magic-link login and profile bootstrap.
- `src/modules/programs`: content feed for modules and scenarios.
- `src/modules/simulator`: runtime bridge and score submission.
- `src/modules/progress`: lesson and drill completion updates.
- `src/modules/billing`: entitlement sync and store source state.
- `src/modules/corporate`: invite and seat management.

## API Contracts
- `POST /api/auth/magic-link`
- `POST /api/simulator-score`
- `POST /api/progress/update`
- `POST /api/subscription/status`
- `POST /api/corporate/invite`
- `GET /api/content/modules`
- `GET /api/content/scenarios`

## Entitlement Model
- `sourceStore`: `ios | android | web`
- `plan`: `free | pro | enterprise`
- `status`: `active | grace | canceled | expired`

Rules:
- Refresh entitlement on app start.
- Cache entitlement for short TTL.
- Server is source of truth.

## Billing Compliance
- iOS digital purchases: StoreKit subscriptions.
- Android digital purchases: Google Play Billing.
- Web Stripe checkout allowed only for web flow.
- Do not deep-link from app to external checkout for digital goods by default.

## RTL and Localization
- Supported locales: `en, ru, uk, es, ar, he`.
- RTL locales: `ar, he`.
- App sets direction via `I18nManager.forceRTL` based on locale.
- Translation keys must stay aligned with web for shared content packs.
