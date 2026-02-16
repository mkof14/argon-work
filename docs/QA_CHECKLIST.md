# AGRON Website QA Checklist

## Locale and Routing
- [ ] `/en`, `/ru`, `/uk`, `/ar`, `/he` all open correctly
- [ ] Non-localized route redirects to locale-prefixed route
- [ ] Language selection persists across refresh and new navigation

## RTL
- [ ] `ar` and `he` pages render with `dir="rtl"`
- [ ] Header navigation order and alignment are correct in RTL
- [ ] Forms are aligned correctly in RTL
- [ ] Footer and language switcher are readable in RTL
- [ ] Dev `RTL ON/OFF` toggle works on non-RTL locales

## Forms and APIs
- [ ] Home lead capture posts to `/api/lead`
- [ ] Contact form posts to `/api/lead`
- [ ] Corporate page posts to `/api/corporate-inquiry`
- [ ] Part 107 and Simulator waitlist post to `/api/waitlist`
- [ ] Honeypot blocks bot submissions
- [ ] Rate limiting returns `429` after threshold

## SEO
- [ ] Localized metadata appears for each locale
- [ ] `hreflang` alternates are present
- [ ] `/robots.txt` resolves
- [ ] `/sitemap.xml` includes locale URLs

## Performance and Accessibility
- [ ] Images are optimized/lazy where applicable
- [ ] No severe layout shifts
- [ ] Keyboard navigation works for forms and language switcher
