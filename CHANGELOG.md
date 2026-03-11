# Changelog

Wszystkie znaczące zmiany w projekcie META-GENIUSZ OS są dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/).
Wersjonowanie zgodne z [Semantic Versioning](https://semver.org/).

---

## [0.2.0-alpha.4] — 2026-03-11

### Dodano — Dokumentacja Verticals & Growth (Fala 2B)

#### HHU (docs/hhu/)
- `docs/hhu/31-hhu-product-thesis.md` — teza produktowa HHU: segment, positioning, value proposition
- `docs/hhu/32-hhu-personas-jtbd.md` — 7 person (P1-P7), jobs-to-be-done, segmentacja
- `docs/hhu/33-hhu-mvp-scope.md` — zakres MVP: 30 features (F01-F30), 30-40 dni, release criteria
- `docs/hhu/34-hhu-growth-loop-architecture.md` — 3 pętle wzrostu: Content, Creator, Monetization
- `docs/hhu/35-hhu-creator-onboarding-spec.md` — 3 ścieżki onboardingu: Quick, Guided, AI-Assisted
- `docs/hhu/36-artist-partnership-program.md` — 3 tiery: Ambasador/Early Adopter/Open, plan aktywacji
- `docs/hhu/37-brand-label-partnership-model.md` — partnerstwa B2B: sponsor packages, label dashboards, merch flow
- `docs/hhu/38-community-mechanics-spec.md` — algorytm feedu, typy treści, interakcje, gamifikacja
- `docs/hhu/39-hhu-monetization-stack.md` — 5 warstw przychodu, 4 scenariusze (soft/medium/aggressive/balanced)
- `docs/hhu/40-hhu-go-to-market-poland.md` — strategia GTM Polska: 3 fazy, zero-spend rule, 50 Creators target

#### AI Studio (docs/ai-studio/)
- `docs/ai-studio/41-ai-studio-creator-product-spec.md` — 15 narzędzi AI (AI-01 do AI-15), 3 tiery wdrożenia
- `docs/ai-studio/42-workflow-library-blueprint.md` — 10 workflow'ów (W01-W10), 2 MVP, system szablonów
- `docs/ai-studio/43-ai-credits-economics-model.md` — model kredytów AI, pricing, anti-abuse, 4 scenariusze
- `docs/ai-studio/44-ai-studio-integration-map.md` — 10 punktów integracji, 5 MVP, shared widget components

#### RFG (docs/rfg/)
- `docs/rfg/45-rfg-strategic-positioning.md` — pozycjonowanie RFG: portfolio + discovery, zero NSFW, fashion-magazine aesthetic
- `docs/rfg/46-rfg-safety-verification-model.md` — 10 ryzyk RFG-specific, weryfikacja L0-L3, Safe Contact Flow
- `docs/rfg/47-rfg-premium-partnership-model.md` — RFG Pro, Brand Connect, Casting, 4 scenariusze

#### Cross-cutting (docs/monetization/, docs/safety/, docs/business/)
- `docs/monetization/48-monetization-engine-master-spec.md` — centralny billing/payout: subscriptions, credits, commissions, 4 scenariusze skonsolidowane
- `docs/safety/49-trust-safety-anti-fraud-core.md` — abuse taxonomy, risk scoring, enforcement ladder, evidence vault, legal escalation
- `docs/business/50-investor-narrative-funding-roadmap.md` — narracja inwestorska, milestones, use of funds, 3 etapy fundraisingu

---

## [0.2.0-alpha.3] — 2026-03-11

### Dodano — Dokumentacja Compliance & Safety Core (Fala 2A)
- `docs/legal/21-legal-backbone-overview.md` — minimalny legal stack do startu platformy
- `docs/legal/22-gdpr-data-processing-map.md` — mapa danych osobowych, cele, podstawy prawne, procesory
- `docs/legal/23-dsa-readiness-pack.md` — procedury DSA: notice-and-action, reason statements, appeals
- `docs/legal/24-ai-compliance-relevance-map.md` — mapowanie AI use cases na AI Act, transparentność
- `docs/safety/25-evidence-audit-trail-framework.md` — obiekty audytu, evidence flows, legal hold
- `docs/legal/26-retention-deletion-policy.md` — polityka retencji i usuwania danych per obiekt
- `docs/safety/27-content-policy-architecture.md` — zasady treści per vertical, enforcement classes, strike system
- `docs/safety/28-verification-feasibility-framework.md` — ocena L0-L3, triggery, friction, koszty
- `docs/safety/29-incident-response-framework.md` — klasy incydentów, eskalacja, playbooki, post-mortem
- `docs/legal/30-compliance-decision-matrix.md` — macierz: founder/ops/legal/mixed decision routing

---

## [0.2.0-alpha.2] — 2026-03-11

### Dodano — Dokumentacja Architecture/Product Core (Fala 1B)
- `docs/business/11-category-definition-thesis.md` — definicja kategorii rynkowej: AI-Powered Creator OS
- `docs/business/12-master-strategic-thesis.md` — nadrzędna teza biznesowo-produktowa
- `docs/business/13-business-unit-architecture.md` — struktura BU: HHU, RFG, AI Studio + shared platform
- `docs/architecture/14-product-architecture-master.md` — mapa produktów, features, shared capabilities
- `docs/architecture/15-system-architecture-v1.md` — techniczny blueprint: warstwy L1-L4, service map, data flows
- `docs/architecture/16-monorepo-governance-guide.md` — zasady repo: commits, branches, ownership, releases
- `docs/architecture/17-shared-services-blueprint.md` — blueprint shared services: Tier 1-4, rollout order
- `docs/architecture/18-identity-roles-architecture.md` — model tożsamości: role, permissions, verification levels
- `docs/architecture/19-master-domain-model.md` — centralny model danych: encje core, modułowe, przyszłe
- `docs/product/20-admin-backoffice-master-spec.md` — spec admin panelu: user mgmt, moderation, analytics

### Poprawiono — Bramka G1 consistency fixes
- `docs/governance/06-master-risk-register.md` — dodano sekcję TERAZ/PÓŹNIEJ/ODRZUCIĆ (priorytetyzacja mitygacji)
- `docs/governance/07-documentation-governance-protocol.md` — doprecyzowanie klasyfikacji OBOWIĄZKOWE=TERAZ
- `docs/governance/01-master-project-corpus-audit.md` — dodano L9 (hardcoded localhost:4000)
- `README.md` — zaktualizowano sekcję dokumentacji o governance + operations

---

## [0.2.0-alpha.1] — 2026-03-11

### Dodano — Dokumentacja Governance Core (Fala 1A)
- `docs/governance/01-master-project-corpus-audit.md` — pełna mapa źródeł i klasyfikacja materiałów
- `docs/governance/02-strategic-decision-register.md` — rejestr decyzji strategicznych (zatwierdzone / do rewizji / odrzucone)
- `docs/governance/03-canonical-terminology-dictionary.md` — oficjalny słownik pojęć ekosystemu
- `docs/governance/04-scope-boundaries-and-exclusions.md` — granice zakresu: TERAZ / PÓŹNIEJ / NIE ROBIMY
- `docs/governance/05-module-dependency-graph.md` — mapa zależności modułów z kolejnością rollout
- `docs/governance/06-master-risk-register.md` — centralny rejestr ryzyk (krytyczne / wysokie / średnie / niskie)
- `docs/governance/07-documentation-governance-protocol.md` — zasady numeracji, statusów, review i archiwizacji docs
- `docs/governance/08-documentation-roadmap-master.md` — harmonogram 50 dokumentów w 4 falach z bramkami G1-G3
- `docs/operations/09-founder-operating-model.md` — model operacyjny Founder: decyzje, rytm, delegacja, ochrona focusu
- `docs/operations/10-90-day-execution-alignment-map.md` — 12-tygodniowy plan wykonawczy z milestone'ami M1-M6

---

## [0.1.1] — 2026-03-11

### Dodano
- uzupełniono dokumenty misji, architektury, MVP i roadmapy
- dodano pełny raport analizy repozytorium
- dodano raport braków wraz z rozliczeniem pustych plików
- uzupełniono README dla API oraz pustych pakietów workspace

### Zmieniono
- zastąpiono boilerplate w modułach AI Studio i Rocket Fuell Girls treścią zgodną z domeną produktu

### Naprawiono
- usunięto niespójności w API Express, w tym duplikację trasy profilu użytkownika
- poprawiono przepływ tworzenia demo usera w module HHU

---

## [0.1.0] — 2026-03-09

### Dodano
- Monorepo Turborepo z pnpm workspaces
- **`apps/web`** — centralny hub platformy META-GENIUSZ OS z dashboardem 4 modułów
  - Dark theme, gradienty pink/fuchsia/cyan, glassmorphic UI
  - Strony placeholder: `/hhu`, `/rfg`, `/ai-studio`, `/admin`
- **`apps/hhu`** — Hip Hop Universe
  - Feed postów z możliwością tworzenia (Client Component)
  - Dynamiczne profile użytkowników `/profile/[username]` (Server Component, SSR)
  - Integracja z backendem API
- **`apps/rfg`** — Rocket Fuell Girls (scaffold)
- **`apps/ai-studio`** — AI Studio (scaffold)
- **`apps/admin`** — Admin Control (scaffold)
- **`apps/api`** — Backend API (Express.js 4 + TypeScript)
  - Endpointy: `GET /`, `GET /health`, `POST /users`, `GET /users`, `GET /users/:username`
  - Endpointy: `POST /posts`, `GET /posts`, `POST /demo-user`, `GET /seed-demo-user`
  - CORS, JSON body parser, obsługa błędów
- **`apps/api/prisma`** — Baza danych SQLite z Prisma ORM
  - Modele: `User` (id, username, bio, createdAt, posts)
  - Modele: `Post` (id, content, image, createdAt, authorId, author)
  - Migracja inicjalna `20260309004601_init`
- Pakiety współdzielone (stubs): `@meta-geniusz/ui`, `@meta-geniusz/ai-core`, `@meta-geniusz/database`, `@meta-geniusz/agents`
- Konfiguracja TypeScript (strict mode) dla wszystkich aplikacji
- ESLint 9 z Next.js plugin
- Tailwind CSS 4 z PostCSS
- Turbo pipeline: `dev`, `build`, `lint`, `test`, `typecheck`

### Konfiguracja techniczna
- Next.js 16.1.6 + React 19.2.3
- Express.js 4.21.2 + Prisma 6.x
- TypeScript 5.x, pnpm 10.0.0, Turborepo 2.5.0
- SQLite (dev), port API: 4000

---

## [Unreleased]

### Planowane (v0.2.0)
- Naprawa zduplikowanego `GET /users/:username` route w API
- Zmienne środowiskowe dla URL API
- System uwierzytelniania (NextAuth.js lub JWT)
- GitHub Actions CI pipeline
- Testy jednostkowe dla API (Vitest)
