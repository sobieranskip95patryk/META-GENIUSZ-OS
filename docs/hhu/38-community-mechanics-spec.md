# 38 — Community Mechanics Spec

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Zdefiniować mechaniki społecznościowe: feed, interakcje, challenges, gamification |
| **Zakres** | MVP → v1.0 |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 14 (Tech Architecture), 31 (Product Thesis), 32 (Personas), 33 (MVP Scope), 34 (Growth Loop) |
| **Zależności wyjściowe** | → 39 (Monetization Stack), 40 (GTM Poland) |

---

## Executive Summary

Community mechanics to **serce HHU** — to, co decyduje czy użytkownik otwiera apkę codziennie czy porzuca ją po 3 dniach. Ten dokument definiuje: feed algorithm, typy interakcji, community challenges, gamification, engagement incentives i community governance. Kluczowa zasada: **HHU buduje niszową społeczność, nie general-purpose social network** — każda mechanika musi wspierać hip-hop culture.

---

## Feed Architecture

### Feed Types

| Feed | Lokalizacja | Algorytm | MVP? |
|------|-------------|----------|------|
| **Home Feed** | Główna strona po login | Hybrid: chronological + boost | ✅ |
| **Discover** | Tab „Odkryj" | Popularity + diversity | ✅ |
| **Following** | Tab „Obserwujesz" | Strict reverse-chronological | ✅ |
| **Profile Feed** | Profil usera | Reverse-chronological per user | ✅ |
| **Tag Feed** | Po kliknięciu hashtag | Reverse-chronological per tag | v0.3 |

### Home Feed — MVP Algorithm

```
Score = base_score + recency_boost + engagement_boost + creator_boost

base_score       = 1.0
recency_boost    = max(0, 1.0 - (hours_since_post / 48))   # 0-1, decay over 48h
engagement_boost = min(1.0, (likes + comments*2 + shares*3) / 50)
creator_boost    = 0.5 if user follows creator, else 0
```

| Design Decision | Rationale |
|-----------------|-----------|
| 48h recency window | Nowa platforma = mało contentu; starsze posty muszą być widoczne |
| Engagement nie dominuje | Zapobiega rich-get-richer; new Creators mają szansę |
| No ads in feed (MVP) | Zero ads do ≥1000 MAU (FDN-100) |
| No „viral" boost | HHU nie jest TikTokiem; quality > virality |

### Feed — v0.3+ Improvements

| Feature | Opis |
|---------|------|
| Topic weighting | User preferencje (trap, boom bap, drill) wpływają na feed |
| Mute/block | Ukryj posty od usera (doc 28 — trust & safety rules) |
| „Spotlight" | 1 slot/dzień: editorially-curated featured post |

---

## Content Types

| Typ | Opis | Format | MVP? | Kto tworzy |
|-----|------|--------|------|-----------|
| **Text Post** | Krótki tekst (max 500 chars) | Tekst + opcjonalny obraz | ✅ | Creator / Fan |
| **Image Post** | Zdjęcie z opisem | 1-4 obrazy + caption (max 300 chars) | ✅ | Creator / Fan |
| **Audio Snippet** | Klip audio ≤60s | Audio player + cover art + caption | ✅ (FDN-89) | Creator only |
| **Link Post** | External URL z preview | OG preview + caption | ✅ | Creator / Fan |
| **Poll** | Ankieta (2-4 opcji) | Text + vote buttons | v0.3 | Creator only |
| **Drop** | Merch/music announcement | Grafika + timer + CTA link | v0.3 | Creator only |
| **Challenge Entry** | Odpowiedź na Community Challenge | Tekst/audio/image + tag challenge | v0.3 | Creator / Fan |

### Content Rules (→ doc 23, 27, 28)

| Reguła | Enforcement |
|--------|------------|
| Max 500 chars per text post | Frontend validation |
| Max 4 images per post | Frontend validation |
| Audio max 60 seconds | Backend validation (ffprobe) |
| Image max 10MB, formats: JPG/PNG/WebP | Backend validation |
| Audio max 15MB, formats: MP3/AAC/WAV | Backend validation |
| No NSFW content (nudity, extreme violence) | AI moderation (doc 23) + community reports |
| Copyright enforcement | DMCA/DSA notice-and-action (doc 23, FDN-63) |

---

## Interaction Mechanics

### Core Interactions

| Interakcja | Ikona | Kto | Efekt | MVP? |
|------------|-------|-----|-------|------|
| **Like** | 🔥 (fire, nie heart) | Każdy | +1 like count; +engagement score | ✅ |
| **Comment** | 💬 | Każdy | Threaded comment; +2 engagement | ✅ |
| **Share** | 🔗 | Każdy | Copy link / cross-post | ✅ |
| **Follow** | ➕ | Każdy | Adds to Following feed | ✅ |
| **Tip** | 💰 | Fan → Creator | Microdonation (Stripe) | v0.3 (FDN-90) |
| **Repost** | 🔄 | Każdy | Repost do swojego profilu z attribution | v0.3 |
| **Save** | 🔖 | Każdy | Bookmark; private collection | v0.3 |

### Design Decisions — Interactions

| Decyzja | Uzasadnienie |
|---------|-------------|
| Fire 🔥 zamiast Heart ❤️ | Hip-hop culture: „fire" to standard compliment; differentiator od IG/TikTok |
| Brak dislike / downvote | Reduces toxicity; report mechanism wystarczy (doc 28) |
| Threaded comments (1 level deep) | Wystarczająco do discussion; limituje trolling threads |
| Brak DMs w MVP | Complexity + safety concern (grooming, scam); dodanie w v0.5 z safety rails |

### Comment System

| Feature | MVP | v0.3 | v0.5 |
|---------|-----|------|------|
| Text comments | ✅ max 280 chars | ✅ + emoji reactions na comments | ✅ + GIF |
| Threading | ✅ 1 level (reply to comment) | ✅ 2 levels | ✅ 2 levels |
| Moderation | ✅ Report button | ✅ + keyword filter | ✅ + AI auto-mod |
| Creator tools | ✅ Delete own comments | ✅ + pin comment | ✅ + block user from comments |
| Sort | ✅ Chronological | ✅ + „Top" (most liked) | ✅ |

---

## Community Challenges

### Concept

Community Challenges to **mechanizm engagement + content generation**. Creator lub HHU tworzy challenge (np. „Napisz 16 bars na ten beat"), fani i Creatorzy uczestniczą, zwycięzca dostaje exposure/nagrody.

### Challenge Types

| Typ | Kto tworzy | Przykład | Kiedy |
|-----|-----------|---------|-------|
| **Theme Challenge** | HHU Editorial | „Tydzień trap: pokażcie wasze besty" | v0.3 |
| **Beat Challenge** | Creator (Producent) | „Napisz tekst na ten beat" (audio snippet + prompt) | v0.3 |
| **Brand Challenge** | Brand (sponsored) | „Drop 16 bars z hashtag #XYZ" | v0.5 (doc 37) |
| **Community Vote** | HHU | „Kto wygrał ten tydzień?" — poll na entries | v0.3 |

### Challenge Flow

```
1. Creator/HHU → Create Challenge (tytuł, opis, termin, rules, optional audio beat)
2. Challenge widoczny w Discover tab + dedicated Challenge page
3. Users submit entries (text, audio, image) z tag #challenge-name
4. Entries widoczne na Challenge page
5. Voting period: community votes (Likes na entries)
6. Winner announcement: HHU post + featured placement
7. Optional: reward (featured badge, AI credits, merch)
```

### Challenge Rules

| Reguła | Wartość |
|--------|---------|
| Min duration | 3 dni |
| Max duration | 14 dni |
| Max entries per user | 3 |
| Judging | Community votes (likes) and/or Creator picks |
| Reward pool | HHU-funded: 50 AI credits; Brand-funded: custom |
| Content moderation | Same rules as regular posts (doc 23) |

---

## Gamification

### Levels & XP

| Level | Nazwa | XP Required | Jak zdobyć XP |
|-------|-------|------------|----------------|
| 1 | Rookie | 0 | Account created |
| 2 | Regular | 100 | ~10 posts or 50 interactions |
| 3 | Active | 500 | ~50 posts or 250 interactions |
| 4 | Veteran | 2000 | Consistent activity (2-3 mies.) |
| 5 | Legend | 10000 | Top contributors (6+ mies.) |

### XP Sources

| Akcja | XP | Limit/dzień |
|-------|-----|-------------|
| Opublikuj post | +10 | 5 postów |
| Otrzymaj Like | +2 | Unlimited |
| Otrzymaj Comment | +3 | Unlimited |
| Skomentuj | +1 | 20 comments |
| Win Challenge | +100 | Per challenge |
| Dzień aktywności (streak) | +5 per day, +20 per week streak | 1 |
| Refer new user | +50 | 5 referral |

### Badges

| Badge | Trigger | Widoczność |
|-------|---------|-----------|
| **Verified Creator** ✓ | Sumsub verification L2+ (doc 22) | Profile + posts |
| **Pioneer** 🏴 | Account created before public launch | Profile |
| **Ambassador** ⭐ | Tier 1 partner (doc 36) | Profile + posts |
| **Challenge Winner** 🏆 | Won community challenge | Profile |
| **Streak Master** 🔥 | 30-day activity streak | Profile |
| **Top Contributor** 📊 | Top 10% XP in month | Profile (refreshed monthly) |

### Anti-Gaming Rules

| Reguła | Dlaczego |
|--------|----------|
| XP per day capped (post: 5, comment: 20) | Prevents spam grinding |
| Self-likes nie dają XP | Anti-gaming |
| Multi-account detection (doc 22 KYC, doc 29 abuse) | Prevents XP farming |
| XP decay: -10% per miesiąc inaktywny | Encourages ongoing engagement |

---

## Community Governance

### Flag / Report System (→ doc 23, 28)

```
User widzi content naruszający zasady →
  "Report" button → Select reason (dropdown) →
    → Spam
    → Hate speech
    → Harassment
    → NSFW / nudity
    → Copyright violation
    → Other (free text max 200 chars)
  → Report submitted → Moderation queue (doc 23)
```

### Community Guidelines (Summary — full w doc 27)

| Dozwolone | Niedozwolone |
|-----------|-------------|
| Hip-hop content (tekst, beat, art, opinie) | Spam, bot content |
| Krityka muzyczna (nawet ostra) | Hate speech, rasizm, doxxing |
| Self-promo (własna muzyka, merch) | Scam, phishing |
| Debata (beef culture jest częścią hip-hop) | Threats of violence |
| Audio snippets (≤60s, own or licensed) | Copyright infringement (full tracks) |

### Enforcement Ladder (→ doc 28)

| Level | Akcja | Trigger | Reversible? |
|-------|-------|---------|-------------|
| L0 | Warning (in-app notification) | First minor violation | ✅ |
| L1 | Content removal + 24h post restriction | Repeated minor OR single moderate | ✅ |
| L2 | 7-day suspension | Severe violation OR 3 warnings | ✅ appeal |
| L3 | Permanent ban | Egregious violation OR 3 suspensions | ✅ appeal (doc 23 FDN-63) |

---

## Engagement Incentives

### Streak Mechanics

| Feature | Opis |
|---------|------|
| Daily streak | Counter: „Dzień X" za konsekutywną aktywność (post, comment, or like) |
| Weekly streak bonus | 7 dni = +20 XP bonus + streak badge update |
| Streak freeze | 1 free freeze / month (miss 1 day without losing streak) |
| Streak UI | Widoczne na profilu + notification reminder (opt-in) |

### Notification Strategy

| Typ | Trigger | Kanał | Opt-out? |
|-----|---------|-------|----------|
| Like/comment on your post | Interakcja | In-app | ✅ |
| New follower | Follow | In-app | ✅ |
| Challenge launched | New challenge | In-app + push (if enabled) | ✅ |
| Streak about to break | 20:00 local time, no activity today | Push | ✅ |
| Creator you follow posted | New post | In-app | ✅ |
| Drop reminder | Scheduled drop in 1h | In-app + push | ✅ |

> **Zasada**: Notifications muszą być **opt-in** per type (GDPR: doc 21, consent management). Default: all in-app ON, push OFF.

---

## Metryki Community Health

| Metryka | Target (v0.3) | Target (v0.5) | Alarm |
|---------|---------------|---------------|-------|
| DAU/MAU ratio | ≥20% | ≥30% | <15% |
| Posts per day | ≥20 | ≥100 | <10 |
| Comments per post (avg) | ≥1 | ≥3 | <0.5 |
| Report rate (reports / post) | <5% | <3% | >10% |
| Challenge participation rate | ≥10% MAU | ≥15% MAU | <5% |
| 7-day streak users | ≥10% DAU | ≥20% DAU | <5% |
| Average session time | ≥3 min | ≥5 min | <2 min |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| CM-01 | Feed is empty for new users (cold start) | WYSOKIE | WYSOKI | Seeded content (doc 36 Ambasadorzy); Discover tab shows all content |
| CM-02 | Gamification feels empty at low scale | ŚREDNIE | ŚREDNI | Delay full gamification to v0.3 (MVP = basic likes/comments) |
| CM-03 | Toxicity in comments (beef escalation → harassment) | ŚREDNIE | WYSOKI | Moderation pipeline (doc 23); comment threading limited to 2 levels |
| CM-04 | Notification fatigue → uninstall | NISKIE | ŚREDNI | Default push OFF; smart batching (max 5 push/day) |
| CM-05 | Challenge spam (low-quality entries) | ŚREDNIE | NISKI | Max 3 entries per user per challenge; moderation review |

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-102 | Czy fire 🔥 jako „like" zamiast heart ❤️ jest dobrym UX decision? | 🟡 DO DECYZJI | Rekomendacja: tak, differentiator + culture fit; A/B test w v0.3 |
| FDN-103 | Czy gamification (XP/levels/badges) powinno być od MVP czy v0.3? | 🟡 DO DECYZJI | Rekomendacja: basic badges (Verified, Pioneer) w MVP; full XP system w v0.3 |
| FDN-104 | Czy DMs powinny wejść w v0.3 czy v0.5? | 🟡 DO DECYZJI | Rekomendacja: v0.5 (safety-first: DMs require anti-grooming/scam measures) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 14 — Tech Architecture |
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 32 — HHU Personas & JTBD |
| ← INPUT | 33 — HHU MVP Scope |
| ← INPUT | 34 — HHU Growth Loop Architecture |
| → OUTPUT | 39 — HHU Monetization Stack |
| → OUTPUT | 40 — HHU Go-To-Market Poland |
| → CROSS | 23 — Content Moderation Policy |
| → CROSS | 27 — Trust & Safety Framework |
| → CROSS | 28 — Abuse Prevention Playbook |
