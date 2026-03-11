# ⚠️ SYSTEM CONFIGURATION ISSUE - WYMAGANA AKCJA

## Problem

Podczas próby zainstalowania zależności napotkałem **problemy z uprawnieniami systemu Windows**, które uniemożliwiają prawidłową pracę zarówno `pnpm` jak i `npm`.

**Błędy:**
```
EPERM: operation not permitted, rename
ENOENT: no such file or directory, rename
```

**Przyczyna:**
- Brak odpowiednich uprawnień do folderu `node_modules`
- Antywirus może blokować operacje
- Brak dostępu administratora

---

## ✅ Rozwiązanie - KROK PO KROKU

### KROK 1️⃣: Uruchom PowerShell z Uprawnieniami Administratora

1. **Naciśnij:** `Win + X` (lub kliknij prawy przycisk Start)
2. **Kliknij:** "Windows PowerShell (Admin)" lub "Terminal (Admin)"
3. **Kliknij:** "Yes" w oknie UAC
4. **Wpisz:**

```powershell
cd d:\META-GENIUSZ-OS
```

### KROK 2️⃣: Wyczyść Stare Pliki

```powershell
# W PowerShell jako Administrator:
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".pnpm-store" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Cleanup complete"
```

### KROK 3️⃣: Wyłącz Antywirus (Tymczasowo)

**Dla Windows Defender:**
1. Ustawienia > Bezpieczeństwo i konserwacja
2. Ochrona przed wirusami i zagrożeniami
3. Zarządzaj ustawieniami
4. Wyłącz (Real-time protection)

➡️ **Ważne**: Włącz z powrotem po instalacji!

### KROK 4️⃣: Zainstaluj Zależności (Jedna z Opcji)

#### Opcja A: npm (ZALECANE)

```powershell
npm install
```

#### Opcja B: pnpm

```powershell
pnpm install
```

#### Opcja C: Jeśli wcześniejsze zawodzą

```powershell
npm ci --legacy-peer-deps
```

### KROK 5️⃣: Weryfikacja

```powershell
# Sprawdź czy zainstalowano
npm list | head -20

# Albo:
dir node_modules | head -20
```

---

## 📦 Po Zainstalowaniu Zależności

```powershell
# 1. Uruchom Docker Desktop (GUI aplikacja)

# 2. Sprawdź czy Docker działa:
docker --version

# 3. Uruchom kontenery:
docker-compose up -d

# 4. Czekaj aż PostgreSQL będzie ready:
docker-compose logs postgres

# 5. Uruchom migracje:
docker-compose exec api npm exec prisma migrate deploy

# 6. Sprawdź czy API odpowiada:
curl http://localhost:3000/health

# 7. Uruchom testy:
npm test
```

---

## 🆘 Jeśli Dalej Nie Działa

### Opcja 1: Użyj WSL (Windows Subsystem for Linux)

```powershell
# Zainstaluj WSL:
wsl --install

# Po restarcie, wejdź do WSL:
wsl

# Przenieś projekt:
cd /mnt/d/META-GENIUSZ-OS

# Zainstaluj Node w WSL:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Zainstaluj zależności:
npm install
```

### Opcja 2: Cofnij System do Czystego Stanu

```powershell
# Jeśli nic nie działa, spróbuj:
npm cache clean --force
pnpm store prune

# Potem zainstaluj ponownie
npm install
```

### Opcja 3: Zainstaluj PostgreSQL Lokalnie (Bez Docker)

1. Pobierz: https://www.postgresql.org/download/windows/
2. Zainstaluj PostgreSQL 16
3. Podczas instalacji zapamiętaj hasło superuser'a
4. W `.env` zmień DATABASE_URL na:
   ```
   DATABASE_URL=postgresql://postgres:twoje_haslo@localhost:5432/meta_geniusz_os
   ```

---

## 📝 Checklist - Co Zrobić

- [ ] PowerShell z Admin uprawnieniami
- [ ] Wyczyść node_modules i lock files
- [ ] Wyłącz antywirus tymczasowo
- [ ] `npm install`
- [ ] Włącz antywirus z powrotem
- [ ] Uruchom Docker Desktop
- [ ] `docker-compose up -d`
- [ ] Testuj API na http://localhost:3000

---

## 💾 Co Jest Gotowe (Niezależnie od Instalacji)

Wszystkie poniższe pliki/konfiguracje już istnieją i są gotowe:

✅ **Architektura i kod:**
- Express API z middleware'ami
- Prisma ORM z PostgreSQL schema
- React/Next.js aplikacje

✅ **Bezpieczeństwo:**
- JWT authentication
- Rate limiting
- CORS configuration

✅ **Testowanie:**
- Vitest unit tests
- Playwright E2E tests  
- Test fixtures

✅ **DevOps:**
- GitHub Actions workflows
- Docker & Docker Compose
- Environment configurations

✅ **Dokumentacja:**
- API Reference
- Deployment Guide
- Troubleshooting Guide

✅ **Shared Packages:**
- @meta-geniusz/types
- @meta-geniusz/utils
- @meta-geniusz/config

---

## 📞 Need Help?

Daj znać jaką opcję wybierasz:
1. **Admin PowerShell + npm install**
2. **WSL Setup**
3. **PostgreSQL Lokalnie + bez Docker**

Będę Ci pomagał krok po kroku! 🚀

---

**Status**: 🔴 WAITING FOR SYSTEM SETUP
**Data**: 11 marca 2026
