# Section Contract: sophior-product-description

**Handle:** `sophior-product-description`
**Type:** PDP rijke product beschrijving — SEO-sectie
**Liquid:** `sections/sophior-product-description.liquid`
**CSS:** `assets/sophior-product-description.css`

---

## Doel

Rendert de uitgebreide productbeschrijving uit het metafield `custom.long_description` (Rich Text).
SEO-gericht: volledige producttekst voor zoekmachines.

---

## Schema settings

| ID | Type | Default | Label |
|---|---|---|---|
| `heading` | text | `Uitgebreide beschrijving` | Sectietitel |
| `show_heading` | checkbox | true | Titel tonen |
| `color_scheme` | color_scheme | `scheme-1` | Kleurschema |
| `padding_top` | range 0–100 step 4 | 48 | Opvulling boven |
| `padding_bottom` | range 0–100 step 4 | 48 | Opvulling onder |

---

## Metafields

| Key | Type | Gebruik |
|---|---|---|
| `custom.long_description` | Rich Text | Inhoud sectie |

---

## Responsive gedrag

| Breakpoint | Layout |
|---|---|
| Mobile (< 750px) | Volledige breedte, 1-koloms |
| Desktop (≥ 990px) | Max-width 840px, gecentreerd |

---

## A11y

- Sectietitel als `<h2>` (na `<h1>` van product)
- Rich text content via `.rte` klasse (Dawn's rich text styling)
- Verborgen als metafield leeg is — geen lege sectie

---

## Performance

- Rich text vanuit metafield: geen extra requests
- Sectie toont niets als `custom.long_description` leeg is

---

## Edge cases

- Leeg metafield: sectie rendert niet (omsloten in `if != blank`)
- Geen heading gewenst: `show_heading: false` verbergt `<h2>`
- Zeer lange beschrijving: geen maximum — volledige SEO-tekst gewenst

---

## Acceptatiecriteria

- [ ] Rich text content van metafield `custom.long_description` zichtbaar
- [ ] `<h2>` sectietitel aanpasbaar via schema
- [ ] Sectie verborgen als metafield leeg is
- [ ] `.rte` styling actief (headings, lijsten, links opgemaakt)
- [ ] Max-width 840px op desktop
