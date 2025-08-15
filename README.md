# RN + Next.js Monorepo (Tasks App)

A complete starter that pairs **React Native (Expo)** for mobile with **Next.js (App Router)** for web + API.
It includes:
- Monorepo (npm workspaces)
- Next.js API routes (CRUD) with Prisma + SQLite
- Expo Mobile app calling the API
- Shared UI package (React Native + react-native-web friendly)
- Shared TypeScript types

## Requirements
- Node.js 18+
- npm 9+
- SQLite (bundled; no separate install needed)

## Quick Start

1) Install deps:
```bash
npm install
```

2) Prepare the database (from the `apps/web` folder):
```bash
cd apps/web
npx prisma migrate dev --name init
npx prisma db seed
cd ../../
```

3) Start web API (Next.js) from project root:
```bash
npm run web:dev
```
By default it runs on http://localhost:3000

4) In a separate terminal, start the mobile app:
```bash
npm run mobile:dev
```
For the mobile app to reach the API, set the **EXPO_PUBLIC_API_URL** in `apps/mobile/.env` to your machine's LAN IP, e.g.:
```
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000
```
> On iOS simulator, `http://localhost:3000` works. On a physical device, use your LAN IP.

## Scripts
- `npm run web:dev` → Next.js dev server (web + API)
- `npm run mobile:dev` → Expo dev for React Native
- `npm run lint` → Lint all workspaces
- `npm run typecheck` → Type-check all workspaces

## Project Structure
```
rn-nextjs-monorepo/
  apps/
    mobile/   # Expo React Native app
    web/      # Next.js (web + API) + Prisma (SQLite)
  packages/
    ui/       # Shared RN components
    types/    # Shared TypeScript types
```

## Environment
- `apps/mobile/.env` → `EXPO_PUBLIC_API_URL`
- `apps/web/.env` → `DATABASE_URL="file:./dev.db"`

## Notes
- This template uses **SQLite** with Prisma for simplicity. Swap to Postgres by changing `DATABASE_URL` and `schema.prisma` provider.
- The mobile app uses plain `fetch` (could be swapped to axios or React Query).
