# Sprint 3 — Stabilisatie: PR-plan

## Doel

Alle Sprint 0–2 bugs uit `POSTMORTEM_S0-S2.md` verhelpen vóór Sprint 4 van start gaat.
Elke PR is klein (≤ 500 regels diff), reviewbaar en atomair.

---

## PR-overzicht

| PR | Naam | Bestanden | Diff-schatting |
|---|---|---|---|
| PR-1 | CSS token fixes | `sophior-brand.css` + 10 CSS bestanden | ~120 regels |
| PR-2 | Schema-vertalingen | `nl.schema.json` + `en.default.schema.json` | ~200 regels |
| PR-3 | Liquid hardcoded tekst | 5 section `.liquid` bestanden + 1 CSS | ~80 regels |
| PR-4 | CSS minor cleanup | 3 CSS bestanden | ~20 regels |

---

## PR-1: CSS token fixes

**Branch:** `feature/sprint-3-css-tokens`

### Wijzigingen

**`assets/sophior-brand.css`** — nieuwe tokens toegevoegd:
- `--sophior-mid-green: #1a4a3c` (officieel token voor placeholder gradients)
- `--sophior-muted-green: #4a6b60` (officieel token voor subtekst)
- Opacity-varianten dark-green: `--sophior-dark-green-10`, `...-15`, `...-50`, `...-75`
- Opacity-varianten cream: `--sophior-cream-10`, `...-15`, `...-20`, `...-40`, `...-50`, `...-70`, `...-75`

**8 CSS bestanden** — hardcoded waarden vervangen:
- `sophior-footer.css`: 6 hardcoded `rgba()` → CSS vars
- `sophior-header.css`: 2 hardcoded `rgba()` → CSS vars
- `sophior-review-slider.css`: 2× `#4a6b60` → `var(--sophior-muted-green)`
- `sophior-usp-accordion.css`: `#4a6b60` + `#1a4a3c` → CSS vars
- `sophior-blog-preview.css`: `#4a6b60` → `var(--sophior-muted-green)`
- `sophior-trustbar-footer.css`: `#4a6b60` → `var(--sophior-muted-green)`
- `sophior-trustbadge-bar.css`: 3 hardcoded `rgba()` → CSS vars
- `sophior-bestsellers.css`: `#888` → `var(--sophior-muted-green)`
- `sophior-collections-grid.css`: 3 hardcoded waarden → CSS vars
- `sophior-hero.css`: `#1a4a3c` → `var(--sophior-mid-green)`

### Acceptatiecriteria
- [ ] `shopify theme check` — 0 errors, 0 warnings
- [ ] Geen `rgba(`, `#1a4a3c`, `#4a6b60`, `#888` buiten `sophior-brand.css`
- [ ] Visueel: geen kleurverschillen zichtbaar in browser vs vóór de PR

---

## PR-2: Schema-vertalingen

**Branch:** `feature/sprint-3-schema-translations`

### Wijzigingen

**`locales/nl.schema.json`** + **`locales/en.default.schema.json`** — toegevoegd:
- `sections.sophior-hero` — 5 settings keys + preset name
- `sections.sophior-trustbadge-bar` — section name + blocks
- `sections.sophior-collections-grid` — name + settings + blocks
- `sections.sophior-bestsellers` — name + settings + JS-strings (`add_to_cart`, `adding`, `added`, `rating_label`)
- `sections.sophior-usp-accordion` — name + settings + blocks
- `sections.sophior-review-slider` — name + settings (`rating_aggregate`, `aggregate_text`, `autoplay_interval`) + JS-strings (`rating_label`, `aggregate_label`, `prev_button`, `next_button`)
- `sections.sophior-blog-preview` — name + settings incl. `placeholder_*` keys
- `sections.sophior-trustbar-footer` — name + blocks

### Acceptatiecriteria
- [ ] `shopify theme check` — 0 errors
- [ ] Shopify Admin toont vertaalde sectienamen in NL: "SOPHIOR Hero", "SOPHIOR Bestseller slider" etc.
- [ ] Shopify Admin toont vertaalde sectienamen in EN in Engelse omgeving

---

## PR-3: Liquid hardcoded tekst

**Branch:** `feature/sprint-3-liquid-text-fixes`

### Wijzigingen

**`sections/sophior-review-slider.liquid`**
- Aggregate stars `aria-label`: `"4.9 sterren"` → `t: rating: section.settings.rating_aggregate`
- Card stars `aria-label`: `"{{ rating }} sterren"` → `t: rating: card_rating`
- Dots `<ul>` verplaatst **inside** `#sophior-reviews-*` wrapper (van sibling naar descendant)
- JS: fragiele `~`-selector vervangen → `wrapper.querySelectorAll(...)`
- Schema: `"name": "Review Slider"` → `t:sections.sophior-review-slider.name`
- Schema: nieuw `rating_aggregate` text-setting toegevoegd

**`sections/sophior-bestsellers.liquid`**
- Card stars `aria-label`: `"5 sterren"` → `t: rating: 5`
- Quick-add button: `data-adding` + `data-added` attributes toegevoegd
- JS: `btn.textContent = '...'` → `btn.dataset.adding || '...'`
- JS: `btn.textContent = '✓'` → `btn.dataset.added || '✓'`
- Schema: `"name": "Bestseller Slider"` → `t:sections.sophior-bestsellers.name`

**`sections/sophior-header.liquid`** + **`assets/sophior-header.css`**
- JS: `document.body.style.overflow = 'hidden'` → `classList.add('sophior-nav-open')`
- JS: `document.body.style.overflow = ''` → `classList.remove('sophior-nav-open')`
- CSS: `body.sophior-nav-open { overflow: hidden; }` toegevoegd

**`sections/sophior-collections-grid.liquid`**
- `default_labels` hardcoded array verwijderd
- `fallback_label` assign en alle `| default: fallback_label` verwijderd
- Schema: `"name": "Collecties Grid"` → `t:sections.sophior-collections-grid.name`

**`sections/sophior-blog-preview.liquid`**
- Placeholder strings `"Gidsen"`, `"Artikeltitel volgt binnenkort"` etc. → `section.settings.placeholder_*`
- Redundante `| default: 'Alle gidsen'` en `| default: 'Lees meer'` verwijderd
- Schema: 5 nieuwe settings toegevoegd (`header` + `placeholder_category`, `_title`, `_excerpt`, `_cta`)
- Schema: `"name": "Blog Preview"` → `t:sections.sophior-blog-preview.name`

### Acceptatiecriteria
- [ ] `shopify theme check` — 0 errors
- [ ] Review slider: dots navigeren correct (JS werkt na DOM-verplaatsing)
- [ ] Bestsellers: quick-add toont "Bezig..." en "Toegevoegd" (NL) via data-attributen
- [ ] Header: nav open/dicht vergrendelt scroll via CSS-klasse (geen `style.overflow`)
- [ ] Blog preview: placeholder cards tonen schema-waarden (instelbaar in Admin)

---

## PR-4: CSS minor cleanup

**Branch:** `feature/sprint-3-css-cleanup`

### Wijzigingen

**`assets/sophior-footer.css`**
- Lege `.sophior-footer__brand {}` ruleset verwijderd

**`assets/sophior-usp-accordion.css`**
- Lege `.sophior-usp-accordion__content {}` ruleset verwijderd
- `focus-visible` toegevoegd aan `.sophior-usp-accordion__summary`

**`assets/sophior-collections-grid.css`**
- `focus-visible` outline toegevoegd aan `.sophior-collections-grid__card`

### Acceptatiecriteria
- [ ] `shopify theme check` — 0 errors
- [ ] Toetsenbordgebruiker ziet gouden focus-ring op accordeon-items en collectie-kaarten
- [ ] Geen lege rulesets in de CSS-bestanden

---

## Reviewcriteria (geldt voor alle PRs)

1. **Geen hardcoded kleuren** buiten `sophior-brand.css` — controleer met: `grep -r 'rgba\|#[0-9a-fA-F]\{3,6\}' assets/ --include="*.css" | grep -v sophior-brand`
2. **Geen hardcoded NL-tekst** in `.liquid` buiten schema defaults — controleer visueel
3. **Shopify theme check** draait clean: `npm run check`
4. **Playwright/handmatige check** op playground pagina: alle sections renderen correct
5. **Toetsenbordnavigatie**: tab door pagina, focus-rings zichtbaar op interactieve elementen

---

## Definition of Done Sprint 3

- [ ] Alle 4 PRs gemerged naar `develop`
- [ ] `shopify theme check` op `develop`: 0 errors, 0 warnings
- [ ] Playground pagina aangemaakt in Shopify Admin (handle: `playground`)
- [ ] CI/CD: GitHub Actions `theme-check.yml` triggered op test-PR
- [ ] Geen hardcoded kleuren buiten `sophior-brand.css`
- [ ] Schema-vertalingen zichtbaar in Shopify Admin
- [ ] Postmortem bugs B1–B11: alle opgelost of bewust uitgesteld met notitie

---

## Uitgesteld (buiten scope Sprint 3)

| Bug | Reden | Sprint |
|---|---|---|
| B8: Font is OTF (niet woff2) | Wacht op klant (Nevolasty .woff2 bestand) | Sprint 4 |
| B10: Breakpoints niet gecentraliseerd | Low impact, geen token-systeem voor breakpoints in CSS custom properties | Sprint 9 (optioneel) |
