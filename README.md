# Tomatometro

Public sentiment polling platform for electoral candidates.

## Stack

- Next.js 16
- TypeScript
- Vercel KV (Redis)

## Architecture

```
src/
├── data/           # Static data (candidates, debates)
├── lib/            # Core logic (scoring, storage)
├── app/api/        # REST endpoints
└── types/          # TypeScript definitions
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/votos` | POST | Submit vote |
| `/api/ranking` | GET | Get ranked candidates |
| `/api/candidatos` | GET | List all candidates |
| `/api/stats` | GET | Platform statistics |

## Scoring

```typescript
score = (frescos / (frescos + podridos)) * 100
```

Default score when no votes: 50

## Rate Limiting

- 100 votes per hour per device fingerprint
- Session-based duplicate vote prevention (24h TTL)

## Environment Variables

```bash
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

## License

Proprietary
