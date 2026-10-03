<p align="center">
  <a href="https://dojocoding.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="docs/assets/banner-light.svg">
      <img alt="Tomatometro by Dojo Coding: Sentiment polling for electoral candidates" src="docs/assets/banner-light.svg" width="100%">
    </picture>
  </a>
</p>

# Tomatometro

**The voting, scoring and ranking API of Tomatometro, where the public rates electoral candidates as fresh or rotten.**

Public sentiment polling platform for electoral candidates.

[![License: Proprietary](https://img.shields.io/badge/license-Proprietary-FF7151?labelColor=201E3D)](#license) [![Framework: Next.js](https://img.shields.io/badge/framework-Next.js-201E3D?labelColor=201E3D)](#stack) [![Storage: Vercel KV](https://img.shields.io/badge/storage-Vercel%20KV-201E3D?labelColor=201E3D)](#stack)

[API endpoints](#api-endpoints) · [Scoring](#scoring) · [Architecture](#architecture) · [Report an issue](https://github.com/DojoCodingLabs/tomatometro-public/issues/new)

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

Proprietary. Built by [Dojo Coding](https://dojocoding.io).

<p align="center">
  <a href="https://dojocoding.io"><img src="docs/assets/dojocoding-mark.png" alt="Dojo Coding" width="48"></a>
</p>
