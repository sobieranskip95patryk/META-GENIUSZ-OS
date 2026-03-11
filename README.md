# META-GENIUSZ OS

> **AI-Powered Creator Operating System** — jedna platforma łącząca AI Core, creator economy, społeczność, kulturę, visual branding i moduły premium.

**Wersja**: 0.1.0 | **Status**: Alpha | **Stack**: Next.js 16 · React 19 · Express 4 · Prisma 6 · TypeScript 5 · Turborepo 2.5

---

## Czym jest META-GENIUSZ OS?

META-GENIUSZ OS to wielomodułowy system operacyjny dla twórców cyfrowych, łączący:

- **AI Core / LOGOS** — warstwa orkiestracji, routingu i inteligencji systemowej
- **Hip Hop Universe (HHU)** — społecznościowa platforma kultury, muzyki i twórców
- **Rocket Fuell Girls (RFG)** — visual talent vertical dla modelek, muses i kampanii premium
- **AI Studio** — narzędzia AI do generowania bio, captions i strategii wzrostu
- **Creator Economy** — subskrypcje, monetyzacja, profile premium i collaboracje
- **Admin Control** — panel operacyjny do zarządzania, moderacji i analityki

---

## Architektura monorepo

```
META-GENIUSZ-OS/
├── apps/
│   ├── web/          @meta-geniusz/web       ← Hub platformy (Next.js, :3000)
│   ├── hhu/          @meta-geniusz/hhu        ← Hip Hop Universe (Next.js)
│   ├── rfg/          @meta-geniusz/rfg        ← Rocket Fuell Girls (Next.js)
│   ├── ai-studio/    @meta-geniusz/ai-studio  ← AI Studio (Next.js)
│   ├── admin/        admin                    ← Admin Panel (Next.js)
│   └── api/          @meta-geniusz/api        ← Backend API (Express + Prisma, :4000)
├── packages/
│   ├── ui/           @meta-geniusz/ui         ← Komponenty UI
│   ├── ai-core/      @meta-geniusz/ai-core    ← AI orchestration / LOGOS
│   ├── database/     @meta-geniusz/database   ← Database helpers
│   └── agents/       @meta-geniusz/agents     ← AI agents framework
└── docs/
    ├── vision/mission.md
    ├── architecture/system-overview.md
    ├── product/mvp.md
    └── roadmap/roadmap.md
```

---

## Szybki start

### Wymagania

- **Node.js** 18+
- **pnpm** 10.0.0+

### Instalacja

```bash
git clone https://github.com/sobieranskip95patryk/META-GENIUSZ-OS.git
cd META-GENIUSZ-OS
pnpm install
```

### Uruchomienie

```bash
# Wszystkie aplikacje równolegle
pnpm dev

# Tylko wybrana aplikacja
pnpm dev:web       # → http://localhost:3000 (Hub)
pnpm dev:hhu       # → http://localhost:3000 (HHU)
pnpm dev:api       # → http://localhost:4000 (API)
```

### Baza danych (API)

```bash
cd apps/api
npx prisma migrate dev   # Uruchom migracje
npx prisma studio        # GUI do bazy danych
```

---

## Stack technologiczny

| Warstwa | Technologia | Wersja |
|---------|-------------|--------|
| Frontend | Next.js + React | 16.1.6 / 19.2.3 |
| Styling | Tailwind CSS | 4.x |
| Backend | Express.js | 4.21.2 |
| ORM | Prisma | 6.x |
| Database (dev) | SQLite | — |
| Language | TypeScript | 5.x |
| Monorepo | Turborepo | 2.5.0 |
| Package Manager | pnpm | 10.0.0 |

---

## API — endpointy (port 4000)

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| `GET` | `/` | System info |
| `GET` | `/health` | Health check |
| `POST` | `/users` | Utwórz użytkownika |
| `GET` | `/users` | Lista użytkowników |
| `GET` | `/users/:username` | Profil z postami |
| `POST` | `/posts` | Utwórz post |
| `GET` | `/posts` | Lista postów |
| `POST` | `/demo-user` | Demo user (idempotent) |
| `GET` | `/seed-demo-user` | Seed demo danych |

---

## Skrypty

```bash
pnpm dev          # Uruchom wszystko (Turborepo)
pnpm build        # Build wszystkich paczek
pnpm lint         # ESLint dla całego monorepo
pnpm typecheck    # TypeScript check
pnpm test         # Testy (konfiguracja do uzupełnienia)
```

---

## Stan implementacji

| Moduł | Status |
|-------|--------|
| Monorepo setup | ✅ Gotowy |
| Backend API (User/Post) | ✅ Funkcjonalny |
| Web Hub | ✅ Gotowy |
| HHU Feed + Profile | ✅ Gotowy |
| RFG | 🔧 Scaffold |
| AI Studio | 🔧 Scaffold |
| Admin Panel | 🔧 Scaffold |
| Shared packages | ⏳ Stubs |
| Auth / Payments | ❌ Nie zaimplementowane |
| CI/CD | ❌ Nie skonfigurowane |

---

## Dokumentacja

### Governance (docs/governance/)
- [`01 — Master Project Corpus Audit`](./docs/governance/01-master-project-corpus-audit.md)
- [`02 — Strategic Decision Register`](./docs/governance/02-strategic-decision-register.md)
- [`03 — Canonical Terminology Dictionary`](./docs/governance/03-canonical-terminology-dictionary.md)
- [`04 — Scope Boundaries & Exclusions`](./docs/governance/04-scope-boundaries-and-exclusions.md)
- [`05 — Module Dependency Graph`](./docs/governance/05-module-dependency-graph.md)
- [`06 — Master Risk Register`](./docs/governance/06-master-risk-register.md)
- [`07 — Documentation Governance Protocol`](./docs/governance/07-documentation-governance-protocol.md)
- [`08 — Documentation Roadmap Master`](./docs/governance/08-documentation-roadmap-master.md)

### Operations (docs/operations/)
- [`09 — Founder Operating Model`](./docs/operations/09-founder-operating-model.md)
- [`10 — 90-Day Execution Alignment Map`](./docs/operations/10-90-day-execution-alignment-map.md)

### Business (docs/business/)
- [`11 — Category Definition Thesis`](./docs/business/11-category-definition-thesis.md)
- [`12 — Master Strategic Thesis`](./docs/business/12-master-strategic-thesis.md)
- [`13 — Business Unit Architecture`](./docs/business/13-business-unit-architecture.md)
- [`50 — Investor Narrative & Funding Roadmap`](./docs/business/50-investor-narrative-funding-roadmap.md)

### Architecture & Product
- [`14 — Product Architecture Master`](./docs/architecture/14-product-architecture-master.md)
- [`15 — System Architecture v1.0`](./docs/architecture/15-system-architecture-v1.md)
- [`16 — Monorepo Governance Guide`](./docs/architecture/16-monorepo-governance-guide.md)
- [`17 — Shared Services Blueprint`](./docs/architecture/17-shared-services-blueprint.md)
- [`18 — Identity & Roles Architecture`](./docs/architecture/18-identity-roles-architecture.md)
- [`19 — Master Domain Model`](./docs/architecture/19-master-domain-model.md)
- [`20 — Admin & Backoffice Master Spec`](./docs/product/20-admin-backoffice-master-spec.md)

### Legal & Compliance (docs/legal/)
- [`21 — Legal Backbone Overview`](./docs/legal/21-legal-backbone-overview.md)
- [`22 — GDPR Data Processing Map`](./docs/legal/22-gdpr-data-processing-map.md)
- [`23 — DSA Readiness Pack`](./docs/legal/23-dsa-readiness-pack.md)
- [`24 — AI Compliance Relevance Map`](./docs/legal/24-ai-compliance-relevance-map.md)
- [`26 — Retention & Deletion Policy`](./docs/legal/26-retention-deletion-policy.md)
- [`30 — Compliance Decision Matrix`](./docs/legal/30-compliance-decision-matrix.md)

### Safety (docs/safety/)
- [`25 — Evidence & Audit Trail Framework`](./docs/safety/25-evidence-audit-trail-framework.md)
- [`27 — Content Policy Architecture`](./docs/safety/27-content-policy-architecture.md)
- [`28 — Verification Feasibility Framework`](./docs/safety/28-verification-feasibility-framework.md)
- [`29 — Incident Response Framework`](./docs/safety/29-incident-response-framework.md)
- [`49 — Trust & Safety / Anti-Fraud Core v1.0`](./docs/safety/49-trust-safety-anti-fraud-core.md)

### HHU — Hip Hop Universe (docs/hhu/)
- [`31 — HHU Product Thesis`](./docs/hhu/31-hhu-product-thesis.md)
- [`32 — HHU Personas & JTBD`](./docs/hhu/32-hhu-personas-jtbd.md)
- [`33 — HHU MVP Scope v1`](./docs/hhu/33-hhu-mvp-scope.md)
- [`34 — HHU Growth Loop Architecture`](./docs/hhu/34-hhu-growth-loop-architecture.md)
- [`35 — HHU Creator Onboarding Spec`](./docs/hhu/35-hhu-creator-onboarding-spec.md)
- [`36 — Artist Partnership Program`](./docs/hhu/36-artist-partnership-program.md)
- [`37 — Brand & Label Partnership Model`](./docs/hhu/37-brand-label-partnership-model.md)
- [`38 — Community Mechanics Spec`](./docs/hhu/38-community-mechanics-spec.md)
- [`39 — HHU Monetization Stack`](./docs/hhu/39-hhu-monetization-stack.md)
- [`40 — HHU Go-To-Market Poland`](./docs/hhu/40-hhu-go-to-market-poland.md)

### AI Studio (docs/ai-studio/)
- [`41 — AI Studio Creator Product Spec`](./docs/ai-studio/41-ai-studio-creator-product-spec.md)
- [`42 — Workflow Library Blueprint`](./docs/ai-studio/42-workflow-library-blueprint.md)
- [`43 — AI Credits Economics Model`](./docs/ai-studio/43-ai-credits-economics-model.md)
- [`44 — AI Studio Integration Map`](./docs/ai-studio/44-ai-studio-integration-map.md)

### RFG — Rocket Fuel Girls (docs/rfg/)
- [`45 — RFG Strategic Positioning`](./docs/rfg/45-rfg-strategic-positioning.md)
- [`46 — RFG Safety & Verification Model`](./docs/rfg/46-rfg-safety-verification-model.md)
- [`47 — RFG Premium & Partnership Model`](./docs/rfg/47-rfg-premium-partnership-model.md)

### Monetization (docs/monetization/)
- [`48 — Monetization Engine Master Spec`](./docs/monetization/48-monetization-engine-master-spec.md)

### Inne
- [`REPORT.md`](./REPORT.md) — Kompletny raport repozytorium (100%)
- [`docs/vision/mission.md`](./docs/vision/mission.md) — Misja i wizja
- [`docs/architecture/system-overview.md`](./docs/architecture/system-overview.md) — Architektura systemu
- [`docs/architecture/repository-analysis.md`](./docs/architecture/repository-analysis.md) — Uzupełniona analiza repozytorium
- [`docs/architecture/gap-report.md`](./docs/architecture/gap-report.md) — Raport braków i pustych plików
- [`docs/product/mvp.md`](./docs/product/mvp.md) — Specyfikacja MVP
- [`docs/roadmap/roadmap.md`](./docs/roadmap/roadmap.md) — Roadmap produktu
- [`CHANGELOG.md`](./CHANGELOG.md) — Historia zmian

---

## Wizja

META-GENIUSZ OS to master monorepo dla ekosystemu twórców cyfrowych — platforma łącząca AI, społeczność, monetyzację i infrastrukturę w jednym spójnym systemie operacyjnym gotowym na skalowanie.