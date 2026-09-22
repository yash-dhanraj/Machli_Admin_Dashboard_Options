# Machli Admin Dashboard Concepts

## Purpose

This project is an interactive **design/concept prototype**, not the final
production Machli admin panel. It presents **three alternative dashboard
design directions** for the same Machli admin functionality, so that
management can open the application, compare all three options side by
side, navigate through the shared admin modules under each design, and
select a preferred visual direction.

All three options expose the same functional scope (dashboard, manual
notifications, INCOIS verification, user management, alerts & warnings,
marine information, emergency helplines, government schemes, landing
centres, reference data, and settings). Only the **visual hierarchy,
layout, and information presentation** differ between the three options.

There is **no backend, database, authentication, or external API**
connected to this project. All data shown (users, alerts, notifications,
landing centres, schemes, helplines, marine information, etc.) is fixed,
deterministic, illustrative sample data defined in
[`src/data/mockData.ts`](src/data/mockData.ts). Figures such as user
counts or KPI numbers are illustrative only and are not production
statistics.

## Technology

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Recharts (charts)
- Lucide React (icons)

No paid libraries and no API keys are required.

## Installation

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build (production)

```bash
npm run build
```

## The three design options

Each option applies its own design language across **every** major screen
(Dashboard, Manual Notifications, INCOIS Verification and its
cross-verification detail, User Management and detail, Notification
History, Alerts & Warnings, Marine Information, Emergency & Helplines,
Government Schemes, Landing Centres, Reference Data, and Settings) — not
just the dashboard. All three read from the same mock data and share the
same underlying filtering/state logic (see `src/hooks/`); only the layout
and presentation components differ per option (see `src/components/option1`,
`option2`, `option3`).

- **Option 1 – Operations Focused** (`/option-1`): Dense, task-oriented,
  table/queue-heavy — built to feel like a daily operations control desk.
  Compact filters, tight tables, and status chips placed close to actions.

- **Option 2 – Coastal Intelligence** (`/option-2`): Spatial and
  location-first. A conceptual coastal map panel (pure SVG/CSS, no external
  maps API) anchors INCOIS verification, marine information, landing
  centres, and location-grouped views of users and notifications.

- **Option 3 – Executive + Operations Hybrid** (`/option-3`): Balanced and
  spacious — executive summary blocks and KPI cards sit above the same
  operational queues and tables, suited to both management and day-to-day
  operations.

Open the app at `/` to see the design selector homepage and choose a
concept to preview. Every screen includes an option switcher, a persistent
"Option 0X · <name>" indicator, and a "Back to Design Options" link, so you
can compare concepts screen-by-screen without losing your place.
