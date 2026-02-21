# Financy Backend

GraphQL API server built with Fastify, Mercurius, Prisma, and SQLite.

## Getting Started

```bash
pnpm install
pnpm prisma:migrate   # run migrations
pnpm prisma:seed      # seed baseline users, categories, and transactions
pnpm dev              # start dev server with hot reload
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server (hot reload) |
| `pnpm build` | Compile to `dist/` |
| `pnpm test` | Run Vitest tests |
| `pnpm typecheck` | TypeScript type check |
| `pnpm lint` | Biome lint + auto-fix |
| `pnpm prisma:migrate` | Run pending migrations |
| `pnpm prisma:seed` | Baseline deterministic seed |
| `pnpm prisma:seed:transactions` | Bulk faker seed (see below) |
| `pnpm prisma:reset` | Reset DB and re-run baseline seed |

## Manual Pagination Seed

Use `prisma:seed:transactions` to populate a large number of fake transactions so that pagination and filters can be manually tested in the UI.

### Prerequisite

Run the baseline seed at least once so the demo users and their categories exist:

```bash
pnpm prisma:seed
```

### Default usage (replace mode, 50 transactions)

```bash
pnpm prisma:seed:transactions
```

Deletes all existing transactions for `demo@financy.local` and inserts 50 new ones spread across the last 12 months.

### Options

| Flag | Default | Description |
|---|---|---|
| `--count <n>` | `50` | Number of transactions to insert (1–1000) |
| `--email <email>` | `demo@financy.local` | Target user by email |
| `--append` | off | Append to existing transactions instead of replacing |

### Examples

```bash
# Insert 75 transactions in replace mode
pnpm prisma:seed:transactions -- --count 75

# Append 20 more without touching existing data
pnpm prisma:seed:transactions -- --append --count 20

# Seed a different user with 30 transactions
pnpm prisma:seed:transactions -- --email second@financy.local --count 30
```

> **Note:** The `--` separator is required by pnpm to forward arguments to the underlying script.
