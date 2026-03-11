# [02] Strategic Decision Register v1.0

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Rejestr gromadzi wszystkie podjęte decyzje strategiczne projektu META-GENIUSZ OS i nadaje im formalny status: **ZATWIERDZONE**, **DO REWIZJI** lub **ODRZUCONE**. Celem jest eliminacja niejednoznaczności — od tego momentu obowiązuje wyłącznie to, co jest w tym rejestrze.

---

## Stan obecny

Dotychczasowe decyzje były rozproszone między sesjami w D:\1, kodem repo i ustną wiedzą Foundera. Niniejszy dokument konsoliduje je w jednym miejscu.

---

## Tabela decyzji

### ZATWIERDZONE

| ID | Decyzja | Zakres | Źródło | Data | Uzasadnienie | Wpływ na architekturę | Wpływ na roadmapę |
|----|---------|--------|--------|------|-------------|----------------------|-------------------|
| D-2026-0001 | **HHU jest pierwszym modułem do uruchomienia** | MVP | D:\1 sesja warsztatowa, repo roadmap | 2026-03 | Największy rynek docelowy (hip-hop PL), najszybsza walidacja product-market fit | HHU ma priorytet w alokacji zasobów frontend + API | v0.3.0 = HHU Feature Complete |
| D-2026-0002 | **Monorepo Turborepo + pnpm** | MVP/Growth | Repo v0.1.0, D:\1 | 2026-03 | Współdzielone pakiety, szybkie buildy, jeden CI pipeline | Wszystkie apps i packages w jednym repo | Nie wpływa na roadmapę |
| D-2026-0003 | **SQLite (dev) → PostgreSQL (prod)** | MVP→v1.0 | Repo system-overview, D:\1 | 2026-03 | SQLite zero-config do dev; Postgres skaluje na produkcji | Prisma jako ORM umożliwia bezbolesną migrację | Migracja w v1.0.0 |
| D-2026-0004 | **Kolejność: HHU → AI Studio → RFG** | MVP/Growth | D:\1, repo roadmap | 2026-03 | Sekwencja oparta na priorytetach rynkowych i zależnościach technicznych | Każdy moduł budowany na shared packages poprzedniego | v0.3 → v0.4 → v0.5 |
| D-2026-0005 | **Stack: Next.js 16 + React 19 + Express 4 + Prisma 6 + TS 5** | MVP/Scale | Repo v0.1.0 | 2026-03 | Nowoczesny, type-safe, SSR-ready, duży ekosystem | Cały frontend na App Router; backend REST (+ przyszły tRPC) | Stabilny; nie planujemy zmian stacka |
| D-2026-0006 | **Tailwind CSS 4 jako system stylowania** | MVP | Repo v0.1.0 | 2026-03 | Utility-first, szybki dev, spójność między modułami | Wszystkie apps i @meta-geniusz/ui używają Tailwind | Nie wpływa |
| D-2026-0007 | **Repozytorium GitHub = jedyne źródło prawdy** | Governance | Corpus Audit [01] | 2026-03-11 | D:\1 staje się archiwum; repo jest canonical | Wszystkie decyzje, docs i kod w jednym miejscu | Wymaga synchronizacji D:\1 → repo |
| D-2026-0008 | **Dokumentacja najpierw, implementacja po bramce G2** | Governance | Decyzja Founder 2026-03-11 | 2026-03-11 | Minimalizacja chaosu decyzyjnego; kod budowany na zatwierdzonym fundamencie | Nie blokuje drobnych fixów; blokuje nowe features | Docs fale 1A/1B/2A/2B przed Fazą 3 kodu |
| D-2026-0009 | **Fale dokumentacyjne zamiast big-bang** | Governance | Plan sesji 2026-03-11 | 2026-03-11 | Mniejsze ryzyko, szybsza walidacja, iteracyjne wdrażanie | 5 fal po ~10 dokumentów | Harmonogram 90-dniowy |
| D-2026-0010 | **Pięć frontendowych aplikacji Next.js + 1 backend Express** | MVP | Repo v0.1.0 | 2026-03 | Separacja domen; każdy moduł ma własny routing i deploy | Osobne porty dev; wspólne packages | Stabilne; bez zmian |

### DO REWIZJI

| ID | Decyzja | Zakres | Problem | Opcje | Deadline rewizji |
|----|---------|--------|---------|-------|-----------------|
| D-REV-001 | **Auth: NextAuth.js vs własny JWT** | v0.2.0 | Obie opcje mają trade-offy: NextAuth łatwiejsze, JWT daje pełną kontrolę | A) NextAuth.js B) JWT + refresh tokens C) Hybrid | Przed startem Fazy 3 (implementacja) |
| D-REV-002 | **Storage: S3 vs Cloudflare R2 vs local** | v0.5.0 | Potrzebne do upload avatarów i portfolio RFG | A) S3 B) Cloudflare R2 C) Local dev + S3 prod | Przed v0.5.0 |
| D-REV-003 | **AI Provider: OpenAI vs Anthropic vs local** | v0.4.0 | Wpływa na koszty, jakość i compliance AI Act | A) OpenAI B) Anthropic C) Multi-provider | Przed v0.4.0 |
| D-REV-004 | **Cache layer: Redis vs DB materialized views** | v1.5.0 | Wpływa na wydajność feedu przy dużym ruchu | A) Redis B) Materialized views C) Edge caching | Przed v1.0.0 |

### ODRZUCONE

| ID | Decyzja | Powód odrzucenia |
|----|---------|------------------|
| D-REJ-001 | Budowa mobile app przed v1.0 | Webowa wersja responsywna wystarczy; mobile dopiero v2.0 |
| D-REJ-002 | Mikroserwisy w Fazach 1-2 | Monolith Express wystarczy do v1.0; services od v1.5+ |
| D-REJ-003 | Monetyzacja w MVP | Za wcześnie; v1.0 bez płatności, v1.5 = Stripe |
| D-REJ-004 | White-label / SaaS model w v1.0 | Przedwczesne; focus na własny brand |

---

## Konflikty między decyzjami

| Konflikt | Decyzje | Rozwiązanie |
|----------|---------|-------------|
| HHU priorytet vs brak auth | D-2026-0001 vs brak D-auth | Auth (v0.2) blokuje HHU pełne features (v0.3) — sekwencja zachowana |
| Docs first vs szybkie fixy kodu | D-2026-0008 vs bug w API | Drobne fixy (env, duplikat route) dozwolone równolegle z docs |
| SQLite dev vs PostgreSQL prod | D-2026-0003 | Prisma abstrahuje; migracja prosta. Bez konfliktu |

---

## Rekomendacja porządkowa

1. **Zamrozić** decyzje ZATWIERDZONE — obowiązują bez dalszej dyskusji
2. **Wyznaczyć deadline** dla decyzji DO REWIZJI — nie później niż 2 tygodnie przed milestone'em
3. **Archiwizować** decyzje ODRZUCONE — mogą wrócić w Scale phase z nowym uzasadnieniem

---

## Ryzyka

| # | Ryzyko | Wpływ | Mitygacja |
|---|--------|-------|-----------|
| R1 | Decyzje DO REWIZJI blokują start implementacji | WYSOKI | Wyznaczyć fallback: jeśli brak decyzji do deadline → domyślny wybór |
| R2 | Nowe decyzje podejmowane poza rejestrem | ŚREDNI | Każda decyzja > P2 wymaga wpisu tutaj |
| R3 | Founder nie zatwierdza FDN w terminie | ŚREDNI | AI proponuje rekomendację; Founder zatwierdza async |

---

## Founder Decision Notes

- [ ] **FDN-04**: Zatwierdzić NextAuth.js vs JWT (D-REV-001) — deadline: przed Fazą 3
- [ ] **FDN-05**: Zatwierdzić provider storage (D-REV-002) — deadline: przed v0.5.0
- [ ] **FDN-06**: Zatwierdzić AI provider (D-REV-003) — deadline: przed v0.4.0

---

## Dokumenty zależne

- ← [01] Master Project Corpus Audit (źródło kontekstu)
- → [04] Scope Boundaries & Exclusions (granice wynikające z decyzji)
- → [05] Module Dependency Graph (kolejność z D-2026-0004)
- → [06] Master Risk Register (ryzyka z decyzji)
- → [10] 90-Day Execution Alignment (harmonogram z decyzji)
