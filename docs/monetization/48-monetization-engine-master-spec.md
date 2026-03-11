# 48 — Monetization Engine Master Spec

| Pole | Wartość |
|------|---------|
| **Projekt** | Monetization Engine (META-GENIUSZ OS) |
| **Cel decyzji** | Centralny dokument całego systemu przychodów |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 11 (Revenue Model), 15 (System Architecture), 39 (HHU Monetization), 43 (AI Credits), 47 (RFG Premium) |
| **Zależności wyjściowe** | → 50 (Investor Narrative) |

---

## Executive Summary

Monetization Engine to **centralny system przychodów** dla całego ekosystemu META-GENIUSZ OS — obsługuje subscriptions, AI credits, commissions, tips, payouts, entitlements, billing i revenue analytics dla HHU, RFG i AI Studio. Jeden engine, wiele verticalów. Kluczowa zasada: **build once, reuse across verticals** — każdy vertical korzysta z shared billing/payout infrastructure.

---

## Revenue Layers — Consolidated

| # | Revenue Layer | Product | Payer | Timing | Annual Revenue (Balanced, Y1) |
|---|--------------|---------|-------|--------|-------------------------------|
| 1 | AI Credits (subscription) | AI Studio | Creator | v0.3 | ~$7,500 (doc 43) |
| 2 | AI Credits (top-up) | AI Studio | Creator | v0.5 | ~$1,500 |
| 3 | Tips | HHU | Fan → Creator | v0.3 | ~$3,000 |
| 4 | Creator Subscriptions | HHU | Fan → Creator | v0.5 | ~$2,500 |
| 5 | HHU Pro | HHU | User | v0.5 | ~$4,000 |
| 6 | RFG Pro | RFG | Creator | v0.5 | ~$5,000 (doc 47 prorated) |
| 7 | Brand Access (B2B) | HHU + RFG | Brand | v0.5-v0.7 | ~$4,000 |
| 8 | Featured Placement | HHU + RFG | Creator / Brand | v0.7 | ~$1,000 |
| 9 | Casting Commission | RFG | Brand | v1.0 | $0 (Y1) |
| | **Total (Balanced Y1)** | | | | **~$28,500** |

---

## System Architecture

### Component Diagram

```
┌──────────────────────────────────────────────────┐
│              Monetization Engine                  │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐             │
│  │  Subscription │  │    Credit    │             │
│  │   Service     │  │   Ledger    │             │
│  │              │  │              │             │
│  │ - Plans      │  │ - Balance    │             │
│  │ - Billing    │  │ - Deductions │             │
│  │ - Renewal    │  │ - Top-up    │             │
│  │ - Cancel     │  │ - Expiry    │             │
│  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                     │
│  ┌──────▼──────────────────▼───────┐             │
│  │      Entitlement Service         │             │
│  │                                  │             │
│  │ - Feature gates (Pro, Free)     │             │
│  │ - Credit availability check     │             │
│  │ - Rate limit enforcement        │             │
│  └──────────────┬──────────────────┘             │
│                 │                                │
│  ┌──────────────▼──────────────────┐             │
│  │       Payout Service             │             │
│  │                                  │             │
│  │ - Creator earnings ledger       │             │
│  │ - Commission calculation        │             │
│  │ - Payout scheduling             │             │
│  │ - Refund handling               │             │
│  └──────────────┬──────────────────┘             │
│                 │                                │
│  ┌──────────────▼──────────────────┐             │
│  │       Revenue Analytics          │             │
│  │                                  │             │
│  │ - MRR / ARR tracking           │             │
│  │ - Churn analysis                │             │
│  │ - Revenue per vertical          │             │
│  └─────────────────────────────────┘             │
└──────────────────────┬───────────────────────────┘
                       │
            ┌──────────▼──────────┐
            │    Stripe Connect    │
            │   (Payment Gateway)  │
            └─────────────────────┘
```

### Database Models (Prisma extension — doc 15)

```prisma
model Subscription {
  id          String   @id @default(cuid())
  userId      String
  plan        String   // "hhu_pro", "rfg_pro", "ai_starter", "ai_pro", "ai_unlimited"
  status      String   // "active", "canceled", "past_due", "trialing"
  stripeSubId String   @unique
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model CreditLedger {
  id        String   @id @default(cuid())
  userId    String
  amount    Int      // positive = credit, negative = debit
  type      String   // "subscription_grant", "topup", "usage", "bonus", "expiry"
  reference String?  // e.g., AI tool ID, workflow ID
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model EarningsLedger {
  id          String   @id @default(cuid())
  creatorId   String
  sourceType  String   // "tip", "subscription", "casting_commission"
  grossAmount Int      // in cents
  commission  Int      // platform commission in cents
  netAmount   Int      // creator payout in cents
  status      String   // "pending", "paid", "refunded", "disputed"
  paidAt      DateTime?
  createdAt   DateTime @default(now())
  creator     User     @relation(fields: [creatorId], references: [id])
}

model Payout {
  id              String   @id @default(cuid())
  creatorId       String
  amount          Int      // in cents
  currency        String   // "PLN", "USD", "EUR"
  stripeTransferId String?
  status          String   // "scheduled", "processing", "completed", "failed"
  scheduledFor    DateTime
  completedAt     DateTime?
  createdAt       DateTime @default(now())
  creator         User     @relation(fields: [creatorId], references: [id])
}
```

---

## Billing Flows

### Flow 1: Subscription Purchase

```
User → Select Plan → Stripe Checkout Session →
  Payment successful → Webhook: checkout.session.completed →
    Create Subscription record →
    Grant entitlements (features + credits) →
    Send confirmation email →
    Credit Ledger: +N credits (subscription_grant)
```

### Flow 2: Credit Usage (AI Tool)

```
User → Click AI button → 
  Check CreditLedger balance (SUM where userId) ≥ cost →
    YES → Process AI request →
      CreditLedger: -N credits (usage, reference: "AI-02") →
      Return AI result
    NO → Show AiUpgradePrompt (plan selection)
```

### Flow 3: Tip

```
Fan → Tip Creator ($5) → Stripe PaymentIntent →
  Payment successful → Webhook: payment_intent.succeeded →
    EarningsLedger: gross=$5, commission=$1 (20%), net=$4 →
    Creator balance updated →
    Notification to Creator: "Otrzymałeś tip $5 od @fan_name"
```

### Flow 4: Creator Payout

```
Weekly cron job (Friday 00:00 UTC) →
  For each Creator with pending earnings ≥ $10:
    Calculate total net amount →
    Create Stripe Transfer (Stripe Connect) →
    Payout record: status=processing →
    Stripe webhook: transfer.updated → status=completed
```

### Flow 5: Subscription Cancellation

```
User → Cancel subscription →
  Stripe: cancel_at_period_end = true →
  User keeps access until currentPeriodEnd →
  At period end: Webhook: customer.subscription.deleted →
    Subscription status = "canceled" →
    Revoke premium entitlements →
    Credits expire (unused subscription credits)
```

### Flow 6: Refund

```
User requests refund → 
  Admin reviews (< 14 days since purchase? EU consumer law) →
    Approved → Stripe Refund →
      EarningsLedger: status=refunded (if tip/sub) →
      CreditLedger: credits clawed back (if AI credits) →
      Subscription canceled immediately
    Denied → Notification to user with reason
```

---

## Entitlement Model

| Feature | Free | HHU Pro | RFG Pro | AI Starter | AI Pro | AI Unlimited |
|---------|------|---------|---------|-----------|--------|-------------|
| AI credits/mies. | 10 | 200 | 150 | 100 | 500 | 2000 FUP |
| Portfolio images (RFG) | 20 | — | ∞ | — | — | — |
| Ad-free feed (HHU) | ❌ | ✅ | — | ❌ | ❌ | ❌ |
| Priority discovery | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Extended analytics | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Tips (send) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tips (receive) | L1+ | L1+ | L2+ | L1+ | L1+ | L1+ |
| Creator subs (receive) | L2+ | L2+ | L2+ | L2+ | L2+ | L2+ |

> **Stacking**: User can have HHU Pro + AI Pro simultaneously; credits ADD (200 + 500 = 700/mies.).

---

## Payout Logic

| Element | Wartość |
|---------|---------|
| Payout schedule | Weekly (Friday) |
| Min payout | $10 (or PLN equivalent) |
| Holdback period | 7 days (refund protection) |
| Payment method | Bank transfer via Stripe Connect |
| Supported currencies | PLN (primary), USD, EUR |
| Tax responsibility | Creator (doc 22 KYC includes tax ID) |
| Commission rates | HHU: 20% standard / 15% Ambasador; RFG casting: 10% |

### Payout Flow Diagram

```
Earning event (tip/sub/casting) →
  +7 days holdback →
  Available balance check ≥ $10? →
    YES → Add to weekly payout batch →
      Stripe Connect Transfer →
      Creator's bank account (2-5 business days)
    NO → Accumulate until threshold
```

---

## Fraud Considerations (→ doc 49)

| Fraud type | Detection | Prevention |
|-----------|-----------|-----------|
| **Self-tipping** (Creator tips themselves from alt account) | Same device/IP; credit card linkage | Block tips between accounts with same payment method; flag same-device tips |
| **Tip-and-refund** (Fan tips, requests chargeback) | Stripe Radar; chargeback monitoring | 7-day holdback; chargeback dispute automation |
| **Fake subscribers** (Bot accounts subscribing to inflate earnings) | Low-activity accounts with paid subs; device fingerprint | Min account age (7 days) before subscribing; human verification challenge |
| **Credit card fraud** (Stolen card used for subs) | Stripe Radar (ML-based) | 3D Secure required; velocity checks |
| **Creator payout fraud** (Fake Creator extracts payouts) | KYC mismatch; suspicious payout patterns | L2 verification required for any payout; manual review for first payout |

---

## 4 Scenariusze Revenue (Consolidated Ecosystem, 18 Months)

### Założenia

| Param | Value |
|-------|-------|
| HHU launch | M1 |
| RFG launch | M7 |
| HHU MAU (M18, balanced) | 3,000 |
| RFG Creators (M18, balanced) | 800 |

---

### Scenariusz 1: SOFT

| Vertical | Y1 Revenue | M13-M18 Revenue | 18-Month Total |
|----------|-----------|-----------------|---------------|
| HHU | $2,500 | $3,000 | $5,500 |
| AI Credits | $1,200 | $2,000 | $3,200 |
| RFG | $2,000 | $3,000 | $5,000 |
| B2B | $0 | $1,000 | $1,000 |
| **Total** | **$5,700** | **$9,000** | **$14,700** |

---

### Scenariusz 2: MEDIUM

| Vertical | Y1 Revenue | M13-M18 Revenue | 18-Month Total |
|----------|-----------|-----------------|---------------|
| HHU | $12,000 | $15,000 | $27,000 |
| AI Credits | $5,500 | $8,000 | $13,500 |
| RFG | $8,000 | $12,000 | $20,000 |
| B2B | $5,000 | $8,000 | $13,000 |
| **Total** | **$30,500** | **$43,000** | **$73,500** |

---

### Scenariusz 3: AGGRESSIVE

| Vertical | Y1 Revenue | M13-M18 Revenue | 18-Month Total |
|----------|-----------|-----------------|---------------|
| HHU | $45,000 | $50,000 | $95,000 |
| AI Credits | $25,000 | $35,000 | $60,000 |
| RFG | $27,000 | $40,000 | $67,000 |
| B2B | $15,000 | $25,000 | $40,000 |
| **Total** | **$112,000** | **$150,000** | **$262,000** |

---

### Scenariusz 4: BALANCED (rekomendowany)

| Vertical | Y1 Revenue | M13-M18 Revenue | 18-Month Total |
|----------|-----------|-----------------|---------------|
| HHU | $18,000 | $22,000 | $40,000 |
| AI Credits | $7,500 | $12,000 | $19,500 |
| RFG | $10,000 | $15,000 | $25,000 |
| B2B | $4,000 | $8,000 | $12,000 |
| **Total** | **$39,500** | **$57,000** | **$96,500** |

---

### Porównanie scenariuszy (18 months)

| Metryka | Soft | Medium | Aggressive | **Balanced** |
|---------|------|--------|-----------|-------------|
| 18-month revenue | $14,700 | $73,500 | $262,000 | **$96,500** |
| Total cost (infra + API) | $8,000 | $18,000 | $45,000 | **$22,000** |
| Net (before labor) | $6,700 | $55,500 | $217,000 | **$74,500** |
| Monthly burn rate (avg) | $450 | $1,000 | $2,500 | **$1,200** |
| Revenue mix: HHU/AI/RFG/B2B | 37/22/34/7 | 37/18/27/18 | 36/23/26/15 | **41/20/26/13** |

---

## Revenue Analytics — KPIs

| KPI | Definition | Target (M12) |
|-----|-----------|-------------|
| MRR (Monthly Recurring Revenue) | Sum of all active subscriptions | $3,000+ |
| ARR | MRR × 12 | $36,000+ |
| ARPU (all users) | Total revenue / MAU | $1.00+ |
| ARPU (paying users) | Total revenue / paying users | $10+ |
| Churn rate (monthly) | Canceled subs / total subs | <8% |
| LTV (Creator) | Average lifetime × ARPU | $60+ |
| CAC (Creator) | $0 (organic growth; no paid marketing) | $0 |
| LTV:CAC ratio | LTV / CAC | ∞ (organic) |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| ME-01 | Stripe Connect setup complex for solo dev | ŚREDNIE | WYSOKI | Use Stripe Express (pre-built onboarding); doc 15 recommends Stripe from start |
| ME-02 | Multi-currency handling (PLN/USD/EUR) | ŚREDNIE | ŚREDNI | PLN as default; Stripe handles currency conversion; simple accounting in PLN |
| ME-03 | Entitlement conflicts (double subscription edge cases) | NISKIE | ŚREDNI | Priority-based entitlement: highest plan wins; credits stack additively |
| ME-04 | Tax compliance complexity (VAT, international) | ŚREDNIE | WYSOKI | Stripe Tax (automatic VAT calculation); Creator gets 1099/equivalent from Stripe |
| ME-05 | Revenue accounting too manual at scale | NISKIE | ŚREDNI | Revenue Analytics service from M4; monthly reports automated |

---

## Rekomendacja wdrożeniowa

### TERAZ (MVP → v0.3)

1. Stripe Checkout for AI credits (Starter $4.99, Pro $14.99)
2. Credit Ledger (simple balance tracking)
3. Entitlement gate (credit check before AI action)
4. Stripe Connect setup for Creator tips

### NASTĘPNIE (v0.5)

5. HHU Pro + RFG Pro subscriptions
6. Creator Subscriptions (Fan → Creator via Stripe Connect)
7. Weekly payout automation
8. Basic revenue dashboard (Admin)

### PÓŹNIEJ (v1.0+)

9. Casting commission flow (RFG)
10. Advanced analytics (churn prediction, cohort analysis)
11. Enterprise B2B billing (invoice-based)
12. Multi-currency payout optimization

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-130 | Czy Stripe Connect Express vs Custom? | 🟡 DO DECYZJI | Rekomendacja: Express (simpler; pre-built KYC); Custom only if need full white-label |
| FDN-131 | Czy weekly payouts czy monthly? | 🟡 DO DECYZJI | Rekomendacja: weekly (better Creator satisfaction); monthly only if Stripe fees prohibitive |
| FDN-132 | Czy revenue dashboard w Admin na v0.5 czy v0.3? | 🟡 DO DECYZJI | Rekomendacja: v0.5 (v0.3 = Stripe Dashboard is sufficient) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 11 — Revenue Model |
| ← INPUT | 15 — System Architecture (Stripe, Prisma) |
| ← INPUT | 39 — HHU Monetization Stack |
| ← INPUT | 43 — AI Credits Economics Model |
| ← INPUT | 47 — RFG Premium & Partnership Model |
| → OUTPUT | 50 — Investor Narrative & Funding Roadmap |
| → CROSS | 22 — KYC (payout eligibility) |
| → CROSS | 49 — Trust & Safety / Anti-Fraud |
