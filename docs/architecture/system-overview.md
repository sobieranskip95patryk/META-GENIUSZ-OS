# META-GENIUSZ OS — Przegląd Architektury Systemu

## Architektura wysokiego poziomu

META-GENIUSZ OS jest zbudowany jako **Turborepo monorepo** z wieloma aplikacjami Next.js, centralnym backendem Express.js i współdzielonymi pakietami.

```
┌─────────────────────────────────────────────────────────────────┐
│                        KLIENT (przeglądarka)                     │
└──────────┬─────────────────────────────────────────────────────┘
           │ HTTP / SSR / RSC
┌──────────▼──────────────────────────────────────────────────────┐
│                      WARSTWA FRONTENDOWA                         │
│  ┌──────────┐  ┌───────┐  ┌──────────┐  ┌───────┐  ┌───────┐  │
│  │ apps/web │  │   hhu │  │    rfg   │  │  ai-  │  │ admin │  │
│  │  (hub)   │  │       │  │          │  │studio │  │       │  │
│  │  :3000   │  │ :3001 │  │  :3002   │  │ :3003 │  │ :3004 │  │
│  └──────────┘  └───────┘  └──────────┘  └───────┘  └───────┘  │
│              Next.js 16 + React 19 + Tailwind CSS 4             │
└──────────────────────────────┬──────────────────────────────────┘
                               │ fetch / REST API
┌──────────────────────────────▼──────────────────────────────────┐
│                      WARSTWA BACKENDOWA                          │
│                    apps/api — Express.js 4                       │
│                         Port: 4000                               │
│   /users  /posts  /health  /demo-user  /seed-demo-user          │
└──────────────────────────────┬──────────────────────────────────┘
                               │ Prisma ORM
┌──────────────────────────────▼──────────────────────────────────┐
│                      WARSTWA DANYCH                              │
│              SQLite (dev) → PostgreSQL (production)              │
│                   Models: User, Post                             │
└─────────────────────────────────────────────────────────────────┘
```

## Monorepo — struktura pakietów

```
META-GENIUSZ-OS/
├── apps/              ← Deployowalne aplikacje
│   ├── web            ← Hub (Next.js)
│   ├── hhu            ← Hip Hop Universe (Next.js)
│   ├── rfg            ← Rocket Fuell Girls (Next.js)
│   ├── ai-studio      ← AI Studio (Next.js)
│   ├── admin          ← Admin Panel (Next.js)
│   └── api            ← Backend API (Express + Prisma)
├── packages/          ← Biblioteki współdzielone
│   ├── ui             ← Komponenty React/Tailwind
│   ├── ai-core        ← LOGOS — AI orchestration
│   ├── database       ← Database helpers
│   └── agents         ← AI agents framework
└── services/          ← Przyszłe mikroserwisy (zaplanowane)
```

## Przepływ danych — przykład: profil użytkownika HHU

```
1. Użytkownik wchodzi na /profile/sobieranskip95patryk
2. Next.js Server Component (SSR) wywołuje:
   fetch("http://localhost:4000/users/sobieranskip95patryk")
3. Express API odbiera request
4. Prisma.user.findUnique({ where: { username }, include: { posts } })
5. SQLite zwraca dane
6. API serializuje do JSON
7. Next.js renderuje stronę server-side
8. Klient otrzymuje gotowy HTML
```

## Przepływ danych — przykład: tworzenie posta (HHU Feed)

```
1. Użytkownik wpisuje tekst i klika "Post"
2. Client Component wywołuje:
   fetch("http://localhost:4000/posts", { method: "POST", body: JSON })
3. Express API waliduje { content, authorId }
4. Prisma.post.create({ data: { content, authorId } })
5. Zwraca nowy post z relacją author
6. Frontend odświeża listę postów
```

## Konfiguracja Turborepo

Pipeline zadań z zależnościami:
```
build → dependsOn ["^build"]  // pakiety budują się przed aplikacjami
dev   → cache: false, persistent: true
lint  → równolegle dla wszystkich pakietów
test  → równolegle dla wszystkich pakietów
```

## Zmienne środowiskowe

```bash
# .env (na podstawie .env.example)
DATABASE_URL=file:./dev.db    # Prisma connection string
PORT=4000                      # API server port
API_URL=http://localhost:4000  # Frontend → API URL
```

## Decyzje architektoniczne

| Decyzja | Wybór | Uzasadnienie |
|---------|-------|--------------|
| Monorepo | Turborepo | Szybkie buildy z cache, współdzielone pakiety |
| Package Manager | pnpm | Wydajność, workspace support |
| Frontend | Next.js 16 | App Router, SSR/SSG/RSC, ecosystem |
| Styling | Tailwind CSS 4 | Utility-first, szybki development |
| Backend | Express.js | Prosty, elastyczny, ecosystem |
| ORM | Prisma | Type-safe, migracje, multi-database |
| Database (dev) | SQLite | Zero-config, file-based |
| Language | TypeScript strict | Type safety, developer experience |
