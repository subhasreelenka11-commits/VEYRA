# Veyra

"Your personal grooming & wellness companion."

## Monorepo Architecture
This is a monorepo managed with **pnpm workspaces** and **Turborepo**.

### Folder Structure
```
veyra/
├── applications/
│   ├── frontend-web/          # Next.js website
│   ├── backend-api/           # NestJS backend/API
│   └── mobile-app/            # React Native/Expo - placeholder
├── backend/
│   └── database/              # Prisma schema & migrations
```

## Prerequisites
- Node.js (>= 18)
- pnpm (`npm install -g pnpm`)
- PostgreSQL (Local or Docker)

## Setup Instructions
1. **Install Dependencies**
   ```bash
   pnpm install
   ```
2. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   *Make sure to update the `DATABASE_URL` in `.env` to point to your running PostgreSQL instance!*
3. **Run Prisma Migrations**
   ```bash
   cd backend/database
   npx prisma migrate dev
   ```
   *(This will also automatically generate the Prisma Client).*
4. **Generate Prisma Client (Manual)**
   ```bash
   cd backend/database
   npx prisma generate
   ```
5. **Start Development Servers**
   ```bash
   pnpm dev
   ```
6. **Inspect the Database**
   ```bash
   cd backend/database
   npx prisma studio
   ```

## Testing Health Endpoint
After starting the dev servers, visit:
`http://localhost:3000/health` (Assuming NestJS is running on port 3000).
