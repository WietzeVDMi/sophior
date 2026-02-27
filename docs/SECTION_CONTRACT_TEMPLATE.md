# Section Contract Template

_Versie 1.0 | Gebruik dit template voor elke nieuwe section vóór implementatie._

---

## Instructies

Kopieer dit bestand naar `docs/sections/<section-handle>.md` en vul alle secties in. Een section-contract is **verplicht** vóórdat je de eerste regel Liquid schrijft. PRs zonder bijbehorend contract worden afgekeurd.

---

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-<naam>` |
| **Bestand** | `sections/sophior-<naam>.liquid` |
| **CSS** | `assets/sophior-<naam>.css` |
| **Sprint** | Sprint X |
| **Status** | Draft / Review / Approved / Built |
| **Auteur** | |
| **Datum** | |

---

## 2. Doel & Context

_1–2 zinnen: wat doet deze section, waar staat ze op de pagina, voor welk publiek._

---

## 3. Schema — Settings & Blocks

### 3a. Settings

| ID | Type | Label (t: key) | Standaard | Verplicht? | Opmerking |
|---|---|---|---|---|---|
| `title` | `text` | `t:sections.sophior-X.settings.title.label` | `"..."` | Ja | |
| `subtitle` | `textarea` | `t:sections.sophior-X.settings.subtitle.label` | `""` | Nee | |
| `image` | `image_picker` | `t:sections.sophior-X.settings.image.label` | — | Nee | |
| `cta_url` | `url` | `t:sections.sophior-X.settings.cta_url.label` | — | Nee | |
| `cta_label` | `text` | `t:sections.sophior-X.settings.cta_label.label` | `"..."` | Nee | |

_Voeg rijen toe of verwijder naar behoefte._

### 3b. Blocks

| Type | Naam (t: key) | Min | Max | Settings |
|---|---|---|---|---|
| `item` | `t:sections.sophior-X.blocks.item.name` | 0 | 6 | `title`, `text`, `icon` |

_Vul in of vul "Geen blocks" in als de section geen blocks gebruikt._

### 3c. Presets

```json
{
  "name": "t:sections.sophior-X.name",
  "blocks": [
    { "type": "item" }
  ]
}
```

---

## 4. Vertalingen (verplicht vóór implementatie)

Voeg deze keys toe aan **`locales/nl.schema.json`** EN **`locales/en.default.schema.json`** vóór je begint te bouwen.

```json
"sophior-X": {
  "name": "Sectienaam (NL)",
  "settings": {
    "title": { "label": "Titel" },
    "subtitle": { "label": "Ondertitel" },
    "image": { "label": "Afbeelding" },
    "cta_url": { "label": "Button-link" },
    "cta_label": { "label": "Buttontekst" }
  },
  "blocks": {
    "item": {
      "name": "Item"
    }
  }
}
```

_Vul `nl.schema.json` in het Nederlands in, `en.default.schema.json` in het Engels._

---

## 5. Varianten-mapping

Beschrijf welke combinatie van settings welke visuele variant produceert. Elke variant moet aantoonbaar zichtbaar zijn in de Playground.

| Variant | Instellingen | Beschrijving | Playground-blok |
|---|---|---|---|
| **Standaard** | Alle defaults | Baseline weergave | Blok 1 |
| **Zonder afbeelding** | `image` leeg | Tekst-only variant | Blok 2 |
| **CTA zichtbaar** | `cta_label` ingevuld | Met call-to-action knop | Blok 3 |

---

## 6. Responsive regels

| Breakpoint | Gedrag | CSS klasse / media query |
|---|---|---|
| **< 750px (mobile)** | Stapelindeling (1 kolom), font X rem | `@media screen and (max-width: 749px)` |
| **750px – 988px (tablet)** | 2-koloms raster | `@media screen and (min-width: 750px)` |
| **≥ 989px (desktop)** | Volledige layout | `@media screen and (min-width: 989px)` |

**Breakpointwaarden:** gebruik altijd `750px` en `989px` (conform Dawn). Documenteer ze hier; harde getallen in CSS zijn toegestaan zolang dit contract de bron van waarheid is.

---

## 7. A11y regels

- [ ] **Heading-hiërarchie:** welk heading-level gebruikt deze section? (H1 alleen in hero)
- [ ] **Focus-visible:** alle interactieve elementen hebben zichtbare focus-state via `:focus-visible`
- [ ] **Aria-labels:** alle icon-only buttons hebben `aria-label` via `t:` key
- [ ] **Decoratieve afbeeldingen:** `aria-hidden="true"` op decoratieve SVG's
- [ ] **Alt-tekst:** afbeeldingen hebben dynamische alt (uit schema of Shopify media object)
- [ ] **Kleurcontrast:** tekst op achtergrond minimaal 4.5:1 (WCAG AA)
- [ ] **Geen `role="list"` vergeten** bij `<ul>`/`<ol>` die als flex/grid worden gestijld

_Specificeer afwijkingen of extra eisen hieronder._

---

## 8. Performance regels

- [ ] **CSS-import bovenaan** het `.liquid` bestand: `{{ 'sophior-X.css' | asset_url | stylesheet_tag }}`
- [ ] **Geen inline styles** in Liquid of JS — alle stijlen in de CSS-asset
- [ ] **Hero-afbeeldingen:** `loading: 'eager'`, `fetchpriority: 'high'`
- [ ] **Overige afbeeldingen:** `loading: 'lazy'`
- [ ] **Shopify image-tag** met `widths` en `sizes` altijd gebruiken
- [ ] **Minimale JS:** gebruik native HTML gedrag waar mogelijk (`<details>`, scroll-snap)
- [ ] **JS in IIFE of custom element** — geen globale variabelen
- [ ] **DOM-queries ten opzichte van section-wrapper** — nooit `document.querySelector` voor section-interne elementen

---

## 9. Edge cases & defaults

| Case | Verwacht gedrag |
|---|---|
| Titel leeg | Section verbergen of fallback-tekst tonen |
| Afbeelding ontbreekt | Shopify placeholder of gradient-achtergrond |
| 0 blocks | Section verbergt blocks-container of toont melding |
| Max blocks bereikt | Shopify Admin blokkeert extra blok automatisch |
| Lange tekst (>200 tekens) | Tekst breekt correct; geen overflow |

---

## 10. Acceptatiecriteria (Definition of Done)

- [ ] Section rendert correct in Shopify Editor (theme customizer)
- [ ] Alle schema-settings zijn aanpasbaar via Admin zonder code-wijziging
- [ ] Alle `t:` keys aanwezig in `nl.schema.json` + `en.default.schema.json`
- [ ] `shopify theme check` geeft 0 errors voor deze section
- [ ] Alle varianten zichtbaar in Playground (≥3 varianten + 2 edge cases)
- [ ] Geen hardcoded kleuren in `.css` bestand (alle via `var(--sophior-*)`)
- [ ] Mobile, tablet en desktop getest in Chrome DevTools
- [ ] `axe` DevTools scan: 0 critical, 0 serious accessibility issues
- [ ] PR-diff ≤ 400 regels

---

## 11. Gerelateerde bestanden

```
sections/sophior-X.liquid
assets/sophior-X.css
locales/nl.schema.json       ← t: keys toevoegen
locales/en.default.schema.json ← t: keys toevoegen
templates/page.playground.json ← varianten toevoegen
docs/sections/sophior-X.md   ← dit bestand
```
