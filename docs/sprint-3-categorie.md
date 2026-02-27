# Sprint 3 — Categoriepagina

**Status:** ⏸ Gepland
**Duur:** 3–4 dagen
**Branch:** `feature/sprint-3-categorie`
**Vereist:** Sprint 1 afgerond | Productafbeeldingen gewenst (maar niet blokkerend)

← [Sprint 2](sprint-2-homepage.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 4 →](sprint-4-pdp.md)

---

## Doel

Één gedeeld Liquid template dat werkt voor alle 4 collecties: Snijplanken, Pannen, Messen, Accessoires.

---

## Collectie URLs

| Naam | URL |
|---|---|
| Snijplanken | `/collections/snijplanken` |
| Pannen | `/collections/pannen` |
| Messen | `/collections/messen` |
| Accessoires | `/collections/accessoires` |

---

## Taken

### Template
- [ ] `templates/collection.json` aanpassen voor SOPHIOR secties

### Categorie Header — `sections/sophior-collection-header.liquid`
- [ ] Bewerkbare titel per collectie
- [ ] Bewerkbare beschrijving (1-2 zinnen)
- [ ] Optionele hero-afbeelding (banner)
- [ ] Schema: titel, beschrijving, afbeelding per collectie instelling

### Filter & Sort Balk — `sections/sophior-collection-filters.liquid`
- [ ] Shopify Search & Discovery integratie (pill-knoppen filters)
- [ ] Sort dropdown: Prijs laag→hoog | hoog→laag | Nieuwste | Beoordeling
- [ ] Actieve filters tonen + verwijder-optie
- [ ] Mobile: filter-knop opent slide-in panel
- [ ] App installeren: Shopify Search & Discovery (gratis)

### Product Grid — `snippets/sophior-product-card.liquid`
- [ ] Grid: 4 kolommen desktop / 2 kolommen mobile
- [ ] Product card bevat:
  - Afbeelding (WebP, lazy, hover → tweede foto)
  - Badge "Bestseller" / "Nieuw" (optioneel)
  - Titel (Montserrat)
  - Prijs (bold) + doorgestreepte verkoopprijs indien sale
  - Sterren (Judge.me gemiddelde — placeholder tot Sprint 7)
  - Quick-add knop (verschijnt op hover desktop, altijd zichtbaar mobile)
- [ ] Quick-add: AJAX add-to-cart zonder pagina refresh

### SEO Tekstblok — `sections/sophior-collection-seo-text.liquid`
- [ ] Bewerkbaar SEO tekst blok onderaan de pagina
- [ ] Gerelateerde blog artikelen gefilterd op `collection.handle`
- [ ] Schema: SEO-tekst per collectie instelling bewerkbaar

---

## App setup

- [ ] **Shopify Search & Discovery** installeren via Shopify App Store
- [ ] Filters configureren per collectie (materiaal, formaat, prijs)
- [ ] Pill-stijl activeren in app instellingen

---

## Deliverable

Werkende categoriepagina voor alle 4 collecties. Filters functioneel. Quick-add werkt. Mobile-first.
