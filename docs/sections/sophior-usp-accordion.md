# Section Contract: sophior-usp-accordion

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-usp-accordion` |
| **Bestand** | `sections/sophior-usp-accordion.liquid` |
| **CSS** | `assets/sophior-usp-accordion.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (CSS: hardcoded kleuren + lege regelset) |
| **Status** | Built — CSS-token correcties vereist |

## 2. Doel & Context

50/50 layout: linkerkant afbeelding of placeholder, rechterkant accordion met USP-vragen/antwoorden. Native `<details>/<summary>` — geen JS nodig.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default |
|---|---|---|
| `title` | `text` | `"Waarom SOPHIOR?"` |
| `image` | `image_picker` | — |

### Blocks (type: `item`, max: 5)

| ID | Type | Default |
|---|---|---|
| `question` | `text` | `"..."` |
| `answer` | `textarea` | `"..."` |

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-usp-accordion": {
  "name": "USP Accordeon",
  "settings": {
    "title": { "label": "Sectietitel" },
    "image": { "label": "Afbeelding (linkerkolom)" }
  },
  "blocks": {
    "item": {
      "name": "Accordeon item",
      "settings": {
        "question": { "label": "Vraag" },
        "answer": { "label": "Antwoord" }
      }
    }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Volledig | 5 items + afbeelding | Blok 1 |
| Zonder afbeelding | image = blank | Blok 2 |
| 1 item (standaard open) | 1 blok | Blok 3 |
| Edge: lang antwoord (>300 tekens) | | Blok 4 |
| Edge: geen items | 0 blokken | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | Afbeelding bovenaan, accordion eronder |
| ≥ 750px | 50/50 naast elkaar |

## 7. A11y regels

- `<details>/<summary>`: native keyboard-navigatie (Enter/Space) ✅
- Chevron-icoon: `aria-hidden="true"` ✅
- Eerste item `open` op paginaload (eerste antwoord zichtbaar)
- Focus-visible: **CORRECTIE VEREIST** — voeg `:focus-visible` stijl toe op `summary`

## 8. Performance regels

- Geen JS ✅
- Chevron: inline SVG
- Afbeelding: `loading: 'lazy'`, Shopify `image_tag`
- **CORRECTIE VEREIST:** `#4a6b60` → `var(--sophior-mid-green)` in CSS
- **CORRECTIE VEREIST:** `#1a4a3c` → `var(--sophior-mid-green)` in placeholder-gradient
- **CORRECTIE VEREIST:** Lege regelset `.sophior-usp-accordion__content {}` verwijderen

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Geen afbeelding | Placeholder gradient met `--sophior-mid-green` |
| Geen items | Accordion-container leeg |
| 5 items (max) | Shopify Admin blokkeert extra |

## 10. Acceptatiecriteria

- [ ] Accordion werkt zonder JS
- [ ] Focus-visible op summary-elementen
- [ ] Geen hardcoded kleuren in CSS
- [ ] Lege regelset verwijderd
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
