## Purpose
Provide targeted guidance for AI coding agents working on this Vite + React + TypeScript app so they can be productive immediately.

## Quick start
- Install deps: `npm install`
- Run dev server: `npm run dev` (uses Vite)
- Build: `npm run build`, Preview: `npm run preview`

Note: README references a `GEMINI_API_KEY` in `.env.local` for AI Studio deployments — respect env-based secrets when running integrations.

## Big-picture architecture
- Frontend-only single-page app built with React + TypeScript, served by Vite.
- UI is organized into feature components under `components/` and small UI primitives under `components/ui/`.
- In-memory backend simulation lives in `services/mockApi.ts` which exposes `getPackages`, `checkAvailability`, `submitLead`, etc. Use this module as the primary integration point when mocking or replacing backend behavior.

## Key files & where to look
- App entry & wiring: [App.tsx](App.tsx)
- Routes / mount: [index.tsx](index.tsx)
- Types: [types.ts](types.ts) — definitive shapes for `Package`, `Provider`, `Lead`, `Address`, `AvailabilityResult`.
- Mock backend & canonical data: [services/mockApi.ts](services/mockApi.ts) — update `PACKAGES` or `PROVIDERS` here.
- Component examples:
  - Builder UI: [components/PackageBuilder.tsx](components/PackageBuilder.tsx) (local state, filtering, auto-select)
  - Pricing flow & modal lead capture: [App.tsx](App.tsx) + `components/ui/Modal.tsx`

## Data flows & integration points
- On load the app calls `getPackages()` (from `mockApi`) — replace or proxy this to a real API when integrating.
- Availability checks call `checkAvailability(address)` and return `AvailabilityResult.providers` (provider IDs) — UI filters `PACKAGES` by those IDs.
- Lead submission calls `submitLead(lead)` — currently logs and resolves; replace with real POST to your backend.

## Patterns & conventions to follow
- Type-first: use interfaces from `types.ts` for props and service return values.
- Services are pure async functions under `services/` — prefer adding new network logic here rather than sprinkling fetches in components.
- UI primitives: keep shared small components in `components/ui/` (e.g., `Button`, `Modal`) and feature code in `components/`.
- Local state & effects: components use `useState` and `useEffect` for lifecycle and data loading (see `PackageBuilder` and `App`).
- Styling: components use utility CSS classes (Tailwind-like). Confirm the CSS toolchain when modifying styles.

## Helpful examples (copy-paste patterns)
- Load packages on mount (App.tsx):
  ```ts
  useEffect(() => { getPackages().then(setPackages); }, []);
  ```
- Availability handler updates UI and scrolls to pricing:
  ```ts
  const result = await checkAvailability(address);
  setAvailability(result);
  if (result.available) document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  ```

## When adding/removing providers or packages
- Edit `services/mockApi.ts` — update `PROVIDERS` and `PACKAGES`. These arrays are the single source of truth for UI list rendering and filtering.

## External dependencies & dev setup
- Icons: `lucide-react` — components import icons directly (e.g., `Check`, `User`).
- Build: Vite (`vite`, `@vitejs/plugin-react`) + TypeScript. Use `npm run dev` for local development.

## Debugging tips
- Use `console.log` in `services/mockApi.ts` (already used in `submitLead`) to simulate backend logs.
- Because the backend is mocked with delays (`DELAY_MS`), increase/decrease delays to reproduce async timing issues.

## Do not assume
- There are no integration tests or e2e tests in the repo. Do not add assumptions about test runners.
- UI utility classes are used heavily; confirm CSS pipeline (Tailwind/PostCSS) if you change styling.

## If you need to extend
- Add new network functions to `services/` and corresponding types to `types.ts`.
- Keep UI primitives in `components/ui/` and feature pages in `components/`.

---
If any section is unclear or you'd like more examples (e.g., where to hook a real API), tell me where to deepen or iterate.
