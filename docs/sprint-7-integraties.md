# Sprint 7 — Integraties & Apps

**Status:** 🔒 Wacht op klant (API keys + app keuze)
**Duur:** 3–4 dagen
**Branch:** `feature/sprint-7-integraties`
**Vereist:** Sprints 1–6 afgerond | Alle API keys + IDs van klant

← [Sprint 6](sprint-6-blog.md) | [Terug naar Project Plan](../PROJECT-PLAN.md) | [Sprint 8 →](sprint-8-seo-performance.md)

---

## Doel

Alle externe services live en werkend: reviews, e-mail, analytics en cart upsell app.

---

## Wacht op klant

| Asset | Status |
|---|---|
| Judge.me public key | ❌ Niet ontvangen |
| Klaviyo lijst-ID | ❌ Niet ontvangen |
| GA4 property ID | ❌ Niet ontvangen |
| Meta Pixel ID | ❌ Niet ontvangen |
| Cart upsell app keuze (Rebuy vs In Cart Upsell) | ❌ Niet ontvangen |

---

## Thema-code (klaar — wacht op keys)

De volgende code is **reeds gebouwd** en activeert automatisch zodra de klant de keys invult:

### Activeren via Shopify Admin → Themes → Customize → SOPHIOR Integraties

- **Judge.me Public Key** invullen → PDP review widget + product card sterren worden automatisch geladen
- **Klaviyo Lijst-ID** invullen → footer newsletter form switcht naar Klaviyo embed

Bestanden bijgewerkt:
- `config/settings_schema.json` — nieuw tabblad "SOPHIOR — Integraties" (Judge.me key + Klaviyo lijst-ID)
- `sections/sophior-judge-placeholder.liquid` — leest key uit globale setting als fallback
- `snippets/sophior-product-card.liquid` — toont Judge.me badge wanneer key is ingevuld
- `sections/sophior-footer.liquid` — toont `klaviyo-form-[ID]` div of contact-formulier als fallback

---

## Judge.me Reviews

**Installatie (klant):**
- [ ] Judge.me app installeren via Shopify App Store ← **klant**
- [ ] Public API key kopiëren uit Judge.me Admin → Installatie
- [ ] Key invullen in **Admin → Themes → Customize → SOPHIOR Integraties → Judge.me Public Key**
- [ ] Reviews importeren (indien bestaande reviews beschikbaar zijn) ← **klant**

**Integratie in thema (code klaar):**
- [x] Review widget op PDP (`sections/sophior-judge-placeholder.liquid`) — toont Judge.me of placeholder
- [~] Review slider op homepage — blijft SOPHIOR-beheerde slider (klant vult reviews in via editor)
- [x] Sterren op productkaart — conditie op `settings.judgeme_public_key` → `jdgm-widget`

---

## Klaviyo

**Installatie (klant):**
- [ ] Klaviyo app installeren + account koppelen ← **klant**
- [ ] Lijst-ID kopiëren uit Klaviyo → Lists & Segments
- [ ] Lijst-ID invullen in **Admin → Themes → Customize → SOPHIOR Integraties → Klaviyo Lijst-ID**
- [ ] Pop-up configureren in Klaviyo dashboard (trigger: 30s of exit-intent) ← **klant**
- [ ] Welcome flow aanmaken in Klaviyo (buiten scope thema) ← **klant**

**Integratie in thema (code klaar):**
- [x] Footer newsletter conditie: `settings.klaviyo_list_id != blank` → Klaviyo div of Shopify contact form

---

## GA4 + Meta Pixel

**Kernregel:** NOOIT via `<script>` tags in `theme.liquid` — altijd via Shopify Customer Events.

**Installatie (klant, geen thema-code nodig):**
- [ ] Ga naar **Admin → Settings → Customer events** ← **klant**
- [ ] Voeg Google Analytics pixel toe → Property ID (`G-XXXXXXXXXX`) invoeren ← **klant**
- [ ] Voeg Meta (Facebook) pixel toe → Pixel ID invoeren ← **klant**
- [ ] Events testen via GA4 DebugView + Meta Events Manager ← **klant**

Vereiste events: `page_view`, `view_item`, `add_to_cart`, `purchase`

---

## Cart Upsell App

**Optie A — Rebuy Smart Cart:**
- [ ] App installeren ← **klant**
- [ ] Smart Cart configureren als vervanging van default cart ← **klant**
- [ ] Upsell regels instellen per product.type ← **klant**

**Optie B — In Cart Upsell:**
- [ ] App installeren ← **klant**
- [ ] Upsell widgets configureren in cart drawer ← **klant**
- [ ] Regels: "Als cart bevat snijplank → toon onderhoudsolie" ← **klant**

Placeholder comment aanwezig in `snippets/sophior-cart-drawer.liquid` voor add-on upsell logica.

---

## Aangemaakte/gewijzigde bestanden

### Gewijzigd
- `config/settings_schema.json` — "SOPHIOR — Integraties" sectie toegevoegd
- `sections/sophior-judge-placeholder.liquid` — leest key uit globale `settings.judgeme_public_key`
- `snippets/sophior-product-card.liquid` — conditie Judge.me badge vs placeholder sterren
- `sections/sophior-footer.liquid` — Klaviyo form of contact-formulier op basis van `settings.klaviyo_list_id`

---

## Deliverable

Zodra klant keys aanlevert:
1. Key invullen in Admin → Themes → Customize → SOPHIOR Integraties
2. Judge.me widget live op PDP + sterren op productkaarten
3. Klaviyo newsletter formulier actief
4. GA4 + Meta Pixel installeren via Customer Events (Admin-only, geen code)
5. Cart upsell app configureren (na klantkeuze)
