# META-GENIUSZ OS — Roadmap

## Wersje i kamienie milowe

---

### ✅ v0.1.0 — Fundament *(obecna)*

**Status**: Wydana 2026-03-09

- [x] Monorepo Turborepo + pnpm workspaces
- [x] 5 aplikacji Next.js + 1 backend Express
- [x] Backend API: User + Post CRUD (SQLite + Prisma)
- [x] Web Hub — dashboard modułów
- [x] HHU Feed — posty i profile twórców
- [x] TypeScript strict, Tailwind CSS 4, ESLint 9
- [x] Shared packages stubs (ui, ai-core, database, agents)

---

### 🔲 v0.2.0 — Stabilizacja i Auth

**Cel**: Naprawienie znanych problemów, podstawowe uwierzytelnianie

- [ ] Naprawa zduplikowanego route w API (`GET /users/:username`)
- [ ] Zmienne środowiskowe (usunięcie hardcoded `localhost:4000`)
- [ ] Auth — rejestracja i logowanie (NextAuth.js lub JWT)
- [ ] Ochrona endpointów API middleware
- [ ] GitHub Actions CI pipeline
- [ ] Testy Vitest dla API endpoints
- [ ] Dokumentacja uzupełniona

---

### 🔲 v0.3.0 — HHU Feature Complete

**Cel**: Hip Hop Universe jako w pełni działający moduł społecznościowy

- [ ] Upload avatara i edycja profilu
- [ ] System polubień postów
- [ ] Komentarze (z moderacją)
- [ ] Follow/unfollow użytkowników
- [ ] Feed algorytmiczny (prosty ranking)
- [ ] Powiadomienia in-app
- [ ] Wyszukiwanie twórców

---

### 🔲 v0.4.0 — AI Studio Alpha

**Cel**: Pierwsze działające narzędzia AI

- [ ] Implementacja `@meta-geniusz/ai-core` package
- [ ] Generator bio (OpenAI/Anthropic API)
- [ ] Generator captions do postów
- [ ] Podstawowy interfejs promptów
- [ ] Historia generacji per użytkownik
- [ ] Rate limiting dla AI calls

---

### 🔲 v0.5.0 — RFG Alpha

**Cel**: Rocket Fuell Girls — visual talent platform

- [ ] Profil modelki/muse
- [ ] Upload i galeria zdjęć (storage: S3/Cloudflare R2)
- [ ] Portfolio builder
- [ ] Wyszukiwanie i odkrywanie talentów
- [ ] Podstawowe kampanie/zapytania

---

### 🔲 v1.0.0 — MVP Production

**Cel**: Pierwsza wersja produkcyjna

- [ ] Wszystkie moduły funkcjonalne (HHU, RFG, AI Studio, Admin)
- [ ] Deployment na Vercel (frontend) + Railway (backend)
- [ ] Migracja bazy: SQLite → PostgreSQL
- [ ] Admin Panel — zarządzanie użytkownikami i moderacja
- [ ] Shared `@meta-geniusz/ui` package z komponentami
- [ ] End-to-end testy (Playwright)
- [ ] Monitoring (Sentry, Vercel Analytics)
- [ ] Pełna dokumentacja API

---

### 🔲 v1.5.0 — Creator Economy

**Cel**: Pierwsze funkcje monetyzacji

- [ ] Subskrypcje premium (Stripe)
- [ ] Creator payouts
- [ ] Digital products marketplace
- [ ] Collaborations board
- [ ] Tier system (free / premium / pro)

---

### 🔲 v2.0.0 — LOGOS / AI Intelligence

**Cel**: Pełna warstwa inteligencji systemowej

- [ ] Implementacja `@meta-geniusz/agents` — autonomiczne agenty
- [ ] LOGOS — AI routing, rekomendacje, personalizacja
- [ ] Predykcja trendów
- [ ] Automatyzacja growth strategies
- [ ] AI-driven content moderation
- [ ] Multi-modal AI (tekst + obraz + audio)

---

## Oś czasu (orientacyjna)

```
Mar 2026  v0.1.0 ── FUNDAMENT ────────────────── [✅]
Kwi 2026  v0.2.0 ── STABILIZACJA + AUTH ────────── [ ]
Maj 2026  v0.3.0 ── HHU FEATURE COMPLETE ────────── [ ]
Cze 2026  v0.4.0 ── AI STUDIO ALPHA ─────────────── [ ]
Lip 2026  v0.5.0 ── RFG ALPHA ───────────────────── [ ]
Sie 2026  v1.0.0 ── MVP PRODUCTION ──────────────── [ ]
Paź 2026  v1.5.0 ── CREATOR ECONOMY ─────────────── [ ]
Sty 2027  v2.0.0 ── LOGOS / AI INTELLIGENCE ──────── [ ]
```

---

## Legendy

- ✅ Ukończone
- 🔲 Zaplanowane
- 🔧 W trakcie
- ❌ Anulowane / Odłożone
