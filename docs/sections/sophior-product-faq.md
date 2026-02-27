# Section Contract: sophior-product-faq

**Handle:** `sophior-product-faq`
**Type:** PDP FAQ sectie met JSON-LD structured data
**Liquid:** `sections/sophior-product-faq.liquid`
**CSS:** `assets/sophior-product-faq.css`

---

## Doel

FAQ sectie op de PDP met native `<details>/<summary>` accordion.
Genereert `FAQPage` JSON-LD structured data voor Google rich results.
Max 10 vraag-antwoord blokken per sectie.

---

## Schema settings

| ID | Type | Default | Label |
|---|---|---|---|
| `heading` | text | `Veelgestelde vragen` | Sectietitel |
| `color_scheme` | color_scheme | `scheme-1` | Kleurschema |
| `padding_top` | range 0–100 step 4 | 48 | Opvulling boven |
| `padding_bottom` | range 0–100 step 4 | 48 | Opvulling onder |

## Blocks (max 10)

**Type: `question`**

| Setting ID | Type | Default | Label |
|---|---|---|---|
| `question` | text | — | Vraag |
| `answer` | richtext | — | Antwoord |

---

## JSON-LD structuur

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Vraag tekst",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Antwoord tekst (plain text, HTML gestript)"
      }
    }
  ]
}
```

---

## Responsive gedrag

| Breakpoint | Layout |
|---|---|
| Mobile (< 750px) | Volledige breedte |
| Desktop (≥ 990px) | Max-width 840px, gecentreerd |

---

## A11y

- Native `<details>/<summary>` — geen JS nodig
- `<h2>` voor sectietitel
- `<h3>` voor elke vraag in de `<summary>`
- `focus-visible` outline op summary

---

## Performance

- Geen JavaScript — puur native HTML accordion
- JSON-LD in `<script type="application/ld+json">` in `<head>` (via `content_for_header` Shopify doet dit automatisch)

---

## Edge cases

- Sectie met 0 blokken: sectie toont niet (omsloten in `if section.blocks.size > 0`)
- Antwoord als rich text: HTML gestript voor JSON-LD (`| strip_html`)
- Speciale tekens in JSON-LD: antwoord HTML-escaped voor JSON (`| escape`)

---

## Acceptatiecriteria

- [ ] Accordion klikt correct open/dicht
- [ ] `<summary>` bevat `<h3>` met vraag
- [ ] Antwoord als `<div class="rte">` in `<details>`
- [ ] `FAQPage` JSON-LD script aanwezig in DOM
- [ ] JSON-LD valide via schema.org validator
- [ ] Sectie verborgen als 0 blokken
- [ ] `focus-visible` stijl zichtbaar op toetsenbordnavigatie
