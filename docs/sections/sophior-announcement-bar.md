# Section Contract: sophior-announcement-bar

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-announcement-bar` |
| **Bestand** | `sections/sophior-announcement-bar.liquid` |
| **CSS** | `assets/sophior-announcement-bar.css` |
| **Sprint** | Sprint 1 (gebouwd), Sprint 3 (geauditeerd) |
| **Status** | Built — 0 kritieke correcties nodig |
| **Positie** | Bovenaan elke pagina (layout group: `header`) |

## 2. Doel & Context

Vaste balk bovenaan de pagina met 3 korte USP-berichten. Mobile: auto-carousel via CSS animation. Desktop: 3 items naast elkaar.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `usp_1_icon` | `text` | `"🚚"` | Emoji of tekst-icoon |
| `usp_1_text` | `text` | `"Gratis levering ..."` | USP-tekst |
| `usp_2_icon` | `text` | `"✓"` | |
| `usp_2_text` | `text` | `"..."` | |
| `usp_3_icon` | `text` | `"🌿"` | |
| `usp_3_text` | `text` | `"..."` | |

### Blocks
Geen blocks — vaste 3 USPs als flat settings.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-announcement-bar": {
  "name": "Aankondigingsbalk",
  "settings": {
    "header_usp1": { "content": "USP 1" },
    "usp_1_icon": { "label": "Icoon 1" },
    "usp_1_text": { "label": "Tekst 1" },
    "header_usp2": { "content": "USP 2" },
    "usp_2_icon": { "label": "Icoon 2" },
    "usp_2_text": { "label": "Tekst 2" },
    "header_usp3": { "content": "USP 3" },
    "usp_3_icon": { "label": "Icoon 3" },
    "usp_3_text": { "label": "Tekst 3" }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Standaard | Alle 3 USPs ingevuld | Blok 1 |
| 2 USPs | USP 3 leeg | Blok 2 |
| 1 USP | Alleen USP 1 | Blok 3 |
| Edge: lange tekst | USP 1 text >80 tekens | Blok 4 |
| Edge: emoji ontbreekt | icon = "" | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | CSS animation carousel (opacity/transform) — 1 item zichtbaar |
| ≥ 750px | 3 items naast elkaar, centered |

## 7. A11y regels

- Carousel: `aria-hidden="true"` op herhaalde items (screen readers zien de volgorde lineair)
- Geen interactieve elementen — geen keyboard focus nodig
- Kleurcontrast: cream tekst op dark-green — ratio ~8:1 ✅

## 8. Performance regels

- Geen afbeeldingen
- CSS animation: `animation-play-state: paused` via `prefers-reduced-motion`
- Geen JS

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| USP tekst leeg | Item verbergen |
| Alle 3 leeg | Balk rendert leeg (acceptabel — editor ziet dit) |

## 10. Acceptatiecriteria

- [ ] 3 USPs aanpasbaar via Admin
- [ ] Mobile carousel animeert soepel
- [ ] `prefers-reduced-motion`: animatie gestopt
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
