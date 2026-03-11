# 39 — HHU Monetization Stack

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Dopasować model przychodów do produktu HHU |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 11 (Revenue Model), 31 (Product Thesis), 33 (MVP Scope), 37 (Brand & Label) |
| **Zależności wyjściowe** | → 43 (AI Credits Economics), 48 (Monetization Engine Master) |

---

## Executive Summary

HHU ma **5 warstw przychodowych**, uruchamianych sekwencyjnie od MVP do Scale. Kluczowe założenie: **MVP jest darmowy** — monetyzacja zaczyna się od v0.3 (tips) i rośnie do pełnego stacku w v1.0. Ten dokument opisuje każdą warstwę, pricing, creator monetization, platform commissions i **4 scenariusze** (soft / medium / aggressive / balanced).

---

## Stan obecny

| Element | Status |
|---------|--------|
| Stripe integration | ❌ Brak (doc 15: Stripe planned) |
| Payment processing | ❌ Brak |
| Subscription model | 📐 Defined in doc 11; not implemented |
| Creator monetization | ❌ Brak (no tips, subs) |
| AI credits | 📐 Concept in doc 11; not implemented |

---

## Revenue Layers — Overview

| # | Layer | Kiedy | Typ | Revenue driver |
|---|-------|-------|-----|---------------|
| 1 | **AI Credits** | v0.1 (free tier) → v0.3 (paid) | B2C | Creators buying AI tools |
| 2 | **Tips** | v0.3 | C2C (platform commission) | Fans tipping Creators |
| 3 | **Creator Subscriptions** | v0.5 | C2C (platform commission) | Fans subscribing to Creators |
| 4 | **HHU Pro** (platform sub) | v0.5 | B2C | Users buying premium features |
| 5 | **B2B / Brand Deals** | v0.5+ | B2B | Labels & brands paying for packages |

---

## Layer 1: AI Credits

### Concept

AI Credits to wewnętrzna waluta platformy na korzystanie z AI tools (bio generator, caption writer, promo asset creator — doc 41). 1 credit = 1 AI action.

### Pricing

| Plan | Cena | Credits/mies. | Cost per credit (user) | Cost per credit (HHU: OpenAI) |
|------|------|--------------|----------------------|------------------------------|
| Free | $0 | 10 | $0 | ~$0.02 |
| Starter | $4.99/mies. | 100 | $0.05 | ~$0.02 |
| Pro | $14.99/mies. | 500 | $0.03 | ~$0.02 |
| Unlimited | $29.99/mies. | Unlimited (FUP: 2000/mies.) | ~$0.015 | ~$0.02 |

> **FUP (Fair Use Policy)**: Unlimited = max 2000 credits/mies. Powyżej = throttle speed, nie block.

### AI Credits — Unit Economics

| Metryka | Wartość |
|---------|---------|
| OpenAI API cost per credit | ~$0.02 (GPT-4o mini for text, DALL-E for images) |
| Starter margin | 60% ($4.99 revenue, ~$2.00 cost) |
| Pro margin | 40% ($14.99 revenue, ~$10 cost) |
| Unlimited margin | 25% at FUP usage; higher if user uses <1000/mies. |
| Break-even | ~50 Starter plans or ~25 Pro plans |

### AI Credits — Launch Sequence

| Faza | Akcja |
|------|-------|
| v0.1 (MVP) | 10 free credits/mies. przy rejestracji; no paid option |
| v0.3 | Starter plan launch ($4.99); Pro plan launch ($14.99) |
| v0.5 | Unlimited plan ($29.99); credit top-up packs |
| v1.0 | Enterprise API credits (doc 43) |

---

## Layer 2: Tips

### Concept

Fan → Creator microdonation. HHU pobiera commission.

### Mechanics

| Element | Wartość |
|---------|---------|
| Minimum tip | $1 (PLN equivalent) |
| Max tip per transaction | $100 |
| Payment method | Stripe (card); Blik (PL-specific) via Stripe |
| HHU commission | 20% (standard) / 15% (Ambasador — doc 36) |
| Creator payout | Weekly; min payout threshold $10 |
| Currency | PLN primary; USD/EUR secondary |

### Tips — Launch

| Faza | Akcja |
|------|-------|
| MVP | ❌ Brak tipping |
| v0.3 | Tips live; standard 80/20 split |
| v0.5 | Tip goals (Creator sets goal, progress bar); tip badges |

---

## Layer 3: Creator Subscriptions

### Concept

Fan płaci recurring sub do Creatora za exclusive content. HHU pobiera commission.

### Tiers (Creator sets their own pricing, HHU defines tiers)

| Tier | Suggested price range | Typ contentu |
|------|----------------------|-------------|
| Bronze | $2-5/mies. | Early access posts, behind-the-scenes |
| Silver | $5-15/mies. | Bronze + exclusive audio snippets, polls |
| Gold | $15-50/mies. | Silver + 1:1 shoutouts, exclusive drops |

### Commission

| Element | Wartość |
|---------|---------|
| HHU commission | 20% (standard) / 15% (Ambasador) |
| Stripe processing fee | ~2.9% + $0.30 per transaction |
| Creator net | ~77% (standard) / ~82% (Ambasador) |

### Creator Subs — Launch

| Faza | Akcja |
|------|-------|
| MVP-v0.3 | ❌ Brak subscriptions |
| v0.5 | Subscriptions live; 1 tier (Bronze); Creator verification L2+ required (doc 22) |
| v0.7 | Multi-tier (Bronze/Silver/Gold) |
| v1.0 | Subscriber analytics; churn prediction |

---

## Layer 4: HHU Pro (Platform Subscription)

### Concept

Płatna subskrypcja platformowa (nie Creator sub) — daje Userowi premium features.

### HHU Pro Features

| Feature | Free | Pro ($9.99/mies.) |
|---------|------|-------------------|
| AI credits | 10/mies. | 200/mies. |
| Feed | Standard | Ad-free + priority discovery |
| Badges | Standard | Pro badge on profile |
| Analytics | Basic (likes, views) | Extended (demographics, reach) |
| Early access features | ❌ | ✅ 2 tygodnie wcześniej |
| Challenge priority | Standard | Featured entries |
| Support | Community | Priority (48h response) |

### HHU Pro — Launch

| Faza | Akcja |
|------|-------|
| MVP-v0.3 | ❌ Brak Pro |
| v0.5 | HHU Pro launch ($9.99/mies.) |
| v1.0 | Annual plan ($89.99/rok = 25% discount) |

---

## Layer 5: B2B / Brand Deals

Szczegóły w **doc 37 (Brand & Label Partnership Model)**.

| Revenue stream | Pricing | Kiedy |
|---------------|---------|-------|
| Label dashboard | $49-149/mies. | v0.5 |
| Community Challenge sponsor | $500/kampanię | v0.5 |
| Featured Drop | $1000/drop | v0.5 |
| Native Collab | $2000/mies. | v1.0 |
| Event Sponsor | Custom | v1.0 |

---

## Platform Commission Summary

| Revenue stream | HHU commission | Creator share | Stripe fee |
|---------------|---------------|--------------|-----------|
| AI Credits | 100% (direct sale) | N/A | 2.9% + $0.30 |
| Tips | 20% (15% Ambasador) | 80% (85%) | 2.9% + $0.30 |
| Creator Subs | 20% (15% Ambasador) | 80% (85%) | 2.9% + $0.30 |
| HHU Pro | 100% (direct sale) | N/A | 2.9% + $0.30 |
| B2B deals | 100% (direct sale) | N/A | Invoice-based |

---

## 4 Scenariusze Revenue (12-Month Projection)

### Założenia wspólne

| Parametr | Wartość |
|----------|---------|
| Month 1-3 | MVP, free only, 0 revenue |
| Month 4 | v0.3 launch (tips + AI credits paid) |
| Month 7 | v0.5 launch (subs + Pro + B2B) |
| Starting MAU (M4) | 200 |
| MAU growth | Varies by scenario |
| Creator % of MAU | 20% |
| Conversion to paid | Varies by scenario |

---

### Scenariusz 1: SOFT (konserwatywny)

> Minimalne konwersje, wolny wzrost, brak B2B w Year 1.

| Miesiąc | MAU | Revenue/mies. | Źródła |
|---------|-----|--------------|--------|
| M1-3 | 50-150 | $0 | Free only |
| M4 | 200 | $25 | 5× AI Starter |
| M5 | 250 | $50 | 8× AI Starter + $10 tips |
| M6 | 300 | $80 | 10× AI Starter + $30 tips |
| M7 | 350 | $180 | AI + tips + 5× HHU Pro |
| M8-10 | 400-500 | $250-350 | AI + tips + Pro + first subs |
| M11-12 | 500-600 | $400-500 | All layers except B2B |
| **Year 1 Total** | | **~$2,500** | |

| Metryka | Wartość |
|---------|---------|
| Konwersja to paid | 3% |
| ARPU (paying) | $6/mies. |
| Revenue per MAU | $0.18/mies. |

---

### Scenariusz 2: MEDIUM (realistyczny)

> Moderate conversions, steady growth, small B2B from M7.

| Miesiąc | MAU | Revenue/mies. | Źródła |
|---------|-----|--------------|--------|
| M1-3 | 50-200 | $0 | Free only |
| M4 | 250 | $75 | 15× AI Starter |
| M5 | 350 | $200 | AI mix + $60 tips |
| M6 | 500 | $400 | AI + tips + early subs |
| M7 | 650 | $800 | AI + tips + Pro + subs + 1 Label |
| M8-10 | 800-1200 | $1,000-1,800 | All layers + 2 Labels + 1 Brand |
| M11-12 | 1,200-1,500 | $2,000-2,500 | Full stack |
| **Year 1 Total** | | **~$12,000** | |

| Metryka | Wartość |
|---------|---------|
| Konwersja to paid | 7% |
| ARPU (paying) | $10/mies. |
| Revenue per MAU | $0.80/mies. |

---

### Scenariusz 3: AGGRESSIVE (optymistyczny)

> High conversions, viral growth, active B2B from M6.

| Miesiąc | MAU | Revenue/mies. | Źródła |
|---------|-----|--------------|--------|
| M1-3 | 100-300 | $0 | Free only |
| M4 | 500 | $250 | 30× AI Starter + 5× Pro |
| M5 | 800 | $600 | AI mix + $200 tips |
| M6 | 1,200 | $1,500 | AI + tips + subs + 1 Brand challenge |
| M7 | 1,800 | $3,000 | Full stack + 3 Labels + 2 Brands |
| M8-10 | 2,500-4,000 | $4,000-6,000 | Scale |
| M11-12 | 4,000-5,000 | $7,000-9,000 | Full scale |
| **Year 1 Total** | | **~$45,000** | |

| Metryka | Wartość |
|---------|---------|
| Konwersja to paid | 12% |
| ARPU (paying) | $15/mies. |
| Revenue per MAU | $1.50/mies. |

---

### Scenariusz 4: BALANCED (rekomendowany)

> Realistic growth, focused conversions, selective B2B.

| Miesiąc | MAU | Revenue/mies. | Źródła |
|---------|-----|--------------|--------|
| M1-3 | 50-200 | $0 | Free only |
| M4 | 300 | $100 | 15× AI Starter + 2× Pro |
| M5 | 450 | $300 | AI mix + $100 tips |
| M6 | 600 | $600 | AI + tips + first subs |
| M7 | 800 | $1,200 | Full stack + 1 Label |
| M8-10 | 1,000-1,500 | $1,500-2,500 | All layers + 2 Labels + 1 Brand |
| M11-12 | 1,500-2,000 | $3,000-3,500 | Steady growth |
| **Year 1 Total** | | **~$18,000** | |

| Metryka | Wartość |
|---------|---------|
| Konwersja to paid | 8% |
| ARPU (paying) | $12/mies. |
| Revenue per MAU | $1.00/mies. |

---

## Porównanie scenariuszy

| Metryka | Soft | Medium | Aggressive | **Balanced** |
|---------|------|--------|-----------|-------------|
| Year 1 revenue | $2,500 | $12,000 | $45,000 | **$18,000** |
| End MAU | 600 | 1,500 | 5,000 | **2,000** |
| Paid conversion | 3% | 7% | 12% | **8%** |
| ARPU (paying) | $6 | $10 | $15 | **$12** |
| B2B revenue share | 0% | 20% | 35% | **15%** |
| Break-even month | Never (Y1) | M11 | M7 | **M10** |
| Risk level | LOW | MEDIUM | HIGH | **MEDIUM** |

> **Rekomendacja**: Plan na scenariusz **BALANCED**, measure against **MEDIUM**, celebrate if we hit **AGGRESSIVE**.

---

## Creator Monetization — Summary

### When Creator Can Earn

| Action | Kiedy | Minimum requirement |
|--------|-------|-------------------|
| Receive tips | v0.3 | Verification L1 (email + phone) |
| Receive subscriptions | v0.5 | Verification L2 (Sumsub KYC) |
| AI credits as reward (challenge wins) | v0.3 | Participation |
| Revenue share from brand collab | v0.5 | Verification L2 + ≥100 followers |

### Creator Payout Rules

| Element | Wartość |
|---------|---------|
| Payout frequency | Weekly (Fridays) |
| Payout method | Bank transfer (Stripe Connect) |
| Min payout threshold | $10 (or PLN equivalent) |
| Payout currency | PLN (PL creators); USD (international) |
| Tax handling | Creator is responsible (doc 21, 22: KYC includes tax info) |
| Payout delay | 7 days (refund protection) |

---

## Cost Structure

| Cost category | Monthly estimate (M7: 800 MAU) | Annual estimate |
|--------------|-------------------------------|----------------|
| OpenAI API (AI credits fulfillment) | $200-400 | $3,000-5,000 |
| Stripe fees (2.9% + $0.30) | $50-100 | $600-1,200 |
| Infrastructure (Railway — doc 15, FDN-91) | $20-50 | $300-600 |
| Domain + storage (Cloudflare R2) | $10-20 | $120-240 |
| **Total monthly cost** | **$280-570** | **$4,020-7,040** |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| MS-01 | Paid conversion < 3% (too few paying users) | ŚREDNIE | WYSOKI | Strong free tier retains users; paid = unlock, not paywall |
| MS-02 | Stripe fees eat margin on small transactions (tips <$5) | WYSOKIE | ŚREDNI | Min tip $1; batch payouts; optimize payment flow |
| MS-03 | Creator payout complexity (tax, refunds, fraud) | ŚREDNIE | WYSOKI | Use Stripe Connect (handles KYC, tax forms); doc 48 (Monetization Engine) |
| MS-04 | AI credits cost spike (OpenAI price changes) | NISKIE | WYSOKI | Monitor cost/credit monthly; switch models (GPT-4o mini → cheaper); FUP |
| MS-05 | B2B revenue doesn't materialize (Brands see no value) | ŚREDNIE | ŚREDNI | Delay B2B expectations; audience first; B2B only at ≥1000 MAU |

---

## Rekomendacja monetyzacji

### TERAZ (MVP → v0.3)

1. Free AI credits (10/mies.) — build habit, collect usage data
2. Tips infrastructure (Stripe Connect) — first Creator payouts
3. Paid AI credits (Starter $4.99) — first revenue stream

### NASTĘPNIE (v0.5)

4. Creator Subscriptions (Bronze tier)
5. HHU Pro ($9.99/mies.)
6. First Label partnership (Starter $49/mies.)

### PÓŹNIEJ (v1.0+)

7. Multi-tier Creator Subs (Bronze/Silver/Gold)
8. Annual plans + credit top-up packs
9. Full B2B (Brands, Events, Native Collab)
10. Enterprise AI credits (API)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-105 | Czy 20% commission rate jest competitive? (Patreon: 5-12%, OnlyFans: 20%, Twitch: 50%) | 🟡 DO DECYZJI | Rekomendacja: 20% standard, 15% Ambasador; review po 6 miesiącach |
| FDN-106 | Czy free tier (10 credits/mies.) jest wystarczający do demonstracji wartości AI? | 🟡 DO DECYZJI | Rekomendacja: 10 credits = ~5 bio generations; wystarczający taste |
| FDN-107 | Czy min payout $10 nie jest za niski? (processing cost vs Creator satisfaction) | 🟡 DO DECYZJI | Rekomendacja: $10 min; Creator satisfaction > marginal Stripe fee |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 11 — Revenue Model (Category Definition) |
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 33 — HHU MVP Scope |
| ← INPUT | 37 — Brand & Label Partnership Model |
| → OUTPUT | 43 — AI Credits Economics Model |
| → OUTPUT | 48 — Monetization Engine Master Spec |
| → CROSS | 15 — System Architecture (Stripe, Railway) |
| → CROSS | 22 — KYC / Verification (Creator payout eligibility) |
| → CROSS | 36 — Artist Partnership (Ambasador commission) |
