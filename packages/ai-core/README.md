# @meta-geniusz/ai-core — AI Orchestration / LOGOS Layer

Warstwa inteligencji systemowej META-GENIUSZ OS — AI Core znany jako LOGOS.

**Status**: ⏳ Stub — gotowy do implementacji

---

## Opis

`packages/ai-core` to centralny pakiet orkiestracji AI — mózg META-GENIUSZ OS (warstwa LOGOS). Odpowiada za routing promptów, personalizację, rekomendacje i integrację z zewnętrznymi modelami AI (OpenAI, Anthropic, Mistral, Ollama).

## Planowane funkcje

### Generacja tekstu
- [ ] `generateBio(userProfile)` — generowanie profesjonalnego bio
- [ ] `generateCaption(context)` — AI captions do postów
- [ ] `generateGrowthStrategy(creator)` — strategia wzrostu
- [ ] `generateContentConcepts(brief)` — koncepcje kreatywne

### Analiza
- [ ] `analyzeTrends(niche, platform)` — analiza trendów
- [ ] `analyzeEngagement(posts)` — analiza zaangażowania
- [ ] `scoreContent(post)` — scoring jakości contentu

### Routing i Orchestration (LOGOS)
- [ ] `route(prompt, context)` — inteligentny routing do odpowiedniego modelu
- [ ] `chat(messages, systemPrompt)` — konwersacja multi-turn
- [ ] `embed(text)` — generowanie embeddings dla wyszukiwania

### Moderacja
- [ ] `moderateContent(text)` — AI moderacja treści
- [ ] `detectSpam(post)` — detekcja spamu

## Planowane integracje

| Provider | Modele | Zastosowanie |
|----------|--------|--------------|
| OpenAI | GPT-4o, GPT-4o-mini | Generacja tekstu, czat |
| Anthropic | Claude 3.5 Sonnet | Długi kontekst, analiza |
| OpenAI | text-embedding-3-small | Embeddings, wyszukiwanie |
| Moderacja | omni-moderation | Content moderation |

## Planowana architektura

```typescript
// Przykład użycia
import { logos } from "@meta-geniusz/ai-core";

const bio = await logos.generateBio({
  name: "DJ Kowalski",
  genres: ["hip-hop", "trap"],
  achievements: ["100k streams", "5 mixtapes"],
  style: "professional"
});
```

## Konfiguracja (planowana)

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
AI_DEFAULT_MODEL=gpt-4o-mini
AI_MAX_TOKENS=2048
AI_TEMPERATURE=0.7
```

## Planowana struktura

```
src/
├── providers/
│   ├── openai.ts
│   └── anthropic.ts
├── generators/
│   ├── bio.ts
│   ├── captions.ts
│   └── strategy.ts
├── moderation/
│   └── content.ts
├── logos.ts          ← Main orchestrator (LOGOS)
└── index.ts          ← barrel export
```

## Implementacja

Planowana w fazie **v0.4.0** (AI Studio) i **v2.0.0** (pełny LOGOS). Szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
