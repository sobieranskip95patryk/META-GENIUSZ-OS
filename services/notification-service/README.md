# Notification Service

Serwis odpowiadający za przesyłanie powiadomień do użytkowników through various channels.

## Features

- Push notifications
- Email notifications
- SMS notifications (optional)
- Notification preferences
- Notification history

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## API Endpoints

- `POST /api/notifications/send` - Wysłanie powiadomienia
- `GET /api/notifications` - Lista powiadomień użytkownika
- `PUT /api/notifications/:id/read` - Oznaczenie jako przeczytane
- `DELETE /api/notifications/:id` - Usunięcie powiadomienia

## Event-driven Architecture

Serwis nasłuchuje zdarzeń z:
- User actions (follow, like, comment)
- System events (maintenance, updates)
- Custom events from other services

## Message Queue

- Redis Streams lub Bull
- Async processing
- Retry logic
- Dead letter queue
