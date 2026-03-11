# 28 — Verification Feasibility Framework

| Pole | Wartość |
|------|---------|
| **Projekt** | RFG / MONETIZATION / TRUST & SAFETY |
| **Cel decyzji** | Ustalić gdzie i jak wdrażać weryfikację tożsamości |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 27 (Content Policy), 46 (RFG Safety — planned) |
| **Zależności wyjściowe** | → 30 (Compliance Decision Matrix) |

---

## Executive Summary

Weryfikacja tożsamości jest kluczowa dla zaufania na platformie z UGC, monetyzacją i współpracą twórców. Doc 18 zdefiniował 4 poziomy weryfikacji (L0-L3). Ten dokument ocenia **wykonalność** każdego poziomu, określa triggery podwyższenia weryfikacji, analizuje tarcia użytkownika (friction), szacuje koszty operacyjne i mapuje zastosowania per vertical (HHU, RFG, AI Studio).

---

## Stan obecny

| Element | Status |
|---------|--------|
| Rejestracja (email + hasło) | 🟡 Zaplanowana (L0), niezaimplementowana — brak auth w API |
| Email verification | ❌ Brak |
| Phone verification | ❌ Brak |
| ID document verification | ❌ Brak |
| Verification levels (doc 18) | ✅ Zaprojektowane: L0 → L1 → L2 → L3 |
| KYC provider | ❌ Brak decyzji (FDN-58) |

---

## Poziomy weryfikacji — recap z doc 18

| Level | Wymóg | Odblokowane funkcje | Faza |
|-------|-------|---------------------|------|
| **L0** | Email + hasło | Rejestracja, przeglądanie | v0.2 |
| **L1** | Email verified | Postowanie, komentarze, polubienia, AI Studio (free) | v0.2 |
| **L2** | Phone verified | Monetyzacja (tips, subscriptions), RFG oferty | v0.5 |
| **L3** | ID document + selfie | Payouts, verified badge, RFG casting | v1.0 |

---

## Ocena wykonalności per level

### L0 — Email + Password

| Kryterium | Ocena |
|-----------|-------|
| **Trudność implementacji** | Niska — standardowe bcrypt + JWT |
| **Friction użytkownika** | Minimalne — jednorazowe |
| **Koszt operacyjny** | ~$0 (własna implementacja) |
| **Skuteczność vs. fake accounts** | Niska — łatwe tworzyć fake emails |
| **Wymagane zasoby** | auth package (doc 17), User entity (doc 19) |
| **Status wykonalności** | ✅ OBOWIĄZKOWE — bez tego brak platformy |

### L1 — Email Verification

| Kryterium | Ocena |
|-----------|-------|
| **Trudność implementacji** | Niska — token w URL, TTL 24h |
| **Friction użytkownika** | Niskie — jednorazowy klik w mailu |
| **Koszt operacyjny** | ~$0.001/email (Resend/SendGrid free tier: 100/day) |
| **Skuteczność vs. fake accounts** | Średnia — temp-mail nadal możliwy |
| **Wymagane zasoby** | Email provider (Resend), EmailVerification token entity |
| **Status wykonalności** | ✅ OBOWIĄZKOWE — standard branżowy, blokuje spam |

**Mitygacja temp-mail**: Blocklista domen jednorazowych (lista open-source, ~20K domen). Wdrożyć w v0.3.

### L2 — Phone Verification

| Kryterium | Ocena |
|-----------|-------|
| **Trudność implementacji** | Średnia — SMS gateway, OTP, rate-limiting |
| **Friction użytkownika** | Średnie — wymaga podania numeru telefonu |
| **Koszt operacyjny** | ~$0.01-0.05/SMS (Twilio, MessageBird) |
| **Skuteczność vs. fake accounts** | Wysoka — koszt fake numeru ~$0.50-2.00 |
| **Wymagane zasoby** | SMS provider (Twilio/MessageBird), PhoneVerification entity |
| **GDPR implikacja** | Telefon = dane osobowe → cel: umowa (monetyzacja) |
| **Status wykonalności** | ✅ OBOWIĄZKOWE dla monetyzacji — KYC-lite |

**Alternatywy**: TOTP authenticator (Google Authenticator, Authy) — darmowe, ale niższy UX. Rekomendacja: SMS primary, TOTP jako fallback.

### L3 — ID Document + Selfie

| Kryterium | Ocena |
|-----------|-------|
| **Trudność implementacji** | Wysoka — KYC provider integration, DPIA, storage |
| **Friction użytkownika** | Wysokie — skan dokumentu + selfie → 2-5 min |
| **Koszt operacyjny** | $1.50-3.00/weryfikacja (Veriff, Onfido, Sumsub) |
| **Skuteczność vs. fake accounts** | Bardzo wysoka — trudne do sfałszowania |
| **Wymagane zasoby** | KYC provider, IdentityVerification entity, DPIA |
| **GDPR implikacja** | Biometria (Art. 9) → jawna zgoda + DPIA obowiązkowe |
| **Status wykonalności** | ✅ OBOWIĄZKOWE dla payouts — KYC compliance |

**Rekomendacja provider**: Outsource do Veriff lub Sumsub (EU-based, GDPR-compliant, gotowe DPA). NIE budować in-house.

---

## Trigger points — kiedy wymagać podwyższenia

### OBOWIĄZKOWE triggery

| Trigger | Wymagany level | Kontekst | Faza |
|---------|---------------|----------|------|
| Pierwszy post / komentarz | L1 | Zapobiega spam bez email verification | v0.2 |
| Włączenie monetyzacji (tips/subs) | L2 | KYC-lite dla transakcji | v0.5 |
| Pierwsza wypłata (payout) | L3 | KYC pełne — obowiązek prawny | v1.0 |
| Założenie konta RFG Creator | L1 | Minimalne dla profilu | v0.3 |
| Wysłanie oferty współpracy (RFG) | L2 | Ochrona przed scamem | v0.5 |
| Casting / booking flow (RFG) | L3 | Ochrona twórczyń | v1.0 |
| Rola Moderator / Admin | L3 + internal | Zaufane konta wewnętrzne | v0.3 |
| Verified badge (HHU Creator) | L3 | Zaufanie społeczności | v1.0 |
| AI Studio Pro | L2 | Ochrona przed abuse | v0.5 |

### WARUNKOWE triggery

| Trigger | Wymagany level | Warunek | Faza |
|---------|---------------|---------|------|
| >100 postów / miesiąc | L2 | Anomaly detection → anti-spam | v0.5 |
| >10 reports na użytkownika | L2 | Trust signal negatywny | v0.5 |
| Ponowna rejestracja po banie | L3 | Zapobieganie ban evasion | v1.0 |
| Duża transakcja (>500 PLN) | L3 | Compliance AML-lite | v1.0 |

### ZBĘDNE triggery (nie wdrażać)

| Trigger | Powód odrzucenia |
|---------|-----------------|
| L2 do przeglądania treści | Nadmierny friction, utrata casual users |
| L3 do postowania | Zbyt dużo barier, zabija growth |
| L1 do logowania | Email verification jest jednorazowe, nie blokuj logowania |
| L3 dla wszystkich twórców | Dystans entry-point od wartości — tylko dla payouts |

---

## Analiza tarcia użytkownika (User Friction)

| Level | Czas | Drop-off estimate | Strategia minimalizacji |
|-------|------|--------------------|------------------------|
| L0 → L1 | +30 sec (email click) | 10-15% | Auto-resend po 5 min, link ważny 24h |
| L1 → L2 | +2 min (SMS OTP) | 20-30% | Just-in-time: pytaj gdy user potrzebuje |
| L2 → L3 | +5 min (doc + selfie) | 40-60% | Just-in-time: tylko na payout flow |

**Progressive verification** (core principle — doc 18): Nigdy nie wymuszaj na starcie. Podnoś requirement dopiero gdy user chce wykonać akcję wymagającą zaufania. Komunikat: „Aby [odblokować wypłaty], potrzebujemy [weryfikacji tożsamości]".

---

## Koszty operacyjne — szacunek

### v0.2–v0.3 (MVP)

| Element | Koszt | Źródło |
|---------|-------|--------|
| L0 (email + hasło) | $0 | Własna implementacja |
| L1 (email verification) | ~$0 (Resend free tier: 3K/mies.) | Resend |
| Blocklista temp-mail | $0 | Open-source lista |
| **Razem MVP** | **~$0/mies.** | — |

### v0.5 (monetyzacja)

| Element | Koszt per user | Volume estimate | Koszt mies. |
|---------|----------------|-----------------|-------------|
| L2 (SMS OTP) | $0.03 | 500 verifications/mies. | ~$15 |
| **Razem v0.5** | — | — | **~$15/mies.** |

### v1.0 (payouts)

| Element | Koszt per user | Volume estimate | Koszt mies. |
|---------|----------------|-----------------|-------------|
| L3 (KYC — Veriff) | $2.00 | 100 verifications/mies. | ~$200 |
| **Razem v1.0** | — | — | **~$215/mies.** |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| VER-01 | Fake accounts spamujące przed L1 enforcement | WYSOKIE | ŚREDNI | L1 wymagane do first post (v0.2) |
| VER-02 | L2 friction odstraszające casual creators | ŚREDNIE | ŚREDNI | Just-in-time prompts, jasny value proposition |
| VER-03 | L3 drop-off >50% wśród twórców chcących payouts | ŚREDNIE | WYSOKI | UX: smooth flow, progress indicator, clear benefit |
| VER-04 | KYC provider downtime / error | NISKIE | WYSOKI | Fallback provider (Veriff primary + Sumsub backup) |
| VER-05 | Stolen identity / fake documents | NISKIE | KRYTYCZNY | KYC provider liveness detection + document verification |
| VER-06 | GDPR violation przy przechowywaniu selfie | NISKIE (outsource) | WYSOKI | Provider handles storage, platform keeps only hash + status |

---

## Rekomendacja wdrożeniowa

### OBOWIĄZKOWE — implementacja v0.2–v0.3
1. L0: auth package z bcrypt + JWT
2. L1: email verification (Resend, token 24h TTL)
3. Blocklista disposable email domains
4. Progressive verification UX pattern

### WARUNKOWE — implementacja v0.5
5. L2: SMS OTP (Twilio / MessageBird)
6. TOTP fallback (Google Authenticator)
7. Just-in-time triggers (monetization, RFG offers)
8. Anomaly-based L2 triggers (>100 posts, >10 reports)

### ZBĘDNE — nie implementować w MVP
9. L3 KYC — v1.0 (payouts)
10. Mandatory L2 for all accounts — friction za wysoki
11. In-house document verification — outsource do Veriff

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-77 | SMS provider: Twilio vs MessageBird vs inny? | 🟡 DO DECYZJI | Rekomendacja: Twilio (PHP SDK, PL coverage) |
| FDN-78 | Czy L1 blokuje postowanie czy tylko monetyzację? | ✅ APPROVED | Blokuje postowanie (anti-spam, spójne z OBOWIĄZKOWE). Zamknięte w G2A |
| FDN-58 | KYC provider: Veriff vs Onfido vs Sumsub? | 🟡 DO DECYZJI (z doc 21) | Rekomendacja: Veriff (EU-based, competitive pricing) |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 18 — Identity & Roles | Wejście: L0-L3 levels, roles, JWT |
| 27 — Content Policy | Wejście: enforcement classes → verification triggers |
| 21 — Legal Backbone | Wejście: KYC requirements, DPIA for L3 |
| 22 — GDPR Map | Wejście: phone/ID jako dane osobowe |
| 46 — RFG Safety (planned) | Wejście: RFG-specific verification needs |
| 30 — Compliance Matrix | Wyjście: kto decyduje o verification levels |
| 17 — Shared Services | Wejście: auth package spec |
