# SOPHIOR Metafields — Aanmaak instructies

Aanmaken via **Shopify Admin → Instellingen → Aangepaste gegevens → Producten**

---

## Verplichte metafields

### 1. `custom.core_promise`
| | |
|---|---|
| **Namespace & key** | `custom.core_promise` |
| **Type** | Korte tekst (Single line text) |
| **Weergegeven als** | Gebruik op PDP onder de `<h1>` producttitel |
| **Voorbeeld** | `Handgemaakt in Nederland — voor de veeleisende thuiskok` |
| **Karakter limiet** | Max 80 tekens aanbevolen |

---

### 2. `custom.usp_1`
| | |
|---|---|
| **Namespace & key** | `custom.usp_1` |
| **Type** | Korte tekst (Single line text) |
| **Gebruik** | Eerste USP bullet naast de variant picker op PDP |
| **Voorbeeld** | `FSC-gecertificeerd beukenhout` |

---

### 3. `custom.usp_2`
| | |
|---|---|
| **Namespace & key** | `custom.usp_2` |
| **Type** | Korte tekst (Single line text) |
| **Gebruik** | Tweede USP bullet |
| **Voorbeeld** | `Vaatwasmachinebestendig` |

---

### 4. `custom.usp_3`
| | |
|---|---|
| **Namespace & key** | `custom.usp_3` |
| **Type** | Korte tekst (Single line text) |
| **Gebruik** | Derde USP bullet |
| **Voorbeeld** | `Inclusief 10-jaar garantie` |

---

### 5. `custom.long_description`
| | |
|---|---|
| **Namespace & key** | `custom.long_description` |
| **Type** | Rich text |
| **Gebruik** | Uitgebreide SEO-tekst sectie op PDP (`sophior-product-description`) |
| **Toelichting** | Ondersteunt headings (H2/H3), lijsten, vet/cursief, links. Geen HTML-limit. |
| **SEO-advies** | Min. 300 woorden per product voor relevante zoekwoorden |

---

### 6. `custom.addon_product`
| | |
|---|---|
| **Namespace & key** | `custom.addon_product` |
| **Type** | Productreferentie (Product reference) |
| **Gebruik** | Cross-sell add-on in cart drawer en PDP (Sprint 6) |
| **Logica** | Snijplanken → Onderhoudsolie, Pannen → Panbeschermers, Messen → Mesbeschermer |
| **Status** | Aanmaken nu, gekoppeld in Sprint 6 (Cart Drawer) |

---

## Aanmaak stap-voor-stap

1. Ga naar **Shopify Admin → Instellingen → Aangepaste gegevens**
2. Klik op **Producten** onder "Metaobject definities"
3. Klik **+ Definitie toevoegen** voor elk metafield hierboven
4. Vul in:
   - **Naam**: bijv. `Kernbelofte`
   - **Namespace en key**: bijv. `custom.core_promise` (let op: exact overnemen)
   - **Type**: zie tabel hierboven
5. Klik **Opslaan**

> **Let op:** De namespace `custom` is de standaard Shopify namespace voor winkelspecifieke metafields. Gebruik altijd `custom.*` voor SOPHIOR metafields.

---

## Per product invullen

Na aanmaken zijn de velden zichtbaar in het product-bewerkscherm:

1. Ga naar **Shopify Admin → Producten → [product naam]**
2. Scroll naar beneden naar **Metafields**
3. Vul de velden in per product

---

## Gebruik in Liquid

```liquid
{# Kernbelofte #}
{{ product.metafields.custom.core_promise }}

{# USP-lijst #}
{{ product.metafields.custom.usp_1 }}
{{ product.metafields.custom.usp_2 }}
{{ product.metafields.custom.usp_3 }}

{# Uitgebreide beschrijving (Rich Text — gebruik metafield_tag) #}
{{ product.metafields.custom.long_description | metafield_tag }}

{# Add-on product #}
{{ product.metafields.custom.addon_product.value }}
```

---

## Status

| Metafield | Aangemaakt | Gebruikt in |
|---|---|---|
| `custom.core_promise` | ⬜ Nog aanmaken | Sprint 5 — PDP (`sophior-product-info`) |
| `custom.usp_1/2/3` | ⬜ Nog aanmaken | Sprint 5 — PDP (`sophior-product-info`) |
| `custom.long_description` | ⬜ Nog aanmaken | Sprint 5 — PDP (`sophior-product-description`) |
| `custom.addon_product` | ⬜ Nog aanmaken | Sprint 6 — Cart Drawer |
