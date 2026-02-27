# Section Contract: sophior-footer

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-footer` |
| **Bestand** | `sections/sophior-footer.liquid` |
| **CSS** | `assets/sophior-footer.css` |
| **Sprint** | Sprint 1 (gebouwd), Sprint 3 (CSS rgba fixes) |
| **Status** | Built — CSS-tokens correctie vereist (9 hardcoded rgba) |

## 2. Doel & Context

Site-brede footer met branding (logo + tagline + nieuwsbrief), 3 linkkolommen (accordion op mobile), betaalikonen en copyright.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `tagline` | `text` | `"..."` | Korte tagline onder logo |
| `newsletter_placeholder` | `text` | `"Jouw e-mailadres"` | Input placeholder |
| `newsletter_btn` | `text` | `"Aanmelden"` | Button tekst |
| `social_instagram` | `url` | — | Instagram URL |
| `social_facebook` | `url` | — | Facebook URL |
| `social_pinterest` | `url` | — | Pinterest URL |
| `col2_title` | `text` | `"Klantenservice"` | Kolom 2 header |
| `col2_menu` | `link_list` | `"footer-service"` | |
| `col3_title` | `text` | `"Over SOPHIOR"` | Kolom 3 header |
| `col3_menu` | `link_list` | `"footer-over"` | |
| `col4_title` | `text` | `"Informatie"` | Kolom 4 header |
| `col4_menu` | `link_list` | `"footer-info"` | |

### Blocks
Geen blocks — flat settings.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-footer": {
  "name": "Footer",
  "settings": {
    "tagline": { "label": "Tagline" },
    "header_newsletter": { "content": "Nieuwsbrief" },
    "newsletter_placeholder": { "label": "Input placeholder" },
    "newsletter_btn": { "label": "Button tekst" },
    "header_social": { "content": "Sociale media" },
    "social_instagram": { "label": "Instagram URL" },
    "social_facebook": { "label": "Facebook URL" },
    "social_pinterest": { "label": "Pinterest URL" },
    "header_col2": { "content": "Kolom 2" },
    "col2_title": { "label": "Kolomtitel" },
    "col2_menu": { "label": "Menu" },
    "header_col3": { "content": "Kolom 3" },
    "col3_title": { "label": "Kolomtitel" },
    "col3_menu": { "label": "Menu" },
    "header_col4": { "content": "Kolom 4" },
    "col4_title": { "label": "Kolomtitel" },
    "col4_menu": { "label": "Menu" }
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Volledig ingevuld | Alle links, social, nieuwsbrief | Blok 1 |
| Geen social media | Alle social URLs leeg | Blok 2 |
| Lege linkkolommen | Alle link_lists leeg | Blok 3 |
| Edge: lange tagline | >100 tekens | Blok 4 |
| Edge: geen betaalmethoden | Shop heeft geen payment icons | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | 1 kolom, linkkolommen als accordion (`<details>`) |
| ≥ 750px | 4-koloms grid (`2fr 1fr 1fr 1fr`), accordion uitgeschakeld |

## 7. A11y regels

- `<footer role="contentinfo">`
- Accordion `<details>/<summary>` — native keyboard-support
- Social links: `rel="noopener noreferrer"` + `target="_blank"`
- Betaalkonen: decoratief → `aria-hidden`
- Nieuwsbrief-input: `aria-label` of `<label>`

## 8. Performance regels

- **CORRECTIE VEREIST:** 9 hardcoded `rgba(241, 239, 234, X)` vervangen door CSS-tokens
- Betalingikonen via `payment_type_svg_tag` — Shopify CDN
- Geen JS in footer
- Lege regelset `.sophior-footer__brand {}` verwijderen

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Newsletter URL ontbreekt | Formulier stuurt naar `#` |
| Social URL leeg | Icon verborgen |
| Link_list leeg | Kolom toont alleen de kolomtitel |

## 10. Acceptatiecriteria

- [ ] Accordion werkt op mobile zonder JS
- [ ] Betaalikonen zichtbaar (Shopify-native)
- [ ] Geen hardcoded rgba in sophior-footer.css
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
