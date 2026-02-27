# Section Contract: sophior-review-slider

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-review-slider` |
| **Bestand** | `sections/sophior-review-slider.liquid` |
| **CSS** | `assets/sophior-review-slider.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (meeste correcties), Sprint 8 (Judge.me integratie) |
| **Status** | Built — 4 correcties vereist + Judge.me placeholder |

## 2. Doel & Context

Auto-carousel met klantreviews. Momenteel placeholder-content; Sprint 8 vervangt door Judge.me widget. Dots-navigatie, pijl-knoppen, configureerbaar autoplay-interval.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `title` | `text` | `"Wat klanten zeggen"` | |
| `rating_aggregate` | `text` | `"4.9"` | Geaggregeerde score |
| `review_count` | `text` | `"2.847"` | Reviewaantal |
| `autoplay_interval` | `range` (3000–10000) | `5000` | Ms tussen slides |

### Blocks (type: `review`, max: 10)

| ID | Type | Default |
|---|---|---|
| `author` | `text` | `"Naam"` |
| `location` | `text` | `"Stad"` |
| `rating` | `range` (1–5) | `5` |
| `text` | `textarea` | `"Review tekst"` |
| `date` | `text` | `"..."` |

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-review-slider": {
  "name": "Review slider",
  "settings": {
    "title": { "label": "Sectietitel" },
    "rating_aggregate": { "label": "Gemiddelde score" },
    "review_count": { "label": "Aantal reviews" },
    "autoplay_interval": { "label": "Autoplay interval (ms)" }
  },
  "blocks": {
    "review": {
      "name": "Review",
      "settings": {
        "author": { "label": "Naam" },
        "location": { "label": "Locatie" },
        "rating": { "label": "Beoordeling" },
        "text": { "label": "Review tekst" },
        "date": { "label": "Datum" }
      }
    }
  },
  "prev_button": "Vorige review",
  "next_button": "Volgende review",
  "rating_label": "{{ rating }} van 5 sterren",
  "aggregate_label": "{{ rating }} sterren gemiddeld"
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| 5 reviews, autoplay | Standaard configuratie | Blok 1 |
| 1 review | 1 blok | Blok 2 |
| Autoplay uit | interval = 0 of schakelen | Blok 3 |
| Edge: lange review (>300 tekens) | | Blok 4 |
| Edge: 10 reviews (max) | | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | Scroll-snap, 1 review zichtbaar |
| ≥ 750px | 2–3 reviews zichtbaar |

## 7. A11y regels

- Pijl-buttons: `aria-label` via `t:` key — **CORRECTIE VEREIST** (hardcoded)
- Rating sterren: `aria-label="{{ block.settings.rating }} van 5 sterren"` via `t:` — **CORRECTIE VEREIST** (`"sterren"` hardcoded)
- Aggregaat-score: `aria-label` via `t:` — **CORRECTIE VEREIST**

## 8. Performance regels

- Geen externe libraries
- Autoplay stopt bij `prefers-reduced-motion`
- **CORRECTIE VEREIST:** Fragiele `~` sibling selector → dots-container binnen wrapper verplaatsen + `wrapper.querySelectorAll(...)`
- **CORRECTIE VEREIST:** `#4a6b60` → `var(--sophior-mid-green)` in CSS (2 regels)

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| 1 review | Pijlen disabled, dots verborgen |
| Geen reviews | Sectie rendert leeg |
| Judge.me widget actief (Sprint 8) | Placeholder blokken vervangen door widget-embed |

## 10. Acceptatiecriteria

- [ ] Fragiele `~` selector vervangen
- [ ] Aria-labels via `t:` (geen hardcoded NL-tekst)
- [ ] Geen hardcoded kleuren in CSS
- [ ] Autoplay stopt bij `prefers-reduced-motion`
- [ ] Judge.me placeholder duidelijk gemarkeerd in code
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
