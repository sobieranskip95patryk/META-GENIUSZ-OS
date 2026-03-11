# [15] System Architecture v1.0

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Praktyczny techniczny blueprint systemu META-GENIUSZ OS obejmujący: apps, API, shared packages, auth, admin, storage, analytics, AI gateway, billing i moderation. Dokument opisuje architekturę v1 — realistyczną i osiągalną, nie docelowy nieosiągalny ideał. Rozdziela to, co budujemy teraz (v0.2–v0.4), od tego, co dojdzie później.

---

## Stan obecny

Istniejąca architektura (opisana w [system-overview.md]):
- **5 frontend apps** (Next.js 16 + React 19 + Tailwind CSS 4): web, hhu, rfg, ai-studio, admin
- **1 backend API** (Express.js 4 + Prisma 6): port 4000
- **1 baza danych** (SQLite): 2 modele (User, Post)
- **12 shared packages** (puste stuby)
- **5 services** (puste foldery)
- **Brak**: auth, storage, billing, notifications, moderation, search, analytics, AI gateway

---

## Architecture Overview

### Warstwy systemu (v1.0 target)

```
┌──────────────────────────────────────────────────────────────────┐
│ L1: PRESENTATION LAYER                                            │
│                                                                    │
│  ┌────────┐ ┌─────┐ ┌─────┐ ┌──────────┐ ┌───────┐              │
│  │  Web   │ │ HHU │ │ RFG │ │AI Studio │ │ Admin │              │
│  │  Hub   │ │     │ │     │ │          │ │       │              │
│  │Next.js │ │Next │ │Next │ │  Next    │ │ Next  │              │
│  └───┬────┘ └──┬──┘ └──┬──┘ └────┬─────┘ └───┬───┘              │
│      │         │       │         │            │                   │
│  ────┴─────────┴───────┴─────────┴────────────┴──── RSC / fetch  │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTPS / JSON
┌──────────────────────────────▼───────────────────────────────────┐
│ L2: API GATEWAY LAYER                                             │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │            apps/api — Express.js 4 + Prisma 6               │  │
│  │                                                               │  │
│  │  Routes:                                                      │  │
│  │  /auth/*     → packages/auth middleware                       │  │
│  │  /users/*    → User CRUD + profiles                           │  │
│  │  /posts/*    → Post CRUD + feed + interactions                │  │
│  │  /uploads/*  → File upload proxy → packages/storage           │  │
│  │  /ai/*       → AI calls proxy → packages/ai-core             │  │
│  │  /admin/*    → Admin-only endpoints (role-gated)              │  │
│  │  /billing/*  → Subscription + payment endpoints               │  │
│  │  /health     → Healthcheck                                    │  │
│  └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│ L3: SHARED SERVICES LAYER                                         │
│                                                                    │
│  ┌────────┐ ┌────────┐ ┌─────────┐ ┌────────┐ ┌──────────┐     │
│  │  Auth  │ │Storage │ │AI Core  │ │Billing │ │Analytics │     │
│  │(JWT +  │ │(S3/R2) │ │(LOGOS)  │ │(Stripe)│ │(events)  │     │
│  │session)│ │        │ │         │ │        │ │          │     │
│  └────────┘ └────────┘ └─────────┘ └────────┘ └──────────┘     │
│  ┌──────────────┐ ┌────────────┐ ┌───────────────────────┐      │
│  │ Notification │ │  Search    │ │    Moderation Queue   │      │
│  │  (email/push)│ │(full-text) │ │   (reports + review)  │      │
│  └──────────────┘ └────────────┘ └───────────────────────┘      │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│ L4: DATA LAYER                                                    │
│                                                                    │
│  ┌─────────────────────────────────────────────┐                  │
│  │  Primary DB: PostgreSQL (via Prisma ORM)    │                  │
│  │  Dev DB: SQLite (local development)          │                  │
│  └─────────────────────────────────────────────┘                  │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────────┐          │
│  │ File Storage │  │  Cache    │  │  Event Store     │          │
│  │ (S3/R2/local)│  │ (Redis)   │  │  (audit log DB)  │          │
│  └──────────────┘  └───────────┘  └──────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Service Map

### Mapowanie pakietów do warstw

| Pakiet/Serwis | Warstwa | Odpowiedzialność | Status | Wersja |
|---------------|---------|------------------|--------|--------|
| `apps/web` | L1 | Hub landing + routing do verticalów | ✅ Scaffold | v0.1 |
| `apps/hhu` | L1 | HHU frontend (feed, profiles, social) | ✅ Podstawowe | v0.1 |
| `apps/rfg` | L1 | RFG frontend (portfolio, galeria) | ⏳ Scaffold | v1.0 |
| `apps/ai-studio` | L1 | AI tools UI | ⏳ Scaffold | v0.5 |
| `apps/admin` | L1 | Admin panel UI | ⏳ Scaffold | v0.3 |
| `apps/api` | L2 | REST API gateway | ✅ Podstawowe | v0.1 |
| `packages/auth` | L3 | JWT + sessions + middleware | ⏳ Stub | v0.2 |
| `packages/storage` | L3 | File upload abstraction | ⏳ Stub | v0.3 |
| `packages/ai-core` | L3 | AI model orchestration (LOGOS) | ⏳ Stub | v0.5 |
| `packages/payments` | L3 | Stripe integration | ⏳ Stub | v0.5 |
| `packages/analytics` | L3 | Event tracking | ⏳ Stub | v0.5 |
| `packages/database` | L4 | Prisma client + helpers | ⏳ Stub | v0.2 |
| `packages/config` | L2-L4 | Env variables + feature flags | ⏳ Stub | v0.2 |
| `packages/types` | All | Shared TypeScript types | ⏳ Stub | v0.2 |
| `packages/ui` | L1 | Shared React components | ⏳ Stub | v0.3 |
| `packages/utils` | All | Common utility functions | ⏳ Stub | v0.2 |
| `services/media-service` | L3 | Image/video processing | ⏳ Empty | v1.0 |
| `services/search-service` | L3 | Full-text search | ⏳ Empty | v1.0 |
| `services/notification-service` | L3 | Email + push | ⏳ Empty | v0.5 |
| `services/moderation-service` | L3 | Auto-moderation pipeline | ⏳ Empty | v1.0 |
| `services/recommendation-engine` | L3 | AI-powered feed ranking | ⏳ Empty | v1.5 |

---

## Integration Points

### Frontend → API

```
Protocol: HTTPS (REST JSON)
Auth:     Bearer JWT token in Authorization header
Base URL: ENV variable API_URL (currently hardcoded localhost:4000 ⚠️)
Format:   JSON request/response
Errors:   { error: string, code: number }
```

### API → External Services

| Service | Protocol | Provider | Faza |
|---------|----------|----------|------|
| DB | TCP/Prisma | PostgreSQL (Railway/Supabase) | v0.2 |
| File Storage | S3 API | Cloudflare R2 / AWS S3 | v0.3 |
| AI Models | HTTPS | OpenAI / Anthropic (switchable) | v0.5 |
| Payments | HTTPS | Stripe API | v0.5 |
| Email | SMTP/API | Resend / SendGrid | v0.5 |
| Cache | TCP | Redis (Upstash) | v0.5 |

---

## Data Flow — kluczowe przepływy

### Auth Flow (v0.2)
```
1. User → POST /auth/register { email, password, username }
2. API → hash password (bcrypt) → Prisma create User
3. API → sign JWT { userId, role } → set httpOnly cookie
4. Frontend → store token → attach to all API calls
5. API middleware → verify JWT on protected routes
```

### Post Creation (enhanced v0.2)
```
1. User → POST /posts { content, image? }
2. Auth middleware → verify JWT → extract userId
3. If image → upload to Storage → get URL
4. Prisma → create Post { content, imageUrl, authorId }
5. Analytics → emit event "post_created"
6. Return post with author relation
```

### AI Generation (v0.5)
```
1. User → POST /ai/generate { type: "bio", context: {...} }
2. Auth middleware → verify JWT
3. Billing → check AI credits balance
4. AI Core → select model → call provider API
5. AI Core → return generated content
6. Billing → deduct credits
7. Analytics → emit event "ai_generation"
```

---

## Deployment Assumptions

### v0.2 (MVP)
| Komponent | Provider | Tier |
|-----------|----------|------|
| Frontend apps | Vercel | Free/Pro |
| API | Railway | Starter ($5/mo) |
| Database | Railway PostgreSQL | Starter |
| Domain | Custom (meta-geniusz.com) | ~$12/yr |

### v0.5+ (Growth)
| Komponent | Provider | Tier |
|-----------|----------|------|
| Frontend apps | Vercel | Pro |
| API | Railway | Pro |
| Database | Supabase / Railway PG | Pro |
| File Storage | Cloudflare R2 | Pay-as-you-go |
| Cache | Upstash Redis | Free → Pro |
| AI | OpenAI API | Pay-as-you-go |
| Payments | Stripe | Standard (2.9% + 30¢) |
| Email | Resend | Free → Pro |

---

## Klasyfikacja (V1 REALNE / PÓŹNIEJ / NIEPOTRZEBNE TERAZ)

### V1 REALNE (= TERAZ — v0.2–v0.4)
- Auth (JWT + bcrypt + httpOnly cookies)
- Config (env variables, API_URL fix)
- Types (shared interfaces)
- Database (Prisma helpers, PostgreSQL migration)
- API (expanded routes: auth, users, posts, interactions)
- HHU (auth-gated features, likes, comments, follow)
- CI/CD (GitHub Actions: lint, typecheck, build)
- Deployment (Vercel + Railway)

### PÓŹNIEJ (v0.5–v1.0)
- Storage (file uploads → Cloudflare R2)
- AI Core (model orchestration, credit tracking)
- Billing (Stripe integration, subscriptions)
- Notifications (email via Resend, later push)
- Analytics (event tracking, basic dashboards)
- Admin Panel (moderation queue, user management)
- UI Library (shared components, design system)
- RFG (portfolio, galeria, safety)
- Search (full-text search, discovery)

### NIEPOTRZEBNE TERAZ
- Microservices (media, recommendation) — monolith first
- Redis cache — premature optimization
- GraphQL — REST wystarczy
- WebSocket / real-time — polling wystarczy dla MVP
- CDN (image optimization) — Vercel Image Optimization wystarczy
- Kubernetes / Docker orchestration — Railway manages containers

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Monolith API staje się bottleneck przy 10K+ users | NISKIE | WYSOKI | Design for extraction: service-aware route namespacing |
| R2 | Vendor lock-in (Vercel + Railway) | ŚREDNIE | ŚREDNI | Standardowe Docker containers; Prisma abstracts DB |
| R3 | Auth implementation has security flaws | ŚREDNIE | KRYTYCZNY | Użyć battle-tested library (better-auth / lucia); security review |
| R4 | Hardcoded localhost:4000 nie naprawione → broken deploys | 100% | WYSOKI | Immediate fix: packages/config + .env.example |

---

## Founder Decision Notes

- [ ] **FDN-37**: Zatwierdzić auth approach: JWT + bcrypt custom vs NextAuth vs better-auth
- [ ] **FDN-38**: Zatwierdzić deployment: Vercel (frontend) + Railway (API + DB)
- [ ] **FDN-39**: Zatwierdzić storage provider: Cloudflare R2 vs AWS S3
- [ ] **FDN-40**: Zatwierdzić AI provider: OpenAI vs Anthropic (primary + fallback)

---

## Dokumenty zależne

- ← [05] Module Dependency Graph (kolejność budowy modułów)
- ← [14] Product Architecture Master (produkty → usługi)
- → [16] Monorepo Governance Guide (zasady rozwoju repo)
- → [17] Shared Services Blueprint (szczegóły shared services)
- → [19] Master Domain Model (model danych per warstwa)
