# 44 — AI Studio Integration Map

| Pole | Wartość |
|------|---------|
| **Projekt** | AI Studio Creator / HHU / RFG |
| **Cel decyzji** | Połączyć AI Studio z resztą ekosystemu |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 14 (Product Architecture), 15 (System Architecture), 41 (AI Studio Product Spec), 42 (Workflow Library) |
| **Zależności wyjściowe** | → 48 (Monetization Engine Master Spec) |

---

## Executive Summary

AI Studio NIE jest samodzielną aplikacją — to **warstwa AI** zintegrowana z HHU, RFG i Admin. Ten dokument mapuje każdy integration point: gdzie AI button pojawia się, jak data przepływa, jak credits są deducted, i jak AI output trafia do publication. Kluczowa zasada: **AI is invisible infrastructure, not a separate product** — user korzysta z AI w kontekście swojej pracy, nie przełącza się do osobnej apki.

---

## Integration Architecture — Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface Layer                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   HHU    │  │   RFG    │  │  Admin   │  │  Web    │ │
│  │ (Next.js)│  │ (Next.js)│  │ (Next.js)│  │(Next.js)│ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │              │              │              │      │
│  ┌────▼──────────────▼──────────────▼──────────────▼────┐│
│  │              AI Widget Components                     ││
│  │  (shared React components from packages/ui)          ││
│  └──────────────────────┬───────────────────────────────┘│
└─────────────────────────┼────────────────────────────────┘
                          │ REST API calls
┌─────────────────────────▼────────────────────────────────┐
│                    API Layer (apps/api)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │ AI Controller│  │Credit Service│  │Content Service │ │
│  └──────┬───────┘  └──────┬───────┘  └───────┬────────┘ │
└─────────┼─────────────────┼──────────────────┼───────────┘
          │                 │                  │
┌─────────▼─────────────────▼──────────────────▼───────────┐
│                 External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ OpenAI   │  │ Stripe   │  │Cloudflare│               │
│  │  API     │  │ Billing  │  │  R2/CDN  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└──────────────────────────────────────────────────────────┘
```

---

## Integration Points — Detailed

### IP-01: HHU — Profile Bio (MVP)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → Edit Profile → Bio field |
| **Trigger** | Button: ✨ „Wygeneruj bio AI" |
| **AI Tool** | AI-01: Bio Generator |
| **Input** | Genre, mood, inspirations (pre-filled from profile if available) |
| **Output** | 3 bio drafts displayed inline below field |
| **User action** | Click „Użyj" → bio text fills field → user edits → Save |
| **Credits** | 1 |
| **Priority** | P0 (MVP) |

### IP-02: HHU — Post Compose (MVP)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → New Post → Compose area |
| **Trigger** | Button: ✨ „AI Caption" |
| **AI Tool** | AI-02: Caption Writer |
| **Input** | Post content (image/text draft already entered) + tone selection |
| **Output** | 3 caption variants in a dropdown |
| **User action** | Select caption → inserted into compose field → edit → Post |
| **Credits** | 1 |
| **Priority** | P0 (MVP) |

### IP-03: HHU — Post Compose Hashtags (MVP)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → New Post → below caption |
| **Trigger** | Button: # „AI Hashtags" |
| **AI Tool** | AI-03: Hashtag Suggester |
| **Input** | Caption text or image description |
| **Output** | 10-15 hashtags as clickable chips |
| **User action** | Toggle on/off individual hashtags → appended to post |
| **Credits** | 1 |
| **Priority** | P0 (MVP) |

### IP-04: HHU — Onboarding Workflow (MVP)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → Onboarding → Step 3 (doc 35) |
| **Trigger** | Auto-suggested: „Chcesz pomoc z bio?" |
| **AI Tool** | W02: Profile Setup Kit (Workflow) |
| **Input** | Onboarding answers (genre, vibe, links) |
| **Output** | Bio + 5 post ideas + first caption |
| **User action** | Accept or skip each element |
| **Credits** | 2 (bundle) |
| **Priority** | P0 (MVP) |

### IP-05: HHU — Content Ideas (MVP)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → Home Feed → „Brak inspiracji?" prompt (shown when no drafts) |
| **Trigger** | Button: 💡 „AI pomysły na content" |
| **AI Tool** | AI-05: Content Idea Generator |
| **Input** | Creator's genre, recent posts, trending topics on HHU |
| **Output** | 5 content ideas with brief descriptions |
| **User action** | Click idea → opens New Post with prefilled prompt |
| **Credits** | 1 |
| **Priority** | P1 (MVP nice-to-have) |

### IP-06: HHU — Release Kit Workflow (v0.3)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → Creator Dashboard → „New Release" |
| **Trigger** | Button: 🚀 „Release Kit" |
| **AI Tool** | W01: Rap Release Kit (Workflow) |
| **Input** | Song title, genre, mood, release date, target platforms |
| **Output** | Dashboard with 10 assets (captions, hashtags, promo text) |
| **User action** | Review each asset → edit → publish/schedule |
| **Credits** | 5 (bundle) |
| **Priority** | v0.3 |

### IP-07: HHU — Cover Art Generation (v0.5)

| Element | Wartość |
|---------|---------|
| **Location** | HHU → Edit Profile → Cover image; HHU → New Drop → Image |
| **Trigger** | Button: 🎨 „Wygeneruj grafikę AI" |
| **AI Tool** | AI-06: Cover Art Generator |
| **Input** | Style prompt, genre, mood, colors |
| **Output** | 2 image drafts (1024×1024) |
| **User action** | Select → crop/adjust → apply |
| **Credits** | 3 |
| **Priority** | v0.5 |

### IP-08: RFG — Profile Bio (v0.5)

| Element | Wartość |
|---------|---------|
| **Location** | RFG → Edit Profile → Bio field |
| **Trigger** | Same UX as IP-01 but RFG-contextual prompts |
| **AI Tool** | AI-01 (Bio Generator with RFG persona context) |
| **Input** | Model type, specialization, portfolio highlights |
| **Output** | 3 bio drafts (professional/creative/casual) |
| **Credits** | 1 |
| **Priority** | v0.5 |

### IP-09: RFG — Brand Pitch (v0.5)

| Element | Wartość |
|---------|---------|
| **Location** | RFG → Creator Dashboard → „Pitch to Brand" |
| **Trigger** | Button: 📝 „AI Brand Pitch" |
| **AI Tool** | AI-09 / W04: Brand Pitch Pack |
| **Input** | Creator profile + target brand category |
| **Output** | 1-page pitch document |
| **Credits** | 2-3 |
| **Priority** | v0.5 |

### IP-10: Admin — Content Moderation AI Assist (v0.5)

| Element | Wartość |
|---------|---------|
| **Location** | Admin → Moderation Queue |
| **Trigger** | Auto-classification on report |
| **AI Tool** | Custom: Content Classification (separate from creator tools) |
| **Input** | Reported content + report reason |
| **Output** | Risk score + recommended action |
| **Credits** | N/A (platform cost, not user credits) |
| **Priority** | v0.5 |

---

## Integration Map — Summary Table

| ID | App | Feature | AI Tool | MVP? | Credits |
|----|-----|---------|---------|------|---------|
| IP-01 | HHU | Profile Bio | AI-01 | ✅ | 1 |
| IP-02 | HHU | Post Caption | AI-02 | ✅ | 1 |
| IP-03 | HHU | Post Hashtags | AI-03 | ✅ | 1 |
| IP-04 | HHU | Onboarding Kit | W02 | ✅ | 2 |
| IP-05 | HHU | Content Ideas | AI-05 | ✅ (P1) | 1 |
| IP-06 | HHU | Release Kit | W01 | v0.3 | 5 |
| IP-07 | HHU | Cover Art | AI-06 | v0.5 | 3 |
| IP-08 | RFG | Profile Bio | AI-01 | v0.5 | 1 |
| IP-09 | RFG | Brand Pitch | AI-09/W04 | v0.5 | 2-3 |
| IP-10 | Admin | Mod AI Assist | Custom | v0.5 | N/A |

---

## Data Dependencies

| Source | Data needed | Used by AI for |
|--------|------------|---------------|
| User Profile (Prisma: User) | Genre, bio, links, verification level | Context for Bio Generator, Content Ideas |
| Post History | Recent 10 posts | Content Ideas (avoid repetition), Caption style matching |
| Platform Trends | Top hashtags, trending topics (HHU feed analytics) | Hashtag Suggester, Content Ideas |
| Credit Balance (planned: CreditLedger) | Current credits, plan type | Gate: allow/deny AI action |
| AI Generation History | Past generations per user | Avoid duplicate outputs; personalization |

---

## Shared AI Widget Components (packages/ui)

| Component | Opis | Used in |
|-----------|------|---------|
| `<AiButton />` | Sparkle icon + label trigger | All integration points |
| `<AiResultPanel />` | Displays 2-3 AI drafts with select/edit/dismiss | IP-01, IP-02, IP-05 |
| `<AiHashtagChips />` | Clickable hashtag toggles | IP-03 |
| `<AiWorkflowDashboard />` | Multi-step workflow output view | IP-04, IP-06 |
| `<AiCreditBadge />` | Shows remaining credits + cost of next action | All points |
| `<AiUpgradePrompt />` | Shown when credits = 0; links to pricing | All points |

---

## Monetization Implications

| Integration | Monetization impact |
|-------------|-------------------|
| IP-01 (Bio) | Low credits, high frequency → introduces credit concept |
| IP-02 (Caption) | Most used → main credit consumer → upgrade trigger |
| IP-04 (Onboarding Kit) | Burns 2 credits immediately → shows value day 1 |
| IP-06 (Release Kit) | Burns 5 credits → Starter plan insufficient for weekly use → Pro upgrade |
| IP-07 (Cover Art) | 3 credits per generation → premium feel, high perceived value |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| AIM-01 | AI buttons create visual clutter in UI | ŚREDNIE | ŚREDNI | Subtle design (sparkle icon, not full button); show only in context |
| AIM-02 | Latency: AI calls take 3-5s → UX feels slow | ŚREDNIE | ŚREDNI | Loading animation; optimistic UI; cache common outputs |
| AIM-03 | Integration tight coupling (AI changes break HHU) | NISKIE | WYSOKI | AI layer as shared package (packages/ai-core); versioned API |
| AIM-04 | RFG context wrong (hip-hop prompts in modeling bio) | NISKIE | ŚREDNI | Context parameter per integration point; separate prompt templates |
| AIM-05 | Credits confusion (user doesn't understand cost before clicking) | ŚREDNIE | ŚREDNI | CreditBadge always visible; confirmation before ≥3 credit actions |

---

## Rekomendacja integracji

### INTEGRACJE NATYCHMIASTOWE (MVP)

1. IP-01: HHU Bio Generator (profile edit)
2. IP-02: HHU Caption Writer (post compose)
3. IP-03: HHU Hashtag Suggester (post compose)
4. IP-04: HHU Onboarding Kit (W02)
5. Shared components: AiButton, AiResultPanel, AiCreditBadge

### INTEGRACJE NASTĘPNE (v0.3-v0.5)

6. IP-05: Content Ideas (feed empty state)
7. IP-06: Release Kit Workflow (creator dashboard)
8. IP-07: Cover Art Generator
9. IP-08, IP-09: RFG integrations
10. IP-10: Admin moderation assist

### INTEGRACJE NIEPOTRZEBNE (teraz)

11. Standalone AI Studio page (→ v1.0+ if demand exists)
12. API access for external developers (→ v1.0+)
13. Real-time AI co-pilot (chat-based) — complexity too high for Solo Dev (FDN-90)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-119 | Czy AI widgets powinny być w packages/ui (shared) czy per-app? | 🟡 DO DECYZJI | Rekomendacja: packages/ui (reusable across HHU, RFG, Admin) |
| FDN-120 | Czy apps/ai-studio/ jako osobna Next.js app jest potrzebna? | 🟡 DO DECYZJI | Rekomendacja: NIE na MVP; AI as embedded widgets; standalone page w v1.0 if demand |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 14 — Product Architecture |
| ← INPUT | 15 — System Architecture |
| ← INPUT | 41 — AI Studio Creator Product Spec |
| ← INPUT | 42 — Workflow Library Blueprint |
| → OUTPUT | 48 — Monetization Engine Master Spec |
| → CROSS | 35 — HHU Creator Onboarding (IP-04 integration) |
| → CROSS | 39 — HHU Monetization Stack (credit deduction) |
| → CROSS | 43 — AI Credits Economics (pricing per integration) |
