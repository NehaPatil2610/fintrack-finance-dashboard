# FinTrack – Personal Finance Dashboard

A React fintech-style dashboard that runs entirely in the browser on **mock data**—no backend required. It highlights UI composition, derived financial metrics, charts, role-based controls, and persistent client state.

## Tech stack

- **React** + **Vite**
- **Tailwind CSS** (v4, class-based dark mode: `slate-50` light surfaces, **`slate-950`** app background and **`slate-900`** cards in dark mode)
- **Recharts** (custom tooltips + styled grids; area + donut charts)
- **Lucide React** (icons: navigation, empty states, theme toggle, read-only badge)
- **Zustand** + **`persist`** middleware

## Architecture

**Why Zustand?** It keeps global state minimal without the ceremony of Redux: small API surface, works well with React 19, and the `persist` middleware gives durable storage in a few lines. For this scope, that is simpler than Context + manual `localStorage`, and lighter than a full data library.

The store holds **only source data and UI filters** (`transactions` including optional **`merchant`**, `userRole`, `searchQuery`, `filter`). **Totals are not stored**—they are recomputed with the **derived state** pattern (`useFinanceCalc` + `useMemo`) so balance/income/expense cannot drift from the transaction list.

**Unified search:** `useDatasetFiltered()` applies the same rules everywhere: match **merchant**, **category**, or **transaction type** (plus the type dropdown). Summary cards, **both charts**, and insights all read from this dataset so a query like `salary` or `amazon` updates numbers and visuals together.

## State persistence

`persist` writes **`transactions`** and **`userRole`** (`Admin` | `Viewer`) to **`localStorage`** under the key `fintrack-persist`. Users can refresh without losing edits, new rows, or their selected role. Theme preference is stored separately as `fintrack-theme`.

## Scalability

Folders are split by concern—`/components` (UI, charts, transactions), `/store`, `/hooks`, `/utils`, `/data`—so features can grow (e.g. budgets API, auth) without turning `App` into a god component. New views can reuse the same store selectors and analytics helpers.

## Performance

Lists are capped at **100** mock rows, but **chart and insight series** are built inside **`useMemo`** off the transaction array so Recharts and summaries stay cheap when filters change. Pagination (**10 rows per page**) keeps the DOM small for the table.

## Features

- **Navbar**: FinTrack branding, **global search** (Zustand), role switcher, dark/light toggle (`transition-all duration-300`)
- **Glass UI**: Navbar and sidebar use `bg-white/80 backdrop-blur-md` (and dark equivalents)
- **Responsive layout**: `lg:grid-cols-12`—stats `lg:col-span-4` each; charts `lg:col-span-8` + `lg:col-span-4`; stacks on small screens
- **Sidebar**: Collapses to a **hamburger** drawer on small viewports; **bottom nav** (mobile) for quick section jumps; static on `lg`
- **Read-only**: **Viewer** role shows a **Read-only mode** badge; **Admin** gets write actions
- **Stats**: Balance / income / expense from **filtered** transactions (`useFilteredTransactions` + `useFinanceCalc`)
- **Charts**: Last **6 months** cumulative balance (**AreaChart**); expense mix (**donut** `PieChart`)
- **Transactions**: Sort, type filter, **pagination**, **Admin-only** add/edit/delete (`AdminOnly` wrapper + `deleteTransaction`)
- **Insights**: Top spending category, **monthly savings %**, **budget status** (vs 65% of income guideline)

## Project structure

```text
src
├── components
│   ├── layout       # Sidebar, Navbar search
│   ├── ui           # SummaryCard, SectionHeader, RoleSwitcher, AdminOnly
│   ├── charts
│   ├── transactions
│   └── insights
├── hooks            # useFinanceCalc, useFilteredTransactions
├── pages
├── store
├── data
├── utils
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Production preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Data model

Each transaction: `id`, `date` (ISO date string `YYYY-MM-DD`), `category`, `amount` (number), `type` (`income` | `expense`). The bundled mock file exports **100** rows.

## Future improvements

- Real API + auth; optimistic updates
- CSV import, rules-based categorization
- Virtualized table for large datasets
- Code-splitting Recharts to shrink the main bundle
