# Sprint 3 — Categoriepagina

**Status:** ✅ Klaar
**Duur:** 3–4 dagen
**Branch:** `feature/sprint-3-categorie`
**Vereist:** Sprint 1 afgerond | Productafbeeldingen gewenst (maar niet blokkerend)

← [Sprint 2](sprint-2-homepage.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 4 →](sprint-4-pdp.md)

---

## Doel

Één gedeeld Liquid template dat werkt voor alle 4 collecties: Snijplanken, Pannen, Messen, Accessoires.

---

## Collectie URLs

| Naam | URL |
|---|---|
| Snijplanken | `/collections/snijplanken` |
| Pannen | `/collections/pannen` |
| Messen | `/collections/messen` |
| Accessoires | `/collections/accessoires` |

---

## Taken

### Template
- [x] `templates/collection.json` aangepast voor SOPHIOR secties

### Categorie Header — ~~`sections/sophior-collection-header.liquid`~~ → `sections/sophior-category-header.liquid`
- [x] Collectieafbeelding als full-width achtergrond met CSS-overlay
- [x] Breadcrumb navigatie (`<nav>` + `<ol>` met `aria-current="page"`)
- [x] `<h1>` met collectienaam
- [x] Optionele collectiebeschrijving via `collection.description`
- [x] LCP-afbeelding: `fetchpriority="high"` + `loading="eager"`
- [x] Schema: `show_description`, `show_image`, `overlay_opacity` bewerkbaar

### Filter & Sort Balk — `sections/sophior-collection-filters.liquid`
- [~] **Niet als aparte section gebouwd** — zie Deviaties hieronder

### Product Grid — `snippets/sophior-product-card.liquid`
- [x] Grid: 4 kolommen desktop / 2 kolommen mobile (via Dawn's `grid--X-col-desktop`)
- [x] Product card bevat: afbeelding (portrait 4:5), sterren, titel, prijs + doorgestreepte verkoopprijs, quick-add knop
- [x] Quick-add knop slide-up op hover; AJAX via `/cart/add.js`
- [x] Event delegation op `#product-grid` — werkt na AJAX-filtering
- [x] Badge "Bestseller" / "Nieuw" / "Sale" — via product tags (`bestseller`, `nieuw`) + automatisch bij sale-prijs

### SEO Tekstblok — `sections/sophior-collection-seo-text.liquid`
- [~] **Uitgesteld naar Sprint 6** — geen klantcontent beschikbaar

---

## App setup

- [ ] **Shopify Search & Discovery** installeren via Shopify App Store ← **klant**
- [ ] Filters configureren per collectie (materiaal, formaat, prijs) ← **klant**
- [ ] Pill-stijl activeren in app instellingen ← **klant**

---

## Deviaties van plan

### 1. Section heet `sophior-category-header` (niet `sophior-collection-header`)
Naamgeving aangepast voor consistentie met BEM-patroon `.sophior-category-header__*`.

### 2. Filters niet als aparte section gebouwd
Dawn's `main-collection-product-grid.liquid` bevat al een volledig AJAX-filtratiesysteem via `snippets/facets.liquid` (937 regels). Een eigen `sophior-collection-filters.liquid` zou dit volledige systeem moeten herschrijven met hoog regressierisico. Besluit: Dawn's ingebouwde facets behouden; Shopify Search & Discovery app activeert de filters automatisch in dit systeem.

### 3. SEO-tekstblok uitgesteld
Geen productcontent van klant beschikbaar. Wordt opgepakt in Sprint 6 samen met blog-infrastructuur.

---

## Aangemaakte bestanden

### Sections (1 nieuw)
- `sections/sophior-category-header.liquid`

### Snippets (1 nieuw)
- `snippets/sophior-product-card.liquid`

### Assets (3 nieuw)
- `assets/sophior-category-header.css`
- `assets/sophior-product-card.css`
- `assets/sophior-collection.js`

### Gewijzigd
- `sections/main-collection-product-grid.liquid` — SOPHIOR product card ipv Dawn's `card-product`
- `templates/collection.json` — `sophior-category-header` als banner
- `locales/nl.schema.json` + `en.default.schema.json` — sectie-sleutels toegevoegd

### Documentatie
- `docs/sections/sophior-category-header.md` — section contract

---

## Deliverable

Werkende categoriepagina voor alle 4 collecties. SOPHIOR product cards actief. Quick-add werkt. Mobile-first. Filters gereed zodra Shopify Search & Discovery app geïnstalleerd is.
