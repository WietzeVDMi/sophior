# SOPHIOR Sections Playground

## Doel

De Playground is een speciale pagina in de Shopify Editor waarop **alle custom sections met al hun varianten en edge cases** tegelijk zichtbaar zijn. Dit maakt het mogelijk om:

- Visuele regressies direct te zien
- Nieuwe varianten te testen zonder de homepage te verstoren
- Agents/tools een stabiele URL te geven om te auditen (Lighthouse, axe, etc.)

---

## Stap 1: Pagina aanmaken in Shopify Admin

1. Ga naar **Online Store → Pages**
2. Klik **Add page**
3. Titel: `Sections Playground`
4. Handle (URL): `playground`
5. Template: kies `page.playground` (zie stap 2)
6. Klik **Save**

De pagina is nu bereikbaar op: `https://sophior-keuken.myshopify.com/pages/playground`

Voor de dev-preview: `http://localhost:9292/pages/playground`

---

## Stap 2: Template aanmaken (reeds gedaan)

Het bestand `templates/page.playground.json` is aangemaakt en bevat alle sections met varianten. Je hoeft dit niet handmatig te doen.

---

## Stap 3: Gebruik in Shopify Editor

1. Ga naar **Online Store → Themes → Customize**
2. Klik linksboven op de pagina-selector
3. Kies **Pages → Sections Playground**
4. Alle sections zijn nu zichtbaar in de editor

In de linker sidebar zie je alle secties genummerd. Elke sectie heeft een naam die de variant aangeeft (bijv. `Hero — standaard`, `Hero — zonder afbeelding`).

---

## Overzicht van varianten per section

### sophior-announcement-bar (5 blokken)
| Blok | Variant |
|---|---|
| 1 | Standaard (3 USPs) |
| 2 | 2 USPs (derde leeg) |
| 3 | 1 USP |
| 4 | Edge: lange tekst |
| 5 | Edge: geen icoon |

### sophior-hero (5 blokken)
| Blok | Variant |
|---|---|
| 1 | Standaard (heading + subheading + CTA + afbeelding) |
| 2 | Zonder CTA |
| 3 | Zonder subheading |
| 4 | Edge: geen afbeelding (placeholder) |
| 5 | Edge: lange heading |

### sophior-trustbadge-bar (5 blokken)
| Blok | Variant |
|---|---|
| 1 | Alle 4 badges |
| 2 | 2 badges |
| 3 | Alle 5 icoontypen |
| 4 | Edge: lange tekst |
| 5 | Edge: 1 badge |

### sophior-collections-grid (5 blokken)
| Blok | Variant |
|---|---|
| 1 | 4 kaarten met collecties |
| 2 | 4 kaarten zonder collecties (fallback) |
| 3 | 2 kaarten |
| 4 | Edge: geen afbeelding |
| 5 | Edge: label override |

### sophior-bestsellers (5 blokken)
| Blok | Variant |
|---|---|
| 1 | Standaard (alle opties aan) |
| 2 | Zonder quick-add |
| 3 | Zonder rating en prijs |
| 4 | Edge: geen collectie |
| 5 | Edge: 1 product |

### sophior-usp-accordion (5 blokken)
| Blok | Variant |
|---|---|
| 1 | 5 items + afbeelding |
| 2 | Zonder afbeelding |
| 3 | 1 item |
| 4 | Edge: lang antwoord |
| 5 | Edge: 0 items |

### sophior-review-slider (5 blokken)
| Blok | Variant |
|---|---|
| 1 | 5 reviews, autoplay aan |
| 2 | 1 review |
| 3 | Autoplay = laagste interval |
| 4 | Edge: lange review |
| 5 | Edge: 10 reviews |

### sophior-blog-preview (5 blokken)
| Blok | Variant |
|---|---|
| 1 | Blog met artikelen |
| 2 | Blog leeg (placeholder kaarten) |
| 3 | Geen blog → `blogs.first` |
| 4 | Edge: artikel zonder afbeelding |
| 5 | Edge: lange titel |

### sophior-trustbar-footer (5 blokken)
| Blok | Variant |
|---|---|
| 1 | 4 items volledig |
| 2 | 2 items |
| 3 | Alle 6 icoontypen |
| 4 | Edge: lange beschrijving |
| 5 | Edge: 1 item |

---

## QA-gebruik

### Lighthouse op playground
```bash
# Vanuit Docker (na shopify theme dev):
npx lhci autorun --url=http://localhost:9292/pages/playground
```

### Axe accessibility scan
Installeer de [axe DevTools Chrome extensie](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) en run de scan op `http://localhost:9292/pages/playground`.

### Shopify theme check
```bash
docker compose run --rm shopify shopify theme check
```

---

## Template onderhoud

Bij elke nieuwe section die je bouwt:

1. Voeg ≥3 varianten + 2 edge cases toe aan `templates/page.playground.json`
2. Documenteer de varianten in `docs/sections/<handle>.md` (kolom "Playground-blok")
3. Controleer visueel in de editor

**Regel:** Een section die niet in de Playground staat, voldoet niet aan de Definition of Done.
