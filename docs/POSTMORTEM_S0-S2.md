# Post-Mortem Sprint 0–2

_Datum: 2026-02-27 | Auteur: Claude Code review_

## 1. Wat is gebouwd

### Sprint 0 — Fundament
| Deliverable | Bestand | Status |
|---|---|---|
| Docker dev-omgeving | `Dockerfile`, `docker-compose.yml` | ✅ Correct |
| GitHub koppeling | remote `git@github.com:WietzeVDMi/sophior.git` | ✅ Correct |
| Dawn thema init | alle Dawn-standaardbestanden aanwezig | ✅ Correct |
| Branch-strategie | `main` → `develop` → `feature/*` | ✅ Correct |
| .env configuratie | `SHOPIFY_CLI_PARTNERS_TOKEN` ingesteld | ✅ Correct |

### Sprint 1 — Brand & Globale Componenten
| Deliverable | Bestand | Status |
|---|---|---|
| Design tokens | `assets/sophior-brand.css` | ✅ Aanwezig |
| Logo SVG (licht + donker) | `assets/sophior-logo-light.svg`, `sophior-logo-dark.svg` | ✅ Aanwezig |
| Font (Nevolasty OTF) | preload in `layout/theme.liquid` | ⚠ OTF ipv woff2 (zie bevindingen) |
| Announcement bar | `sections/sophior-announcement-bar.liquid` + CSS | ✅ Compleet |
| Header + mega menu | `sections/sophior-header.liquid` + CSS | ✅ Compleet |
| Footer | `sections/sophior-footer.liquid` + CSS | ✅ Compleet |

### Sprint 2 — Homepage (8 secties)
| Deliverable | Bestand | Status |
|---|---|---|
| Hero 50/50 | `sections/sophior-hero.liquid` + CSS | ✅ Compleet |
| Trustbadge bar | `sections/sophior-trustbadge-bar.liquid` + CSS | ✅ Compleet |
| Collections grid | `sections/sophior-collections-grid.liquid` + CSS | ✅ Compleet |
| Bestsellers slider | `sections/sophior-bestsellers.liquid` + CSS | ✅ Compleet |
| USP accordion | `sections/sophior-usp-accordion.liquid` + CSS | ✅ Compleet |
| Review slider | `sections/sophior-review-slider.liquid` + CSS | ✅ Compleet |
| Blog preview | `sections/sophior-blog-preview.liquid` + CSS | ✅ Compleet |
| Trustbar footer | `sections/sophior-trustbar-footer.liquid` + CSS | ✅ Compleet |
| Homepage template | `templates/index.json` | ✅ Compleet |
| NL vertalingen | `locales/nl.json` | ✅ Compleet |

---

## 2. Bevindingen: Afwijkingen en Fouten

### B1 — Hardcoded kleuren in CSS (KRITIEK)

**Impact: Design token principe geschonden — site-wide kleurwijzigingen vereisen handmatige aanpassingen in 8 bestanden.**

Gevonden hardcoded waarden die niet via CSS-variabelen lopen:

| Bestand | Waarde | Locatie | Wat het had moeten zijn |
|---|---|---|---|
| `sophior-footer.css` | `rgba(241, 239, 234, 0.7)` | regel 36 | `--sophior-cream` + opacity-variant |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.1)` | regel 64 | `--sophior-cream-10` |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.2)` | regel 65 | `--sophior-cream-20` |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.4)` | regel 74 | `--sophior-cream-40` |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.75)` | regel 139 | `--sophior-cream-75` |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.15)` | regels 151, 161, 188 | `--sophior-cream-15` |
| `sophior-footer.css` | `rgba(241, 239, 234, 0.5)` | regel 201 | `--sophior-cream-50` |
| `sophior-header.css` | `rgba(13, 43, 35, 0.5)` | regel 229 | `--sophior-dark-green-50` |
| `sophior-trustbadge-bar.css` | `rgba(13, 43, 35, 0.1)` | regels 10–11 | `--sophior-dark-green-10` |
| `sophior-trustbadge-bar.css` | `rgba(13, 43, 35, 0.15)` | regel 56 | `--sophior-dark-green-15` |
| `sophior-review-slider.css` | `#4a6b60` | regels 34, 128 | `--sophior-mid-green` |
| `sophior-usp-accordion.css` | `#4a6b60` | regel 99 | `--sophior-mid-green` |
| `sophior-blog-preview.css` | `#4a6b60` | regel 139 | `--sophior-mid-green` |
| `sophior-trustbar-footer.css` | `#4a6b60` | regel 74 | `--sophior-mid-green` |
| `sophior-bestsellers.css` | `#888` | regel 176 | `--sophior-mid-green` of nieuwe token |
| `sophior-collections-grid.css` | `#1a4a3c` | regel 111 | `--sophior-mid-green` |
| `sophior-usp-accordion.css` | `#1a4a3c` | regel 122 | `--sophior-mid-green` |
| `sophior-hero.css` | `#1a4a3c` | regel 82 | `--sophior-mid-green` |

**Root cause:** `sophior-brand.css` definieert alleen volledige kleuren. Opacity-varianten en tussengroenen (`#4a6b60`, `#1a4a3c`) ontbreken als tokens.

---

### B2 — Schema-vertalingen volledig afwezig (KRITIEK)

**Impact: Sectienamen en settings zijn in de Shopify Admin (merchant UI) niet vertaald naar Nederlands.**

Alle 11 custom sections gebruiken `t:sections.sophior-*.name` en `t:sections.sophior-*.settings.*` keys, maar **`locales/nl.schema.json` en `locales/en.default.schema.json` bevatten geen enkele `sections.sophior-*` key**.

Resultaat: Shopify Admin toont fallback-waarden of Engelse tekst voor sectienamen en alle instellingslabels.

Betroffen files: `locales/nl.schema.json`, `locales/en.default.schema.json`
Betroffen sections: alle 11 (`sophior-announcement-bar` t/m `sophior-trustbar-footer`)

---

### B3 — Schema `name` hardcoded (HOOG)

In `sections/sophior-bestsellers.liquid` (regel 187):
```json
"name": "Bestseller Slider"
```
Dit had moeten zijn: `"name": "t:sections.sophior-bestsellers.name"`.
Overige 10 sections doen dit correct.

---

### B4 — JS: directe style-manipulatie (HOOG)

**Bestand:** `sections/sophior-header.liquid` regels 181 + 188

```javascript
document.body.style.overflow = 'hidden';  // open
document.body.style.overflow = '';        // sluit
```

**Probleem:** Inline style negeert eventuele CSS-cascade en is moeilijk te debuggen. Dawn gebruikt CSS-klasse-toggle voor scroll-lock.

**Oplossing:** Toggle klasse `.sophior-nav-open` op `<body>` met CSS-regel `body.sophior-nav-open { overflow: hidden; }`.

---

### B5 — Fragiele `~` sibling selector in JS (HOOG)

**Bestand:** `sections/sophior-review-slider.liquid` regel 83

```javascript
var dots = document.querySelectorAll(
  '#sophior-reviews-{{ section.id }} ~ .sophior-review-slider__dots .sophior-review-slider__dot'
);
```

De dots-container staat **buiten** de `#sophior-reviews-*` wrapper (na het element in de DOM). De `~` combinator werkt alleen als ze directe siblings zijn met geen andere elementen tussenin. Als template-volgorde verandert, breekt dit stil.

**Oplossing:** Verplaats de dots-container **binnen** de wrapper en gebruik `wrapper.querySelectorAll(...)`.

---

### B6 — Hardcoded tekst in Liquid placeholders (HOOG)

**Bestand:** `sections/sophior-blog-preview.liquid` regels 75, 78, 79

```liquid
<span class="sophior-blog-preview__card-category">Gidsen</span>
<h3 class="sophior-blog-preview__card-title">Artikeltitel volgt binnenkort</h3>
<p class="sophior-blog-preview__card-excerpt">Hier komt binnenkort een gids over SOPHIOR producten.</p>
```

Dit zijn niet-aanpasbare Dutch strings in placeholder-kaarten. Als de editor de blog-sectie kopieert of de site naar Engels switcht, verschijnen verkeerde teksten.

**Oplossing:** Verplaats naar schema-settings of naar `locales/nl.json`.

---

### B7 — Hardcoded aria-labels met Dutch tekst (HOOG)

**Bestand:** `sections/sophior-bestsellers.liquid`
```liquid
<div aria-label="5 sterren">★★★★★</div>
```
**Bestand:** `sections/sophior-review-slider.liquid`
```liquid
<span aria-label="{{ block.settings.rating }} sterren">★★★★★</span>
```

"sterren" is hardcoded Dutch. Moet via `t:` sleutel.

---

### B8 — Font: OTF in plaats van woff2 (MEDIUM)

**Bestand:** `assets/sophior-brand.css` regel 10

```css
src: url('nevolasty-light.otf') format('opentype');
```

Het Nevolasty-fontbestand is aangeleverd als `.otf`. De briefing eist `.woff2` voor optimale performance (LCP). OTF is niet gecomprimeerd; woff2 is 30–40% kleiner en door browsers geoptimaliseerd.

**Status:** BLOCKER — wachten op klant voor `.woff2` bestand (zie CLAUDE.md open TODO's).

---

### B9 — CSS lege regelsets (LAAG)

```css
/* sophior-footer.css regel 21 */
.sophior-footer__brand {}

/* sophior-usp-accordion.css regel 23 */
.sophior-usp-accordion__content {}
```

Dode code — verwijderen.

---

### B10 — Breakpoints niet gecentraliseerd (LAAG)

Breakpoints `750px` en `989px` zijn verspreid over alle 13 CSS-bestanden als magische getallen. Als een breakpoint wijzigt, moeten alle 13 bestanden manueel bijgewerkt worden.

**Oplossing:** Voeg toe aan `sophior-brand.css`:
```css
--sophior-bp-tablet:  750px;
--sophior-bp-desktop: 989px;
```

_Noot: CSS media queries kunnen op dit moment geen `var()` gebruiken. De variabelen zijn nuttig als documentatie-referentie en eventueel voor toekomstig gebruik via `@custom-media` (CSS Nesting Level 4 / PostCSS)._

---

### B11 — Geen CI/CD gates (KRITIEK VOOR KWALITEITSBORGING)

Geen `.github/workflows/` bestanden, geen Lighthouse CI, geen `shopify theme check` in pipeline. Regressions zijn pas zichtbaar na handmatige controle.

---

## 3. Impact per kwaliteitsdimensie

| Dimensie | Bevinding | Ernst |
|---|---|---|
| **SEO** | Schema-vertalingen ontbreken (geen merchant-UI impact op frontend SEO) | Laag |
| **Performance** | OTF ipv woff2 → +~40KB ongezipped font | Medium |
| **A11y** | Hardcoded aria-labels in Dutch | Hoog |
| **Editor-UX** | Schema-namen + settings niet vertaald in Admin | Kritiek |
| **Maintainability** | 25+ hardcoded kleuren in 8 bestanden | Kritiek |
| **Correctness** | Fragiele `~` selector in review-slider JS | Hoog |
| **Tooling** | Geen CI, geen Lighthouse gates | Kritiek |

---

## 4. Learnings — Harde Werkregels (vanaf Sprint 3)

### DO ✅

1. **Elke kleur altijd via `var(--sophior-*)`** — opacity-varianten definieer je als aparte token (`--sophior-cream-15`) in `sophior-brand.css` vóórdat je ze gebruikt.

2. **Schema `name` altijd via `t:` prefix** — `"name": "t:sections.mijn-section.name"`. Voeg de key direct toe aan `nl.schema.json` en `en.default.schema.json` vóórdat je de section bouwt.

3. **Schema-vertalingen: contract-first** — schrijf eerst het Section Contract (zie `docs/SECTION_CONTRACT_TEMPLATE.md`), inclusief alle `t:` keys, voordat je een regel Liquid schrijft.

4. **Scroll-lock via CSS klasse** — `document.body.classList.toggle('sophior-nav-open')` met bijbehorende CSS-regel.

5. **DOM-queries altijd ten opzichte van de wrapper** — `wrapper.querySelector(...)` nooit `document.querySelectorAll('... ~ ...')` voor cross-element relaties. Zet dots en interactieve elementen **binnen** de section-wrapper.

6. **Placeholder-teksten in schema of locales** — nooit hardcoded Dutch strings in Liquid-templates.

7. **Aria-labels via `t:` keys** — nooit taalspecifieke strings in HTML-attributen.

8. **CI vóór merge** — elk PR triggert `shopify theme check`. Lighthouse CI draait op develop na push.

9. **Maximaal 400 regels diff per PR** — grotere wijzigingen splitsen in kleinere PRs per scope (CSS tokens / schema / Liquid / JS).

### DON'T ❌

- Nooit `rgba(hex-waarde, opacity)` schrijven buiten `sophior-brand.css`
- Nooit `document.body.style.overflow` direct aanpassen
- Nooit `~` of `+` CSS-sibling-selectors gebruiken voor JS DOM-queries
- Nooit hardcoded tekst (NL/EN) in Liquid-bestanden of aria-attributen
- Nooit een section mergen zonder bijbehorende entries in `nl.schema.json` + `en.default.schema.json`
- Nooit `.otf` fonts aanbieden zonder `.woff2` fallback

---

## 5. Blockers (wachten op klant)

| Blocker | Impact | Workaround |
|---|---|---|
| Nevolasty `.woff2` bestand | LCP performance, Sprint 8 | Gebruik OTF als fallback tot `.woff2` geleverd |
| Judge.me public key | Sprint 8 review-integratie | Placeholder reviews blijven staan |
| Klaviyo lijst-ID | Sprint 8 e-mail integratie | Formulier aanwezig, actie = `#` |
| GA4 + Meta Pixel ID | Sprint 8 analytics | Geen tracking tot levering |
| Productafbeeldingen WebP | Sprint 4 PDP, Sprint 3 Bestsellers | Shopify placeholder images |
