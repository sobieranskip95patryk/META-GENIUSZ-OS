# @meta-geniusz/ai-studio — AI Studio

Narzędzia AI dla twórców — generowanie bio, captions, koncepcji i strategii wzrostu.

**Framework**: Next.js 16 (App Router) | **Pakiet**: `@meta-geniusz/ai-studio` | **Status**: 🔧 Scaffold

---

## Opis

`apps/ai-studio` to moduł AI META-GENIUSZ OS — centrum narzędzi opartych na sztucznej inteligencji dla twórców. Docelowo integruje się z warstwą `@meta-geniusz/ai-core` (LOGOS) i zewnętrznymi API (OpenAI, Anthropic).

## Planowane narzędzia AI

| Narzędzie | Opis | Status |
|-----------|------|--------|
| Bio Generator | Generowanie profesjonalnego bio na podstawie danych twórcy | ⏳ Planned |
| Caption Wizard | AI captions do postów, Reels, kampanii | ⏳ Planned |
| Growth Strategy | Spersonalizowana strategia wzrostu zasięgów | ⏳ Planned |
| Content Concepts | Generowanie koncepcji kreatywnych | ⏳ Planned |
| Trend Analysis | Analiza trendów w niszy twórcy | ⏳ Planned |

## Aktualna implementacja

```
src/app/
├── page.tsx    ← Placeholder (tytuł + opis modułu)
└── layout.tsx
```

## Uruchomienie

```bash
pnpm dev:ai    # → http://localhost:3000
```

## Stack

- **Next.js** 16.1.6
- **React** 19.2.3
- **Tailwind CSS** 4.x
- **TypeScript** 5.x (strict)
- **@meta-geniusz/ai-core** (planowany — AI orchestration)

## Konfiguracja (planowana)

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
AI_MODEL=gpt-4o-mini
```

## Roadmap

Implementacja w fazie **v0.4.0** — szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
