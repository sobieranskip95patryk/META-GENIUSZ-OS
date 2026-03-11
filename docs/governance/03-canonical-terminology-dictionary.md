# [03] Canonical Terminology Dictionary

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Słownik ustala jedno oficjalne znaczenie dla każdego kluczowego terminu w ekosystemie META-GENIUSZ OS. Eliminuje niejednoznaczność między kodem, dokumentacją, marketingiem i komunikacją z inwestorami. Od momentu zatwierdzenia obowiązują wyłącznie terminy oznaczone jako **OFICJALNE**.

---

## Stan obecny

Terminologia była niespójna: README używa „Creator Operating System", D:\1 dodaje „Cultural Network + AI Production Engine + Monetization Layer", a kod zawiera nazwy pakietów rozbieżne z dokumentacją marketingową. Niniejszy słownik standaryzuje nazewnictwo.

---

## Słownik pojęć

### A. Terminy strategiczne

| Termin | Definicja | Status | Uwagi |
|--------|-----------|--------|-------|
| **META-GENIUSZ OS** | Nazwa głównej platformy / systemu operacyjnego dla twórców cyfrowych. Obejmuje wszystkie moduły, pakiety i usługi. | OFICJALNY | Pisownia: wielkie litery, myślnik, spacja + OS |
| **Ekosystem** | Cały zbiór produktów, usług i narzędzi pod parasolem META-GENIUSZ OS | OFICJALNY | Używać zamiast „platforma" gdy mowa o całości |
| **Platforma** | Pojedynczy deployowalny produkt (np. HHU, RFG) | OFICJALNY | Nie mylić z „ekosystem" |
| **Moduł** | Wyodrębniona funkcjonalnie jednostka w ramach ekosystemu (app lub service) | OFICJALNY | Przykłady: HHU module, AI Studio module |
| **Vertical** | Moduł skierowany do specyficznego segmentu twórców | OFICJALNY | HHU = hip-hop vertical, RFG = visual talent vertical |
| **Creator** | Osoba tworząca i publikująca treści (twórca) | OFICJALNY | Nie: „artysta" (zbyt wąski), nie: „influencer" (inny model) |
| **Fan** | Osoba konsumująca i wspierająca twórców | OFICJALNY | |
| **Founder** | Founder & Visionary: Patryk Sobierański | OFICJALNY | Rola decyzyjna; nie „CEO" (spółka jeszcze nie założona) |

### B. Definicje modułów

| Termin | Definicja | Kod referencyjny | Status |
|--------|-----------|-----------------|--------|
| **HHU (Hip Hop Universe)** | Społecznościowa platforma kultury hip-hop — posty, profile, feed, interakcje, discovery | `apps/hhu`, `@meta-geniusz/hhu` | OFICJALNY |
| **RFG (Rocket Fuell Girls)** | Visual talent vertical — portfolio, galerie, casting, premium profiles dla modelek i muses | `apps/rfg`, `@meta-geniusz/rfg` | OFICJALNY |
| **AI Studio (Creator)** | Narzędzia AI do generowania bio, captions, strategii wzrostu, visual assets | `apps/ai-studio`, `@meta-geniusz/ai-studio` | OFICJALNY |
| **Admin Control** | Panel operacyjny: zarządzanie użytkownikami, moderacja, analityka, billing ops | `apps/admin` | OFICJALNY |
| **Web Hub** | Centralny punkt wejścia do ekosystemu — dashboard modułów, nawigacja | `apps/web`, `@meta-geniusz/web` | OFICJALNY |
| **API** | Backend REST (Express.js + Prisma) obsługujący wszystkie moduły frontend | `apps/api`, `@meta-geniusz/api` | OFICJALNY |
| **LOGOS** | Warstwa AI orkiestracji, routingu i inteligencji systemowej | `packages/ai-core` | OFICJALNY |

### C. Definicje ról w systemie

| Rola | Definicja | Moduły | Status |
|------|-----------|--------|--------|
| **User** | Każdy zarejestrowany użytkownik (base role) | Wszystkie | OFICJALNY |
| **Creator** | User z aktywnym profilem twórcy (posty, portfolio) | HHU, RFG, AI Studio | OFICJALNY |
| **Fan** | User konsumujący treści (follow, like, comment, subscribe) | HHU, RFG | OFICJALNY |
| **Admin** | Operator platformy z dostępem do Admin Control | Admin | OFICJALNY |
| **Moderator** | Admin z uprawnieniami moderacji treści | Admin, HHU, RFG | OFICJALNY |
| **Partner** | Marka, label lub organizacja współpracująca z platformą | HHU (B2B), RFG (B2B) | OFICJALNY |
| **Artist** | Creator w verticalu HHU (raper, producent, DJ) | HHU | OFICJALNY |
| **Model/Muse** | Creator w verticalu RFG | RFG | OFICJALNY |

### D. Definicje warstw systemu

| Warstwa | Definicja | Komponenty | Status |
|---------|-----------|-----------|--------|
| **Frontend Layer** | Aplikacje Next.js renderujące UI dla użytkowników | apps/web, hhu, rfg, ai-studio, admin | OFICJALNY |
| **Backend Layer** | Serwer Express.js obsługujący REST API i logikę biznesową | apps/api | OFICJALNY |
| **Database Layer** | Warstwa danych: Prisma ORM + SQLite (dev) / PostgreSQL (prod) | apps/api/prisma | OFICJALNY |
| **Shared Packages** | Biblioteki współdzielone między modułami | packages/* | OFICJALNY |
| **Services Layer** | Przyszłe mikroserwisy (media, moderation, search, notifications) | services/* | OFICJALNY |
| **Orchestration Layer** | Turborepo + pnpm — zarządzanie monorepo, buildy, pipeline | turbo.json, pnpm-workspace | OFICJALNY |

### E. Terminy biznesowe

| Termin | Definicja | Status |
|--------|-----------|--------|
| **MVP** | Minimum Viable Product — pierwsza pełna wersja do walidacji rynkowej (v1.0.0) | OFICJALNY |
| **Alpha** | Wczesna faza rozwoju — fundament techniczny, brak pełnych features (v0.x) | OFICJALNY |
| **Growth Phase** | Faza wzrostu po MVP — monetyzacja, skala, nowe verticale (v1.5+) | OFICJALNY |
| **Scale Phase** | Faza skalowania — AI intelligence, advanced features, globalizacja (v2.0+) | OFICJALNY |
| **Subscription** | Model płatności cyklicznej (free / premium / pro tier) | OFICJALNY |
| **Credits** | Wewnętrzna waluta AI Studio; 1 credit = 1 unit operacji AI | OFICJALNY |
| **Commission** | Prowizja platformy od transakcji creator–fan | OFICJALNY |
| **Payout** | Wypłata zarobionych środków na konto bankowe twórcy | OFICJALNY |
| **Entitlement** | Uprawnienie wynikające z subskrypcji lub zakupu (dostęp do feature) | OFICJALNY |

### F. Terminy techniczne

| Termin | Definicja | Status |
|--------|-----------|--------|
| **Monorepo** | Jedno repozytorium zawierające wiele pakietów i aplikacji | OFICJALNY |
| **Workspace** | Folder w monorepo zarządzany przez pnpm workspaces | OFICJALNY |
| **App Router** | Routing Next.js 13+ oparty na folderze `app/` (nie `pages/`) | OFICJALNY |
| **SSR** | Server-Side Rendering — renderowanie na serwerze | OFICJALNY |
| **RSC** | React Server Components — komponenty renderowane na serwerze | OFICJALNY |
| **Schema** | Definicja modelu danych w Prisma (schema.prisma) | OFICJALNY |
| **Migration** | Skrypt zmiany struktury bazy danych (Prisma migrate) | OFICJALNY |
| **Stub** | Plik/folder placeholder bez implementacji | OFICJALNY |

---

## Pojęcia niejednoznaczne — decyzje ujednolicenia

| Wariant używany | Wariant odrzucony | Uzasadnienie |
|----------------|-------------------|-------------|
| META-GENIUSZ OS | Meta Geniusz, MetaGeniusz, meta-geniusz-os | Oficjalna pisownia: wielkie litery + myślnik + OS |
| HHU | Hip Hop Universe, HipHopUniverse | Skrót HHU w kodzie i docs; pełna nazwa w marketingu |
| RFG | Rocket Fuell Girls, RocketFuellGirls | Skrót RFG w kodzie i docs; pełna nazwa w marketingu |
| Creator | Twórca, Artysta, Influencer | „Creator" jako termin neutralny; „Artysta" tylko w kontekście HHU |
| Vertical | Segment, Moduł | „Vertical" = domena rynkowa; „Moduł" = jednostka techniczna |
| LOGOS | AI Core, AI Brain, AI Engine | „LOGOS" = oficjalna nazwa warstwy AI; „AI Core" = nazwa pakietu |

---

## Rekomendacje ujednolicenia

1. **Kod**: Nazwy pakietów (`@meta-geniusz/*`) pozostają bez zmian
2. **Dokumentacja**: Używać pełnych nazw przy pierwszym wystąpieniu, potem skróty
3. **Marketing**: Pełne nazwy modułów (Hip Hop Universe, nie HHU)
4. **API**: Endpointy w lowercase kebab-case (`/users`, `/posts`)
5. **Zmienne**: camelCase w TypeScript, UPPER_SNAKE w env vars

---

## Ryzyka komunikacyjne

| # | Ryzyko | Mitygacja |
|---|--------|-----------|
| R1 | Nowy contributor używa starej terminologii | Link do tego słownika w CONTRIBUTING.md |
| R2 | Marketing tworzy materiały z innymi nazwami | Słownik jako obowiązkowe źródło dla copywriterów |
| R3 | Tłumaczenie PL/EN wprowadza nowe terminy | Słownik zawiera oficjalne terminy EN; PL tylko w docs wewnętrznych |

---

## Founder Decision Notes

- [ ] **FDN-07**: Potwierdzić pisownię „Rocket Fuell Girls" (dwa L) vs „Rocket Fuel Girls" (jedno L)
- [ ] **FDN-08**: Zatwierdzić „LOGOS" jako oficjalną nazwę AI layer

---

## Dokumenty zależne

- ← [01] Master Project Corpus Audit (źródło pojęć)
- → Wszystkie kolejne dokumenty (muszą używać terminologii z tego słownika)
