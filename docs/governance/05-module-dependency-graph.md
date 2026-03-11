# [05] Module Dependency Graph

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Dokument mapuje zależności między wszystkimi modułami META-GENIUSZ OS — techniczne, biznesowe, danych i rolloutowe. Wskazuje wąskie gardła i ustala rekomendowaną kolejność budowy. Każdy moduł ma jawnie określone: co dostarcza, czego potrzebuje i co blokuje.

---

## Stan obecny

Repo zawiera 6 apps, 12 pakietów i 5 services. Większość pakietów i services to puste foldery. Faktyczne zależności istnieją tylko między `apps/hhu` ↔ `apps/api` (fetch REST). Brak formalnej mapy zależności prowadził do rozjechania priorytetów.

---

## Pełna mapa modułów

### Aplikacje (apps/)

| Moduł | Typ | Zależy od | Dostarcza | Status |
|-------|-----|-----------|-----------|--------|
| **apps/api** | Backend | `packages/database`, `packages/auth`, `packages/types`, `packages/config` | REST API, dane, auth tokens | ✅ 65% |
| **apps/web** | Frontend Hub | `apps/api` (API URL), `packages/ui` | Punkt wejścia, nawigacja do modułów | ✅ 50% |
| **apps/hhu** | Frontend Vertical | `apps/api` (users, posts, likes, comments, follows), `packages/ui`, `packages/types` | Feed społecznościowy, profile twórców | ✅ 60% |
| **apps/rfg** | Frontend Vertical | `apps/api` (users, portfolios, galleries), `packages/ui`, `packages/storage` | Portfolio, galerie, discovery | 🔧 5% |
| **apps/ai-studio** | Frontend Tool | `apps/api` (ai endpoints), `packages/ai-core`, `packages/ui` | Narzędzia AI dla twórców | 🔧 5% |
| **apps/admin** | Frontend Ops | `apps/api` (admin endpoints), `packages/ui`, `packages/types` | Zarządzanie platformą | 🔧 5% |

### Pakiety współdzielone (packages/)

| Pakiet | Zależy od | Dostarcza | Konsumenci | Status |
|--------|-----------|-----------|-----------|--------|
| **packages/auth** | `packages/types`, `packages/config` | JWT/session helpers, hash, verify | `apps/api` | ❌ Pusty |
| **packages/config** | — (standalone) | `getApiUrl()`, `getDbUrl()`, env helpers | Wszystkie apps i packages | ❌ Pusty |
| **packages/types** | — (standalone) | Interfejsy TS: User, Post, ApiResponse | Wszystkie apps i packages | ❌ Pusty |
| **packages/ui** | `packages/types` | React components: Button, Card, Input, Avatar | Wszystkie apps frontend | ⏳ Stub |
| **packages/database** | `packages/types`, `packages/config` | Prisma client singleton, query helpers | `apps/api` | ⏳ Stub |
| **packages/ai-core** | `packages/types`, `packages/config` | AI provider wrappers, prompt templates | `apps/api`, `apps/ai-studio` | ⏳ Stub |
| **packages/agents** | `packages/ai-core`, `packages/types` | Autonomiczne agenty AI | `apps/api` (v2.0+) | ⏳ Stub |
| **packages/utils** | — (standalone) | Helpers: formatDate, slugify, validators | Wszystkie | ❌ Pusty |
| **packages/storage** | `packages/config` | File upload/download abstraction (S3/R2/local) | `apps/api`, `apps/rfg` | ❌ Pusty |
| **packages/payments** | `packages/types`, `packages/config` | Stripe wrappers, billing logic | `apps/api` (v1.5+) | ❌ Pusty |
| **packages/analytics** | `packages/types` | Event tracking, metrics | Wszystkie apps | ❌ Pusty |
| **packages/sdk** | `packages/types` | Public SDK dla integracji zewnętrznych | Zewnętrzni (v2.0+) | ❌ Pusty |

### Services (przyszłe mikroserwisy)

| Service | Zależy od | Dostarcza | Warunek startu | Status |
|---------|-----------|-----------|---------------|--------|
| **services/notification-service** | `apps/api`, `packages/types` | Push, email, in-app notifications | v1.5+ | ❌ Pusty |
| **services/moderation-service** | `apps/api`, `packages/ai-core` | Auto-moderation, queue, decisions | v1.5+ | ❌ Pusty |
| **services/search-service** | `apps/api`, `packages/database` | Full-text search, discovery | v1.5+ | ❌ Pusty |
| **services/media-service** | `packages/storage` | Image processing, CDN proxy | v1.5+ | ❌ Pusty |
| **services/recommendation-engine** | `packages/ai-core`, `packages/database` | Personalized feeds, trending | v2.0+ | ❌ Pusty |

---

## Zależności techniczne (graf)

```
                    ┌─────────────┐
                    │ packages/   │
                    │   config    │ ← standalone (root dependency)
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───────┐ ┌──▼──────────┐
       │ packages/   │ │packages/ │ │ packages/   │
       │   types     │ │   utils  │ │   storage   │
       └──────┬──────┘ └──────────┘ └──────┬──────┘
              │                            │
    ┌─────────┼──────────┬─────────────────┤
    │         │          │                 │
┌───▼────┐ ┌─▼────────┐ │          ┌──────▼──────┐
│packages│ │packages/  │ │          │ packages/   │
│  /auth │ │ database  │ │          │   ai-core   │
└───┬────┘ └─────┬─────┘ │          └──────┬──────┘
    │            │        │                 │
    └─────┬──────┘        │          ┌──────┘
          │               │          │
    ┌─────▼───────────────▼──────────▼─────┐
    │              apps/api                 │
    │         (Express + Prisma)            │
    └──────────────────┬───────────────────┘
                       │ REST API
         ┌─────────────┼──────────────┐
         │             │              │
    ┌────▼────┐  ┌─────▼─────┐  ┌────▼────────┐
    │apps/hhu │  │ apps/rfg  │  │apps/ai-studio│
    └─────────┘  └───────────┘  └──────────────┘
         │             │              │
         └──────┬──────┘──────────────┘
                │
         ┌──────▼──────┐      ┌────────────┐
         │ packages/ui │      │ apps/admin │
         └─────────────┘      └────────────┘
                                    │
                         ┌──────────▼────────────┐
                         │     apps/web (hub)     │
                         └────────────────────────┘
```

---

## Zależności biznesowe

| Moduł A | Wymaga od Modułu B | Typ zależności |
|---------|-------------------|---------------|
| HHU | Auth | Bez logowania brak personalizacji |
| HHU | API (posts, likes, comments) | Core data flow |
| RFG | Auth + Storage | Upload portfolio wymaga oba |
| AI Studio | Auth + AI Core | Token access + AI provider |
| Admin | Auth (admin role) + API (admin endpoints) | Uprawnienia + dane |
| Monetyzacja | Auth + Payments + Admin | Billing wymaga trzech warstw |

## Zależności danych

| Encja | Produkowana przez | Konsumowana przez |
|-------|------------------|------------------|
| User | Auth / API | HHU, RFG, AI Studio, Admin |
| Post | HHU → API | HHU Feed, Admin moderation |
| Like | HHU → API | HHU Feed ranking, Analytics |
| Comment | HHU → API | HHU Feed, Admin moderation |
| Follow | HHU → API | HHU Feed algorithm, Profiles |
| Portfolio | RFG → API | RFG Gallery, Search |
| AI Generation | AI Studio → API | AI Studio history, Analytics |
| Transaction | Payments → API | Admin billing, Creator payout |

## Zależności rolloutowe (kolejność deploy)

```
1. packages/config ──────────────────────────────── (standalon, unblocks all)
2. packages/types ───────────────────────────────── (standalone, unblocks all)
3. packages/utils ───────────────────────────────── (standalone)
4. packages/auth ────────────────────────────────── (needs config + types)
5. packages/database ────────────────────────────── (needs config + types)
6. apps/api (auth middleware + expanded schema) ─── (needs auth + database)
7. packages/ui ──────────────────────────────────── (needs types)
8. apps/hhu (social features) ───────────────────── (needs api + ui)
9. packages/ai-core ─────────────────────────────── (needs config + types)
10. apps/ai-studio ──────────────────────────────── (needs api + ai-core + ui)
11. packages/storage ─────────────────────────────── (needs config)
12. apps/rfg ─────────────────────────────────────── (needs api + storage + ui)
13. apps/admin ──────────────────────────────────── (needs api + ui)
14. apps/web (integration hub) ──────────────────── (needs all above stable)
```

---

## Wąskie gardła

| # | Wąskie gardło | Wpływ | Mitygacja |
|---|---------------|-------|-----------|
| WG1 | **`packages/config` + `packages/types`** — all packages depend on them | Blokują cały development pakietów | Zaimplementować jako pierwsze (1-2 dni) |
| WG2 | **`packages/auth`** — blokuje API middleware, a to blokuje HHU/RFG/AI Studio | Bez auth = zero secured features | Druga rzecz do implementacji (2-3 dni) |
| WG3 | **`apps/api`** — jedyny backend; awaria = cały system stoi | Single point of failure | Testy + health check + error handling |
| WG4 | **Decyzje DO REWIZJI** (auth strategy, storage, AI provider) | Mogą opóźnić implementację | Deadline decyzji przed milestone |

---

## Rekomendowana kolejność budowy

| Faza | Co budujemy | Co odblokuje |
|------|------------|-------------|
| **F1** | `config`, `types`, `utils` | Wszystkie packages |
| **F2** | `auth`, `database` | API middleware, query helpers |
| **F3** | API auth + expanded schema | HHU/RFG/AI Studio secured endpoints |
| **F4** | `ui` components | Frontend consistency |
| **F5** | HHU social features | Walidacja MVP, user retention |
| **F6** | `ai-core` | AI Studio functionality |
| **F7** | AI Studio | Drugi filar platformy |
| **F8** | `storage` | File upload capability |
| **F9** | RFG | Trzeci vertical |
| **F10** | Admin Panel | Operacyjna kontrola |
| **F11** | `payments` + monetization | Revenue |
| **F12** | Services (notifications, moderation, search) | Scale |

---

## Ryzyka

| # | Ryzyko | Mitygacja |
|---|--------|-----------|
| R1 | Circular dependency między packages | Strict layering: config → types → auth/database → ai-core |
| R2 | API staje się monolitem-worem | Modularyzacja routes; przyszła ekstrakcja do services |
| R3 | UI package too coupled to HHU | Generyczne komponenty; module-specific w apps/ |

---

## Founder Decision Notes

- [ ] **FDN-11**: Zatwierdzić kolejność rollout F1-F12

---

## Dokumenty zależne

- ← [02] Strategic Decision Register (D-2026-0004: kolejność modułów)
- ← [04] Scope Boundaries (co jest TERAZ vs PÓŹNIEJ)
- → [06] Master Risk Register (ryzyka z wąskich gardeł)
- → [10] 90-Day Execution (harmonogram bazujący na dependency graph)
- → [15] System Architecture v1.0 (techniczna realizacja zależności)
