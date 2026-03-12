# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅        |

## Reporting a Vulnerability

Zgłoś podatność przez email: **security@meta-geniusz.io**

1. Nie twórz publicznego issue dla podatności.
2. Podaj szczegóły: środowisko, kroki reprodukcji, ocenę wpływu.
3. Odpowiemy w ciągu **48 godzin** i dostarczymy patch w ciągu 7 dni roboczych.

## Security Standards

- Dependencies audytowane przy każdym PR przez `npm audit --audit-level=moderate`
- JWT / session security via Better Auth
- Rate limiting: 100 req/15 min per IP
- Input validation przez Zod (server-side)
- SQL injection ochrona przez Prisma ORM
- Helmet.js + CORS na każdym żądaniu HTTP
- Secrets tylko jako zmienne środowiskowe (nigdy w kodzie / repo)

## CVE Disclosure History

_Brak aktywnych CVE._
