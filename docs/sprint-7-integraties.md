# Sprint 7 — Integraties & Apps

**Status:** 🔒 Wacht op klant (API keys + widget ID)
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
| Rebuy Widget ID | ❌ Niet ontvangen |
| Cart upsell app keuze | ✅ Rebuy gekozen |

---

## Thema-code (klaar — wacht op keys)

De volgende code is **reeds gebouwd** en activeert automatisch zodra de klant de keys invult:

### Activeren via Shopify Admin → Themes → Customize → SOPHIOR Integraties

- **Judge.me Public Key** invullen → PDP review widget + product card sterren worden automatisch geladen
- **Klaviyo Lijst-ID** invullen → footer newsletter form switcht naar Klaviyo embed
- **Rebuy Widget ID** invullen → Rebuy upsell widget verschijnt in cart drawer (boven checkout-knop)

Bestanden bijgewerkt:
- `config/settings_schema.json` — tabblad "SOPHIOR — Integraties" (Judge.me key + Klaviyo lijst-ID + Rebuy Widget ID)
- `sections/sophior-judge-placeholder.liquid` — leest key uit globale setting als fallback
- `snippets/sophior-product-card.liquid` — toont Judge.me badge wanneer key is ingevuld
- `sections/sophior-footer.liquid` — toont `klaviyo-form-[ID]` div of contact-formulier als fallback
- `snippets/sophior-cart-drawer.liquid` — toont `<rebuy-widget id="[ID]">` wanneer widget-ID is ingevuld

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

## Cart Upsell App — Rebuy ✅

**Gekozen aanpak:** Rebuy widget in de bestaande `sophior-cart-drawer` (cart drawer blijft intact).

**Installatie (klant):**
- [ ] Rebuy app installeren via Shopify App Store ← **klant**
- [ ] Widget aanmaken in Rebuy Admin → Widgets (type: cart upsell / related products)
- [ ] Upsell regels instellen per product.type (snijplank → onderhoudsolie, pan → panbeschermers, etc.) ← **klant**
- [ ] Widget ID kopiëren en invullen in **Admin → Themes → Customize → SOPHIOR Integraties → Rebuy Widget ID**

**Integratie in thema (code klaar):**
- [x] `<rebuy-widget id="{{ settings.rebuy_widget_id }}">` in cart drawer upsell-zone
- [x] Conditie: toont alleen wanneer `settings.rebuy_widget_id != blank`
- [x] Rebuy injecteert eigen stijlen via app embed — geen extra CSS nodig

---

## Aangemaakte/gewijzigde bestanden

### Gewijzigd

- `config/settings_schema.json` — "SOPHIOR — Integraties" sectie (Judge.me key + Klaviyo lijst-ID + Rebuy Widget ID)
- `sections/sophior-judge-placeholder.liquid` — leest key uit globale `settings.judgeme_public_key`
- `snippets/sophior-product-card.liquid` — conditie Judge.me badge vs placeholder sterren
- `sections/sophior-footer.liquid` — Klaviyo form of contact-formulier op basis van `settings.klaviyo_list_id`
- `snippets/sophior-cart-drawer.liquid` — Rebuy widget blok op basis van `settings.rebuy_widget_id`

---

## Deliverable

Zodra klant keys aanlevert:
1. Keys invullen in Admin → Themes → Customize → SOPHIOR Integraties
2. Judge.me widget live op PDP + sterren op productkaarten
3. Klaviyo newsletter formulier actief
4. GA4 + Meta Pixel installeren via Customer Events (Admin-only, geen code)
5. Rebuy widget live in cart drawer na invullen widget-ID
