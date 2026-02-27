# Section Contract: sophior-bestsellers

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-bestsellers` |
| **Bestand** | `sections/sophior-bestsellers.liquid` |
| **CSS** | `assets/sophior-bestsellers.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (meeste correcties) |
| **Status** | Built — 4 correcties vereist |

## 2. Doel & Context

Horizontale CSS scroll-snap slider met bestseller producten. Quick-add knop voegt product toe aan cart via AJAX (`/cart/add.js`). Pijl-navigatie + autoplay optioneel.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `title` | `text` | `"Onze bestsellers"` | |
| `collection` | `collection` | — | Bron van producten |
| `products_to_show` | `range` (2–8) | `4` | |
| `show_rating` | `checkbox` | `true` | Sterren tonen |
| `show_price` | `checkbox` | `true` | Prijs tonen |
| `show_quick_add` | `checkbox` | `true` | Quick-add knop |

### Blocks
Geen blocks — producten komen uit collectie-picker.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-bestsellers": {
  "name": "Bestseller slider",
  "settings": {
    "title": { "label": "Sectietitel" },
    "collection": { "label": "Collectie" },
    "products_to_show": { "label": "Aantal producten" },
    "show_rating": { "label": "Beoordeling tonen" },
    "show_price": { "label": "Prijs tonen" },
    "show_quick_add": { "label": "Snel toevoegen knop" }
  },
  "add_to_cart": "Toevoegen",
  "adding": "Bezig...",
  "added": "Toegevoegd ✓",
  "rating_label": "{{ rating }} van 5 sterren"
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Standaard | Collectie + alle opties aan | Blok 1 |
| Zonder quick-add | show_quick_add = false | Blok 2 |
| Zonder rating/prijs | show_rating + show_price = false | Blok 3 |
| Edge: geen collectie | collection = blank | Blok 4 |
| Edge: 1 product | products_to_show = 2, collectie met 1 product | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | Scroll-snap, 1 kaart zichtbaar (280px breed) |
| ≥ 750px | 2–3 kaarten zichtbaar in slider |
| ≥ 989px | 4 kaarten zichtbaar |

## 7. A11y regels

- Pijl-buttons: `aria-label` via `t:` key (prev/next)
- Quick-add button: `aria-label="{{ product.title }} toevoegen aan winkelwagen"` via `t:`
- Sterren rating: `aria-label="{{ rating }} van 5 sterren"` via `t:` key — **CORRECTIE VEREIST** (momenteel `"5 sterren"` hardcoded)
- Slider-track: `aria-label` op de wrapper

## 8. Performance regels

- Productafbeeldingen: `loading: 'lazy'`, `widths: '200, 300, 400'`
- Geen externe JS libraries
- AJAX: fetch naar `/cart/add.js` — geen page reload
- **CORRECTIE VEREIST:** Schema `"name": "Bestseller Slider"` → `"t:sections.sophior-bestsellers.name"`
- **CORRECTIE VEREIST:** `btn.textContent = '...'` → via `data-adding="{{ 'sections.sophior-bestsellers.adding' | t }}"` op button
- **CORRECTIE VEREIST:** `btn.textContent = '✓'` → via `data-added`
- **CORRECTIE VEREIST:** `#888` in CSS → `var(--sophior-mid-green)` of nieuwe token

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Collectie leeg | Geen producten getoond; sectie rendert leeg |
| Product zonder afbeelding | Shopify placeholder image |
| Product zonder rating | Geen sterren getoond |
| Snel klikken quick-add | Button disabled tijdens fetch — race condition voorkomen |
| Netwerk-error | `catch()` herstelt button-tekst + enabled-state |

## 10. Acceptatiecriteria

- [ ] Schema name via `t:` key
- [ ] JS-vertalingen via `data-*` attributen
- [ ] Aria-labels via `t:` (geen hardcoded Dutch)
- [ ] `#888` vervangen door CSS-token
- [ ] Quick-add werkt op alle producten in collectie
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
