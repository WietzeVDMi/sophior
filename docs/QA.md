# QA Gates & CI

## Overzicht gates

| Gate | Tool | Threshold | Pagina's |
|---|---|---|---|
| Performance | Lighthouse | ≥95 | home, playground |
| SEO | Lighthouse | =100 | home, playground |
| Accessibility | Lighthouse | ≥95 | home, playground |
| Best Practices | Lighthouse | ≥95 | home, playground |
| Liquid syntax | shopify theme check | 0 errors | alle bestanden |
| Structured data | Google Rich Results Test | Valide | home, PDP (Sprint 5+) |

---

## Lokaal draaien

### 1. Shopify theme check (Liquid validatie)

```bash
# Vanuit de project-root via Docker:
docker compose run --rm shopify shopify theme check

# Of als Shopify CLI lokaal geïnstalleerd is:
shopify theme check
```

Verwacht: `0 errors, 0 warnings` (warnings die je accepteert: voeg toe aan `.shopifyignore` met commentaar).

### 2. Lighthouse CI lokaal

```bash
# Installeer lhci globally (eenmalig):
npm install -g @lhci/cli

# Start dev-server:
docker compose up -d

# Run Lighthouse:
lhci autorun
```

De drempelwaarden zijn geconfigureerd in `.lighthouserc.json`.

### 3. npm scripts (package.json)

```bash
npm run check        # shopify theme check
npm run lighthouse   # lhci autorun
npm run qa           # check + lighthouse
```

---

## CI — GitHub Actions

### `.github/workflows/theme-check.yml`

Draait bij elke PR naar `develop` of `main`:
- `shopify theme check` — faalt bij errors

### `.github/workflows/lighthouse.yml`

Draait na deploy naar staging (`develop` branch):
- Lighthouse CI op staging-URL
- Faalt als drempelwaarden niet gehaald worden

---

## `.lighthouserc.json` configuratie

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:9292/",
        "http://localhost:9292/pages/playground"
      ],
      "startServerCommand": "",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 1.0}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## Structured data validatie (Sprint 5+)

Na Sprint 5 (PDP) valideer je:

1. **Product schema:** [Google Rich Results Test](https://search.google.com/test/rich-results)
2. **FAQPage schema:** idem
3. **BreadcrumbList schema:** idem
4. **Organization schema:** idem (homepage)

Voer URL's in van de staging-store.

---

## Handmatige QA checklist (per PR)

- [ ] `shopify theme check` 0 errors op gewijzigde files
- [ ] Mobile getest (Chrome DevTools, 375px)
- [ ] Tablet getest (768px)
- [ ] Desktop getest (1280px+)
- [ ] Keyboard-navigatie getest (Tab, Enter, Escape)
- [ ] Playground bijgewerkt (alle varianten zichtbaar)
- [ ] Geen hardcoded kleuren in CSS-diff

---

## Bekende uitzonderingen

| Waarschuwing | Reden | Actie |
|---|---|---|
| `Missing schema for section` | Dawn-standaardsecties | Negeren |
| `Liquid deprecation: ... ` | Dawn upstream issue | Rapporteren; niet blokkeren |

Voeg geaccepteerde waarschuwingen toe aan `.shopifyignore`:
```
# Geaccepteerde theme check warnings
# [datum] [reden]
```

---

## Performance budget (per pagina)

| Metric | Target | Blocker bij |
|---|---|---|
| LCP | < 2.5s | > 4.0s |
| CLS | < 0.1 | > 0.25 |
| INP | < 200ms | > 500ms |
| TBT | < 200ms | > 600ms |

Referentie: [web.dev/vitals](https://web.dev/vitals/)
