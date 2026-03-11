# @meta-geniusz/agents — AI Agents Framework

Framework autonomicznych agentów AI dla ekosystemu META-GENIUSZ OS.

**Status**: ⏳ Stub — gotowy do implementacji

---

## Opis

`packages/agents` to framework do tworzenia i zarządzania autonomicznymi agentami AI w META-GENIUSZ OS. Agenty działają w tle, automatyzując zadania twórców i operacje platformy.

## Koncepcja agentów

Agenty to autonomiczne procesy AI, które:
1. Obserwują stan systemu / dane użytkownika
2. Podejmują decyzje na podstawie kontekstu
3. Wykonują akcje (generowanie, powiadomienia, analiza)
4. Uczą się z wyników i feedbacku

## Planowane agenty

### Agenty dla twórców

| Agent | Opis | Wyzwalacz |
|-------|------|-----------|
| `BioAgent` | Automatyczna optymalizacja bio | Zmiana profilu |
| `GrowthAgent` | Codzienne sugestie strategii wzrostu | Harmonogram (cron) |
| `TrendAgent` | Alerty o trendach w niszy twórcy | Real-time |
| `EngagementAgent` | Analiza i raport zaangażowania | Tygodniowo |
| `ContentAgent` | Sugestie tematów contentowych | Na żądanie |

### Agenty systemowe

| Agent | Opis | Wyzwalacz |
|-------|------|-----------|
| `ModerationAgent` | AI moderacja nowych postów | Nowy post |
| `SpamAgent` | Detekcja i blokowanie spamu | Każde zdarzenie |
| `OnboardingAgent` | Personalizowany onboarding nowych userów | Rejestracja |
| `RecommendationAgent` | Rekomendacje użytkowników/treści | Sesja użytkownika |

## Planowana architektura

```typescript
import { createAgent, schedule } from "@meta-geniusz/agents";

// Definicja agenta
const growthAgent = createAgent({
  name: "GrowthAgent",
  description: "Generates daily growth strategy for creators",

  trigger: schedule("0 9 * * *"), // Codziennie o 9:00

  async execute(context) {
    const { userId } = context;
    const profile = await fetchCreatorProfile(userId);
    const strategy = await logos.generateGrowthStrategy(profile);

    await sendNotification(userId, {
      title: "Twoja strategia wzrostu na dziś",
      body: strategy.summary,
      actions: strategy.topActions,
    });
  },
});

// Rejestracja i uruchomienie
growthAgent.start();
```

## Planowana struktura

```
src/
├── core/
│   ├── agent.ts           ← Bazowa klasa Agent
│   ├── scheduler.ts       ← Harmonogram (cron-based)
│   ├── triggers.ts        ← Definicje wyzwalaczy
│   └── registry.ts        ← Rejestr agentów
├── agents/
│   ├── bio-agent.ts
│   ├── growth-agent.ts
│   ├── trend-agent.ts
│   ├── moderation-agent.ts
│   └── onboarding-agent.ts
├── utils/
│   ├── notifications.ts
│   └── logger.ts
└── index.ts               ← barrel export
```

## Zależności (planowane)

- `@meta-geniusz/ai-core` — dostęp do LOGOS/LLM
- `@meta-geniusz/database` — odczyt/zapis danych
- `node-cron` — harmonogramowanie zadań
- `bull` / `bullmq` — kolejka zadań (Redis)

## Implementacja

Planowana w fazie **v2.0.0** (LOGOS / AI Intelligence). Szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
