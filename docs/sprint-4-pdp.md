# Sprint 4 — Product Detail Page (PDP)

**Status:** ✅ Klaar
**Duur:** 4–5 dagen
**Branch:** `feature/sprint-4-pdp`
**Vereist:** Sprint 1 afgerond | Metafields aangemaakt in Shopify Admin

← [Sprint 3](sprint-3-categorie.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 5 →](sprint-5-cart-overons.md)

---

## Doel

Volledige Product Detail Page met foto carousel, sticky ATC, metafields, en alle informatie-secties.

---

## Pagina structuur (top → bottom)

```
Foto Carousel + Sticky Info/ATC
Zekerheden Bar
Uitgebreide Productuitleg     ← uit custom.long_description metafield
Judge.me Reviews              ← placeholder tot Sprint 7
Gidsen Sectie                 ← uitgesteld naar Sprint 6
FAQ Sectie                    ← met JSON-LD schema
```

---

## Stap 1: Metafields aanmaken in Shopify Admin ← **klant**

Ga naar: **Admin → Custom data → Products → Add definition**

| Metafield key | Type | Omschrijving |
|---|---|---|
| `custom.long_description` | Rich Text | Uitgebreide SEO-uitleg op PDP |
| `custom.addon_product` | Product reference | Cross-sell add-on (olie/beschermer) |
| `custom.usp_1` | Single line text | USP bullet 1 bij ATC |
| `custom.usp_2` | Single line text | USP bullet 2 bij ATC |
| `custom.usp_3` | Single line text | USP bullet 3 bij ATC |
| `custom.core_promise` | Single line text | Kernbelofte onder producttitel |

Zie ook: [`docs/metafields.md`](../docs/metafields.md)

---

## Taken

### Template
- [x] `templates/product.json` aangepast voor SOPHIOR secties

### Foto + Info + ATC — ~~`sections/sophior-product-main.liquid`~~ → `sections/sophior-product-info.liquid`
- [x] Links: Dawn's `product-media-gallery` snippet (stacked layout)
- [x] Rechts (sticky op desktop via `product__column-sticky`):
  - [x] Producttitel (`<h1>`, Nevolasty)
  - [x] Kernbelofte (`custom.core_promise` metafield) onder titel
  - [x] Prijs (doorgestreepte verkoopprijs indien sale)
  - [x] Variant selector via Dawn's `product-variant-picker` snippet
  - [x] 3 USP bullets (`custom.usp_1/2/3` metafields, met ✓ icoon)
  - [x] ATC knop via Dawn's `buy-buttons` snippet (SOPHIOR-stijl override)
  - [x] Korte productbeschrijving
  - [ ] Add-on upsell (conditioneel op `product.type`) — **uitgesteld naar Sprint 5**
- [x] Mobile: gestapeld, galerij boven
- [x] Dawn's `<product-info>` web component behouden voor JS-compatibiliteit

### Zekerheden Bar — ~~`sections/sophior-product-guarantees.liquid`~~ → `sections/sophior-certainties-bar.liquid`
- [x] 4 blokken horizontaal: slot + vrachtwagen + retour + ster
- [x] Inline SVG iconen (6 icoontypen kiesbaar)
- [x] Bewerkbaar via blokken in schema
- [x] 2×2 mobile / 4-koloms desktop

### Uitgebreide Productuitleg — `sections/sophior-product-description.liquid`
- [x] Inhoud uit `product.metafields.custom.long_description`
- [x] Rich text via `metafield_tag` filter
- [x] Sectie verborgen als metafield leeg is

### Judge.me Reviews — ~~`sections/sophior-product-reviews.liquid`~~ → `sections/sophior-judge-placeholder.liquid`
- [x] Placeholder zolang geen Judge.me public key ingevuld
- [x] Echte widget actief zodra `judgeme_public_key` setting ingevuld
- [x] Min-height op container voorkomt layout shift

### Gidsen Sectie — `sections/sophior-product-guides.liquid`
- [~] **Uitgesteld naar Sprint 6** — blog-infrastructuur vereist eerst aangemaakt te worden

### FAQ Sectie — `sections/sophior-product-faq.liquid`
- [x] Native `<details>/<summary>` accordion — geen JS
- [x] FAQPage JSON-LD structured data automatisch gegenereerd
- [x] `focus-visible` outline op `<summary>`
- [x] Schema: max 10 vraag-antwoord blokken

---

## Deviaties van plan

### 1. Section namen gewijzigd
| Gepland | Gebouwd |
|---|---|
| `sophior-product-main` | `sophior-product-info` |
| `sophior-product-guarantees` | `sophior-certainties-bar` |
| `sophior-product-reviews` | `sophior-judge-placeholder` |

### 2. Dawn web component behouden
In plaats van een volledig eigen product-sectie is Dawn's `<product-info>` web component als wrapper behouden. Dit garandeert compatibiliteit met `product-info.js` en `product-form.js` (variant AJAX, quantity updates, dynamic checkout).

### 3. Add-on upsell uitgesteld naar Sprint 5
De add-on upsell (`custom.addon_product` — conditioneel op `product.type`) hoort architectureel bij de cart drawer. Wordt geïmplementeerd in Sprint 5.

### 4. Gidsen sectie uitgesteld naar Sprint 6
`sophior-product-guides.liquid` filtert blog-artikelen op `blog.handle == product.type`. De blog-structuur (5 Shopify blogs aanmaken + content) is een klant-actie die deel uitmaakt van Sprint 6.

---

## Aangemaakte bestanden

### Sections (5 nieuw)
- `sections/sophior-product-info.liquid`
- `sections/sophior-certainties-bar.liquid`
- `sections/sophior-product-description.liquid`
- `sections/sophior-judge-placeholder.liquid`
- `sections/sophior-product-faq.liquid`

### Assets (5 nieuw)
- `assets/sophior-product-info.css`
- `assets/sophior-certainties-bar.css`
- `assets/sophior-product-description.css`
- `assets/sophior-product-faq.css`

### Gewijzigd
- `templates/product.json` — volledig herbouwd met 5 SOPHIOR secties
- `locales/nl.schema.json` + `en.default.schema.json` — 5 sectie-sleutels toegevoegd

### Documentatie
- `docs/metafields.md` — aanmaak instructies voor 6 metafields
- `docs/sections/sophior-product-info.md`
- `docs/sections/sophior-certainties-bar.md`
- `docs/sections/sophior-product-description.md`
- `docs/sections/sophior-judge-placeholder.md`
- `docs/sections/sophior-product-faq.md`

---

## Deliverable

PDP volledig functioneel: sticky ATC, variant picker, metafield-content, zekerhedenbar, FAQ + JSON-LD. Add-on upsell + gidsen sectie volgen in Sprint 5–6.
