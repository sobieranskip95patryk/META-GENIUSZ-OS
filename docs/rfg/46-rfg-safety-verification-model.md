# 46 — RFG Safety & Verification Model

| Pole | Wartość |
|------|---------|
| **Projekt** | Rocket Fuel Girls (RFG) |
| **Cel decyzji** | Zabezpieczyć RFG przed scamem, exploitacją i fałszywymi ofertami |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 22 (KYC), 25 (Data Protection), 27 (Trust & Safety), 28 (Abuse Prevention), 29 (Incident Response), 45 (RFG Positioning) |
| **Zależności wyjściowe** | → 47 (RFG Premium & Partnership), 49 (Anti-Fraud Core) |

---

## Executive Summary

RFG operuje w **high-risk niche** — modelki, twórczynie wizualne i marki fashion. Ryzyka obejmują: fake castings, exploitative „photographers", identity theft, catfishing, underage accounts, adult content upload, sextortion. Ten dokument definiuje **risk map**, verification levels, contact safety, anti-exploitation logic i reporting flows specyficzne dla RFG (nadbudowując generyczne Trust & Safety z doc 27-29).

---

## Risk Map — RFG-Specific

| ID | Ryzyko | Opis | Severity | Frequency est. |
|----|--------|------|----------|----------------|
| RS-01 | **Fake casting** | „Marka" oferuje casting, wymaga zdjęć/meeting w prywatnej lokalizacji | KRYTYCZNE | ŚREDNIA |
| RS-02 | **Exploitative photographer** | „Fotograf" oferuje TFP, eskaluje do NSFW | KRYTYCZNE | NISKA-ŚREDNIA |
| RS-03 | **Identity theft / catfishing** | Ktoś używa cudzych zdjęć jako swoje portfolio | WYSOKIE | ŚREDNIA |
| RS-04 | **Underage account** | Osoba <18 tworzy konto modelki | KRYTYCZNE | NISKA |
| RS-05 | **Adult content upload** | NSFW zdjęcia/video na professional platform | WYSOKIE | NISKA |
| RS-06 | **Sextortion** | Ktoś grozi publikacją prywatnych zdjęć | KRYTYCZNE | NISKA |
| RS-07 | **Payment / booking scam** | „Marka" obiecuje zapłatę, nie płaci | WYSOKIE | ŚREDNIA |
| RS-08 | **Harassment / stalking** | Persistent unwanted contact via platform | WYSOKIE | ŚREDNIA |
| RS-09 | **Fake reviews / ratings** | Fabricated reviews to boost Brand or defame Creator | ŚREDNIE | NISKA |
| RS-10 | **Data scraping** | Automated download portfolio images | ŚREDNIE | ŚREDNIA |

---

## Verification Levels — RFG

RFG korzysta z systemu veryfikacji z doc 22 (KYC/Sumsub), ale z **dodatkowym layerem** specificznym dla modelingu.

### Creator Verification

| Level | Wymagania | Co odklukowuje | Kiedy |
|-------|-----------|---------------|-------|
| **L0** | Email + phone | Browse platform; follow others | Registration |
| **L1** | L0 + age confirmation (date of birth) | Create portfolio (basic); limited Contact |
| **L2** | L1 + Sumsub ID verification | Full portfolio; contact from Brands; tips | v0.5 |
| **L3** | L2 + professional verification (agency confirmation or portfolio review) | Premium placement; casting flows; priority matching | v1.0 |

### Brand Verification

| Level | Wymagania | Co odklukowuje |
|-------|-----------|---------------|
| **B0** | Email + company info | Browse Creator portfolios (limited) |
| **B1** | B0 + Sumsub business KYC (NIP/REGON/company registration) | Contact Creators; post casting calls |
| **B2** | B1 + manual review by RFG team | Full casting flows; featured Brand status; payment integration |

> **Zasada**: Brands muszą być weryfikowane ZANIM mogą kontaktować Creators. Zero tolerance dla unverified contact.

### Age Verification — Special Rules

| Reguła | Uzasadnienie |
|--------|-------------|
| **Minimum age: 18** | Legal compliance (Art. 8 GDPR, modeling industry standards) |
| Date of birth required at L1 | Gate before portfolio creation |
| Sumsub ID check at L2 confirms age | Hard age verification |
| Suspected underage → immediate account suspension + manual review | Child safety priority |
| No „parent consent" workaround | RFG is not for minors, period |

---

## Contact Safety

### Safe Contact Flow (v0.5+)

```
Brand (B1 verified) → Finds Creator portfolio → 
  "Contact Request" button →
    → Form: Brand name, purpose (casting/collab/booking), project description, timeline →
      → Request sent to Creator →
        Creator reviews Brand profile (B1 verified badge visible) →
          → Accept: Opens secure message thread (in-platform)
          → Decline: Request archived; Brand notified "Creator not interested"
          → Report: Flagged for moderation
```

### Contact Rules

| Reguła | Enforcement |
|--------|------------|
| Brand must have B1+ verification to send contact request | System-enforced |
| Creator can set contact preferences (open / verified only / closed) | Profile settings |
| No personal contact info (phone, address) shared via platform messaging | Auto-filter + moderation (doc 28) |
| First message reviewed by AI content filter | Auto-mod (keyword: „come to my studio alone", „send private photos", etc.) |
| Max 3 unanswered contact requests per Brand per week | Rate limit (anti-spam) |
| Block function: Creator blocks Brand → no further contact possible | Permanent per Creator choice |

### Red Flags — Auto-Detection

| Signal | Action |
|--------|--------|
| Brand requests „private meeting" in first message | ⚠️ Warning to Creator + moderation flag |
| Brand requests personal photos outside platform | ⚠️ Warning + moderation flag |
| Brand account created <24h ago + mass contact requests | 🚫 Automatic suspension + review |
| „TFP photographer" requests private location shoot | ⚠️ Warning banner: „Pamiętaj o bezpieczeństwie — nigdy nie idź sama na spotkanie" |
| Multiple Creators report same Brand | 🚫 Immediate Brand suspension |

---

## Anti-Exploitation Logic

### Photography / Shooting Safety

| Element | Mechanizm |
|---------|-----------|
| **Safety checklist** (shown before accepting casting) | „Czy lokalizacja jest publiczna? Czy ktoś wie, gdzie idziesz? Czy znasz kontrahenta?" |
| **Share session** | Creator can share casting details with trusted contact via RFG (automated: location, Brand name, time) |
| **Post-session review** | Creator rates Brand after casting (1-5 stars + comments) — builds trust graph |
| **Emergency contact** | Profile setting: emergency phone number; quick-dial from app |
| **Location sharing** (v1.0) | Opt-in live location sharing during casting session → trusted contact can see |

### Content Rights Protection

| Reguła | Mechanizm |
|--------|-----------|
| Creator owns all portfolio content | Terms of Service clearly state: Creator retains all IP rights |
| No downloading portfolio images | Right-click disabled; watermark option for non-verified viewers |
| Brand cannot re-use images without agreement | Usage rights must be agreed per casting/project (v1.0: structured rights agreement) |
| DMCA / DSA notice-and-action | Same process as doc 23, extended to RFG context |

---

## Reporting Flows

### Creator → Reports Brand

```
Creator → Report Brand →
  Select reason:
    → Fake casting offer
    → Inappropriate behavior
    → Harassment / stalking  
    → Scam (non-payment)
    → Solicitation (adult content request)
    → Other
  → Attach evidence (screenshot, message thread) →
  → Submitted to moderation queue →
  → Priority: HIGH (all RFG reports treated as HIGH by default)
```

### Brand → Reports Creator

```
Brand → Report Creator →
  Select reason:
    → Fake portfolio (stolen images)
    → No-show to confirmed casting
    → Inappropriate behavior
    → Other
  → Submitted to moderation queue →
  → Standard priority
```

### Moderation SLA for RFG Reports

| Report type | SLA | Escalation |
|-------------|-----|-----------|
| Exploitation / safety concern | 2 hours | Immediate to senior mod / Founder |
| Fake casting / scam | 4 hours | Senior mod |
| Harassment | 4 hours | Standard (doc 23 SLA) |
| Fake portfolio | 24 hours | Standard |
| Other | 48 hours | Standard |

> **RFG SLA jest bardziej agresywny niż HHU** ze względu na wyższe ryzyko exploitacji.

---

## Enforcement Ladder — RFG Extension

| Level | Akcja | Trigger |
|-------|-------|---------|
| W0 | Warning (in-app) | First minor infraction |
| W1 | Contact restriction (7 days) | Repeated minor OR single moderate |
| W2 | Account suspension (30 days) | Exploitation attempt, serious safety violation |
| W3 | **Permanent ban + report to authorities** | Confirmed exploitation, solicitation of minors, sextortion |

> **W3 with authority reporting**: RFG-specific; not standard in HHU. If exploitation is confirmed (especially involving minors), RFG reports to Polish police (Komenda Główna Policji, Wydział ds. Cyberprzestępczości) per legal obligation.

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| RFGS-01 | Safety incident at casting → media attention | NISKIE | KRYTYCZNE | Checklist, share session, post-session review; incident response (doc 29) |
| RFGS-02 | Verification too strict → Creators/Brands don't onboard | ŚREDNIE | ŚREDNI | Progressive verification (L0 → L1 is minimal); B1 requires real company info only |
| RFGS-03 | Moderation team insufficient (Solo Dev limitation) | WYSOKIE | WYSOKI | AI-assisted moderation; prioritize RFG reports; hire part-time mod at v0.7+ |
| RFGS-04 | False reports (Brand vs Creator conflict) | ŚREDNIE | ŚREDNI | Evidence requirement; both-sides review; reputation scoring |
| RFGS-05 | Data scraping of portfolio images | ŚREDNIE | ŚREDNI | Watermark; rate limiting; CAPTCHA for non-logged visitors; legal action threat |

---

## Rekomendacja wdrożeniowa

### OBOWIĄZKOWE ZABEZPIECZENIA (v0.5 — launch)

1. Age verification (18+) at L1
2. Brand KYC (Sumsub) at B1 — before any contact
3. Safe Contact Flow (request → accept/decline → in-platform messaging)
4. AI content filter on first messages
5. Report system (Creator → Brand, Brand → Creator)
6. Safety checklist shown before accepting casting

### ZALECANE (v0.7)

7. Post-session review system (rating + comments)
8. Portfolio watermark option
9. Share session feature (automated)
10. Red flag auto-detection (mass contact, new account patterns)

### PÓŹNIEJSZE (v1.0+)

11. Location sharing (opt-in during sessions)
12. Structured rights agreement flow
13. Trust scoring (Brand reputation visible)
14. Authority reporting automation (W3 cases)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-124 | Czy Brand KYC (Sumsub) wystarczy czy potrzebna dodatkowa manual review? | 🟡 DO DECYZJI | Rekomendacja: B1 = Sumsub automated; B2 = manual review (for premium Brands) |
| FDN-125 | Czy RFG powinno umożliwić contact bez B1 verification (np. „Inquire" bez danych kontaktowych)? | 🟡 DO DECYZJI | Rekomendacja: NIE — zero contact from unverified Brands; safety > convenience |
| FDN-126 | Czy reporting do policji w W3 Cases powinno być automatyczne czy po manual review? | 🟡 DO DECYZJI | Rekomendacja: manual review THEN report — avoid false police reports |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 22 — KYC / Verification |
| ← INPUT | 25 — Data Protection |
| ← INPUT | 27 — Trust & Safety Framework |
| ← INPUT | 28 — Abuse Prevention Playbook |
| ← INPUT | 29 — Incident Response Protocol |
| ← INPUT | 45 — RFG Strategic Positioning |
| → OUTPUT | 47 — RFG Premium & Partnership Model |
| → OUTPUT | 49 — Trust & Safety / Anti-Fraud Core |
| → CROSS | 23 — Content Moderation Policy (DMCA/DSA) |
