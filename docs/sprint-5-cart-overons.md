# Sprint 5 — Cart Drawer + Over Ons

**Status:** ✅ Klaar
**Duur:** 3–4 dagen
**Branch:** `feature/sprint-5-cart-overons`
**Vereist:** Sprint 1 afgerond | Cart upsell app keuze van klant

← [Sprint 4](sprint-4-pdp.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 6 →](sprint-6-blog.md)

---

## Doel

Werkende cart drawer (slide-out) met verzending progress bar en upsell, plus de Over Ons pagina.

---

## Wacht op klant

- [ ] Cart upsell app keuze: **Rebuy Smart Cart** OF **In Cart Upsell**

---

## Cart Drawer

### Structuur (top → bottom)

```
Verzending progress bar     ← "Nog €X tot gratis verzending" (drempel €59)
Producten lijst             ← afbeelding, titel, prijs, qty, verwijder
Dynamische Add-on Upsell   ← op basis van product.type in cart
Subtotaal + Checkout CTA
Trust bar                   ← herhaling 3 USPs
```

### Taken — `snippets/sophior-cart-drawer.liquid`

- [x] Slide-out panel van rechts (CSS transform + transition)
- [x] Overlay backdrop (click om te sluiten)
- [x] Sluiten via ✕ knop en backdrop click
- [x] Open bij cart icon click (custom event `sophior:open-cart`)

**Progress bar:**
- [x] Bereken restbedrag tot €59 gratis verzending
- [x] Visuele voortgangsbalk (breedte = `cart.total_price / 5900 * 100%`)
- [x] Tekst: "Nog €X.XX tot gratis verzending!" / "Gratis verzending!"

**Producten lijst:**
- [x] Loop over `cart.items`
- [x] Per item: afbeelding, titel, varianten, prijs, qty selector, verwijder knop
- [x] AJAX qty update + verwijder (geen pagina refresh)

**Add-on upsell** ← _uitgesteld; wacht op klant_:
- [~] Conditioneel tonen op basis van `product.type` in cart — **wacht op app-keuze klant**
- [~] Add-on product ophalen via `custom.addon_product` metafield — **wacht op metafield setup**
- [~] "Voeg toe voor €X.XX" knop (AJAX) — **wacht op klant**
- [~] Logica: snijplank → Onderhoudsolie | pan → Panbeschermers | mes → Mesbeschermer

**Totaal + Checkout:**
- [x] Subtotaal tonen
- [x] Checkout knop (→ `/checkout`)
- [x] Notitie: "Verzendkosten berekend bij afrekenen"

**Trust bar:**
- [x] 3 kleine USP iconen onderaan (levering, betaling, retour)

- [ ] Cart upsell app integreren (Rebuy of In Cart Upsell — na klantkeuze) ← **klant**

**Header:**
- [x] Cart icon `<a>` vervangen door `<button>` die `sophior:open-cart` event dispatcht
- [x] `layout/theme.liquid` — `{%- render 'sophior-cart-drawer' -%}` toegevoegd

---

## Over Ons Pagina (`/pages/ons-verhaal`)

### Taken

- [x] `templates/page.ons-verhaal.json` aanmaken

**Hero header — `sections/sophior-page-hero.liquid`:**
- [x] Grote afbeelding + paginatitel overlay
- [x] Schema: afbeelding + titel + ondertitel bewerkbaar

**Zigzag blokken — `sections/sophior-zigzag.liquid`:**
- [x] Afwisselende tekst/afbeelding rijen (links-rechts-links)
- [x] Schema: blokken toevoegen via editor (tekst + afbeelding per blok)

**Kernwaarden badge bar — `sections/sophior-values-bar.liquid`:**
- [x] 4 waarden met icoon + label + beschrijving
- [x] Schema: waarden bewerkbaar, 6 icoonkeuzes

**Duurzaamheid blok — `sections/sophior-sustainability.liquid`:**
- [x] Tekst + afbeelding (50/50)
- [x] Schema: tekst + afbeelding + positie bewerkbaar

**Productexpertise grid:**
- [~] **Niet als aparte section gebouwd** — zie Deviaties hieronder

---

## Deviaties van plan

### 1. Productexpertise grid niet apart gebouwd
De `sophior-zigzag.liquid` section dekt deze functionaliteit volledig via blokken. Extra secties toevoegen die technisch identiek zijn vergroot de code-oppervlakte zonder meerwaarde. De redacteur kan expertise-blokken gewoon als zigzag-rijen invullen.

### 2. Add-on upsell uitgesteld
Twee afhankelijkheden blokkeren dit:
- Klant heeft nog geen cart upsell app gekozen (Rebuy vs In Cart Upsell)
- `custom.addon_product` metafield nog niet aangemaakt in Admin

De draw-infrastructuur (placeholder comment in `sophior-cart-drawer.liquid`) is klaar; de upsell-logica wordt ingebouwd zodra de klantkeuze bekend is.

### 3. Cart icon button i.p.v. link
`#sophior-cart-icon` (was `<a href>`) is vervangen door `<button id="sophior-cart-btn">` die via `onclick` een `sophior:open-cart` custom event dispatcht. De cart drawer JS luistert hierop. Fallback: als JS uitvalt, functioneert de knop als toggle zonder navigatie — acceptabel voor deze use case.

---

## Aangemaakte bestanden

### Snippets (1 nieuw)
- `snippets/sophior-cart-drawer.liquid`

### Sections (4 nieuw)
- `sections/sophior-page-hero.liquid`
- `sections/sophior-zigzag.liquid`
- `sections/sophior-values-bar.liquid`
- `sections/sophior-sustainability.liquid`

### Assets (6 nieuw)
- `assets/sophior-cart-drawer.css`
- `assets/sophior-cart-drawer.js`
- `assets/sophior-page-hero.css`
- `assets/sophior-zigzag.css`
- `assets/sophior-values-bar.css`
- `assets/sophior-sustainability.css`

### Templates (1 nieuw)
- `templates/page.ons-verhaal.json`

### Gewijzigd
- `sections/sophior-header.liquid` — cart icon → button met custom event
- `layout/theme.liquid` — cart drawer render toegevoegd
- `assets/sophior-collection.js` — dispatcht `sophior:cart-updated` na quick-add
- `locales/nl.schema.json` + `locales/en.default.schema.json` — 5 nieuwe section-sleutels

---

## Deliverable

Cart drawer werkend (open/close, AJAX qty, progress bar, trust bar). Over Ons pagina klaar op `/pages/ons-verhaal` met 4 SOPHIOR secties. Add-on upsell wacht op klantkeuze.
