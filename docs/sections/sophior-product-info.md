# Section Contract: sophior-product-info

**Handle:** `sophior-product-info`
**Type:** PDP hoofdsectie — vervangt `main-product`
**Liquid:** `sections/sophior-product-info.liquid`
**CSS:** `assets/sophior-product-info.css`

---

## Doel

Volledige productpagina (above the fold): mediagalerij links, productinfo + sticky ATC rechts.
Rendert Dawn's `product-media-gallery`, `product-variant-picker` en `buy-buttons` snippets.
Voegt SOPHIOR metafields toe: kernbelofte + USP-lijst.

---

## Schema settings

| ID | Type | Default | Label |
|---|---|---|---|
| `enable_sticky_info` | checkbox | true | Sticky info panel |
| `picker_type` | select | `button` | Variant kiezer stijl (button / dropdown) |
| `show_dynamic_checkout` | checkbox | true | Dynamische checkout tonen |
| `show_gift_card_recipient` | checkbox | false | Cadeaukaart ontvanger formulier |
| `padding_top` | range 0–100 step 4 | 36 | Opvulling boven |
| `padding_bottom` | range 0–100 step 4 | 12 | Opvulling onder |

---

## Metafields (geen schema settings — direct via `product.metafields.custom.*`)

| Key | Type | Positie |
|---|---|---|
| `custom.core_promise` | Single line text | Onder `<h1>`, boven prijs |
| `custom.usp_1` | Single line text | Onder variant picker, boven ATC |
| `custom.usp_2` | Single line text | id. |
| `custom.usp_3` | Single line text | id. |

---

## Responsive gedrag

| Breakpoint | Layout |
|---|---|
| Mobile (< 750px) | Galerij boven, info eronder (1-koloms) |
| Tablet+ (≥ 750px) | 2 kolommen — galerij 55%, info 45% |
| Desktop (≥ 990px) | Info wordt sticky naast galerij (`product__column-sticky`) |

---

## A11y

- `<h1>` voor producttitel — éénmaal per pagina
- Prijs div heeft `role="status"` voor screenreader-updates
- USP-lijst als `<ul>` met `<li>` items
- Kernbelofte als `<p>` element

---

## Performance

- Dawn's media gallery snippets: eerste afbeelding `loading="eager"` + `fetchpriority="high"`
- CSS via `stylesheet_tag` bovenaan de sectie
- JS `defer` via `product-info.js` + `product-form.js`

---

## Edge cases

- Geen metafield `core_promise`: blok wordt overgeslagen (`if != blank`)
- Geen metafield USPs: USP-lijst wordt overgeslagen
- Enkel standaard variant: variant picker wordt overgeslagen (Dawn's `unless product.has_only_default_variant`)
- Product zonder afbeeldingen: Dawn galerij rendert placeholder automatisch

---

## Acceptatiecriteria

- [ ] Galerij toont productfoto's (stacked layout desktop)
- [ ] Variant picker actief en wisselt prijs via AJAX
- [ ] ATC button voegt product toe aan winkelwagen
- [ ] Sticky info panel werkt op desktop (scrollt met pagina tot einde galerij)
- [ ] `core_promise` metafield toont onder titel als ingevuld
- [ ] USP-lijst toont met 1–3 items als metafields ingevuld zijn
- [ ] Layout responsive: 1-koloms mobile → 2-koloms tablet+
