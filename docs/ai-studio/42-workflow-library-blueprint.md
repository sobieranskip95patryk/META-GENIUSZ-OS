# 42 — Workflow Library Blueprint

| Pole | Wartość |
|------|---------|
| **Projekt** | AI Studio Creator |
| **Cel decyzji** | Zbudować bibliotekę gotowych scenariuszy użycia AI |
| **Zakres** | MVP / Growth |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 41 (AI Studio Product Spec), 32 (Personas), 33 (MVP Scope) |
| **Zależności wyjściowe** | → 43 (AI Credits Economics), 44 (Integration Map) |

---

## Executive Summary

Workflow Library to **zestaw gotowych, połączonych AI akcji** — bundles, które prowadzą Creatora od potrzeby do efektu. Zamiast „kliknij Bio Generator, potem Caption Writer, potem Hashtag Suggester osobno" → Creator wybiera **Workflow „Release Kit"** i dostaje komplet materiałów promocyjnych w jednym flow. Workflows zwiększają perceived value AI, podnoszą conversion free→paid i redukują cognitive load.

---

## Concept

### Czym jest Workflow

| Element | Opis |
|---------|------|
| **Workflow** | Sekwencja 2-5 AI akcji połączonych w logiczny flow |
| **Input** | Jedno zadanie opisowe (np. „Promuję nowy singiel") |
| **Output** | Komplet materiałów (bio, captions, hashtags, promo grafika) |
| **Credit cost** | Suma individual credits (z 10-20% bundle discount) |

### Workflow vs Individual AI Tools

| Aspekt | Individual Tool | Workflow |
|--------|----------------|---------|
| UX | 1 click = 1 output | 1 click = multiple outputs |
| Learning curve | Niski ale manual | Bardzo niski (guided) |
| Perceived value | „Narzędzie" | „Asystent" |
| Credit usage | User decides sequence | Pre-optimized sequence |
| Conversion driver | Low (free tier sufficient for single tasks) | HIGH (workflows burn credits fast → upgrade) |

---

## Workflow Categories

### Category 1: Rap Release Kit

**Target**: Raper releasing new track/album

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Content Idea Generator | 3 promo angles for the release | 1 |
| 2 | Caption Writer × 3 | IG caption + TikTok caption + HHU caption | 3 |
| 3 | Hashtag Suggester | 15 hashtags per platform | 1 |
| 4 | Promo Text Generator | Press-ready description | 1 |
| **Total** | | **10 assets** | **6 (bundle: 5)** |

**User flow**:
```
Creator → "New Release Kit" → 
  Input: Song title, genre, mood, target audience, release date →
  AI processes all 4 steps →
  Output: Dashboard with all 10 assets, editable →
  Creator reviews, edits, publishes directly to HHU / copies for other platforms
```

---

### Category 2: Profile Setup Kit

**Target**: New Creator setting up HHU profile (doc 35: onboarding)

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Bio Generator | 3 bio variants | 1 |
| 2 | Content Idea Generator | 5 first post ideas | 1 |
| 3 | Caption Writer | Caption for first post | 1 |
| **Total** | | **9 assets** | **3 (bundle: 2)** |

> **Free tier**: This workflow costs 2-3 credits — doable on free (10 credits). Designed as onboarding hook.

---

### Category 3: Weekly Content Planner

**Target**: Active Creator maintaining posting schedule

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Content Idea Generator | 7 post ideas (1 per day) | 1 |
| 2 | Caption Writer × 7 | Captions for each idea | 7 |
| 3 | Hashtag Suggester × 7 | Hashtags per post | 7 |
| 4 | Social Scheduler (v0.3) | Optimal posting times for 7 days | 1 |
| **Total** | | **28 assets** | **16 (bundle: 12)** |

> **Conversion driver**: Weekly Planner eats credits fast → free tier exhausted → upgrade nudge.

---

### Category 4: Brand Pitch Pack (v0.5)

**Target**: Creator pitching to brands for sponsored content

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Brand Pitch Writer | 1-page pitch with Creator stats + value prop | 2 |
| 2 | Bio Generator (brand-facing version) | Professional bio for pitch | 1 |
| 3 | Content Idea Generator (brand context) | 3 collab content ideas | 1 |
| **Total** | | **5 assets** | **4 (bundle: 3)** |

---

### Category 5: Visual Identity Kit (v0.5)

**Target**: Creator building visual brand

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Cover Art Generator | 2 profile image concepts | 6 |
| 2 | Cover Art Generator | 2 banner/header concepts | 6 |
| 3 | Bio Generator | Bio matching visual identity | 1 |
| **Total** | | **5 assets** | **13 (bundle: 10)** |

---

### Category 6: Beat Promo Kit (v0.3)

**Target**: Producent promoting new beat

| Step | AI Tool | Output | Credits |
|------|---------|--------|---------|
| 1 | Caption Writer (beat context) | 3 captions for beat promo | 3 |
| 2 | Hashtag Suggester (beat/producer niche) | 15 hashtags | 1 |
| 3 | Promo Text Generator (beat marketplace angle) | Description for beat | 1 |
| **Total** | | **7 assets** | **5 (bundle: 4)** |

---

## Full Workflow Map

| # | Workflow | Category | MVP? | Credits (bundle) | Target persona |
|---|---------|----------|------|-----------------|---------------|
| W01 | Rap Release Kit | Promo | ✅ | 5 | Raper (P1) |
| W02 | Profile Setup Kit | Onboarding | ✅ | 2 | All new (P1-P4) |
| W03 | Weekly Content Planner | Planning | v0.3 | 12 | Active creator (P1, P2) |
| W04 | Brand Pitch Pack | Business | v0.5 | 3 | Creator seeking deals (P1, P5) |
| W05 | Visual Identity Kit | Branding | v0.5 | 10 | All creators (P1, P2) |
| W06 | Beat Promo Kit | Promo | v0.3 | 4 | Producent (P2) |
| W07 | Fan Engagement Kit | Community | v0.5 | 3 | Creators with fans |
| W08 | Album Rollout Planner | Strategy | v1.0 | 8 | Professional artists |
| W09 | Label Pitch Kit | Business | v1.0 | 5 | Indie artists → labels |
| W10 | Event Promo Kit | Events | v1.0 | 6 | Event organizers |

---

## Modularity & Reuse

### Template System

Każdy Workflow składa się z **modular steps** — te same AI tools (doc 41: AI-01 → AI-15) połączone w różne sekwencje. Dodanie nowego Workflow = konfiguracja, nie nowy kod.

```json
{
  "workflow_id": "W01",
  "name": "Rap Release Kit",
  "steps": [
    { "tool": "AI-05", "params": { "context": "release_promo" } },
    { "tool": "AI-02", "params": { "count": 3, "platforms": ["ig", "tiktok", "hhu"] } },
    { "tool": "AI-03", "params": { "count": 15 } },
    { "tool": "AI-04", "params": { "tone": "press" } }
  ],
  "credits_total": 6,
  "credits_bundle": 5,
  "availability": "mvp"
}
```

### Reuse Potential

| AI Tool | Used in workflows |
|---------|------------------|
| Bio Generator (AI-01) | W02, W04, W05 |
| Caption Writer (AI-02) | W01, W02, W03, W06 |
| Hashtag Suggester (AI-03) | W01, W03, W06 |
| Promo Text Generator (AI-04) | W01, W06 |
| Content Idea Generator (AI-05) | W01, W02, W03, W04 |
| Cover Art Generator (AI-06) | W05 |
| Release Plan Builder (AI-07) | W08 |
| Brand Pitch Writer (AI-09) | W04, W09 |

---

## Ryzyka

| ID | Ryzyko | P | I | Mitygacja |
|----|--------|---|---|-----------|
| WL-01 | Workflows feel like forced upsell (Creator: „just let me use single tools") | ŚREDNIE | ŚREDNI | Both options available; workflows = convenience, not paywall |
| WL-02 | Bundle discount eats margin | NISKIE | NISKI | 10-20% discount on ~$0.02/credit cost = negligible |
| WL-03 | Workflow output inconsistent (steps generate unrelated content) | ŚREDNIE | ŚREDNI | Shared context object passed between steps (song title, mood, etc.) |
| WL-04 | Too many workflows → decision paralysis | NISKIE | NISKI | MVP = 2 workflows only (W01, W02); add slowly based on usage data |

---

## Rekomendacja wdrożeniowa

### WORKFLOW STARTOWE (MVP)

1. **W01: Rap Release Kit** — covers primary use case
2. **W02: Profile Setup Kit** — onboarding integration

### WORKFLOW NASTĘPNE (v0.3-v0.5)

3. W03: Weekly Content Planner
4. W06: Beat Promo Kit  
5. W04: Brand Pitch Pack
6. W05: Visual Identity Kit

### WORKFLOW ZBĘDNE (now)

7-10. Album Rollout, Label Pitch, Event Promo, etc. — only at ≥1000 MAU with validated demand.

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-114 | Czy bundle discount (10-20%) jest wystarczający incentive vs single tools? | 🟡 DO DECYZJI | Rekomendacja: 15% discount; A/B test single vs bundle conversion w v0.3 |
| FDN-115 | Czy W02 (Profile Setup Kit) powinien być free (0 credits) jako onboarding hook? | 🟡 DO DECYZJI | Rekomendacja: 2 credits (z 10 free) — still free, ale buduje credit awareness |

---

## Dokumenty zależne

| Kierunek | Dokument |
|----------|----------|
| ← INPUT | 41 — AI Studio Creator Product Spec |
| ← INPUT | 32 — HHU Personas & JTBD |
| ← INPUT | 33 — HHU MVP Scope |
| → OUTPUT | 43 — AI Credits Economics Model |
| → OUTPUT | 44 — AI Studio Integration Map |
| → CROSS | 35 — HHU Creator Onboarding (W02 integration) |
| → CROSS | 39 — HHU Monetization Stack (credit pricing) |
