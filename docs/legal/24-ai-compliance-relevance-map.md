# 24 — AI Compliance Relevance Map

| Pole | Wartość |
|------|---------|
| **Projekt** | AI STUDIO CREATOR / META-GENIUSZ OS |
| **Cel decyzji** | Określić wpływ wymogów regulacyjnych AI na funkcje platformy |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 21 (Legal Backbone), 41 (AI Studio Spec — planned) |
| **Zależności wyjściowe** | → 30 (Compliance Decision Matrix) |

---

## Executive Summary

META-GENIUSZ OS wykorzystuje modele AI (OpenAI, Anthropic) do generowania tekstu, obrazów i wsparcia twórców w AI Studio. EU AI Act (Rozporządzenie 2024/1689) klasyfikuje systemy AI według ryzyka: niedopuszczalne, wysokie, ograniczone, minimalne. Niniejszy dokument mapuje **każdy use case AI na platformie** na kategorie ryzyka AI Act, identyfikuje obowiązki transparentności, ryzyka outputów i wymagania dokumentacyjne.

> **Kluczowy wniosek**: Większość funkcji AI Studio kwalifikuje się jako **ryzyko minimalne / ograniczone** (Art. 52) — wymagana transparentność, ale bez certyfikacji. Wyjątek: generowanie deepfake/syntetycznych twarzy → ryzyko ograniczone z obowiązkowym oznaczeniem.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Funkcje AI | ❌ Niezaimplementowane (pakiet `packages/ai-core` pusty) |
| Integracja z OpenAI/Anthropic | ❌ Brak |
| AI disclosure w ToS | ❌ Brak |
| Oznaczanie AI-generated content | ❌ Brak |
| Filtrowanie AI output | ❌ Brak |
| Cost tracking / credits | ❌ Brak |
| DPIA dla AI | ❌ Brak |

---

## AI Use Cases na platformie

### AI DO URUCHOMIENIA (v0.5–v0.7)

| ID | Use Case | Vertical | Model | Input | Output | Ryzyko AI Act |
|----|----------|----------|-------|-------|--------|---------------|
| AI-01 | **Text generation** (posty, opisy, bio) | AI Studio, HHU | GPT-4o / Claude | Prompt tekstowy | Tekst | Minimalne |
| AI-02 | **Content ideation** (pomysły na posty/kampanie) | AI Studio | GPT-4o | Prompt + kontekst | Lista pomysłów | Minimalne |
| AI-03 | **Image generation** (cover art, promo) | AI Studio | DALL-E 3 / Midjourney API | Prompt | Obraz | Ograniczone (Art. 50(2)) |
| AI-04 | **Content planning** (harmonogram publikacji) | AI Studio | GPT-4o | Dane profilu + preferencje | Plan | Minimalne |
| AI-05 | **Promo asset generation** (bannery, social posts) | AI Studio | GPT-4o + DALL-E | Template + prompt | Tekst + obraz | Ograniczone |

### AI WYMAGAJĄCE OSTROŻNOŚCI (v0.7–v1.0)

| ID | Use Case | Vertical | Ryzyko AI Act | Przyczyna ostrożności |
|----|----------|----------|---------------|----------------------|
| AI-06 | **Creator copilot** (asystent twórcy) | AI Studio | Ograniczone | Interakcja konwersacyjna → Art. 50(1) — informacja że to AI |
| AI-07 | **Content recommendation** (feed algorithm) | HHU, RFG | Minimalne* | *Może stać się ograniczone przy profilowaniu → DPIA |
| AI-08 | **Synthetic voice / audio** | AI Studio (future) | Ograniczone (Art. 50(2)) | Deepfake audio → obowiązkowe oznaczenie |
| AI-09 | **Face/style generation** (RFG profile assets) | RFG, AI Studio | Ograniczone (Art. 50(2)) | Syntetyczne twarze → obowiązkowe oznaczenie |
| AI-10 | **Automated moderation** (content detection) | HHU, RFG | Ograniczone | Decyzje wpływające na użytkowników |

### AI NIE TERAZ

| ID | Use Case | Powód odrzucenia |
|----|----------|-----------------|
| AI-11 | Scoring użytkowników (social scoring) | **Niedopuszczalne** — Art. 5(1)(c) AI Act |
| AI-12 | Automated hiring/casting decisions | Wysokie ryzyko (Annex III, p. 4) — wymaga certyfikacji |
| AI-13 | Real-time biometric identification | **Niedopuszczalne** w público — Art. 5(1)(d) |
| AI-14 | Emotion recognition w treściach | Etycznie wątpliwe, brak biznesowego uzasadnienia |

---

## Klasyfikacja ryzyka AI Act

### Minimalne ryzyko (większość funkcji)

| Obowiązek | Status | Implementacja |
|-----------|--------|---------------|
| Brak formalnych obowiązków | ✅ | — |
| Rekomendacja: AI literacy (Art. 4) | ❌ | Szkolenie wewnętrzne + dokumentacja |

### Ograniczone ryzyko — Art. 50 (kluczowe dla platformy)

| Obowiązek | Dotyczy AI-ID | Implementacja | Faza |
|-----------|--------------|---------------|------|
| **Art. 50(1)**: Informacja o interakcji z AI | AI-06 (copilot) | Banner: „Rozmawiasz z AI asystentem" | v0.5 |
| **Art. 50(2)**: Oznaczenie AI-generated content | AI-03, AI-05, AI-08, AI-09 | Tag `AI_GENERATED` na treści + watermark | v0.5 |
| **Art. 50(4)**: Oznaczenie deepfake | AI-08, AI-09 | Label: „Wygenerowane przez AI" + metadata | v0.7 |

### Wysokie ryzyko (nie dotyczy MVP)

Żaden obecny use case nie kwalifikuje się jako wysokie ryzyko pod warunkiem:
- Brak automated hiring/casting decisions (AI-12)
- Brak credit scoring / access to services based on AI profiling
- Content recommendation nie jest „safety component"

---

## Obowiązki transparentności

### Dla użytkowników (User-facing)

| Wymóg | Gdzie | Jak | Faza |
|-------|-------|-----|------|
| „Ta treść została wygenerowana przez AI" | AI-generated posty/obrazy | Tag visual + metadata | v0.5 |
| „Rozmawiasz z AI asystentem" | AI copilot chatbot | Banner na początku konwersacji | v0.5 |
| „AI Studio wykorzystuje modele [OpenAI/Anthropic]" | AI Studio settings | Informacja w UI + ToS | v0.5 |
| „Twoje prompty są przetwarzane przez [provider]" | AI Studio | Informacja w UI | v0.5 |
| Opt-out z AI rekomendacji feedu | HHU, RFG | Toggle w ustawieniach | v0.7 |

### Dla regulatorów / audytu (Internal)

| Wymóg | Dokument / System | Faza |
|-------|--------------------|------|
| Rejestr AI use cases | Ten dokument (doc 24) | ✅ Teraz |
| Opis modeli i dostawców | Dokumentacja techniczna ai-core | v0.5 |
| Logi AI generations (prompt+output) | AIGeneration entity (doc 19) | v0.5 |
| Statystyki AI usage per model | Analytics dashboard | v0.7 |
| DPIA dla profilowania (jeśli AI-07) | Osobny dokument DPIA | v0.7 |

---

## Ryzyka modeli AI

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|----|-----------|
| AIC-01 | AI generuje treść naruszającą prawo (mowa nienawiści, CSAM) | NISKIE (modele mają guardrails) | KRYTYCZNY | Filtrowanie output + content policy + user report |
| AIC-02 | AI generuje deepfake bez oznaczenia | ŚREDNIE | WYSOKI | Obowiązkowe tagowanie AI_GENERATED |
| AIC-03 | User wkleja dane osobowe w prompty | ŚREDNIE | ŚREDNI | Informacja w UI + zero-retention API policy |
| AIC-04 | AI hallucinations → fałszywe informacje | WYSOKIE | NISKI (creative content) | Disclaimer: „AI może generować niedokładne treści" |
| AIC-05 | Naruszenie IP przez AI-generated content | ŚREDNIE | ŚREDNI | ToS: user odpowiada za użycie; disclaimer |
| AIC-06 | Vendor lock-in (OpenAI) | ŚREDNIE | ŚREDNI | Abstrakcja ai-core z obsługą multi-provider |
| AIC-07 | Wzrost kosztów API (OpenAI price hikes) | ŚREDNIE | ŚREDNI | Credit system + cost caps per user (doc 43) |

---

## Ryzyka outputów AI

| Typ outputu | Ryzyko | Kontrola |
|-------------|--------|----------|
| Tekst | Hate speech, doxxing, dezinformacja | Content filter (API-level) + user report |
| Obraz | NSFW, deepfake, copyright violation | DALL-E built-in filter + manual review queue |
| Audio (future) | Voice impersonation | Obowiązkowe oznaczenie + consent autora |
| Rekomendacje (future) | Filter bubble, radicalization | Diversity injection + user control |

### Content Safety Pipeline (v0.5)

```
User Prompt
  → [1] Input filter (PII detection, prohibited keywords)
  → [2] AI Model (OpenAI/Anthropic with safety settings)
  → [3] Output filter (content moderation API / regex)
  → [4] Metadata tagging (AI_GENERATED, model, timestamp)
  → [5] User review → publish (with AI tag visible)
```

---

## Wymagania dokumentacyjne

| Dokument | Cel | Obowiązek | Faza |
|----------|-----|-----------|------|
| **Karta modelu** (per provider) | Opis modelu, capabilities, limitations | Rekomendacja (Art. 4 AI literacy) | v0.5 |
| **DPIA** (dla AI-07, AI-10) | Ocena wpływu na prawa użytkowników | Obowiązek GDPR Art. 35 (jeśli profilowanie) | v0.7 |
| **Log użycia AI** | Audytowalność generacji | Rekomendacja (AI Act Art. 50) | v0.5 |
| **AI Ethics Policy** | Wewnętrzne zasady użycia AI | Rekomendacja | v1.0 |
| **Transparency Report (AI)** | Statystyki AI usage, incydenty | Rekomendacja (DSA alignment) | v1.0 |

---

## Rekomendacja wdrożeniowa

### AI DO URUCHOMIENIA — natychmiast z AI Studio (v0.5)
1. Implementacja ai-core z multi-provider (OpenAI + Anthropic)
2. Tag AI_GENERATED na każdej generacji
3. Informacja „Rozmawiasz z AI" w copilot
4. Disclaimer w AI Studio: „AI może generować niedokładne treści"
5. Zero-retention API policy z providerami
6. Content safety pipeline (input filter → output filter)
7. AI Disclosure w ToS/Privacy Policy

### AI WYMAGAJĄCE OSTROŻNOŚCI — z dodatkową kontrolą (v0.7)
8. DPIA dla content recommendation (AI-07)
9. Deepfake labeling system (AI-08, AI-09)
10. Automated moderation z human-in-the-loop (AI-10)

### AI NIE TERAZ
11. Social scoring (AI-11) — **ZABRONIONE** permanentnie
12. Automated casting decisions (AI-12) — wymaga certyfikacji
13. Biometric identification (AI-13) — **ZABRONIONE**

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-66 | Czy AI-generated images wymagają watermark czy tylko tag? | 🟡 DO DECYZJI | Rekomendacja: tag metadata + visual label (zgodne z AI Act Art. 50(2)) |
| FDN-67 | Który dostawca AI primary: OpenAI czy Anthropic? | 🟡 DO DECYZJI | Rekomendacja: OpenAI jako primary (GPT-4o + DALL-E), Anthropic jako fallback |
| FDN-68 | Czy zezwalać na AI audio generation (voice cloning)? | 🟡 DO DECYZJI | Rekomendacja: nie w MVP; rozważyć z consent-based model w v1.0 |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 21 — Legal Backbone | Wejście: AI Disclosure (L12) |
| 22 — GDPR Map | Wejście: AI prompts jako dane osobowe (C4) |
| 41 — AI Studio Spec (planned) | Wejście: szczegółowe use cases AI |
| 17 — Shared Services Blueprint | Wejście: ai-core package spec |
| 27 — Content Policy | Wyjście: AI content rules |
| 30 — Compliance Decision Matrix | Wyjście: decyzje AI → legal/ops/founder |
| 43 — AI Credits Economics (planned) | Wyjście: cost caps, credit model |
