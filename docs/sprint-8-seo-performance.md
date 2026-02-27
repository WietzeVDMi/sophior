# Sprint 8 — SEO & Performance

**Status:** ✅ Klaar
**Duur:** 2–3 dagen
**Branch:** `feature/sprint-8-seo-performance`
**Vereist:** Sprints 1–7 afgerond

← [Sprint 7](sprint-7-integraties.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 9 →](sprint-9-golive.md)

---

## Doel

SEO-ready thema met JSON-LD structured data. Core Web Vitals doelen halen op staging.

---

## Performance Doelen

| Metric | Doel |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

---

## SEO Taken

### JSON-LD Structured Data

- [x] **Product schema (PDP)** — `sections/sophior-product-info.liquid`
  - Velden: name, image, description, sku, brand, offers (price, priceCurrency, availability)
  - `price` als numerieke waarde via `| divided_by: 100.0`

- [x] **BreadcrumbList** — `snippets/sophior-breadcrumbs.liquid`
  - Universele snippet; parameter `breadcrumb_type`: `'product'` / `'collection'` / `'article'`
  - Gerenderd op PDP (3 niveaus: Home › Collectie › Product), categorie (2 niveaus), artikel (3 niveaus)
  - Bevat HTML `<nav>` én `<script type="application/ld+json">` per aanroep

- [x] **FAQPage schema** — al aangemaakt in Sprint 4 (`sections/sophior-product-faq.liquid`)

- [x] **Organization schema** — `sections/sophior-footer.liquid`
  - name, url, logo
  - `sameAs` dynamisch gevuld vanuit `section.settings.instagram_url` + `facebook_url`

### Meta Tags

- [x] Open Graph tags (og:title, og:image, og:description, og:type) — `snippets/meta-tags.liquid` (klaar)
- [x] Twitter card tags — `snippets/meta-tags.liquid` (klaar)
- [~] Meta title format `[Paginatitel] | SOPHIOR` — Shopify beheert page_title automatisch per type; geen custom code nodig
- [~] Meta description per paginatype — via Shopify Admin ingesteld per product/pagina; geen custom code nodig

### Breadcrumbs

- [x] `snippets/sophior-breadcrumbs.liquid` aangemaakt
- [x] `assets/sophior-breadcrumbs.css` aangemaakt
- [x] Opgenomen in PDP (`sections/sophior-product-info.liquid`)
- [x] Opgenomen in categoriepagina (`sections/sophior-category-header.liquid`) — vervangt eerder HTML-blok
- [x] Opgenomen in artikelpagina (`sections/sophior-article.liquid`) — vervangt eerder HTML-blok
- [x] JSON-LD BreadcrumbList per paginatype meegegeven

### H1/H2 hiërarchie

- [x] Elke pagina heeft precies één `<h1>`: Hero (homepage), collectie-header, product-info, blog-listing, article
- [x] Breadcrumb-navigatie gebruikt `<nav>` + `<ol>` + `aria-current="page"` op laatste item

---

## Performance Taken

### Afbeeldingen

- [x] Lazy loading op alle afbeeldingen buiten viewport — productkaarten, footer logo, blog-kaarten
- [x] Hero: `loading="eager"` + `fetchpriority="high"` (LCP element) — `sections/sophior-hero.liquid`
- [x] Categorie-header: `loading="eager"` + `fetchpriority="high"` — `sections/sophior-category-header.liquid`
- [~] WebP: Shopify CDN serveert automatisch WebP via `image_url` + `image_tag` filters — geen extra code nodig

### Fonts

- [~] Nevolasty `.woff2` — **client-blocked**: klant heeft het bestand nog niet geleverd. Huidig: `.otf`.
  Zodra bestand beschikbaar: preload in `layout/theme.liquid` aanpassen van `font/otf` naar `font/woff2`.
- [x] Montserrat: `display=swap` via Google Fonts URL — `layout/theme.liquid`
- [x] `font-display: swap` ingesteld op alle fonts — `assets/sophior-brand.css`

### Scripts

- [x] Alle eigen scripts: `defer="defer"` — `layout/theme.liquid`
- [x] Geen render-blocking scripts in `<head>`

### CSS

- [x] Kritieke CSS inline in `<head>` via Shopify's Dawn patroon (base.css eager, sophior-brand.css eager)
- [x] Overige CSS: `media="print" onload` fallback voor niet-kritieke stijlen — `layout/theme.liquid`

### Audit

- [ ] Lighthouse audit draaien op staging: `npm run lighthouse` of Chrome DevTools ← **staging vereist**
- [ ] PageSpeed Insights controleren ← **staging vereist**
- [ ] Shopify Theme Check: `docker compose run --rm shopify shopify theme check`
- [ ] Google Rich Results Test uitvoeren op staging URL's ← **staging vereist**

---

## Deviaties

| Item | Plan | Werkelijkheid |
|---|---|---|
| Nevolasty preload | `.woff2` | `.otf` — client-blocked |
| Meta title format | Custom Liquid | Shopify Admin handles this — geen code nodig |
| Meta description | Per-pagina schema | Shopify Admin/product instellingen — geen code nodig |

---

## Aangemaakte/gewijzigde bestanden

### Nieuw aangemaakt

- `snippets/sophior-breadcrumbs.liquid` — universeel breadcrumb snippet (HTML + BreadcrumbList JSON-LD)
- `assets/sophior-breadcrumbs.css` — breadcrumb stijlen

### Gewijzigd

- `sections/sophior-product-info.liquid` — Product JSON-LD vóór `<product-info>` + breadcrumb render boven H1
- `sections/sophior-category-header.liquid` — bestaande `<nav>` breadcrumb vervangen door snippet-aanroep
- `sections/sophior-article.liquid` — bestaande `<nav>` breadcrumb vervangen door snippet-aanroep
- `sections/sophior-footer.liquid` — Organization JSON-LD toegevoegd na `</footer>`

---

## Deliverable

Lighthouse score groen op alle metrics. JSON-LD gevalideerd via Google Rich Results Test. Breadcrumbs live op PDP, categorie en artikelpagina's.

**Verificatie (zodra staging beschikbaar):**
1. Google Rich Results Test → Product schema (PDP) + BreadcrumbList + FAQPage
2. Google Rich Results Test → Organization (alle pagina's via footer)
3. Lighthouse audit → SEO 100, Performance ≥95, A11y ≥95
4. `shopify theme check` → 0 errors, 0 warnings
