# Media Service

Serwis odpowiadający za zarządzanie multimediami, konwersję i przechowywanie plików.

## Features

- Upload i przechowywanie plików
- Konwersja obrazów
- Generowanie miniatur
- Optymalizacja mediów
- Obsługa różnych formatów

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## Testing

```bash
pnpm test
```

## API Endpoints

### Upload Media
- `POST /api/media/upload` - Przesłanie pliku
- `GET /api/media/:id` - Pobranie metadanych pliku
- `DELETE /api/media/:id` - Usunięcie pliku

### Image Operations
- `POST /api/media/:id/thumbnail` - Generowanie miniatury
- `POST /api/media/:id/resize` - Zmiana rozmiaru

## Architecture

```
.
├── src/
│   ├── controllers/    # Route handlers
│   ├── services/       # Business logic
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utilities
│   └── index.ts        # Entry point
├── tests/              # Test files
└── package.json
```

## Environment Variables

```
STORAGE_PROVIDER=local|s3|azure
STORAGE_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FORMATS=jpg,jpeg,png,gif,mp4,webm
```

## Performance

- Async file processing
- Image optimization
- Caching for thumbnails
- Rate limiting on uploads

## Security

- File type validation
- Virus scanning (optional)
- Secure file storage
- Download rate limiting
