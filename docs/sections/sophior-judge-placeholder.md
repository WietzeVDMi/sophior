# Section Contract: sophior-judge-placeholder

**Handle:** `sophior-judge-placeholder`
**Type:** PDP reviews — Judge.me widget placeholder
**Liquid:** `sections/sophior-judge-placeholder.liquid`
**CSS:** geen apart bestand (inline stijlen via schema kleurschema)

---

## Doel

Placeholder voor de Judge.me reviews widget op de PDP.
Toont de Judge.me reviews widget via de officiële embed code als de public key beschikbaar is.
Valt terug op een visuele placeholder als er nog geen Judge.me key is geconfigureerd.

---

## Schema settings

| ID | Type | Default | Label |
|---|---|---|---|
| `heading` | text | `Klantbeoordelingen` | Sectietitel |
| `judgeme_public_key` | text | — | Judge.me public key |
| `color_scheme` | color_scheme | `scheme-1` | Kleurschema |
| `padding_top` | range 0–100 step 4 | 48 | Opvulling boven |
| `padding_bottom` | range 0–100 step 4 | 48 | Opvulling onder |

---

## Logica

```
als section.settings.judgeme_public_key != blank:
  render Judge.me widget embed div
anders:
  render visuele placeholder (sterren + "Reviews komen binnenkort")
```

---

## A11y

- `<h2>` sectietitel
- Placeholder tekst via schema (niet hardcoded)

---

## Edge cases

- Geen public key: placeholder met SOPHIOR-stijl sterren-weergave
- Judge.me laadt async — layout verschuift niet (min-height op container)

---

## Acceptatiecriteria

- [ ] Placeholder zichtbaar zolang geen Judge.me key ingevuld
- [ ] Judge.me widget laadt correct als public key ingevuld
- [ ] Sectietitel aanpasbaar
- [ ] Min-height voorkomt layout shift
