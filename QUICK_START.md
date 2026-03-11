# Quick Setup Guide - Krótkie Instrukcje Setup

## 🚀 Szybki Start (bez Docker)

Jeśli Docker nie działa, możesz przygotować projekt lokalnie:

### Krok 1: Przygotowanie Kodu ✅

Kod został już przygotowany. Pliki konfiguracyjne są gotowe:

```
✅ apps/api/.env                      - Environment variables
✅ apps/api/prisma/schema.prisma      - PostgreSQL schema
✅ .github/workflows/*.yml             - CI/CD pipelines
✅ packages/types, utils, config      - Shared packages
✅ services/*                         - Service modules
✅ docker-compose.yml                 - Local development setup
```

### Krok 2: Zainstaluj Zależności

próbuj poniższych komend w tej kolejności:

```powershell
# Opcja A: npm (jeśli pnpm ma problemy)
npm install

# Opcja B: pnpm (spróbuj najpierw bez --force)
pnpm install

# Opcja C: pnpm z force (jeśli Opcja B nie zadziała)
pnpm install --force
```

### Krok 3: Uruchom Docker Desktop

Jeśli masz Docker Desktop:

```powershell
# 1. Uruchom Docker Desktop (aplikacja GUI)
# 2. Czekaj aż się załaduje (1-2 minuty)
# 3. Sprawdź:
docker --version

# 4. Uruchom kontenery:
docker-compose up -d

# 5. Czekaj aż PostgreSQL będzie gotowy:
docker-compose logs postgres

# 6. Uruchom migracje:
docker-compose exec api pnpm exec prisma migrate deploy
```

### Krok 4: Testy (bez bazy danych)

Możesz uruchomić testy kodu bez bazy danych:

```powershell
# Typ checking
pnpm typecheck

# Linting
pnpm lint

# Build
pnpm build
```

---

## 📋 Status Wdrożenia

| Etap | Status | Opis |
|------|--------|------|
| **Code Preparation** | ✅ DONE | Wszystkie pliki gotowe |
| **Dependencies Install** | 🔄 IN PROGRESS | Spróbuj poniżej |
| **Docker Setup** | ⏳ PENDING | Wymaga Docker Desktop |
| **Database Migration** | ⏳ PENDING | Po Docker setup |
| **Local Testing** | ⏳ PENDING | Po wszystkim |

---

## 🛠️ Jeśli Się Uwięzisz

Jeśli instalacja nie działa:

### 1. Spróbuj z Administrator Access

```powershell
# Kliknij prawy przycisk: "Run as administrator"
# Potem:
cd d:\META-GENIUSZ-OS
pnpm install
```

### 2. Sprawdź Problemy z Antywirusem

- Windows Defender lub inny antywirus może blokować
- Tymczasowo wyłącz, spróbuj, włącz z powrotem

### 3. Użyj npm zamiast pnpm

```powershell
npm install
npm run build
npm run lint
```

### 4. Pomiń pnpm całkowicie

Jeśli pnpm nie chce pracować:

```powershell
npm install -g pnpm@latest
pnpm install
# Jeśli dalej nie działa:
npm install  # Wróć do npm
```

---

## 📞 Co Jest Gotowe?

✅ **Kompletna architektura**
✅ **Bezpieczeństwo (JWT + Rate Limiting)**
✅ **Testy (Vitest + Playwright)**
✅ **CI/CD (GitHub Actions)**
✅ **Docker support**
✅ **Dokumentacja**

❌ **Czego brakuje na tym etapie:**
- Zainstalowanych npm packages (z powodu problemów Windows)
- Uruchamiającej się bazy danych PostgreSQL
- Uruchomionych testów

---

## 🎯 Następne Kroki

1. Zainstaluj dependencies (npm lub pnpm)
2. Uruchom Docker Desktop
3. `docker-compose up -d`
4. `docker-compose exec api pnpm exec prisma migrate deploy`
5. API będzie dostępne na http://localhost:3000

---

**Status**: Ready for installation
**Data**: 11 marca 2026
