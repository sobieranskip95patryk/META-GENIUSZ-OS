# [07] Documentation Governance Protocol

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Protokół ustala zasady tworzenia, numeracji, wersjonowania, zatwierdzania i aktualizacji dokumentów projektowych META-GENIUSZ OS. Każdy dokument w `docs/` musi spełniać wymagania tego protokołu. Bez formalnych zasad zarządzania dokumentacją repo szybko staje się nieczytelne.

---

## Stan obecny

Dotychczas docs/ zawierał 7 plików bez spójnego formatu, numeracji ani statusów. Dokumenty z D:\1 miały inną strukturę niż repo. Niniejszy protokół standaryzuje wszystko.

---

## Model dokumentacji

### Struktura folderów docs/

```
docs/
├── governance/          ← Rejestry, protokoły, zasady (01-10)
├── architecture/        ← Architektura techniczna i systemowa (11-20)
├── product/             ← Specyfikacje produktowe, MVP, vertical specs
├── legal/               ← Compliance, GDPR, DSA, AI Act (21-30)
├── safety/              ← Trust & Safety, content policy, incidents
├── business/            ← Monetyzacja, model biznesowy, partnerstwa
├── marketing/           ← GTM, kampanie, brand
├── operations/          ← Founder model, 90-day plan
├── roadmap/             ← Roadmap wersji
├── vision/              ← Misja, wizja
├── brand/               ← Design system, brand guidelines
└── api/                 ← Dokumentacja API (OpenAPI)
```

### Naming convention

```
[NN]-kebab-case-name.md

Przykłady:
01-master-project-corpus-audit.md
02-strategic-decision-register.md
33-hhu-mvp-scope-v1.md
```

- **[NN]** = numer z wytycznych (01-50)
- **kebab-case** = lowercase, myślniki, bez spacji
- **.md** = zawsze Markdown
- Dokumenty nienumerowane (istniejące): zachowują obecne nazwy (mvp.md, roadmap.md)

### Nagłówek obowiązkowy

Każdy dokument musi zaczynać się od:

```markdown
# [NN] Tytuł dokumentu

> Projekt: META-GENIUSZ OS | Wersja: X.Y | Data: YYYY-MM-DD | Status: **STATUS**
```

---

## Statusy dokumentów

| Status | Znaczenie | Kto zmienia |
|--------|-----------|-------------|
| **DRAFT** | Dokument w trakcie tworzenia | Autor (AI lub Founder) |
| **REVIEW** | Gotowy do przeglądu Founder | Autor → Founder |
| **APPROVED** | Zatwierdzony i obowiązujący | Founder |
| **SUPERSEDED** | Zastąpiony nowszą wersją | Founder przy update |
| **DEPRECATED** | Nieaktualny, do archiwizacji | Founder |

### Przepływ statusów

```
DRAFT → REVIEW → APPROVED
                    ↓
              SUPERSEDED (przy update)
              DEPRECATED (przy wycofaniu)
```

---

## Owner dokumentu

| Folder | Default Owner | Backup |
|--------|--------------|--------|
| governance/ | Founder | AI (draft) |
| architecture/ | Founder + Tech Lead | AI (draft) |
| product/ | Founder | AI (draft) |
| legal/ | Founder + Legal Advisor | AI (draft, non-binding) |
| safety/ | Founder | AI (draft) |
| business/ | Founder | AI (draft) |
| marketing/ | Founder | AI (draft) |
| operations/ | Founder | AI (draft) |

---

## Review flow

1. **AI tworzy DRAFT** → commit z message: `docs: add [NN] document-name (DRAFT)`
2. **Founder review** → reads, comments, requests changes
3. **AI updates** → commit z message: `docs: update [NN] document-name based on review`
4. **Founder approves** → status zmienia się na APPROVED
5. **Commit final** → `docs: approve [NN] document-name v1.0`

### Review timeline

| Typ dokumentu | Max czas review | Eskalacja |
|---------------|----------------|-----------|
| Governance (01-10) | 3 dni robocze | AI reminder |
| Architecture (11-20) | 5 dni roboczych | AI reminder |
| Legal/Safety (21-30) | 7 dni roboczych | Opóźnia milestone |
| Product/Business (31-50) | 5 dni roboczych | AI reminder |

---

## Approval flow

- **Governance (01-10)**: Wymaga zatwierdzenia Founder
- **Architecture (11-20)**: Wymaga zatwierdzenia Founder (+ Tech Lead jeśli onboarded)
- **Legal (21-30)**: Wymaga zatwierdzenia Founder + adnotacja „non-binding, needs legal review"
- **Product (31-50)**: Wymaga zatwierdzenia Founder

---

## Wersjonowanie

| Zmiana | Wersja | Przykład |
|--------|--------|---------|
| Nowy dokument | v1.0 | Pierwsza wersja |
| Drobna aktualizacja (fix, typo) | v1.1 | Korekta tabeli |
| Istotna zmiana treści | v2.0 | Przepisanie sekcji scope |
| Status zmiana | Bez zmiany wersji | DRAFT → APPROVED |

### Changelog w dokumencie (opcjonalny)

```markdown
## Changelog
| Wersja | Data | Opis zmiany |
|--------|------|-------------|
| 1.0 | 2026-03-11 | Pierwsza wersja |
| 1.1 | 2026-03-15 | Aktualizacja tabeli ryzyk |
```

---

## Archiwizacja

- Dokumenty DEPRECATED przenoszone do `docs/_archive/`
- Dokumenty SUPERSEDED: nowa wersja zastępuje starą; stara do `docs/_archive/`
- `docs/_archive/` nie jest usuwane — serves as audit trail

---

## Sekcje obowiązkowe (Definition of Done)

Każdy dokument z wytycznych (01-50) **MUSI** zawierać:

| Sekcja | Obowiązkowa | Opis |
|--------|-------------|------|
| Executive Summary | ✅ TAK | 2-4 zdania: co, po co, jaki wpływ |
| Stan obecny | ✅ TAK | Gdzie jesteśmy przed tym dokumentem |
| Treść merytoryczna | ✅ TAK | Główna zawartość (tabele, graf, spec) |
| Klasyfikacja TERAZ/PÓŹNIEJ/ODRZUCIĆ | ✅ TAK | Jawny podział priorytetów |
| Ryzyka | ✅ TAK | Min. 2 ryzyka z mitygacją |
| Founder Decision Notes | ✅ TAK | Decyzje wymagające zatwierdzenia |
| Dokumenty zależne | ✅ TAK | Referencje ← wejściowe i → wyjściowe |

---

## Rekomendacje governance

> **Uwaga**: Poniższa klasyfikacja używa OBOWIĄZKOWE/ZALECANE/ZBĘDNE jako funkcjonalnego odpowiednika TERAZ/PÓŹNIEJ/ODRZUCIĆ — dotyczy reguł governance, nie scope'u produktowego.

### OBOWIĄZKOWE (= TERAZ)
1. Każdy nowy dokument musi przejść flow DRAFT → REVIEW → APPROVED
2. Każdy dokument musi mieć nagłówek z wersją, datą i statusem
3. Każdy dokument musi zawierać sekcje obowiązkowe (DoD)
4. Commit messages muszą zaczynać się od `docs:`

### ZALECANE (= PÓŹNIEJ)
5. Aktualizacja dokumentu = bump version + changelog entry
6. Cross-references między dokumentami przez `[NN]` notation
7. Review w batch (po 5 dokumentów) zamiast pojedynczo

### ZBĘDNE
8. Formalne podpisy elektroniczne (za wcześnie)
9. Automatyczne rendering docs → website (za wcześnie)
10. Tłumaczenia EN/PL każdego dokumentu (PL wystarczy na teraz)

---

## Ryzyka

| # | Ryzyko | Mitygacja |
|---|--------|-----------|
| R1 | Dokumenty tworzone bez protokołu | Checklist DoD w PR template |
| R2 | Founder nie review'uje w terminie | AI reminder; default approve po 7 dniach dla nie-legal docs |
| R3 | Protokół staje się barierą dla szybkich zmian | Drobne aktualizacje (typo, fix) nie wymagają full review |

---

## Founder Decision Notes

- [ ] **FDN-14**: Zatwierdzić model review: Founder review vs delegacja do AI auto-approve (non-legal)
- [ ] **FDN-15**: Zatwierdzić timeline review: 3/5/7 dni

---

## Dokumenty zależne

- ← [01] Master Project Corpus Audit (mapa dokumentów)
- → [08] Documentation Roadmap Master (harmonogram stosujący ten protokół)
- → Wszystkie dokumenty 01-50 (muszą spełniać DoD z tego protokołu)
