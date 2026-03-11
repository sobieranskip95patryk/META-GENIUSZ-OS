# @meta-geniusz/api — Backend API

Centralny backend META-GENIUSZ OS oparty na Express.js z bazą danych SQLite/Prisma.

**Framework**: Express.js 4.21.2 | **Port**: 4000 | **Database**: SQLite + Prisma ORM | **Status**: ✅ Funkcjonalny

---

## Opis

`apps/api` to backend serwujący dane dla wszystkich aplikacji frontendowych META-GENIUSZ OS. Obsługuje użytkowników, posty i demo dane. Zbudowany w TypeScript z Prisma jako ORM.

## Uruchomienie

```bash
# Instalacja zależności (z root)
pnpm install

# Inicjalizacja bazy danych
cd apps/api
npx prisma migrate dev

# Uruchomienie deweloperskie (hot-reload)
pnpm dev    # → http://localhost:4000

# Build produkcyjny
pnpm build
pnpm start
```

## Endpointy API

### System

| Metoda | Ścieżka | Opis | Odpowiedź |
|--------|---------|------|-----------|
| `GET` | `/` | System info | `{ system, status }` |
| `GET` | `/health` | Health check | `{ ok: true }` |

### Użytkownicy

| Metoda | Ścieżka | Body | Opis |
|--------|---------|------|------|
| `POST` | `/users` | `{ username, bio? }` | Utwórz użytkownika |
| `GET` | `/users` | — | Lista wszystkich użytkowników |
| `GET` | `/users/:username` | — | Profil użytkownika z postami |

### Posty

| Metoda | Ścieżka | Body | Opis |
|--------|---------|------|------|
| `POST` | `/posts` | `{ content, authorId }` | Utwórz post |
| `GET` | `/posts` | — | Lista postów (z autorami) |

### Demo

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| `POST` | `/demo-user` | Utwórz lub pobierz demo usera `demo_hhu` |
| `GET` | `/seed-demo-user` | Seed demo usera `demo_hhu` |

## Modele danych (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  bio       String?
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        String   @id @default(uuid())
  content   String
  image     String?
  createdAt DateTime @default(now())
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
```

## Konfiguracja środowiskowa

```env
DATABASE_URL=file:./prisma/dev.db
PORT=4000
```

## Obsługa błędów

| Kod | Opis |
|-----|------|
| `400` | Brakujące lub nieprawidłowe pola wejściowe |
| `404` | Zasób nie znaleziony (np. użytkownik) |
| `500` | Błąd serwera — odpowiedź zawiera pole `details` |

## Stack

- **Express.js** 4.21.2
- **Prisma ORM** 6.x + `@prisma/client` 6.16.0
- **SQLite** (dev) — migracja do PostgreSQL planowana w v1.0.0
- **TypeScript** 5.x
- **cors** 2.8.5
- **dotenv** 16.6.1
- **tsx** 4.21.0 (dev hot-reload)

## Migracje

```bash
npx prisma migrate dev    # Uruchom migracje
npx prisma studio         # GUI bazy danych (localhost:5555)
npx prisma generate       # Regeneruj klienta Prisma
```

Migracje: `prisma/migrations/20260309004601_init/` — inicjalna migracja tabel User i Post.
