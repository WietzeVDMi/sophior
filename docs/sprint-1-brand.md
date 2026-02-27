# Sprint 1 — Brand Setup & Globale Componenten

**Status:** ✅ Klaar — Nevolasty font actief, logo SVG's gegenereerd uit .ai bestand
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
- [x] `assets/sophior-brand.css` aanmaken met alle CSS custom properties
- [x] Montserrat preloaden via Google Fonts in `theme/layout/theme.liquid`
- [x] Nevolasty-Light.otf self-hosted via @font-face (gevonden in font_logo/)
- [x] Logo SVG's gegenereerd uit .ai bestand: `assets/sophior-logo-dark.svg` + `assets/sophior-logo-light.svg`
- [x] Dawn kleurinstellingen overschrijven in `config/settings_data.json`
- [x] `sophior-brand.css` importeren in `theme.liquid`

### Announcement Bar — `sections/sophior-announcement-bar.liquid`
- [x] Desktop: 3 USPs naast elkaar (flexbox)
- [x] Mobile: auto-carousel via CSS animatie (1 USP zichtbaar, 3s per item)
- [x] Sticky positionering boven header (`position: sticky; top: 0; z-index: 200`)
- [x] Achtergrond `#0D2B23`, tekst `#F1EFEA`, iconen `#CEA15D`
- [x] Schema: 3 USP-teksten + iconen bewerkbaar via Shopify editor

### Header & Mega Menu — `sections/sophior-header.liquid`
- [x] Logo links (SVG placeholder, lichte versie)
- [x] Sticky onder announcement bar
- [x] Navigatie: Montserrat, `#0D2B23`, hover → `#CEA15D`
- [x] Utility iconen rechts: zoek, account, cart (line-art SVG)
- [x] Mega Menu configureerbaar via menu-link trigger in schema
- [x] Mobile: hamburger links, logo gecentreerd, cart rechts
- [x] Off-canvas nav drawer met JS toggle

### Footer — `sections/sophior-footer.liquid`
- [x] Achtergrond `#0D2B23`, tekst `#F1EFEA`
- [x] 4-kolom layout (branding + 3 linklkolommen)
- [x] Klaviyo newsletter formulier placeholder
- [x] Social icons Instagram, Facebook, TikTok in `#CEA15D`
- [x] Shopify betaalmethoden bottom bar
- [x] Copyright © SOPHIOR
- [x] Mobile: kolommen 2/3/4 als `<details>` accordion

---

## Deliverable

Header, footer en announcement bar volledig werkend op desktop + mobile. Brand kleuren + fonts actief in het thema.
