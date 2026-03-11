# 47 — RFG Premium & Partnership Model

| Pole | Wartość |
|------|---------|
| **Projekt** | Rocket Fuel Girls (RFG) |
| **Cel decyzji** | Rozpisać premium warstwę przychodową i partnerstwa B2B |
| **Zakres** | Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 11 (Revenue Model), 39 (HHU Monetization), 45 (RFG Positioning), 46 (RFG Safety) |
| **Zależności wyjściowe** | → 48 (Monetization Engine Master Spec), 50 (Investor Narrative) |

---

## Executive Summary

RFG monetyzacja opiera się na **3 filarach**: (1) Creator Pro subscription, (2) Brand access fees, (3) AI credits (shared z ekosystemem). RFG celuje w **wyższą ARPU** niż HHU — Creators traktują portfolio jako narzędzie zarobkowe, więc są skłonni płacić więcej. Ten dokument definiuje premium layers, partner types, revenue logic, brand safety i **4 scenariusze**.

---

## Revenue Streams — Overview

| # | Stream | Kto płaci | Kiedy | Typ |
|---|--------|----------|-------|-----|
| 1 | **RFG Pro** (Creator subscription) | Creator | v0.5 | B2C recurring |
| 2 | **AI Credits** | Creator | v0.5 | B2C usage-based |
| 3 | **Brand Access** (B2B subscription) | Brand / Agency | v0.7 | B2B recurring |
| 4 | **Casting Flow Commission** | Brand (per-booking) | v1.0 | B2B transactional |
| 5 | **Featured Placement** | Creator / Brand | v0.7 | B2C/B2B boost |

---

## Stream 1: RFG Pro (Creator)

### Free vs Pro

| Feature | Free | Pro ($12.99/mies.) |
|---------|------|-------------------|
| Portfolio images | 20 max | Unlimited |
| Portfolio categories | 2 | Unlimited |
| AI credits | 10/mies. (shared) | 150/mies. |
| Discovery visibility | Standard | Priority (2× weight in search) |
| Brand contact | Can receive only | Can receive + see Brand analytics |
| Analytics | Views count | Views + demographics + Brand impressions |
| Portfolio link | rfg.app/username | Custom vanity URL |
| Watermark | HHU watermark | Optional / removable |
| Badge | — | RFG Pro ⭐ badge |

### Pro Pricing

| Plan | Cena | Billing |
|------|------|---------|
| Monthly | $12.99/mies. | Stripe recurring |
| Annual | $119.99/rok (~$10/mies., 23% discount) | Stripe recurring |

> **Why $12.99 (not $9.99)?** RFG Pro offers professional-grade portfolio features; modeling industry tools cost $20-50/mies.; RFG is a bargain.

---

## Stream 2: AI Credits

Shared z HHU ecosystem (doc 39, 43). Same pricing: Starter $4.99, Pro $14.99, Unlimited $29.99. RFG Pro already includes 150 credits (vs base 10).

---

## Stream 3: Brand Access (B2B)

### Brand Plans

| Plan | Cena/mies. | Features |
|------|-----------|----------|
| **Browse** | Free | View public portfolios; no contact |
| **Connect** | $99/mies. | Verified Brand (B1); send contact requests (20/mies.); see Creator analytics |
| **Professional** | $299/mies. | B1+; unlimited contacts; casting flow; featured Brand listing; API access (v1.0) |
| **Enterprise** | Custom | B2+; managed service; dedicated support; bulk castings; analytics API |

### Brand Value Proposition

| Feature | Browse (free) | Connect ($99) | Professional ($299) |
|---------|-------------|--------------|-------------------|
| View portfolios | ✅ (public only) | ✅ (all) | ✅ (all) |
| Contact Creators | ❌ | ✅ 20/mies. | ✅ Unlimited |
| Post casting calls | ❌ | ✅ 2/mies. | ✅ Unlimited |
| Featured Brand badge | ❌ | ❌ | ✅ |
| Creator shortlists | ❌ | ✅ 3 lists | ✅ Unlimited lists |
| Analytics (who viewed posting) | ❌ | Basic | Advanced |
| Casting flow (structured booking) | ❌ | ❌ | ✅ (v1.0) |

---

## Stream 4: Casting Flow Commission (v1.0)

### Concept

Structured booking: Brand posts casting → Creators apply → Brand selects → Booking confirmed → Payment via platform → RFG takes commission.

| Element | Wartość |
|---------|---------|
| Commission | 10% of booking value |
| Minimum booking | $50 |
| Payment | Stripe Connect (same as HHU tips/subs) |
| Payout to Creator | After booking completed + 7 day holdback |
| Dispute resolution | RFG mediation (Founder/admin) |

> **v1.0 only**: Casting flow is complex (legal, payments, disputes). Build when platform proven.

---

## Stream 5: Featured Placement

| Product | Kto | Cena | Opis |
|---------|-----|------|------|
| **Boost Portfolio** | Creator | $4.99/tydzień | 2× visibility in search results for 7 days |
| **Featured Listing** | Brand | $49.99/tydzień | Brand card in „Browse Brands" section |
| **Spotlight** | Creator | $9.99/tydzień | Pinned in „New Creators" carousel |

---

## 4 Scenariusze Revenue (RFG, 12 Months from RFG Launch)

### Założenia wspólne

| Parametr | Wartość |
|----------|---------|
| RFG launch | v0.5 (approximately month 7 of HHU, so HHU M7 = RFG M1) |
| Starting Creators | 50 (invite-only alpha) |
| Brand accounts | 0 at launch; 5-10 by RFG M3 |

---

### Scenariusz 1: SOFT

| Param | Value |
|-------|-------|
| RFG M12 Creators | 300 |
| Brands (paying) | 5 |
| Pro conversion | 5% |

| Quarter | Revenue/mies. |
|---------|--------------|
| Q1 (RFG M1-3) | $50-100 |
| Q2 (RFG M4-6) | $150-300 |
| Q3 (RFG M7-9) | $300-500 |
| Q4 (RFG M10-12) | $500-800 |
| **Year 1 Total** | **~$4,000** |

---

### Scenariusz 2: MEDIUM

| Param | Value |
|-------|-------|
| RFG M12 Creators | 800 |
| Brands (paying) | 15 |
| Pro conversion | 8% |

| Quarter | Revenue/mies. |
|---------|--------------|
| Q1 | $100-300 |
| Q2 | $500-1,000 |
| Q3 | $1,000-2,000 |
| Q4 | $2,000-3,000 |
| **Year 1 Total** | **~$16,000** |

---

### Scenariusz 3: AGGRESSIVE

| Param | Value |
|-------|-------|
| RFG M12 Creators | 2,000 |
| Brands (paying) | 40 |
| Pro conversion | 12% |

| Quarter | Revenue/mies. |
|---------|--------------|
| Q1 | $300-700 |
| Q2 | $1,500-3,000 |
| Q3 | $3,500-6,000 |
| Q4 | $6,000-10,000 |
| **Year 1 Total** | **~$55,000** |

---

### Scenariusz 4: BALANCED (rekomendowany)

| Param | Value |
|-------|-------|
| RFG M12 Creators | 500 |
| Brands (paying) | 10 |
| Pro conversion | 8% |

| Quarter | Revenue/mies. |
|---------|--------------|
| Q1 | $80-200 |
| Q2 | $400-800 |
| Q3 | $800-1,500 |
| Q4 | $1,500-2,500 |
| **Year 1 Total** | **~$10,000** |

---

### Porównanie scenariuszy (RFG only)

| Metryka | Soft | Medium | Aggressive | **Balanced** |
|---------|------|--------|-----------|-------------|
| Year 1 revenue | $4,000 | $16,000 | $55,000 | **$10,000** |
| Creator ARPU | $3/mies. | $6/mies. | $9/mies. | **$5/mies.** |
| B2B % of revenue | 25% | 35% | 40% | **30%** |
| Break-even month | Never | M10 | M5 | **M9** |

---

## Partner Types — B2B Detail

### Fashion Brands

| Sub-type | Przykład | Partnership model |
|----------|---------|-------------------|
| Streetwear | Local PL brands, young designers | Community Challenge sponsor; influencer casting |
| Luxury | International entering PL market | Featured Drop; premium casting flow |
| Fast fashion | Mass market | Bulk casting; volume deals |

### Beauty / Cosmetics

| Sub-type | Przykład | Partnership model |
|----------|---------|-------------------|
| Indie beauty | Polish indie cosmetics brands | Creator collab; authentic content |
| Professional make-up | MAC, NYX (entering creator space) | Casting for tutorials / campaigns |

### Photography

| Sub-type | Przykład | Partnership model |
|----------|---------|-------------------|
| Professional photographer | Studio photographers seeking models | Direct booking via casting flow |
| Photography brand | Canon, Sony sponsoring creator content | Sponsored challenges |

### Agencies

| Sub-type | Przykład | Partnership model |
|----------|---------|-------------------|
| Modeling agency | Traditional agencies expanding digital | Enterprise plan; discovery tools for scouts |
| Talent agency | Multi-talent representation | Multi-creator dashboard (similar to HHU Label) |

---

## Brand Safety Implications

| Reguła | Mechanizm |
|--------|-----------|
| All Brands must complete B1 verification | Sumsub business KYC (doc 46) |
| NSFW brands rejected (adult, gambling, weapons) | Category blacklist at registration |
| Sponsored content clearly labeled | „Współpraca" badge on content |
| Creator has right to refuse any Brand | No forced collaborations ever |
| RFG reviews Brand ratings quarterly | Low-rated Brands get warning → restrictions |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| RFGP-01 | Creators don't see value in RFG Pro vs free | ŚREDNIE | WYSOKI | Free = limited (20 images, 2 categories); Pro = professional-grade |
| RFGP-02 | Brands don't adopt (market too small in PL) | ŚREDNIE | ŚREDNI | Start with Polish beauty/fashion niche; expand internationally |
| RFGP-03 | Casting commission creates legal complexity | NISKIE | WYSOKI | v1.0 only; legal review (doc 21) before launch |
| RFGP-04 | RFG cannibalizes HHU revenue (shared AI credits) | NISKIE | NISKI | Separate verticals; overlap = bonus (user on both = higher total ARPU) |
| RFGP-05 | Pricing too high for Polish market | ŚREDNIE | ŚREDNI | $12.99 ≈ 52 PLN; competitive with existing tools ($20-50); value: portfolio + AI |

---

## Rekomendacja modelu

### TERAZ (v0.5 — RFG alpha)

1. RFG Pro ($12.99/mies.) — portfolio + AI credits
2. Free tier (limited portfolio)
3. AI credits (shared pricing with HHU)

### NASTĘPNIE (v0.7)

4. Brand Connect plan ($99/mies.)
5. Featured placement (Boost + Spotlight)
6. Brand Professional plan ($299/mies.)

### PÓŹNIEJ (v1.0+)

7. Casting Flow with 10% commission
8. Enterprise Brand plans
9. International Brand partnerships

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-127 | Czy $12.99/mies. za RFG Pro jest competitive w PL? | 🟡 DO DECYZJI | Rekomendacja: tak; ModelMayhem Pro = $20; PortfolioBox = $14; RFG adds AI |
| FDN-128 | Czy Brand Connect $99/mies. to accessible price dla small PL brands? | 🟡 DO DECYZJI | Rekomendacja: tak; alternative (agency) = 10-30× more expensive; consider $49 intro tier |
| FDN-129 | Czy 10% casting commission jest competitive? (Agency = 15-25%) | 🟡 DO DECYZJI | Rekomendacja: 10% is very competitive; can increase to 12-15% once value proven |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 11 — Revenue Model |
| ← INPUT | 39 — HHU Monetization Stack |
| ← INPUT | 45 — RFG Strategic Positioning |
| ← INPUT | 46 — RFG Safety & Verification Model |
| → OUTPUT | 48 — Monetization Engine Master Spec |
| → OUTPUT | 50 — Investor Narrative & Funding Roadmap |
| → CROSS | 22 — KYC (Brand/Creator verification) |
| → CROSS | 43 — AI Credits Economics |
