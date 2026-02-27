# Sprint 7 — Integraties & Apps

**Status:** 🔒 Wacht op klant (API keys + app keuze)
**Duur:** 3–4 dagen
**Branch:** `feature/sprint-7-integraties`
**Vereist:** Sprints 1–6 afgerond | Alle API keys + IDs van klant

← [Sprint 6](sprint-6-blog.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 8 →](sprint-8-seo-performance.md)

---

## Doel

Alle externe services live en werkend: reviews, e-mail, analytics en cart upsell app.

---

## Wacht op klant

| Asset | Status |
|---|---|
| Judge.me public key | ❌ Niet ontvangen |
| Klaviyo lijst-ID | ❌ Niet ontvangen |
| GA4 property ID | ❌ Niet ontvangen |
| Meta Pixel ID | ❌ Niet ontvangen |
| Cart upsell app keuze (Rebuy vs In Cart Upsell) | ❌ Niet ontvangen |

---

## Judge.me Reviews

**Installatie:**
- [ ] Judge.me app installeren via Shopify App Store
- [ ] Public API key invoeren in Judge.me instellingen
- [ ] Reviews importeren (indien bestaande reviews beschikbaar zijn)

**Integratie in thema:**
- [ ] Review widget op PDP activeren in `sections/sophior-product-reviews.liquid`
- [ ] Review slider op homepage activeren in `sections/sophior-review-slider.liquid`
- [ ] Sterren snippet vervangen door Judge.me snippet in `snippets/sophior-product-card.liquid`

**Widget code (PDP):**
```liquid
<div id="judgeme_product_reviews" class="jdgm-widget jdgm-review-widget">
  {{ product.metafields.judgeme.badge }}
</div>
```

---

## Klaviyo

**Installatie:**
- [ ] Klaviyo app installeren + account koppelen
- [ ] Lijst-ID invoeren in Klaviyo instellingen

**Integratie:**
- [ ] Footer newsletter formulier activeren (placeholder uit Sprint 1):
  ```html
  <div class="klaviyo-form-[LIJST-ID]"></div>
  ```
- [ ] Pop-up configureren in Klaviyo dashboard (trigger: 30s of exit-intent)
- [ ] Welcome flow aanmaken in Klaviyo (buiten scope thema)

---

## GA4 + Meta Pixel

**Kernregel:** NOOIT via `<script>` tags in `theme.liquid` — altijd via Shopify Customer Events.

**Installatie GA4:**
- [ ] Ga naar **Admin → Settings → Customer events**
- [ ] Voeg Google Analytics pixel toe
- [ ] Property ID (`G-XXXXXXXXXX`) invoeren
- [ ] Events testen via GA4 DebugView: `page_view`, `view_item`, `add_to_cart`, `purchase`

**Installatie Meta Pixel:**
- [ ] Voeg Meta (Facebook) pixel toe via Customer Events
- [ ] Pixel ID invoeren
- [ ] Events testen via Meta Events Manager: `PageView`, `ViewContent`, `AddToCart`, `Purchase`

---

## Cart Upsell App

**Optie A — Rebuy Smart Cart:**
- [ ] App installeren
- [ ] Smart Cart configureren als vervanging van default cart
- [ ] Upsell regels instellen per product.type
- [ ] Stijl aanpassen aan SOPHIOR brand kleuren

**Optie B — In Cart Upsell:**
- [ ] App installeren
- [ ] Upsell widgets configureren in cart drawer
- [ ] Regels: "Als cart bevat snijplank → toon onderhoudsolie"

---

## Deliverable

Alle integraties werkend: reviews live op PDP + homepage, Klaviyo formulier actief, GA4 + Meta Pixel tracken events, cart upsell app geconfigureerd.
