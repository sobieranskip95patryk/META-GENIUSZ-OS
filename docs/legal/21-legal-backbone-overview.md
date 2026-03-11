# 21 — Legal Backbone Overview

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS |
| **Cel decyzji** | Ustalić minimalny legal stack do startu platformy |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 04 (Scope Boundaries), 06 (Risk Register) |
| **Zależności wyjściowe** | → 22, 23, 24, 25, 26, 27, 28, 29, 30 |

---

## Executive Summary

META-GENIUSZ OS uruchamia trzy verticale (HHU, RFG, AI Studio) z funkcjami UGC, monetyzacji i AI generation. Każdy z nich generuje obowiązki prawne: regulaminy, polityka prywatności, obowiązki platformowe DSA/GDPR, odpowiedzialność za treści, moderacja, rozliczenia z twórcami. Niniejszy dokument definiuje **minimalny zestaw dokumentów i procesów prawnych** potrzebnych do uruchomienia platformy bez narażenia na ryzyka regulacyjne.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Regulamin (ToS) | ❌ Brak |
| Polityka prywatności | ❌ Brak |
| Cookies Policy | ❌ Brak |
| Community Guidelines | ❌ Brak |
| Creator Agreement | ❌ Brak |
| DMCA / Notice-and-Action | ❌ Brak |
| Zgoda na przetwarzanie danych | ❌ Brak (brak formularzy auth) |
| DSA compliance | ❌ Brak |
| Moderacja z reason statements | 🟡 Zaprojektowana w doc 20, niezaimplementowana |
| Weryfikacja tożsamości | 🟡 Zaprojektowano L0-L3 w doc 18, niezaimplementowana |
| Umowy z procesorami danych (DPA) | ❌ Brak |

---

## Wymagane dokumenty prawne

### WYMAGANE PRZED STARTEM (v0.2–v0.3)

| # | Dokument | Cel | Priorytet |
|---|----------|-----|-----------|
| L1 | **Terms of Service (ToS)** | Regulamin korzystania z platformy | P0 |
| L2 | **Privacy Policy** | Informacja o przetwarzaniu danych osobowych (GDPR Art. 13/14) | P0 |
| L3 | **Cookie Policy** | Informacja o cookies i technologiach śledzenia | P0 |
| L4 | **Community Guidelines** | Zasady dopuszczalnych treści i zachowań | P0 |
| L5 | **Acceptable Use Policy** | Zakazy i ograniczenia techniczne | P1 |
| L6 | **Notice-and-Action Procedure** | Procedura zgłaszania nielegalnych treści (DSA Art. 16) | P0 |

### WYMAGANE PRZY WZROŚCIE (v0.4–v1.0)

| # | Dokument | Cel | Priorytet |
|---|----------|-----|-----------|
| L7 | **Creator Agreement** | Warunki współpracy z twórcami (monetyzacja, IP) | P1 |
| L8 | **Brand Partnership Terms** | Warunki współpracy B2B (HHU/RFG) | P2 |
| L9 | **Data Processing Agreement (DPA)** | Umowy z sub-procesorami (Railway, Vercel, Stripe, OpenAI) | P1 |
| L10 | **DMCA / Copyright Policy** | Procedura zgłoszeń naruszenia praw autorskich | P1 |
| L11 | **Payout Terms** | Zasady wypłat dla twórców (progi, opóźnienia, podatki) | P2 |
| L12 | **AI Disclosure Statement** | Transparentność użycia AI w generowaniu treści | P1 |

### PÓŹNIEJ

| # | Dokument | Cel | Priorytet |
|---|----------|-----|-----------|
| L13 | Influencer Disclosure Guidelines | Oznaczanie treści sponsorowanych | P3 |
| L14 | API Terms of Service | Jeśli SDK/API będzie publiczne | P3 |
| L15 | Intellectual Property Assignment | Przy wejściu współfoundera / inwestora | P3 |

---

## Obowiązki platformowe

### GDPR (Rozporządzenie 2016/679)

| Obowiązek | Odniesienie | Status | Dokument docelowy |
|-----------|------------|--------|-------------------|
| Informacja o przetwarzaniu | Art. 13/14 | ❌ Brak | L2 (Privacy Policy) |
| Podstawy prawne przetwarzania | Art. 6 | ❌ Brak | Doc 22 (GDPR Map) |
| Prawo do usunięcia danych | Art. 17 | ❌ Brak | Doc 26 (Retention & Deletion) |
| Prawo do przenoszenia danych | Art. 20 | ❌ Brak | Doc 26 |
| Rejestr czynności przetwarzania | Art. 30 | ❌ Brak | Doc 22 |
| Ocena skutków (DPIA) | Art. 35 | ⏳ Wymagane przy AI profiling | Doc 24 (AI Compliance) |
| Zgłoszenie naruszenia danych | Art. 33/34 | ❌ Brak | Doc 29 (Incident Response) |
| DPA z procesorami | Art. 28 | ❌ Brak | L9 |

### DSA (Digital Services Act)

| Obowiązek | Odniesienie | Status | Dokument docelowy |
|-----------|------------|--------|-------------------|
| Notice-and-action | Art. 16 | ❌ Brak | L6 + Doc 23 |
| Reason statements | Art. 17 | 🟡 Zaprojektowane w doc 20 | Doc 23 |
| Internal complaint handling | Art. 20 | ❌ Brak | Doc 23 |
| Transparency reporting (>45M MAU) | Art. 15 | N/A (poniżej progu) | — |
| Trusted flaggers | Art. 22 | ❌ Brak | Doc 23 |
| Measures against misuse | Art. 23 | ❌ Brak | Doc 27 (Content Policy) |

### Prawo e-commerce (Ustawa o świadczeniu usług drogą elektroniczną)

| Obowiązek | Status |
|-----------|--------|
| Regulamin świadczenia usług | ❌ Brak (→ L1) |
| Dane identyfikujące usługodawcę | ❌ Brak (→ L1, strona informacyjna) |
| Procedura reklamacyjna | ❌ Brak (→ L1) |

---

## Klauzule handlowe (Commerce)

| Obszar | Wymaganie | Faza |
|--------|-----------|------|
| **Płatności** | Regulamin subskrypcji, refundy, billing cycle | v0.5 (Stripe) |
| **Prowizje** | Transparentne stawki prowizji dla twórców | v0.5 |
| **Payouts** | Progi wypłat, weryfikacja L2/L3, harmonogram | v1.0 |
| **Podatki** | Informacja o obowiązkach podatkowych twórcy | v1.0 |
| **Credits AI** | Regulamin zakupu i zużycia kredytów AI | v0.5 |

---

## Klauzule moderacyjne (Moderation)

| Wymaganie | Źródło | Status |
|-----------|--------|--------|
| Reason statement przy każdej decyzji moderacyjnej | DSA Art. 17 | 🟡 doc 20 (zaprojektowane) |
| Prawo odwołania od decyzji moderacyjnej | DSA Art. 20 | ❌ Brak |
| Archiwizacja decyzji moderacyjnych (min. 6 mies.) | DSA Art. 16 | ❌ Brak (→ doc 25) |
| Community Guidelines dostępne publicznie | DSA Art. 14 | ❌ Brak (→ L4) |
| Procedura contra-notice (kontra-zgłoszenie) | DSA Art. 16(5) | ❌ Brak (→ doc 23) |

---

## Klauzule weryfikacyjne (Verification)

| Kontekst | Wymaganie | Level | Faza |
|----------|-----------|-------|------|
| Rejestracja | Email + hasło | L0 | v0.2 |
| Postowanie | Email verified | L1 | v0.2 |
| Monetyzacja (tip/subscribe) | Phone verified | L2 | v0.5 |
| Payouts | ID+selfie | L3 | v1.0 |
| RFG oferowanie współpracy | L2 minimum | L2 | v0.5 |
| Admin/Moderator | L3 + internal assignment | L3 | v0.3 |

> Poziomy weryfikacji zdefiniowane w doc 18. Implikacje prawne: L3 wymaga przetwarzania biometrycznego (GDPR Art. 9) — DPIA obowiązkowe.

---

## Ryzyka operacyjne

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|----|-----------|
| LR-01 | Brak ToS i Privacy Policy przy launch | WYSOKIE | KRYTYCZNY | Priorytet P0 — gotowe przed public beta |
| LR-02 | Brak procedury notice-and-action | ŚREDNIE | WYSOKI | Wdrożyć z first public content (DSA) |
| LR-03 | Brak DPA z Railway/Vercel/OpenAI | ŚREDNIE | WYSOKI | Podpisać przed wejściem na produkcję |
| LR-04 | DPIA niewykonnane przy selfie verification (L3) | NISKIE (L3 = v1.0) | WYSOKI | Zaplanować DPIA przed wdrożeniem L3 |
| LR-05 | Przetwarzanie danych AI bez podstawy prawnej | ŚREDNIE | WYSOKI | Zgoda lub uzasadniony interes + transparentność (doc 24) |
| LR-06 | Brak procedury usunięcia konta (Art. 17) | ŚREDNIE | WYSOKI | UI "Usuń konto" + backend soft-delete w v0.3 |
| LR-07 | Niezgodność z ustawą o prawie autorskim | NISKIE | ŚREDNI | DMCA-like procedure w v0.4 |

---

## Rekomendacja legal baseline

### TERAZ (v0.2–v0.3) — Blokujące launch

1. **Przygotować ToS (L1)** — minimum regulamin z disclaimerem beta, ograniczeniem odpowiedzialności, zakazami
2. **Przygotować Privacy Policy (L2)** — GDPR-compliant, wymienić procesory, cele, podstawy
3. **Cookie Policy (L3)** — jeśli cookies analityczne/marketing (na start: brak analytics = minimal)
4. **Community Guidelines (L4)** — czego nie wolno postować, co jest „strefą ryzyka"
5. **Notice-and-Action (L6)** — prosty formularz zgłoszeniowy + workflow w adminie (doc 20)
6. **Implementować reason statements** w moderacji (doc 20, DSA Art. 17)

### PÓŹNIEJ (v0.4–v1.0) — Blokujące monetyzację

7. **Creator Agreement (L7)** — przed uruchomieniem wypłat
8. **DPA z procesorami (L9)** — Railway, Vercel, Stripe, OpenAI
9. **AI Disclosure (L12)** — przed uruchomieniem AI Studio publicznie
10. **DMCA/Copyright (L10)** — przed skalowaniem UGC

### NIE TERAZ

11. API ToS (L14) — brak publicznego API
12. Influencer Disclosure (L13) — brak brand deals
13. IP Assignment (L15) — brak współfoundera

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-56 | Czy ToS tworzy prawnik czy draft AI + review prawnik? | 🟡 DO DECYZJI | Rekomendacja: AI draft → prawnik review (oszczędność czasu) |
| FDN-57 | Jurisdykcja regulaminu — prawo polskie czy angielskie? | 🟡 DO DECYZJI | Rekomendacja: polskie (siedziba PL, pierwszy rynek PL) |
| FDN-58 | Czy L3 (selfie+ID) wdrożyć in-house czy outsource (Veriff/Onfido)? | 🟡 DO DECYZJI | Rekomendacja: outsource (DPIA łatwiejsze, compliance gotowe) |
| FDN-59 | Czy potrzebujemy IOD (DPO) przed launch? | 🟡 DO DECYZJI | Rekomendacja: nie — <250 pracowników, brak profilowania na dużą skalę |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 04 — Scope Boundaries | Wejście: granice zakresu prawnego |
| 06 — Master Risk Register | Wejście: ryzyka prawne R-C-002 |
| 18 — Identity & Roles | Wejście: verification levels L0-L3 |
| 20 — Admin & Backoffice | Wejście: reason statements, moderation queue |
| 22 — GDPR Map | Wyjście: szczegółowa mapa danych |
| 23 — DSA Readiness | Wyjście: procedury platformowe |
| 24 — AI Compliance | Wyjście: wymogi AI Act |
| 25 — Evidence & Audit Trail | Wyjście: logowanie decyzji |
| 26 — Retention & Deletion | Wyjście: polityka retencji |
| 27 — Content Policy | Wyjście: zasady treści |
| 28 — Verification Framework | Wyjście: feasibility weryfikacji |
| 29 — Incident Response | Wyjście: procedury incydentów |
| 30 — Compliance Decision Matrix | Wyjście: macierz decyzji |
