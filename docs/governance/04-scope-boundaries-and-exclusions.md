# [04] Scope Boundaries & Exclusions

> Projekt: META-GENIUSZ OS | Wersja: 1.0 | Data: 2026-03-11 | Status: **APPROVED**

---

## Executive Summary

Dokument ustala formalne granice zakresu projektu META-GENIUSZ OS na każdym etapie: co należy do rdzenia, co jest wspierające, co jest odłożone na później, a co jest jawnie wyłączone. Eliminuje „scope creep" i daje każdemu członkowi zespołu jednoznaczną odpowiedź: „Czy to robimy teraz?"

---

## Stan obecny

Repo v0.1.0 zawiera 6 aplikacji, 12 folderów pakietów i 5 folderów services — większość pustych. Wytyczne dalsze definiują 50 dokumentów obejmujących zakres od governance po narrację inwestorską. Bez jawnych granic ryzyko rozmycia uwagi jest krytyczne.

---

## Mapa zakresu

### 🟢 TERAZ (v0.2.0 – v0.5.0) — MVP Path

| Element | Zakres | Priorytet | Właściciel |
|---------|--------|-----------|------------|
| **Dokumentacja governance (01-10)** | Rejestry, słownik, scope, ryzyka, dependency, protokoły, roadmap docs, founder model, 90-day plan | P0 | Founder + AI |
| **Dokumentacja architecture/product (11-20)** | Tezy strategiczne, architektura systemu/produktu, domain model, governance monorepo, admin spec | P0 | Founder + AI |
| **Auth (JWT/NextAuth)** | Rejestracja, logowanie, middleware, sesje | P0 | Dev |
| **API stabilizacja** | Env variables, naprawienie duplikatu route, error handling | P0 | Dev |
| **HHU Feature Complete** | Likes, comments, follow/unfollow, avatar upload, edycja profilu, feed pagination | P1 | Dev |
| **Shared packages baseline** | `@meta-geniusz/ui` (Button, Card, Input), `@meta-geniusz/types`, `@meta-geniusz/config` | P1 | Dev |
| **CI/CD baseline** | GitHub Actions: lint, typecheck, build na PR | P1 | Dev |
| **Compliance baseline (21-30)** | Legal backbone, GDPR awareness, DSA readiness, content policy baseline | P1 | Founder + AI |
| **Testy baseline** | Vitest API endpoints, min. 1 E2E HHU flow | P2 | Dev |
| **AI Studio Alpha** | Generator bio, generator captions, basic prompt UI | P2 | Dev |
| **RFG Alpha** | Profil, portfolio, galeria zdjęć | P2 | Dev |

### 🟡 PÓŹNIEJ (v1.0.0 – v1.5.0) — Growth Path

| Element | Zakres | Warunek startu |
|---------|--------|---------------|
| **Admin Panel — pełna funkcjonalność** | User management, moderation queue, analytics dashboard | Po auth + HHU Complete |
| **Monetyzacja v1** | Stripe subscriptions, credits, basic payouts | Po v1.0 MVP Production |
| **PostgreSQL migration** | Przejście z SQLite na Postgres + backup strategy | Przed deployment prod |
| **Deployment production** | Vercel (frontend) + Railway/Render (backend) | Po v1.0 all green |
| **Trust & Safety Core** | Fake account detection, abuse reporting, moderation queue | Po content policy + admin panel |
| **Monitoring** | Sentry, Vercel Analytics, uptime checks | Równolegle z deployment |
| **HHU Growth features** | Discovery, trending, challenges, creator collabs | Po v0.3 HHU Complete |
| **Artist Partnership Program** | Ambasadorzy, pakiety partnerskie, onboarding liderów sceny | Po GTM Poland doc |
| **Advanced AI Studio** | Workflow library, multi-tool, credit economy | Po AI Studio Alpha |
| **RFG Premium** | Premium profiles, casting flows, brand partnerships | Po RFG Alpha |
| **Dokumentacja biznesowa/growth (31-50)** | Product theses, personas, growth loops, GTM, investor narrative | Iteracyjnie po G1 |

### 🔴 NIE ROBIMY (wyłączenia jawne)

| Element | Powód wyłączenia | Możliwy powrót |
|---------|-----------------|----------------|
| **Aplikacja mobilna (React Native)** | Webowa responsywna wystarczy; mobile = duży nakład | v2.0+ jeśli retention metrics uzasadnią |
| **Mikroserwisy (services/*)** | Monolith Express wystarczy do v1.0; przedwczesna optymalizacja | v1.5+ przy udowodnionym ruchu |
| **Blockchain / Web3** | Brak uzasadnienia biznesowego na obecnym etapie; dodaje kompleksowość | v3.0+ jeśli rynek wymusi |
| **White-label / SaaS** | Przedwczesne; focus na własny brand i market fit | Scale phase po funding |
| **Multi-language UI** | PL first → EN; bez CMS tłumaczeń | v2.0+ przy expansion |
| **Desktop app (Electron)** | Brak potrzeby; web wystarczy | Raczej nigdy |
| **Real-time features (WebSockets)** | REST wystarczy do MVP; WS = complexity | v1.5+ dla chat/notyfikacji |
| **Video streaming / live** | Zbyt kosztowne; poza core value | v2.0+ jako premium |
| **Music distribution** | Złożoność licencyjna; inne firmy robią to lepiej | Integracja z Distrokid/TuneCore zamiast own |
| **E-commerce / merch shop** | Poza core; lepiej integrować (Shopify/Printful) | Integration v1.5+ |
| **Advanced analytics / BI** | Proste metryki wystarczą; Mixpanel/PostHog integration | v1.5+ |
| **Custom CMS** | Unnecessary; Next.js + Prisma wystarczają | Nigdy |
| **Exit strategy documentation** | Przedwczesne; focus na budowę wartości | Po Series A |
| **Multi-database support** | Prisma abstrahuje; SQLite dev + Postgres prod wystarczą | Nigdy |

---

## Konsekwencje złego scope'u

| Scenariusz | Konsekwencja | Prawdopodobieństwo |
|-----------|-------------|-------------------|
| Dodanie monetyzacji przed auth | Brak security = leakage, fraud risk | WYSOKIE jeśli niekontrolowane |
| Budowa mobile przed web stability | Podwójna praca na bugach w obu środowiskach | ŚREDNIE |
| Mikroserwisy przed 1000 users | Over-engineering; wolniejszy dev, więcej bugów | WYSOKIE |
| Dokumentacja 50 docs bez priorytetu | Paraliż przez analizę; zero kodu | WYSOKIE → mitygowane przez fale |
| Features bez testów | Cascading failures przy refaktoringu | WYSOKIE |

---

## Rekomendacje priorytetów

1. **P0 blokuje P1**: Auth i stabilizacja API muszą być przed HHU features
2. **P1 blokuje P2**: Shared packages i CI muszą być przed AI Studio i RFG
3. **Dokumentacja nie blokuje drobnych fixów**: Env cleanup, route fix, CI setup mogą iść równolegle
4. **Każda nowa inicjatywa wymaga wpisu tutaj**: Jeśli nie ma jej w TERAZ — nie robić bez decyzji Founder

---

## Ryzyka

| # | Ryzyko | Mitygacja |
|---|--------|-----------|
| R1 | Presja na dodawanie features spoza scope | Referencja do tego dokumentu; Founder gatekeeping |
| R2 | Funkcje z PÓŹNIEJ przesuwają się do TERAZ bez analizy | Wymóg aktualizacji tego dokumentu + wpisu w Decision Register |
| R3 | Wyłączenia zbyt restrykcyjne — rynek wymaga zmian | Kwartalny review scope z aktualizacją granic |

---

## Founder Decision Notes

- [ ] **FDN-09**: Potwierdzić, że monetyzacja NIE wchodzi do MVP (v1.0)
- [ ] **FDN-10**: Potwierdzić wyłączenie mobile app do v2.0+

---

## Dokumenty zależne

- ← [02] Strategic Decision Register (decyzje definiujące scope)
- → [05] Module Dependency Graph (kolejność wynikająca ze scope)
- → [10] 90-Day Execution Alignment (harmonogram bazujący na scope)
- → [33] HHU MVP Scope v1 (szczegółowy scope HHU)
