# META-GENIUSZ OS

> **AI-Powered Creator Operating System** — jedna platforma łącząca AI Core, creator economy, społeczność, kulturę, visual branding i moduły premium.

**Wersja**: 0.1.0 | **Status**: Alpha | **Stack**: Next.js 16 · React 19 · Express 4 · Prisma 6 · TypeScript 5 · Turborepo 2.5

---

## Czym jest META-GENIUSZ OS?

META-GENIUSZ OS to wielomodułowy system operacyjny dla twórców cyfrowych, łączący:

- **AI Core / LOGOS** — warstwa orkiestracji, routingu i inteligencji systemowej
- **Hip Hop Universe (HHU)** — społecznościowa platforma kultury, muzyki i twórców
- **Rocket Fuell Girls (RFG)** — visual talent vertical dla modelek, muses i kampanii premium
- **AI Studio** — narzędzia AI do generowania bio, captions i strategii wzrostu
- **Creator Economy** — subskrypcje, monetyzacja, profile premium i collaboracje
- **Admin Control** — panel operacyjny do zarządzania, moderacji i analityki

---

## Architektura monorepo

```
META-GENIUSZ-OS/
├── apps/
│   ├── web/          @meta-geniusz/web       ← Hub platformy (Next.js, :3000)
│   ├── hhu/          @meta-geniusz/hhu        ← Hip Hop Universe (Next.js)
│   ├── rfg/          @meta-geniusz/rfg        ← Rocket Fuell Girls (Next.js)
│   ├── ai-studio/    @meta-geniusz/ai-studio  ← AI Studio (Next.js)
│   ├── admin/        admin                    ← Admin Panel (Next.js)
│   └── api/          @meta-geniusz/api        ← Backend API (Express + Prisma, :4000)
├── packages/
│   ├── ui/           @meta-geniusz/ui         ← Komponenty UI
│   ├── ai-core/      @meta-geniusz/ai-core    ← AI orchestration / LOGOS
│   ├── database/     @meta-geniusz/database   ← Database helpers
│   └── agents/       @meta-geniusz/agents     ← AI agents framework
└── docs/
    ├── vision/mission.md
    ├── architecture/system-overview.md
    ├── product/mvp.md
    └── roadmap/roadmap.md
```

---

## Szybki start

### Wymagania

- **Node.js** 18+
- **pnpm** 10.0.0+

### Instalacja

```bash
git clone https://github.com/sobieranskip95patryk/META-GENIUSZ-OS.git
cd META-GENIUSZ-OS
pnpm install
```

### Uruchomienie

```bash
# Wszystkie aplikacje równolegle
pnpm dev

# Tylko wybrana aplikacja
pnpm dev:web       # → http://localhost:3000 (Hub)
pnpm dev:hhu       # → http://localhost:3000 (HHU)
pnpm dev:api       # → http://localhost:4000 (API)
```

### Baza danych (API)

```bash
cd apps/api
npx prisma migrate dev   # Uruchom migracje
npx prisma studio        # GUI do bazy danych
```

---

## Stack technologiczny

| Warstwa | Technologia | Wersja |
|---------|-------------|--------|
| Frontend | Next.js + React | 16.1.6 / 19.2.3 |
| Styling | Tailwind CSS | 4.x |
| Backend | Express.js | 4.21.2 |
| ORM | Prisma | 6.x |
| Database (dev) | SQLite | — |
| Language | TypeScript | 5.x |
| Monorepo | Turborepo | 2.5.0 |
| Package Manager | pnpm | 10.0.0 |

---

## API — endpointy (port 4000)

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| `GET` | `/` | System info |
| `GET` | `/health` | Health check |
| `POST` | `/users` | Utwórz użytkownika |
| `GET` | `/users` | Lista użytkowników |
| `GET` | `/users/:username` | Profil z postami |
| `POST` | `/posts` | Utwórz post |
| `GET` | `/posts` | Lista postów |
| `POST` | `/demo-user` | Demo user (idempotent) |
| `GET` | `/seed-demo-user` | Seed demo danych |

---

## Skrypty

```bash
pnpm dev          # Uruchom wszystko (Turborepo)
pnpm build        # Build wszystkich paczek
pnpm lint         # ESLint dla całego monorepo
pnpm typecheck    # TypeScript check
pnpm test         # Testy (konfiguracja do uzupełnienia)
```

---

## Stan implementacji

| Moduł | Status |
|-------|--------|
| Monorepo setup | ✅ Gotowy |
| Backend API (User/Post) | ✅ Funkcjonalny |
| Web Hub | ✅ Gotowy |
| HHU Feed + Profile | ✅ Gotowy |
| RFG | 🔧 Scaffold |
| AI Studio | 🔧 Scaffold |
| Admin Panel | 🔧 Scaffold |
| Shared packages | ⏳ Stubs |
| Auth / Payments | ❌ Nie zaimplementowane |
| CI/CD | ❌ Nie skonfigurowane |

---

## Dokumentacja

- [`REPORT.md`](./REPORT.md) — Kompletny raport repozytorium (100%)
- [`docs/vision/mission.md`](./docs/vision/mission.md) — Misja i wizja
- [`docs/architecture/system-overview.md`](./docs/architecture/system-overview.md) — Architektura systemu
- [`docs/product/mvp.md`](./docs/product/mvp.md) — Specyfikacja MVP
- [`docs/roadmap/roadmap.md`](./docs/roadmap/roadmap.md) — Roadmap produktu
- [`CHANGELOG.md`](./CHANGELOG.md) — Historia zmian

---

## Wizja

META-GENIUSZ OS to master monorepo dla ekosystemu twórców cyfrowych — platforma łącząca AI, społeczność, monetyzację i infrastrukturę w jednym spójnym systemie operacyjnym gotowym na skalowanie.