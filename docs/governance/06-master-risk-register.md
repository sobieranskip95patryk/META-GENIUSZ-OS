# [06] Master Risk Register

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Centralny rejestr ryzyk strategicznych, produktowych, technicznych, prawnych, finansowych, reputacyjnych i operacyjnych. Każde ryzyko ma przypisane: prawdopodobieństwo, wpływ, wczesne sygnały, środki zapobiegawcze i środki reakcji. Rejestr jest żywym dokumentem — aktualizowany co 2 tygodnie lub po każdym incydencie.

---

## Stan obecny

Ryzyka były identyfikowane fragmentarycznie w sesjach D:\1 i implicitnie w gap-report. Brak centralnego rejestru powodował, że część zagrożeń nie miała ownera ani planu mitygacji.

---

## Lista ryzyk

### 🔴 KRYTYCZNE

| ID | Ryzyko | Kategoria | P-stwo | Wpływ | Wczesne sygnały | Środki zapobiegawcze | Środki reakcji |
|----|--------|-----------|--------|-------|-----------------|---------------------|---------------|
| R-C-001 | **Brak autentykacji — zero bezpieczeństwa** | Techniczne | 95% | KRYTYCZNY | API endpoints dostępne bez tokenu; brak logowania w frontendzie | Wdrożyć auth (JWT/NextAuth) jako P0 w v0.2.0 | Emergency: wyłączyć POST endpoints do czasu wdrożenia; dev-only deployment |
| R-C-002 | **Niezgodność z DSA/GDPR — ryzyko prawne przy launchu EU** | Prawne | 70% | KRYTYCZNY | Brak content policy; brak mechanism zgłaszania; brak privacy policy | Wdrożyć compliance baseline (docs 21-24) przed publicznym launchem | Opóźnić launch publiczny do minimum legal; konsultacja z prawnikiem |
| R-C-003 | **Scope creep — 50 docs + kod + marketing paraliżują execution** | Operacyjne | 60% | KRYTYCZNY | Brak postępu w kodzie po 4 tygodniach; Founder przeskakuje między tematami | Fale dokumentacyjne; scope boundaries doc [04]; tygodniowe review | Zamrozić nowe inicjatywy; focus na TOP 3 priorytety do domknięcia |
| R-C-004 | **Single founder + AI dependency — bus factor = 1** | Operacyjne | 80% | KRYTYCZNY | Founder choroba/wypalenie; AI unavailability | Dokumentacja decyzji [02]; runbooks; contributor onboarding plan | Przejąć docs jako fallback; zaplanować co-founder/tech lead hire |

### 🟠 WYSOKIE

| ID | Ryzyko | Kategoria | P-stwo | Wpływ | Wczesne sygnały | Środki zapobiegawcze | Środki reakcji |
|----|--------|-----------|--------|-------|-----------------|---------------------|---------------|
| R-H-001 | **Fake accounts / spam / boty na HHU** | Bezpieczeństwo | 75% | WYSOKI | Masowa rejestracja; identyczny content; podejrzane wzorce | Trust & Safety baseline; rate limiting; captcha | Manual moderation → auto-detection (v1.5) |
| R-H-002 | **Duplikacja kodu — 5 frontend apps bez shared packages** | Techniczne | 85% | WYSOKI | Identyczne komponenty w wielu apps; bug fix w jednym, nie w drugim | Wdrożyć `@meta-geniusz/ui` w Fazie 2; design system | Refaktor po MVP; extraction do packages |
| R-H-003 | **SQLite nie skaluje ponad demo** | Techniczne | 90% | WYSOKI | DB file rośnie >100MB; slow queries; connection locks | Plan migracji Postgres; Prisma ułatwia switch | Emergency migration; dane backup do JSON |
| R-H-004 | **Brak testów — regression bugs przy refaktoringu** | Techniczne | 80% | WYSOKI | Bug po merge; features psują inne features; brak pewności w deploy | Vitest API testy (v0.2); E2E Playwright (v1.0) | Rollback deploy; hotfix branch |
| R-H-005 | **Brak CI/CD — broken deploys na produkcji** | Techniczne | 75% | WYSOKI | Merge bez lint/typecheck; build failure po deploy | GitHub Actions CI (v0.2) z branch protection | Manual lint + typecheck przed merge |
| R-H-006 | **Monetyzacja za późno — twórcy odchodzą bo nie zarabiają** | Biznesowe | 50% | WYSOKI | Twórcy pytają o zarabianie; churn twórców po 3 miesiącach | Komunikacja roadmapy; early signals od creator community | Przyspieszenie Stripe integration; ambassador program |
| R-H-007 | **Hardcoded localhost:4000 — deployment na produkcji nie zadziała** | Techniczne | 100% | WYSOKI | Fetch fail na każdym non-localhost environment | `packages/config` z env variables; `.env.example` | Patch find-replace → env var |
| R-H-008 | **Content moderation failure — exploitative/illegal content** | Reputacyjne | 40% | WYSOKI | Reported content bez response; media coverage | Content policy [27]; moderation queue; admin panel | Immediate takedown; public statement; legal review |

### 🟡 ŚREDNIE

| ID | Ryzyko | Kategoria | P-stwo | Wpływ | Wczesne sygnały | Środki zapobiegawcze | Środki reakcji |
|----|--------|-----------|--------|-------|-----------------|---------------------|---------------|
| R-M-001 | **Dokumentacja z D:\1 rozjeżdża się z kodem** | Operacyjne | 65% | ŚREDNI | Decyzja w doc ≠ implementacja w kodzie; conflicting info | Synchronizacja D:\1 → repo; repo = source of truth | Audit spójności co miesiąc |
| R-M-002 | **AI provider costs exceed budget** | Finansowe | 40% | ŚREDNI | Monthly API bill > $500; credits model unprofitable | Rate limiting; credit economy; fallback to cheaper models | Switch provider; reduce free tier |
| R-M-003 | **Next.js 16 breaking changes** | Techniczne | 30% | ŚREDNI | Deprecation warnings; community reports | Pin versions; test upgrades w branch | Stay on current version; defer upgrade |
| R-M-004 | **Brak contributors — Founder robi wszystko sam** | Operacyjne | 70% | ŚREDNI | Zero PRs od external; no community engagement | CONTRIBUTING.md; good first issues; community building | Accept slower pace; prioritize ruthlessly |
| R-M-005 | **RFG safety risks — exploitation, abuse, fake castings** | Bezpieczeństwo | 50% | ŚREDNI | Reports of suspicious contacts; underage content attempts | Verification framework [28]; safety model [46] | Disable risky features; emergency review |

### 🟢 NISKIE

| ID | Ryzyko | Kategoria | P-stwo | Wpływ | Wczesne sygnały | Środki zapobiegawcze | Środki reakcji |
|----|--------|-----------|--------|-------|-----------------|---------------------|---------------|
| R-L-001 | **Turborepo deprecated / major breaking change** | Techniczne | 10% | NISKI | Vercel stopuje development; community moves to Nx | Monitor Turborepo releases | Migrate to Nx (well-documented path) |
| R-L-002 | **Competitor launches similar hip-hop platform** | Biznesowe | 20% | NISKI | New entrant announcement; feature parity | Speed to market; unique cultural positioning | Double down on differentiators |
| R-L-003 | **Domain/hosting bill surprise** | Finansowe | 15% | NISKI | Unexpected invoice; service limit hit | Budget tracking; alerts on cloud spend | Optimize resources; downgrade tier |

---

## Priorytety ryzyk (macierz)

```
                    WPŁYW
                 Niski  Średni  Wysoki  Krytyczny
P-stwo Wysokie │ R-L-  │ R-M-004│R-H-001│ R-C-001 │
               │       │ R-M-001│R-H-002│ R-C-004 │
               │       │       │R-H-003│         │
               │       │       │R-H-004│         │
               │       │       │R-H-005│         │
               │       │       │R-H-007│         │
P-stwo Średnie │       │R-M-002│R-H-006│ R-C-002 │
               │       │R-M-003│R-H-008│ R-C-003 │
               │       │R-M-005│       │         │
P-stwo Niskie  │R-L-001│R-L-003│       │         │
               │R-L-002│       │       │         │
```

---

## Priorytetyzacja mitygacji (TERAZ / PÓŹNIEJ / ODRZUCIĆ)

### TERAZ (v0.2–v0.4)
- R-C-001: Auth — wdrożyć natychmiast jako P0
- R-H-007: Hardcoded localhost — env variables w v0.2
- R-H-005: CI/CD — GitHub Actions baseline w v0.2
- R-H-003: SQLite → PostgreSQL migration plan (realizacja w v0.3)
- R-H-004: Vitest API testy — minimum coverage krytycznych endpoints

### PÓŹNIEJ (v0.5–v1.0)
- R-C-002: DSA/GDPR compliance — po domknięciu docs 21-24
- R-H-001: Trust & Safety baseline — po wdrożeniu moderacji
- R-H-002: Shared packages extraction — po stabilizacji komponentów
- R-H-006: Monetyzacja — po walidacji product-market fit
- R-H-008: Content moderation pipeline
- R-M-001–R-M-005: Działania prewencyjne wg harmonogramu

### ODRZUCIĆ (nie planujemy mitygacji)
- R-L-001: Turborepo deprecation — ryzyko akceptowalne
- R-L-002: Competitor launch — brak kontroli; focus na execution
- R-L-003: Hosting bill surprise — monitoring wystarczy

---

## Rekomendacje kontroli

1. **Review co 2 tygodnie**: Aktualizacja statusów ryzyk, nowe ryzyka, zamknięte ryzyka
2. **Eskalacja**: Ryzyko KRYTYCZNE → Founder notification natychmiast
3. **Ownership**: Każde ryzyko R-C i R-H musi mieć ownera (Founder lub designated lead)
4. **Trigger actions**: Wczesne sygnały → automatyczny review ryzyka

---

## Founder Decision Notes

- [ ] **FDN-12**: Zatwierdzić priorytety mitygacji: R-C-001 (auth) → R-H-007 (env) → R-H-005 (CI) jako Top 3
- [ ] **FDN-13**: Określić budżet na AI provider costs (R-M-002)

---

## Dokumenty zależne

- ← [02] Strategic Decision Register (decyzje generujące ryzyka)
- ← [04] Scope Boundaries (scope creep risk R-C-003)
- ← [05] Module Dependency Graph (wąskie gardła → ryzyka techniczne)
- → [25] Evidence & Audit Trail Framework (logowanie ryzyk)
- → [29] Incident Response Framework (reakcja na materializację ryzyk)
- → [49] Trust & Safety Core (ryzyka bezpieczeństwa R-H-001, R-H-008)
