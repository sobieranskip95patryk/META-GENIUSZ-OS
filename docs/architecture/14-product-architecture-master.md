# [14] Product Architecture Master

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Mapa całego ekosystemu META-GENIUSZ OS jako zestawu produktów, shared capabilities i warstw rozwoju. Definiuje relacje między produktami frontowymi (HHU, RFG, AI Studio), platformą wspólną i usługami współdzielonymi. Ustala priorytety produktowe: co budujemy teraz, co wspiera, co rozszerzamy.

---

## Stan obecny

W repo istnieje 6 aplikacji (web, hhu, rfg, ai-studio, admin, api) i 12 pakietów (stubs). Tylko HHU ma działające features (feed + profil). Reszta to scaffolding. Brak formalnej mapy produktowej łączącej business logic z codebase.

---

## Mapa produktów

```
┌─────────────────────────────────────────────────────────────────────┐
│                     META-GENIUSZ OS ECOSYSTEM                        │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                     WARSTWA FRONTOWA (User-facing)               │ │
│  │                                                                   │ │
│  │  ┌─────────────┐  ┌────────────┐  ┌──────────────────────────┐  │ │
│  │  │     HHU     │  │    RFG     │  │    AI Studio Creator     │  │ │
│  │  │  Hip-Hop    │  │  Fashion/  │  │    AI tools for all      │  │ │
│  │  │  Social     │  │  Modeling  │  │    verticals             │  │ │
│  │  └─────────────┘  └────────────┘  └──────────────────────────┘  │ │
│  └───────────────────────────┬─────────────────────────────────────┘ │
│                              │                                        │
│  ┌───────────────────────────▼─────────────────────────────────────┐ │
│  │                     WEB HUB (apps/web)                           │ │
│  │          Centralny dashboard / landing / routing                  │ │
│  └───────────────────────────┬─────────────────────────────────────┘ │
│                              │                                        │
│  ┌───────────────────────────▼─────────────────────────────────────┐ │
│  │                  SHARED CAPABILITIES LAYER                       │ │
│  │  ┌──────┐  ┌────────┐  ┌──────┐  ┌────────┐  ┌───────────┐   │ │
│  │  │ Auth │  │Billing │  │Search│  │Notific.│  │ Analytics │   │ │
│  │  └──────┘  └────────┘  └──────┘  └────────┘  └───────────┘   │ │
│  │  ┌──────────────┐  ┌──────────┐  ┌────────────────────────┐   │ │
│  │  │  Moderation  │  │ Storage  │  │    AI Gateway (LOGOS)  │   │ │
│  │  └──────────────┘  └──────────┘  └────────────────────────┘   │ │
│  └───────────────────────────┬─────────────────────────────────────┘ │
│                              │                                        │
│  ┌───────────────────────────▼─────────────────────────────────────┐ │
│  │                  ADMIN & OPERATIONS LAYER                        │ │
│  │       Admin Panel, Moderation Queue, Analytics Dashboard         │ │
│  └───────────────────────────┬─────────────────────────────────────┘ │
│                              │                                        │
│  ┌───────────────────────────▼─────────────────────────────────────┐ │
│  │                    INFRASTRUCTURE LAYER                           │ │
│  │   Express API, Prisma ORM, DB (SQLite→PG), Config, Types        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Relacje między produktami

| Relacja | Opis | Typ |
|---------|------|-----|
| HHU → Auth | Logowanie, rejestracja, sesje | Blokująca |
| HHU → API | Feed, posty, profile, interakcje | Blokująca |
| HHU → AI Studio | Generator bio, caption optimizer | Wzbogacająca |
| HHU → Billing | Creator subscriptions, tipping | Opcjonalna (v0.5+) |
| RFG → Auth | Konto, profil, portfolio | Blokująca |
| RFG → Storage | Upload zdjęć, portfolio management | Blokująca |
| RFG → Moderation | Safety verification | Blokująca |
| AI Studio → AI Gateway | Wywołania modeli AI | Blokująca |
| AI Studio → Billing | AI credits, usage tracking | Blokująca (v0.5+) |
| Admin → API | CRUD na użytkownikach, postach, raportach | Blokująca |
| Admin → Moderation | Kolejka moderacji, decisions | Blokująca |
| Admin → Analytics | Dashboardy, metryki | Opcjonalna |

---

## Core features per produkt

### HHU — Hip Hop Universe

| Feature | Priorytet | Status | Wersja |
|---------|-----------|--------|--------|
| Profil twórcy (SSR) | P0 | ✅ Zaimplementowane | v0.1 |
| Feed (posty) | P0 | ✅ Zaimplementowane | v0.1 |
| Auth (rejestracja/login) | P0 | ⏳ Planowane | v0.2 |
| Avatar upload | P1 | ⏳ Planowane | v0.2 |
| Likes | P1 | ⏳ Planowane | v0.2 |
| Komentarze | P1 | ⏳ Planowane | v0.2 |
| Follow/unfollow | P1 | ⏳ Planowane | v0.3 |
| Discovery feed (recommended) | P2 | ⏳ Planowane | v0.4 |
| Creator dashboard | P2 | ⏳ Planowane | v0.5 |
| Messaging (DMs) | P3 | ⏳ Planowane | v1.0 |

### RFG — Rocket Fuell Girls

| Feature | Priorytet | Status | Wersja |
|---------|-----------|--------|--------|
| Profil modelki/muse | P1 | ⏳ Planowane | v0.5 |
| Portfolio upload | P1 | ⏳ Planowane | v0.5 |
| Galeria zdjęć | P1 | ⏳ Planowane | v0.5 |
| Castingi / oferty | P2 | ⏳ Planowane | v1.0 |
| Safety system (weryfikacja) | P1 | ⏳ Planowane | v0.5 |

### AI Studio Creator

| Feature | Priorytet | Status | Wersja |
|---------|-----------|--------|--------|
| Generator bio | P1 | ⏳ Planowane | v0.3 |
| Caption optimizer | P1 | ⏳ Planowane | v0.3 |
| Image prompt assistant | P2 | ⏳ Planowane | v0.5 |
| Workflow builder | P3 | ⏳ Planowane | v1.0 |
| Workflow marketplace | P3 | ⏳ Planowane | v2.0 |

### Admin Panel

| Feature | Priorytet | Status | Wersja |
|---------|-----------|--------|--------|
| User management (CRUD) | P1 | ⏳ Planowane | v0.3 |
| Moderation queue | P1 | ⏳ Planowane | v0.3 |
| Content reports | P1 | ⏳ Planowane | v0.3 |
| Analytics dashboard | P2 | ⏳ Planowane | v0.5 |
| Billing management | P2 | ⏳ Planowane | v1.0 |

---

## Shared capabilities

| Capability | Pakiet/Serwis | Używany przez | Status |
|-----------|---------------|---------------|--------|
| Auth | `packages/auth` | HHU, RFG, AI Studio, Admin | ⏳ Stub |
| UI Components | `packages/ui` | HHU, RFG, AI Studio, Admin, Web | ⏳ Stub |
| Database | `packages/database` | API, Admin | ⏳ Stub |
| Config | `packages/config` | Wszystkie apps | ⏳ Stub |
| Types | `packages/types` | Wszystkie apps + packages | ⏳ Stub |
| Utils | `packages/utils` | Wszystkie | ⏳ Stub |
| AI Core (LOGOS) | `packages/ai-core` | AI Studio, HHU (assistant), RFG | ⏳ Stub |
| Agents | `packages/agents` | AI Core | ⏳ Stub |
| Storage | `packages/storage` | HHU, RFG, AI Studio | ⏳ Stub |
| Analytics | `packages/analytics` | HHU, RFG, Admin | ⏳ Stub |
| Payments | `packages/payments` | Billing (shared) | ⏳ Stub |
| SDK | `packages/sdk` | External integrations | ⏳ Stub |

---

## Product boundaries

| Granica | Reguła |
|---------|--------|
| HHU ↔ RFG | Odrębne frontowe apps; współdzieli auth + API; brak cross-feed (v1) |
| Frontend ↔ API | Cała logika biznesowa w API; frontend = prezentacja + formularze |
| API ↔ Services | Mikroserwisy (media, search, notifications) są za API; frontend nie woła serwisów bezpośrednio |
| Packages ↔ Apps | Packages nie importują z apps; packages mogą importować inne packages |
| AI Studio ↔ AI Core | AI Studio = UI; AI Core = orchestration + model calls |

---

## Klasyfikacja priorytetów (CORE / SUPPORT / EXPANSION)

### CORE (= TERAZ — v0.2–v0.4)
- Platform: Auth, Config, Types, Database, API
- HHU: Social loop (profile → feed → like → comment → follow)
- Admin: Basic CRUD + moderation queue
- CI/CD: GitHub Actions + deployment

### SUPPORT (= PÓŹNIEJ — v0.5–v1.0)
- AI Studio: Generator bio + caption (first tools)
- Billing: Tipping + HHU Premium
- UI Components: Design system shared
- Storage: File uploads (avatar, portfolio)
- Analytics: Basic event tracking

### EXPANSION (= PRZYSZŁOŚĆ — v1.5+)
- RFG: Full vertical launch
- Monetization Engine: Subscriptions + marketplace
- Search Service: Discovery feed
- Notification Service: Push + email
- Recommendation Engine: AI-powered feed

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Za dużo produktów budowanych równolegle → brak quality | WYSOKIE | WYSOKI | Strict sequencing: HHU first, AI Studio second, RFG third |
| R2 | Shared capabilities nigdy nie zostają zbudowane → duplikacja | ŚREDNIE | WYSOKI | Wdrożyć auth + config + types w v0.2 jako blokery |
| R3 | Product boundaries rozmywają się → spaghetti architecture | ŚREDNIE | ŚREDNI | Ten dokument + code review na boundary violations |

---

## Founder Decision Notes

- [ ] **FDN-34**: Zatwierdzić sequencing: HHU (v0.2–v0.4) → AI Studio (v0.5) → RFG (v1.0)
- [ ] **FDN-35**: Zatwierdzić product boundary: frontend nie woła serwisów, tylko API
- [ ] **FDN-36**: Potwierdzić zakres Admin Panel na v0.3 (User CRUD + moderation only)

---

## Dokumenty zależne

- ← [05] Module Dependency Graph (zależności modułów)
- ← [13] Business Unit Architecture (BU per produkt)
- → [15] System Architecture v1.0 (techniczny blueprint)
- → [17] Shared Services Blueprint (szczegóły shared capabilities)
- → [33] HHU MVP Scope v1 (scope HHU features)
- → [41] AI Studio Creator Product Spec (scope AI Studio features)
