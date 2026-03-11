# [19] Master Domain Model

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Centralny model danych całego systemu META-GENIUSZ OS opisujący wszystkie główne encje i relacje: User, Profile, Post, Comment, Like, Follow, Transaction, Report, AIGeneration, Subscription i inne. Rozdziela encje na core (współdzielone), modułowe (per vertical) i przyszłe (later-phase). Stanowi blueprint dla schematu Prisma.

---

## Stan obecny

Aktualny schemat Prisma (`apps/api/prisma/schema.prisma`):
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  bio       String?
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  content   String
  image     String?
  createdAt DateTime @default(now())
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

**Braki**: email, password, role, avatar, comments, likes, follows, transactions, reports, AI generations, subscriptions — nic poza User i Post.

---

## Pełny domain model

### Entity Relationship Diagram (tekstowy)

```
┌──────────────────────────────────────────────────────────────────┐
│                         CORE ENTITIES                             │
│                                                                    │
│  ┌──────────┐   1:N   ┌────────────┐   1:N   ┌───────────────┐  │
│  │   User   │────────→│  Profile    │────────→│    Post       │  │
│  │(account) │         │(per vert.) │         │  (content)    │  │
│  └──────────┘         └────────────┘         └───────────────┘  │
│       │                     │                      │     │       │
│       │ 1:N                 │                1:N   │     │ 1:N   │
│       ▼                     │                      ▼     ▼       │
│  ┌──────────┐               │               ┌─────────┐ ┌────┐  │
│  │ Session  │               │               │Comment  │ │Like│  │
│  └──────────┘               │               └─────────┘ └────┘  │
│       │                     │                                    │
│       │                     │    N:N                              │
│       │                     │   ┌──────────┐                     │
│       │                     └──→│  Follow  │                     │
│       │                         └──────────┘                     │
│       │                                                           │
│  ┌────▼─────┐  1:N  ┌────────────┐  1:N  ┌──────────────────┐  │
│  │  Report  │───────→│  Moderation│───────→│ModerrationAction│  │
│  │          │        │  Case      │        │                  │  │
│  └──────────┘        └────────────┘        └──────────────────┘  │
│                                                                    │
│  ┌──────────────┐  1:N  ┌────────────────┐                       │
│  │ Transaction  │───────→│ AIGeneration   │                       │
│  │ (billing)    │        │ (AI credits)   │                       │
│  └──────────────┘        └────────────────┘                       │
│                                                                    │
│  ┌──────────────┐                                                 │
│  │ Subscription │                                                 │
│  │ (recurring)  │                                                 │
│  └──────────────┘                                                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## Encje Core (współdzielone)

### User — Konto globalne

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | Primary key | v0.1 (zmiana z Int) |
| `email` | String (unique) | Adres email | v0.2 |
| `username` | String (unique) | Public handle | v0.1 |
| `passwordHash` | String | Bcrypt hash | v0.2 |
| `bio` | String? | Krótki opis | v0.1 |
| `avatarUrl` | String? | URL avatar | v0.2 |
| `systemRole` | Enum (USER/MODERATOR/ADMIN/SUPER_ADMIN) | Rola systemowa | v0.2 |
| `emailVerified` | Boolean | Email confirmed | v0.2 |
| `phoneVerified` | Boolean | Phone confirmed | v0.5 |
| `identityVerified` | Boolean | ID document confirmed | v1.0 |
| `createdAt` | DateTime | Registration timestamp | v0.1 |
| `updatedAt` | DateTime | Last update | v0.2 |
| `deletedAt` | DateTime? | Soft delete | v0.3 |

**Relacje**: `profiles[]`, `posts[]`, `comments[]`, `likes[]`, `sessions[]`, `following[]`, `followers[]`, `reports[]`, `transactions[]`, `subscriptions[]`

### Session — Sesja auth

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.2 |
| `userId` | UUID | FK → User | v0.2 |
| `token` | String | JWT / session token | v0.2 |
| `expiresAt` | DateTime | Token expiry | v0.2 |
| `ipAddress` | String? | IP for audit | v0.2 |
| `userAgent` | String? | Browser info | v0.2 |
| `createdAt` | DateTime | Session start | v0.2 |

### Profile — Profil per vertical

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.3 |
| `userId` | UUID | FK → User | v0.3 |
| `vertical` | Enum (HHU/RFG/AI_STUDIO) | Który vertical | v0.3 |
| `verticalRole` | String | Rola w verticalu | v0.3 |
| `displayName` | String? | Custom display name | v0.3 |
| `metadata` | JSON? | Vertical-specific data | v0.3 |
| `createdAt` | DateTime | Profile creation | v0.3 |

### Post — Treść (uniwersalna)

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK (zmiana z Int) | v0.1 |
| `content` | String | Tekst posta | v0.1 |
| `imageUrl` | String? | Opcjonalny obraz | v0.1 |
| `authorId` | UUID | FK → User | v0.1 |
| `vertical` | Enum (HHU/RFG/AI_STUDIO) | Vertical origin | v0.3 |
| `type` | Enum (TEXT/IMAGE/AUDIO/VIDEO) | Content type | v0.3 |
| `status` | Enum (ACTIVE/HIDDEN/DELETED) | Moderation status | v0.3 |
| `likesCount` | Int | Denormalized counter | v0.2 |
| `commentsCount` | Int | Denormalized counter | v0.2 |
| `createdAt` | DateTime | Post creation | v0.1 |
| `updatedAt` | DateTime | Last edit | v0.2 |

**Relacje**: `author` (User), `comments[]`, `likes[]`, `reports[]`

### Comment — Komentarz

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.2 |
| `content` | String | Tekst komentarza | v0.2 |
| `authorId` | UUID | FK → User | v0.2 |
| `postId` | UUID | FK → Post | v0.2 |
| `parentId` | UUID? | FK → Comment (nested replies) | v0.5 |
| `status` | Enum (ACTIVE/HIDDEN/DELETED) | Moderation status | v0.3 |
| `createdAt` | DateTime | | v0.2 |

### Like — Polubienie

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.2 |
| `userId` | UUID | FK → User | v0.2 |
| `postId` | UUID | FK → Post | v0.2 |
| `createdAt` | DateTime | | v0.2 |

**Unique constraint**: `(userId, postId)` — jeden like per user per post

### Follow — Obserwowanie

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.3 |
| `followerId` | UUID | FK → User (who follows) | v0.3 |
| `followingId` | UUID | FK → User (who is followed) | v0.3 |
| `createdAt` | DateTime | | v0.3 |

**Unique constraint**: `(followerId, followingId)`

---

## Encje modułowe

### Report — Zgłoszenie treści/użytkownika

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.3 |
| `reporterId` | UUID | FK → User | v0.3 |
| `targetType` | Enum (POST/COMMENT/USER) | Co jest zgłaszane | v0.3 |
| `targetId` | UUID | ID zgłaszanego obiektu | v0.3 |
| `reason` | Enum (SPAM/HATE/NSFW/ILLEGAL/OTHER) | Powód | v0.3 |
| `description` | String? | Dodatkowy opis | v0.3 |
| `status` | Enum (PENDING/REVIEWED/RESOLVED/DISMISSED) | Status | v0.3 |
| `reviewedBy` | UUID? | FK → User (moderator) | v0.3 |
| `createdAt` | DateTime | | v0.3 |
| `resolvedAt` | DateTime? | | v0.3 |

### AIGeneration — Wywołanie AI

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.5 |
| `userId` | UUID | FK → User | v0.5 |
| `type` | String | bio, caption, image_prompt, workflow | v0.5 |
| `input` | JSON | Dane wejściowe | v0.5 |
| `output` | String | Wygenerowany content | v0.5 |
| `model` | String | gpt-4, claude-3, etc. | v0.5 |
| `creditsUsed` | Int | Zużyte credits | v0.5 |
| `createdAt` | DateTime | | v0.5 |

### Transaction — Transakcja finansowa

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.5 |
| `fromUserId` | UUID? | FK → User (payer) | v0.5 |
| `toUserId` | UUID | FK → User (recipient) | v0.5 |
| `amount` | Decimal | Kwota w PLN | v0.5 |
| `currency` | String | PLN / USD / EUR | v0.5 |
| `type` | Enum (TIP/SUBSCRIPTION/AI_CREDIT/PAYOUT) | Typ transakcji | v0.5 |
| `status` | Enum (PENDING/COMPLETED/FAILED/REFUNDED) | Status | v0.5 |
| `stripeId` | String? | Stripe payment intent ID | v0.5 |
| `createdAt` | DateTime | | v0.5 |

### Subscription — Subskrypcja

| Pole | Typ | Opis | Faza |
|------|-----|------|------|
| `id` | UUID | PK | v0.5 |
| `subscriberId` | UUID | FK → User (fan) | v0.5 |
| `creatorId` | UUID | FK → User (creator) | v0.5 |
| `plan` | Enum (BASIC/PREMIUM/VIP) | Tier | v0.5 |
| `priceMonthly` | Decimal | PLN/month | v0.5 |
| `status` | Enum (ACTIVE/CANCELLED/EXPIRED) | Status | v0.5 |
| `stripeSubId` | String? | Stripe subscription ID | v0.5 |
| `startedAt` | DateTime | | v0.5 |
| `endsAt` | DateTime? | | v0.5 |

---

## Encje przyszłe (later-phase)

| Encja | Opis | Faza |
|-------|------|------|
| `Notification` | In-app + push notifications | v0.5 |
| `Message` | DM between users | v1.0 |
| `Portfolio` | RFG portfolio album | v1.0 |
| `PortfolioImage` | Image in portfolio | v1.0 |
| `Casting` | RFG casting/offer | v1.0 |
| `Workflow` | AI Studio saved workflow | v1.0 |
| `WorkflowTemplate` | Marketplace workflow template | v2.0 |
| `AuditLog` | System-wide audit trail | v0.5 |
| `FeatureFlag` | Feature flag config | v0.3 |
| `CreditBalance` | AI credit balance per user | v0.5 |

---

## Shared objects (cross-vertical)

Obiekty współdzielone przez wszystkie verticale:

| Object | Używany przez | Typ |
|--------|---------------|-----|
| User | Wszystkie | Core |
| Session | Auth | Core |
| Post | HHU, RFG (galeria), AI Studio (showcase) | Core |
| Like | HHU, RFG | Core |
| Comment | HHU, RFG | Core |
| Follow | HHU, RFG | Core |
| Report | HHU, RFG, AI Studio | Core |
| Transaction | Billing (all) | Modular |
| Subscription | HHU Premium, RFG Premium | Modular |
| AIGeneration | AI Studio, HHU (bio gen) | Modular |

---

## Lifecycle danych

| Encja | Retention | Usuwanie | Uwagi |
|-------|-----------|----------|-------|
| User | Do usunięcia konta | Soft delete (30 dni grace) → hard delete | GDPR right to erasure |
| Post | Do usunięcia przez autora/mod | Soft delete (status=DELETED) | Legal hold exceptions |
| Comment | Do usunięcia | Soft delete | |
| Session | 30 dni | Auto-expire | |
| Report | 2 lata po resolution | Archive → delete | DSA audit trail |
| Transaction | 7 lat | Archive (financial records) | Obowiązek podatkowy |
| AIGeneration | 90 dni | Auto-delete | Chyba że user saves |

---

## Klasyfikacja encji (CORE / MODUŁOWE / PÓŹNIEJSZE)

### ENCJE CORE (= TERAZ — v0.2)
- `User` (rozszerzony o email, password, role, avatar)
- `Session` (nowy)
- `Post` (rozszerzony o type, status, counters)
- `Like` (nowy)
- `Comment` (nowy)

### ENCJE MODUŁOWE (= PÓŹNIEJ — v0.3–v0.5)
- `Follow` (v0.3)
- `Profile` (per-vertical profiles, v0.3)
- `Report` (v0.3)
- `AIGeneration` (v0.5)
- `Transaction` (v0.5)
- `Subscription` (v0.5)
- `AuditLog` (v0.5)

### ENCJE PÓŹNIEJSZE (= PO v1.0)
- `Message`, `Portfolio`, `PortfolioImage`, `Casting`
- `Workflow`, `WorkflowTemplate`
- `CreditBalance`

---

## Ryzyka danych

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Zmiana PK z Int na UUID wymaga migracji istniejących danych | PEWNE | ŚREDNI | Migracja w v0.2; niewielkie dane (demo only) |
| R2 | Denormalizacja (likesCount, commentsCount) rozjeżdża się | ŚREDNIE | NISKI | Trigger na DB lub periodic reconciliation job |
| R3 | Soft delete + GDPR = dane nie usunięte naprawdę | ŚREDNIE | WYSOKI | Hard delete po grace period; audit log |
| R4 | Schema migration na produkcji z downtime | NISKIE | WYSOKI | Prisma migrate w maintenance window; zero-downtime planned |

---

## Founder Decision Notes

- [ ] **FDN-50**: Zatwierdzić zmianę PK z `Int @default(autoincrement())` na `UUID @default(uuid())`
- [ ] **FDN-51**: Zatwierdzić soft delete pattern (deletedAt + 30-day grace)
- [ ] **FDN-52**: Zatwierdzić denormalizację counters (likesCount, commentsCount) na Post

---

## Dokumenty zależne

- ← [05] Module Dependency Graph (encje per moduł)
- ← [15] System Architecture v1.0 (data layer)
- ← [18] Identity & Roles Architecture (User + Role model)
- → [20] Admin & Backoffice Master Spec (admin CRUD na encjach)
- → [22] GDPR Data Processing Map (data categories z tego modelu)
- → [26] Retention & Deletion Policy (lifecycle danych)
- → `apps/api/prisma/schema.prisma` (implementacja tego modelu)
