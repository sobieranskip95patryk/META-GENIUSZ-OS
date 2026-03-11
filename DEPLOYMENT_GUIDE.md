# Deployment Guide - META-GENIUSZ OS

Przewodnik konfiguracji i deployment'u systemu META-GENIUSZ OS.

---

## 🟢 Przygotowanie Środowiska

### 1. Wymagania Systemowe

```bash
# Node.js 18+ (zalecane 20.x)
node --version

# PNPM 10+
npm install -g pnpm
pnpm --version

# Docker & Docker Compose
docker --version
docker-compose --version

# PostgreSQL 16+
# Już uwzględniony w docker-compose.yml
```

### 2. Zmienne Środowiskowe

Skopiuj `.env.example` do `.env` w `apps/api/`:

```bash
cp apps/api/.env.example apps/api/.env
```

Edytuj `apps/api/.env`:

```env
# Production Database
DATABASE_URL=postgresql://user:password@postgres:5432/meta_geniusz_os

# API
PORT=3000
NODE_ENV=production

# JWT (ZMIEŃ NA LOSOWY STRING 32+ ZNAKÓW!)
JWT_SECRET=your_super_secret_key_change_me_in_production_please

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Redis (opcjonalnie)
REDIS_URL=redis://localhost:6379
```

---

## 🐳 Deployment Local

### 1. Development Mode

```bash
# Przejdź do głównego katalogu projektu
cd d:\META-GENIUSZ-OS

# Zainstaluj zależności (pomijamy problemy EPERM)
pnpm install

# Uruchom Docker Compose
docker-compose up

# W innym terminalu:
# API będzie dostępne na: http://localhost:3000
# Web będzie dostępne na: http://localhost:3001
# PostgreSQL będzie dostępne na: localhost:5432
```

### 2. Baza Danych

```bash
# W kontenerze API:
docker-compose exec api npm run db:generate
docker-compose exec api npm run db:migrate

# Lub bezpośrednio:
cd apps/api
pnpm exec prisma migrate deploy
```

### 3. Seed Database (opcjonalnie)

```bash
# Tworzy demo dane
docker-compose exec api npm run db:seed
```

---

## ✅ Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
pnpm test:e2e
```

### Coverage Report

```bash
pnpm test:coverage
```

---

## 🚀 Production Deployment

### 1. Build Images

```bash
docker build -f infra/docker/Dockerfile.api -t meta-geniusz-api:latest .
docker build -f infra/docker/Dockerfile.web -t meta-geniusz-web:latest .
```

### 2. Push to Registry

```bash
# Dla example Docker Hub:
docker tag meta-geniusz-api:latest yourusername/meta-geniusz-api:latest
docker push yourusername/meta-geniusz-api:latest

docker tag meta-geniusz-web:latest yourusername/meta-geniusz-web:latest
docker push yourusername/meta-geniusz-web:latest
```

### 3. Deploy to Kubernetes (przykład)

Utwórz `k8s-deploy.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: meta-geniusz
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: meta-geniusz
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: yourusername/meta-geniusz-api:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: secret
```

Zastosuj:

```bash
kubectl apply -f k8s-deploy.yaml
```

### 4. Deploy z GitHub Actions

Push do `main` branch automatycznie wyzwoli:

1. Linting
2. Type checking
3. Unit tests
4. E2E tests
5. Build & push images
6. Deploy do produkcji

---

## 🔒 Security Checklist

- [ ] Zmienij `JWT_SECRET` na losowy 32+ znakowy string
- [ ] Skonfiguruj `ALLOWED_ORIGINS` dla CORS
- [ ] Użyj silnych haseł do bazy danych
- [ ] Włącz HTTPS
- [ ] Skonfiguruj WAF (Web Application Firewall)
- [ ] Zmień domyślne hasła w Docker Compose
- [ ] Rotate JWT secrets regularnie
- [ ] Monitoruj logi zabezpieczeń

---

## 📊 Monitoring

### Health Checks

```bash
# API health
curl http://localhost:3000/health

# Database
curl http://localhost:3000/db/health
```

### Logs

```bash
# Docker logs
docker-compose logs -f api

# Kubernetes logs
kubectl logs -f deployment/api -n meta-geniusz
```

---

## 🛠️ Troubleshooting

### Błąd: Port już w użyciu

```bash
# Zmień port w docker-compose.yml lub .env
PORT=3000  # Zamień na inny port np. 3001
```

### Błąd: Migracja bazy danych nieudana

```bash
# Reset bazy danych
docker-compose down -v
docker-compose up
```

### Błąd: Dependencies zainstalują się zbyt długo

```bash
# Clear pnpm cache
pnpm store prune
pnpm install --frozen-lockfile
```

---

## 📞 Support

Dla problemów:

1. Sprawdź logi: `docker-compose logs`
2. Sprawdź zmienne środowiskowe: `cat apps/api/.env`
3. Uruchom testy: `pnpm test`
4. Sprawdź dokumentację: `README.md`

---

**Ostatnia aktualizacja**: 11 marca 2026
