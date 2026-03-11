# 37 — Brand & Label Partnership Model

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Zdefiniować model B2B współpracy z wytwórniami i markami |
| **Zakres** | v0.5+ (post-MVP) |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 11 (Revenue Model), 31 (Product Thesis), 36 (Artist Partnership) |
| **Zależności wyjściowe** | → 39 (Monetization Stack), 40 (GTM Poland), 48 (Monetization Engine) |

---

## Executive Summary

HHU nie jest zależny od B2B revenue w MVP — ale w fazie Growth (v0.5+) partnerstwa z wytwórniami muzycznymi i markami lifestyle stanowią **trzeci strumień przychodu** (obok subscriptions i AI credits). Ten dokument definiuje 3 typy partnerów, 4 pakiety sponsorskie, merch/drop flow i pricing framework.

---

## Kiedy aktywować B2B

| Faza | Trigger | Akcja |
|------|---------|-------|
| MVP (v0.1-v0.3) | — | ❌ Brak B2B — focus na artystów i fanów |
| Pre-B2B (v0.3-v0.5) | ≥500 MAU, ≥50 active Creators | Talks z wytwórniami; demo dashboard |
| B2B (v0.5+) | ≥1000 MAU, ≥100 Creators | Launch Partner Dashboard; onboard first Label |
| Scale (v1.0+) | ≥5000 MAU | Full B2B: Brands, Events, international Labels |

> **Zasada**: NIE sprzedawaj reklam na pustej platformie. Audience first, monetization second.

---

## Typy partnerów

### Typ 1: Wytwórnia muzyczna (Label)

| Element | Wartość |
|---------|---------|
| **Kto** | Polska wytwórnia hip-hop (np. SBM Label, Step Records, Prosto) |
| **Co zyskuje** | Multi-artist dashboard, analytics, promo tools |
| **Co HHU zyskuje** | Batch onboarding artystów (5-20 na wytwórnię), credibility |
| **Kiedy** | v0.5+ |

#### Label Dashboard (v0.5+)

| Feature | Opis |
|---------|------|
| Multi-artist view | Statystyki wszystkich artystów wytwórni w jednym panelu |
| Content scheduling | Planowanie postów i drops za wielu artystów |
| Revenue reports | Zbiorczy raport tips/subs per artist |
| Verification fast-track | Bulk KYC dla sygnatariuszy wytwórni (via Sumsub) |
| Promo tools | Boosted posts, featured placement allocation |

#### Label Pricing

| Plan | Cena/mies. | Artyści | Features |
|------|-----------|---------|----------|
| Starter | $49/mies. | ≤5 | Dashboard + analytics basic |
| Growth | $149/mies. | ≤20 | Dashboard + scheduling + featured x2/mies. |
| Enterprise | Custom | Unlimited | All features + dedicated support + API access |

---

### Typ 2: Marka lifestyle (Brand)

| Element | Wartość |
|---------|---------|
| **Kto** | Brand z afinitywanej kategorii (streetwear, sneakers, drink, tech) |
| **Co zyskuje** | Sponsored content, challenges, branded drops |
| **Co HHU zyskuje** | Revenue (ad spend), content diversity |
| **Kiedy** | v0.5+ (min 1000 MAU) |

#### Sponsorship Packages

| Pakiet | Cena | Co zawiera | Limit/mies. |
|--------|------|-----------|-------------|
| **Community Challenge** | $500/kampanię | Branded challenge (np. „Drop 16 bars w X beat") + pinned 7 dni | 4 |
| **Featured Drop** | $1000/drop | Full-page promo: merch/music drop z branded graphics | 2 |
| **Native Collab** | $2000/mies. | Sponsored Creator posts (organiczny format) + analytics report | 1 |
| **Event Sponsor** | Custom | Named sponsor dla HHU-hosted event (cypher, battle, listening party) | As needed |

#### Brand Safety Rules

| Reguła | Uzasadnienie |
|--------|-------------|
| Brands muszą mieć afinitywność z hip-hop culture | Utrzymaj autentyczność; no clickbait |
| Sponsored content oznaczony jasno („Sponsorowane") | GDPR/DSA/UOKiK compliance (doc 21, 23) |
| HHU ma prawo odmówić brand partnership | Ochrona community; documented rejection process |
| Brak ads z kategorii: gambling, payday loans, weapons, tobacco | Safety policy (doc 27, 28) |
| Creator ma prawo odmówić sponsored content | Creator autonomy; no forced brand posts |

---

### Typ 3: Partner eventowy (Events)

| Element | Wartość |
|---------|---------|
| **Kto** | Organizator koncertu, festiwalu, battle rap eventu |
| **Co zyskuje** | Promo na platformie, Creator outreach, ticket/RSVP integration |
| **Co HHU zyskuje** | Event content (recaps), engagement spike, PR |
| **Kiedy** | v1.0+ |

---

## Merch / Drop Flow

### Kontekst

Artista chce sprzedać merch (np. koszulkę, vinyl) lub zrobić music drop bezpośrednio na HHU. HHU JEST platformą social, NIE e-commerce — ale integracje zewnętrzne pozwalają na drop flow.

### Flow

```
Creator → "Create Drop" → Upload grafika + opis + link zewnętrzny
                         → Set drop time (schedule)
                         → Choose audience: All / Subscribers only / Tier
                         
Fan → Widzi Drop w feedzie → CTA "Kup teraz" → Redirect do external shop
                           → Countdown timer (pre-drop)
                           → "Remind me" notification opt-in
```

### MVP of Drops (v0.3)

| Element | MVP | v0.5 | v1.0 |
|---------|-----|------|------|
| Drop post type | ✅ Grafika + link + timer | ✅ + countdown | ✅ + analytics dashboard |
| Payment | External link only | External link | HHU payment integration (Stripe via doc 48) |
| Subscribers-only drop | ❌ | ✅ | ✅ + tiers |
| Drop analytics | ❌ | Click count | Conversion tracking |

---

## Revenue Projections per Partner Type

### Scenariusz: v0.5+ (1000 MAU, 100 Creators)

| Źródło | Units/mies. | Revenue/mies. | Annual |
|--------|-------------|--------------|--------|
| Label Starter | 2 | $98 | $1,176 |
| Label Growth | 1 | $149 | $1,788 |
| Community Challenge | 1 | $500 | $6,000 |
| Featured Drop | 0.5 | $500 | $6,000 |
| Native Collab | 0 | $0 | $0 |
| **Total** | | **$1,247/mies.** | **$14,964/rok** |

### Scenariusz: v1.0+ (5000 MAU, 500 Creators)

| Źródło | Units/mies. | Revenue/mies. | Annual |
|--------|-------------|--------------|--------|
| Label (mixed) | 5 | $500 | $6,000 |
| Community Challenge | 3 | $1,500 | $18,000 |
| Featured Drop | 2 | $2,000 | $24,000 |
| Native Collab | 1 | $2,000 | $24,000 |
| Event Sponsor | 0.5 | $2,500 | $30,000 |
| **Total** | | **$8,500/mies.** | **$102,000/rok** |

---

## Partner Onboarding Flow

```
1. Lead discovery (HHU → Brand/Label OR Brand/Label → HHU)
2. Initial call (Founder/BD lead): alignment check
3. Proposal + package selection
4. Agreement (email confirmation → v0.5; formal contract → v1.0)
5. Dashboard setup (Label) / Campaign brief (Brand)
6. Content approval (HHU reviews campaign creative)
7. Go live
8. Monthly reporting + renewal discussion
```

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| BL-01 | Brak zainteresowania wytwórni | ŚREDNIE | WYSOKI | Start od Ambasadorów (doc 36) → ich wytwórnie = natural pipeline |
| BL-02 | Brand safety incident (marka niezgodna z culture) | NISKIE | WYSOKI | Review committee; brand category blacklist |
| BL-03 | Revenue cannibalization (brand promo zmniejsza organic reach) | NISKIE | ŚREDNI | Cap na sponsored content: max 10% of feed |
| BL-04 | Wytwórnia demand: exclusive features | ŚREDNIE | ŚREDNI | Standardized packages; no one-off custom development |
| BL-05 | Team konieczny na B2B sales (Founder = solo) | WYSOKIE | WYSOKI | Delay B2B do growth metrics; hire BD w v0.5+ |

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-99 | Czy Label Starter pricing $49/mies. jest competitive w polskim rynku? | 🟡 DO DECYZJI | Benchmark: Spotify for Artists jest free; wartość HHU = niszowe audience |
| FDN-100 | Czy Brand ads (sponsored content) powinny pojawić się dopiero przy ≥1000 MAU czy wcześniej? | 🟡 DO DECYZJI | Rekomendacja: ≥1000 MAU; wcześniej = ryzyko „pusta platforma z reklamami" |
| FDN-101 | Czy HHU powinien budować in-house payment dla drops czy zostawić external links? | 🟡 DO DECYZJI | Rekomendacja: external links do v1.0; in-house = complexity (Stripe fees, refunds, liability) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 11 — Revenue Model |
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 36 — Artist Partnership Program |
| → OUTPUT | 39 — HHU Monetization Stack |
| → OUTPUT | 40 — HHU Go-To-Market Poland |
| → OUTPUT | 48 — Monetization Engine Master Spec |
| → CROSS | 21 — Legal Backbone (contract templates) |
| → CROSS | 23 — Content Moderation (branded content rules) |
| → CROSS | 27 — Trust & Safety (brand safety) |
