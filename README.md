# Monster Rolodex

A small React + TypeScript app that fetches a list of "monsters" from an API and lets you search them by name. Originally scaffolded with Create React App; since migrated to a modern Vite/TypeScript/Vitest toolchain.

Live site: https://sybilla11.github.io/monster-rolodex/

## Tech stack

- **React 19** with function components and hooks
- **TypeScript** (strict mode)
- **Vite** for the dev server and production build
- **Vitest** + **React Testing Library** for tests
- **ESLint** (flat config) for linting
- **GitHub Actions** for CI (lint, test, build on every push/PR)
- Deployed to **GitHub Pages** via the `gh-pages` package

## Getting started

Requires Node `^20.19.0` or `>=22.12.0` (see `engines` in `package.json`).

```bash
npm install
npm start
```

This starts the Vite dev server, by default at `http://localhost:5173/monster-rolodex/`.

## Available scripts

| Script | Description |
|---|---|
| `npm start` | Run the dev server (Vite) |
| `npm run build` | Type-check with `tsc` and build for production into `build/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the test suite once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the project (ESLint) |
| `npm run deploy` | Build and publish `build/` to the `gh-pages` branch |

## Project structure

```
src/
  App.tsx                    # root component: fetches monsters, owns search state
  components/
    card/                    # a single monster card
    card-list/                # grid of cards
    search-box/                # search input
  models/monster.ts           # shared Monster type
  index.tsx                   # app entry point
```

Each component has a colocated `.test.tsx` file. Component styling is plain CSS, colocated per component.

## Deployment

The site is hosted on GitHub Pages, served from the `gh-pages` branch. `npm run deploy` builds the app and pushes the `build/` output to that branch via the `gh-pages` package; GitHub Pages is configured to serve directly from it. The `base` path in `vite.config.ts` (`/monster-rolodex/`) matches the GitHub Pages project-site path.

## CI

Every push and pull request to `master` runs lint, tests, and a production build via `.github/workflows/ci.yml`.
