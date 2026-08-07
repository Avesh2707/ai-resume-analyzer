# Getting Started

## Prerequisites

- Node.js **18+**
- npm **9+** (ships with Node 18/20)

## 1. Install dependencies

From the **repository root** (not inside `client/` or `server/`):

```bash
npm install
```

This installs dependencies for the root, `client`, `server`, and `shared`
workspaces in one pass.

## 2. (Optional) Configure environment variables

Copy the example env files if you want to override defaults:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Defaults work out of the box with no `.env` files present.

## 3. Run the app

From the repository root:

```bash
npm run dev
```

This starts both services concurrently:

| Service | URL                          |
|---------|-------------------------------|
| Client  | http://localhost:5173         |
| Server  | http://localhost:5000         |
| Health  | http://localhost:5000/api/health |

You can also run each independently:

```bash
npm run dev:client   # client only
npm run dev:server   # server only
```

## 4. Verify

- Open http://localhost:5173 — you should see:
  - **AI Resume Analyzer**
  - **Production Ready Initial Setup**
- Open http://localhost:5000/api/health — you should see:
  ```json
  { "status": "ok" }
  ```

## 5. Build for production

```bash
npm run build
```

- `client/dist` — static frontend build (servable by any static host)
- `server/dist` — compiled Node.js backend, run with `npm run start --workspace=server`

## Linting & Formatting

```bash
npm run lint      # ESLint across client + server
npm run format    # Prettier, writes changes
```

## Troubleshooting

- **Port already in use**: change `PORT` in `server/.env` and/or the `server.port`
  value in `client/vite.config.ts`.
- **`npm install` run inside `client/` or `server/` directly**: this still works
  since each is a valid npm package, but running it from the root is recommended
  so workspace linking (e.g. the `shared` package) is set up correctly.
