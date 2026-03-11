# Changelog

Wszystkie znaczące zmiany w projekcie META-GENIUSZ OS są dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/).
Wersjonowanie zgodne z [Semantic Versioning](https://semver.org/).

---

## [0.1.0] — 2026-03-09

### Dodano
- Monorepo Turborepo z pnpm workspaces
- **`apps/web`** — centralny hub platformy META-GENIUSZ OS z dashboardem 4 modułów
  - Dark theme, gradienty pink/fuchsia/cyan, glassmorphic UI
  - Strony placeholder: `/hhu`, `/rfg`, `/ai-studio`, `/admin`
- **`apps/hhu`** — Hip Hop Universe
  - Feed postów z możliwością tworzenia (Client Component)
  - Dynamiczne profile użytkowników `/profile/[username]` (Server Component, SSR)
  - Integracja z backendem API
- **`apps/rfg`** — Rocket Fuell Girls (scaffold)
- **`apps/ai-studio`** — AI Studio (scaffold)
- **`apps/admin`** — Admin Control (scaffold)
- **`apps/api`** — Backend API (Express.js 4 + TypeScript)
  - Endpointy: `GET /`, `GET /health`, `POST /users`, `GET /users`, `GET /users/:username`
  - Endpointy: `POST /posts`, `GET /posts`, `POST /demo-user`, `GET /seed-demo-user`
  - CORS, JSON body parser, obsługa błędów
- **`apps/api/prisma`** — Baza danych SQLite z Prisma ORM
  - Modele: `User` (id, username, bio, createdAt, posts)
  - Modele: `Post` (id, content, image, createdAt, authorId, author)
  - Migracja inicjalna `20260309004601_init`
- Pakiety współdzielone (stubs): `@meta-geniusz/ui`, `@meta-geniusz/ai-core`, `@meta-geniusz/database`, `@meta-geniusz/agents`
- Konfiguracja TypeScript (strict mode) dla wszystkich aplikacji
- ESLint 9 z Next.js plugin
- Tailwind CSS 4 z PostCSS
- Turbo pipeline: `dev`, `build`, `lint`, `test`, `typecheck`

### Konfiguracja techniczna
- Next.js 16.1.6 + React 19.2.3
- Express.js 4.21.2 + Prisma 6.x
- TypeScript 5.x, pnpm 10.0.0, Turborepo 2.5.0
- SQLite (dev), port API: 4000

---

## [0.2.0] — 2026-03-11

### Zmieniono
- `apps/hhu` — zastąpiono hardkodowany `http://localhost:4000` zmienną środowiskową `NEXT_PUBLIC_API_URL` (z fallbackiem na `http://localhost:4000`) w feed (`page.tsx`) i profilu użytkownika (`profile/[username]/page.tsx`)
- `apps/api` — serwer nasłuchuje teraz na porcie ze zmiennej środowiskowej `PORT` (z fallbackiem na `4000`)

## [Unreleased]

### Planowane (v0.3.0)
- System uwierzytelniania (NextAuth.js lub JWT)
- Testy jednostkowe dla API (Vitest)
