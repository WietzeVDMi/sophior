# Section Contract: sophior-trustbar-footer

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-trustbar-footer` |
| **Bestand** | `sections/sophior-trustbar-footer.liquid` |
| **CSS** | `assets/sophior-trustbar-footer.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (CSS: hardcoded #4a6b60) |
| **Status** | Built — 1 CSS-token correctie vereist |

## 2. Doel & Context

Pre-footer trust balk (4 blokken) boven de footer. Elk blok: icoon + title + omschrijving. Benadrukt klantenservice, garantie en verzendvoordelen op alle pagina's.

## 3. Schema — Settings & Blocks

### Settings
Geen section-level settings.

### Blocks (type: `item`, max: 4)

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `icon` | `select` | `"truck"` | 6 opties: truck, return, card, headset, shield, leaf |
| `title` | `text` | `"..."` | |
| `text` | `textarea` | `"..."` | |

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-trustbar-footer": {
  "name": "Pre-footer trustbalk",
  "blocks": {
    "item": {
      "name": "Trustitem",
      "settings": {
        "icon": { "label": "Icoon" },
        "title": { "label": "Titel" },
        "text": { "label": "Beschrijving" }
      }
    }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| 4 items volledig | Alle 4 blokken | Blok 1 |
| 2 items | 2 blokken | Blok 2 |
| Alle icoon-types | Elk blok ander icoon (6 types) | Blok 3 |
| Edge: lange beschrijving | >100 tekens | Blok 4 |
| Edge: 1 item | | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | 2×2 raster |
| ≥ 750px | 4 kolommen naast elkaar |

## 7. A11y regels

- SVG-iconen: `aria-hidden="true"` (decoratief) ✅
- `<strong>` voor titel, `<p>` voor beschrijving ✅

## 8. Performance regels

- Inline SVG via Liquid-variabelen — geen externe requests
- Geen JS
- **CORRECTIE VEREIST:** `#4a6b60` → `var(--sophior-mid-green)` in CSS

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| 0 blokken | Sectie rendert leeg |
| 4 blokken (max) | Admin blokkeert extra blok |

## 10. Acceptatiecriteria

- [ ] Blokken aanpasbaar via Admin (icoon + tekst)
- [ ] Geen hardcoded kleuren
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
