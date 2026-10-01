# Luxe Beauty

A modern full-stack salon platform for nails and hair — services, bookings, shop, cart, and checkout.

**Built by Lemy** · [facebook.com/lemuelowusuansah](https://www.facebook.com/lemuelowusuansah)

---

## Overview

Luxe Beauty is a production-grade template project for salon businesses.
It includes a complete frontend experience: browsable services, product
shop, cart, checkout, booking form, admin dashboard, dark mode, and a
cursor-reactive design system.

This repository is structured as a monorepo with a workspace-isolated
frontend, a Cloudflare Workers API, and a shared database package.

---

## Stack

**Frontend**

- Vite + React 19 + TypeScript
- React Router 7
- Tailwind CSS 4
- Zustand for cart and auth state
- TanStack Query for server data
- react-helmet-async for SEO

**Backend**

- Hono on Cloudflare Workers
- Neon Postgres
- Drizzle ORM
- Clerk for authentication
- Stripe for payments

**Tooling**

- pnpm workspaces
- ESLint 10 + TypeScript 6 strict mode
- GitHub Actions for CI
- Cloudflare Pages + Workers for deploy

---

## Project structure

luxe-beauty/
├── apps/
│ ├── web/ Vite + React frontend
│ └── api/ Hono on Cloudflare Workers
├── packages/
│ └── db/ Drizzle schema + migrations
├── docs/ GitHub Pages writeup
├── .github/
│ ├── workflows/ CI/CD pipelines
│ └── CODEOWNERS
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE



---

## Routes

| Path | Page |
|------|------|
| / | Home |
| /services | Services overview |
| /services/:slug | Individual service |
| /shop | Product catalogue |
| /shop/:slug | Product detail |
| /book | Booking form |
| /cart | Cart |
| /checkout | Checkout |
| /about | About |
| /contact | Contact |
| /colophon | Build writeup |
| /admin | Admin dashboard (auth required) |
| /auth | Sign in / Sign up |

---

## Local development

    pnpm install
    pnpm dev

Open http://localhost:5173

---

## Status

- Milestone 1 complete: monorepo, frontend, routing, cart, auth, dark mode.
- Milestone 2 in progress: Neon Postgres and Drizzle schema.

---

## License

MIT © Lemuel Owusu Ansah
