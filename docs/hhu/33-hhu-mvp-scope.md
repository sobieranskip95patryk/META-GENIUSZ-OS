# 33 — HHU MVP Scope v1

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Odciąć MVP od przyszłych dodatków — minimum shippable product |
| **Zakres** | MVP |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 31 (Product Thesis), 32 (Personas & JTBD), 14 (Product Architecture), 15 (System Architecture) |
| **Zależności wyjściowe** | → 35 (Creator Onboarding), 38 (Community), 10 (90-Day Map) |

---

## Executive Summary

HHU MVP to **minimalny produkt umożliwiający artystom hip-hopowym publikowanie treści i budowanie fanbase**. Scope jest celowo wąski: feed + profile + auth + likes/comments + AI bio generator + discovery basic. Odcięte: monetyzacja, messaging, collaby, marketplace beatów, live streaming. MVP musi dowieść jednej rzeczy: **artyści hip-hopowi wracają na HHU co tydzień, bo tu jest ich audience.**

**Target**: 500 MAU, 50 aktywnych Creatorów, DAU/MAU ≥20% — w ciągu 90 dni od soft launch.

---

## Stan obecny

| Element | Status | Luka do MVP |
|---------|--------|-------------|
| Next.js 16 app shell | ✅ Istnieje | — |
| Feed (chronologiczny, SSR) | ✅ Basic | Brak auth, brak likes, brak discovery |
| Profile page | ✅ Basic `/profile/[username]` | Brak edycji, brak rozbudowanych pól |
| API (Express.js) | ✅ CRUD User/Post | Brak auth, brak walidacji, SQLite |
| Auth system | ❌ Brak | Blocker #1 |
| Database (PostgreSQL) | ❌ SQLite only | Blocker #2 (migracja) |
| Like/Comment system | ❌ Brak | Core engagement loop |
| Follow system | ❌ Brak | Personalized feed |
| AI Bio Generator | ❌ Brak | Value prop differentiator |
| Content moderation | ❌ Brak | Required pre-launch (DSA) |

---

## MVP Feature Set

### MUST-HAVE (P0) — bez tego nie shippujemy

| # | Feature | Persona | Encja | Faza | Szacunek |
|---|---------|---------|-------|------|----------|
| F01 | **Rejestracja** (email + hasło) | Wszyscy | User, Session | v0.2 | 2-3d |
| F02 | **Logowanie / wylogowanie** (JWT) | Wszyscy | Session | v0.2 | 1-2d |
| F03 | **Email verification** (L0→L1) | Wszyscy | User.emailVerified | v0.2 | 1d |
| F04 | **Profil — edycja** (bio, avatar, linki) | P1, P2 | User, Profile | v0.2 | 2d |
| F05 | **Profil — HHU fields** (artistType, extended bio) | P1, P2 | Profile.metadata | v0.2 | 1d |
| F06 | **Tworzenie posta** (text + image) | P1, P2 | Post | v0.2 | 1-2d |
| F07 | **Feed — chronologiczny** (all posts) | P3 | Post (query) | v0.2 | ✅ (istniejący) |
| F08 | **Like system** | Wszyscy | Like | v0.2 | 1d |
| F09 | **Comment system** (flat, bez threading) | Wszyscy | Comment | v0.2 | 1-2d |
| F10 | **Follow / unfollow** | Wszyscy | Follow | v0.3 | 1d |
| F11 | **Feed — followed** (personalizowany) | P3 | Follow + Post (query) | v0.3 | 1d |
| F12 | **Discovery — trending + fresh** | P3 | Post (sort: likes 24h) | v0.3 | 1d |
| F13 | **AI Bio Generator** | P1, P2 | AIGeneration | v0.3 | 2-3d |
| F14 | **Report content / user** | Wszyscy | Report | v0.3 | 1d |
| F15 | **Basic admin: user list + ban** | Admin | Admin panel | v0.3 | 2d |
| F16 | **PostgreSQL migration** | System | — | v0.2 | 1d |
| F17 | **Rate limiting** | System | — | v0.2 | 0.5d |
| F18 | **Input validation + sanitization** | System | — | v0.2 | 1d |

**Łączny szacunek P0**: ~20-25 dni pracy (1 developer)

### SHOULD-HAVE (P1) — silnie rekomendowane, ale MVP bez nich ruszy

| # | Feature | Persona | Faza | Szacunek |
|---|---------|---------|------|----------|
| F19 | **Audio snippet w poście** (≤30s, MP3/OGG) | P1, P2 | v0.3 | 2-3d |
| F20 | **Notifications** (like, comment, follow) — in-app | Wszyscy | v0.3 | 2d |
| F21 | **Creator tags** (rapper, producer, dj, beatmaker) | P1, P2 | v0.3 | 0.5d |
| F22 | **Search** (users, posts — basic text) | Wszyscy | v0.4 | 1-2d |
| F23 | **AI Caption Optimizer** | P1, P2 | v0.4 | 2d |
| F24 | **Dark mode** (hip-hop aesthetic) | Wszyscy | v0.3 | 1d |

**Łączny szacunek P1**: ~10-12 dni

### NICE-TO-HAVE (P2) — planowane, ale nie blokują launch

| # | Feature | Faza |
|---|---------|------|
| F25 | Share post to external (link + OG image) | v0.4 |
| F26 | Hashtags + hashtag feed | v0.4 |
| F27 | Embed SoundCloud / Spotify / YouTube | v0.4 |
| F28 | Collab tagging (feat. mentions) | v0.5 |
| F29 | Creator analytics dashboard (basic) | v0.5 |
| F30 | Pin post to profile | v0.5 |

### REJECTED — nie robimy w MVP (świadoma decyzja)

| Feature | Dlaczego nie | Kiedy? |
|---------|-------------|--------|
| Beat marketplace | Oddzielny produkt, wymaga licensing logic | v2.0+ |
| Direct messaging (DMs) | Trust & Safety wymogi, grooming risk | v1.0+ |
| Live streaming | Infrastruktura, koszty, moderacja real-time | v2.0+ |
| NFT / blockchain | Nie pasuje do kultury, hype spadł | ODRZUCIĆ |
| Full music hosting | Konkurujemy z Spotify/SoundCloud — nie nasz focus | ODRZUCIĆ |
| Video post (full video upload) | Storage cost, processing — audio snippet wystarczy | v1.0+ |
| Challenges / contests | Wymaga community size, moderacji | v0.5+ |
| Subscription Creator | Wymaga Stripe + payout logic | v1.0+ |
| Tips | Stripe integration + verification L2 | v0.5+ |
| Multi-language | Complexity, tłumaczenia | v1.0+ |

---

## MVP Flows

### Flow 1: Rejestracja → Pierwszy post (Creator)

```
1. Landing page → CTA „Dołącz do sceny"
2. Formularz: email, hasło, username
3. Email verification (link)
4. Onboarding wizard (3 steps):
   a. Wybierz typ: Raper / Producent / DJ / Beatmaker / Fan
   b. Uzupełnij bio (AI Bio Generator — opcjonalne)
   c. Upload avatar (opcjonalne)
5. Redirect → Feed
6. CTA „Napisz pierwszy post" → creator post
7. Post widoczny na feedzie → done
```

**KPI**: Registration → First Post ≤ 10 minut

### Flow 2: Discovery → Follow → Engage (Fan)

```
1. Landing page → CTA „Przeglądaj scenę"
2. Rejestracja (email, hasło, username)
3. Email verification
4. Feed: trending + fresh (no follows yet)
5. Fan scrolluje, lajkuje → follows Creator
6. Następna wizyta: feed „Followed" z nowymi postami
7. Komentarz pod postem
```

**KPI**: Registration → First Follow ≤ 5 minut, DAU/MAU ≥ 20%

### Flow 3: Report (moderacja)

```
1. User widzi naruszający content
2. Klik „Zgłoś" → Formularz: kategoria + opis
3. Report → queue dla admina/moderatora
4. Moderator review → action (hide / warn / strike / ban)
5. Reason statement do autora (DSA Art. 17)
```

---

## MVP Dependencies & Blockers

| Blocker | Blokuje | Rozwiązanie | Kto |
|---------|---------|-------------|-----|
| Brak auth | Wszystko oprócz przeglądania | Implementuj JWT auth (packages/auth) | Dev |
| SQLite | Produkcja | Migracja Prisma → PostgreSQL (Railway) | Dev |
| Brak env config | Deploy | Implementuj packages/config | Dev |
| Brak storage | Avatar upload | Cloudflare R2 lub local file server | Dev |
| Brak email service | Email verification | Resend integration | Dev |
| Brak AI provider | AI Bio Generator | OpenAI API key + packages/ai-core | Dev |
| Brak moderation | DSA compliance pre-launch | Report entity + admin queue | Dev |

### Dependency Graph (build order)

```
packages/config ─┐
packages/types  ─┤
                 ├─► packages/auth ─┐
packages/database┘                  │
                                    ├─► apps/api (endpoints) ─► apps/hhu (frontend)
packages/storage ───────────────────┘
packages/ai-core ───────────────────────────────────► AI Bio Generator feature
```

---

## Szacunek czasowy (MVP)

| Sprint | Zakres | Czas |
|--------|--------|------|
| **Sprint 1** (v0.2 alpha) | Config, types, database migration, auth package | 5-7 dni |
| **Sprint 2** (v0.2 beta) | Auth endpoints, registration, login, email verify, profile edit | 5-7 dni |
| **Sprint 3** (v0.2 release) | Like, comment, follow, sanitization, rate limiting | 5-7 dni |
| **Sprint 4** (v0.3 alpha) | Discovery feed, AI bio generator, report, basic admin | 5-7 dni |
| **Sprint 5** (v0.3 beta) | Audio snippets, notifs, polish, deploy to Railway/Vercel | 5-7 dni |
| **Sprint 6** (v0.3 release) | Bug fixes, soft launch, 50 Creator onboarding | 3-5 dni |

**Total: ~30-40 dni** (5-6 tygodni solo dev z AI copilot)

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| MS-01 | Scope creep — „jeszcze ten feature" przed launch | WYSOKIE | KRYTYCZNY | Twardy cut: P0 only w pierwszej iteracji. Ten dokument jest referencją |
| MS-02 | Auth implementation blocker (JWT + session + refresh) | ŚREDNIE | WYSOKI | Wybrać proven pattern; nie over-engineerować v0.2 |
| MS-03 | PostgreSQL migration breaks existing data | NISKIE | ŚREDNI | Backup + Prisma migrate; dev data jest expendable |
| MS-04 | AI Bio Generator quality niska | ŚREDNIE | ŚREDNI | Fine-tune prompt; 3 opcje do wyboru; edytowalne |
| MS-05 | Solo dev burnout → 40 dni staje się 80 | WYSOKIE | WYSOKI | Weekly review (doc 09: Founder Operating Model); AI copilot max leverage |
| MS-06 | Launch bez Creatorów → pusta platforma | WYSOKIE | KRYTYCZNY | Pre-launch outreach: 50 artystów (doc 36) |

---

## Rekomendacja MVP

### MUST-HAVE — buduj natychmiast
1. Auth (JWT + bcrypt + email verify)
2. PostgreSQL migration
3. Profile edit (bio, avatar, artist type)
4. Like + Comment system
5. Follow + personalized feed
6. Discovery (trending, fresh)
7. AI Bio Generator
8. Report + basic admin

### LATER — po weryfikacji MVP
9. Audio snippets (P1 — silnie rekomendowane)
10. Notifications
11. Search
12. AI Caption Optimizer

### REJECT — nie robimy
13. DMs, marketplace, live, NFT, full video

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-89 | Czy audio snippets (F19) wchodzą do MVP czy do v0.4? | 🟡 DO DECYZJI | Rekomendacja: v0.3 (P1) — kluczowe dla producentów, koszt storage minimalny |
| FDN-90 | Szacunek 30-40 dni solo — akceptowalne? Czy szukać co-dev? | 🟡 DO DECYZJI | Rekomendacja: solo z AI copilot; re-evaluate po Sprint 2 |
| FDN-91 | Deploy target: Railway free tier czy Pro ($5/mo) od początku? | 🟡 DO DECYZJI | Rekomendacja: Pro ($5/mo) — reliability + custom domain |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 32 — HHU Personas & JTBD |
| ← INPUT | 14 — Product Architecture Master |
| ← INPUT | 15 — System Architecture v1.0 |
| → OUTPUT | 35 — HHU Creator Onboarding Spec |
| → OUTPUT | 38 — Community Mechanics Spec |
| → CROSS | 10 — 90-Day Execution Alignment Map |
| → CROSS | 19 — Master Domain Model (nowe encje: Like, Comment, Follow) |
