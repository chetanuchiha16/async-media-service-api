# Async Media Service

A full-stack media sharing app with a FastAPI backend and a Next.js frontend. The backend handles authentication, post metadata, ImageKit uploads, PostgreSQL persistence, and API docs. The frontend provides login, signup, authenticated feed, upload UI, theming, and a generated TypeScript API client.

## Tech Stack

Backend:

- FastAPI
- SQLAlchemy async engine
- PostgreSQL via `asyncpg`
- FastAPI Users with JWT auth
- ImageKit for media uploads
- `uv` for Python dependency management

Frontend:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI components
- Generated API client under `frontend/client`

## Repository Layout

```text
.
|-- backend/              # FastAPI application
|   |-- app/
|   |   |-- core/         # settings, database setup, base repository helpers
|   |   |-- images/       # ImageKit configuration schema
|   |   |-- post/         # post models, schemas, repository, routes
|   |   `-- users/        # FastAPI Users models, schemas, auth setup
|   |-- main.py           # local uvicorn entrypoint
|   `-- pyproject.toml
|-- frontend/             # Next.js application
|   |-- app/              # routes and layout
|   |-- client/           # generated API client
|   |-- components/       # app and UI components
|   `-- package.json
`-- README.md
```

## Prerequisites

- Python compatible with `backend/pyproject.toml` (`>=3.14`)
- `uv`
- Node.js and npm
- PostgreSQL
- ImageKit account credentials

## Backend Setup

From the backend directory:

```bash
cd backend
uv sync
```

Create `backend/.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=async_media_service

AUTH_SECRET=change-me-to-a-long-random-secret

IMAGEKIT_PRIVATE_KEY=private_xxx
IMAGEKIT_PUBLIC_KEY=public_xxx
IMAGEKIT_URL=https://ik.imagekit.io/your_imagekit_id
```

Start the API:

```bash
uv run main.py
```

The backend runs at `http://localhost:8000`.

Useful API links:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

## Frontend Setup

From the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

The generated client currently points at `http://localhost:8000`, so keep the backend running on port `8000` while using the app locally.

## Development Commands

Backend:

```bash
cd backend
uv sync
uv run main.py
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Main API Surface

Authentication routes are provided by FastAPI Users:

- `POST /auth/register`
- `POST /auth/jwt/login`
- `POST /auth/jwt/logout`
- `GET /auth/me`
- `POST /auth/request-verify-token`
- `POST /auth/verify`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Post routes:

- `POST /api/posts/upload`
- `GET /api/posts/feed?limit=...`
- `DELETE /api/posts/delete?id=...`

Protected routes expect a bearer token:

```http
Authorization: Bearer <access_token>
```

## Notes

- Database tables are created during FastAPI startup via the app lifespan hook.
- Uploaded files are temporarily written to the OS temp directory, sent to ImageKit, and then removed.
- Post creation writes a lightweight audit entry to `backend/post_audit.log`.
- CORS currently allows `http://localhost:3000`.
- The frontend stores the access token in an `access_token` cookie and attaches it to generated client requests.

## Troubleshooting

If the frontend cannot reach the API, confirm the backend is running at `http://localhost:8000`.

If backend startup fails with missing settings, check that `backend/.env` contains every variable listed above.

If media uploads fail, verify the ImageKit keys and URL endpoint.
