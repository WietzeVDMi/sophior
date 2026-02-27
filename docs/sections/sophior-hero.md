# Section Contract: sophior-hero

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-hero` |
| **Bestand** | `sections/sophior-hero.liquid` |
| **CSS** | `assets/sophior-hero.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (CSS: hardcoded #1a4a3c fix) |
| **Status** | Built — 1 CSS-correctie vereist |

## 2. Doel & Context

50/50 split hero: linkerkant tekst (H1 + subheading + CTA-button), rechterkant afbeelding. LCP-element — afbeelding met `loading="eager"` en `fetchpriority="high"`.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `heading` | `text` | `"Premium keukenmessen & snijplanken"` | H1 — LCP-tekst |
| `subheading` | `textarea` | `"Handgemaakt voor thuiskoks..."` | |
| `cta_label` | `text` | `"Bekijk de collectie"` | Button tekst |
| `cta_link` | `url` | — | Button URL |
| `image` | `image_picker` | — | Rechterkolom afbeelding |

### Blocks
Geen blocks.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-hero": {
  "name": "Hero",
  "settings": {
    "heading": { "label": "Hoofdtitel (H1)" },
    "subheading": { "label": "Ondertitel" },
    "cta_label": { "label": "Button tekst" },
    "cta_link": { "label": "Button link" },
    "image": { "label": "Afbeelding (rechterkolom)" }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Standaard | Heading + subheading + CTA + afbeelding | Blok 1 |
| Zonder CTA | cta_label = "" | Blok 2 |
| Zonder subheading | subheading = "" | Blok 3 |
| Edge: geen afbeelding | image = blank → placeholder SVG | Blok 4 |
| Edge: lange heading (>60 tekens) | Break + layout test | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | Stapelindeling: afbeelding boven, tekst onder |
| ≥ 750px | 50/50 side-by-side raster |

## 7. A11y regels

- `<section aria-label="{{ heading }}">` — section-landmark
- Afbeelding alt = `section.settings.heading | escape`
- Placeholder SVG: `aria-hidden="true"`
- CTA is een `<a>` (geen `<button>`) — navigatie naar collectie

## 8. Performance regels

- Afbeelding: `loading: 'eager'`, `fetchpriority: 'high'` — is het LCP-element
- `widths: '600, 900, 1200'`, `sizes: '(max-width: 749px) 100vw, 50vw'`
- **CORRECTIE VEREIST:** placeholder gradient gebruikt `#1a4a3c` → vervangen door `var(--sophior-mid-green)`

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Afbeelding ontbreekt | Decoratieve placeholder SVG met gradient-achtergrond |
| CTA-tekst leeg | Button-element verbergen |
| Subheading leeg | `<p>` verbergen |

## 10. Acceptatiecriteria

- [ ] LCP afbeelding heeft `loading="eager"` en `fetchpriority="high"`
- [ ] Placeholder gradient gebruikt `var(--sophior-mid-green)` (geen `#1a4a3c`)
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
