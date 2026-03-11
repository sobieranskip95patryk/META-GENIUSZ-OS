# 41 — AI Studio Creator Product Spec

| Pole | Wartość |
|------|---------|
| **Projekt** | AI Studio Creator |
| **Cel decyzji** | Określić, które funkcje AI są warte budowy i sprzedaży |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 12 (Master Strategic Thesis), 14 (Product Architecture), 31 (HHU Product Thesis), 39 (HHU Monetization) |
| **Zależności wyjściowe** | → 42 (Workflow Library), 43 (AI Credits Economics), 44 (Integration Map) |

---

## Executive Summary

AI Studio Creator to **warstwa AI** ekosystemu META-GENIUSZ OS — zestaw narzędzi AI pomagających twórcom generować content, promo assets i planować działania. NIE jest to samodzielny produkt — funkcjonuje jako **feature layer** zintegrowany z HHU, RFG i przyszłymi verticalami. Kluczowa zasada: **AI assists, human creates** — narzędzia wspierają, nie zastępują twórcę.

---

## Stan obecny

| Element | Status |
|---------|--------|
| AI Studio app (apps/ai-studio/) | ❌ Placeholder (Next.js shell) |
| AI backend integration | ❌ Brak (no OpenAI/Anthropic API) |
| Prompt library | ❌ Brak |
| Credit system | 📐 Defined (doc 39); not implemented |

---

## User Segments

| Segment | Kto | Primary use case | Willingness to pay |
|---------|-----|-----------------|-------------------|
| **HHU Creator** | Raper, producent, DJ | Bio, captions, promo graphics | MEDIUM ($5-15/mies.) |
| **HHU Fan** | Hardcore fan | Comment drafts, memes (future) | LOW ($0-5/mies.) |
| **RFG Creator** | Modelka, twórczyni wizualna | Photo captions, brand pitch, portfolio text | MEDIUM ($5-15/mies.) |
| **General Creator** | Podcaster, blogger, YouTuber | Cross-platform: content planning, scripts | HIGH ($10-30/mies.) |

> **MVP focus**: HHU Creator (primary), HHU Fan (secondary). RFG i General Creator w v0.5+.

---

## Core Use Cases

### Tier 1: Build NOW (MVP)

| ID | Feature | Input | Output | AI Model | Credits |
|----|---------|-------|--------|----------|---------|
| AI-01 | **Bio Generator** | Genre, vibe, links, inspirations | 3 bio drafts (short/medium/long) | GPT-4o mini | 1 |
| AI-02 | **Caption Writer** | Post content + tone (hype/chill/deep) | 3 caption variants | GPT-4o mini | 1 |
| AI-03 | **Hashtag Suggester** | Post topic + target audience | 10-15 relevant hashtags | GPT-4o mini | 1 |
| AI-04 | **Promo Text Generator** | Song/album info + target platform (IG/TikTok) | 2 promo texts per platform | GPT-4o mini | 1 |
| AI-05 | **Content Idea Generator** | Genre + current trends + Creator mood | 5 content ideas with brief | GPT-4o mini | 1 |

### Tier 2: Build NEXT (v0.3-v0.5)

| ID | Feature | Input | Output | AI Model | Credits |
|----|---------|-------|--------|----------|---------|
| AI-06 | **Cover Art Generator** | Style prompt + genre + mood keywords | 2 image drafts (1024x1024) | DALL-E 3 | 3 |
| AI-07 | **Release Plan Builder** | Song details + target date + audience | Week-by-week promo timeline | GPT-4o | 2 |
| AI-08 | **Lyric Brainstorm** | Topic, mood, flow style, bars count | Lyric sketches (not full songs) | GPT-4o | 2 |
| AI-09 | **Brand Pitch Writer** | Creator profile + brand category | 1-page pitch draft | GPT-4o | 2 |
| AI-10 | **Social Scheduler** | Content queue + optimal posting times | Recommended schedule (next 7 days) | GPT-4o mini | 1 |

### Tier 3: Build LATER (v1.0+)

| ID | Feature | Input | Output | AI Model | Credits |
|----|---------|-------|--------|----------|---------|
| AI-11 | **Beat Analysis** | Audio file (MP3/WAV) | BPM, key, mood, structure analysis | Custom (Whisper + analysis) | 5 |
| AI-12 | **Fan Segment Insights** | Creator analytics data | Audience persona summary | GPT-4o | 3 |
| AI-13 | **Video Script Generator** | Topic + format (short/long) + platform | Script with timestamps | GPT-4o | 2 |
| AI-14 | **Merch Design Prompt** | Brand + style + product type | 3 design concepts (text prompts for designer) | GPT-4o | 2 |
| AI-15 | **Content Performance Predictor** | Post draft + historical data | Predicted engagement range | Custom ML | 5 |

---

## Value Logic

### Why Creators will use AI Studio

| Problem | AI Studio Solution | Alternative (without HHU) |
|---------|-------------------|--------------------------|
| „Nie wiem co napisać w bio" | Bio Generator → 3 options in 10 sec | Spend 30 min; copy someone else's |
| „Muszę wrzucić post ale brak inspiracji" | Content Idea Generator | Scroll IG for 2h; post nothing |
| „Nie umiem robić grafik na promo" | Cover Art Generator | Pay designer ($50+) or use Canva (30 min) |
| „Marketing mojej muzyki jest chaotyczny" | Release Plan Builder | No plan; post randomly; low reach |
| „Chcę pitchować markę ale nie umiem pisać" | Brand Pitch Writer | Skip brand deals; lose revenue |

### Why they'll pay

| Argument | Details |
|----------|---------|
| **Free tier is enough to taste** | 10 credits/mies. = ~5 AI actions |
| **Paid tier saves time** | 100 credits = 50+ actions = hours saved monthly |
| **Value > cost** | $4.99/mies. vs $50+/h designer or copywriter |
| **Integrated** | AI output → direct publish to HHU (no copy-paste) |

---

## Pricing Relevance (→ doc 39, 43)

| Plan | Credits/mies. | Cena | Target segment |
|------|--------------|------|---------------|
| Free | 10 | $0 | All new users |
| Starter | 100 | $4.99 | Active Creators |
| Pro | 500 | $14.99 | Power Creators |
| Unlimited | 2000 (FUP) | $29.99 | Professional Creators |

---

## Technical Architecture

### AI Pipeline (simplified)

```
User action (e.g., "Generate Bio") →
  Frontend (AI Studio UI in HHU/RFG) →
    API request (apps/api) →
      Credit check (≥1 credit available?) →
        YES → Call AI provider (OpenAI API) →
          Process response →
            Return to user (3 bio drafts) →
              User selects / edits → Apply to profile
        NO → Prompt upgrade (show pricing)
```

### AI Provider Strategy

| Provider | Use case | Cost tier |
|----------|----------|----------|
| **OpenAI GPT-4o mini** | Text generation (bio, captions, ideas) | LOW ($0.15/1M input, $0.60/1M output) |
| **OpenAI GPT-4o** | Complex generation (plans, pitches, lyrics) | MEDIUM ($2.50/1M input, $10/1M output) |
| **OpenAI DALL-E 3** | Image generation (cover art, promo graphics) | HIGH ($0.04/image standard) |
| **Fallback: Anthropic Claude** | Alternative for text if OpenAI is down | MEDIUM |

> **Multi-provider strategy**: OpenAI primary; Anthropic fallback. No vendor lock-in.

### Data Flow Rules

| Reguła | Uzasadnienie |
|--------|-------------|
| User input NEVER used for model training | GDPR (doc 21) + user trust |
| AI output stored with user's content | Auditable; Creator owns output |
| No PII in prompts (system-level filter) | Privacy (doc 22, 25) |
| Rate limiting per user (even paid) | Abuse prevention (doc 49) |

---

## UX Design Principles

| Princip | Opis |
|---------|------|
| **1-click generation** | User clicks „Generate" → result in ≤5 seconds |
| **Multiple drafts** | Always show 2-3 options (user picks, never forced) |
| **Edit-friendly** | Generated text is editable before publishing |
| **Contextual placement** | AI button appears where user needs it (profile bio edit, post compose, etc.) |
| **Credit transparency** | Show credit cost BEFORE generation; show remaining credits |
| **No black box** | User understands what AI is doing (clear labels, not hidden automation) |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| AIS-01 | AI output is generic / low quality | ŚREDNIE | WYSOKI | Domain-specific prompts (hip-hop context); user feedback loop; iterate |
| AIS-02 | Users don't understand AI value | ŚREDNIE | ŚREDNI | First-run tutorial; „Try it free" CTA; onboarding integration (doc 35) |
| AIS-03 | OpenAI API costs spike | NISKIE | WYSOKI | GPT-4o mini for most tasks; monitor cost/credit weekly; switch providers |
| AIS-04 | AI generates offensive/copyright content | NISKIE | WYSOKI | Output filter (profanity/copyright check); user review before publish |
| AIS-05 | Low conversion free → paid | ŚREDNIE | ŚREDNI | Free tier designed as teaser (10 credits = runs out fast if active) |

---

## Rekomendacja produktowa

### BUILD (MVP)

1. AI-01: Bio Generator
2. AI-02: Caption Writer
3. AI-03: Hashtag Suggester
4. AI-04: Promo Text Generator
5. AI-05: Content Idea Generator

### INTEGRATE (v0.3-v0.5)

6. AI-06: Cover Art Generator (DALL-E)
7. AI-07: Release Plan Builder
8. AI-08: Lyric Brainstorm
9. AI-09: Brand Pitch Writer
10. AI-10: Social Scheduler

### NOT NOW (v1.0+)

11. AI-11 through AI-15: Complex features requiring custom models or significant data
12. External API access for third parties
13. White-label AI tools for Labels

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-111 | Czy AI Studio powinno mieć dedykowaną stronę/tab czy być embedded w każdym module? | 🟡 DO DECYZJI | Rekomendacja: embedded w MVP (contextual buttons); dedicated tab w v0.5 |
| FDN-112 | Czy GPT-4o mini wystarczy dla jakości hip-hop content? | 🟡 DO DECYZJI | Rekomendacja: tak dla MVP; upgrade do GPT-4o dla złożonych tasków w v0.3 |
| FDN-113 | Czy Lyric Brainstorm (AI-08) nie tworzy ryzyka „AI pisze za rapera"? | 🟡 DO DECYZJI | Rekomendacja: marketing jako „brainstorm" nie „ghostwriter"; output = sketches, not finished lyrics |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 12 — Master Strategic Thesis |
| ← INPUT | 14 — Product Architecture |
| ← INPUT | 31 — HHU Product Thesis |
| ← INPUT | 39 — HHU Monetization Stack |
| → OUTPUT | 42 — Workflow Library Blueprint |
| → OUTPUT | 43 — AI Credits Economics Model |
| → OUTPUT | 44 — AI Studio Integration Map |
| → CROSS | 15 — System Architecture (API layer) |
| → CROSS | 25 — Data Protection (PII in prompts) |
| → CROSS | 49 — Trust & Safety (abuse prevention) |
