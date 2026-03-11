# [09] Founder Operating Model

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Dokument definiuje operacyjną rolę Founderʼa & Visionary w META-GENIUSZ OS: zakres decyzyjności, rytm pracy, model współpracy z AI, granice delegowania i ochronę focusu. Founder jest jedynym decydentem; AI jest narzędziem realizacyjnym. Ten model musi chronić Founderʼa przed przeciążeniem, jednocześnie utrzymując momentum projektu.

---

## Stan obecny

Patryk Sobierański (Founder & Visionary) jest jedyną osobą decyzyjną w projekcie. AI (GitHub Copilot) pełni rolę wykonawczą: drafty dokumentów, kod, analiza, rekomendacje. Bus factor = 1. Nie ma team leada, designera, prawnika ani marketingowca na etacie. Projekt jest w fazie alpha — szybkość decyzji jest ważniejsza niż konsensus.

---

## Model roli Foundera

### Tożsamość roli

| Aspekt | Definicja |
|--------|-----------|
| **Tytuł** | Founder & Visionary |
| **Zakres** | Strategia, produkt, architektura, marka, finanse, partnerstwa |
| **Nie jest** | Jedynym developerem (AI wspiera); nie jest prawnikiem (wymaga external) |
| **Siła** | Wizja, szybkość decyzji, intuicja rynkowa, energy |
| **Ryzyko** | Wypalenie, scope creep, brak delegacji, 24/7 mode |

---

## Zakres decyzji

### Decyzje Founder (wyłączna kompetencja)

| Kategoria | Przykłady | Częstotliwość |
|-----------|-----------|---------------|
| **Strategia** | Wizja, positioning, kolejność modułów, pivoty | Rzadko (kwartalnie) |
| **Produkt** | Scope MVP, features TERAZ vs PÓŹNIEJ, UX direction | Często (tygodniowo) |
| **Marka** | Nazwy, estetyka, ton komunikacji, brand safety | Rzadko |
| **Finanse** | Budżet, pricing model, decyzja o funding | Rzadko |
| **Partnerstwa** | Kto jest partnerem, warunki, equity negotiations | Rzadko |
| **Team** | Kogo zatrudnić, kiedy, na jaką rolę | Rzadko |
| **Legal triggers** | Kiedy angażować prawnika; co wymaga opinii | Ad hoc |

### Decyzje operacyjne (AI + Founder oversight)

| Kategoria | Przykłady | Kto wykonuje | Founder review |
|-----------|-----------|-------------|---------------|
| **Dokumenty draft** | Treść 50 dokumentów | AI | Founder REVIEW/APPROVE |
| **Implementacja kodu** | Auth, API, UI components | AI + Dev | Founder spot-check |
| **CI/CD setup** | GitHub Actions, linting | AI + Dev | Founder approve PR |
| **Bug fixes** | Route duplication, env vars | AI + Dev | Founder merge |
| **Testy** | Vitest, E2E setup | AI + Dev | Founder spot-check |

### Decyzje eksperckie (wymaga external)

| Kategoria | Przykłady | Kto decyduje | Founder rola |
|-----------|-----------|-------------|-------------|
| **Legal/Compliance** | GDPR implementation, DSA obligations, umowy | Prawnik | Founder zleca + zatwierdza |
| **Accounting/Tax** | Struktura spółki, VAT, IP ownership | Księgowy / doradca | Founder zleca + zatwierdza |
| **Security audit** | Penetration testing, vulnerability assessment | Security expert | Founder zleca |
| **Design system** | Professional UI/UX design, brand identity | Designer | Founder briefuje + zatwierdza |

---

## Zakres zatwierdzeń

| Artefakt | Wymaga zatwierdzenia Founder? | Szybka ścieżka |
|----------|------------------------------|---------------|
| Dokument governance (01-10) | ✅ TAK | AI draft → Founder approve |
| Dokument legal (21-30) | ✅ TAK + adnotacja „needs legal" | AI draft → Founder approve + legal flag |
| Dokument product (31-50) | ✅ TAK | AI draft → Founder approve |
| Pull Request z kodem | ✅ TAK (merge) | AI implementuje → Founder reviews + merges |
| Deployment na produkcję | ✅ TAK | Checklist → Founder greenlight |
| Drobny fix (typo, env) | ⚠️ Opcjonalnie | AI może commitować; Founder review async |
| Odpowiedź na email/DM partnera | ✅ TAK | Founder = jedyny voice na zewnątrz |

---

## Rytm pracy

### Tygodniowy cykl

| Dzień | Founder focus | AI focus |
|-------|--------------|----------|
| **Poniedziałek** | Review: co zrobiono w ubiegłym tygodniu; plan na ten tydzień | Przygotuj weekly summary + proposed tasks |
| **Wtorek-Czwartek** | Deep work: review dokumentów, decyzje, strategia | Execution: dokumenty, kod, testy |
| **Piątek** | Review: co gotowe do merge; FDN decisions; risk check | Finalizacja: cleanup, commit, PR ready |
| **Weekend** | Opcjonalnie: wizja, inspiracja, networking | Brak (chyba że Founder zleci async task) |

### Rytm review

| Częstotliwość | Wydarzenie | Czas trwania |
|---------------|-----------|-------------|
| **Codziennie** | Quick scan: nowe commity, otwarte FDN | 15 min |
| **Co tydzień** | Weekly review: postęp vs plan, risk update, FDN batch | 1h |
| **Co 2 tygodnie** | Sprint review: bramki, milestone check, scope adjustment | 2h |
| **Co miesiąc** | Monthly strategic: roadmap vs reality, pivot decision | 2h |
| **Co kwartał** | Quarterly vision: direction, funding, team, market | 3h |

---

## Sposób pracy z AI

### Model współpracy

```
Founder (decyzja) → AI (execution) → Founder (review) → AI (polish) → Merge
```

### Zasady

1. **AI proponuje, Founder decyduje** — AI nigdy nie podejmuje decyzji strategicznych samodzielnie
2. **AI uzasadnia** — każda rekomendacja AI musi mieć uzasadnienie (nie „bo tak")
3. **Founder może odrzucić** — AI akceptuje bez dyskusji; notuje odrzucenie w Decision Register
4. **AI przypomina** — jeśli FDN bez decyzji >7 dni → AI przypomina
5. **AI nie pushuje do main** — Founder zawsze merguje (lub automatycznie po CI green + Founder approve)
6. **AI dokumentuje context** — po każdej sesji AI zapisuje progress do session memory

### Co AI robi dobrze (delegować)

- Drafty dokumentów, kodu, testów
- Analiza spójności i gap detection
- Refactoring i code cleanup
- Badanie opcji (np. NextAuth vs JWT pros/cons)
- Automatyzacja powtarzalnych tasków

### Czego AI nie robi (Founder only)

- Podejmowanie decyzji o scope, budżecie, partnerstwach
- Komunikacja zewnętrzna (investors, artists, brands)
- Zatwierdzanie compliance decisions
- Merge do main (operacyjnie AI może, ale Founder gatekeeps)

---

## Ryzyka przeciążenia Foundera

| # | Ryzyko | Sygnały | Mitygacja |
|---|--------|---------|-----------|
| R1 | **Review bottleneck** — zbyt wiele docs/PRs do review | >10 otwartych items; backlog rośnie | Batch review (5 docs/tydzień); AI pre-filter |
| R2 | **Decision fatigue** — zbyt wiele FDN naraz | >5 otwartych FDN; decisions deferred | Priorytetyzacja FDN; max 3 nowe/tydzień |
| R3 | **Context switching** — skakanie między docs, code, strategy, marketing | Brak deep work; fragmentacja | Tematyczne dni (wt=docs, śr=code, czw=strategy) |
| R4 | **24/7 mode** — praca non-stop bez przerw | Obniżona jakość decyzji; wypalenie | Hard stop: max 10h/dzień; weekendy opcjonalne |
| R5 | **Perfectionism** — review trwa za długo | Single doc review >2h | Timeboxing: 30 min/doc; „good enough" > perfect |

---

## Rekomendacje ochrony focusu

### TERAZ
1. **Max 3 FDN decyzji na tydzień** — reszta czeka lub AI stosuje rekomendację domyślną
2. **Batch review** — review 5 dokumentów w jednym bloku, nie po jednym
3. **AI pre-filtruje** — AI oznacza „ready for review" vs „still in progress"
4. **Tematyczne bloki** — nie mieszać docs review z code review w jednym bloku

### PÓŹNIEJ (przy teamie)
5. Delegować code review do Tech Lead
6. Delegować docs review do Project Manager
7. Founder focus: strategia + partnerstwa + wizja

### NIE TERAZ
8. Zatrudnianie przed MVP validation
9. Budowanie publicznego community management
10. Conference speaking / media appearances

---

## Founder Decision Notes

- [ ] **FDN-18**: Zatwierdzić tygodniowy rytm (weekly review w piątek vs poniedziałek)
- [ ] **FDN-19**: Zatwierdzić limit 3 FDN / tydzień
- [ ] **FDN-20**: Określić tematyczne dni (np. wt=docs, śr=code)

---

## Dokumenty zależne

- ← [02] Strategic Decision Register (zakres decyzji Founder)
- ← [04] Scope Boundaries (co Founder musi kontrolować)
- → [10] 90-Day Execution Alignment (harmonogram z uwzględnieniem rytmu Founder)
- → [30] Compliance Decision Matrix (podział: Founder / ops / legal)
