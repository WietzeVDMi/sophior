# Sprint 4 — Product Detail Page (PDP)

**Status:** ⏸ Gepland
**Duur:** 4–5 dagen
**Branch:** `feature/sprint-4-pdp`
**Vereist:** Sprint 1 afgerond | Metafields aangemaakt in Shopify Admin

← [Sprint 3](sprint-3-categorie.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 5 →](sprint-5-cart-overons.md)

---

## Doel

Volledige Product Detail Page met foto carousel, sticky ATC, metafields, en alle informatie-secties.

---

## Pagina structuur (top → bottom)

```
Foto Carousel + Sticky Info/ATC
Zekerheden Bar
Uitgebreide Productuitleg     ← uit custom.long_description metafield
Judge.me Reviews              ← placeholder tot Sprint 7
Gidsen Sectie                 ← gefilterd op product.type
FAQ Sectie                    ← met JSON-LD schema
```

---

## Stap 1: Metafields aanmaken in Shopify Admin

Ga naar: **Admin → Custom data → Products → Add definition**

| Metafield key | Type | Omschrijving |
|---|---|---|
| `custom.long_description` | Rich Text | Uitgebreide SEO-uitleg op PDP |
| `custom.addon_product` | Product reference | Cross-sell add-on (olie/beschermer) |
| `custom.usp_1` | Single line text | USP bullet 1 bij ATC |
| `custom.usp_2` | Single line text | USP bullet 2 bij ATC |
| `custom.usp_3` | Single line text | USP bullet 3 bij ATC |
| `custom.core_promise` | Single line text | Kernbelofte onder producttitel |

---

## Taken

### Template
- [ ] `templates/product.json` aanpassen voor SOPHIOR secties

### Foto + Info + ATC — `sections/sophior-product-main.liquid`
- [ ] Links: foto carousel + thumbnails rij (horizontal scroll mobile)
- [ ] Rechts (sticky op desktop):
  - Producttitel (H1, Nevolasty)
  - Kernbelofte (`custom.core_promise` metafield)
  - Judge.me sterren + review count (placeholder)
  - Prijs (doorgestreepte verkoopprijs indien sale)
  - Variant selector (kleur/formaat)
  - Hoeveelheid selector
  - 3 USP bullets (`custom.usp_1/2/3` metafields, met icoon)
  - ATC knop (`#0D2B23`, hover `#CEA15D`)
  - Add-on upsell (conditioneel op `product.type`):
    ```liquid
    {% if product.type == 'snijplank' %}Onderhoudsolie{% endif %}
    {% if product.type == 'pan' %}Panbeschermers{% endif %}
    {% if product.type == 'mes' %}Mesbeschermer{% endif %}
    ```
- [ ] Mobile: gestapeld, carousel bovenaan

### Zekerheden Bar — `sections/sophior-product-guarantees.liquid`
- [ ] 4 iconen horizontaal: Kwaliteit | Garantie | Retour | Duurzaamheid
- [ ] Bewerkbaar via schema

### Uitgebreide Productuitleg — `sections/sophior-product-description.liquid`
- [ ] Inhoud uit `product.metafields.custom.long_description`
- [ ] Rich text rendering (Liquid: `{{ metafield.value }}`  )
- [ ] Verberg sectie als metafield leeg is

### Judge.me Reviews — `sections/sophior-product-reviews.liquid`
- [ ] Placeholder tot Sprint 7
- [ ] Sectie klaar voor widget integratie (div met juiste ID/class)

### Gidsen Sectie — `sections/sophior-product-guides.liquid`
- [ ] Blog artikelen filteren op `blog.handle == product.type`
- [ ] Max 3 artikelen tonen
- [ ] Kaart: afbeelding + titel + excerpt + link

### FAQ Sectie — `sections/sophior-product-faq.liquid`
- [ ] Accordion FAQ (click om te openen)
- [ ] JSON-LD FAQPage schema automatisch genereren:
  ```liquid
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {% for block in section.blocks %}
      {
        "@type": "Question",
        "name": {{ block.settings.question | json }},
        "acceptedAnswer": {
          "@type": "Answer",
          "text": {{ block.settings.answer | json }}
        }
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }
  </script>
  ```
- [ ] Schema: FAQ rijen toevoegen via Shopify editor (blocks)

---

## Deliverable

Volledig functionele PDP met metafields, sticky ATC, add-on upsell logica, FAQ + JSON-LD. Mobile-first.
