# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # ESLint over src/
npm run typecheck  # TypeScript check (no emit)
```

No test runner is configured in this project.

## Architecture

This is a **Next.js 16 App Router** food recipe application backed by a **Strapi CMS** API (`NEXT_PUBLIC_API_URL`).

### Data Fetching Pattern

The app uses a **server-prefetch + client hydration** pattern with TanStack Query:

- **Server components** (`page.tsx`) prefetch data via `QueryClient.prefetchQuery` using fetch-based server functions (`src/shared/api/*.server.ts`), then pass dehydrated state via `<HydrationBoundary>`.
- **Client components** (`*Client.tsx`) consume the hydrated cache with `useQuery` hooks defined in `src/shared/hooks/use*Query.ts`.
- Server API functions use Next.js `fetch` with `{ next: { revalidate: 60 } }` for ISR; client API functions use the `axiosInstance` (`src/lib/axiosInstance.ts`) pointed at `NEXT_PUBLIC_API_URL`.

### State Management

Two separate systems coexist:

- **TanStack Query** — server state (recipes, categories, favorites).
- **MobX** (`src/shared/stores/`) — UI-only state (mobile menu, search input, dropdown). Stores are singleton instances combined in `rootStore` and provided via `StoreProvider` using React Context.

### Authentication

JWT-based auth stored in a `jwt` cookie:

- **Client side**: `AuthContext` (`src/shared/auth/AuthContext.tsx`) handles login/register/logout, stores the token via `src/lib/auth/authStorage.ts`, and exposes `useAuth()`.
- **Server side**: `getServerToken()` reads the `jwt` cookie from Next.js `cookies()` to authorize server-side prefetches (e.g., favorites).
- After login/logout, TanStack Query cache is invalidated or cleared to sync server state.

### Query Keys

Centralized in `src/shared/queryKeys.ts`. Use `recipesKeys` and `recipeKeys` factories when writing new queries to keep cache keys consistent.

### API Layer

- `src/shared/api/*.api.ts` — client-side API functions (axios).
- `src/shared/api/*.server.ts` — server-side API functions (fetch + ISR).
- Query strings are built with `qs` via `buildRecipesQuery` (`src/shared/api/utils/buildRecipesQuery.ts`).

### Styling

SCSS Modules per component (`.module.scss`). Global styles in `src/styles/` with SCSS variables (`_theme.scss`) and media query helpers (`_media.scss`). Local Roboto font loaded via `next/font/local`.

### Component Conventions

Each component lives in `src/components/<ComponentName>/` with a main `.tsx` file, optional `.module.scss`, and a barrel `index.ts` re-export. Import components via their folder (e.g., `@/components/Header`).

## Coding rules

- Prefer server components
- Follow existing architecture
- Use TanStack Query for server state
- Do not introduce new state libraries
- Avoid unnecessary refactors.

---

## Agent Workflow Rules

When working on tasks in this repository, follow this workflow:

1. **Analysis phase**
    - Prefer fast / low-cost models when possible.
    - First analyze the problem and describe the findings.
    - Do not immediately modify files.

2. **Planning phase**
    - Propose a concise plan for the implementation.
    - List which files will be changed.

3. **Implementation phase**
    - Only after the plan is clear, implement the changes.

---

## Cost Optimization Rules

To reduce token usage and API costs:

- Avoid scanning the entire repository.
- Only open files directly related to the task.
- Prefer reading a small number of files.
- Keep explanations concise.

---

## SCSS / Styling Rules

When editing styles:

- Prefer existing variables, mixins, and utilities.
- Avoid hardcoded colors or breakpoints.
- Do not change visual appearance unless requested.
- Reduce duplication by using shared mixins or utilities.

---

## Safety Rules

Before applying large changes:

- Explain the change.
- Show a preview of modifications.
- Group edits per file.

## File Reading Guidelines

When investigating the codebase:

1. Start with the most relevant file.
2. Expand to related files only if needed.
3. Avoid opening unrelated directories.
4. Prefer targeted searches over full repository scans.