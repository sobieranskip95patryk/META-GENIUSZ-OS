# admin — Admin Control Panel

Operacyjny panel zarządzania użytkownikami, moderacją, analityką i KPI META-GENIUSZ OS.

**Framework**: Next.js 16 (App Router) | **Status**: 🔧 Scaffold

---

## Opis

`apps/admin` to moduł operacyjny META-GENIUSZ OS — centrum zarządzania całą platformą. Przeznaczony dla administratorów i ops team do monitorowania, moderacji i zarządzania systemem.

## Planowane funkcje

### Zarządzanie użytkownikami
- [ ] Lista użytkowników z filtrowaniem i wyszukiwaniem
- [ ] Podgląd i edycja profili
- [ ] Blokowanie / zawieszanie kont
- [ ] Role i uprawnienia

### Moderacja treści
- [ ] Kolejka treści do moderacji
- [ ] Flagowanie postów i komentarzy
- [ ] Historia decyzji moderacyjnych
- [ ] Raporty od użytkowników

### Analityka i KPI
- [ ] Dashboard z kluczowymi metrykami
- [ ] Aktywni użytkownicy (DAU/MAU)
- [ ] Wzrost rejestracji
- [ ] Engagement rate per moduł
- [ ] Przychody (po wdrożeniu monetyzacji)

### Operacje systemowe
- [ ] Logi systemowe
- [ ] Status serwisów
- [ ] Zarządzanie feature flags
- [ ] Backup i eksport danych

## Aktualna implementacja

```
src/app/
├── page.tsx    ← Placeholder (tytuł + opis modułu)
└── layout.tsx
```

## Uruchomienie

```bash
pnpm dev:admin    # → http://localhost:3000
```

## Stack

- **Next.js** 16.1.6
- **React** 19.2.3
- **Tailwind CSS** 4.x
- **TypeScript** 5.x (strict)

> ⚠️ Panel administracyjny wymaga uwierzytelniania i autoryzacji (planowane w v0.2.0).

## Roadmap

Implementacja w fazie **v1.0.0** — szczegóły w [`docs/roadmap/roadmap.md`](../../docs/roadmap/roadmap.md).
