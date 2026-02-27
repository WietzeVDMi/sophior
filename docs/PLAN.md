# SOPHIOR — Sprint Plan (Sprint 3–9)

_Vastgesteld: 2026-02-27 | Gebaseerd op briefing V4 + postmortem Sprint 0–2_

---

## Werkwijze (verplicht — verankerd vanuit postmortem)

1. **Contract-first:** schrijf `docs/sections/<handle>.md` vóórdat je een regel Liquid schrijft.
2. **Vertalingen-first:** voeg alle `t:` keys toe aan `nl.schema.json` + `en.default.schema.json` vóórdat je de schema-block schrijft.
3. **Token-only kleuren:** alle kleuren via `var(--sophior-*)`. Opacity-varianten definieer je eerst in `sophior-brand.css`.
4. **Kleine PRs:** max 400 regels diff per PR.
5. **CI-gate:** elk PR triggert `shopify theme check`. Merge nooit bij errors.
6. **Playground-first:** elke nieuwe section krijgt direct ≥3 varianten + 2 edge cases in `templates/page.playground.json`.
7. **Definition of Done geldt altijd** — zie onderaan dit document.

---

## Sprint 3 — Stabilisatie & Correctness

**Goal:** Alle Sprint 0–2 deliverables voldoen aan contracts, design tokens en CI-gates vóórdat nieuwe features beginnen.

### Stories

| # | Story | Deliverables | Acceptatiecriteria |
|---|---|---|---|
| 3.1 | CSS design tokens uitbreiden | `assets/sophior-brand.css` + 8 CSS-bestanden | Geen hardcoded kleuren buiten brand.css; `shopify theme check` 0 errors |
| 3.2 | Schema-vertalingen toevoegen | `locales/nl.schema.json`, `locales/en.default.schema.json` | Alle 11 section-names vertaald in Shopify Admin (NL) |
| 3.3 | Liquid hardcoded tekst fixen | 5 section-bestanden (bestsellers, review-slider, header, collections-grid, blog-preview) | Geen hardcoded NL-strings in Liquid; aria-labels via t: |
| 3.4 | CSS minor cleanup | 2 CSS-bestanden (lege regels, focus-visible toevoegen) | Geen lege regelsets; focus-visible zichtbaar op keyboard nav |
| 3.5 | Section contracts (11x) | `docs/sections/*.md` | Alle 11 contracts ingevuld en goedgekeurd |
| 3.6 | CI/CD + Playground | `.github/workflows/`, `.lighthouserc.json`, `templates/page.playground.json` | Theme check draait op PR; playground toont alle sections |

### Risico's

| Risico | Mitigatie |
|---|---|
| Schema-key wijzigingen breken bestaande content | Voeg alleen nieuwe keys toe; verwijder niets |
| Playground blokkeert Shopify CLI check | Test playground-template lokaal vóór push |

---

## Sprint 4 — Categoriepagina

**Goal:** Één gedeeld category-template dat correct filtert voor snijplanken, pannen, messen en accessoires.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 4.1 | Section contract schrijven | `docs/sections/sophior-category-header.md` |
| 4.2 | Category header section | `sections/sophior-category-header.liquid` + CSS |
| 4.3 | Filter + product grid | Dawn `main-collection-*` aanpassen of custom section |
| 4.4 | Product card snippet | `snippets/sophior-product-card.liquid` |
| 4.5 | Collection template | `templates/collection.json` bijwerken |
| 4.6 | Playground + contracts | Playground-blokken + docs |

### Acceptatiecriteria
- Collection `/collections/snijplanken` laadt correct en filtert op `product.type`
- Shopify Search & Discovery filterapp werkt via native `facets.liquid`
- Lighthouse Performance ≥95 op collection-pagina
- `shopify theme check` 0 errors

### Risico's
- Client heeft nog geen productafbeeldingen (WebP) → gebruik Shopify placeholders
- Shopify Search & Discovery app vereist aparte app-installatie in Admin

---

## Sprint 5 — Product Detail Page (PDP)

**Goal:** PDP met alle secties conform briefing: foto's, ATC (sticky), metafields, Judge.me placeholder, FAQ JSON-LD.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 5.1 | Section contracts | `docs/sections/sophior-pdp-*.md` (3–4 sections) |
| 5.2 | Product info + ATC section | `sections/sophior-product-info.liquid` + CSS |
| 5.3 | Zekerheden bar | `sections/sophior-certainties-bar.liquid` + CSS |
| 5.4 | Uitgebreide uitleg (metafield) | `sections/sophior-product-description.liquid` + CSS |
| 5.5 | Judge.me placeholder | Placeholder sectie, klaar voor public key |
| 5.6 | FAQ section + JSON-LD | `sections/sophior-product-faq.liquid` + structured data |
| 5.7 | PDP template | `templates/product.json` |
| 5.8 | Metafields aanmaken | Instructies in `docs/metafields.md` |

### Acceptatiecriteria
- ATC sticky op desktop (rechterkolom), volledig scherm op mobile
- `custom.long_description` rich text rendert correct
- FAQ-sectie genereert valide `FAQPage` JSON-LD (getest via Google Rich Results Test)
- `shopify theme check` 0 errors

### Risico's
- Judge.me public key nog niet geleverd → placeholder sectie
- Metafields moeten handmatig aangemaakt worden in Shopify Admin

---

## Sprint 6 — Cart Drawer + Over Ons

**Goal:** Cart drawer met verzending-progress, dynamische upsell en Trust bar. Statische Over Ons pagina.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 6.1 | Cart drawer section | `sections/sophior-cart-drawer.liquid` + CSS |
| 6.2 | Verzending progress bar | Snippet `sophior-shipping-progress.liquid` |
| 6.3 | Dynamische add-on upsell | Via `custom.addon_product` metafield |
| 6.4 | Trust bar in cart | Snippet `sophior-cart-trust.liquid` |
| 6.5 | Over Ons pagina | `templates/page.ons-verhaal.json` + section |

### Acceptatiecriteria
- Cart drawer opent slide-out van rechts
- Verzending progress bar toont drempel €59
- Add-on upsell toont correct product per `product.type`
- Upsell app (Rebuy of In Cart Upsell) gekozen en geïnstalleerd door client

### Risico's
- Cart upsell app keuze (Rebuy vs In Cart Upsell) nog niet bepaald door client → BLOCKER

---

## Sprint 7 — Blog / Gidsen

**Goal:** 5 blogs aangemaakt, artikelen gefiltered op PDP op `blog.handle = product.type`.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 7.1 | Blog index template | `templates/blog.json` |
| 7.2 | Blog artikel template | `templates/article.json` |
| 7.3 | Gidsen sectie op PDP | `sections/sophior-related-guides.liquid` + CSS |
| 7.4 | Blog filter per categorie | Liquid logica op basis van `blog.handle` |
| 7.5 | Blog aanmaken instructies | `docs/blogs.md` |

### Acceptatiecriteria
- 5 blogs aangemaakt: snijplanken, pannen, messen, accessoires, inspiratie-recepten
- PDP toont maximaal 3 gerelateerde gidsen gefilterd op categorie
- Blog-pagina toont recente artikelen met filters

---

## Sprint 8 — Integraties

**Goal:** Judge.me, Klaviyo, GA4 en Meta Pixel geactiveerd en werkend.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 8.1 | Judge.me review widget | PDP + homepage review-sectie updaten |
| 8.2 | Klaviyo formulier | Footer + pop-up koppelen |
| 8.3 | GA4 + Meta Pixel | Via Shopify Customer Events (geen script injection) |
| 8.4 | Organization JSON-LD | `layout/theme.liquid` |
| 8.5 | BreadcrumbList JSON-LD | Op collection + PDP |

### Blockers (wachten op client)
- Judge.me public key
- Klaviyo lijst-ID
- GA4 property ID + Meta Pixel ID

---

## Sprint 9 — SEO, Performance & Go Live

**Goal:** Alle Lighthouse gates gehaald, structured data gevalideerd, live zetten.

### Stories

| # | Story | Deliverables |
|---|---|---|
| 9.1 | Lighthouse audit | Alle pagina's ≥95 Performance, =100 SEO |
| 9.2 | Core Web Vitals optimalisatie | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| 9.3 | WebP afbeeldingen | Alle productafbeeldingen in WebP (client levert) |
| 9.4 | Structured data validatie | Product, FAQPage, Breadcrumb, Organization |
| 9.5 | Shopify Theme Store check | `shopify theme check` 0 errors op volledige theme |
| 9.6 | Go live | `shopify theme publish` op live store |

---

## Definition of Done (per Story)

- [ ] Section Contract goedgekeurd vóór implementatie
- [ ] Alle `t:` keys aanwezig in beide schema-locales
- [ ] Geen hardcoded kleuren in CSS
- [ ] `shopify theme check` 0 errors voor gewijzigde files
- [ ] Playground bijgewerkt met ≥3 varianten + 2 edge cases
- [ ] Mobile + desktop getest in Chrome DevTools
- [ ] PR-diff ≤ 400 regels
- [ ] Code-review goedgekeurd

## Definition of Done (per Sprint)

- [ ] Alle Stories voldoen aan bovenstaande Story-DoD
- [ ] CI-gate slaagt op develop branch
- [ ] Lighthouse scores gehaald op gewijzigde pagina's
- [ ] Geen regressions op pagina's uit vorige sprints
- [ ] Docs bijgewerkt (sprint-doc + PLAN.md sprint-status)
