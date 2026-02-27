# SOPHIOR.nl — Project Plan 2026

**Store:** sophior-keuken.myshopify.com
**Repo:** git@github.com:WietzeVDMi/sophior.git
**Platform:** Shopify Dawn thema
**Taal:** Nederlands (NL-only, D2C, mobile-first)

---

## Ontwikkelomgeving

Alles draait in Docker — niets lokaal geïnstalleerd.

```bash
docker compose up                                               # dev server → localhost:9292
docker compose run --rm shopify shopify theme push --theme-id [id]
docker compose run --rm shopify shopify theme publish --theme-id [id]
```

**Branches:** `main` (live) → `develop` (staging) → `feature/*` (werk)

---

## Sprint Status

| # | Sprint | Status | Deliverable |
|---|---|---|---|
| 0 | [Setup & Fundament](docs/sprint-0-setup.md) | ✅ Klaar | Docker + GitHub + Dawn draaien |
| 1 | [Brand & Globale Componenten](docs/sprint-1-brand.md) | ✅ Klaar | Header, footer, announcement bar |
| 2 | [Homepage](docs/sprint-2-homepage.md) | ⏸ Gepland | Alle 8 homepage secties |
| 3 | [Categoriepagina](docs/sprint-3-categorie.md) | ⏸ Gepland | 1 template voor 4 collecties |
| 4 | [Product Detail Page](docs/sprint-4-pdp.md) | ⏸ Gepland | Volledige PDP + metafields |
| 5 | [Cart Drawer + Over Ons](docs/sprint-5-cart-overons.md) | ⏸ Gepland | Cart drawer + Over Ons pagina |
| 6 | [Blog & Gidsen](docs/sprint-6-blog.md) | ⏸ Gepland | 5 blogs + filtering |
| 7 | [Integraties & Apps](docs/sprint-7-integraties.md) | 🔒 Wacht op klant | Judge.me, Klaviyo, GA4, Pixel |
| 8 | [SEO & Performance](docs/sprint-8-seo-performance.md) | ⏸ Gepland | Lighthouse groen, JSON-LD live |
| 9 | [QA & Go Live](docs/sprint-9-golive.md) | ⏸ Gepland | SOPHIOR.nl live |

**Legenda:** ✅ Klaar | ⏳ Bezig | ⏸ Gepland | 🔒 Wacht op klant | ❌ Geblokkeerd

---

## Blokkerende Afhankelijkheden (wacht op klant)

| Asset | Blokkeert | Status |
|---|---|---|
| Nevolasty .otf + weblicentie | Sprint 1 | ✅ Ontvangen (Nevolasty-Light.otf) |
| Logo SVG/PNG (zwart + wit) | Sprint 1 | ✅ Ontvangen (.ai bestand → SVG geconverteerd) |
| Judge.me public key | Sprint 7 | ❌ Niet ontvangen |
| Klaviyo lijst-ID | Sprint 7 | ❌ Niet ontvangen |
| GA4 property ID + Meta Pixel ID | Sprint 7 | ❌ Niet ontvangen |
| Productafbeeldingen WebP | Sprint 3–4 | ❌ Niet ontvangen |
| Cart upsell app keuze | Sprint 5 | ❌ Niet ontvangen |

---

## Benodigde Skills

| Discipline | Ingezet in |
|---|---|
| Shopify Liquid | Sprint 1–6 |
| Shopify CLI (Docker) | Sprint 0–9 |
| HTML/CSS (BEM, custom properties) | Sprint 1–8 |
| Vanilla JavaScript | Sprint 2–5 |
| Git/GitHub | Sprint 0–9 |
| Shopify Admin (metafields, apps) | Sprint 4, 6, 7 |
| Judge.me integratie | Sprint 7 |
| Klaviyo integratie | Sprint 7 |
| GA4 + Meta Pixel | Sprint 7 |
| Performance (Core Web Vitals) | Sprint 8 |
| JSON-LD / SEO | Sprint 8 |

---

## Kritieke Files (theme/)

```
theme.liquid                            ← font preloads, globale CSS import
assets/sophior-brand.css               ← alle design tokens
sections/sophior-announcement-bar.liquid
sections/sophior-header.liquid
sections/sophior-footer.liquid
sections/sophior-hero.liquid
sections/sophior-trustbadge-bar.liquid
sections/sophior-collections-grid.liquid
sections/sophior-bestsellers.liquid
sections/sophior-usp-accordion.liquid
sections/sophior-review-slider.liquid
sections/sophior-blog-preview.liquid
sections/sophior-trustbar-footer.liquid
sections/sophior-collection-header.liquid
sections/sophior-collection-filters.liquid
sections/sophior-product-main.liquid
sections/sophior-product-guarantees.liquid
sections/sophior-product-description.liquid
sections/sophior-product-reviews.liquid
sections/sophior-product-guides.liquid
sections/sophior-product-faq.liquid
snippets/sophior-product-card.liquid
snippets/sophior-cart-drawer.liquid
snippets/sophior-breadcrumbs.liquid
templates/index.json
templates/collection.json
templates/product.json
templates/page.ons-verhaal.json
templates/blog.json
templates/article.json
locales/nl.json
```

---

## Verificatie per Sprint

1. `docker compose up` → preview op localhost:9292
2. `shopify theme push --theme-id [staging-id]` → klant reviewt op staging
3. Chrome DevTools + echte iOS/Android check
4. `shopify theme check` → geen Liquid errors
5. Lighthouse audit (Sprint 8) → LCP < 2.5s, CLS < 0.1, INP < 200ms
6. Testbestelling plaatsen op staging store
7. `shopify theme publish` → live na klantgoedkeuring
