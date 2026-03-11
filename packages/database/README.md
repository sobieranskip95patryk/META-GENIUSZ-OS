# @meta-geniusz/database — Database Utilities

Współdzielone narzędzia bazodanowe i helpery dla ekosystemu META-GENIUSZ OS.

**Status**: ⏳ Stub — gotowy do implementacji

---

## Opis

`packages/database` to centralny pakiet dostarczający współdzielony klient Prisma, helpery do zapytań, typy TypeScript i utilities bazodanowe dla wszystkich aplikacji META-GENIUSZ OS.

## Planowane funkcje

### Klient Prisma
- [ ] Współdzielony singleton `PrismaClient` — jedno połączenie dla wszystkich pakietów
- [ ] Connection pooling configuration
- [ ] Soft delete middleware
- [ ] Audit log middleware (created/updated timestamps)

### Query Helpers

```typescript
// Planowane helpery
import { db, findUser, findPosts, paginate } from "@meta-geniusz/database";

// Zamiast pisać w każdej aplikacji
const user = await db.user.findUnique({ where: { username } });

// Użyj helpera
const user = await findUser({ username });

// Paginacja
const { data, meta } = await paginate(db.post, { page: 1, perPage: 20 });
```

### Typy TypeScript
- [ ] Eksport wszystkich typów Prisma do współużycia
- [ ] Typy `CreateUser`, `UpdateUser`, `CreatePost` itp.
- [ ] Typy paginacji (`PaginatedResult<T>`, `PageMeta`)

### Migracje
- [ ] Centralne zarządzanie migracjami
- [ ] Seed scripts dla środowisk testowych
- [ ] Seed scripts dla demo danych

### Utilities
- [ ] `hashPassword(plain)` / `verifyPassword(hash, plain)`
- [ ] `generateToken(userId)` — JWT utilities
- [ ] `sanitizeUser(user)` — usuwanie pól wrażliwych z odpowiedzi

## Obsługiwane bazy danych

| Środowisko | Baza | Status |
|------------|------|--------|
| Development | SQLite | ✅ Aktywna (w `apps/api`) |
| Staging | PostgreSQL | ⏳ Planowana |
| Production | PostgreSQL | ⏳ Planowana (v1.0.0) |

## Schema (aktualna — w `apps/api`)

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

## Implementacja

Planowana w fazie **v0.3.0**. Szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
