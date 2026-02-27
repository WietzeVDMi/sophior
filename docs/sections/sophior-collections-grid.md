# Section Contract: sophior-collections-grid

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-collections-grid` |
| **Bestand** | `sections/sophior-collections-grid.liquid` |
| **CSS** | `assets/sophior-collections-grid.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (CSS rgba + hardcoded labels) |
| **Status** | Built — CSS-token + default labels correctie vereist |

## 2. Doel & Context

4-koloms grid van collectie-kaarten (snijplanken, pannen, messen, accessoires). Elke kaart heeft een afbeelding, overlay met naam en CTA. Blokkenstructuur — max 4 blokken.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `title` | `text` | `"Onze categorieën"` | Sectietitel (optioneel) |
| `cta_label` | `text` | `"Bekijk collectie"` | Gedeelde CTA-tekst voor alle kaarten |

### Blocks (type: `collection_card`, max: 4)

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `collection` | `collection` | — | Shopify collectie picker |
| `label` | `text` | — | Overschrijft collectienaam |
| `image` | `image_picker` | — | Overschrijft collectie-image |

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-collections-grid": {
  "name": "Collecties raster",
  "settings": {
    "title": { "label": "Sectietitel" },
    "cta_label": { "label": "CTA-tekst (alle kaarten)" }
  },
  "blocks": {
    "collection_card": {
      "name": "Collectiekaart"
    }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| 4 kaarten met collecties | Alle 4 blokken + collecties gekoppeld | Blok 1 |
| 4 kaarten zonder collecties | Fallback handles en labels | Blok 2 |
| 2 kaarten | 2 blokken | Blok 3 |
| Edge: geen afbeelding | image + collectie.image = blank | Blok 4 |
| Edge: label overrride | Eigen label verschilt van collectienaam | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | 2×2 raster |
| ≥ 989px | 4 kolommen |

## 7. A11y regels

- Kaart-link: `aria-label="{{ col_label }}"` — beschrijvende link
- Afbeelding alt = `col_label | escape`
- Overlay-teksten zijn `aria-hidden` (reeds in link-label)

## 8. Performance regels

- Afbeeldingen: `loading: 'lazy'`, `widths: '300, 400, 600'`
- **CORRECTIE VEREIST:** `#1a4a3c` in gradient → `var(--sophior-mid-green)`
- **CORRECTIE VEREIST:** Hardcoded fallback labels (`'Snijplanken,Pannen,...'`) en `default_cta` ('Bekijk collectie') → via schema settings default of `t:` key

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Geen collectie gekozen | Fallback URL + label via index |
| Geen afbeelding | Lege placeholder div |
| < 4 blokken | Raster toont alleen aanwezige kaarten |

## 10. Acceptatiecriteria

- [ ] Collecties koppelbaar via Admin
- [ ] Fallback URLs werken zonder collecties
- [ ] Geen hardcoded strings buiten schema
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
