# Sprint 1 — Brand Setup & Globale Componenten

**Status:** 🔒 Wacht op klant (logo + Nevolasty font)
**Duur:** 3–5 dagen
**Branch:** `feature/sprint-1-brand`

← [Sprint 0](sprint-0-setup.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 2 →](sprint-2-homepage.md)

---

## Doel

Alle brand-elementen implementeren + header, footer en announcement bar live op staging.

---

## Wacht op klant

- [ ] Nevolasty .woff2 fontbestand + weblicentie bevestiging
- [ ] Logo SVG + PNG (wordmark + symbool) in zwart en wit

> Tijdelijke placeholders: Playfair Display (i.p.v. Nevolasty), SVG-placeholder logo

---

## Design Tokens

```css
/* assets/sophior-brand.css */
:root {
  --color-dark-green:  #0D2B23;
  --color-gold:        #CEA15D;
  --color-cream:       #F1EFEA;
  --color-light-tan:   #E3D7C1;
  --color-light-gold:  #EFCF96;
  --color-white:       #FFFFFF;

  --font-heading: 'Nevolasty', 'Playfair Display', serif;
  --font-body:    'Montserrat', sans-serif;
}
```

---

## Taken

### Brand setup
- [ ] `assets/sophior-brand.css` aanmaken met alle CSS custom properties
- [ ] Montserrat preloaden via Google Fonts in `theme/layout/theme.liquid`
- [ ] Nevolasty .woff2 preloaden (of Playfair Display als placeholder)
- [ ] Logo SVG opnemen als `assets/sophior-logo-dark.svg` en `assets/sophior-logo-light.svg`
- [ ] Dawn kleurinstellingen overschrijven in `config/settings_schema.json`
- [ ] `sophior-brand.css` importeren in `theme.liquid`

### Announcement Bar — `sections/sophior-announcement-bar.liquid`
- [ ] Desktop: 3 USPs naast elkaar (flexbox)
- [ ] Mobile: auto-carousel via CSS animatie (1 USP zichtbaar, scroll elke 3s)
- [ ] Sticky positionering boven header (`position: sticky; top: 0; z-index: 100`)
- [ ] Achtergrond `#0D2B23`, tekst `#F1EFEA`, iconen `#CEA15D`
- [ ] Schema: 3 USP-teksten bewerkbaar via Shopify editor

### Header & Mega Menu — `sections/sophior-header.liquid`
- [ ] Logo links (wit op donker / zwart op licht)
- [ ] Sticky onder announcement bar
- [ ] Navigatie: Montserrat Regular, `#0D2B23`, hover → `#CEA15D`
- [ ] Utility iconen rechts: zoek, account, cart (line-art)
- [ ] Mega Menu 'Producten' (hover/tap):
  - 4 categorie-kolommen: Snijplanken, Pannen, Messen, Accessoires
  - 2 actie-blokken: "Alle Producten" + "Actie"
- [ ] Gids dropdown: links naar 5 blog-categorieën
- [ ] Mobile: hamburger links, logo gecentreerd, cart rechts

### Footer — `sections/sophior-footer.liquid`
- [ ] Achtergrond `#0D2B23`, tekst `#F1EFEA`
- [ ] 4-kolom layout:
  1. Branding + Klaviyo newsletter formulier placeholder + social icons
  2. Shop (links naar 4 collecties)
  3. Klantenservice (Contact, Retour, Voorwaarden, Privacy)
  4. Over SOPHIOR (Ons verhaal, Gidsen, Duurzaamheid, Zakelijk)
- [ ] Social icons (Instagram, Facebook, TikTok) in `#CEA15D`
- [ ] Betaalmethoden bottom bar
- [ ] Copyright © 2026 SOPHIOR
- [ ] Mobile: kolommen 2/3/4 als accordion, kolom 1 altijd zichtbaar

---

## Deliverable

Header, footer en announcement bar volledig werkend op desktop + mobile. Brand kleuren + fonts actief in het thema.
