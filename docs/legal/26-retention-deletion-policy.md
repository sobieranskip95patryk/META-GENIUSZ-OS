# 26 — Retention & Deletion Policy Draft

| Pole | Wartość |
|------|---------|
| **Projekt** | META-GENIUSZ OS |
| **Cel decyzji** | Ustalić politykę przechowywania i usuwania danych dla wszystkich obiektów |
| **Zakres** | MVP / Growth / Scale |
| **Status** | ✅ APPROVED |
| **Autor** | AI Copilot |
| **Zależności wejściowe** | ← 22 (GDPR Map) |
| **Zależności wyjściowe** | → 30 (Compliance Decision Matrix) |

---

## Executive Summary

Polityka retencji i usuwania danych określa, jak długo każdy typ obiektu jest przechowywany, kiedy jest usuwany, jakie istnieją wyjątki i jak wygląda przepływ usuwania konta użytkownika. Dokument konsoliduje wymagania z GDPR (Art. 5(1)(e) — ograniczenie przechowywania), DSA (archiwizacja decyzji moderacyjnych), prawa podatkowego (7 lat) i wewnętrznych potrzeb bezpieczeństwa w jedno spójne źródło prawdy.

---

## Stan obecny

| Element | Status |
|---------|--------|
| Soft delete postów | 🟡 Zaplanowane w doc 19, niezaimplementowane |
| Soft delete użytkowników | 🟡 Zaplanowane w doc 19, niezaimplementowane |
| Auto-expire sesji | 🟡 Zaplanowane (30 dni), niezaimplementowane |
| Usuwanie konta przez użytkownika | ❌ Brak UI i endpoint |
| Polityka retencji | ❌ Brak — ten dokument ją tworzy |
| Cron/scheduler do cleanup | ❌ Brak |
| Legal hold | ❌ Brak (zaprojektowane w doc 25) |

---

## Retencja według typu obiektu

### TRZYMAĆ (aktywne dane)

| Obiekt | Okres retencji | Podstawa | Trigger usunięcia |
|--------|----------------|----------|--------------------|
| **User (aktywne konto)** | Czas trwania konta | Umowa (Art. 6(1)(b)) | Żądanie usunięcia (Art. 17) lub inactivity policy |
| **User (soft-deleted)** | 30 dni grace period | Uzasadniony interes | Auto hard-delete po 30d |
| **Post (aktywny)** | Czas trwania konta autora | Umowa | Kaskadowe z kontem |
| **Post (użytkownik usunął)** | 30 dni soft-delete | Uzasadniony interes | Auto hard-delete po 30d |
| **Comment (aktywny)** | Czas trwania konta | Umowa | Kaskadowe z kontem |
| **Like / Follow** | Czas trwania konta | Umowa | Kaskadowe z kontem |
| **Profile (per vertical)** | Czas trwania konta | Umowa | Kaskadowe z kontem |
| **UserSettings** | Czas trwania konta | Umowa | Kaskadowe z kontem |

### USUWAĆ (dane tymczasowe)

| Obiekt | Okres retencji | Trigger |
|--------|----------------|---------|
| **Session** | 30 dni | Auto-expire (expiresAt) |
| **AIGeneration (nie zapisane)** | 90 dni | Auto-delete cron |
| **AIGeneration (user saved)** | Czas trwania konta | Kaskadowe z kontem |
| **Password reset token** | 1h | Auto-expire |
| **Email verification token** | 24h | Auto-expire |
| **Logi techniczne (raw IP)** | 90 dni → hash | Cron: anonymize |
| **Cookies analityczne** | 13 miesięcy | Auto-expire (browser) |
| **Upload tymczasowy** | 24h | Cron: cleanup |

### WYJĄTKI (retencja dłuższa niż standardowa)

| Obiekt | Okres retencji | Podstawa | Uwagi |
|--------|----------------|----------|-------|
| **Report (resolved)** | 2 lata od resolution | DSA Art. 16 | Archive → delete |
| **ModerationAction** | 2 lata od created | DSA Art. 17 | Nie usuwać przy deletion konta moderatora |
| **Appeal** | 2 lata od resolution | DSA Art. 20 | J.w. |
| **AuditLog** | 2 lata (standard) / 7 lat (billing) | DSA + wewnętrzny | Append-only |
| **Transaction** | 7 lat | Ordynacja podatkowa | Archive after 7y |
| **Subscription** | 7 lat od zakończenia | Ordynacja podatkowa | Archive |
| **PayoutRecord** | 7 lat | Ordynacja podatkowa | Archive |
| **IdentityVerification (hash)** | 2 lata po weryfikacji | Uzasadniony interes | Oryginał (selfie/doc) usunąć po 30d, zachować hash |
| **Legal Hold data** | Do zwolnienia hold | Obowiązek prawny | Blokuje auto-deletion |

---

## Trigger usunięcia danych

### 1. Żądanie użytkownika (GDPR Art. 17)

```
User → DELETE /me
  → 1. System ustawia User.status = SOFT_DELETED, User.deletedAt = now()
  → 2. Ukrywa profil, posty, komentarze (visibility: HIDDEN)
  → 3. Wysyła email potwierdzający: "Twoje konto będzie usunięte za 30 dni"
  → 4. Grace period: 30 dni (user może cofnąć → POST /me/restore)
  → 5. Po 30 dniach → cron job:
       a. Check: legal hold? → SKIP (retain)
       b. Check: pending reports where user = author? → retain evidence snapshot
       c. Check: pending transactions? → retain billing (7y)
       d. Hard delete: User, Profile, Posts, Comments, Likes, Follows, Sessions
       e. Anonymize: AuditLog entries (actorId → HASH("DELETED_USER_{userId}"))
       f. Retain: Reports (as evidence), Transactions (7y), ModerationActions (2y)
  → 6. AuditLog: account.delete_complete
```

### 2. Inactivity policy

| Okres nieaktywności | Akcja |
|---------------------|-------|
| 12 miesięcy | Email ostrzegawczy: "Twoje konto jest nieaktywne" |
| 18 miesięcy | Drugi email: "Konto zostanie usunięte za 30 dni" |
| 18 miesięcy + 30 dni | Soft-delete → grace period → hard delete |

> **FDN-71**: Czy wdrożyć inactivity policy? Rekomendacja: tak, ale dopiero od v1.0.

### 3. Ban konta

```
Admin → POST /admin/users/:id/ban
  → 1. User.status = BANNED
  → 2. Posty ukryte (nie usunięte — evidence)
  → 3. Sesje revoked
  → 4. AuditLog: user.ban { reason, bannedBy }
  → 5. User zachowany (nie deleted) — może się odwołać
  → 6. Po 2 latach bez odwołania → auto soft-delete flow
```

### 4. Auto-expire (system)

| Obiekt | Schedule | Implementacja |
|--------|----------|---------------|
| Expired sessions | Co 1h | Cron: DELETE FROM Session WHERE expiresAt < now() |
| Old AI generations | Co 24h | Cron: DELETE FROM AIGeneration WHERE savedByUser = false AND createdAt < now() - 90d |
| Hashing raw IP | Co 24h | Cron: UPDATE AuditLog SET ip = hash(ip) WHERE createdAt < now() - 90d AND ip NOT LIKE 'HASH:%' |
| Temp uploads | Co 1h | Cron: DELETE files in /tmp/uploads older than 24h |
| Password reset tokens | Co 1h | Cron: DELETE FROM PasswordReset WHERE expiresAt < now() |

---

## Wyjątki od usunięcia

### Legal Hold (doc 25)

Gdy aktywny LegalHold istnieje dla danego targetu:
- **BLOKUJ** hard-delete użytkownika
- **BLOKUJ** anonymizację AuditLog
- **BLOKUJ** usunięcie evidence (Report, ModerationAction)
- **INFORMUJ** SUPER_ADMIN o próbie deletion

### Obowiązek podatkowy

Transakcje finansowe (Transaction, Subscription, PayoutRecord) muszą być przechowywane 7 lat niezależnie od statusu konta użytkownika. Po usunięciu konta:
- Dane transakcyjne: anonimizowane (userId → hash) ale zachowane
- Kwoty, daty, typy — bez zmian

### Evidence preservation (DSA)

Treści objęte zgłoszeniem (Report z decyzją moderacyjną):
- Content snapshot zachowany w ModerationAction.metadata
- Nie kasowany przy deletion konta autora
- Retencja: 2 lata od resolution

---

## Przepływ usunięcia konta — diagram

```
[User żąda usunięcia]
        │
        ▼
[Soft-delete: status=SOFT_DELETED]
        │
    30 dni grace
        │
   [User cofnął?] ──Yes──→ [Restore: status=ACTIVE]
        │
       No
        │
   [Legal Hold?] ──Yes──→ [SKIP — retain until released]
        │
       No
        │
   [Pending Reports?] ──Yes──→ [Snapshot evidence, continue]
        │
   [Pending Billing?] ──Yes──→ [Anonymize user, retain billing 7y]
        │
        ▼
[Hard delete: User, Posts, Comments, Likes, Follows, Sessions, Profile]
        │
        ▼
[Anonymize AuditLog: actorId → HASH]
        │
        ▼
[AuditLog: account.delete_complete]
```

---

## Ryzyka

| ID | Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|----|--------|--------------------|-------|-----------|
| RET-01 | Brak cron job → dane nie usuwane automatycznie | ŚREDNIE | ŚREDNI | Cron scheduler w v0.3, monitoring alertu |
| RET-02 | Hard delete bez sprawdzenia legal hold | NISKIE | KRYTYCZNY | Check w deletion flow (obowiązkowy step) |
| RET-03 | User spodziewa się natychmiastowego usunięcia | ŚREDNIE | NISKI | UX: jasna informacja o 30-day grace |
| RET-04 | Retencja za długa → koszty storage | NISKIE | NISKI | Archive cold storage po retention period |
| RET-05 | Inactivity deletion → utrata wartościowego konta | NISKIE | ŚREDNI | Multiple warnings + easy reactivation |

---

## Rekomendacja wdrożeniowa

### TRZYMAĆ — implementacja natychmiastowa (v0.3)
1. Endpoint DELETE /me → soft-delete + 30d grace
2. Endpoint POST /me/restore → cofnięcie usunięcia
3. Cron: session cleanup (co 1h)
4. Cron: soft-deleted user hard-delete (co 24h)
5. Cron: AI generation cleanup 90d (co 24h)

### USUWAĆ — implementacja v0.5
6. Cron: IP hashing po 90d
7. Cron: temp upload cleanup
8. Legal hold check w deletion flow
9. Transaction anonymization (zachowaj kwoty, hash userId)

### WYJĄTKI — implementacja v0.7+
10. Inactivity policy (12+18 mies.)
11. Auto soft-delete banned accounts po 2 latach
12. Cold storage archive dla danych >2y (Reports, AuditLog)

---

## Founder Decision Notes

| ID | Decyzja | Status | Uwagi |
|----|---------|--------|-------|
| FDN-71 | Czy wdrożyć inactivity deletion policy? | 🟡 DO DECYZJI | Rekomendacja: tak (v1.0), 18 mies. + 30d warning |
| FDN-72 | Grace period: 30 dni czy 14 dni? | 🟡 DO DECYZJI | Rekomendacja: 30 dni (standard branżowy, user-friendly) |
| FDN-73 | Czy banned users zachowywać indefinitely? | 🟡 DO DECYZJI | Rekomendacja: auto soft-delete po 2 latach (GDPR minimalizacja) |

---

## Dokumenty zależne

| Dokument | Relacja |
|----------|---------|
| 22 — GDPR Map | Wejście: mapa retencji, kategorie danych |
| 19 — Domain Model | Wejście: encje i lifecycle danych |
| 25 — Audit Trail | Wejście: AuditLog retencja, legal hold |
| 23 — DSA Readiness | Wejście: retencja Reports/ModerationActions |
| 29 — Incident Response | Wyjście: evidence preservation w incydentach |
| 30 — Compliance Matrix | Wyjście: kto decyduje o retention exceptions |
