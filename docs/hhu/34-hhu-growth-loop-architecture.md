# 34 — HHU Growth Loop Architecture

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Zbudować model wzrostu sieciowego HHU |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 31 (Product Thesis), 32 (Personas), 33 (MVP Scope) |
| **Zależności wyjściowe** | → 35 (Onboarding), 36 (Artist Partnership), 38 (Community), 40 (GTM Poland) |

---

## Executive Summary

HHU rośnie przez **3 główne growth loops**: Creator Content Loop (creator publikuje → fan odkrywa → fan angażuje się → creator widzi engagement → creator tworzy więcej), Social Proof Loop (creator ma followersów → nowi creatorzy dołączają bo tu jest audience), Monetization Loop (fan płaci → creator zarabia → creator inwestuje czas → content quality rośnie). W MVP aktywny jest tylko loop 1. Loop 2 aktywuje się przy ≥50 Creatorach. Loop 3 przy wdrożeniu tips (v0.5+). Ten dokument definiuje mechaniki, metryki i blockers dla każdego loop.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Content creation loop | ⚠️ Istnieje technicznie (feed + posts), brakuje auth, likes, follow |
| Social proof mechanisms | ❌ Brak (brak follower counts, trending, badges) |
| Monetization loop | ❌ Brak (zero payments) |
| Referral mechanism | ❌ Brak |
| Retention triggers | ❌ Brak (brak notifications, email digest) |
| Analytics / tracking | ❌ Brak |

---

## Growth Loop #1: Creator Content Loop (MVP)

**Typ**: Supply-side content loop
**Aktywacja**: v0.2 (post-auth)
**Drivers**: P1 (Raper), P2 (Producent)

```
Creator publikuje post
       ↓
Fan odkrywa post (discovery / feed)
       ↓
Fan angażuje się (like, comment, follow)
       ↓
Creator widzi engagement (notification, counter)
       ↓
Creator tworzy więcej contentu (dopamina + audience signal)
       ↓
Więcej contentu → lepszy discovery → więcej fanów
       ↓
Cykl się powtarza
```

### Metryki loop #1

| Metryka | Target MVP | Target v0.5 |
|---------|-----------|-------------|
| Posts per Creator per week | ≥ 2 | ≥ 3 |
| Likes per post (avg) | ≥ 3 | ≥ 10 |
| Comments per post (avg) | ≥ 1 | ≥ 3 |
| New followers per Creator per week | ≥ 2 | ≥ 10 |
| Creator retention (W1) | ≥ 40% | ≥ 60% |
| Fan retention (W1) | ≥ 20% | ≥ 35% |

### Blockers & Fixes

| Blocker | Wpływ | Fix |
|---------|-------|-----|
| Zero engagement nowego Creatora | Creator odchodzi po 3 postach bez lajków | Seeding: in-house engagement na first posts; notify fans o nowych Creatorach |
| Brak notifications | Creator nie wie, że ktoś lajkował | Notifications in-app (v0.3) + email digest weekly (v0.4) |
| Content quality niska | Fan nie wraca | AI tools (bio, captions) podnoszą jakość; featured content curation |
| Brak audio | Producent nie ma jak pokazać bitów | Audio snippets ≤30s (FDN-85/89) |

---

## Growth Loop #2: Social Proof Loop (v0.3+)

**Typ**: Network effects (cross-side)
**Aktywacja**: przy ≥50 Creatorach na platformie
**Drivers**: P1, P2 (nowi Creatorzy widzą istniejących)

```
50+ Creatorów na platformie
       ↓
Nowy artysta słyszy o HHU od innego artysty / widzi social proof
       ↓
Nowy artysta rejestruje się ("moi peers tu są")
       ↓
Nowy artysta zaprasza swoich fanów
       ↓
Więcej fanów → więcej engagement → więcej creatorów
       ↓
Network effect się wzmacnia
```

### Mechaniki social proof

| Mechanika | Faza | Opis |
|-----------|------|------|
| **Follower count** na profilu | v0.3 | Widoczna walidacja sociale |
| **Trending Creators** | v0.3 | Lista top Creatorów (engagement-based) |
| **„X artystów jest na HHU"** | v0.3 | Landing page social proof (counter) |
| **Verified Creator badge** | v1.0 | L3 verification = trust signal |
| **Featured Creator** | v0.4 | Ręczna curation: „Creator tygodnia" |
| **Cross-promo external** | v0.3 | „Jestem na HHU" badge/share link |

### Metryki loop #2

| Metryka | Target |
|---------|--------|
| Creator→Creator referral rate | ≥ 10% (1 na 10 zaprasza kolejnego) |
| Organic Creator signups (without direct outreach) | ≥ 30% of new Creators w v0.5 |
| Time to 100 Creators | ≤ 8 tygodni od launch |

---

## Growth Loop #3: Monetization Loop (v0.5+)

**Typ**: Economic incentive loop
**Aktywacja**: wdrożenie tips (v0.5) + subscriptions (v1.0)
**Drivers**: P1 (zarabia), P3 (wspiera)

```
Fan wysyła tip do Creatora
       ↓
Creator widzi: "zarobiłeś PLN 15 w tym tygodniu"
       ↓
Creator inwestuje więcej czasu (content quality ↑)
       ↓
Więcej / lepszy content → więcej fanów → więcej tips
       ↓
Creator promuje HHU external ("zarabiam tu na content")
       ↓
Nowi Creatorzy dołączają → monetization flywheel
```

### Revenue escalation

| Faza | Mechanizm | MRR target |
|------|-----------|------------|
| v0.5 | Tips (fan→Creator, 90/10 split) | PLN 500 |
| v0.5 | HHU Pro badge (PLN 29/mo) | PLN 1,450 (50 Creators) |
| v1.0 | Creator subscriptions (80/20 split) | PLN 5,000 |
| v1.0 | AI Credits top-ups | PLN 1,000 |
| v1.5 | Brand partnerships | PLN 5,000+ |

### Blockers & Fixes

| Blocker | Wpływ | Fix |
|---------|-------|-----|
| Fan nie chce płacić | Monetization loop nie startuje | Niski próg wejścia: tip PLN 2; value demonstration |
| Stripe onboarding complexity | Creator nie kończy payout setup | Uproszczony flow (Stripe Connect Express) |
| Creator nie widzi ROI | Nie promuje platformy | Dashboard z zarobkami + „share your earnings" |

---

## Activation Loops (jednorazowe)

| Loop | Trigger | Flow | KPI |
|------|---------|------|-----|
| **Creator activation** | Rejestracja | Register → onboarding → first post ≤ 10min | Time-to-first-post |
| **Fan activation** | Rejestracja | Register → browse → first follow ≤ 5min | Time-to-first-follow |
| **Monetization activation** | Tip button visible | See tip option → L2 verify → first tip | Tip conversion rate |
| **AI activation** | Profile setup | Bio field → „Generate with AI" CTA → generated bio | AI adoption rate |

---

## Retention Loops (powtarzalne)

| Loop | Frequency | Mechanika | KPI |
|------|-----------|-----------|-----|
| **Content check** | Daily | Open app → scroll feed → like/comment | DAU/MAU ≥ 20% |
| **New content alert** | 2-3x/week | Notification: „X opublikował nowy post" | Push open rate ≥ 15% |
| **Weekly digest** | Weekly | Email: top posts, new Creators, your stats | Email open rate ≥ 25% |
| **Trending check** | Daily | „Co jest na topie?" → trending feed | Trending feed visits/DAU |
| **Creator stats** | Weekly | Dashboard: followers, likes, tips this week | Creator W1 retention |

---

## Referral Mechanics

### Organic referral (v0.3)

| Mechanika | Opis | Koszt |
|-----------|------|-------|
| **Share post link** | Każdy post ma shareable link z OG image | $0 (dev time only) |
| **„Jestem na HHU" badge** | Creator embeddable badge na IG/website | $0 |
| **Invite link** | Unikalny link: hhu.metageniusz.com/invite/[username] | $0 |
| **„Dołącz do mnie na HHU"** | Auto-generated promo image z AI | 1 credit |

### Incentivized referral (v0.5+)

| Mechanika | Incentive | Limit |
|-----------|-----------|-------|
| **Creator invites Creator** | +50 AI credits (obie strony) | 10/mies. |
| **Creator invites Fan** | +5 AI credits per 5 invited fans | 50/mies. |
| **Fan invites Fan** | Badge: „Hip-Hop Ambassador" at 10 invites | Unlimited |

---

## Growth Phases Timeline

### Phase 0: Pre-Launch (tydzień -4 do 0)

| Akcja | Target | Owner |
|-------|--------|-------|
| Outreach 1:1 do artystów (doc 36) | 50 Creatorów pre-registered | Founder |
| Seed content: 10 postów per Creator | 500 postów na launch day | Founder + Creators |
| Landing page z social proof | „50 artystów czeka" | Dev |
| Invite-only registration | Kontrolowany growth | Dev |

### Phase 1: Soft Launch (tydzień 1-4)

| Metryka | Target |
|---------|--------|
| Registered Users | 200 |
| Active Creators | 50 |
| Posts per day | 20 |
| DAU | 50 |
| Loop #1 active | ✅ |

### Phase 2: Traction (tydzień 5-8)

| Metryka | Target |
|---------|--------|
| Registered Users | 500 |
| Active Creators | 80 |
| Posts per day | 50 |
| DAU | 100 |
| Loop #2 starting | ✅ (50+ Creators) |

### Phase 3: Growth (tydzień 9-12)

| Metryka | Target |
|---------|--------|
| MAU | 500 |
| Active Creators | 100+ |
| DAU/MAU | ≥ 20% |
| First tips (if v0.5 ready) | 10 transactions |
| Organic Creator signups | ≥ 20% |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| GL-01 | Cold start failure — Creator nie widzi fanów, odchodzi | WYSOKIE | KRYTYCZNY | Pre-seed: 50 Creatorów + ich fani; in-house engagement na early posts |
| GL-02 | Leaky bucket — users rejestrują się ale nie wracają | WYSOKIE | WYSOKI | Retention loops: notifications, email digest, push (v0.5+) |
| GL-03 | Creator retention < 30% W1 | ŚREDNIE | WYSOKI | „First week success" checklist; outreach 1:1 do chorujących Creatorów |
| GL-04 | Referral loop nie startuje organicznie | ŚREDNIE | ŚREDNI | Incentivized referrals v0.5; share mechanics v0.3 |
| GL-05 | Monetization loop opóźniony → Creator churn | ŚREDNIE | WYSOKI | Communicate roadmap: „Tips w Q2"; early access program |
| GL-06 | Spam / bots psują engagement metrics | ŚREDNIE | WYSOKI | Rate limiting + L1 required for posting + report system |

---

## Rekomendacja priorytetów wzrostu

### LOOP GŁÓWNY — buduj natychmiast (MVP)

1. **Creator Content Loop**: auth → post → like → comment → follow → notification
2. **Discovery feed**: trending + fresh → fan odkrywa Creatora
3. **Share mechanics**: shareable links, OG images

### LOOP WSPIERAJĄCE — v0.3-v0.5

4. **Social proof**: follower counts, trending Creators, verified badges
5. **Retention**: email digest, in-app notifs
6. **Referral**: invite links, Creator-invite-Creator

### LOOP PÓŹNIEJSZE — v1.0+

7. **Monetization loop**: tips, subscriptions, Creator earnings dashboard
8. **Network effects**: collabs, challenges, events
9. **B2B**: brand partnerships, sponsored content

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-92 | Invite-only launch czy open registration? | 🟡 DO DECYZJI | Rekomendacja: invite-only first 4 weeks → open at 200 users |
| FDN-93 | Incentivized referrals (credits) od v0.5 czy wcześniej? | 🟡 DO DECYZJI | Rekomendacja: v0.5 (po wdrożeniu credit system) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 32 — HHU Personas & JTBD |
| ← INPUT | 33 — HHU MVP Scope v1 |
| → OUTPUT | 35 — HHU Creator Onboarding Spec |
| → OUTPUT | 36 — Artist Partnership Program |
| → OUTPUT | 38 — Community Mechanics Spec |
| → OUTPUT | 40 — HHU Go-To-Market Poland |
| → CROSS | 39 — HHU Monetization Stack |
