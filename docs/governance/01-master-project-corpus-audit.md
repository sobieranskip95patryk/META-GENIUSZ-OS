# [01] Master Project Corpus Audit

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

META-GENIUSZ OS posiada dwa główne źródła materiałów: **repozytorium GitHub** (kod + 7 plików docs/) oraz **folder roboczy D:\1** (13 plików .md + 8 plików .pdf z sesji warsztatowych). Łącznie zidentyfikowano **~65 artefaktów projektowych**, z czego ~20% jest w repo, a ~80% istnieje wyłącznie w źródłach roboczych. Konieczna jest formalna synchronizacja: przeniesienie kluczowych materiałów do repo i nadanie im statusów obowiązujących.

---

## Stan obecny

| Metryka | Wartość |
|---------|---------|
| Wersja repozytorium | v0.1.0 (Alpha) |
| Commity | 2 |
| Pliki docs/ w repo | 7 (mission, system-overview, mvp, roadmap, gap-report, repository-analysis, workspace-alignment-report) |
| Pliki kodu (apps/) | 6 aplikacji (web, hhu, rfg, ai-studio, admin, api) |
| Pakiety (packages/) | 12 folderów, 4 ze stubami README, 8 pustych |
| Materiały w D:\1 | ~21 plików (13 .md + 8 .pdf) |
| Zaplanowane dokumenty (wytyczne) | 50 pozycji |
| Pokrycie dokumentacyjne repo vs plan | ~12% |

---

## Pełna mapa źródeł

### A. Repozytorium GitHub (źródło prawdy dla kodu i docs/)

| # | Ścieżka | Typ | Status | Klasyfikacja |
|---|---------|-----|--------|--------------|
| 1 | `README.md` | Dokumentacja | ✅ Kompletny | Techniczna |
| 2 | `REPORT.md` | Raport | ✅ Kompletny | Techniczna |
| 3 | `CHANGELOG.md` | Log zmian | ✅ Kompletny | Techniczna |
| 4 | `docs/vision/mission.md` | Wizja | ✅ Kompletny | Strategiczna |
| 5 | `docs/architecture/system-overview.md` | Architektura | ✅ Kompletny | Techniczna |
| 6 | `docs/architecture/repository-analysis.md` | Analiza | ✅ Kompletny | Techniczna |
| 7 | `docs/architecture/gap-report.md` | Gap report | ✅ Kompletny | Techniczna |
| 8 | `docs/architecture/workspace-alignment-report.md` | Spójność | ✅ Kompletny | Strategiczna |
| 9 | `docs/product/mvp.md` | Spec MVP | ✅ Kompletny | Produktowa |
| 10 | `docs/roadmap/roadmap.md` | Roadmap | ✅ Kompletny | Produktowa |
| 11 | `apps/api/prisma/schema.prisma` | Schema DB | ✅ Funkcjonalny | Techniczna |
| 12 | `apps/api/src/index.ts` | Backend API | ✅ Funkcjonalny | Techniczna |
| 13 | `apps/hhu/src/app/page.tsx` | HHU Feed | ✅ Funkcjonalny | Produktowa |
| 14 | `apps/hhu/src/app/profile/[username]/page.tsx` | HHU Profile | ✅ Funkcjonalny | Produktowa |
| 15 | `apps/web/src/app/page.tsx` | Hub | ✅ Funkcjonalny | Produktowa |
| 16 | `apps/rfg/src/app/page.tsx` | RFG Landing | 🔧 Placeholder | Produktowa |
| 17 | `apps/ai-studio/src/app/page.tsx` | AI Studio Landing | 🔧 Placeholder | Produktowa |
| 18 | `apps/admin/src/app/page.tsx` | Admin Landing | 🔧 Placeholder | Produktowa |
| 19 | `packages/ui/README.md` | UI lib stub | ⏳ Stub | Techniczna |
| 20 | `packages/ai-core/README.md` | AI core stub | ⏳ Stub | Techniczna |
| 21 | `packages/database/README.md` | DB helpers stub | ⏳ Stub | Techniczna |
| 22 | `packages/agents/README.md` | Agents stub | ⏳ Stub | Techniczna |

### B. Folder roboczy D:\1 (materiały planistyczne)

| # | Materiał | Typ | Klasyfikacja | Priorytet przeniesienia |
|---|----------|-----|--------------|------------------------|
| 1 | Rejestr decyzji strategicznych | Governance | Strategiczna | 🔴 NATYCHMIAST |
| 2 | Rejestr ryzyk | Governance | Strategiczna | 🔴 NATYCHMIAST |
| 3 | Mapa zależności modułów | Governance | Techniczna | 🔴 NATYCHMIAST |
| 4 | Protokół zarządzania dokumentacją | Governance | Strategiczna | 🔴 NATYCHMIAST |
| 5 | Roadmapa dokumentów | Governance | Strategiczna | 🔴 NATYCHMIAST |
| 6 | Architektura monetyzacji | Biznesowa | Biznesowa | 🟡 NASTĘPNY |
| 7 | Narracja inwestorska | Biznesowa | Biznesowa | 🟡 NASTĘPNY |
| 8 | Konsolidacja HHU | Produktowa | Produktowa | 🟡 NASTĘPNY |
| 9 | Content Policy Architecture | Bezpieczeństwo | Prawna | 🟡 NASTĘPNY |
| 10 | GDPR Data Processing Map | Prawna | Prawna | 🟡 NASTĘPNY |
| 11-21 | Pozostałe sesje/raporty | Różne | Różne | 🟢 PÓŹNIEJ |

### C. Wytyczne dalsze (backlog 50 dokumentów)

| Fala | Zakres | Status |
|------|--------|--------|
| Governance Core (01-10) | Porządek decyzyjny, scope, ryzyka, protokoły | 🔧 W REALIZACJI |
| Architecture/Product Core (11-20) | Tezy, architektura, domain model, admin | ⏳ Zaplanowane |
| Compliance/Safety (21-30) | Legal, GDPR, DSA, audit, incidents | ⏳ Zaplanowane |
| HHU Vertical (31-40) | Product thesis, personas, MVP, growth, GTM | ⏳ Zaplanowane |
| AI Studio + RFG + Revenue (41-50) | AI spec, credits, RFG, monetization, investor | ⏳ Zaplanowane |

---

## Klasyfikacja materiałów

| Kategoria | Ilość w repo | Ilość w D:\1 | Ilość zaplanowana | Pokrycie |
|-----------|-------------|-------------|-------------------|----------|
| **Strategiczna** | 2 | 5 | 12 | 17% |
| **Produktowa** | 2 | 3 | 15 | 13% |
| **Techniczna** | 5 | 2 | 8 | 63% |
| **Prawna** | 0 | 2 | 6 | 0% |
| **Bezpieczeństwo** | 0 | 1 | 4 | 0% |
| **Biznesowa** | 0 | 3 | 5 | 0% |
| **Marketingowa** | 0 | 2 | 2 | 0% |
| **Operacyjna** | 0 | 1 | 2 | 0% |

---

## Luki informacyjne

| # | Luka | Wpływ | Priorytet |
|---|------|-------|-----------|
| L1 | Brak formalnego rejestru decyzji w repo | Decyzje nieudokumentowane, ryzyko sprzeczności | 🔴 KRYTYCZNY |
| L2 | Brak rejestru ryzyk w repo | Brak świadomości zagrożeń | 🔴 KRYTYCZNY |
| L3 | Brak granic scope w repo | Ryzyko scope creep | 🔴 KRYTYCZNY |
| L4 | Brak jakiejkolwiek dokumentacji compliance | Ryzyko prawne przy uruchomieniu | 🔴 KRYTYCZNY |
| L5 | Brak spójnego słownika pojęć | Niejednoznaczna komunikacja | 🟡 WYSOKI |
| L6 | Brak dokumentacji Trust & Safety | Brak ochrony użytkowników | 🟡 WYSOKI |
| L7 | Brak specyfikacji monetyzacji | Brak modelu przychodów | 🟡 WYSOKI |
| L8 | Brak narracji inwestorskiej | Utrudnione pozyskanie funding | 🟢 ŚREDNI |
| L9 | Hardcoded API URL (localhost:4000) w frontend apps | Blokuje deployment na środowiskach non-localhost | 🟠 WYSOKI |

---

## Rekomendacja porządkowania

### TERAZ (Fala 1 — natychmiast)
1. Utworzyć `docs/governance/` i przenieść rejestry, mapy, protokoły (dokumenty 01-10)
2. Nadać statusy: APPROVED / REVIEW / DRAFT każdemu dokumentowi
3. Zamrozić terminologię i granice scope MVP

### PÓŹNIEJ (Fala 2 — po domknięciu governance)
4. Utworzyć `docs/legal/`, `docs/safety/`, `docs/business/`, `docs/operations/`
5. Opracować compliance baseline i product specs (dokumenty 11-30)
6. Rozpisać vertical specs: HHU, AI Studio, RFG (dokumenty 31-47)

### ODRZUCIĆ (nie teraz)
7. Zaawansowane materiały marketingowe i kampanijne (do uruchomienia po MVP)
8. Dokumentacja sprzedażowa i white-label (post-MVP)
9. Szczegółowe scenariusze exit strategy (przedwczesne na obecnym etapie)

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Materiały z D:\1 ulegną rozjechaniu z kodem | WYSOKIE | WYSOKI | Formalna synchronizacja do repo w ciągu 2 tygodni |
| R2 | 50 dokumentów paraliżuje wykonanie kodu | ŚREDNIE | WYSOKI | Podział na fale; dokumenty nie blokują prostych fix-ów |
| R3 | Brak ownera dokumentów = nikt nie aktualizuje | WYSOKIE | ŚREDNI | Przypisać Founder jako ownera governance; AI wspiera drafty |
| R4 | Duplikacja informacji repo vs D:\1 | ŚREDNIE | ŚREDNI | D:\1 = archiwum robocze; repo = źródło prawdy po przeniesieniu |

---

## Founder Decision Notes

- [ ] **FDN-01**: Zatwierdzić repo jako jedyne źródło prawdy (D:\1 staje się archiwum)
- [ ] **FDN-02**: Zatwierdzić kolejność fal dokumentacyjnych: governance → architecture → compliance → verticals
- [ ] **FDN-03**: Określić, kto oprócz AI odpowiada za review dokumentów

---

## Dokumenty zależne

- → [02] Strategic Decision Register (wymaga listy decyzji z tego audytu)
- → [03] Canonical Terminology Dictionary (wymaga listy pojęć z tego audytu)
- → [07] Documentation Governance Protocol (wymaga statusów z tego audytu)
- → [08] Documentation Roadmap Master (wymaga mapy źródeł z tego audytu)
