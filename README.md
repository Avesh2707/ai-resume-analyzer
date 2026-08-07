# AI Resume Analyzer

> **Phase 1 — Initial Project Setup.** A production-ready monorepo scaffold for a
> full-stack TypeScript application, built incrementally in phases.

[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)

---

## 📌 Current Status: Phase 2

Phase 2 builds a **professional SaaS application shell** on top of the Phase 1
scaffold: responsive navbar, collapsible sidebar, light/dark theme, React
Router page structure, and placeholder marketing pages. Everything is UI only
— no forms, no API calls beyond the existing health check, no business logic.

**Not implemented yet (by design):** authentication, database, AI/LLM
integration, resume upload, resume analysis, dashboard logic, chat, history.
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
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Sidebar, Footer, PublicLayout, AppShellLayout
│   │   │   ├── theme/      # ThemeProvider, ThemeToggle
│   │   │   └── ui/         # shadcn/ui primitives (Button, Card, Badge, Sheet, Separator)
│   │   ├── config/         # nav.ts, app-nav.ts (static nav item lists)
│   │   ├── lib/             # utils (cn), axios instance
│   │   ├── pages/           # Home, About, Features, Pricing, AppPreview, NotFound
│   │   ├── App.tsx          # Route tree
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

## ✅ What's in Phase 2

### Application shell
- **Navbar** — sticky, responsive, mobile menu opens a slide-in drawer (shadcn/ui `Sheet`)
- **Sidebar** — collapsible (icon-only collapsed state), used by the `/app` shell-preview route
- **Theme toggle** — light/dark, persisted via `localStorage`, respects system preference on first load
- **404 page** — friendly not-found screen with a way back home

### Pages (static placeholders, no functionality)
| Route | Page |
|---|---|
| `/` | Home — hero, illustrative stats, mock "annotated resume" visual |
| `/about` | About — mission/values placeholder |
| `/features` | Features — 6-item feature grid placeholder |
| `/pricing` | Pricing — 3-tier static pricing cards |
| `/app` | Application shell preview — sidebar + topbar layout, clearly labeled as a UI preview (not a real dashboard) |
| `*` | 404 Not Found |

No forms, no API calls beyond the Phase 1 health check, no auth, no database, no AI.

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
