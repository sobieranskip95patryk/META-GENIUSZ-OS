# [18] Identity & Roles Architecture

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Projekt systemu kont, uprawnień i ról w ekosystemie META-GENIUSZ OS. Jedno konto = dostęp do wszystkich verticalów (HHU, RFG, AI Studio). Role różnią się per vertical i per kontekst (twórca, fan, admin, moderator). Dokument definiuje model tożsamości, matrycę ról, system uprawnień, cross-platform identity i poziomy weryfikacji.

---

## Stan obecny

Model `User` w Prisma ma pola: `id`, `username`, `bio`, `createdAt`. Brak pól: `email`, `password`, `role`, `verified`, `avatar`. Brak systemu ról — każdy user ma te same uprawnienia. Brak autentykacji.

---

## Account Model

### Zasada: One Identity, Multiple Roles

```
┌─────────────────────────────────────────────────────────┐
│                    USER ACCOUNT                          │
│  id, email, username, password_hash, avatar              │
│  created_at, updated_at, verified_at                     │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │              GLOBAL ROLES                          │   │
│  │  system_role: USER | MODERATOR | ADMIN | SUPER    │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐   │
│  │  HHU Profile│ │ RFG Profile  │ │AI Studio Profile│   │
│  │  role: FAN  │ │ role: CREATOR│ │ role: CREATOR   │   │
│  │  or CREATOR │ │ or AGENCY    │ │                 │   │
│  └─────────────┘ └──────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

Jeden User ma:
- **1 konto globalne** (email + password)
- **1 system role** (USER/MODERATOR/ADMIN/SUPER_ADMIN)
- **N vertical profiles** (HHU, RFG, AI Studio — tworzonych opcjonalnie)
- **N vertical roles** (per vertical: fan, creator, agency, etc.)

---

## Role Matrix

### Role globalne (system-wide)

| Rola | Opis | Kto | Ilość |
|------|------|-----|-------|
| `USER` | Standardowy użytkownik; dostęp do verticalów | Każdy rejestrujący się | ~95% users |
| `MODERATOR` | Przegląd raportów; decyzje moderacyjne | Wyznaczeni przez Admina | ~1-5 osób |
| `ADMIN` | Zarządzanie użytkownikami, treścią, konfiguracją | Zespół ops | ~1-3 osoby |
| `SUPER_ADMIN` | Pełny dostęp; zarządzanie rolami; billing config | Founder | 1 osoba |

### Role vertical: HHU

| Rola | Opis | Uprawnienia specyficzne |
|------|------|------------------------|
| `HHU_FAN` | Konsument treści hip-hop | Przeglądanie, like, komentarz, follow |
| `HHU_CREATOR` | Twórca contentu hip-hop | Wszystko co FAN + tworzenie postów, profil creator, analytics |
| `HHU_VERIFIED_CREATOR` | Zweryfikowany twórca | Wszystko co CREATOR + badge, priority w discovery |

### Role vertical: RFG

| Rola | Opis | Uprawnienia specyficzne |
|------|------|------------------------|
| `RFG_VIEWER` | Przeglądający portfolio/galerię | Przeglądanie, like |
| `RFG_CREATOR` | Twórczyni / modelka | Upload portfolio, profil, aplikowanie |
| `RFG_AGENCY` | Agencja modelek | Zarządzanie wieloma profilami, castingi |
| `RFG_VERIFIED` | Zweryfikowana tożsamość | Badge, trust level, safety verification |

### Role vertical: AI Studio

| Rola | Opis | Uprawnienia specyficzne |
|------|------|------------------------|
| `AI_FREE` | User z darmowym tier | 10 credits/miesiąc, basic tools |
| `AI_PRO` | Płatny subscriber | Unlimited credits, all tools, priority |
| `AI_BUILDER` | Twórca workflow | Tworzenie i sprzedaż workflows |

---

## Permission Model

### Permission structure

```
permission = resource:action

Przykłady:
  post:create          → tworzenie postów
  post:delete:own      → usunięcie własnego posta
  post:delete:any      → usunięcie dowolnego posta (admin/mod)
  user:ban             → banowanie użytkownika
  report:review        → przegląd raportów
  billing:manage       → zarządzanie płatnościami
  ai:generate          → wywołanie AI generacji
  admin:access         → dostęp do admin panelu
```

### Permission matrix (role → permissions)

| Permission | USER | MODERATOR | ADMIN | SUPER_ADMIN |
|-----------|------|-----------|-------|-------------|
| `post:create` | ✅ | ✅ | ✅ | ✅ |
| `post:edit:own` | ✅ | ✅ | ✅ | ✅ |
| `post:delete:own` | ✅ | ✅ | ✅ | ✅ |
| `post:delete:any` | ❌ | ✅ | ✅ | ✅ |
| `user:view` | ✅ (public) | ✅ (all) | ✅ (all) | ✅ (all) |
| `user:edit:own` | ✅ | ✅ | ✅ | ✅ |
| `user:ban` | ❌ | ✅ | ✅ | ✅ |
| `user:delete` | ❌ | ❌ | ✅ | ✅ |
| `user:role:assign` | ❌ | ❌ | ✅ | ✅ |
| `report:create` | ✅ | ✅ | ✅ | ✅ |
| `report:review` | ❌ | ✅ | ✅ | ✅ |
| `admin:access` | ❌ | ❌ | ✅ | ✅ |
| `admin:config` | ❌ | ❌ | ❌ | ✅ |
| `billing:manage` | ❌ | ❌ | ❌ | ✅ |
| `ai:generate` | ✅ (limit) | ✅ | ✅ | ✅ |

---

## Cross-platform identity

### Single Sign-On flow

```
1. User rejestruje się na meta-geniusz.com (apps/web)
2. Otrzymuje global account (email + password)
3. Loguje się → JWT token z { userId, systemRole }
4. Wchodzi na hhu.meta-geniusz.com → token ważny (shared cookie domain)
5. HHU automatycznie tworzy HHU profile (rola: HHU_FAN)
6. User upgradeuje do HHU_CREATOR (post first content)
7. Wchodzi na rfg.meta-geniusz.com → nowy RFG profile tworzony automatycznie
```

### Token structure

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "username": "creator123",
  "systemRole": "USER",
  "verticalRoles": {
    "hhu": "HHU_CREATOR",
    "rfg": null,
    "aiStudio": "AI_FREE"
  },
  "verified": false,
  "iat": 1710000000,
  "exp": 1710086400
}
```

---

## Verification Levels

| Level | Nazwa | Wymaga | Daje | Vertical |
|-------|-------|--------|------|----------|
| L0 | **Unverified** | Email + password | Podstawowe features | Wszystkie |
| L1 | **Email Verified** | Email confirmation link | Posting, commenting, AI credits | Wszystkie |
| L2 | **Phone Verified** | SMS code | Tipping, basic monetization | HHU, AI Studio |
| L3 | **Identity Verified** | ID document + selfie | Payouts, agency features, badge | RFG, Monetization |

### Progressive verification

```
Registration → L0 → [email confirm] → L1 → [wants to tip/earn] → L2 → [wants payouts] → L3
```

Nie wymuszamy weryfikacji na starcie — podnosimy requirement gdy user chce robić coś wymagającego trust.

---

## Klasyfikacja ról (GLOBALNE / MODUŁOWE / PRZYSZŁE)

### ROLE GLOBALNE (= TERAZ — v0.2)
- `USER`, `MODERATOR`, `ADMIN`, `SUPER_ADMIN`
- Email + password registration
- JWT token z system role
- L0 i L1 verification

### ROLE MODUŁOWE (= PÓŹNIEJ — v0.3–v0.5)
- HHU: `HHU_FAN`, `HHU_CREATOR`, `HHU_VERIFIED_CREATOR`
- RFG: `RFG_VIEWER`, `RFG_CREATOR`, `RFG_AGENCY`, `RFG_VERIFIED`
- AI Studio: `AI_FREE`, `AI_PRO`, `AI_BUILDER`
- L2 verification (phone)

### ROLE PRZYSZŁE (= PO v1.0)
- `PARTNER_BRAND` (marki/labele z dostępem do kampanii)
- `PARTNER_LABEL` (labele muzyczne z multi-artist management)
- `API_CONSUMER` (external apps via SDK)
- L3 verification (identity document)

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Role confusion — user nie rozumie co może robić | ŚREDNIE | ŚREDNI | Clear UI: „Upgrade to Creator" CTA; progressive disclosure |
| R2 | Permission escalation — bug pozwala USER na admin actions | NISKIE | KRYTYCZNY | Middleware role check na każdym endpoint; unit tests |
| R3 | Cross-vertical identity leak — RFG safety data visible in HHU | NISKIE | WYSOKI | Vertical profile isolation; shared only: username, avatar |
| R4 | Over-engineering roles przed potrzebą | WYSOKIE | ŚREDNI | Start z 4 global roles only; add vertical roles gdy vertical ships |

---

## Founder Decision Notes

- [ ] **FDN-47**: Zatwierdzić auth approach: JWT custom vs better-auth vs NextAuth
- [ ] **FDN-48**: Zatwierdzić progressive verification (L0→L3) vs mandatory email verify on signup
- [ ] **FDN-49**: Zatwierdzić token structure (systemRole + verticalRoles w JWT)

---

## Dokumenty zależne

- ← [03] Canonical Terminology Dictionary (nazwy ról)
- ← [15] System Architecture v1.0 (auth w warstwie L3)
- ← [17] Shared Services Blueprint (packages/auth spec)
- → [19] Master Domain Model (User, Role, Permission entities)
- → [20] Admin & Backoffice Master Spec (admin permission requirements)
- → [28] Verification Feasibility Framework (levels L0-L3 details)
