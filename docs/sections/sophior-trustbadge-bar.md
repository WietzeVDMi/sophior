# Section Contract: sophior-trustbadge-bar

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-trustbadge-bar` |
| **Bestand** | `sections/sophior-trustbadge-bar.liquid` |
| **CSS** | `assets/sophior-trustbadge-bar.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (CSS rgba + schema name fix) |
| **Status** | Built — CSS-tokens + schema name correctie vereist |

## 2. Doel & Context

Horizontale balk met 4 USP-badges direct onder de hero. Elke badge heeft een SVG-icoon (keuze uit 5) en een tekstregel.

## 3. Schema — Settings & Blocks

### Settings (4x herhaling per item)

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `icon_1` | `select` | `"truck"` | Icoontype (5 opties) |
| `text_1` | `text` | `"Gratis levering boven €59"` | USP tekst |
| `icon_2` | `select` | `"checkmark"` | |
| `text_2` | `text` | `"Nederlandse kwaliteit"` | |
| `icon_3` | `select` | `"star"` | |
| `text_3` | `text` | `"4.9 sterren reviews"` | |
| `icon_4` | `select` | `"shield"` | |
| `text_4` | `text` | `"2 jaar garantie"` | |

Icoon-opties: `checkmark`, `truck`, `leaf`, `star`, `shield`

### Blocks
Geen blocks — 4 flat items.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-trustbadge-bar": {
  "name": "Trustbadge balk",
  "settings": {
    "header_item1": { "content": "Badge 1" },
    "icon": { "label": "Icoon" },
    "text": { "label": "Tekst" },
    "header_item2": { "content": "Badge 2" },
    "header_item3": { "content": "Badge 3" },
    "header_item4": { "content": "Badge 4" },
    "icon_options": {
      "checkmark": "Vinkje",
      "truck": "Vrachtwagen",
      "leaf": "Blad",
      "star": "Ster",
      "shield": "Schild"
    }
  }
}
```

_Noot: select-option labels in schema worden niet vertaald via `t:` keys — dit is een Dawn-beperking. De hardcoded labels in de select-opties zijn acceptabel._

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Alle 4 badges | Volledig ingevuld | Blok 1 |
| 2 badges | text_3, text_4 leeg | Blok 2 |
| Alle icoon-types | Elk item een ander icoon | Blok 3 |
| Edge: lange tekst | text_1 > 50 tekens | Blok 4 |
| Edge: 1 badge | text_2/3/4 leeg | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | 2×2 raster |
| ≥ 750px | 4 naast elkaar, centered |

## 7. A11y regels

- SVG-iconen: `aria-hidden="true"` (decoratief)
- Tekst is zichtbaar — geen extra aria nodig

## 8. Performance regels

- Inline SVG via Liquid-variabelen — geen externe requests
- Geen JS
- **CORRECTIE VEREIST:** `rgba(13, 43, 35, 0.1)` en `rgba(13, 43, 35, 0.15)` → `var(--sophior-dark-green-10)` en `var(--sophior-dark-green-15)`
- **CORRECTIE VEREIST:** Schema `"name": "Trustbadge Bar"` → `"t:sections.sophior-trustbadge-bar.name"`

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Tekst leeg | Badge verborgen (`{%- unless item_text == blank -%}`) |
| Alle 4 leeg | Lege `<ul>` — sectie rendert leeg |

## 10. Acceptatiecriteria

- [ ] 4 badges aanpasbaar (tekst + icoon) via Admin
- [ ] Lege badge niet zichtbaar
- [ ] Geen hardcoded rgba in CSS
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
