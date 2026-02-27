# Sprint 5 — Cart Drawer + Over Ons

**Status:** ⏸ Gepland
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

- [ ] Slide-out panel van rechts (CSS transform + transition)
- [ ] Overlay backdrop (click om te sluiten)
- [ ] Sluiten via ✕ knop en backdrop click
- [ ] Open bij cart icon click (custom event)

**Progress bar:**
- [ ] Bereken restbedrag tot €59 gratis verzending
- [ ] Visuele voortgangsbalk (breedte = `cart.total_price / 5900 * 100%`)
- [ ] Tekst: "Nog €X.XX tot gratis verzending!" / "Gratis verzending!"

**Producten lijst:**
- [ ] Loop over `cart.items`
- [ ] Per item: afbeelding, titel, varianten, prijs, qty selector, verwijder knop
- [ ] AJAX qty update + verwijder (geen pagina refresh)

**Add-on upsell:**
- [ ] Conditioneel tonen op basis van `product.type` in cart
- [ ] Add-on product ophalen via `custom.addon_product` metafield
- [ ] "Voeg toe voor €X.XX" knop (AJAX)

**Totaal + Checkout:**
- [ ] Subtotaal tonen
- [ ] Checkout knop (→ `/checkout`)
- [ ] Notitie: "Verzendkosten berekend bij afrekenen"

**Trust bar:**
- [ ] 3 kleine USP iconen onderaan (voor, betaling, retour)

- [ ] Cart upsell app integreren (Rebuy of In Cart Upsell — na klantkeuze)

---

## Over Ons Pagina (`/pages/ons-verhaal`)

### Taken

- [ ] `templates/page.ons-verhaal.json` aanmaken

**Hero header — `sections/sophior-page-hero.liquid`:**
- [ ] Grote afbeelding + paginatitel overlay
- [ ] Schema: afbeelding + titel bewerkbaar

**Zigzag blokken — `sections/sophior-zigzag.liquid`:**
- [ ] Afwisselende tekst/afbeelding rijen (links-rechts-links)
- [ ] Schema: blokken toevoegen via editor (tekst + afbeelding per blok)

**Kernwaarden badge bar — `sections/sophior-values-bar.liquid`:**
- [ ] 3–4 waarden met icoon + label
- [ ] Schema: waarden bewerkbaar

**Duurzaamheid blok — `sections/sophior-sustainability.liquid`:**
- [ ] Tekst + afbeelding (50/50)
- [ ] Schema: tekst + afbeelding bewerkbaar

**Productexpertise grid:**
- [ ] 3–4 expertise blokken (snijplanken expert, pan expert, etc.)
- [ ] Icoon + titel + korte tekst per blok

---

## Deliverable

Cart drawer werkend met upsell logica. Over Ons pagina live op `/pages/ons-verhaal`.
