# 35 — HHU Creator Onboarding Spec

| Pole | Wartość |
|------|---------|
| **Projekt** | Hip Hop Universe (HHU) |
| **Cel decyzji** | Zdefiniować proces wejścia artystów i managerów na platformę |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 32 (Personas), 33 (MVP Scope), 34 (Growth Loop), 18 (Identity & Roles) |
| **Zależności wyjściowe** | → 36 (Artist Partnership), 38 (Community) |

---

## Executive Summary

Onboarding to **najważniejsze 10 minut** w życiu nowego użytkownika na HHU. Jeśli Creator nie opublikuje pierwszego posta w ciągu 10 minut od rejestracji — prawdopodobieństwo retencji spada o 60%. Ten dokument definiuje 3 ścieżki onboardingu (Creator, Fan, Manager), krok po kroku, z weryfikacją, AI assistance i first success moments. Główna zasada: **zero friction do pierwszego sukcesu, progressive verification później**.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Formularz rejestracji | ❌ Brak (zero auth) |
| Onboarding wizard | ❌ Brak |
| Email verification | ❌ Brak |
| Profile setup flow | ❌ Brak |
| AI-assisted onboarding | ❌ Brak |
| First post CTA | ❌ Brak |

---

## Onboarding Design Principles

| # | Zasada | Dlaczego |
|---|--------|----------|
| 1 | **First post ≤ 10 min** | KPI numer 1 — Creator, który postuje, wraca |
| 2 | **Progressive verification** | Nie wymagaj L2/L3 na starcie — ask only when needed |
| 3 | **AI-assisted setup** | Bio generator = wow moment + immediate value |
| 4 | **Skip-friendly** | Każdy krok (oprócz email) musi mieć „Pomiń" |
| 5 | **Mobile-first** | 70%+ rejestracji z mobile |
| 6 | **Context-aware** | Creator vs Fan → różne ścieżki |
| 7 | **Social proof** | Pokaż: „X artystów jest na HHU" na każdym ekranie |

---

## Ścieżka 1: Creator Onboarding (P1 Raper, P2 Producent)

### Step 0: Landing → Register

```
Landing page:
├── Hero: „Twoja scena. Twoje narzędzia. Twoi fani."
├── Social proof: „127 artystów hip-hop jest na HHU"
├── CTA: „Dołącz jako twórca" (primary)
├── CTA: „Przeglądaj scenę" (secondary → Fan path)
└── Footer: legal links (ToS, Privacy)
```

### Step 1: Rejestracja (30 sec)

| Pole | Wymagane | Walidacja |
|------|----------|-----------|
| Email | ✅ | Format + unikalność |
| Hasło | ✅ | Min 8 znaków, 1 cyfra |
| Username | ✅ | 3-30 znaków, [a-z0-9_.-], unikalność |
| Akceptacja ToS | ✅ | Checkbox + link |

**Po submit**: konto L0 → redirect do email verification

### Step 2: Email Verification (30 sec)

```
Ekran: „Sprawdź skrzynkę — wysłaliśmy link"
├── Resend button (cooldown 60s)
├── Change email option
└── Auto-redirect po kliknięciu linku
```

**Po verify**: konto L1 → redirect do onboarding wizard

### Step 3: Onboarding Wizard (3-5 min)

#### 3a: Wybierz typ (15 sec)

```
„Kim jesteś na scenie?"
├── 🎤 Raper / MC
├── 🎹 Producent / Beatmaker
├── 🎧 DJ
├── 🎬 Director / Filmowiec
├── 👥 Manager
└── 🎵 Fan (→ redirect do Fan path)
```

**Action**: `Profile.metadata.artistType = selected`

#### 3b: Upload avatar (30 sec — skippable)

```
„Dodaj swoje zdjęcie"
├── Upload button (max 5MB, jpg/png/webp)
├── Crop tool (square)
├── [Pomiń →]
└── Fallback: default avatar z inicjałami
```

**Action**: `User.avatarUrl = uploadedUrl`

#### 3c: Bio z AI (60 sec — highlight feature)

```
„Napisz swoje bio — lub wygeneruj z AI"

├── Textarea: ręczne pisanie
├── CTA: ✨ „Generuj bio z AI"
│   └── Mini-form:
│       ├── Twój styl muzyczny (dropdown: trap, boom bap, drill, polo, etc.)
│       ├── Twoje miasto
│       └── Jedno zdanie o sobie (opcjonalne)
│   └── → 3 opcje bio do wyboru → edytowalne
├── [Pomiń →]
└── Counter: „23/200 znaków"
```

**Action**: `User.bio = selectedBio` (uses 1 AI credit, free)

#### 3d: Linki zewnętrzne (15 sec — skippable)

```
„Gdzie można Cię posłuchać?"
├── Spotify URL (opcjonalne)
├── SoundCloud URL (opcjonalne)
├── Instagram URL (opcjonalne)
├── YouTube URL (opcjonalne)
└── [Pomiń →]
```

**Action**: `Profile.metadata.externalLinks = {...}`

### Step 4: First Post CTA (immediate)

```
„Wszystko gotowe! Napisz pierwszy post 🔥"

├── Post composer (pre-opened)
│   ├── Text area
│   ├── Add image (optional)
│   ├── Add audio snippet ≤30s (optional, if FDN-85=tak)
│   └── „Opublikuj"
├── Suggested: "Przedstaw się scenie — powiedz kim jesteś"
└── [Pomiń → feed]
```

**KPI**: Creator publication rate po step 4 ≥ 70%

### Step 5: Discovery / Follow (first session)

```
Po pierwszym poście → redirect do feed z:
├── „Obserwuj artystów" card → suggested Creators (top 10, diverse types)
├── Trending feed below
└── Tooltip: „Odkrywaj nowych twórców w sekcji Trending"
```

---

## Ścieżka 2: Fan Onboarding (P3 Casual Fan)

### Różnice vs Creator

| Krok | Różnica |
|------|---------|
| Step 0 | CTA: „Przeglądaj scenę" |
| Step 3a | Wybiera „Fan" → skip bio/links/artist type |
| Step 3b | Avatar upload (skippable) |
| Step 3c | ❌ Brak AI bio (nie potrzebuje) |
| Step 4 | Zamiast first post → „Kogo obserwujesz?" → suggested Creators (min. 3 follows) |
| Step 5 | Feed z followed Creators |

### Fan-specific flow

```
Register → Email verify → „Fan" selected →
→ Avatar (skip) → „Kogo obserwujesz?" (min 3 follows) →
→ Personalized feed z followed Creators
```

**KPI**: Fan → First Follow ≤ 5 min, ≥ 3 follows in first session

---

## Ścieżka 3: Manager Onboarding (P5 — v1.0+)

| Krok | Opis |
|------|------|
| Register | Email + hasło + username |
| Verify | Email verification (L1) |
| Account type | „Manager / Label" |
| Company info | Nazwa, typ (management/label/agency), website |
| Link artists | „Dodaj artystów pod opieką" (username search) |
| Verification | L3 required → KYC flow |
| Dashboard | Multi-artist analytics |

**Uwaga**: Manager path nie jest w MVP scope.

---

## Verification Points (Progressive)

| Moment | Wymagany level | Trigger |
|--------|----------------|---------|
| Rejestracja | L0 | — |
| Pierwszy post | L1 (email verified) | „Zweryfikuj email aby publikować" |
| Pierwszy tip wysłany | L2 (phone verified) | „Dodaj numer telefonu aby wspierać artystów" |
| Pierwszy tip odebrany (payout) | L3 (ID verified) | „Zweryfikuj tożsamość aby wypłacić środki" |
| Moderator nomination | L3 + internal approval | Admin assigns |

---

## First Success Moments

| Persona | First success | Timeframe | Jak mierzymy |
|---------|--------------|-----------|--------------|
| P1 Raper | Pierwszy post + 1 like | ≤ 30 min | Event: `first_like_received` |
| P2 Producent | Pierwszy audio snippet + 1 like | ≤ 30 min | Event: `first_like_received` |
| P3 Fan | Pierwszy follow + scroll feed | ≤ 10 min | Event: `first_follow` |
| P4 Hardcore Fan | Pierwszy komentarz z reply | ≤ 60 min | Event: `first_comment_reply_received` |

### In-house engagement strategy (pre-launch)

Aby zapewnić first success dla early Creatorów:

| Akcja | Kto | Kiedy |
|-------|-----|-------|
| Like first 5 postów nowego Creatora | Founder / bot-free helper accounts | < 1h od publikacji |
| Komentarz welcome | Founder / community account | < 2h |
| Feature w „New Creators" widget | System (automatic) | Natychmiast |
| Mention w weekly digest email | System | Co poniedziałek |

---

## Monetization Unlocks (progressive)

| Unlock | Wymaganie | Phase |
|--------|-----------|-------|
| **Free AI credits** (10/mo) | L1 + Creator type selected | v0.3 |
| **Tips (receive)** | L2 + Stripe onboarding started | v0.5 |
| **Creator subscriptions** | L3 + Stripe verified + ≥10 followers | v1.0 |
| **HHU Pro badge** | PLN 29/mo subscription | v0.5 |
| **AI Pro unlimited** | PLN 49/mo subscription + L2 | v0.5 |

---

## Social Proof Mechanics (onboarding context)

| Mechanika | Ekran | Wiadomość |
|-----------|-------|-----------|
| User counter | Landing page | „127 artystów hip-hop jest na HHU" |
| Creator counter | Step 3a | „Dołączysz do 80+ producentów na HHU" |
| Featured artists | Step 5 | Avatary znanych artystów (z ich zgodą) |
| Activity pulse | Feed | „Nowy post co 3 minuty — scena żyje" |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| CO-01 | Wizard za długi → drop-off na Step 3 | ŚREDNIE | WYSOKI | Max 4 ekrany, każdy skippable (oprócz email) |
| CO-02 | AI Bio Generator daje generic output | ŚREDNIE | ŚREDNI | Fine-tune prompty per artist type; 3 opcje; edytowalne |
| CO-03 | Creator nie postuje po rejestracji | WYSOKIE | KRYTYCZNY | Pre-opened composer; suggested first post; follow-up email po 24h |
| CO-04 | Email verification friction (opóźniony email) | NISKIE | WYSOKI | Resend button; sprawdź spam; whitelist Resend IPs |
| CO-05 | Mobile UX onboarding nie działa | ŚREDNIE | WYSOKI | Mobile-first design; test na 3 urządzeniach |

---

## Rekomendacja onboardingowa

### ONBOARDING PODSTAWOWY — v0.2-v0.3 (buduj teraz)

1. Rejestracja (email + hasło + username)
2. Email verification
3. Onboarding wizard (4 ekrany: typ + avatar + bio AI + linki)
4. First post CTA
5. Discovery / follow suggested

### ONBOARDING PREMIUM — v0.5+

6. Audio snippet w pierwszym poście
7. Referral link generation na zakończenie onboardingu
8. AI-generated promo image: „Jestem na HHU"
9. First tip notification → L2 upgrade prompt

### ONBOARDING PÓŹNIEJSZY — v1.0+

10. Manager / label path
11. Verified Creator flow
12. Multi-vertical onboarding (HHU + AI Studio)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-94 | Czy onboarding wizard ma mieć progress bar (4 steps) vs swipe? | 🟡 DO DECYZJI | Rekomendacja: progress bar (jasność oczekiwań) |
| FDN-95 | Czy nowy Creator dostaje 10 free AI credits czy 3 na start? | 🟡 DO DECYZJI | Rekomendacja: 10 (standard AI_FREE tier) |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 32 — HHU Personas & JTBD |
| ← INPUT | 33 — HHU MVP Scope v1 |
| ← INPUT | 34 — HHU Growth Loop Architecture |
| ← INPUT | 18 — Identity & Roles Architecture |
| → OUTPUT | 36 — Artist Partnership Program |
| → OUTPUT | 38 — Community Mechanics Spec |
| → CROSS | 28 — Verification Feasibility Framework |
