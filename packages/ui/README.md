# @meta-geniusz/ui — Biblioteka Komponentów UI

Współdzielona biblioteka komponentów React/Tailwind dla całego ekosystemu META-GENIUSZ OS.

**Status**: ⏳ Stub — gotowy do implementacji

---

## Opis

`packages/ui` to centralny package komponentów UI wielokrotnego użytku, zapewniający spójny design language w całej platformie META-GENIUSZ OS. Wszystkie aplikacje (`web`, `hhu`, `rfg`, `ai-studio`, `admin`) będą importować komponenty z tego pakietu.

## Planowane komponenty

### Podstawowe
- [ ] `Button` — przyciski (primary, secondary, ghost, destructive)
- [ ] `Input` — pola tekstowe z walidacją
- [ ] `Card` — karty z glassmorphic stylem
- [ ] `Badge` — etykiety/tagi
- [ ] `Avatar` — zdjęcie profilowe z fallback initials
- [ ] `Spinner` / `Skeleton` — stany ładowania

### Nawigacja
- [ ] `Navbar` — pasek nawigacji
- [ ] `Sidebar` — boczny panel nawigacji
- [ ] `Tabs` — zakładki
- [ ] `Breadcrumb` — ścieżka nawigacji

### Formularze
- [ ] `Form` — wrapper formularza z react-hook-form
- [ ] `Textarea` — pole wieloliniowe
- [ ] `Select` — dropdown
- [ ] `Checkbox` / `Radio` / `Toggle`

### Feedback
- [ ] `Toast` / `Notification` — powiadomienia
- [ ] `Modal` / `Dialog` — okna modalne
- [ ] `Alert` — komunikaty inline

### Dane
- [ ] `Table` — tabela danych
- [ ] `PostCard` — karta posta (HHU)
- [ ] `ProfileCard` — karta profilu użytkownika
- [ ] `ModuleCard` — karta modułu (web hub)

## Design System

Oparty na designie obecnego `apps/web`:
- **Kolory**: black/white z akcentami pink, fuchsia, cyan
- **Ciemny motyw** jako domyślny
- **Tailwind CSS 4** utility-first
- **Glassmorphic** efekty (backdrop-blur, bg-white/[0.04])
- **Typografia**: czcionka systemowa, font-black dla headingów

## Planowana struktura

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   └── ...
├── hooks/
├── utils/
└── index.ts          ← barrel export
```

## Użycie (planowane)

```typescript
import { Button, Card, Badge } from "@meta-geniusz/ui";

export function MyComponent() {
  return (
    <Card>
      <Badge>Hip Hop</Badge>
      <Button variant="primary">Explore</Button>
    </Card>
  );
}
```

## Implementacja

Planowana w fazie **v1.0.0**. Szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
