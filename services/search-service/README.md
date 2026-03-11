# Search Service

Serwis odpowiadający za wyszukiwanie w całym systemie.

## Features

- Full-text search
- Filtering
- Sorting
- Faceted search
- Search suggestions
- Indexing

## Technology

- Elasticsearch / MeiliSearch / Typesense
- Real-time indexing
- Advanced query DSL

## API Endpoints

- `GET /api/search` - Wyszukaj zawartość
- `GET /api/search/suggestions` - Sugestie wyszukiwania
- `POST /api/search/index/rebuild` - Przebuduj index

## Configuration

```
SEARCH_ENGINE=elasticsearch|meilisearch|typesense
SEARCH_HOST=localhost:9200
SEARCH_INDEX_PREFIX=meta_geniusz_
```
