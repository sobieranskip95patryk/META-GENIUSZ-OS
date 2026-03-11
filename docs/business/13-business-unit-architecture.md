# [13] Business Unit Architecture

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Określenie struktury organizacyjnej ekosystemu META-GENIUSZ OS: relacje między core brandem a sub-brandami (HHU, RFG, AI Studio), centra przychodowe, hierarchia modułów i opcje struktury spółkowej. Dokument ustala, jak firma jest zorganizowana na poziomie jednostek biznesowych — dziś i docelowo.

---

## Stan obecny

Projekt operuje jako jednoosobowa inicjatywa Foundera bez formalnej struktury korporacyjnej. Wszystkie moduły (HHU, RFG, AI Studio, Admin) żyją w jednym monorepo bez wydzielonych centrów kosztowych ani przychodowych. Brak jasności, czy sub-brandy będą oddzielnymi podmiotami, czy jednostkami wewnątrz jednej spółki.

---

## Model organizacyjny

### Obecna rzeczywistość (Faza 0 — Solo Founder)

```
META-GENIUSZ OS (projekt parasolowy)
  ├── HHU (moduł frontowy — hip-hop social)
  ├── RFG (moduł frontowy — fashion/modeling)
  ├── AI Studio (moduł narzędziowy — AI tools)
  ├── Admin (moduł wewnętrzny — backoffice)
  └── Core Platform (API, auth, billing, shared services)
```

Wszystko zarządza Founder. Brak odrębnych zespołów, budżetów ani P&L.

### Docelowa struktura (Faza 3+ — Growth)

```
META-GENIUSZ OS sp. z o.o. (lub S.A.)
  │
  ├── BU: Hip Hop Universe (HHU)
  │   ├── Product: social feed, profiles, discovery
  │   ├── Revenue: HHU Premium, Creator Subscriptions
  │   └── Team: Community Manager, Content Ops
  │
  ├── BU: Rocket Fuell Girls (RFG)
  │   ├── Product: portfolio, galeria, castingi
  │   ├── Revenue: RFG Premium, Partnership Fees
  │   └── Team: Safety Lead, Partnership Manager
  │
  ├── BU: AI Studio Creator
  │   ├── Product: AI tools, workflows, generators
  │   ├── Revenue: AI Credits, Workflow Marketplace
  │   └── Team: AI Engineer, Product Designer
  │
  └── Shared Platform (Cost Center)
      ├── Auth, Billing, Notifications, Search
      ├── Infrastructure, DevOps, Admin Panel
      └── Trust & Safety, Legal, Analytics
```

---

## Relacje marek

### Hierarchia brandowa

| Poziom | Marka | Rola | Widoczność dla usera |
|--------|-------|------|---------------------|
| **Korporacyjna** | META-GENIUSZ OS | Brand parasolowy; platforma + infra | Niska (backend brand) |
| **Frontowa 1** | Hip Hop Universe (HHU) | Pierwszy vertical — hip-hop community | Wysoka (główny produkt) |
| **Frontowa 2** | Rocket Fuell Girls (RFG) | Vertical — fashion/modeling | Wysoka (niche audience) |
| **Narzędziowa** | AI Studio Creator | Cross-vertical AI toolkit | Średnia (zintegrowane w HHU/RFG) |
| **Wewnętrzna** | Admin Panel | Backoffice i moderacja | Brak (internal only) |

### Model relacji: endorsed brand strategy

```
META-GENIUSZ OS  (parent brand — „powered by")
  ├── HHU        „Hip Hop Universe — powered by META-GENIUSZ OS"
  ├── RFG        „Rocket Fuell Girls — powered by META-GENIUSZ OS"
  └── AI Studio  „AI Studio Creator — part of META-GENIUSZ OS"
```

Każdy vertical ma **własną tożsamość wizualną** i audience, ale dzieli infrastrukturę i jest „powered by" META-GENIUSZ OS. Parent brand rośnie przez sukces sub-brandów.

---

## Revenue centers (centra przychodowe)

| Revenue Center | Produkt | Model | Faza |
|----------------|---------|-------|------|
| **HHU Premium** | Subscription twórców (badge, analytics, priority) | Recurring (PLN 29-99/mo) | v0.5+ |
| **AI Credits** | Credits za użycie AI tools | Freemium + top-up | v0.5+ |
| **Creator Subscriptions** | Fan → Creator (support, exclusive content) | Revenue share (80/20) | v1.0+ |
| **Tipping** | Microtransaction fan → twórca | Revenue share (90/10) | v0.5+ |
| **RFG Portfolio Premium** | Modelki/twórczynie — enhanced portfolio | Recurring | v1.0+ |
| **Partnership Fees** | Marki/labele płacą za kampanie na platformie | CPM/CPC/flat | v1.5+ |
| **Workflow Marketplace** | Twórcy sprzedają AI workflows | Marketplace fee (20%) | v2.0+ |

### Revenue split per BU (docelowe)

```
        HHU
    ┌───┴───┐
    │  40%  │   ← HHU Premium + Creator Subs + Tips
    └───────┘
     AI Studio
    ┌───┴───┐
    │  30%  │   ← AI Credits + Workflow Marketplace
    └───────┘
        RFG
    ┌───┴───┐
    │  20%  │   ← RFG Premium + Portfolio + Partnerships
    └───────┘
     Platform
    ┌───┴───┐
    │  10%  │   ← Platform fees, data services (later)
    └───────┘
```

---

## Strategiczna hierarchia modułów

| Priorytet | Moduł | Rola w ekosystemie | Kiedy |
|-----------|-------|--------------------|-------|
| P0 | Core Platform (auth, API, DB) | Blokujący wszystko | v0.2 |
| P0 | HHU | Beachhead product; first users; validation | v0.2–v0.4 |
| P1 | AI Studio | Value multiplier; retention; upsell | v0.5 |
| P1 | Admin Panel | Operations enabler; moderation | v0.3 |
| P2 | RFG | Second vertical; cross-network growth | v1.0 |
| P3 | Monetization Engine | Revenue unlocking | v0.5–v1.0 |
| P3 | Trust & Safety | Scale enabler; compliance | v0.5+ |

---

## Opcje struktury spółkowej

### Opcja A: Jedna spółka (REKOMENDOWANE teraz)

```
META-GENIUSZ OS sp. z o.o.
  → Wszystkie BU jako wewnętrzne działy
  → Jeden bilans, jeden zarząd
```

**Zalety**: Prostota; brak overhead korporacyjnego; łatwiejsze fundraising  
**Wady**: Brak separacji ryzyka między verticalami  
**Kiedy zmienić**: Gdy revenue > PLN 2M ARR lub inwestor wymaga

### Opcja B: Holding + subsidiaries (PÓŹNIEJ)

```
META-GENIUSZ Holding sp. z o.o.
  ├── HHU sp. z o.o.      (100% owned)
  ├── RFG sp. z o.o.      (100% owned)
  └── AI Studio sp. z o.o. (100% owned)
```

**Zalety**: Separacja ryzyka; możliwość odrębnego fundraisingu per vertical  
**Wady**: Overhead admin; transfer pricing; wielokrotne KRS  
**Kiedy**: Post-Series A lub jeśli regulacje wymagają

### Opcja C: Hybrid (OPCJONALNE)

Jedna spółka, ale z formalnymi P&L statements per BU — jak startup accounting best practice.

---

## Klasyfikacja (OBECNA / DOCELOWA / NIEPOTRZEBNE)

### OBECNA STRUKTURA (= TERAZ)
- Jeden projekt, jeden repo, jeden Founder
- Brak formalnej spółki (etap pre-seed)
- Brak budżetów per BU

### DOCELOWA STRUKTURA (= PÓŹNIEJ)
- Formalna spółka (sp. z o.o.)
- 3 BU z P&L tracking
- Shared platform jako cost center
- Endorsed brand strategy

### NIEPOTRZEBNE KOMPLIKACJE (= ODRZUCIĆ)
- Holding structure pre-revenue
- Oddzielne spółki per vertical przed Series A
- Formalny board of directors pre-seed
- Osobne domeny / osobne repo per BU

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Brak formalnej spółki blokuje partnerships/contracts | WYSOKIE | ŚREDNI | Zarejestrować sp. z o.o. gdy MVP gotowe (pre-launch) |
| R2 | Sub-brandy kanibalizują się nawzajem (HHU vs RFG audience overlap) | NISKIE | ŚREDNI | Różne persony; różne kultury; monitoring cross-usage |
| R3 | Revenue split między BU staje się konfliktem wewnętrznym | NISKIE | NISKI | Solo founder = brak konfliktu; formalizować dopiero z team |

---

## Founder Decision Notes

- [ ] **FDN-31**: Zatwierdzić model jednej spółki (Opcja A) do momentu Series A
- [ ] **FDN-32**: Zatwierdzić endorsed brand strategy (sub-brands „powered by META-GENIUSZ OS")
- [ ] **FDN-33**: Określić kiedy formalnie zarejestrować sp. z o.o. (pre-launch? post-MVP?)

---

## Dokumenty zależne

- ← [11] Category Definition Thesis (pozycjonowanie rynkowe)
- ← [12] Master Strategic Thesis (nadrzędna teza)
- → [14] Product Architecture Master (mapa produktów per BU)
- → [48] Monetization Engine Master Spec (revenue specs per BU)
- → [50] Investor Narrative (struktura spółki w pitch)
