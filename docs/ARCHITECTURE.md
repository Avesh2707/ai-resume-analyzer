# Architecture Overview

## Phase 1 — Initial Setup

This document describes the architecture of **AI Resume Analyzer** as it stands after
Phase 1. It will be extended as new phases are added.

## Monorepo Layout

The project is an npm **workspaces** monorepo with three workspaces:

```
AI-Resume-Analyzer/
├── client/    → React + TypeScript + Vite frontend
├── server/    → Node.js + Express + TypeScript backend
└── shared/    → TypeScript types shared by client and server
```

Using workspaces means a single `npm install` at the repo root installs dependencies
for all three packages and links them together, and a single `npm run dev` boots the
whole stack.

## Data Flow (Phase 1)

```
┌─────────────┐          GET /api/health          ┌─────────────┐
│   Browser   │ ───────────────────────────────▶  │   Express   │
│  (Vite dev  │                                    │   Server    │
│   server)   │ ◀─────────────────────────────── │  (port 5000)│
└─────────────┘        { "status": "ok" }          └─────────────┘
     :5173
```

- The Vite dev server proxies any request to `/api/*` to `http://localhost:5000`
  (configured in `client/vite.config.ts`), so the frontend never needs to hardcode
  the backend's host/port in development.
- In Phase 1, the **Home page does not call the API** — it only renders static text.
  The health endpoint exists on the backend and is proxy-ready for future phases.

## Shared Types

The `shared/` workspace holds TypeScript interfaces used by both sides of the stack
(e.g. `HealthResponse`). Both `client` and `server` resolve `@shared/*` as a path
alias pointing at this workspace, so a single source of truth defines the shape of
any data crossing the network boundary.

## Path Aliases

| Alias       | Resolves to        | Used in         |
|-------------|---------------------|-----------------|
| `@/*`       | `<workspace>/src/*` | client & server |
| `@shared/*` | `shared/*`          | client & server |

**Server note:** aliases work at dev-time via `tsx` (esbuild-powered) and are
rewritten to relative `require()` paths at build-time via `tsc-alias`, so the
compiled `dist/` output has zero runtime dependency on alias resolution.

## Why this stack

| Concern              | Choice                          | Reasoning |
|-----------------------|----------------------------------|-----------|
| Frontend build tool   | Vite                             | Fast HMR, first-class TS/React support |
| Styling               | Tailwind CSS + shadcn/ui         | Utility-first CSS with accessible, unstyled component primitives that are copied into the repo (not an opaque dependency) |
| Data fetching (future)| TanStack Query + Axios           | Caching, request de-duplication, and a consistent HTTP client for future API calls |
| Forms (future)        | React Hook Form + Zod            | Performant forms with schema-based validation |
| Backend framework     | Express                          | Minimal, well-understood, easy to extend with middleware |
| Type safety           | TypeScript everywhere            | Shared contracts between client/server via the `shared` workspace |

## Not Implemented Yet

Per the Phase 1 scope, the following are intentionally **not** part of this codebase:

- Authentication / login / register / JWT
- Database (MongoDB or otherwise)
- AI/LLM integration (Gemini, OpenAI, etc.)
- Resume upload or analysis logic
- Dashboard, profile, chat, or history features
- Any API route other than `GET /api/health`

These will be introduced incrementally in later phases, each shipped as a complete,
runnable project.
