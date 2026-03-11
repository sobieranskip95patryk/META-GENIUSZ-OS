# 30 — Compliance Decision Matrix

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS |
| **Cel decyzji** | Rozdzielić decyzje operacyjne od wymagających konsultacji prawnej |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 21-29 (cały blok compliance & safety) |
| **Zależności wyjściowe** | — (dokument zamykający Falę 2A) |

---

## Executive Summary

Platforma operuje w wielu domenach regulacyjnych (GDPR, DSA, AI Act, prawo karne, prawo handlowe). Nie każda decyzja wymaga konsultacji prawnej — ale niektóre bezwzględnie tak. Ten dokument tworzy **macierz decyzyjną** wskazującą, które działania może samodzielnie zatwierdzić Founder, które operacje (moderator/admin), a które wymagają wsparcia prawnego. Macierz jest narzędziem operacyjnym — quick reference dla codziennych decyzji.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Podział decyzji ops/legal | ❌ Brak — ten dokument go tworzy |
| Prawnik zewnętrzny | ❌ Brak stałej współpracy |
| Procesy approval | ❌ Brak formalnych ścieżek |
| Compliance training | ❌ Brak |

---

## Klasy decyzyjne

| Klasa | Opis | Kto decyduje | Czas na decyzję |
|-------|------|-------------|-----------------|
| **FOUNDER** | Decyzje strategiczne i produktowe wpływające na compliance | Founder samodzielnie | Bez ograniczenia |
| **OPS** | Decyzje operacyjne w ramach ustalonych zasad | Moderator / Admin / System | Per SLA (doc 23, 29) |
| **LEGAL** | Decyzje wymagające oceny prawnej | Founder + prawnik zewnętrzny | Zależy od sprawy |
| **MIXED** | Decyzje wymagające koordynacji Founder + Legal + Ops | Founder z konsultacją | Per severity |

---

## Macierz decyzji — Legal Triggers

### Kiedy Founder decyduje samodzielnie

| Decyzja | Kontekst | Warunek |
|---------|----------|---------|
| Zatwierdzenie Community Guidelines | Tworzenie / update zasad treści | Nie wymaga prawnika jeśli wzorowane na standardach branżowych |
| Zmiana ToS (minor) | Korekty, doprecyzowania | Nie zmienia istoty umowy |
| Ban użytkownika (standard) | 3 strikes / clear violation | Procedura w doc 27, reason statement |
| Feature flag toggle | Włączenie/wyłączenie funkcji | Brak implikacji prawnych |
| Zmiana cen / planów | Pricing update | Z odpowiednim notice period (30 dni) |
| Wybór dostawcy (Railway, Vercel) | Tech decisions | Sprawdzić DPA availability |
| Akceptacja DPA (standardowe) | Railway, Vercel, Stripe | Standardowe warunki dostawców |
| Konfiguracja retencji danych | Zmiana okresów retencji | W ramach ustalonych zasad (doc 26) |
| Odpowiedź na user support ticket | Billing, account issues | Standard procedures |

### Kiedy Ops (Moderator/Admin) decyduje

| Decyzja | Kontekst | Warunek |
|---------|----------|---------|
| Moderacja treści (hide/delete) | Standard content violations | W ramach Content Policy (doc 27) + reason statement |
| Rozpatrzenie odwołania (appeal) | User appeal standard | W ramach DSA process (doc 23), inny moderator |
| Warning / strike | First/second offense | Per strike system (doc 27) |
| Temporary ban (7-30 dni) | 2 strikes w 90 dni | Per enforcement rules |
| Obsługa zgłoszenia (report) | Notice-and-action | Per SLA z doc 23 |
| Account restoration (z grace period) | User request w 30 dni | Automatyczny flow |

### Kiedy wymagana konsultacja prawna (LEGAL)

| Trigger | Decyzja | Dlaczego prawnik | Priorytet |
|---------|---------|-----------------|-----------|
| **Data breach** | Zgłoszenie do UODO (Art. 33) | Obowiązek prawny, kara za błąd | P0 — ≤72h |
| **Żądanie organów ścigania** | Udostępnienie danych użytkownika | Weryfikacja podstawy prawnej | P0 — per deadline |
| **Pozew sądowy** | Odpowiedź na pozew | Obowiązkowe | P0 — per termin procesowy |
| **Żądanie UODO** | Odpowiedź na kontrolę / skargę | Obowiązkowe | P0 — per termin |
| **CSAM wykryty** | Raport do organów | Obowiązek prawny + procedura | P0 — natychmiast |
| **ToS zmiana (major)** | Nowa wersja regulaminu | Zmiana istoty umowy | P1 |
| **Privacy Policy zmiana** | Update polityki prywatności | GDPR compliance | P1 |
| **Creator Agreement** | Nowy / zmiana umowy z twórcami | Prawa IP, payouts, prowizje | P1 |
| **DPIA** (dla L3, AI profiling) | Ocena skutków przetwarzania | GDPR Art. 35 | P2 |
| **Wejście na nowy rynek** | Expansion poza Polskę | Inne jurysdykcje | P2 |
| **IP dispute** (copyright claim) | Counter-notice lub obrona | Prawo autorskie | P1 |

### Kiedy decyzja mieszana (MIXED)

| Trigger | Uczestnicy decyzji | Opis |
|---------|--------------------|----|
| **Permanent ban kontrowersyjny** | Founder + Legal (jeśli publiczna osoba) | Ryzyko reputacyjne + prawne |
| **User GDPR deletion z legal hold** | Founder + Legal | Konflikt: right to erasure vs. legal preservation |
| **Zmiana modelu monetyzacji** | Founder + Legal + Finance | Compliance + contractual implications |
| **Partnership agreement** (B2B) | Founder + Legal | Umowa handlowa |
| **AI policy change** | Founder + Legal (AI Act) | Regulatory implications |
| **Response to press inquiry** | Founder + Legal + Comms | Reputation + legal exposure |

---

## Macierz decyzji — Moderation Triggers

| Sytuacja | Kto decyduje | Eskalacja do |
|----------|-------------|-------------|
| Spam detected | OPS (auto-filter / moderator) | — |
| Hate speech reported | OPS (moderator) | ADMIN jeśli szara strefa |
| CSAM reported | OPS (natychmiast usunięcie) | LEGAL (raport organom) |
| Copyright claim | OPS (notice-and-action) | LEGAL (jeśli counter-notice) |
| Grooming / exploitation (RFG) | OPS (ban) | LEGAL (raport policji) |
| Public figure complaint | FOUNDER | LEGAL |
| Mass reporting (brigading) | OPS (detect + hold) | FOUNDER (jeśli political) |
| AI-generated harmful content | OPS (usunięcie + strike) | FOUNDER (jeśli systemic) |

---

## Macierz decyzji — Payments Triggers

| Sytuacja | Kto decyduje | Eskalacja do |
|----------|-------------|-------------|
| Standard subscription charge | SYSTEM (automated) | — |
| Refund request (<50 PLN) | OPS | — |
| Refund request (>50 PLN) | OPS → FOUNDER | LEGAL (jeśli dispute) |
| Payout request (standard) | SYSTEM (L3 verified) | — |
| Payout freeze (fraud suspicion) | OPS → FOUNDER | LEGAL |
| Chargeback received | OPS + FOUNDER | LEGAL (jeśli >500 PLN) |
| Tax obligation question | — | LEGAL (always) |
| Payment provider change | FOUNDER | LEGAL (new DPA) |

---

## Macierz decyzji — Data Triggers

| Sytuacja | Kto decyduje | Eskalacja do |
|----------|-------------|-------------|
| User requests data export | SYSTEM (automated) | — |
| User requests account deletion | SYSTEM (automated + checks) | FOUNDER (jeśli legal hold) |
| Legal hold activation | FOUNDER | LEGAL (jeśli external request) |
| Legal hold release | FOUNDER + LEGAL | — |
| Data retention policy change | FOUNDER | LEGAL (GDPR review) |
| New data processor (DPA) | FOUNDER | LEGAL (review DPA) |
| Cross-border data transfer | FOUNDER | LEGAL (SCC / adequacy) |
| DPIA required | FOUNDER | LEGAL (conduct DPIA) |
| Subject access request (SAR) | SYSTEM → OPS | LEGAL (jeśli complex) |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────┐
│          COMPLIANCE DECISION QUICK GUIDE             │
├─────────────────┬───────────────────────────────────┤
│ "Mogę to zrobić │ Tak: standard moderation, bans,   │
│  sam(a)?"       │ feature toggles, pricing, reports  │
│ (OPS/FOUNDER)   │ per established procedures         │
├─────────────────┼───────────────────────────────────┤
│ "Muszę zapytać  │ Data breach, żądanie organów,     │
│  prawnika?"     │ pozew, ToS/PP major change,        │
│ (LEGAL)         │ CSAM, DPIA, new market, IP dispute│
├─────────────────┼───────────────────────────────────┤
│ "Kto jeszcze    │ Controversial bans, GDPR vs legal │
│  powinien       │ hold conflict, monetization change,│
│  wiedzieć?"     │ B2B agreements, press response     │
│ (MIXED)         │                                    │
└─────────────────┴───────────────────────────────────┘
```

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| CDM-01 | Founder podejmuje decyzję wymagającą prawnika | ŚREDNIE | WYSOKI | Ten dokument jako checklist + awareness |
| CDM-02 | Brak prawnika → opóźnienie decyzji LEGAL | WYSOKIE | WYSOKI | Nawiązać współpracę z prawnikiem przed launch |
| CDM-03 | Moderator eskaluje zbyt dużo (bottleneck) | ŚREDNIE | ŚREDNI | Jasne guidelines + case book + training |
| CDM-04 | Moderator nie eskaluje wystarczająco (CSAM) | NISKIE | KRYTYCZNY | Mandatory escalation dla P0 categories |
| CDM-05 | Nieaktualna macierz → złe decyzje | ŚREDNIE | ŚREDNI | Review macierzy co kwartał |

---

## Rekomendacja stosowania macierzy

> **Klasyfikacja TERAZ/PÓŹNIEJ**: N/A — niniejszy dokument jest macierzą referencyjną (decision routing matrix), nie deliverable’em scope. Wdrożenie klasyfikacji: Quick Reference Card → TERAZ, admin panel flowchart → v0.3, formal legal retainer → pre-launch.

### FOUNDER — działania natychmiastowe
1. Wydrukować / zbookmarkować Quick Reference Card
2. Nawiązać kontakt z prawnikiem (kancelaria z doświadczeniem tech/GDPR)
3. Poinformować przyszłych moderatorów o escalation triggers

### OPS — działania v0.3+
4. Escalation flowchart widoczny w admin panel
5. Mandatory escalation checklist przy P0 (CSAM, breach, grooming)
6. Case book z przykładami (budowany iteracyjnie)

### LEGAL — działania pre-launch
7. Retainer z prawnikiem (min. 2h/mies. na start)
8. Legal inbox: legal@meta-geniusz.com
9. DPA z głównymi procesorami (Railway, Vercel)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-82 | Czy nawiązać retainer z prawnikiem przed launch? | 🟡 DO DECYZJI | Rekomendacja: tak (2h/mies., ~500-1000 PLN) |
| FDN-83 | Refund threshold ops vs. founder: 50 PLN czy 100 PLN? | 🟡 DO DECYZJI | Rekomendacja: 50 PLN (niski próg na start) |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 21 — Legal Backbone | Wejście: legal stack, obowiązki |
| 22 — GDPR Map | Wejście: data triggers, SAR |
| 23 — DSA Readiness | Wejście: moderation decisions, SLA |
| 24 — AI Compliance | Wejście: AI policy decisions |
| 25 — Audit Trail | Wejście: logging requirements |
| 26 — Retention & Deletion | Wejście: data retention decisions |
| 27 — Content Policy | Wejście: moderation triggers |
| 28 — Verification Framework | Wejście: verification level decisions |
| 29 — Incident Response | Wejście: incident severity → decision class |
| 09 — Founder Operating Model | Wejście: founder decision scope |
