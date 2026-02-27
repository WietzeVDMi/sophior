# Sprint 2 — Homepage

**Status:** ✅ Klaar
**Duur:** 5–7 dagen
**Branch:** `feature/sprint-2-homepage`
**Vereist:** Sprint 1 afgerond

← [Sprint 1](sprint-1-brand.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 3 →](sprint-3-categorie.md)

---

## Doel

Volledige homepage live op staging met alle 8 secties, desktop + mobile.

---

## Pagina structuur (top → bottom)

```
Announcement Bar    (globaal — Sprint 1)
Header / Mega Menu  (globaal — Sprint 1)
Hero Sectie         ← 50/50 split-screen
Trustbadge Bar      ← 4 USPs horizontaal
Collecties Grid     ← 4 categorie-kaarten
Bestseller Slider   ← producten uit "Bestsellers" collectie
USP Accordeon       ← 50/50 split, Waarom SOPHIOR
Review Slider       ← placeholder-reviews (Sprint 7 → Judge.me)
Blog Preview        ← 3 meest recente gidsen
Pre-Footer Trustbar ← 4 icoon-kolommen
Footer              (globaal — Sprint 1)
```

---

## Taken

### Template
- [x] `templates/index.json` bijgewerkt met alle 8 SOPHIOR secties

### Hero Sectie — `sections/sophior-hero.liquid`
- [x] 50/50 split-screen layout (desktop)
- [x] Links: H1 headline (Nevolasty) + subtitel + CTA knop (`#0D2B23` achtergrond, `#CEA15D` hover)
- [x] Rechts: hero afbeelding (WebP, Shopify CDN)
- [x] Mobile: gestapeld, afbeelding eerst
- [x] Schema: headline, subtitel, CTA-tekst, CTA-link, afbeelding bewerkbaar

### Trustbadge Bar — `sections/sophior-trustbadge-bar.liquid`
- [x] 4 USP-items horizontaal (icoon + tekst)
- [x] Achtergrond `#E3D7C1` (light-tan)
- [x] Schema: 4 teksten + iconen bewerkbaar

### Collecties Grid — `sections/sophior-collections-grid.liquid`
- [x] 4 categorie-kaarten in grid
- [x] Elke kaart: afbeelding + titel + CTA-link
- [x] Links: `/collections/snijplanken`, `/collections/pannen`, `/collections/messen`, `/collections/accessoires`
- [x] Mobile: 2×2 grid

### Bestseller Slider — `sections/sophior-bestsellers.liquid`
- [x] Producten uit Shopify collectie met handle `bestsellers`
- [x] Horizontale slider, auto-play, mobile swipe
- [x] Product card: afbeelding + titel + prijs + sterren + quick-add op hover
- [x] Pijl-navigatie desktop, swipe mobile
- [x] AJAX quick-add (POST /cart/add.js)

### USP Accordeon — `sections/sophior-usp-accordion.liquid`
- [x] 50/50 split: accordeons links, afbeelding rechts
- [x] Sectietitel (Nevolasty H2): "Waarom SOPHIOR?"
- [x] Native `<details>/<summary>` HTML — geen JS nodig
- [x] Schema: rijen (vraag + antwoord) bewerkbaar, max 5
- [x] Mobile: gestapeld, accordeons boven afbeelding

### Review Slider — `sections/sophior-review-slider.liquid`
- [x] Placeholder: 5 hardcoded review kaarten (naam, sterren, tekst)
- [x] Auto-carousel, 5 seconden interval (instelbaar)
- [x] Review kaarten: achtergrond `#FFFFFF`, sterren `#CEA15D`
- [x] Pijlnavigatie + dot indicators
- [x] Sprint 7: vervangen door echte Judge.me widget

### Blog Preview — `sections/sophior-blog-preview.liquid`
- [x] 3 meest recente artikelen uit ingestelde blog
- [x] Kaart: afbeelding + categorie label + titel + excerpt + "Lees meer" link
- [x] Mobile: verticale stapel
- [x] Placeholder kaarten als blog nog leeg is

### Pre-Footer Trustbar — `sections/sophior-trustbar-footer.liquid`
- [x] 4 kolommen: Verzending | Retour | Betaling | Support
- [x] Per kolom: icoon + titel + korte tekst
- [x] Achtergrond `#F1EFEA`
- [x] Schema: alle 4 kolommen bewerkbaar

---

## Aangemaakte bestanden

### Sections (8 nieuw)
- `sections/sophior-hero.liquid`
- `sections/sophior-trustbadge-bar.liquid`
- `sections/sophior-collections-grid.liquid`
- `sections/sophior-bestsellers.liquid`
- `sections/sophior-usp-accordion.liquid`
- `sections/sophior-review-slider.liquid`
- `sections/sophior-blog-preview.liquid`
- `sections/sophior-trustbar-footer.liquid`

### Assets (8 nieuw)
- `assets/sophior-hero.css`
- `assets/sophior-trustbadge-bar.css`
- `assets/sophior-collections-grid.css`
- `assets/sophior-bestsellers.css`
- `assets/sophior-usp-accordion.css`
- `assets/sophior-review-slider.css`
- `assets/sophior-blog-preview.css`
- `assets/sophior-trustbar-footer.css`

### Gewijzigd
- `templates/index.json` — alle 8 SOPHIOR secties
- `locales/nl.json` — vertalingen voor alle nieuwe secties

---

## Deliverable

Homepage volledig functioneel op desktop + mobile, live op staging.
