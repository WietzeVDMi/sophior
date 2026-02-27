# Sprint 9 — QA, Staging & Go Live

**Status:** ⏸ Gepland
**Duur:** 2–3 dagen
**Branch:** `develop` → `main`
**Vereist:** Alle sprints (0–8) afgerond

← [Sprint 8](sprint-8-seo-performance.md) | [Terug naar Project Plan](../PROJECT-PLAN.md)

---

## Doel

Volledig getest op staging. Klantgoedkeuring. SOPHIOR.nl live met nieuw design.

---

## QA Checklist

### Browser & Device testing

| Platform | Browser | Getest? |
|---|---|---|
| Desktop | Chrome | ☐ |
| Desktop | Firefox | ☐ |
| Desktop | Safari | ☐ |
| Mobile iOS | Safari | ☐ |
| Mobile Android | Chrome | ☐ |

### Pagina's

| Pagina | Desktop | Mobile | Notities |
|---|---|---|---|
| Homepage | ☐ | ☐ | |
| Collectie (snijplanken) | ☐ | ☐ | |
| Collectie (pannen) | ☐ | ☐ | |
| Collectie (messen) | ☐ | ☐ | |
| Collectie (accessoires) | ☐ | ☐ | |
| PDP (snijplank) | ☐ | ☐ | |
| PDP (pan) | ☐ | ☐ | |
| Cart drawer | ☐ | ☐ | |
| Over Ons | ☐ | ☐ | |
| Blog overzicht | ☐ | ☐ | |
| Blog artikel | ☐ | ☐ | |

### Functionaliteiten

- [ ] Mega menu: alle links werken, hover/tap correct
- [ ] Announcement bar carousel werkt (mobile)
- [ ] Hero CTA knop werkt
- [ ] Bestseller slider: auto-play + swipe mobile
- [ ] Collectie filters (Shopify Search & Discovery) werken
- [ ] Sort dropdown werkt
- [ ] Quick-add: product toe aan cart zonder pagina refresh
- [ ] Cart drawer: opent bij cart icon click
- [ ] Cart drawer: qty update + verwijder werkt
- [ ] Cart drawer: progress bar berekent correct
- [ ] Cart drawer: add-on upsell toont correct per product.type
- [ ] Checkout knop → checkout pagina
- [ ] PDP: foto carousel + thumbnails werken
- [ ] PDP: variant selector werkt
- [ ] PDP: ATC knop opent cart drawer
- [ ] PDP: metafields tonen correct (USPs, core promise, lange beschrijving)
- [ ] PDP: FAQ accordion werkt
- [ ] Judge.me reviews laden op PDP
- [ ] Judge.me sterren tonen op productkaarten
- [ ] Klaviyo footer formulier: submit werkt
- [ ] Blog filtering op PDP: juiste artikelen per product.type
- [ ] Breadcrumbs: correct en klikbaar
- [ ] Footer accordion (mobile) werkt
- [ ] Alle externe links openen in nieuw tabblad

### Analytics validatie

- [ ] GA4: `page_view` event → GA4 DebugView
- [ ] GA4: `view_item` event op PDP
- [ ] GA4: `add_to_cart` event
- [ ] GA4: `begin_checkout` event
- [ ] GA4: `purchase` event (testbestelling)
- [ ] Meta Pixel: `PageView`, `ViewContent`, `AddToCart`, `Purchase` → Events Manager

### SEO validatie

- [ ] Google Rich Results Test: Product schema geldig
- [ ] Google Rich Results Test: FAQPage schema geldig
- [ ] Google Rich Results Test: BreadcrumbList geldig
- [ ] Meta titles aanwezig op alle pagina's
- [ ] Meta descriptions aanwezig op alle pagina's
- [ ] Geen dubbele H1's
- [ ] Alle afbeeldingen hebben alt-tekst

### Performance (herhaling Sprint 8)

- [ ] Lighthouse op staging: LCP < 2.5s ✓
- [ ] Lighthouse op staging: CLS < 0.1 ✓
- [ ] Lighthouse op staging: INP < 200ms ✓

---

## Staging Review met Klant

- [ ] Staging URL sturen naar klant: `https://[staging-thema-id].myshopify.com`
- [ ] Feedback sessie plannen
- [ ] Feedback verwerken (maximaal 2 rondes)
- [ ] Klant geeft schriftelijke go-ahead

---

## Go Live

```bash
# Publiceer het thema naar live store
docker compose run --rm shopify shopify theme publish \
  --store sophior.myshopify.com \
  --theme-id [live-thema-id]
```

- [ ] DNS controleren: sophior.nl → sophor.myshopify.com
- [ ] SSL certificaat actief (Shopify regelt dit automatisch)
- [ ] `main` branch gemerged vanuit `develop`
- [ ] Release tag aanmaken: `v1.0.0`

---

## Post-live monitoring (48 uur)

- [ ] GA4 real-time data controleren
- [ ] Error monitoring (Shopify theme check op live store)
- [ ] Eerste bestellingen checken: cart + checkout flow correct?
- [ ] Klaviyo: eerste sign-ups binnengekomen?
- [ ] Judge.me: reviews tonen correct?
- [ ] Lighthouse opnieuw draaien op live URL

---

## Deliverable

SOPHIOR.nl live met nieuw design. Analytics werken. Klant akkoord.
