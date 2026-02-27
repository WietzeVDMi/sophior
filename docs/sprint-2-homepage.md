# Sprint 2 — Homepage

**Status:** ⏸ Gepland
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
Review Slider       ← Judge.me (placeholder tot Sprint 7)
Blog Preview        ← 3 meest recente gidsen
Pre-Footer Trustbar ← 4 icoon-kolommen
Footer              (globaal — Sprint 1)
```

---

## Taken

### Template
- [ ] `templates/index.json` aanpassen voor alle SOPHIOR secties

### Hero Sectie — `sections/sophior-hero.liquid`
- [ ] 50/50 split-screen layout (desktop)
- [ ] Links: H1 headline (Nevolasty) + subtitel + CTA knop (`#0D2B23` achtergrond, `#CEA15D` hover)
- [ ] Rechts: hero afbeelding (WebP, Shopify CDN)
- [ ] Mobile: gestapeld, afbeelding eerst
- [ ] Schema: headline, subtitel, CTA-tekst, CTA-link, afbeelding bewerkbaar

### Trustbadge Bar — `sections/sophior-trustbadge-bar.liquid`
- [ ] 4 USP-items horizontaal (icoon + tekst)
- [ ] Achtergrond `#E3D7C1` (light-tan)
- [ ] Schema: 4 teksten + iconen bewerkbaar

### Collecties Grid — `sections/sophior-collections-grid.liquid`
- [ ] 4 categorie-kaarten in grid
- [ ] Elke kaart: afbeelding + titel + CTA-link
- [ ] Links: `/collections/snijplanken`, `/collections/pannen`, `/collections/messen`, `/collections/accessoires`
- [ ] Mobile: 2×2 grid

### Bestseller Slider — `sections/sophior-bestsellers.liquid`
- [ ] Producten uit Shopify collectie met handle `bestsellers`
- [ ] Horizontale slider, auto-play, mobile swipe
- [ ] Product card: afbeelding + titel + prijs + sterren + quick-add op hover
- [ ] Pijl-navigatie desktop, swipe mobile

### USP Accordeon — `sections/sophior-usp-accordion.liquid`
- [ ] 50/50 split: accordeons links, afbeelding rechts
- [ ] Sectietitel (Nevolasty H2): "Waarom SOPHIOR"
- [ ] Schema: rijen (vraag + antwoord) bewerkbaar, max 5
- [ ] Mobile: gestapeld, accordeons boven afbeelding

### Review Slider — `sections/sophior-review-slider.liquid`
- [ ] Placeholder: hardcoded review kaarten (naam, sterren, tekst)
- [ ] Auto-carousel, 5 seconden interval
- [ ] Review kaarten: achtergrond `#FFFFFF`, sterren `#CEA15D`
- [ ] Sprint 7: vervangen door echte Judge.me widget

### Blog Preview — `sections/sophior-blog-preview.liquid`
- [ ] 3 meest recente artikelen uit `blogs.gidsen` of algemene blog
- [ ] Kaart: afbeelding + categorie label + titel + excerpt (1 regel) + "Lees meer" link
- [ ] Mobile: verticale stapel

### Pre-Footer Trustbar — `sections/sophior-trustbar-footer.liquid`
- [ ] 4 kolommen: Verzending | Retour | Betaling | Support
- [ ] Per kolom: icoon + titel + korte tekst
- [ ] Achtergrond `#F1EFEA`
- [ ] Schema: alle 4 kolommen bewerkbaar

---

## Deliverable

Homepage volledig functioneel op desktop + mobile, live op staging.
