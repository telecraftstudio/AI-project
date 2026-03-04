# AI Genius Robot System

A production-ready, Dockerized full-stack AI robot platform with modular backend intelligence services and a futuristic React UI.

## Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/                # FastAPI routers + dependencies
│   │   ├── core/               # Config + logging
│   │   ├── db/                 # SQLAlchemy base + session
│   │   ├── models/             # ORM models
│   │   ├── schemas/            # Pydantic contracts
│   │   └── services/           # AI brain modules
│   ├── schema.sql              # SQL schema for PostgreSQL
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/         # UI modules (chat, memory, logs, avatar)
│   │   ├── services/           # API client
│   │   ├── types/              # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── tailwind/vite configs
└── docker-compose.yml
```

## Core Capabilities

- **AI Brain** orchestration pipeline (`AIBrain`) that sequences reasoning, emotion detection, decisioning, and memory persistence.
- **Memory System** with Redis short-term memory + PostgreSQL long-term memory.
- **Emotion Engine** sentiment-based emotion simulation (`Happy`, `Analyzing`, `Thinking`, `Concerned`).
- **Decision Engine** urgency/risk analysis for execution traces.
- **FastAPI API** with structured JSON logging.
- **React + Tailwind Frontend** featuring:
  - ChatGPT-style chat layout
  - Typing animation
  - Animated robot avatar
  - Live emotion indicator
  - Memory visualization panel
  - Logs panel

## API Endpoints

- `GET /health`
- `POST /api/v1/chat`
- `GET /api/v1/memory/long-term`
- `GET /api/v1/memory/short-term`

## Environment Variables

Backend example (`backend/.env.example`):

```env
APP_NAME=AI Genius Robot
API_PREFIX=/api/v1
DEBUG=false
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ai_robot
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_DB=0
LLM_PROVIDER=local
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
CORS_ORIGINS=http://localhost:5173
```

Frontend env variable:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## One-Command Startup

```bash
docker-compose up --build
```

Then open:
- Frontend: http://localhost:5173
- Backend docs: http://localhost:8000/docs

## Deployment Steps

1. Install Docker + Docker Compose plugin.
2. Clone repository.
3. (Optional) copy `backend/.env.example` to `backend/.env` and customize.
4. Run `docker-compose up --build -d`.
5. Verify health:
   - `curl http://localhost:8000/health`
   - open frontend in browser.
6. Scale behind reverse proxy (Nginx/Traefik) for production ingress.
7. Add TLS and secrets manager for API keys.

## Notes

- Database tables are auto-created on backend startup via SQLAlchemy metadata.
- LLM provider is structured to support external providers; local reasoning implementation is currently deterministic and production-safe by default.
