# @meta-geniusz/web — Centralny Hub Platformy

Główny punkt wejścia do ekosystemu **META-GENIUSZ OS**. Dashboard nawigacyjny łączący wszystkie moduły.

**Framework**: Next.js 16 (App Router) | **Port**: 3000 | **Pakiet**: `@meta-geniusz/web`

---

## Opis

`apps/web` to centralny hub — strona główna META-GENIUSZ OS prezentująca wszystkie moduły platformy. Zbudowany z myślą o estetyce dark-mode z gradientami (pink/fuchsia/cyan) i glassmorphic UI.

## Trasy (Routes)

| Trasa | Opis |
|-------|------|
| `/` | Strona główna — dashboard 4 modułów + infrastruktura |
| `/hhu` | Hip Hop Universe (placeholder) |
| `/rfg` | Rocket Fuell Girls (placeholder) |
| `/ai-studio` | AI Studio (placeholder) |
| `/admin` | Admin Control (placeholder) |

## Funkcje strony głównej

- 4 karty modułów (HHU, RFG, AI Studio, Admin) z hover-efektami
- Sekcja infrastruktury: LOGOS/AI Brain, Creator Economy, Monorepo/Scale
- CTA buttons: "Explore Modules" + link do GitHub
- Responsywna siatka (grid 1→2→4 kolumny)
- Dark theme z radial-gradient + backdrop-blur

## Uruchomienie

```bash
# Z root monorepo
pnpm dev:web

# Z katalogu apps/web
pnpm dev    # → http://localhost:3000
pnpm build
pnpm start
pnpm lint
```

## Struktura plików

```
src/app/
├── page.tsx           ← Hub główny (moduły + infrastruktura)
├── layout.tsx         ← Root layout
├── globals.css        ← Style globalne (Tailwind)
├── favicon.ico
├── hhu/page.tsx       ← Placeholder HHU
├── rfg/page.tsx       ← Placeholder RFG
├── ai-studio/page.tsx ← Placeholder AI Studio
└── admin/page.tsx     ← Placeholder Admin
```

## Stack

- **Next.js** 16.1.6 (App Router, Server Components)
- **React** 19.2.3
- **Tailwind CSS** 4.x
- **TypeScript** 5.x (strict)
- **ESLint** 9 + eslint-config-next
