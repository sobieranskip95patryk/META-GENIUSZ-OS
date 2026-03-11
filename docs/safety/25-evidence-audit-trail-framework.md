# 25 — Evidence & Audit Trail Framework

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS / TRUST & SAFETY |
| **Cel decyzji** | Zbudować system audytowalności zdarzeń i spraw wrażliwych |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 06 (Risk Register), 21 (Legal Backbone) |
| **Zależności wyjściowe** | → 29 (Incident Response), 30 (Compliance Matrix) |

---

## Executive Summary

Platforma obsługująca UGC, monetyzację i funkcje społecznościowe musi logować, zabezpieczać i śledzić działania użytkowników, moderatorów i systemu w sprawach wrażliwych. Ten dokument definiuje **obiekty audytu**, zasady logowania, przepływy dowodów, reguły zachowania, kontrolę dostępu i implikacje legal hold. Framework pokrywa wymagania DSA (Art. 16-17 — archiwizacja decyzji), GDPR (Art. 30 — rejestr przetwarzania) i wewnętrzne potrzeby Trust & Safety.

---

## Stan obecny

| Element | Status |
|---------|--------|
| AuditLog entity | ❌ Brak (doc 19 przewiduje w v0.3) |
| Logowanie akcji moderacyjnych | 🟡 Zaprojektowane w doc 20 (ModerationAction), niezaimplementowane |
| Logowanie akcji admin | ❌ Brak |
| Logowanie auth events | ❌ Brak |
| Logowanie zmian danych użytkownika | ❌ Brak |
| Evidence preservation | ❌ Brak |
| Legal hold | ❌ Brak |
| Tamper-proof logging | ❌ Brak |

---

## Obiekty audytu (Audit Objects)

### NIEZBĘDNE LOGI (v0.2–v0.3)

| Obiekt | Zdarzenia | Aktor | Priorytet |
|--------|-----------|-------|-----------|
| **Auth** | register, login, logout, password_change, password_reset | User / System | P0 |
| **Session** | create, expire, revoke | System | P0 |
| **Moderation** | report_create, action_approve, action_hide, action_delete, action_ban, action_escalate | User / Moderator | P0 |
| **Appeal** | appeal_create, appeal_review, appeal_uphold, appeal_reverse | User / Moderator | P0 |
| **User Management** | user_ban, user_unban, user_delete, role_change | Admin / Super_Admin | P0 |
| **Content** | post_create, post_edit, post_delete, comment_delete | User / Moderator | P1 |
| **Account** | profile_edit, email_change, verification_request, verification_complete | User / System | P1 |

### PRZYDATNE LOGI (v0.4–v0.7)

| Obiekt | Zdarzenia | Aktor | Priorytet |
|--------|-----------|-------|-----------|
| **Billing** | subscription_create, payment_success, payment_fail, refund, payout_request | User / System / Stripe | P1 |
| **AI** | generation_request, generation_complete, generation_flagged | User / System | P2 |
| **Admin Config** | feature_flag_toggle, system_config_change | Super_Admin | P1 |
| **Verification (L3)** | id_upload, selfie_upload, verification_approved, verification_rejected | User / System | P1 |

### ZBĘDNE LOGI (nie logować)

| Obiekt | Uzasadnienie |
|--------|-------------|
| Page views / navigation | Dane analityczne, nie audytowe → analytics |
| Feed impressions | Nie wrażliwe, zbyt dużo danych |
| Read-only API calls | Brak mutacji, brak wartości audytowej |
| Draft saves (autosave) | Śmieci, zbyt częste |

---

## Zasady logowania (Logging Principles)

### Struktura wpisu audytowego

```
AuditLog {
  id          UUID
  timestamp   DateTime (UTC, millisecond precision)
  actorId     UUID? → User (null for system events)
  actorRole   ENUM(USER, MODERATOR, ADMIN, SUPER_ADMIN, SYSTEM)
  action      STRING (e.g., "moderation.action_hide")
  targetType  STRING (e.g., "Post", "User", "Report")
  targetId    UUID
  metadata    JSON (context-specific details)
  ip          STRING? (hashed after 90 days)
  userAgent   STRING? (hashed after 90 days)
  result      ENUM(SUCCESS, FAILURE, DENIED)
}
```

### Zasady

| Zasada | Opis |
|--------|------|
| **Append-only** | Wpisy audytowe nigdy nie są edytowane ani usuwane (wyjątek: legal obligation) |
| **Automatyczne** | Logowanie dzieje się automatycznie (middleware), nie ręcznie w kodzie biznesowym |
| **Kompletne** | Każda mutacja wrażliwego obiektu → wpis |
| **Minimalne metadata** | Logować co się zmieniło, nie pełny snapshot (diff, nie dump) |
| **UTC timestamps** | Zawsze UTC z precyzją milisekundową |
| **Actor identification** | Zawsze identyfikować kto wykonał akcję (userId lub SYSTEM) |
| **IP hashing** | Raw IP przechowywać max 90 dni, potem hash (GDPR minimalizacja) |

---

## Przepływy dowodów (Evidence Flows)

### Flow 1: Moderacja treści (DSA Art. 16-17)

```
Report(PENDING)
  → Moderator reviews
  → ModerationAction created with reason (Art. 17)
  → AuditLog: moderation.action_[type]
  → Evidence snapshot:
    - Original content (post/comment body at time of decision)
    - Report details
    - Moderator decision + reason
    - Timestamps (report, review, action)
  → Retained: 2 years (DSA)
```

### Flow 2: Odwołanie (DSA Art. 20)

```
ModerationAction exists
  → User files Appeal
  → AuditLog: appeal.appeal_create
  → Different Moderator reviews
  → Appeal decision (UPHOLD / REVERSE / MODIFY)
  → AuditLog: appeal.appeal_review
  → Evidence snapshot:
    - Original ModerationAction + reason
    - Appeal reason
    - Review decision + reason
    - Timestamps
  → Retained: 2 years
```

### Flow 3: Incydent bezpieczeństwa

```
Incident detected (system / user report / external)
  → AuditLog: incident.create
  → Evidence collection:
    - All AuditLog entries for affected users/content (time window)
    - Session logs
    - IP / user-agent data (raw, before hashing)
  → Legal hold activated (jeśli wymagane)
  → Retained: until resolution + 2 years
```

### Flow 4: Usunięcie konta (GDPR Art. 17)

```
User requests account deletion
  → AuditLog: account.delete_request
  → 30-day grace period (soft delete)
  → System checks:
    - Pending reports involving user? → retain evidence
    - Pending transactions? → retain billing data (7 years)
    - Legal hold? → block deletion
  → Hard delete user data (except retained evidence)
  → AuditLog: account.delete_complete
  → Anonymize AuditLog entries: actorId → "DELETED_USER_[hash]"
```

---

## Reguły zachowania (Preservation Rules)

| Kategoria | Okres zachowania | Podstawa |
|-----------|-----------------|----------|
| Auth events | 1 rok | Bezpieczeństwo (uzasadniony interes) |
| Moderation actions + evidence | 2 lata od resolution | DSA Art. 16 + wewnętrzny audit |
| Appeals + evidence | 2 lata od resolution | DSA Art. 20 |
| User management actions | 2 lata | Wewnętrzny audit |
| Billing / transaction logs | 7 lat | Obowiązek podatkowy (ordynacja podatkowa) |
| AI generation logs | 90 dni (lub user save) | Umowa |
| IP / user-agent (raw) | 90 dni → hash | GDPR minimalizacja |
| Security incidents | Resolution + 2 lata | Legal + wewnętrzny |

### Legal Hold

| Trigger | Efekt | Kto aktywuje |
|---------|-------|-------------|
| Postępowanie prawne (otrzymanie pozwu) | Wstrzymanie deletion dla powiązanych danych | SUPER_ADMIN / Legal |
| Śledztwo organów ścigania | Zabezpieczenie dowodów + freeze period | SUPER_ADMIN / Legal |
| Wewnętrzne śledztwo (fraud) | Wstrzymanie auto-deletion | ADMIN / T&S Team |

Implementacja legal hold:
```
LegalHold {
  id          UUID
  createdBy   UUID → User (SUPER_ADMIN)
  targetType  STRING (User / Post / Report)
  targetId    UUID
  reason      TEXT
  status      ENUM(ACTIVE, RELEASED)
  createdAt   DateTime
  releasedAt  DateTime?
}
```

Gdy LegalHold(ACTIVE) istnieje → blokuj hard-delete, hash ORAZ anonimizację dla powiązanych AuditLog i danych powiązanych. Dotyczy również Art. 17 GDPR — obowiązek prawny (Art. 17(3)(e)) nadpisuje prawo do usunięcia.

---

## Kontrola dostępu

| Rola | Uprawnienia audytowe |
|------|---------------------|
| USER | Brak dostępu do audit log |
| MODERATOR | Odczyt logów moderacyjnych powiązanych z własnymi decyzjami |
| ADMIN | Odczyt wszystkich logów moderacyjnych + user management |
| SUPER_ADMIN | Pełny dostęp + legal hold + eksport |
| SYSTEM | Zapis (automatyczny), brak odczytu |

### Endpoint access control

| Endpoint | Metoda | Rola min. |
|----------|--------|-----------|
| /admin/audit-log | GET (with filters) | ADMIN |
| /admin/audit-log/export | POST | SUPER_ADMIN |
| /admin/legal-hold | POST / DELETE | SUPER_ADMIN |

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| AUD-01 | Audit log staje się bottleneck wydajnościowy | ŚREDNIE | ŚREDNI | Async write (queue), separate DB/table, batch insert |
| AUD-02 | Moderator edytuje własną decyzję bez śladu | NISKIE (append-only) | WYSOKI | Append-only + immutability enforced w DB |
| AUD-03 | Brak legal hold → usunięcie dowodów | NISKIE | KRYTYCZNY | LegalHold entity + check przed deletion |
| AUD-04 | Nadmiar logów → koszty storage | ŚREDNIE | NISKI | Retencja policy + archiwizacja cold storage |
| AUD-05 | Raw IP retained >90d → GDPR violation | ŚREDNIE | ŚREDNI | Cron job: hash IP after 90 days |
| AUD-06 | Audit log inaccessible during incident | NISKIE | WYSOKI | Redundant storage, log backup |

---

## Rekomendacja

### NIEZBĘDNE LOGI — wdrożyć z v0.3
1. AuditLog entity w Prisma schema
2. Middleware audit logging dla auth + moderation + user management
3. Append-only policy (DB constraint: no UPDATE/DELETE na AuditLog)
4. Admin panel: audit log viewer z filtrami (actor, action, target, date range)
5. Cron: hash IP/user-agent po 90 dniach

### PRZYDATNE LOGI — wdrożyć z v0.5
6. Billing event logging (Stripe webhooks)
7. AI generation logging
8. LegalHold entity + integration z deletion flow
9. Export audit log (CSV/JSON) dla SUPER_ADMIN

### ZBĘDNE LOGI — nie wdrażać
10. Page views, navigation, feed impressions → analytics, nie audit
11. Draft saves → zbyt głośne, zero wartość audytowa

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-69 | Czy AuditLog w tej samej DB (PostgreSQL) czy osobnej? | 🟡 DO DECYZJI | Rekomendacja: ta sama DB (prostota MVP), osobna partition/table |
| FDN-70 | Czy wdrożyć tamper-proof logging (blockchain-style hash chain)? | 🟡 DO DECYZJI | Rekomendacja: nie w MVP — append-only + DB constraints wystarczą |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 06 — Risk Register | Wejście: ryzyka wymagające audytu |
| 21 — Legal Backbone | Wejście: wymagania prawne DSA/GDPR |
| 23 — DSA Readiness | Wejście: reason statements, moderation flow |
| 19 — Domain Model | Wejście: encje Report, ModerationAction |
| 20 — Admin Backoffice | Wejście: audit log viewer spec |
| 22 — GDPR Map | Wejście: retencja, IP hashing |
| 26 — Retention & Deletion | Wyjście: polityka retencji logów |
| 29 — Incident Response | Wyjście: evidence collection procedure |
| 30 — Compliance Matrix | Wyjście: kto ma dostęp do audytu |
