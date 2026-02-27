# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SOPHIOR.nl — Shopify webshop voor premium keukenproducten (snijplanken, pannen, messen, accessoires). D2C, NL-only, mobile-first.

**Platform:** Shopify met Dawn thema (open-source basis)
**Taal:** Nederlands (content, commits, comments)
**Volledig briefingsdocument:** `Nieuwe website SOPHIOR 2026 - V4 - Claude.docx`

## Ontwikkelomgeving

```bash
# Shopify CLI lokaal development
shopify theme dev --store sophior-keuken.myshopify.com

# Thema initialiseren (eenmalig)
shopify theme init --theme-url https://github.com/Shopify/dawn

# Pushen naar staging
shopify theme push --store sophior-keuken.myshopify.com --theme-id [staging-id]

# Publiceren naar live
shopify theme publish --store sophior-keuken.myshopify.com --theme-id [live-id]
```

## Tech Stack

| Onderdeel | Keuze |
|---|---|
| Thema base | Dawn (Shopify open-source) |
| Reviews | Judge.me |
| E-mail | Klaviyo |
| Cart upsell | Rebuy Smart Cart OF In Cart Upsell |
| Filters | Shopify Search & Discovery app (gratis) |
| Analytics | GA4 + Meta Pixel via Shopify Customer Events |
| Fonts | Nevolasty (headlines, .woff2 nodig) + Montserrat (body, Google Fonts) |

## Brand & Design Tokens

### Kleuren — gebruik UITSLUITEND deze waarden

```css
--color-dark-green: #0D2B23;   /* Primair — achtergronden, buttons, tekst */
--color-gold: #CEA15D;          /* Accent — iconen, hover, sterren, badges */
--color-cream: #F1EFEA;         /* Hoofdachtergrond pagina's, kaarten */
--color-light-tan: #E3D7C1;     /* Secundaire achtergronden, dividers */
--color-light-gold: #EFCF96;    /* Secundaire accenten, lichte badges */
--color-white: #FFFFFF;         /* Review kaarten, productfoto-achtergronden */
```

### Fonts

```liquid
{%- comment -%} In <head> — preload voor LCP {%- endcomment -%}
<link rel="preload" href="{{ 'nevolasty.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" as="style">
```

- **Nevolasty Light:** alle H1/H2/sectietitels — ⚠ `.woff2` bestand nog te leveren
- **Montserrat 300/400/500/700:** body, navigatie, buttons, prijzen

### Logo gebruik

- Donkere achtergrond (`#0D2B23`): logo in wit
- Lichte achtergrond (`#F1EFEA`): logo in zwart
- Clear space: minimaal 56px rondom — nooit clippen

## Architectuur: Shopify Liquid Structuur

Dawn behoudt zijn mappenstructuur. Custom SOPHIOR-code gaat in:

```
assets/          ← Alle custom CSS als losse .css bestanden (niet inline)
sections/        ← Custom Liquid sections met volledige schema-instellingen
snippets/        ← Herbruikbare Liquid snippets (mega menu, product card, etc.)
templates/       ← JSON templates per paginatype
locales/         ← Vertalingen (NL)
```

**Kernregel:** Alle custom CSS in `/assets` als aparte bestanden, nooit inline in Liquid. Alle teksten in sections aanpasbaar via section schema.

## Pagina Templates & Secties

### Homepage (`/`)
Announcement Bar → Header/Mega Menu → Hero (50/50 split) → Trustbadge Bar → Collecties Grid → Bestseller Slider → USP Accordeon (50/50) → Review Slider → Blog Preview (Gidsen) → Pre-footer Trustbar → Footer

### Categoriepagina's (`/collections/[handle]`)
Één gedeeld template voor: snijplanken, pannen, messen, accessoires. Filtert per `product.type`.

### PDP (`/products/[handle]`)
Foto's + Info + ATC (sticky rechts) → Zekerheden Bar → Uitgebreide Uitleg (metafield) → Judge.me Reviews → Gidsen (gefilterd per categorie) → FAQ (JSON-LD schema)

### Cart Drawer
Slide-out van rechts. Volgorde: Verzending Progress Bar (drempel €59) → Producten → Dynamische Add-on Upsell → Totaal + Checkout → Trust bar

## Shopify Metafields (aanmaken in Admin > Custom data > Products)

| Metafield key | Type | Gebruik |
|---|---|---|
| `custom.long_description` | Rich Text | SEO-uitleg sectie op PDP |
| `custom.addon_product` | Product reference | Cross-sell add-on (olie/beschermer) |
| `custom.usp_1` / `usp_2` / `usp_3` | Single line text | 3 USP bullets bij ATC |
| `custom.core_promise` | Single line text | Kernbelofte onder producttitel |

### Add-on logica (cart + PDP)
```liquid
{% if product.type == 'snijplank' %}Onderhoudsolie{% endif %}
{% if product.type == 'pan' %}Panbeschermers{% endif %}
{% if product.type == 'mes' %}Mesbeschermer{% endif %}
```

## Blog / Gidsen Structuur

5 Shopify blogs aanmaken onder *Online Store > Blog posts*:
- `snijplanken` / `pannen` / `messen` / `accessoires` / `inspiratie-recepten`

Blog-artikelen worden op PDP gefilterd op `blog.handle` dat overeenkomt met `product.type`.

## Shopify Apps & Integraties

- **Judge.me:** widget op PDP (`product-review-widget`) en homepage. Public key opvragen bij klant.
- **Klaviyo:** footer formulier + pop-up koppelen aan Klaviyo lijst-ID (nog te leveren).
- **Analytics:** GA4 + Meta Pixel installeren via *Shopify Customer Events*, nooit via script injection in `theme.liquid`.
- **Shopify Search & Discovery:** voor category filters (pills op categoriepagina). Geen eigen filter-logica nodig.

## GitHub Workflow

```
main      → live store (shopify theme publish)
develop   → staging/review
feature/* → feature branches per sectie
```

**Branch naming:** `feature/homepage-hero`, `feature/category-page`, `feature/pdp`, etc.
**Commit messages:** Nederlands, beschrijvend — bijv. `Voeg bestseller slider toe aan homepage`
**Pull requests:** per afgeronde sectie, review vóór merge naar `main`

## Bouw-volgorde

1. Dawn thema initialiseren + GitHub koppelen
2. Brand setup: kleuren, Nevolasty font, Montserrat, logo variants
3. Globale componenten: Announcement Bar, Header/Mega Menu, Footer
4. Homepage secties (top → bottom)
5. Categoriepagina template (één template, 4 collecties)
6. PDP template
7. Cart Drawer + upsell app configuratie
8. Over Ons pagina (`/pages/ons-verhaal`)
9. Blog/Gidsen structuur
10. Metafields aanmaken + Judge.me + Klaviyo + Analytics
11. SEO: JSON-LD structured data (Product, FAQPage, BreadcrumbList, Organization)
12. Performance audit (LCP < 2.5s, CLS < 0.1, alle afbeeldingen WebP + lazy)

## Performance Vereisten

- Alle afbeeldingen: WebP, lazy loading, Shopify native CDN
- Nevolasty font: preload in `<head>` als .woff2
- Third-party scripts: async/defer — nooit blokkerende scripts
- Doelen: LCP < 2.5s | CLS < 0.1 | INP < 200ms

## Open TODO's (nog te leveren door klant)

- [ ] Nevolasty .woff2 fontbestand + commerciële weblicentie bevestiging
- [ ] Logo SVG + PNG (primary wordmark + symbol) in zwart, wit en kleur
- [ ] Judge.me public key
- [ ] Klaviyo lijst-ID
- [ ] GA4 property ID + Meta Pixel ID
- [ ] Productafbeeldingen in WebP per product
- [ ] Cart upsell app keuze: Rebuy Smart Cart OF In Cart Upsell
