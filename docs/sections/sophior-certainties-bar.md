# Section Contract: sophior-certainties-bar

**Handle:** `sophior-certainties-bar`
**Type:** PDP trust/zekerhedenbar — onder ATC-sectie
**Liquid:** `sections/sophior-certainties-bar.liquid`
**CSS:** `assets/sophior-certainties-bar.css`

---

## Doel

Horizontale balk met 4 configureerbare zekerheden (icoon + tekst) direct onder het hoofdproduct.
Versterkt vertrouwen: veilig betalen, gratis verzending, 30-dagen retour, kwaliteitsgarantie.

---

## Schema settings

| ID | Type | Default | Label |
|---|---|---|---|
| `color_scheme` | color_scheme | `scheme-1` | Kleurschema |
| `padding_top` | range 0–100 step 4 | 24 | Opvulling boven |
| `padding_bottom` | range 0–100 step 4 | 24 | Opvulling onder |

## Blocks (max 6)

**Type: `item`**

| Setting ID | Type | Default | Label |
|---|---|---|---|
| `icon_type` | select | `lock` | Icoon (lock / truck / return / star / leaf / shield) |
| `text` | text | — | Tekst |

---

## Variants mapping

| Variant | Configuratie |
|---|---|
| Standaard (4 items) | lock + truck + return + star |
| Donker thema | `color_scheme: scheme-2` (donkere achtergrond) |
| 3 items | 1 item verwijderen in Admin |

---

## Responsive gedrag

| Breakpoint | Layout |
|---|---|
| Mobile (< 750px) | 2×2 grid |
| Tablet+ (≥ 750px) | 1 rij, 4 kolommen gelijk verdeeld |

---

## A11y

- Sectie heeft `aria-label` via schema heading setting (optioneel)
- Iconen decoratief: `aria-hidden="true"` op SVG/span
- Tekst zichtbaar en voldoende contrast op beide kleurschema's

---

## Performance

- Geen afbeeldingen — alleen tekst + CSS iconen
- CSS via `stylesheet_tag` bovenaan sectie

---

## Edge cases

- Minder dan 4 items: flexbox vult resterende ruimte op
- Leeg blok: toon niets (Liquid `if block.settings.text != blank`)
- Meer dan 4 items op mobile: wraps naar nieuwe rij

---

## Acceptatiecriteria

- [ ] 4 zekerheidsitems tonen op desktop in 1 rij
- [ ] 2×2 grid op mobile
- [ ] Icoon zichtbaar voor elk item
- [ ] Tekst aanpasbaar via Admin
- [ ] Kleurschema wissel werkt (licht / donker)
