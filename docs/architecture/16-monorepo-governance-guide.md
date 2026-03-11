# [16] Monorepo Governance Guide

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Zasady pracy w monorepo META-GENIUSZ OS: struktura folderów, ownership, branchowanie, release discipline, package boundaries i standardy zmian. Dokument tworzy przewidywalne reguły, dzięki którym repo nie stanie się chaosem przy wzroście codebase i zespołu.

---

## Stan obecny

Monorepo oparte o Turborepo 2.5 + pnpm 10. Obecna struktura jest poprawna, ale brakuje:
- Formnych reguł dodawania pakietów/apps
- Konwencji commitów
- Branch protection i CI gatekeeping
- Definicji ownership per folder

---

## Analiza obecnego repo

```
META-GENIUSZ-OS/
├── apps/          6 apps (web, hhu, rfg, ai-studio, admin, api)
├── packages/     12 packages (puste stuby)
├── services/      5 services (puste foldery)
├── docs/          docs with governance structure
├── infra/         puste foldery (docker, github, nginx, scripts, terraform)
├── tests/         puste foldery (e2e, integration, performance)
├── turbo.json     pipeline config
├── pnpm-workspace.yaml  workspace config
└── package.json   root scripts
```

### Problemy zidentyfikowane
1. 12 packages to empty stubs — brak `package.json` w wielu z nich
2. Services nie mają żadnej struktury
3. Brak `.env.example` ze zmiennymi
4. Brak Code Owners
5. Brak branch protection rules

---

## Proponowana struktura

### Hierarchia folderów (bez zmian — obecna jest dobra)

```
META-GENIUSZ-OS/
├── apps/              Deployowalne aplikacje (Next.js, Express)
│   ├── web/           Hub portal
│   ├── hhu/           Hip Hop Universe
│   ├── rfg/           Rocket Fuell Girls
│   ├── ai-studio/     AI Studio Creator
│   ├── admin/         Admin Panel
│   └── api/           Backend REST API
├── packages/          Współdzielone biblioteki (importowane przez apps)
│   ├── auth/          Auth logic (JWT, sessions, middleware)
│   ├── ai-core/       AI orchestration (LOGOS)
│   ├── analytics/     Event tracking
│   ├── config/        Env variables, feature flags
│   ├── database/      Prisma client helpers
│   ├── payments/      Stripe integration
│   ├── sdk/           External SDK
│   ├── storage/       File upload abstraction
│   ├── types/         Shared TypeScript interfaces
│   ├── ui/            React component library
│   └── utils/         Common helpers
├── services/          Mikroserwisy (budowane gdy monolith nie wystarczy)
├── docs/              Dokumentacja strategiczna i techniczna
├── infra/             Konfiguracja infrastruktury
└── tests/             Testy E2E i integracyjne (cross-app)
```

### Konwencja nazewnictwa

| Element | Konwencja | Przykład |
|---------|-----------|---------|
| Foldery apps | kebab-case | `ai-studio` |
| Foldery packages | kebab-case | `ai-core` |
| Package name (npm) | `@meta-geniusz/<name>` | `@meta-geniusz/auth` |
| Pliki TypeScript | camelCase | `userService.ts` |
| Pliki React | PascalCase | `PostCard.tsx` |
| Pliki CSS | kebab-case | `globals.css` |
| Foldery docs | kebab-case | `governance/` |
| Pliki docs | `[NN]-kebab-case.md` | `01-master-project-corpus-audit.md` |
| Env variables | SCREAMING_SNAKE | `DATABASE_URL` |

---

## Workflow zmian

### Branch strategy: trunk-based development

```
main (protected)
  ├── feat/AREA-short-description     (feature branches)
  ├── fix/AREA-short-description      (bug fixes)
  ├── docs/short-description          (documentation only)
  └── chore/short-description         (tooling, config, deps)
```

| Prefix | Opis | Przykład |
|--------|------|---------|
| `feat/` | Nowa feature | `feat/hhu-likes` |
| `fix/` | Bug fix | `fix/api-duplicate-route` |
| `docs/` | Tylko dokumentacja | `docs/governance-wave-1b` |
| `chore/` | Tooling, deps, config | `chore/add-ci-pipeline` |
| `refactor/` | Refactoring bez zmiany behavior | `refactor/extract-auth-middleware` |

### Commit convention: Conventional Commits

```
<type>(<scope>): <description>

Przykłady:
feat(hhu): add like button to posts
fix(api): remove duplicate POST /users route
docs(governance): add master risk register [06]
chore(ci): add GitHub Actions lint workflow
refactor(auth): extract JWT middleware to packages/auth
```

### Dozwolone typy: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `ci`
### Dozwolone scopes: `hhu`, `rfg`, `ai-studio`, `admin`, `web`, `api`, `auth`, `ui`, `config`, `types`, `database`, `ci`, `governance`

---

## Code Ownership

| Folder | Owner | Reviewer |
|--------|-------|----------|
| `apps/api/` | Founder | AI (pair review) |
| `apps/hhu/` | Founder | AI (pair review) |
| `apps/rfg/` | Founder | AI (pair review) |
| `apps/ai-studio/` | Founder | AI (pair review) |
| `apps/admin/` | Founder | AI (pair review) |
| `apps/web/` | Founder | AI (pair review) |
| `packages/*` | Founder | AI (pair review) |
| `docs/governance/` | Founder | AI (draft + review) |
| `docs/architecture/` | AI (draft) | Founder (approve) |
| `infra/` | Founder | — |
| `tests/` | AI (write) | Founder (review) |

> W fazie solo-founder, AI (GitHub Copilot / Claude) pełni rolę pair programmer i reviewer. Po dołączeniu team members, CODEOWNERS file formalnie przypisuje ownership.

---

## Versioning

### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH[-prerelease]

0.1.0        ← current (alpha, scaffold)
0.2.0-alpha  ← auth + HHU social loop
0.3.0-alpha  ← admin + AI tools
0.4.0-beta   ← full HHU MVP
0.5.0-beta   ← billing + AI Studio
1.0.0        ← public launch
```

### Wersja per package

Każdy pakiet w `packages/` ma własną wersję w `package.json`. Apps nie mają niezależnej wersji — wersjonowany jest cały system (root `package.json`).

---

## Release Process

### Pre-release (v0.x)
1. Feature branch → PR → CI passes (lint + typecheck + build)
2. Founder review (lub AI-assisted review)
3. Merge to `main`
4. Auto-deploy: Vercel (frontend), Railway (API)
5. Update CHANGELOG.md

### Release (v1.0+)
1. Create release branch `release/v1.0.0`
2. Final QA, E2E tests
3. Merge to `main`
4. Git tag `v1.0.0`
5. Deploy to production
6. CHANGELOG + GitHub Release

---

## Package boundaries

### Reguły importowania

```
apps/      → mogą importować z packages/
packages/  → mogą importować z innych packages/ (brak cykli)
packages/  → NIE MOGĄ importować z apps/
services/  → mogą importować z packages/
tests/     → mogą importować z apps/ i packages/
```

### Dependency graph (importy)

```
apps/hhu  ──→ packages/ui
              packages/config
              packages/types
              packages/auth (client-side)

apps/api  ──→ packages/auth (server-side)
              packages/database
              packages/config
              packages/types
              packages/storage
              packages/ai-core
              packages/payments
              packages/analytics

packages/auth     ──→ packages/types, packages/config
packages/database ──→ packages/types
packages/ai-core  ──→ packages/config, packages/types
packages/ui       ──→ packages/types
```

---

## Klasyfikacja zasad (OBOWIĄZKOWE / ZALECANE / OPCJONALNE)

### OBOWIĄZKOWE (= TERAZ)
1. Conventional Commits na każdy commit
2. Branch naming convention (feat/, fix/, docs/, chore/)
3. Package boundaries (packages nie importują z apps)
4. `@meta-geniusz/<name>` pakiet naming
5. CI musi przejść przed merge (lint + typecheck + build)
6. CHANGELOG.md update z każdym release

### ZALECANE (= PÓŹNIEJ)
7. CODEOWNERS file z GitHub enforcement
8. PR template z checklistą (tests, docs, breaking changes)
9. Git hooks (husky + lint-staged) dla commit msg validation
10. Automatic versioning (changeset lub semantic-release)
11. Pre-commit lint na staged files

### OPCJONALNE
12. Monorepo dashboard (Turborepo UI / custom)
13. Auto-generated dependency graph visualization
14. Package publish to private npm registry

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Reguły ignorowane przez brak enforcement → chaos | WYSOKIE | WYSOKI | CI enforcement od v0.2; git hooks w v0.3 |
| R2 | Circular dependencies między packages | ŚREDNIE | WYSOKI | Strict import rules; turborepo --graph validation |
| R3 | Puste stubs nigdy nie zostają wypełnione | WYSOKIE | ŚREDNI | Priorytetyzacja w doc [10]; usunąć truly unnecessary packages |

---

## Founder Decision Notes

- [ ] **FDN-41**: Zatwierdzić Conventional Commits jako obowiązkowy standard
- [ ] **FDN-42**: Zatwierdzić trunk-based development (feature branches → main)
- [ ] **FDN-43**: Potwierdzić `@meta-geniusz/<name>` jako npm scope

---

## Dokumenty zależne

- ← [07] Documentation Governance Protocol (standardy docs)
- ← [15] System Architecture v1.0 (techniczny blueprint)
- → Wszystkie PR/commity (muszą respektować te zasady)
- → `infra/github/` (CI workflows, branch protection, PR templates)
