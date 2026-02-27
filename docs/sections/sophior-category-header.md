# Section Contract: sophior-category-header

## Meta

| Veld | Waarde |
|---|---|
| Handle | `sophior-category-header` |
| Type | Section (collection template) |
| Template(s) | `templates/collection.json` |
| CSS | `assets/sophior-category-header.css` |
| JS | Geen |
| Sprint | 4 |

## Doel

Vervangt `main-collection-banner`. Toont de collectienaam als `<h1>`, een breadcrumb, optionele beschrijving en optionele collectieafbeelding als hero-achtergrond met overlay.

## Schema

### Settings

| ID | Type | Default | Label-key |
|---|---|---|---|
| `show_description` | checkbox | `true` | `t:sections.sophior-category-header.settings.show_description.label` |
| `show_image` | checkbox | `true` | `t:sections.sophior-category-header.settings.show_image.label` |
| `overlay_opacity` | range 0–80 step 10 | `50` | `t:sections.sophior-category-header.settings.overlay_opacity.label` |

### Geen blocks

## Vertalingen

Keys toe te voegen aan `nl.schema.json` + `en.default.schema.json` vóór implementatie:

```json
"sophior-category-header": {
  "name": "SOPHIOR Categorie header",
  "settings": {
    "show_description": { "label": "Collectiebeschrijving tonen" },
    "show_image": { "label": "Collectieafbeelding als achtergrond tonen" },
    "overlay_opacity": { "label": "Afbeelding overlay-dekking (%)" }
  },
  "breadcrumb_home": "Home",
  "breadcrumb_label": "Navigatiepad",
  "presets": { "name": "SOPHIOR Categorie header" }
}
```

## Varianten-mapping (Playground)

| ID | Omschrijving | Instellingen |
|---|---|---|
| V1 | Standaard — afbeelding + beschrijving | `show_image: true, show_description: true` |
| V2 | Geen afbeelding (placeholder) | `show_image: false, show_description: true` |
| V3 | Afbeelding, geen beschrijving | `show_image: true, show_description: false` |
| E1 | Lichte overlay (20%) | `show_image: true, overlay_opacity: 20` |
| E2 | Zware overlay (80%) | `show_image: true, overlay_opacity: 80` |

## Responsive regels

| Breakpoint | Gedrag |
|---|---|
| Mobile (< 750px) | min-height 200px, tekst gecentreerd, padding `var(--sophior-space-xl)` |
| Desktop (≥ 750px) | min-height 360px, tekst links-uitgelijnd, max-width 1200px gecentreerd |

## A11y regels

- Breadcrumb in `<nav aria-label="{{ 'sections.sophior-category-header.breadcrumb_label' | t }}">` + `<ol>` semantiek
- `aria-current="page"` op het huidige (laatste) breadcrumb-item
- `<h1>` is de collectietitel — enige `<h1>` op de pagina
- Collectieafbeelding heeft `aria-hidden="true"` (decoratief, tekst beschrijft de pagina)
- `fetchpriority="high"` + `loading="eager"` op de hero-afbeelding (LCP element)
- Minimale tekst-contrast: cream op dark-green-75 overlay ≥ 4.5:1

## Performance regels

- Afbeelding: `fetchpriority: 'high'`, `loading: 'eager'`, `widths: '750, 1000, 1500'`
- `sizes="100vw"` — full-width image
- Geen JS nodig
- CSS is minimaal (< 60 regels)

## Edge cases

| Situatie | Verwacht gedrag |
|---|---|
| Geen collectieafbeelding | dark-green achtergrond, geen overlay |
| `show_image: false` | dark-green achtergrond |
| Collectie zonder beschrijving | `show_description` heeft geen effect; sectie rendeert niet |
| Zeer lange titel (60+ tekens) | Breekt op tweede regel via `word-break: break-word` |
| Lange beschrijving (200+ tekens) | Scrollt niet; max-width beperkt de breedte |

## Acceptatiecriteria

- [ ] `shopify theme check` 0 errors
- [ ] `<h1>` toont `collection.title` op `/collections/snijplanken`
- [ ] Breadcrumb: `Home › Snijplanken` correct met `aria-current="page"`
- [ ] Afbeelding heeft `fetchpriority="high"` en `loading="eager"`
- [ ] Zonder afbeelding: dark-green achtergrond zichtbaar
- [ ] `overlay_opacity` instelbaar via Shopify Admin (0–80%)
- [ ] Mobile: min-height 200px, tekst leesbaar op small screen
