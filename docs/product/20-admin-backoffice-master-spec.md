# [20] Admin & Backoffice Master Spec

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Specyfikacja centralnego panelu administracyjnego (`apps/admin`) do obsługi: user management, content moderation, analytics, billing, reports, abuse, campaigns i operational controls. Admin Panel jest wewnętrznym narzędziem — nigdy nie jest widoczny dla end users. Priorytetyzuje must-have (CRUD + moderation) od nice-to-have (analytics dashboards).

---

## Stan obecny

`apps/admin/` istnieje jako scaffold Next.js — pusta strona ze stylem. Brak jakichkolwiek features. API (`apps/api`) nie ma admin-only endpoints. Brak middleware weryfikającego rolę ADMIN/SUPER_ADMIN.

---

## Admin feature map

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL                               │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  MUST-HAVE (v0.3)                                           │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │ │
│  │  │User           │ │Content       │ │Report              │  │ │
│  │  │Management     │ │Moderation    │ │Review              │  │ │
│  │  └──────────────┘ └──────────────┘ └────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  SHOULD-HAVE (v0.5)                                         │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │ │
│  │  │Analytics      │ │System        │ │Audit               │  │ │
│  │  │Dashboard      │ │Config        │ │Log                 │  │ │
│  │  └──────────────┘ └──────────────┘ └────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  LATER (v1.0+)                                              │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │ │
│  │  │Billing        │ │Campaign      │ │Advanced            │  │ │
│  │  │Management     │ │Management    │ │Analytics           │  │ │
│  │  └──────────────┘ └──────────────┘ └────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Management

### Features (v0.3)

| Feature | Opis | Endpoint |
|---------|------|----------|
| Lista użytkowników | Tabela z filtrowaniem, paginacją, search | `GET /admin/users` |
| Szczegóły użytkownika | Pełny profil + posty + raporty + transakcje | `GET /admin/users/:id` |
| Edycja użytkownika | Zmiana roli, bio, avatar, statusu | `PATCH /admin/users/:id` |
| Ban użytkownika | Zablokowanie konta (soft) | `POST /admin/users/:id/ban` |
| Unban | Odblokowanie | `POST /admin/users/:id/unban` |
| Delete konta | Usunięcie (GDPR compliance) | `DELETE /admin/users/:id` |
| Zmiana roli | Przypisanie MODERATOR/ADMIN | `PATCH /admin/users/:id/role` |

### UI: User List View

```
┌─────────────────────────────────────────────────────────────┐
│ Users (1,234)                              [Search] [Filter]│
├──────┬──────────┬──────────┬────────┬──────────┬────────────┤
│ ID   │ Username │ Email    │ Role   │ Status   │ Actions    │
├──────┼──────────┼──────────┼────────┼──────────┼────────────┤
│ u001 │ mc_kayo  │ k@...    │ USER   │ Active   │ [View][Ban]│
│ u002 │ dj_flex  │ d@...    │CREATOR │ Active   │ [View][Ban]│
│ u003 │ spammer1 │ s@...    │ USER   │ Banned   │ [View][Unb]│
└──────┴──────────┴──────────┴────────┴──────────┴────────────┘
                                    [← Prev] Page 1/62 [Next →]
```

---

## Content Moderation

### Moderation Queue (v0.3)

| Feature | Opis |
|---------|------|
| Kolejka raportów | Lista zgłoszeń posortowana wg priorytetów |
| Preview content | Podgląd zgłoszonego posta/komentarza/profilu |
| Akcje moderacyjne | Approve / Hide / Delete / Ban author |
| Reason statement | Mandatoryjny powód decyzji (DSA compliance) |
| Bulk actions | Zaznacz wiele → mass action |

### Moderation Actions

| Akcja | Efekt | Odwracalna |
|-------|-------|------------|
| `APPROVE` | Raport odrzucony; content pozostaje | TAK |
| `HIDE` | Content ukryty (status=HIDDEN) | TAK |
| `DELETE` | Content usunięty (soft delete) | TAK (30 dni) |
| `BAN_AUTHOR` | Konto autora zbanowane | TAK |
| `ESCALATE` | Przekazanie do SUPER_ADMIN / legal | — |

### UI: Moderation Queue

```
┌─────────────────────────────────────────────────────────────┐
│ Moderation Queue (47 pending)                    [Filter▼]  │
├──────┬────────┬──────────────┬────────┬─────────────────────┤
│ ID   │ Type   │ Reason       │ Target │ Actions             │
├──────┼────────┼──────────────┼────────┼─────────────────────┤
│ r001 │ POST   │ Hate speech  │ p:1234 │ [Approve][Hide][Del]│
│ r002 │ USER   │ Spam account │ u:5678 │ [Approve][Ban]      │
│ r003 │ COMMENT│ Harassment   │ c:9012 │ [Approve][Hide][Del]│
└──────┴────────┴──────────────┴────────┴─────────────────────┘
```

---

## Analytics Views

### Dashboard (v0.5)

| Metric | Opis | Wizualizacja |
|--------|------|-------------|
| Total Users | Łączna liczba zarejestrowanych | Number + trend |
| DAU / MAU | Daily / Monthly active users | Line chart |
| New registrations | Rejestracje per dzień/tydzień | Bar chart |
| Posts created | Nowe posty per dzień | Bar chart |
| Reports pending | Otwarte raporty moderacji | Number (alert if >20) |
| Top creators | Ranking wg postów/likes/followers | Table |

### Advanced Analytics (v1.0+)

| Metric | Opis |
|--------|------|
| Retention cohorts | D1, D7, D30 retention per signup cohort |
| Revenue dashboard | MRR, ARPC, churn, LTV |
| AI usage | Credits consumed, popular generators |
| Content health | Spam rate, moderation speed, appeal rate |

---

## Billing Views (v1.0+)

| Feature | Opis |
|---------|------|
| Subscription overview | Aktywne subskrypcje, MRR |
| Transaction history | Lista transakcji z filtrem |
| Payout management | Pending payouts, approved, processed |
| Revenue per creator | Top earners, revenue trend |
| Refund management | Process refund requests |

---

## System Config (v0.5)

| Feature | Opis |
|---------|------|
| Feature flags | Toggle features on/off |
| Rate limits | Configure API rate limits |
| AI config | Model selection, credit costs |
| Maintenance mode | Enable/disable platform |

---

## Permissions (Admin-specific)

| Feature / Widok | MODERATOR | ADMIN | SUPER_ADMIN |
|----------------|-----------|-------|-------------|
| User list (read) | ✅ | ✅ | ✅ |
| User edit | ❌ | ✅ | ✅ |
| User ban/unban | ✅ | ✅ | ✅ |
| User delete | ❌ | ✅ | ✅ |
| User role change | ❌ | ❌ | ✅ |
| Moderation queue | ✅ | ✅ | ✅ |
| Moderation actions | ✅ (approve/hide/delete) | ✅ (+ escalate) | ✅ (all) |
| Analytics read | ❌ | ✅ | ✅ |
| Billing read | ❌ | ✅ | ✅ |
| Billing manage | ❌ | ❌ | ✅ |
| System config | ❌ | ❌ | ✅ |
| Audit log read | ❌ | ✅ | ✅ |

---

## Klasyfikacja (MUST-HAVE / SHOULD-HAVE / LATER)

### ADMIN MUST-HAVE (= TERAZ — v0.3)
- User management: list, view, edit, ban, unban
- Moderation queue: list reports, preview, approve/hide/delete
- Reason statements for moderation decisions (DSA)
- Role-gated access (ADMIN/SUPER_ADMIN only)
- API endpoints: `/admin/*` with role middleware

### ADMIN SHOULD-HAVE (= PÓŹNIEJ — v0.5)
- Analytics dashboard (basic metrics)
- System config (feature flags)
- Audit log viewer
- Bulk moderation actions

### ADMIN LATER (= PO v1.0)
- Billing management (subscriptions, payouts, refunds)
- Campaign management (promotions, featured creators)
- Advanced analytics (cohorts, LTV, churn)
- A/B test configuration
- Automated moderation rules editor

---

## Rekomendacja implementacyjna

1. **v0.3**: Zbudować admin jako Next.js app z Server Components; dane z API endpoints `/admin/*`
2. **Auth**: admin access = sprawdzenie `systemRole ∈ {ADMIN, SUPER_ADMIN}` w JWT middleware
3. **UI**: Użyć Tailwind CSS + minimalne tabele; bez gotowego admin framework (overkill na ten etap)
4. **API routes**: namespace `/admin/*` z `requireRole('ADMIN')` middleware na wszystkich
5. **Nie robimy**: oddzielnego API dla admina — te same Express routes, inny middleware

---

## Ryzyka

| # | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|--------|-------------------|-------|-----------|
| R1 | Admin panel budowany za późno → brak moderacji przy launch | ŚREDNIE | WYSOKI | Admin v0.3 jako hard requirement przed public beta |
| R2 | Permission bypass — user uzyskuje admin access | NISKIE | KRYTYCZNY | Role middleware na każdym admin endpoint; test coverage |
| R3 | Over-engineering admin → opóźnia MVP | ŚREDNIE | ŚREDNI | Strict v0.3 scope: tylko user CRUD + moderation queue |

---

## Founder Decision Notes

- [ ] **FDN-53**: Zatwierdzić zakres Admin v0.3: User CRUD + Moderation Queue + Reports
- [ ] **FDN-54**: Potwierdzić pominięcie gotowych admin frameworks (AdminJS, Retool) na rzecz custom
- [ ] **FDN-55**: Określić policy: moderator może banować bezpośrednio, czy escalation required?

---

## Dokumenty zależne

- ← [18] Identity & Roles Architecture (permissions per role)
- ← [19] Master Domain Model (entities managed by admin)
- → [27] Content Policy Architecture (moderation rules)
- → [29] Incident Response Framework (escalation z admin)
- → [25] Evidence & Audit Trail Framework (audit log w admin)
