# AI Resume Analyzer

> **Phase 1 — Initial Project Setup.** A production-ready monorepo scaffold for a
> full-stack TypeScript application, built incrementally in phases.

[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)

---

## 📌 Current Status: Phase 1

This phase delivers **only** the initial project scaffold: a working frontend, a
working backend with a single health-check endpoint, and all the tooling
(TypeScript, ESLint, Prettier, path aliases) needed to build on top of it in
later phases.

**Not implemented yet (by design):** authentication, database, AI/LLM
integration, resume upload, resume analysis, dashboard, profile, chat, history.
See [`docs/ROADMAP.md`](./docs/ROADMAP.md).

---

## 🧱 Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- React Hook Form + Zod
- Lucide React (icons)
- shadcn/ui

**Backend**
- Node.js + Express
- TypeScript

**Tooling**
- ESLint + Prettier
- dotenv
- npm workspaces (monorepo)
- TypeScript path aliases (`@/*`, `@shared/*`)

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── client/               # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/ui # shadcn/ui components
│   │   ├── lib/           # utils, axios instance
│   │   ├── pages/         # Home page
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── server/               # Express + TypeScript backend
│   ├── src/
│   │   ├── config/env.ts
│   │   ├── routes/health.route.ts
│   │   ├── app.ts
│   │   └── index.ts
│   └── package.json
│
├── shared/               # Shared TypeScript types (client ⇄ server contract)
│   └── types/index.ts
│
├── docs/                 # Architecture, setup guide, roadmap
├── package.json          # Root workspace orchestration
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

```bash
# 1. Install all dependencies (root, client, server, shared)
npm install

# 2. Run both frontend and backend together
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |
| Health check | http://localhost:5000/api/health |

See [`docs/GETTING_STARTED.md`](./docs/GETTING_STARTED.md) for detailed setup,
environment variables, production builds, and troubleshooting.

---

## ✅ What's in Phase 1

### Frontend
A single **Home page** rendering exactly:

```
AI Resume Analyzer
Production Ready Initial Setup
```

No buttons, no forms, no other UI.

### Backend
A single endpoint:

```
GET /api/health
```

Response:

```json
{ "status": "ok" }
```

---

## 🗺️ Roadmap

This project is built **phase by phase** — each phase is a complete, working,
downloadable project. See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for what's
planned next (auth, database, resume upload, AI analysis, dashboard, etc.).

---

## 📄 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Getting Started Guide](./docs/GETTING_STARTED.md)
- [Roadmap](./docs/ROADMAP.md)

---

## 📜 License

Not yet specified — to be determined in a future phase.
