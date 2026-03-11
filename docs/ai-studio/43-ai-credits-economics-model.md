# 43 — AI Credits Economics Model

| Pole | Wartość |
|------|---------|
| **Projekt** | AI Studio Creator / Monetization Engine |
| **Cel decyzji** | Zaprojektować model kredytów AI: zużycie, marża, pakiety, anty-abuse |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 11 (Revenue Model), 39 (HHU Monetization), 41 (AI Studio Product Spec), 42 (Workflow Library) |
| **Zależności wyjściowe** | → 48 (Monetization Engine Master Spec) |

---

## Executive Summary

AI Credits to **wewnętrzna waluta** ekosystemu META-GENIUSZ OS na korzystanie z narzędzi AI. 1 credit = 1 akcja AI (text generation, image generation = 3 credits). Model musi być: (a) prosty dla użytkownika, (b) marżowy dla platformy, (c) skalowalny przy rosnącej bazie. Ten dokument definiuje credit units, pricing, cost sensitivity, anti-abuse guardrails i **4 scenariusze**.

---

## Credit Unit System

### 1 Credit = 1 AI Action

| Typ akcji | Credits | Przykład | Estimated API cost |
|-----------|---------|---------|-------------------|
| **Text generation (simple)** | 1 | Bio, caption, hashtags (GPT-4o mini) | $0.01-0.02 |
| **Text generation (complex)** | 2 | Release plan, brand pitch (GPT-4o) | $0.03-0.08 |
| **Image generation** | 3 | Cover art, promo graphic (DALL-E 3) | $0.04-0.08 |
| **Audio analysis** (v1.0) | 5 | BPM/key detection (Whisper + analysis) | $0.05-0.10 |
| **Workflow bundle** | Sum - 15% | Rap Release Kit: 6 → 5 credits | Sum of components |

### Credit Value Mapping

| Plan | Credits/mies. | Price | Price per credit (user) | Cost per credit (HHU) | Gross margin |
|------|--------------|-------|------------------------|-----------------------|-------------|
| Free | 10 | $0 | $0 | ~$0.015 | -100% (acquisition cost) |
| Starter | 100 | $4.99 | $0.050 | ~$0.015 | 70% |
| Pro | 500 | $14.99 | $0.030 | ~$0.015 | 50% |
| Unlimited | 2000 FUP | $29.99 | ~$0.015 | ~$0.015 | ~0% at FUP; positive if <1000 used |

> **Design**: Margin is highest on Starter (casual users); Pro is volume play; Unlimited breaks even at max usage — profits from typical under-usage.

---

## Pricing Logic

### Why these prices?

| Factor | Decision |
|--------|----------|
| **Patreon/Patronite benchmark** | Creators pay $5-50/mies. for tools; $4.99 is accessible |
| **Canva benchmark** | $12.99/mies. for design tools; our $14.99 includes AI generation |
| **ChatGPT Plus benchmark** | $20/mies.; our tools are domain-specific, cheaper |
| **Polish purchasing power** | $4.99 ≈ 20 PLN = affordable for active Creator |
| **Cost floor** | At $0.015/credit, min price must cover costs + margin |

### Credit Top-Up Packs (v0.5)

| Pack | Credits | Price | Per credit |
|------|---------|-------|-----------|
| Small | 50 | $2.99 | $0.060 |
| Medium | 200 | $9.99 | $0.050 |
| Large | 500 | $19.99 | $0.040 |

> Top-up packs: no-subscription option for occasional users. Higher per-credit price = incentivize subscription.

---

## Usage Model

### Expected Usage per Persona (Monthly)

| Persona | Free (10cr) | Starter (100cr) | Pro (500cr) | Realne usage |
|---------|-------------|-----------------|-------------|-------------|
| Casual Creator | 5-10 | — | — | Uses 50-100% of free |
| Active Creator | 10 (cap out) | 40-80 | — | Upgrades after 2-3 months |
| Power Creator | 10 (cap out) | 100 (cap out) | 200-400 | Needs Pro within 1 month |
| Professional | 10 (cap out) | 100 (cap out) | 500+ | Needs Unlimited |

### Usage Distribution (predicted)

| Tier | % of users | Revenue share | Credit consumption share |
|------|-----------|--------------|------------------------|
| Free | 80% | 0% | 15% of total credits |
| Starter | 12% | 35% | 25% |
| Pro | 6% | 40% | 40% |
| Unlimited | 2% | 25% | 20% |

---

## Cost Sensitivity Analysis

### AWS/OpenAI Cost Scenarios

| Scenario | GPT-4o mini ($/1M tokens) | DALL-E 3 ($/image) | Average cost/credit |
|----------|--------------------------|---------------------|-------------------|
| Current (2025) | $0.15 in / $0.60 out | $0.04 | $0.015 |
| Price increase +50% | $0.225 / $0.90 | $0.06 | $0.022 |
| Price decrease -50% | $0.075 / $0.30 | $0.02 | $0.008 |
| Switch to open-source (Llama 3) | ~$0.05 / $0.15 | N/A (Stable Diffusion) | $0.005 |

### Break-even Analysis

| Plan | Credits/mies. | Revenue | Cost at current prices | Break-even usage |
|------|--------------|---------|----------------------|-----------------|
| Starter | 100 | $4.99 | $1.50 (100 × $0.015) | 333 credits (3.3× allocation) |
| Pro | 500 | $14.99 | $7.50 (500 × $0.015) | 999 credits (2× allocation) |
| Unlimited | 2000 FUP | $29.99 | $30.00 (2000 × $0.015) | 1999 credits ≈ break-even |

> **Insight**: Unlimited plan is break-even hedge — most "Unlimited" users consume <1000 credits, so actual margin is positive.

---

## 4 Scenariusze Revenue (AI Credits Only, 12 Months)

### Założenia wspólne

| Parametr | Wartość |
|----------|---------|
| Month 1-3 | Free only (10 credits/user) |
| Month 4 | Starter + Pro launch |
| Month 7 | Unlimited + top-up launch |
| Starting MAU (M4) | Per scenario |

---

### Scenariusz 1: SOFT

| Param | Value |
|-------|-------|
| MAU M12 | 600 |
| Conversion to paid | 5% |
| Mix: Starter/Pro/Unlimited | 70/25/5 |

| Miesiąc | Paying users | AI Credits Revenue/mies. |
|---------|-------------|------------------------|
| M4-6 | 8-12 | $50-70 |
| M7-9 | 15-20 | $100-140 |
| M10-12 | 20-30 | $140-200 |
| **Year 1 Total** | | **~$1,200** |

---

### Scenariusz 2: MEDIUM

| Param | Value |
|-------|-------|
| MAU M12 | 1,500 |
| Conversion to paid | 8% |
| Mix: Starter/Pro/Unlimited | 60/30/10 |

| Miesiąc | Paying users | AI Credits Revenue/mies. |
|---------|-------------|------------------------|
| M4-6 | 15-30 | $100-250 |
| M7-9 | 40-60 | $350-600 |
| M10-12 | 80-120 | $700-1,100 |
| **Year 1 Total** | | **~$5,500** |

---

### Scenariusz 3: AGGRESSIVE

| Param | Value |
|-------|-------|
| MAU M12 | 5,000 |
| Conversion to paid | 12% |
| Mix: Starter/Pro/Unlimited | 50/35/15 |

| Miesiąc | Paying users | AI Credits Revenue/mies. |
|---------|-------------|------------------------|
| M4-6 | 40-80 | $300-700 |
| M7-9 | 150-300 | $1,500-3,000 |
| M10-12 | 400-600 | $4,000-6,500 |
| **Year 1 Total** | | **~$25,000** |

---

### Scenariusz 4: BALANCED (rekomendowany)

| Param | Value |
|-------|-------|
| MAU M12 | 2,000 |
| Conversion to paid | 8% |
| Mix: Starter/Pro/Unlimited | 55/30/15 |

| Miesiąc | Paying users | AI Credits Revenue/mies. |
|---------|-------------|------------------------|
| M4-6 | 20-40 | $150-350 |
| M7-9 | 60-100 | $500-900 |
| M10-12 | 100-160 | $900-1,500 |
| **Year 1 Total** | | **~$7,500** |

---

### Porównanie scenariuszy (AI Credits)

| Metryka | Soft | Medium | Aggressive | **Balanced** |
|---------|------|--------|-----------|-------------|
| Year 1 AI credits revenue | $1,200 | $5,500 | $25,000 | **$7,500** |
| Year 1 AI API cost | $300 | $1,500 | $8,000 | **$2,200** |
| Gross margin | 75% | 73% | 68% | **71%** |
| ARPU (paying, AI only) | $5.50 | $8.50 | $13.00 | **$9.50** |

---

## Anti-Abuse Guardrails

| Rule | Implementation | Reason |
|------|---------------|--------|
| **Rate limit** | Max 50 credits/hour (any plan) | Prevents automated abuse |
| **FUP on Unlimited** | 2000 credits/mies.; soft throttle above | Cost protection |
| **Multi-account detection** | Same device/IP × multiple free accounts → flag | Free tier farming |
| **Content filter** | Output scanned for prohibited content (doc 23, 27) | Safety |
| **Referral abuse** | Max 5 referral credit bonuses per account | Referral farming prevention |
| **Suspicious usage patterns** | >90% identical prompts → review queue | Bot/API abuse |
| **Refund policy** | Credits are non-refundable; subscription cancel = no new credits but keep remaining until period end | Revenue protection |

### Abuse Detection Flow

```
Usage event →
  Rate limit check (>50/h?) →
    YES → Throttle (queue, not block)
    NO →
  Pattern check (identical prompts? bulk?) →
    YES → Flag for manual review
    NO →
  Multi-account check (device fingerprint match?) →
    YES → Restrict to single account credits
    NO → Process normally
```

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| ACE-01 | Free tier too generous → users never upgrade | ŚREDNIE | WYSOKI | 10 credits = ~5 simple actions; Active creators exhaust in 3-5 days |
| ACE-02 | API cost spikes eat margin | NISKIE | WYSOKI | Weekly cost monitoring; automatic tier downgrade (GPT-4o → mini) if costs >120% budget |
| ACE-03 | Users perceive credits as „fake currency" (trust issue) | NISKIE | ŚREDNI | Transparent mapping: 1 credit = 1 action; show $ equivalent |
| ACE-04 | Competitor offers unlimited AI cheaper | ŚREDNIE | ŚREDNI | Value is integration (AI→publish on HHU), not raw AI; hard to replicate context |
| ACE-05 | Under-pricing Unlimited plan (power users cost more than revenue) | NISKIE | ŚREDNI | FUP at 2000; monitor actual usage; adjust FUP or price after 6 months |

---

## Rekomendacja

### TERAZ (MVP)

1. Free tier: 10 credits/mies. — build habit
2. Credit tracking backend (simple counter per user)
3. Credit UI: show remaining, show cost before action

### NASTĘPNIE (v0.3)

4. Starter ($4.99) + Pro ($14.99) plans via Stripe
5. Top-up packs (v0.5)
6. Anti-abuse: rate limiting + multi-account detection

### PÓŹNIEJ (v1.0+)

7. Unlimited plan ($29.99)
8. Enterprise credits (API access for Labels)
9. Credit gifting (Creator → Fan reward)
10. Dynamic pricing experiments

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-116 | Czy 10 free credits/mies. jest za dużo lub za mało? | 🟡 DO DECYZJI | Rekomendacja: 10 = sweet spot (5 text + no images); A/B test 5 vs 10 vs 15 w v0.3 |
| FDN-117 | Czy top-up packs powinny istnieć obok subscriptions? | 🟡 DO DECYZJI | Rekomendacja: tak (v0.5); some creators prefer pay-per-use over commitment |
| FDN-118 | Czy credits powinny expirować (use-it-or-lose-it)? | 🟡 DO DECYZJI | Rekomendacja: subscription credits expire end of billing period; top-up credits don't expire (12-month validity) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 11 — Revenue Model |
| ← INPUT | 39 — HHU Monetization Stack |
| ← INPUT | 41 — AI Studio Creator Product Spec |
| ← INPUT | 42 — Workflow Library Blueprint |
| → OUTPUT | 48 — Monetization Engine Master Spec |
| → CROSS | 22 — KYC / Verification (payment eligibility) |
| → CROSS | 49 — Trust & Safety (anti-abuse) |
