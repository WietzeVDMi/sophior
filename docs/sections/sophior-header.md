# Section Contract: sophior-header

## 1. Meta

| Veld | Waarde |
|---|---|
| **Handle** | `sophior-header` |
| **Bestand** | `sections/sophior-header.liquid` |
| **CSS** | `assets/sophior-header.css` |
| **Sprint** | Sprint 1 (gebouwd), Sprint 3 (fix: scroll-lock JS) |
| **Status** | Built — 1 correctie vereist (B4: scroll-lock via CSS klasse) |

## 2. Doel & Context

Sticky header met logo, desktop navigatie (mega menu voor "Producten"), utility icons (zoeken, account, cart) en mobile hamburger-drawer.

## 3. Schema — Settings & Blocks

### Settings

| ID | Type | Default | Opmerking |
|---|---|---|---|
| `logo` | `image_picker` | — | Overschrijft SVG fallback |
| `logo_width` | `range` (100–300px) | `165` | |
| `main_menu` | `link_list` | `"main-menu"` | Linklist handle |
| `mega_menu_trigger` | `text` | `"Producten"` | Link-titel die mega menu triggert |

### Blocks
Geen blocks.

## 4. Vertalingen (nl.schema.json keys)

```json
"sophior-header": {
  "name": "Header",
  "settings": {
    "logo": { "label": "Logo" },
    "logo_width": { "label": "Logobreedte" },
    "main_menu": { "label": "Navigatiemenu" },
    "mega_menu_trigger": {
      "label": "Mega menu trigger",
      "info": "Exacte naam van het menu-item dat het mega menu opent"
    },
    "mobile_menu_open": "Menu openen",
    "mobile_menu_close": "Menu sluiten",
    "mobile_menu_label": "Mobiel menu",
    "nav_aria_label": "Hoofdnavigatie",
    "view_all": "Bekijk alles"
  }
}
```

## 5. Varianten-mapping

| Variant | Instellingen | Playground |
|---|---|---|
| Standaard | SVG logo fallback, main-menu | Blok 1 |
| Custom logo | Logo via image_picker | Blok 2 |
| Mega menu actief | mega_menu_trigger = "Producten" en menu heeft children | Blok 3 |
| Edge: geen menu items | main_menu = lege linklist | Blok 4 |
| Edge: logo ontbreekt | logo = blank → SVG fallback | Blok 5 |

## 6. Responsive regels

| Breakpoint | Gedrag |
|---|---|
| < 989px | Hamburger zichtbaar, nav verborgen |
| ≥ 989px | Hamburger verborgen, nav zichtbaar, mega menu op hover |

## 7. A11y regels

- Hamburger: `aria-controls="sophior-mobile-nav"`, `aria-expanded` toggle
- Mega menu trigger: `aria-haspopup="true"`, `aria-expanded` toggle
- Actieve link: `aria-current="page"`
- Icon buttons: `aria-label` via `t:` key
- Mobile nav: `aria-hidden` toggle

## 8. Performance regels

- Logo: `loading="eager"` (LCP-element)
- Geen externe JS
- Scroll-lock: **CORRECTIE VEREIST** — vervang `document.body.style.overflow = 'hidden'` door:
  ```javascript
  document.body.classList.add('sophior-nav-open');
  // close:
  document.body.classList.remove('sophior-nav-open');
  ```
  Met CSS:
  ```css
  body.sophior-nav-open { overflow: hidden; }
  ```

## 9. Edge cases & defaults

| Case | Gedrag |
|---|---|
| Geen logo-instelling | SVG fallback `sophior-logo-light.svg` |
| Mega menu trigger matcht geen link | Normale links — geen mega menu |
| Cart leeg | Cart count badge verborgen |
| Cart > 0 items | Badge met item-count + aria-label |

## 10. Acceptatiecriteria

- [ ] Mega menu opent op hover (desktop) en is keyboard-bereikbaar
- [ ] Mobile nav opent/sluit soepel
- [ ] Scroll-lock via CSS klasse (niet via `body.style.overflow`)
- [ ] `shopify theme check` 0 errors
- [ ] nl.schema.json keys aanwezig
