# [10] 90-Day Execution Alignment Map

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Plan łączy dokumentację, kod, compliance, partnerstwa i infrastrukturę w jednolity harmonogram 90 dni (11 marca – 9 czerwca 2026). Każdy tydzień ma przypisane konkretne deliverables z trzech równoległych torów: dokumentacja (Ścieżka A), infrastruktura i szybkie fixy (Ścieżka C) oraz implementacja kodu (Ścieżka B — startuje po bramce G1). Kamienie milowe oznaczają gateway decisions dla Founderʼa.

---

## Stan obecny

- **Repo**: v0.1.0 alpha — HHU feed + API basic, brak auth/CI/testów
- **Dokumentacja**: 7 existing docs + 10 governance docs (01-10) w trakcie finalizacji
- **Kod**: 6 apps (2 funktionujące, 4 placeholder), 12 packages (4 stub, 8 puste)
- **Zaplanowane dokumenty**: 50 (z czego 10 w realizacji)

---

## Cele na 90 dni

| # | Cel | Miernik sukcesu | Priorytet |
|---|-----|-----------------|-----------|
| C1 | Dokumentacja governance + architecture gotowa i zatwierdzona | 20 dokumentów APPROVED (01-20) | P0 |
| C2 | Compliance baseline gotowy | Dokumenty 21, 22, 23, 27 APPROVED | P0 |
| C3 | Auth zaimplementowany i działa | User może się zarejestrować + zalogować; API endpoints chronione | P0 |
| C4 | CI/CD na każdy PR | GitHub Actions: lint + typecheck + build = green | P1 |
| C5 | HHU Feature Complete | Likes, comments, follow, avatar upload, feed pagination | P1 |
| C6 | Shared packages baseline | `config`, `types`, `ui` (Button/Card/Input) działają | P1 |
| C7 | AI Studio Alpha spec gotowy | Dokument 41 APPROVED; generator bio proof-of-concept | P2 |
| C8 | Vertical docs (HHU 31-35) gotowe | 5 dokumentów HHU APPROVED | P2 |

---

## Priorytety tygodniowe

### TYDZIEŃ 1-4: Fundament (11-25 marca → 8 kwietnia)

#### Tydzień 1 (11-17 marca)

| Tor | Deliverable | Status |
|-----|------------|--------|
| **A (docs)** | ✅ [01] Corpus Audit | DONE |
| **A (docs)** | ✅ [02] Decision Register | DONE |
| **A (docs)** | ✅ [03] Terminology Dictionary | DONE |
| **A (docs)** | ✅ [04] Scope Boundaries | DONE |
| **A (docs)** | ✅ [05] Module Dependency Graph | DONE |
| **A (docs)** | ✅ [06] Risk Register | DONE |
| **A (docs)** | ✅ [07] Documentation Governance Protocol | DONE |
| **A (docs)** | ✅ [08] Documentation Roadmap | DONE |
| **A (docs)** | ✅ [09] Founder Operating Model | DONE |
| **A (docs)** | ✅ [10] 90-Day Execution Map | DONE |
| **C (infra)** | `.env.example` update + env variables cleanup | TODO |

#### Tydzień 2 (18-24 marca)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [11] Category Definition Thesis |
| **A (docs)** | [12] Master Strategic Thesis |
| **A (docs)** | [13] Business Unit Architecture |
| **A (docs)** | [14] Product Architecture Master |
| **C (infra)** | GitHub Actions CI pipeline (lint + typecheck + build) |
| **C (infra)** | Fix duplikat route API |

> **🚩 Bramka G1** (koniec tygodnia 2): Dokumenty 01-10 APPROVED. Founder review batch.

#### Tydzień 3 (25-31 marca)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [15] System Architecture v1.0 |
| **A (docs)** | [16] Monorepo Governance Guide |
| **A (docs)** | [17] Shared Services Blueprint |
| **A (docs)** | [18] Identity & Roles Architecture |
| **C (infra)** | `packages/config` implementation |
| **C (infra)** | `packages/types` implementation |

#### Tydzień 4 (1-8 kwietnia)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [19] Master Domain Model |
| **A (docs)** | [20] Admin & Backoffice Master Spec |
| **C (infra)** | `packages/utils` baseline |
| **C (infra)** | Vitest setup w apps/api |

> **🚩 Bramka G1.5** (koniec tygodnia 4): Dokumenty 01-20 APPROVED. Architecture frozen for MVP.

---

### TYDZIEŃ 5-8: Compliance + Auth + HHU (9 kwietnia → 6 maja)

#### Tydzień 5 (9-15 kwietnia)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [21] Legal Backbone Overview |
| **A (docs)** | [22] GDPR Data Processing Map |
| **B (kod)** | `packages/auth` — JWT helpers, hash, verify |
| **B (kod)** | Auth middleware w apps/api |

#### Tydzień 6 (16-22 kwietnia)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [23] DSA Readiness Pack |
| **A (docs)** | [24] AI Compliance Relevance Map |
| **A (docs)** | [27] Content Policy Architecture |
| **B (kod)** | Auth endpoints: POST /auth/register, POST /auth/login, POST /auth/refresh |
| **B (kod)** | Frontend: login/register UI w apps/hhu |

#### Tydzień 7 (23-29 kwietnia)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [25] Evidence & Audit Trail Framework |
| **A (docs)** | [26] Retention & Deletion Policy |
| **A (docs)** | [28] Verification Feasibility |
| **B (kod)** | Prisma schema expansion: Like, Comment, Follow models |
| **B (kod)** | API: POST/DELETE /likes, POST/GET /comments, POST/DELETE /follows |

#### Tydzień 8 (30 kwietnia - 6 maja)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [29] Incident Response Framework |
| **A (docs)** | [30] Compliance Decision Matrix |
| **B (kod)** | HHU frontend: like button, comment section, follow button |
| **B (kod)** | `packages/ui`: Button, Card, Input, Avatar components |
| **B (kod)** | HHU feed pagination + infinite scroll |

> **🚩 Bramka G2** (koniec tygodnia 8): Compliance baseline APPROVED. Auth deployed. HHU social features working.

---

### TYDZIEŃ 9-12: Vertical Specs + Polish (7 maja → 9 czerwca)

#### Tydzień 9 (7-13 maja)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [31] HHU Product Thesis |
| **A (docs)** | [32] HHU Personas & JTBD |
| **A (docs)** | [33] HHU MVP Scope v1 |
| **B (kod)** | Profile edit: avatar upload, bio edit |
| **B (kod)** | `packages/database`: Prisma client singleton + query helpers |

#### Tydzień 10 (14-20 maja)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [34] HHU Growth Loop Architecture |
| **A (docs)** | [35] HHU Creator Onboarding Spec |
| **A (docs)** | [38] Community Mechanics Spec |
| **B (kod)** | `packages/ai-core` baseline |
| **B (kod)** | AI Studio: generator bio proof-of-concept |

#### Tydzień 11 (21-27 maja)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [41] AI Studio Product Spec |
| **A (docs)** | [45] RFG Strategic Positioning |
| **A (docs)** | [48] Monetization Engine Master Spec |
| **B (kod)** | API testy (Vitest): auth, users, posts, likes, comments |
| **B (kod)** | E2E test: register → login → create post → like → comment |

#### Tydzień 12 (28 maja - 9 czerwca)

| Tor | Deliverable |
|-----|------------|
| **A (docs)** | [49] Trust & Safety Core |
| **A (docs)** | [50] Investor Narrative & Funding Roadmap |
| **A (docs)** | Remaining docs (36, 37, 39, 40, 42, 43, 44, 46, 47) — drafts |
| **B (kod)** | Admin panel: user list, post moderation queue |
| **B (kod)** | Final polish: error handling, logging, health checks |
| **C (infra)** | Deployment prep: Vercel + Railway config |

> **🚩 Bramka G3** (koniec tygodnia 12): 50 dokumentów drafted (min. 30 APPROVED). v0.3.0 release candidate ready.

---

## Kamienie milowe

| Milestone | Tydzień | Wersja | Kryteria |
|-----------|---------|--------|----------|
| **M1: Governance Locked** | 2 | — | 01-10 APPROVED, terminologia zamrożona |
| **M2: Architecture Locked** | 4 | — | 11-20 APPROVED, domain model zamrożony |
| **M3: Auth Live** | 6 | v0.2.0 | Rejestracja + logowanie; endpoints chronione; CI green |
| **M4: Compliance Baseline** | 8 | — | 21-30 APPROVED; content policy gotowa |
| **M5: HHU Social Complete** | 9 | v0.3.0-rc | Likes, comments, follow, avatar, feed pagination |
| **M6: 90-Day Review** | 12 | v0.3.0 | 50 docs drafted; HHU complete; auth; CI; admin basic |

---

## Zależności

```
M1 (Governance) ────► M2 (Architecture)
                          │
                          ▼
M3 (Auth) ◄──────── M2 (Architecture)
    │
    ▼
M4 (Compliance) ───► M5 (HHU Social)
                          │
                          ▼
                     M6 (90-Day Review)
```

---

## Review points

| Punkt | Kiedy | Co sprawdzamy | Kto |
|-------|-------|---------------|-----|
| **R1** | Piątek tydzień 2 | G1: docs 01-10 complete? | Founder |
| **R2** | Piątek tydzień 4 | G1.5: docs 11-20 complete? Architecture frozen? | Founder |
| **R3** | Piątek tydzień 6 | Auth works? CI green? | Founder + manual test |
| **R4** | Piątek tydzień 8 | G2: compliance + HHU social MVP | Founder |
| **R5** | Piątek tydzień 10 | AI Studio PoC works? | Founder + manual test |
| **R6** | Piątek tydzień 12 | G3: full 90-day review | Founder — major decision point |

---

## Ryzyka

| # | Ryzyko | Mitygacja |
|---|--------|-----------|
| R1 | Plan zbyt ambitny na 1 Founder + AI | Priorytetyzacja: P0 non-negotiable; P2 może przesunąć się o 2 tyg |
| R2 | Auth implementation takes longer than expected | Fallback: NextAuth.js jeśli custom JWT >5 dni |
| R3 | Founder review backlog slows everything | Batch review; AI pre-filters; timeboxing |
| R4 | External factors (legal consultation delay) | Legal docs marked „draft, needs legal review" — nie blokują kodu |

---

## Founder Decision Notes

- [ ] **FDN-21**: Zatwierdzić 90-day plan i kamienie milowe M1-M6
- [ ] **FDN-22**: Zatwierdzić start implementacji kodu (Tor B) od tygodnia 5
- [ ] **FDN-23**: Określić target date dla v0.2.0 release (auth live)

---

## Dokumenty zależne

- ← [04] Scope Boundaries (co jest w zakresie 90 dni)
- ← [05] Module Dependency Graph (kolejność budowy)
- ← [08] Documentation Roadmap (harmonogram dokumentów)
- ← [09] Founder Operating Model (rytm pracy Founder)
- → Roadmap (`docs/roadmap/roadmap.md`) — aktualizacja po zatwierdzeniu
