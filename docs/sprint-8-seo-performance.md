# Sprint 8 — SEO & Performance

**Status:** ⏸ Gepland
**Duur:** 2–3 dagen
**Branch:** `feature/sprint-8-seo-performance`
**Vereist:** Sprints 1–7 afgerond

← [Sprint 7](sprint-7-integraties.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 9 →](sprint-9-golive.md)

---

## Doel

SEO-ready thema met JSON-LD structured data. Core Web Vitals doelen halen op staging.

---

## Performance Doelen

| Metric | Doel |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

---

## SEO Taken

### JSON-LD Structured Data

**Product schema (PDP) — `sections/sophior-product-main.liquid`:**
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "image": {{ product.featured_image | image_url: width: 800 | json }},
  "description": {{ product.description | strip_html | json }},
  "brand": { "@type": "Brand", "name": "SOPHIOR" },
  "offers": {
    "@type": "Offer",
    "price": {{ product.price | money_without_currency }},
    "priceCurrency": "EUR",
    "availability": "{% if product.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
  }
}
</script>
```

**FAQPage schema:** al aangemaakt in Sprint 4 (`sections/sophior-product-faq.liquid`)

**BreadcrumbList — `snippets/sophior-breadcrumbs.liquid`:**
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "{{ shop.url }}" },
    { "@type": "ListItem", "position": 2, "name": {{ collection.title | json }}, "item": "{{ shop.url }}{{ collection.url }}" },
    { "@type": "ListItem", "position": 3, "name": {{ product.title | json }} }
  ]
}
</script>
```

**Organization schema — `sections/sophior-footer.liquid`:**
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SOPHIOR",
  "url": "{{ shop.url }}",
  "logo": "{{ 'sophior-logo-dark.svg' | asset_url }}",
  "sameAs": [
    "https://instagram.com/sophior",
    "https://facebook.com/sophior"
  ]
}
</script>
```

### Meta Tags
- [ ] Meta title format instellen: `[Paginatitel] | SOPHIOR`
- [ ] Meta description per paginatype (via section schema settings)
- [ ] Open Graph tags (og:title, og:image, og:description) in `theme.liquid`
- [ ] H1/H2 hiërarchie controleren op alle pagina's

### Breadcrumbs
- [ ] `snippets/sophior-breadcrumbs.liquid` aanmaken
- [ ] Opnemen in PDP en categoriepagina templates
- [ ] JSON-LD BreadcrumbList meegeven

---

## Performance Taken

### Afbeeldingen
- [ ] Alle afbeeldingen: WebP formaat, Shopify CDN
- [ ] Lazy loading op alle afbeeldingen buiten viewport:
  ```liquid
  {{ product.featured_image | image_tag: loading: 'lazy', widths: '400,800,1200' }}
  ```
- [ ] Hero afbeelding: `loading="eager"` + `fetchpriority="high"` (LCP element)

### Fonts
- [ ] Nevolasty .woff2 preloaden in `<head>`:
  ```html
  <link rel="preload" href="{{ 'nevolasty.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
  ```
- [ ] Montserrat: `display=swap` via Google Fonts URL
- [ ] Font-display: swap instellen voor beide fonts

### Scripts
- [ ] Alle third-party scripts: `async` of `defer` valideren
- [ ] Geen render-blocking scripts in `<head>`
- [ ] JavaScript bundel size controleren

### CSS
- [ ] Kritieke above-the-fold CSS inline in `<head>`
- [ ] Overige CSS: `rel="preload"` + JavaScript fallback

### Audit
- [ ] Lighthouse audit draaien op staging (Chrome DevTools)
- [ ] PageSpeed Insights controleren
- [ ] Shopify Theme Check: `docker compose run --rm shopify shopify theme check`
- [ ] Eventuele bottlenecks oplossen

---

## Deliverable

Lighthouse score groen op alle metrics. JSON-LD gevalideerd via Google Rich Results Test. Breadcrumbs live.
