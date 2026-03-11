# 29 — Incident Response Framework

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS |
| **Cel decyzji** | Ustalić procedury reakcji na incydenty techniczne, fraudowe, moderatorskie, prawne i reputacyjne |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 06 (Risk Register), 27 (Content Policy) |
| **Zależności wyjściowe** | → 30 (Compliance Decision Matrix) |

---

## Executive Summary

Platforma UGC z monetyzacją i AI musi być przygotowana na incydenty: awarie techniczne, wycieki danych, fraud, kryzys moderacyjny, naruszenie prawa i problemy reputacyjne. Ten dokument definiuje **klasy incydentów**, ownershp, drabinkę eskalacji, zasady komunikacji, macierz decyzyjną i procedury post-incydentowe. Framework integruje wymagania DSA (notice-and-action SLA), GDPR (breach notification 72h) i wewnętrzne potrzeby operacyjne.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Procedura incydentowa | ❌ Brak — ten dokument ją tworzy |
| On-call / duty schedule | ❌ Brak (solo founder) |
| Status page | ❌ Brak |
| Monitoring / alerting | ❌ Brak |
| Breach notification process | ❌ Brak |
| Communication templates | ❌ Brak |
| Post-mortem process | ❌ Brak |

---

## Klasy incydentów

### KRYTYCZNE (P0) — natychmiastowa reakcja

| ID | Typ | Przykłady | SLA reakcji | SLA rozwiązania |
|----|-----|-----------|-------------|-----------------|
| IC-01 | **Data breach** | Wyciek bazy danych, nieautoryzowany dostęp | <1h | <24h |
| IC-02 | **CSAM na platformie** | Child exploitation material | <30 min | <1h (usunięcie + raport) |
| IC-03 | **Platforma niedostępna** (total outage) | API/frontend down | <30 min | <4h |
| IC-04 | **Payment system compromise** | Nieautoryzowane transakcje, Stripe breach | <1h | <8h |
| IC-05 | **Grooming / exploitation (RFG)** | Predatory behavior wykryte | <1h | <4h (ban + raport) |

### WYSOKIE (P1) — szybka reakcja

| ID | Typ | Przykłady | SLA reakcji | SLA rozwiązania |
|----|-----|-----------|-------------|-----------------|
| IH-01 | **Masowy spam / bot attack** | 1000+ fake accounts w krótkim czasie | <2h | <8h |
| IH-02 | **Partial outage** | Jeden vertical down, API degraded | <1h | <4h |
| IH-03 | **Coordinated harassment** | Organized brigading / doxxing campaign | <2h | <24h |
| IH-04 | **Fraud / scam wykryty** | Fake casting (RFG), ponzi scheme | <4h | <24h |
| IH-05 | **Legal notice received** | Pozew, nakaz sądowy, żądanie UODO | <4h | <48h (legal review) |
| IH-06 | **API key / secret leak** | Klucze w public repo, logs | <1h | <2h (rotate keys) |

### STANDARDOWE (P2) — normalna reakcja

| ID | Typ | Przykłady | SLA reakcji | SLA rozwiązania |
|----|-----|-----------|-------------|-----------------|
| IS-01 | **Bug wpływający na UX** | Feature broken, intermittent errors | <8h | <48h |
| IS-02 | **Content policy violation (non-P0)** | Spam, misinformation, minor ToS violation | <24h | <72h |
| IS-03 | **User complaint / support ticket** | Account issue, billing dispute | <24h | <72h |
| IS-04 | **Performance degradation** | Slow response, high latency | <8h | <48h |
| IS-05 | **Third-party service issue** | Provider outage (Vercel, Railway) | <2h | Depends on provider |

---

## Ownership — kto odpowiada

### Faza MVP (Solo Founder + AI)

| Rola | Osoba | Odpowiedzialność |
|------|-------|-----------------|
| **Incident Commander** | Founder (Patryk) | Koordynacja, decyzje, komunikacja |
| **Technical Lead** | Founder + AI Copilot | Diagnoza, fix, deploy |
| **Communications** | Founder | Status updates, user notifications |
| **Legal Liaison** | Founder → prawnik zewnętrzny | GDPR breach, pozwy, organy |

### Faza Growth (Team)

| Rola | Osoba | Odpowiedzialność |
|------|-------|-----------------|
| Incident Commander | On-call engineer / CTO | Koordynacja |
| Technical Lead | Backend/infra engineer | Diagnoza, fix |
| Moderation Lead | Content moderator / T&S | Content incidents |
| Communications | Product / Community manager | Status updates |
| Legal Liaison | Legal counsel (external / in-house) | GDPR, DSA, organy |

---

## Drabinka eskalacji (Escalation Ladder)

```
L1: Automated Detection / User Report
  │
  ├── [P2: standardowy] → Moderator / On-call resolves
  │
  ├── [P1: wysoki] → Moderator / Engineer → notyfikacja Founder
  │                   → Founder podejmuje decyzję w <4h
  │
  └── [P0: krytyczny] → NATYCHMIAST notyfikacja Founder
                        → Founder = Incident Commander
                        → Eskalacja Legal (jeśli breach / CSAM / legal)
                        → Komunikacja do użytkowników (jeśli outage / breach)
```

### Kanały eskalacji

| Level | Kanał | Kto powiadamiany |
|-------|-------|-----------------|
| P2 | Dashboard / email | Moderator on-duty |
| P1 | Push notification + email | Founder + tech lead |
| P0 | Phone call + push + email | Founder (natychmiast) |

---

## Zasady komunikacji (Communication Rules)

### Komunikacja wewnętrzna

| Zasada | Opis |
|--------|------|
| **Single source of truth** | Incydent dokumentowany w jednym miejscu (incident log) |
| **Timeline updates** | Co 30 min (P0) / co 2h (P1) / co 8h (P2) |
| **Need-to-know** | Tylko zaangażowane osoby mają dostęp do szczegółów |
| **No blame** | Post-mortem skupia się na procesie, nie na osobie |

### Komunikacja zewnętrzna (do użytkowników)

| Typ incydentu | Czy komunikować? | Kanał | Timing |
|---------------|-----------------|-------|--------|
| Total outage | ✅ Tak | Status page + social media | W ciągu 30 min |
| Partial outage | ✅ Tak (jeśli >1h) | Status page | W ciągu 1h |
| Data breach | ✅ Tak (GDPR Art. 34) | Email + in-app | W ciągu 72h |
| CSAM / grooming | ❌ Nie publicly | Raport do organów | Natychmiast |
| Moderation controversy | 🟡 Case-by-case | Social media / blog | Po review |
| Bug fix | ❌ Nie (chyba że user-facing) | Release notes | — |

### GDPR Breach Notification — Art. 33/34

| Krok | Timing | Odbiorca | Treść |
|------|--------|----------|-------|
| 1. Identyfikacja breach | ASAP | Internal | — |
| 2. Zgłoszenie do UODO | ≤ 72h od identyfikacji | Prezes UODO | Charakter naruszenia, kategorie danych, środki zaradcze |
| 3. Notyfikacja użytkowników (jeśli high risk) | Bez zbędnej zwłoki | Affected users (email) | Co się stało, jakie dane, co robimy, co user może zrobić |

---

## Macierz decyzyjna (Decision Matrix)

| Decyzja | P0 | P1 | P2 |
|---------|----|----|-----|
| Wyłączenie serwisu | Founder | Founder | N/A |
| Ban użytkownika | Founder / Moderator | Moderator / Admin | Moderator |
| Raport do policji | Founder | Founder | N/A |
| Raport do UODO | Founder + Legal | Founder + Legal | N/A |
| Komunikacja publiczna | Founder | Founder | N/A |
| Rotacja kluczy / secrets | Founder / Tech | Founder / Tech | Tech |
| Rollback deployment | Founder / Tech | Tech | Tech |
| Zawiadomienie procesora (Railway/Vercel) | Founder | Tech | Tech |

---

## Procedura per typ incydentu

### Procedura: Data Breach (IC-01)

```
1. DETECT  — monitoring alert / user report / external notification
2. CONTAIN — identify scope, isolate affected systems, revoke compromised tokens
3. ASSESS  — what data? how many users? severity?
4. NOTIFY  — UODO (≤72h), affected users (if high risk), processors
5. REMEDIATE — patch vulnerability, rotate keys, strengthen controls
6. DOCUMENT — incident log, timeline, evidence (doc 25)
7. REVIEW  — post-mortem within 7 days
```

### Procedura: CSAM (IC-02)

```
1. DETECT  — user report / automated scan
2. REMOVE  — natychmiast (<1h) — do NOT copy/save content
3. PRESERVE — metadata only (hash, timestamp, uploader ID) for law enforcement
4. BAN     — permanent ban uploader
5. REPORT  — raport do Fundacji Dajemy Dzieciom Siłę / NCMEC / policja
6. DOCUMENT — incident log (NO content stored)
7. LEGAL   — cooperate with law enforcement
```

### Procedura: Platform Outage (IC-03)

```
1. DETECT  — monitoring alert / user reports
2. DIAGNOSE — check provider status (Vercel, Railway), check logs
3. COMMUNICATE — status page update within 30 min
4. RESOLVE — fix or wait for provider recovery
5. VERIFY  — full health check after recovery
6. COMMUNICATE — resolution notice
7. REVIEW  — post-mortem if >1h downtime
```

### Procedura: Legal Notice (IH-05)

```
1. RECEIVE — email / mail / court notice
2. ASSESS  — Founder reviews, forwards to legal counsel
3. PRESERVE — legal hold on relevant data (doc 25)
4. RESPOND — within deadline (varies: 14-30 days typically)
5. IMPLEMENT — required changes (if court order)
6. DOCUMENT — legal log, decision record
```

---

## Post-Incident Review (Post-Mortem)

| Element | Opis |
|---------|------|
| **Timing** | W ciągu 7 dni od resolution (P0/P1), 14 dni (P2). Rozpoczęcie: natychmiast po zamknięciu incydentu |
| **Format** | Dokument: Timeline → Root cause → Impact → Actions → Lessons |
| **Attendees** | Incident Commander + involved parties |
| **Deliverables** | Action items z ownerami i deadline'ami |
| **No-blame policy** | Fokus na proces i system, nie na osobę |
| **Storage** | `docs/incidents/YYYY-MM-DD-[slug].md` |

### Post-mortem template

```markdown
# Incident: [short description]
- Date: YYYY-MM-DD
- Severity: P0 / P1 / P2
- Duration: Xh Ym
- Commander: [name]

## Timeline
- HH:MM — [event]

## Root Cause
[description]

## Impact
- Users affected: N
- Data exposed: Y/N
- Revenue impact: $X

## Resolution
[what was done]

## Action Items
| # | Action | Owner | Deadline | Status |
```

---

## Mapowanie DSA (doc 23) → Incident Classes

> **Uwaga G2A**: Gdy naruszenie DSA (doc 23) generuje jednocześnie incydent bezpieczeństwa, stosować BARDZIEJ RESTRYKCYJNE SLA z niniejszego dokumentu.

| Kategoria DSA (doc 23) | SLA doc 23 | Klasa incydentu (doc 29) | SLA doc 29 | Stosowane SLA |
|------------------------|------------|--------------------------|------------|---------------|
| ILLEGAL_CONTENT (CSAM) | ≤ 4h | IC-02 (CSAM) | <30min / <1h | **IC-02 (<1h)** |
| ILLEGAL_CONTENT (inne) | ≤ 4h | IS-02 (non-P0 violation) | <24h / <72h | **DSA (≤4h)** |
| HARASSMENT (grooming) | ≤ 4h | IC-05 (Grooming) | <1h / <4h | **IC-05 (<4h)** |
| HARASSMENT (brigading) | ≤ 24h | IH-03 (Coordinated) | <2h / <24h | **IH-03 (<24h)** |
| SPAM | ≤ 72h | IH-01 (mass spam) / IS-02 | <2h-24h | **Wg klasy** |
| FRAUD | ≤ 24h | IH-04 (Fraud/scam) | <4h / <24h | **IH-04 (<24h)** |

**Zasada**: DSA SLA to *minimum* compliance. Operacyjne SLA (doc 29) mogą być krótsze. Nigdy nie stosować SLA dłuższego niż DSA wymaga.

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| IR-01 | Solo founder = single point of failure dla incident response | WYSOKIE | KRYTYCZNY | Documented procedures + AI copilot support + phone backup |
| IR-02 | Brak monitoringu → incydent wykryty z opóźnieniem | WYSOKIE | WYSOKI | Wdrożyć basic monitoring (uptime check + error alerts) w v0.2 |
| IR-03 | GDPR breach notification >72h → kara UODO | NISKIE | KRYTYCZNY | Procedura breach z timeline (ten dokument) |
| IR-04 | CSAM nie wykryty (brak auto-scan) | NISKIE | KRYTYCZNY | User reports + manual moderation → auto-scan w v0.5 |
| IR-05 | Panic response → złe decyzje pod presją | ŚREDNIE | WYSOKI | Playbooki per typ incydentu (ten dokument) |

---

## Rekomendacja wdrożeniowa

### INCYDENTY KRYTYCZNE — gotowość na v0.2
1. Playbooki: data breach, CSAM, outage (ten dokument)
2. Monitoring uptime (UptimeRobot — free tier)
3. Error alerting (Sentry free tier / Railway logs)
4. Kontakt do prawnika zewnętrznego (na wypadek breach / legal)
5. Status page (proste: statuspage.io free lub GitHub Pages)

### INCYDENTY WYSOKIE — gotowość na v0.3
6. Incident log template w `docs/incidents/`
7. Post-mortem process
8. Legal hold integration (doc 25)
9. Communication templates (outage, breach, moderation)

### INCYDENTY STANDARDOWE — gotowość na v0.5
10. On-call schedule (gdy team >1)
11. Automated alerting per severity
12. Incident dashboard w admin panel

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-79 | Monitoring stack: Sentry vs Datadog vs basic (UptimeRobot + Railway logs)? | 🟡 DO DECYZJI | Rekomendacja: UptimeRobot (free) + Sentry (free tier) na start |
| FDN-80 | Czy wdrożyć CSAM hash-matching (PhotoDNA / CSAI Match) w MVP? | 🟡 DO DECYZJI | Rekomendacja: nie w MVP (koszt + złożoność), manual moderation + v0.5 auto-scan |
| FDN-81 | Status page: hosted (statuspage.io) czy self-hosted (Cachet)? | 🟡 DO DECYZJI | Rekomendacja: statuspage.io free tier (prostota) |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 06 — Risk Register | Wejście: ryzyka R-C-002, R-H-001, R-H-008 |
| 27 — Content Policy | Wejście: P0 violations → incident trigger |
| 25 — Audit Trail | Wejście: evidence preservation, legal hold |
| 23 — DSA Readiness | Wejście: notice-and-action SLA |
| 22 — GDPR Map | Wejście: breach notification Art. 33/34 |
| 30 — Compliance Matrix | Wyjście: incident decisions → founder/ops/legal |
| 09 — Founder Operating Model | Wejście: founder jako Incident Commander |
