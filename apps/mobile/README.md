# AGRON Mobile App

React Native (bare workflow) architecture scaffold for iOS and Android.

## Current status
- Architecture and module boundaries defined.
- API contracts connected to backend endpoints.
- Locale and RTL foundation added for `en, ru, uk, es, ar, he`.

## App focus
- Onboarding and authentication.
- Programs hub and simulator access.
- Progress tracking.
- Subscription and entitlement checks.
- Corporate seat workflows.

## Key files
- `src/App.tsx`
- `src/i18n/index.ts`
- `src/config/locales.ts`
- `src/modules/*/service.ts`

## Notes on billing
- iOS digital subscriptions must use StoreKit.
- Android digital subscriptions must use Google Play Billing.
- External web checkout (Stripe) should remain web-only unless policy-safe path is confirmed.
