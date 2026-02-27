# Sprint 6 — Blog & Gidsen

**Status:** ⏸ Gepland
**Duur:** 2–3 dagen
**Branch:** `feature/sprint-6-blog`
**Vereist:** Sprint 1 afgerond

← [Sprint 5](sprint-5-cart-overons.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 7 →](sprint-7-integraties.md)

---

## Doel

Volledige blog structuur met 5 aparte Shopify blogs. Blog preview op PDP en homepage werkt via handle-filtering.

---

## Blogs aanmaken in Shopify Admin

Ga naar: **Admin → Online Store → Blog posts → Manage blogs**

| Blog naam | Handle | Gebruik |
|---|---|---|
| Snijplanken Gids | `snijplanken` | PDP snijplanken, header dropdown |
| Pannen Gids | `pannen` | PDP pannen, header dropdown |
| Messen Gids | `messen` | PDP messen, header dropdown |
| Accessoires Gids | `accessoires` | PDP accessoires, header dropdown |
| Inspiratie & Recepten | `inspiratie-recepten` | Algemene gidsen, header dropdown |

- [ ] Alle 5 blogs aanmaken in Shopify Admin
- [ ] Per blog 1–2 testartikelen aanmaken (voor testing filtering)

---

## Filtering logica

Blog artikelen worden op PDP gefilterd zodat alleen relevante gidsen verschijnen:

```liquid
{% assign product_blog = blogs[product.type] %}
{% for article in product_blog.articles limit: 3 %}
  {{ article.title }}
{% endfor %}
```

Dit werkt omdat `product.type` overeenkomt met de blog handle (bijv. `snijplank` → blog `snijplanken`).

---

## Taken

### Templates
- [ ] `templates/blog.json` aanpassen voor SOPHIOR stijl
- [ ] `templates/article.json` aanpassen voor SOPHIOR stijl

### Blog Overzichtspagina — `sections/sophior-blog-listing.liquid`
- [ ] Grid met artikel kaarten per blog-categorie
- [ ] Artikel kaart: afbeelding + categorie badge + titel + excerpt + datum + leestijd + link
- [ ] Filter tabs: "Alle gidsen | Snijplanken | Pannen | Messen | Accessoires | Inspiratie"
- [ ] Filter werkt via `?blog=snijplanken` URL parameter of JS filter

### Artikel Pagina — `sections/sophior-article.liquid`
- [ ] Hero afbeelding (full-width of 50/50 met titel)
- [ ] Artikel inhoud (rich text)
- [ ] Auteur naam + datum
- [ ] Sociale deelknoppen (link kopiëren / WhatsApp / Facebook)
- [ ] "Gerelateerde artikelen" sectie (3 artikelen uit zelfde blog)

### Blog Preview op PDP (Sprint 4 sectie activeren)
- [ ] `sections/sophior-product-guides.liquid` (aangemaakt Sprint 4) werkt via:
  ```liquid
  {% assign product_blog = blogs[product.type] %}
  ```
- [ ] Testen met testproducten van elk type

### Blog Preview op Homepage (Sprint 2 sectie activeren)
- [ ] `sections/sophior-blog-preview.liquid` (aangemaakt Sprint 2) toont 3 meest recente artikelen
- [ ] Werkt zodra echte artikelen zijn aangemaakt

---

## Deliverable

Alle 5 blogs live. Blog overzichtspagina + artikel template werkend. Filtering op PDP en homepage werkt.
