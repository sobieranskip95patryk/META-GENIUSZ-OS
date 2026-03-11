# @meta-geniusz/hhu — Hip Hop Universe

Społecznościowa platforma kultury hip-hop dla artystów, fanów, marek i twórców.

**Framework**: Next.js 16 (App Router) | **Pakiet**: `@meta-geniusz/hhu`

---

## Opis

`apps/hhu` to moduł społecznościowy META-GENIUSZ OS — feed postów, profile twórców i interakcje społecznościowe wokół kultury hip-hop. Komunikuje się z backendem `apps/api` na porcie 4000.

## Trasy (Routes)

| Trasa | Opis | Typ |
|-------|------|-----|
| `/` | Feed postów + formularz tworzenia | Client Component |
| `/profile/[username]` | Profil użytkownika z postami | Server Component (SSR) |

## Funkcje

- **Feed**: Pobieranie i wyświetlanie postów w czasie rzeczywistym (`GET /posts`)
- **Tworzenie postów**: Formularz z submitowaniem do API (`POST /posts`)
- **Profile**: Dynamiczne strony profilu z bio i listą postów
- **SSR**: Profil użytkownika renderowany server-side dla SEO

## Integracja z API

```typescript
// Feed — pobieranie postów
fetch("http://localhost:4000/posts")

// Tworzenie posta
fetch("http://localhost:4000/posts", {
  method: "POST",
  body: JSON.stringify({ content, authorId: "demo" })
})

// Profil użytkownika (SSR)
fetch(`http://localhost:4000/users/${username}`, { cache: "no-store" })
```

> ⚠️ URL API jest aktualnie hardcoded. W przyszłości przeniesiony do zmiennych środowiskowych.

## Uruchomienie

```bash
# Wymagane: API musi być uruchomione na porcie 4000
# W osobnym terminalu:
cd apps/api && pnpm dev

# Uruchomienie HHU
pnpm dev:hhu     # z root, → http://localhost:3000
```

## Struktura plików

```
src/app/
├── page.tsx                      ← Feed (Client Component)
├── layout.tsx
├── globals.css
└── profile/
    └── [username]/
        └── page.tsx              ← Profil (Server Component, SSR)
```

## Stack

- **Next.js** 16.1.6 (App Router, RSC + Client Components)
- **React** 19.2.3
- **Tailwind CSS** 4.x
- **TypeScript** 5.x (strict)
