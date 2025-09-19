# API Integration Project

A Node.js API integration service that syncs dog breed data with a MySQL database and Redis cache.

## Prerequisites

- Docker (or Docker Desktop)
- Node.js 16+ and npm

## Environment variables

Copy env file from .env.example to .env and set the environment variables.

If you prefer a `.env` file, put the same keys in `.env` at the project root.

## Start required services with Docker

### Docker Compose 

```
docker compose up -d
```

## Run database migrations (Knex)

Once MySQL is up and environment variables are set (either exported or in `.env`), run migrations:

```
# install dependencies if not already
npm install

# run migrations
npx knex migrate:latest
```

To rollback:

```
npx knex migrate:rollback
```

## Start the app

```
# development with auto-reload
npm run dev

# or production mode
npm start
```
