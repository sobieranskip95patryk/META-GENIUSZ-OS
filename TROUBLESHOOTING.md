# Troubleshooting Guide - Setup Issues

## Problem 1: Docker Desktop nie uruchomiony

### Rozwiązanie:

**Opcja A: Uruchom Docker Desktop**
1. Otwórz Windows Search i szukaj "Docker Desktop"
2. Kliknij, aby uruchomić
3. Czekaj 1-2 minuty aż się załaduje
4. Spróbuj ponownie: `docker-compose up -d`

**Opcja B: Zainstaluj WSL + Docker (jeśli Docker nie zainstalowany)**
```powershell
# W PowerShell jako Administrator:
wsl --install
# Restart komputera
# Zainstaluj Docker Desktop z: https://www.docker.com/products/docker-desktop
```

---

## Problem 2: pnpm Install - Permission Denied (EPERM)

### Przyczyna:
- Windows blokuje rename operacji
- Antywirus zakłóca operacje na plikach
- Problemy z uprawnieniami

### Rozwiązanie:

**Opcja 1: Uruchom PowerShell jako Administrator (ZALECANE)**

```powershell
# 1. Zamknij wszystkie okna PowerShell
# 2. Kliknij prawy przycisk na PowerShell
# 3. "Run as Administrator"
# 4. Przejdź do folderu:
cd d:\META-GENIUSZ-OS

# 5. Spróbuj insta
llor
pnpm install
```

**Opcja 2: Wyczyść cache i spróbuj ponownie**

```powershell
# Wyczyść pnpm cache
pnpm store prune

# Spróbuj bez force
pnpm install

# Jeśli znowu się nie uda, spróbuj z force:
pnpm install --force
```

**Opcja 3: Użyj npm zamiast pnpm**

```powershell
# npm nie ma takich problemów zwykle
npm install
```

**Opcja 4: Wyłącz antywirus tymczasowo**

- Czasami Windows Defender lub inny antywirus blokuje operacje
- Tymczasowo go wyłącz, zainstaluj, potem włącz z powrotem

---

## Problem 3: Docker Compose - PostgreSQL

Jeśli Docker jest uruchomiony, ale `docker-compose up` dalej ma problemy:

```powershell
# Sprawdź czy obraz PostgreSQL jest dostępny:
docker pull postgres:16-alpine

# Potem spróbuj ponownie:
docker-compose up -d
```

---

## Checklist - Co naprawić

- [ ] Uruchomić Docker Desktop
- [ ] PowerShell z uprawnieniami Administrator
- [ ] `pnpm install`
- [ ] `docker-compose up -d`
- [ ] `docker-compose exec api pnpm exec prisma migrate deploy`
- [ ] Sprawdzić logs: `docker-compose logs -f api`

---

## Jeśli wszystko zawiększ...

Mogę pomóc w:
1. **Lokalnej instalacji PostgreSQL** (zamiast Dockera)
2. **Ręcznym uruchamianiu aplikacji** bez dockera
3. **Debugowaniu problemów** z pnpm/npm

Daj znać, którą opcję wolisz!

---

**Data**: 11 marca 2026
