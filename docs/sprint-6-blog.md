# Sprint 6 — Blog & Gidsen

**Status:** ✅ Klaar
**Duur:** 2–3 dagen
**Branch:** `feature/sprint-6-blog`
**Vereist:** Sprint 1 afgerond

← [Sprint 5](sprint-5-cart-overons.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 7 →](sprint-7-integraties.md)

---

## Doel

Volledige blog structuur met 5 aparte Shopify blogs. Blog preview op PDP en homepage werkt via handle-filtering.

---

## Blogs aanmaken in Shopify Admin

Ga naar: **Admin → Online Store → Blog posts → Manage blogs**

| Blog naam | Handle | Gebruik |
|---|---|---|
| Snijplanken Gids | `snijplanken` | PDP snijplanken, header dropdown |
| Pannen Gids | `pannen` | PDP pannen, header dropdown |
| Messen Gids | `messen` | PDP messen, header dropdown |
| Accessoires Gids | `accessoires` | PDP accessoires, header dropdown |
| Inspiratie & Recepten | `inspiratie-recepten` | Algemene gidsen, header dropdown |

- [ ] Alle 5 blogs aanmaken in Shopify Admin ← **klant**
- [ ] Per blog 1–2 testartikelen aanmaken (voor testing filtering) ← **klant**

---

## Filtering logica

Blog artikelen worden op PDP gefilterd zodat alleen relevante gidsen verschijnen:

```liquid
{% assign product_blog = blogs[product.type] %}
{% for article in product_blog.articles limit: 3 %}
  {{ article.title }}
{% endfor %}
```

Dit werkt omdat `product.type` overeenkomt met de blog handle (bijv. `snijplank` → blog `snijplanken`).

---

## Taken

### Templates
- [x] `templates/blog.json` aangepast — `sophior-blog-listing` met 5 tabs pre-populated
- [x] `templates/article.json` aangepast — `sophior-article` section

### Blog Overzichtspagina — `sections/sophior-blog-listing.liquid`
- [x] Grid met artikel kaarten per blog-categorie
- [x] Artikel kaart: afbeelding + categorie badge + titel + excerpt + datum + leestijd + link
- [x] Navigatietabs: alle 5 blogs als tabs met actieve-staat highlighting
- [x] Paginering (Shopify native `paginate`)
- [x] Lege staat tonen als geen artikelen beschikbaar

### Artikel Pagina — `sections/sophior-article.liquid`
- [x] Hero afbeelding (full-width met gradient overlay + breadcrumb)
- [x] Artikel inhoud (rich text via `article.content`)
- [x] Auteur naam + datum + leestijd
- [x] Sociale deelknoppen (link kopiëren / WhatsApp / Facebook)
- [x] "Gerelateerde artikelen" sectie (max 3 artikelen uit zelfde blog)

### PDP Gidsen sectie — `sections/sophior-product-guides.liquid` ← _uitgesteld vanuit Sprint 4_
- [x] Section toont max 3 gids-artikelen gefilterd op `blogs[product.type]`
- [x] Kaart: afbeelding + categorie label + titel + excerpt + link
- [x] Sectie verborgen als geen artikelen beschikbaar
- [x] Toegevoegd aan `templates/product.json` na reviews-sectie

### Blog Preview op Homepage (Sprint 2 sectie activeren)
- [~] `sections/sophior-blog-preview.liquid` (aangemaakt Sprint 2) toont 3 meest recente artikelen — **werkt zodra klant testartikelen aanmaakt**

### Categorie SEO-tekstblok — `sections/sophior-collection-seo-text.liquid` ← _uitgesteld vanuit Sprint 3_
- [x] Bewerkbaar SEO tekst blok onderaan de categoriepagina
- [x] "Lees meer" toggle — tekst ingeklapt, uitklapbaar via knop
- [x] Toegevoegd aan `templates/collection.json` na product-grid

---

## Deviaties van plan

### 1. Filter tabs via blog-links (niet JS-filter)
De originele spec noemde `?blog=snijplanken` URL-filtering met JS. Gekozen voor een eenvoudigere aanpak: navigatietabs in `sophior-blog-listing` linken direct naar de bijbehorende blog-URL (`/blogs/[handle]`). Elke blog heeft zijn eigen overzichtspagina. Dit is stabieler, SEO-vriendelijker en vereist geen JS.

### 2. Leestijd berekend in Liquid
Berekening: `article.content | strip_html | split: ' ' | size | divided_by: 250 | at_least: 1`. Eenvoudig en effectief; ~250 woorden/min is standaard voor NL-tekst.

---

## Aangemaakte bestanden

### Sections (4 nieuw)
- `sections/sophior-blog-listing.liquid`
- `sections/sophior-article.liquid`
- `sections/sophior-product-guides.liquid`
- `sections/sophior-collection-seo-text.liquid`

### Assets (4 nieuw)
- `assets/sophior-blog-listing.css`
- `assets/sophior-article.css`
- `assets/sophior-product-guides.css`
- `assets/sophior-collection-seo-text.css`

### Gewijzigd
- `templates/blog.json` — `sophior-blog-listing` ipv `main-blog`
- `templates/article.json` — `sophior-article` ipv `main-article`
- `templates/product.json` — `sophior-product-guides` toegevoegd na reviews
- `templates/collection.json` — `sophior-collection-seo-text` toegevoegd na product-grid
- `locales/nl.schema.json` + `locales/en.default.schema.json` — 4 nieuwe section-sleutels

---

## Deliverable

Blog overzichtspagina + artikel template werkend. PDP gidsen sectie actief (verborgen totdat klant blogs aanmaakt). Categorie SEO-tekstblok live met "Lees meer" toggle. Homepage blog preview werkt zodra testartikelen beschikbaar zijn.
