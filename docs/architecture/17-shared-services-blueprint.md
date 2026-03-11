# [17] Shared Services Blueprint

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Definicja usług wspólnych (shared services) dla całego ekosystemu META-GENIUSZ OS: auth, billing, notifications, moderation, search, analytics, storage, AI gateway i admin. Dokument ustala, które usługi są współdzielone między verticalami (HHU, RFG, AI Studio), jakie mają interfejsy, zależności i kolejność wdrożenia.

---

## Stan obecny

Repo zawiera 12 pakietów w `packages/` — wszystkie puste stuby. Zero shared services jest zaimplementowane. Każda app (hhu, rfg, ai-studio) nie dzieli żadnego kodu. Istnieje ryzyko duplikacji kodu między apps, jeśli shared services nie zostaną zbudowane przed rozwojem verticalów.

---

## Shared services map

```
┌─────────────────────────────────────────────────────────────────┐
│                  SHARED SERVICES ECOSYSTEM                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TIER 1: FOUNDATION (blokujące MVP)                         │ │
│  │  ┌──────┐  ┌────────┐  ┌───────┐  ┌───────┐               │ │
│  │  │ Auth │  │Database│  │Config │  │ Types │               │ │
│  │  └──────┘  └────────┘  └───────┘  └───────┘               │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TIER 2: ENABLERS (potrzebne do pełnego MVP)               │ │
│  │  ┌─────────┐  ┌──────────┐  ┌──────┐  ┌─────────┐        │ │
│  │  │ Storage │  │   UI     │  │Utils │  │Analytics│        │ │
│  │  └─────────┘  └──────────┘  └──────┘  └─────────┘        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TIER 3: GROWTH SERVICES (po MVP)                           │ │
│  │  ┌─────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐  │ │
│  │  │AI Core  │  │Payments  │  │Notification│  │Moderation│  │ │
│  │  │(LOGOS)  │  │(Stripe)  │  │  Service   │  │  Queue   │  │ │
│  │  └─────────┘  └──────────┘  └────────────┘  └──────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TIER 4: SCALE SERVICES (v1.0+)                             │ │
│  │  ┌──────────┐  ┌─────────────────┐  ┌──────┐  ┌─────────┐ │ │
│  │  │  Search  │  │ Recommendation  │  │ SDK  │  │ Agents  │ │ │
│  │  │ Service  │  │    Engine       │  │      │  │         │ │ │
│  │  └──────────┘  └─────────────────┘  └──────┘  └─────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Szczegóły usług

### TIER 1: Foundation

#### `packages/auth` — Authentication & Authorization
| Atrybut | Wartość |
|---------|---------|
| Cel | JWT token auth, session management, role middleware |
| Konsumenci | Wszystkie apps + API |
| Interfejs | `signUp()`, `signIn()`, `signOut()`, `verifyToken()`, `requireRole()` |
| Provider | Custom (bcrypt + jsonwebtoken) lub better-auth |
| Zależności | `packages/config`, `packages/types`, `packages/database` |
| Priorytet | P0 — blokujący |
| Wersja | v0.2 |

#### `packages/database` — Database Client & Helpers
| Atrybut | Wartość |
|---------|---------|
| Cel | Re-export Prisma client; DB helpers; connection pooling |
| Konsumenci | `apps/api`, pośrednio wszystkie przez API |
| Interfejs | `prisma` (client), `withTransaction()`, `paginate()` |
| Provider | Prisma 6 + PostgreSQL |
| Zależności | `packages/types` |
| Priorytet | P0 — blokujący |
| Wersja | v0.2 |

#### `packages/config` — Configuration & Environment
| Atrybut | Wartość |
|---------|---------|
| Cel | Centralne zarządzanie env variables; feature flags |
| Konsumenci | Wszystkie apps + packages |
| Interfejs | `env.API_URL`, `env.DATABASE_URL`, `env.PORT`, `isFeatureEnabled()` |
| Provider | dotenv + zod validation |
| Zależności | Brak |
| Priorytet | P0 — blokujący (fix hardcoded localhost) |
| Wersja | v0.2 |

#### `packages/types` — Shared TypeScript Types
| Atrybut | Wartość |
|---------|---------|
| Cel | Współdzielone interfejsy, typy, enumy |
| Konsumenci | Wszystkie apps + packages |
| Interfejs | `User`, `Post`, `APIResponse<T>`, `Role`, `Permission` |
| Provider | TypeScript declarations |
| Zależności | Brak |
| Priorytet | P0 — blokujący |
| Wersja | v0.2 |

---

### TIER 2: Enablers

#### `packages/ui` — Component Library
| Atrybut | Wartość |
|---------|---------|
| Cel | Shared React components + design tokens |
| Konsumenci | Wszystkie frontend apps |
| Interfejs | `<Button>`, `<Avatar>`, `<PostCard>`, `<Modal>`, design tokens |
| Provider | React 19 + Tailwind CSS 4 |
| Zależności | `packages/types` |
| Priorytet | P1 |
| Wersja | v0.3 |

#### `packages/storage` — File Upload Abstraction
| Atrybut | Wartość |
|---------|---------|
| Cel | Upload, download, delete plików (avatar, portfolio, media) |
| Konsumenci | `apps/api` → HHU (avatar), RFG (portfolio), AI Studio (output) |
| Interfejs | `upload()`, `download()`, `delete()`, `getSignedUrl()` |
| Provider | Cloudflare R2 (S3-compatible) |
| Zależności | `packages/config` |
| Priorytet | P1 |
| Wersja | v0.3 |

#### `packages/utils` — Common Utilities
| Atrybut | Wartość |
|---------|---------|
| Cel | Helpery: formatowanie, walidacja, slug generation |
| Konsumenci | Wszystkie |
| Interfejs | `slugify()`, `formatDate()`, `truncate()`, `validateEmail()` |
| Zależności | Brak |
| Priorytet | P1 |
| Wersja | v0.2 |

#### `packages/analytics` — Event Tracking
| Atrybut | Wartość |
|---------|---------|
| Cel | Track user events (pageview, action, conversion) |
| Konsumenci | Wszystkie frontend apps + API |
| Interfejs | `track()`, `identify()`, `page()` |
| Provider | Custom event store → later Mixpanel/PostHog |
| Zależności | `packages/config`, `packages/types` |
| Priorytet | P2 |
| Wersja | v0.5 |

---

### TIER 3: Growth Services

#### `packages/ai-core` — AI Gateway (LOGOS)
| Atrybut | Wartość |
|---------|---------|
| Cel | Orchestration wywołań AI: selekcja modelu, prompt management, caching |
| Konsumenci | `apps/api` (via /ai/* routes), AI Studio, HHU (bio generator) |
| Interfejs | `generate()`, `analyze()`, `recommend()` |
| Provider | OpenAI API (primary) + Anthropic (fallback) |
| Zależności | `packages/config`, `packages/types` |
| Priorytet | P1 |
| Wersja | v0.5 |

#### `packages/payments` — Billing & Payments
| Atrybut | Wartość |
|---------|---------|
| Cel | Stripe integration: subscriptions, one-time, payouts |
| Konsumenci | `apps/api` (via /billing/* routes) |
| Interfejs | `createSubscription()`, `processPayment()`, `createPayout()` |
| Provider | Stripe |
| Zależności | `packages/config`, `packages/types`, `packages/database` |
| Priorytet | P2 |
| Wersja | v0.5 |

#### `services/notification-service` — Notifications
| Atrybut | Wartość |
|---------|---------|
| Cel | Email + push notifications |
| Konsumenci | API (event-driven) |
| Interfejs | `sendEmail()`, `sendPush()`, `sendInApp()` |
| Provider | Resend (email), Web Push API |
| Priorytet | P2 |
| Wersja | v0.5 |

#### `services/moderation-service` — Content Moderation
| Atrybut | Wartość |
|---------|---------|
| Cel | Moderation queue, auto-detection, human review |
| Konsumenci | `apps/admin`, API |
| Interfejs | `reportContent()`, `reviewReport()`, `autoModerate()` |
| Priorytet | P2 |
| Wersja | v0.5 |

---

### TIER 4: Scale Services

#### `services/search-service` — Full-text Search
| Atrybut | Wartość |
|---------|---------|
| Cel | Search users, posts, content across verticals |
| Provider | PostgreSQL full-text → later Meilisearch |
| Priorytet | P3 |
| Wersja | v1.0 |

#### `services/recommendation-engine` — AI Recommendations
| Atrybut | Wartość |
|---------|---------|
| Cel | Feed ranking, creator recommendations, content discovery |
| Priorytet | P3 |
| Wersja | v1.5 |

#### `packages/sdk` — External SDK
| Atrybut | Wartość |
|---------|---------|
| Cel | SDK dla partnerów / external integrations |
| Priorytet | P3 |
| Wersja | v2.0 |

#### `packages/agents` — AI Agents Framework
| Atrybut | Wartość |
|---------|---------|
| Cel | Reusable AI agent patterns |
| Priorytet | P3 |
| Wersja | v1.5 |

---

## Rollout order (kolejność wdrożenia)

```
Sprint 1 (v0.2):  config → types → database → auth → utils
Sprint 2 (v0.3):  ui → storage
Sprint 3 (v0.5):  ai-core → payments → analytics
Sprint 4 (v0.5):  notification-service → moderation-service
Sprint 5 (v1.0):  search-service
Sprint 6 (v1.5):  recommendation-engine → agents
Sprint 7 (v2.0):  sdk
```

---

## Klasyfikacja (SHARED NOW / SHARED LATER / NIE SHARED)

### SHARED NOW (= TERAZ — v0.2–v0.3)
- `packages/config` — krytyczne; naprawia hardcoded URLs
- `packages/types` — fundament typowania
- `packages/database` — Prisma client re-export
- `packages/auth` — blokuje wszystkie user features
- `packages/utils` — basic helpers

### SHARED LATER (= PÓŹNIEJ — v0.5+)
- `packages/ui` — design system (v0.3)
- `packages/storage` — file uploads (v0.3)
- `packages/ai-core` — AI orchestration (v0.5)
- `packages/payments` — Stripe (v0.5)
- `packages/analytics` — event tracking (v0.5)
- `services/*` — all microservices (v0.5–v1.5)

### NIE SHARED (oddzielne per vertical)
- Vertical-specific UI (HHU feed layout ≠ RFG portfolio layout)
- Vertical-specific business logic (beats ≠ castingi)
- Vertical-specific content policy rules (hip-hop vs fashion)

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Shared packages nigdy nie zostaną wypełnione → każda app implementuje od zera | WYSOKIE | WYSOKI | Config + types + auth w v0.2 jako mandatory deliverable |
| R2 | Over-engineering shared packages → zbyt złożone abstraction | ŚREDNIE | ŚREDNI | Start simple; refactor only when 2+ consumers need it |
| R3 | API Gateway bottleneck — wszystko przez jeden Express | NISKIE | WYSOKI | Monitor; extract to services gdy load wymaga |

---

## Founder Decision Notes

- [ ] **FDN-44**: Zatwierdzić rollout order: config → types → database → auth → utils jako Sprint 1
- [ ] **FDN-45**: Zatwierdzić Cloudflare R2 jako storage provider
- [ ] **FDN-46**: Zatwierdzić Resend jako email provider

---

## Dokumenty zależne

- ← [05] Module Dependency Graph (zależności modułów)
- ← [15] System Architecture v1.0 (warstwy systemu)
- → [18] Identity & Roles Architecture (auth details)
- → [19] Master Domain Model (DB schema per service)
- → [20] Admin & Backoffice Master Spec (admin korzysta ze shared services)
