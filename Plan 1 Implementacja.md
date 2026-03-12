

Mam już obszerny kontekst z analizy. Muszę doprecyzować kilka szczegółów technicznych przed stworzeniem planu.

Verify current package.json state

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/apps/api/package.json)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/apps/api/src/index.ts)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/apps/api/prisma/schema.prisma)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/packages/types/src/index.ts)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/packages/utils/src/index.ts)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/packages/config/src/index.ts)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/turbo.json)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/pnpm-workspace.yaml)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/package.json)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/apps/hhu/package.json)

Odczyt: [](file:///d%3A/META-GENIUSZ-OS/apps/api/src/__tests__/api.test.ts)

Odczytaj [](file:///c%3A/Users/patry/AppData/Roaming/Code/User/workspaceStorage/2fa365f0bd3634ca8b71a9aae7cfa077/GitHub.copilot-chat/chat-session-resources/3070bc8a-2255-4da8-baf1-0d39b620f0ae/toolu_bdrk_017AiGna3DNpr3ucd2o3AWZd__vscode-1773229979939/content.txt#1-1), wiersze 1 do 500

Mam teraz pełny obraz kodu. Widzę też, że schema.prisma ma **błędy składniowe** (zduplikowane pola, złamana struktura). Teraz stworzę kompleksowy plan.

Analyzing your answers...

Analyzing your answers...

**UWAGA bezpieczeństwa:** Widzę, że udostępniłeś klucz API w czacie. **Nigdy nie udostępniaj kluczy API w rozmowach** — umieszczę go WYŁĄCZNIE w pliku `.env` (który jest w .gitignore). Dla bezpieczeństwa zalecam rotację tego klucza po tym, jak go tu wkleisz.

Zwracam uwagę, że to klucz **Google Gemini**, nie OpenAI — dostosuję plan do Gemini API.

Tworzę teraz kompleksowy plan F1-F12.

Usunięta pamięć [](file:///c%3A/Users/patry/AppData/Roaming/Code/User/workspaceStorage/2fa365f0bd3634ca8b71a9aae7cfa077/GitHub.copilot-chat/memory-tool/memories/MzA3MGJjOGEtMjI1NS00ZGE4LWJhZjEtMGQzOWI2MjBmMGFl/plan.md)

Utworzony plik pamięci [](file:///c%3A/Users/patry/AppData/Roaming/Code/User/workspaceStorage/2fa365f0bd3634ca8b71a9aae7cfa077/GitHub.copilot-chat/memory-tool/memories/MzA3MGJjOGEtMjI1NS00ZGE4LWJhZjEtMGQzOWI2MjBmMGFl/plan.md)

---

## Plan: Implementacja META-GENIUSZ OS od 15% do 100% (F1-F12)

**TL;DR**: 12 faz budowy pokrywających wszystko co opisano w 50 dokumentach strategicznych. Od naprawy krytycznych błędów (schema.prisma jest złamana), przez auth (Better Auth + OAuth), HHU social complete, AI Studio z Gemini, RFG, Admin, płatności, aż po services i compliance. Stack: Better Auth + Google Gemini API + Resend + lokalne storage + fundamenty pod Stripe.

---

### Faza 0: Naprawy krytyczne (blokery)
1. **Naprawić `schema.prisma`** — ma zduplikowane pola i złamaną składnię (Profile, Post, Session się powtarzają). Przepisać od zera wg doc 19 (Master Domain Model)
2. **Skonfigurować `.env`** — `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `BETTER_AUTH_SECRET`. Klucz Gemini do `.env` (NIE do kodu!)
3. **Usunąć mylące pliki statusowe** — SESSION_COMPLETE.md, FINAL_STATUS.md twierdzą "8.8/10 production-ready", co nie odpowiada rzeczywistości

### Faza 1: Rozszerzenie packages/types + config + utils
4. **Rozszerzyć types** — dodać: `Comment`, `Like`, `Follow`, `Report`, `ModerationAction`, `AIGeneration`, `Transaction`, `Subscription`, `Notification`, `UserRole` enum, `VerticalRole` enums (z doc 18-19)
5. **Rozszerzyć config** — dodać konfigurację Better Auth, Gemini API, Resend, Storage, feature flags per vertical
6. **Rozszerzyć utils** — dodać: `sanitizeHtml()`, `truncate()`, `hashIP()`, `formatCurrency()`, `paginateQuery()`

### Faza 2: packages/auth + packages/database
7. **Zaimplementować auth** — Better Auth z email/password + Google OAuth + GitHub OAuth, session management z Prisma adapter, middleware `requireAuth()` i `requireRole()`, token JWT z `verticalRoles` (doc 18)
8. **Zaimplementować database** — Prisma client singleton, `paginate()`, `softDelete()`, `withTransaction()`, seed script

### Faza 3: API — pełne endpointy + middleware
9. **Rozszerzyć schema** — dodać modele: `Comment`, `Like`, `Report`, `ModerationAction`, `AuditLog`, `AIGeneration` (z doc 19) *zależy od F0*
10. **Auth endpoints** — Better Auth obsługuje: `/api/auth/sign-up`, `/sign-in`, `/sign-out`, `/session`, `/verify-email`, OAuth callbacks *zależy od F2*
11. **Social endpoints** — likes, comments, follow/unfollow, feed (home + discover), search *zależy od F2*
12. **Admin endpoints** — user management, moderation queue, reports, stats — `requireRole('ADMIN')` *zależy od F2*
13. **Middleware** — Helmet.js, Zod validation, error handler, audit log, pagination *równoległa z F2*

### Faza 4: packages/ui — React components *(równoległa z F2-F3)*
14. **Komponenty bazowe** — `Button`, `Input`, `Card`, `Badge`, `Avatar`, `Modal`, `Tabs`, `LoadingSpinner` — Tailwind CSS, dark mode, custom (nie Shadcn, wg wcześniejszej decyzji)
15. **Komponenty domeny** — `PostCard`, `UserCard`, `CommentItem`, `NotificationItem`, `FileUpload` *równoległa z F3*

### Faza 5: HHU Feature Complete
16. **Auth UI** — register, login, OAuth buttons, email verification, profile edit, logout. Referencja: doc 35 (Creator Onboarding) *zależy od F2, F3, F4*
17. **Social UI** — like (🔥), comments (280 chars), follow/unfollow, search, followers/following *zależy od F3*
18. **Feed** — Home (followed), Discover (trending + fresh), Profile (user's posts) *zależy od F3*
19. **Onboarding Wizard** — 5 kroków wg doc 35: type → avatar → AI bio → links → first post *zależy od F6*
20. **Notifications (in-app)** — bell icon + count, like/comment/follow alerts *zależy od F3*

### Faza 6: packages/ai-core (LOGOS) *(równoległa z F3)*
21. **Gemini API wrapper** — `@google/generative-ai`, model selection (gemini-1.5-flash default), rate limiting per user, credit tracking *zależy od F1*
22. **AI Tools** — `generateBio()`, `generateCaption()`, `suggestHashtags()`, `generatePromoText()`, `generateContentIdeas()` — każdy kosztuje 1-2 kredyty
23. **Safety pipeline** — input PII filter, output `AI_GENERATED` tag, content check (doc 24)

### Faza 7: AI Studio App
24. **AI Studio UI** — dashboard narzędzi, Bio Generator, Caption Writer, Hashtag Suggester, historia generacji, saldo kredytów *zależy od F5, F6*
25. **API: `/ai/*`** — `POST /ai/generate`, `GET /ai/history`, `GET /ai/credits` *zależy od F6*

### Faza 8: packages/storage *(równoległa z F3)*
26. **Storage adapter** — lokalny filesystem (`uploads/`), multer middleware, image validation (typ, rozmiar ≤5MB), abstraction pod przyszły S3/R2
27. **Upload endpoints** — `POST /upload/avatar`, `POST /upload/image`, static serve `GET /uploads/:filename`

### Faza 9: RFG App
28. **RFG pages** — portfolio page, gallery view, portfolio upload, creator search/discover, age gate (18+) *zależy od F3, F4, F8*
29. **RFG API** — `POST /rfg/portfolios`, `GET /rfg/portfolios`, upload images, safe contact flow (doc 46)

### Faza 10: Admin Panel
30. **Admin dashboard** — stats (users, posts, reports, MAU), user management (list, view, ban, role), moderation queue (reports, actions, reason statements wg DSA doc 23), audit log viewer *zależy od F3, F4*
31. **DSA compliance code** — report flow z reason statements, appeal form, notice-and-action

### Faza 11: packages/payments — fundament
32. **Payment service interface** — abstrakcja z mock adapterem (default) i przygotowywanym Stripe adapterem. Subscription, Credits, Payout modele w DB *zależy od F3*
33. **Billing endpoints** — `GET /billing/plans`, `POST /billing/subscribe` (mock), `GET /billing/credits`, `POST /tips` (mock), historia transakcji
34. **Entitlement system** — Free (10 AI credits/mo), HHU Pro, AI tiers. Egzekwowane przy `POST /ai/generate`

### Faza 12: Services
35. **notification-service** — Resend email integration, in-app notifications DB model, email templates (welcome, verification, digest), API endpoints *zależy od F3*
36. **moderation-service** — keyword filter, report processing, enforcement ladder (E0-E5), strike system (doc 27) *zależy od F3*
37. **search-service** — PostgreSQL full-text search (tsvector/tsquery), `GET /search?q=&type=` *zależy od F3*
38. **media-service** — image resize/thumbnail, upload handler, cache headers *zależy od F8*
39. **recommendation-engine** — feed ranking heurystyka (recency × engagement × follow boost), discover sort *zależy od F3*

### Cross-cutting: Testy
40. **Unit testy (Vitest)** — auth, API endpoints, utils, ai-core. Target: >50% coverage *przez wszystkie fazy*
41. **E2E testy (Playwright)** — register → login → post → like → comment → follow → AI generate → admin ban. Target: 10+ scenariuszy *po F5*

### Cross-cutting: Infrastruktura & Compliance
42. **DevOps** — Husky + lint-staged, CI badges, fix deploy.yml, CODEOWNERS *równoległa z F1*
43. **Compliance w kodzie** — Privacy Policy page, Terms of Service page, cookie consent, GDPR endpoints (`GET /me/data`, `DELETE /me`), `AI_GENERATED` tags *równoległa z F10*

---

**Relevant files**
- schema.prisma — przepisać od zera (błędy składniowe), dodać 6 nowych modeli
- index.ts — rozbudować z 9 do ~40 endpointów, dodać Helmet/Zod/error handler
- index.ts — rozszerzyć o 10+ nowych interfejsów i enumów
- index.ts — dodać Better Auth, Gemini, Resend config
- index.ts — dodać 5+ nowych utility functions
- `packages/auth/src/index.ts` — **NOWY**: Better Auth setup + middleware
- `packages/database/src/index.ts` — **NOWY**: Prisma singleton + helpers
- `packages/ui/src/index.ts` — **NOWY**: 15+ React components
- `packages/ai-core/src/index.ts` — **NOWY**: Gemini wrapper + AI tools
- `packages/storage/src/index.ts` — **NOWY**: multer + filesystem adapter
- `packages/payments/src/index.ts` — **NOWY**: mock payment service
- page.tsx — przeprojektować z auth-gated feed
- `apps/hhu/src/app/(auth)/login/page.tsx` — **NOWY**: login page
- `apps/hhu/src/app/(auth)/register/page.tsx` — **NOWY**: register page
- page.tsx — **NOWY**: dashboard AI tools
- page.tsx — **NOWY**: admin dashboard
- page.tsx — **NOWY**: portfolio browser

**Verification**
1. `npx prisma validate` — schema passes
2. `pnpm build` — 0 errors across all 6 apps + 12 packages
3. `pnpm test` — >50% coverage, 0 failures
4. `pnpm lint && pnpm typecheck` — 0 errors/warnings
5. Manual flow: register → verify email → login → create post → like → comment → follow → generate AI bio → admin panel → ban user
6. `docker compose up` → API + web + HHU responding
7. E2E: `pnpm test:e2e` → all 10+ scenarios green

**Decisions**
- Auth: Better Auth (email/password + Google + GitHub OAuth)
- AI: Google Gemini API (gemini-1.5-flash), NIE OpenAI
- Storage: lokalne filesystem (`uploads/`), abstrakcja pod S3/R2 w przyszłości
- Payments: mock adapter z interfejsem gotowym na Stripe Connect
- Email: Resend (real integration)
- UI: custom komponenty Tailwind (nie Shadcn)
- Klucz Gemini TYLKO w `.env`, nigdy w kodzie/repozytorium

**Further Considerations**
1. **Resend API key** — potrzebny do prawdziwego wysyłania emaili. Jeśli nie masz, mogę ustawić console logger jako fallback.
2. **OAuth credentials** — Google Cloud Console i GitHub Developer Settings wymagane do OAuth. Mogę skonfigurować z placeholderami, którymi uzupełnisz.
3. **PostgreSQL** — potrzebny running instance (Docker lub lokalna instalacja) do migracji i testów.
