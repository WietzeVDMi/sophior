# Section Contract: sophior-blog-preview

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-blog-preview` |
| **Bestand** | `sections/sophior-blog-preview.liquid` |
| **CSS** | `assets/sophior-blog-preview.css` |
| **Sprint** | Sprint 2 (gebouwd), Sprint 3 (hardcoded placeholder tekst) |
| **Status** | Built — 1 correctie vereist (hardcoded placeholder strings) |

## 2. Doel & Context

Preview van de 3 meest recente blogartikelen uit een geselecteerde blog. Toont afbeelding, categorie-badge, titel, excerpt en lees-meer link. Fallback naar placeholder-kaarten als blog geen artikelen heeft.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `title` | `text` | `"Gidsen & inspiratie"` | |
| `blog` | `blog` | — | Blog-picker |
| `cta_label` | `text` | `"Bekijk alle gidsen"` | |
| `cta_url` | `url` | — | |
| `placeholder_category` | `text` | `"Gidsen"` | Categorie-badge in placeholder |
| `placeholder_title` | `text` | `"Artikeltitel volgt binnenkort"` | |
| `placeholder_excerpt` | `text` | `"Hier komt binnenkort een gids..."` | |
| `placeholder_cta` | `text` | `"Lees meer"` | |

### Blocks
Geen blocks.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-blog-preview": {
  "name": "Blog preview",
  "settings": {
    "title": { "label": "Sectietitel" },
    "blog": { "label": "Blog" },
    "cta_label": { "label": "CTA-tekst" },
    "cta_url": { "label": "CTA-link" },
    "header_placeholder": { "content": "Placeholder (als blog leeg is)" },
    "placeholder_category": { "label": "Categorie-label" },
    "placeholder_title": { "label": "Artikeltitel" },
    "placeholder_excerpt": { "label": "Excerpt" },
    "placeholder_cta": { "label": "Lees meer tekst" }
  },
  "read_more": "Lees meer →"
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Blog met artikelen | Blog gekoppeld, ≥3 artikelen | Blok 1 |
| Blog leeg (placeholder) | Blog gekoppeld, 0 artikelen | Blok 2 |
| Geen blog gekozen | blog = blank → `blogs.first` fallback | Blok 3 |
| Edge: artikel zonder afbeelding | | Blok 4 |
| Edge: lange titel (>80 tekens) | | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 750px | 1 kolom, kaarten gestapeld |
| ≥ 750px | 3-koloms raster |

## 7. A11y regels

- Artikel-link omvat de hele kaart — `aria-label` met artikeltitel
- Categorie-badge: decoratief → `aria-hidden`
- Afbeelding alt = artikeltitel

## 8. Performance regels

- Afbeeldingen: `loading: 'lazy'`, `widths: '400, 600'`
- **CORRECTIE VEREIST:** Hardcoded strings in placeholder (`'Gidsen'`, `'Artikeltitel volgt binnenkort'`, `'Hier komt binnenkort...'`, `'Lees meer →'`) → via schema-settings
- **CORRECTIE VEREIST:** `#4a6b60` → `var(--sophior-mid-green)` in CSS

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Blog geen artikelen | 3 placeholder-kaarten (via schema settings) |
| Blog = blank | Fallback naar `blogs.first` |
| Artikel zonder excerpt | Korte samenvatting of lege excerpt-paragraaf |

## 10. Acceptatiecriteria

- [ ] Placeholder-teksten aanpasbaar via Admin
- [ ] Blog picker werkt correct
- [ ] Geen hardcoded NL-strings in Liquid
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
