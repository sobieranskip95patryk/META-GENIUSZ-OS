# 23 — DSA Readiness Pack

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS / HHU / RFG |
| **Cel decyzji** | Przygotować platformę do obowiązków platformowych wynikających z Digital Services Act |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 21 (Legal Backbone), 27 (Content Policy) |
| **Zależności wyjściowe** | → 25 (Audit Trail), 29 (Incident Response), 30 (Compliance Matrix) |

---

## Executive Summary

Digital Services Act (Rozporządzenie UE 2022/2065) nakłada obowiązki na platformy hostingowe (Art. 6) i platformy online (Art. 16+). META-GENIUSZ OS jako platforma UGC z trojakim verticalem (HHU, RFG, AI Studio) kwalifikuje się jako **platforma online** z obowiązkami notice-and-action, reason statements, transparency i internal complaint handling. Ten dokument definiuje procedury i wymagania implementacyjne zapewniające zgodność z DSA od pierwszego publicznego launch.

> **Klasyfikacja DSA**: Platforma poniżej 45M MAU → obowiązki dla „platform online" (Sekcja 3, Art. 16-24), nie VLOP.

---

## Stan obecny

| Wymóg DSA | Status | Odniesienie |
|-----------|--------|------------|
| Notice-and-action (Art. 16) | ❌ Brak formularza zgłoszeniowego | — |
| Reason statements (Art. 17) | 🟡 Zaprojektowane w doc 20 (moderation queue) | ModerationAction.reason |
| Internal complaint handling (Art. 20) | ❌ Brak procesu odwołań | — |
| Transparent moderation rules (Art. 14) | ❌ Brak Community Guidelines | Planned: L4 (doc 21) |
| Trusted flaggers cooperation (Art. 22) | ❌ Brak | — |
| Measures against misuse (Art. 23) | ❌ Brak | — |
| Annual transparency report (Art. 15) | N/A (wymóg od 2. roku) | — |
| Point of contact (Art. 11-12) | ❌ Brak | — |

---

## Obowiązki startowe (v0.2–v0.3)

### 1. Notice-and-Action — Art. 16

**Cel**: Umożliwić każdemu zgłoszenie treści uznawanych za nielegalne.

#### Formularz zgłoszenia (Notice)

Wymagane pola (Art. 16(2)):
- Uzasadnienie, dlaczego treść jest nielegalna
- Jasne wskazanie lokalizacji treści (URL / ID posta)
- Imię i nazwisko lub nazwa zgłaszającego
- Oświadczenie o dobrej wierze (good faith declaration)

#### Workflow zgłoszenia

```
1. User → POST /reports { postId, reason, category, description, goodFaith: true }
2. System → tworzy Report(status: PENDING)
3. Moderator → przegląda w Admin Panel (doc 20)
4. Moderator → decyzja: APPROVE (odrzuć report) | HIDE | DELETE | BAN_AUTHOR | ESCALATE
5. System → generuje Reason Statement (Art. 17)
6. System → notyfikuje:
   a) autora treści (jeśli action != APPROVE)
   b) zgłaszającego (wynik zgłoszenia)
7. System → loguje ModerationAction w audit trail (doc 25)
```

#### Kategorie zgłoszeń

| Kategoria | Opis | Priorytet |
|-----------|------|-----------|
| ILLEGAL_CONTENT | Treści naruszające prawo (mowa nienawiści, groźby, CSAM) | P0 — natychmiast |
| IP_VIOLATION | Naruszenie praw autorskich / znaków towarowych | P1 — 24h |
| HARASSMENT | Nękanie, stalking, doxxing | P0 — natychmiast |
| SPAM | Spam, scam, phishing | P1 — 24h |
| IMPERSONATION | Podszywanie się pod inną osobę | P1 — 24h |
| MISINFORMATION | Dezinformacja (weryfikacja ręczna) | P2 — 72h |
| OTHER | Inne naruszenie regulaminu | P2 — 72h |

#### SLA moderacji

| Priorytet | Czas reakcji | Uzasadnienie |
|-----------|-------------|--------------|
| P0 (ILLEGAL, HARASSMENT) | ≤ 4h | Treść potencjalnie nielegalna |
| P1 (IP, SPAM, IMPERSONATION) | ≤ 24h | Szkoda reputacyjna |
| P2 (MISINFORMATION, OTHER) | ≤ 72h | Ocena kontekstowa |

---

### 2. Reason Statements — Art. 17

**Cel**: Każda decyzja moderacyjna ograniczająca widoczność lub usuwająca treść musi być uzasadniona.

#### Wymagane elementy reason statement

| Element | Opis | Pole w systemie |
|---------|------|-----------------|
| Rodzaj ograniczenia | Co zostało zrobione (ukrycie / usunięcie / ban) | ModerationAction.type |
| Podstawa | Naruszony przepis regulaminu lub prawa | ModerationAction.legalBasis |
| Uzasadnienie | Opis dlaczego treść narusza zasady | ModerationAction.reason |
| Zakres | Które fragmenty treści są problematyczne | ModerationAction.scope |
| Informacja o odwołaniu | Jak autor może się odwołać | Automatyczny footer |
| Data i czas | Kiedy podjęto decyzję | ModerationAction.createdAt |

#### Template reason statement

```
Twoja treść [POST-ID] została [ukryta/usunięta] z powodu naruszenia
[Community Guidelines § X / Art. Y ustawy Z].

Uzasadnienie: [opis naruszenia].

Masz prawo złożyć odwołanie w ciągu 14 dni od tej decyzji.
Formularz odwołania: [link do /appeals]

Data decyzji: [YYYY-MM-DD HH:MM UTC]
```

---

### 3. Internal Complaint Handling — Art. 20

**Cel**: Użytkownicy, których treści zostały ograniczone, muszą mieć możliwość odwołania.

#### Workflow odwołania (Appeal)

```
1. User → POST /appeals { moderationActionId, reason }
   - Dostępne w ciągu 14 dni od decyzji
   - Jedno odwołanie per decyzja
2. System → tworzy Appeal(status: PENDING)
3. Inny moderator (niż decydujący) → review
4. Moderator → decyzja: UPHOLD (utrzymać) | REVERSE (cofnąć) | MODIFY
5. System → Reason Statement dla odwołania
6. System → notyfikuje usera
7. User → informacja o prawie do out-of-court dispute (Art. 21)
```

#### Zasady odwołań

| Zasada | Wartość |
|--------|---------|
| Termin na odwołanie | 14 dni od decyzji |
| Kto rozpatruje | Inny moderator niż autor decyzji |
| Czas na rozpatrzenie | ≤ 7 dni |
| Możliwość ponownego odwołania | Nie (Art. 20(4) → Art. 21 pozasądowe) |
| Informacja o out-of-court | Tak — link w finalization statement |

---

### 4. Transparency — Art. 14-15

#### Art. 14: Terms of Service

Platforma musi publikować:
- Community Guidelines (→ L4, doc 21)
- Notice-and-action procedure opis
- Policy dotyczące algorytmicznej rekomendacji
- Informacja o prawie odwołania

> **Implementacja**: Strona `/terms`, `/community-guidelines`, `/report-policy`

#### Art. 15: Transparency Report (od 2. roku)

Raport roczny zawierający:
- Liczbę zgłoszeń notice-and-action
- Liczbę decyzji moderacyjnych per kategoria
- Średni czas rozpatrywania
- Liczbę odwołań i ich wyniki
- Informację o automatycznych narzędziach moderacji (jeśli stosowane)

> **v0.2–v0.4**: Zbieranie danych (ModerationAction, Appeal). **v1.0**: Generowanie raportu automatycznie z bazy.

---

### 5. Point of Contact — Art. 11-12

| Wymóg | Rozwiązanie |
|-------|------------|
| Art. 11: Contact for authorities | Email: legal@meta-geniusz.com |
| Art. 12: Contact for users | Email: support@meta-geniusz.com + formularz /contact |
| Język | Polski + angielski |
| Reprezentant (jeśli brak siedziby w EU) | N/A — siedziba w Polsce |

---

## Obowiązki wzrostowe (v0.4–v1.0)

### 6. Trusted Flaggers — Art. 22

| Element | Rozwiązanie | Faza |
|---------|------------|------|
| Priorytetowe traktowanie zgłoszeń od trusted flaggers | Flag `isTrustedFlagger` na User → priority queue | v0.5 |
| Weryfikacja statusu trusted flagger | Manual approval by SUPER_ADMIN | v0.5 |
| Raportowanie nadużyć przez trusted flaggers | Audit + możliwość cofnięcia statusu | v0.5 |

### 7. Measures Against Misuse — Art. 23

| Nadużycie | Mitygacja | Faza |
|-----------|-----------|------|
| Masowe fałszywe zgłoszenia | Rate-limit: max 10 reports / user / 24h | v0.3 |
| Powtarzające się naruszenia | Strike system: 3 strikes → ban | v0.4 |
| Nadużywanie odwołań | Max 1 appeal per decision | v0.3 |
| Automated / bot reports | CAPTCHA na formularzu + anomaly detection | v0.5 |

---

## Obowiązki późniejsze (v1.0+)

| Wymóg | Trigger | Faza |
|-------|---------|------|
| VLOP obligations (Art. 33+) | >45M EU MAU | Scale (jeśli osiągniemy) |
| Algorithmic audit | VLOP only | N/A |
| Systemic risk assessment | VLOP only | N/A |
| Ad transparency database | Jeśli reklamy | v1.0+ |

---

## Mapa implementacji technicznej

### Encje do dodania (rozszerzenie doc 19)

```
Report {
  id          UUID
  reporterId  UUID → User
  postId      UUID → Post
  category    ENUM(ILLEGAL_CONTENT, IP_VIOLATION, HARASSMENT, SPAM, IMPERSONATION, MISINFORMATION, OTHER)
  description TEXT
  goodFaith   BOOLEAN
  status      ENUM(PENDING, IN_REVIEW, RESOLVED)
  createdAt   DateTime
  resolvedAt  DateTime?
}

ModerationAction {
  id          UUID
  reportId    UUID → Report
  moderatorId UUID → User
  type        ENUM(APPROVE, HIDE, DELETE, BAN_AUTHOR, ESCALATE)
  reason      TEXT (required — DSA Art. 17)
  legalBasis  TEXT?
  scope       TEXT?
  createdAt   DateTime
}

Appeal {
  id                  UUID
  moderationActionId  UUID → ModerationAction
  appellantId         UUID → User
  reason              TEXT
  status              ENUM(PENDING, UPHELD, REVERSED, MODIFIED)
  reviewerId          UUID? → User
  reviewReason        TEXT?
  createdAt           DateTime
  resolvedAt          DateTime?
}
```

### Endpoints do zaimplementowania

| Endpoint | Metoda | Faza | Auth |
|----------|--------|------|------|
| /reports | POST | v0.3 | L1+ (email verified) |
| /reports/:id | GET | v0.3 | Reporter / Moderator |
| /admin/reports | GET (list) | v0.3 | MODERATOR+ |
| /admin/reports/:id/action | POST | v0.3 | MODERATOR+ |
| /appeals | POST | v0.3 | User (author of moderated content) |
| /admin/appeals | GET (list) | v0.3 | MODERATOR+ |
| /admin/appeals/:id/review | POST | v0.3 | MODERATOR+ (not original decider) |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| DSA-01 | Launch bez notice-and-action → naruszenie DSA Art. 16 | ŚREDNIE | WYSOKI | Wdrożyć /reports + admin queue przed public beta |
| DSA-02 | Reason statements zbyt ogólnikowe | ŚREDNIE | ŚREDNI | Template z obowiązkowymi polami |
| DSA-03 | Brak odwołań → naruszenie Art. 20 | ŚREDNIE | WYSOKI | Wdrożyć /appeals flow w v0.3 |
| DSA-04 | Moderator overload przy wzroście | WYSOKIE | ŚREDNI | Auto-detection + trusted flaggers w v0.5 |
| DSA-05 | Fałszywe zgłoszenia zalewające queue | NISKIE | ŚREDNI | Rate-limit + abuse detection |

---

## Rekomendacja wdrożeniowa

### OBOWIĄZKI STARTOWE (v0.2–v0.3) — blokują launch
1. Formularz /reports z kategoriami i good-faith declaration
2. Admin moderation queue z obowiązkowymi reason statements
3. Notyfikacje do autora i zgłaszającego
4. Community Guidelines na /community-guidelines
5. Point of contact: legal@ i support@
6. Rate-limit na zgłoszenia (10/24h)

### OBOWIĄZKI WZROSTOWE (v0.4–v1.0) — blokują scaling
7. Appeal flow z oddzielnym moderatorem
8. Strike system (3 strikes)
9. Trusted flaggers program
10. Transparency data collection → roczny raport

### OBOWIĄZKI PÓŹNIEJSZE
11. VLOP obligations — tylko przy >45M MAU
12. Algorithmic transparency — przy wdrożeniu AI rekomendacji
13. Ad transparency — przy monetyzacji reklamowej

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-63 | Czy wdrożyć appeal flow od v0.3 czy v0.4? | ✅ APPROVED | v0.3 — DSA wymaga (Art. 20). Zamknięte w G2A |
| FDN-64 | Strike system: 3 strikes, 5 strikes czy progressive? | ✅ APPROVED | 3 strikes (standard branżowy, spójne z doc 27). Zamknięte w G2A |
| FDN-65 | Czy automatyczna moderacja (AI content detection) w scope MVP? | ✅ APPROVED | Nie — manual moderation w MVP, AI detection w v0.5 (spójne z FDN-76). Zamknięte w G2A |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 21 — Legal Backbone | Wejście: legal requirements, L4/L6 docs |
| 27 — Content Policy | Wejście: zasady treści (co dozwolone/zabronione) |
| 20 — Admin & Backoffice | Wejście: moderation queue, reason statements |
| 18 — Identity & Roles | Wejście: role moderatora, permissions |
| 19 — Master Domain Model | Wejście: Report, ModerationAction entities |
| 25 — Evidence & Audit Trail | Wyjście: logowanie decyzji |
| 29 — Incident Response | Wyjście: eskalacja ILLEGAL_CONTENT |
| 30 — Compliance Decision Matrix | Wyjście: podział decyzji ops/legal |
