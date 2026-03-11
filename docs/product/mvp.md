# META-GENIUSZ OS — Specyfikacja MVP

## Cel MVP

Dostarczenie pierwszej działającej wersji platformy META-GENIUSZ OS, która demonstruje kluczowe możliwości systemu i pozwala na onboarding pierwszych twórców.

## Scope MVP (v1.0.0)

### ✅ Zrealizowane (v0.1.0)

- [x] Monorepo setup (Turborepo + pnpm)
- [x] Centralny hub (`apps/web`) z dashboardem modułów
- [x] Backend API (Express + Prisma) z endpointami User/Post
- [x] Baza danych SQLite z migracją (User, Post)
- [x] HHU Feed — przeglądanie i tworzenie postów
- [x] HHU Profile — dynamiczne profile użytkowników (SSR)
- [x] Ciemny motyw UI z Tailwind CSS 4

### 🔲 Do zrealizowania w MVP (v1.0.0)

#### Uwierzytelnianie
- [ ] Rejestracja konta (email + hasło)
- [ ] Logowanie / wylogowanie
- [ ] JWT tokens lub NextAuth.js
- [ ] Ochrona endpointów API (middleware auth)
- [ ] Sesje użytkownika na frontendzie

#### Hip Hop Universe
- [ ] Upload avatara/zdjęcia profilowego
- [ ] Edycja bio użytkownika
- [ ] System polubień postów
- [ ] Komentarze pod postami
- [ ] Follow/unfollow użytkowników

#### Rocket Fuell Girls (RFG)
- [ ] Strona główna RFG
- [ ] Profil modelki/muse
- [ ] Upload portfolio (obrazy)
- [ ] Galeria zdjęć

#### AI Studio — pierwsze narzędzie
- [ ] Generator bio (wywołanie modelu AI)
- [ ] Generator caption do postów
- [ ] Podstawowy interfejs promptów

#### Infrastruktura
- [ ] Zmienne środowiskowe (API URL nie hardcoded)
- [ ] GitHub Actions CI (build + lint + typecheck)
- [ ] Podstawowe testy (Vitest dla API)
- [ ] Naprawienie zduplikowanego route w API

## Kryteria akceptacji MVP

1. **Użytkownik może się zarejestrować i zalogować**
2. **Użytkownik może opublikować post w HHU Feed**
3. **Profil użytkownika jest widoczny publicznie**
4. **AI Studio wygeneruje przynajmniej jedno bio**
5. **Aplikacja działa na środowisku produkcyjnym (Vercel/Railway)**
6. **CI pipeline przechodzi na każdy PR**

## Techniczne priorytety MVP

| Priorytet | Zadanie | Estymacja |
|-----------|---------|-----------|
| P0 | Auth (JWT/NextAuth) | 3 dni |
| P0 | Naprawa duplikatu route w API | 1h |
| P0 | Env variables (nie hardcode localhost) | 2h |
| P1 | HHU — avatar, edycja profilu | 2 dni |
| P1 | HHU — likes, komentarze | 3 dni |
| P1 | AI Studio — generator bio | 2 dni |
| P2 | RFG — profil i galeria | 3 dni |
| P2 | GitHub Actions CI | 1 dzień |
| P2 | Testy Vitest dla API | 2 dni |
| P3 | Deployment (Vercel + Railway) | 1 dzień |

## Ograniczenia MVP

- SQLite jako baza (migracja do PostgreSQL w v1.1.0)
- Brak płatności/subskrypcji (v2.0.0)
- AI z darmowego tier API (limity)
- Brak aplikacji mobilnej
- Brak moderacji treści (ręczna przez admin panel)
