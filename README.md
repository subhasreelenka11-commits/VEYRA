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

## Environment Variables
Ensure the following variables are set in `.env`:
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret key for JWT signing.
- `JWT_EXPIRES_IN`: Expiration time for JWT (e.g. `7d`).

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

## Authentication Endpoints
- `POST /auth/register`: Register a new user (`email`, `password`). Returns user `id` and `email`.
- `POST /auth/login`: Login user. Returns `accessToken` and user information.
- `GET /auth/me`: Get the currently authenticated user (Requires Bearer token).

## Profile & Onboarding Endpoints
- `GET /profile`: Fetch the authenticated user's profile. Returns `profile`, `isComplete` boolean, and calculated `bmi` (Requires Bearer token).
- `PUT /profile`: Create or update the authenticated user's profile. Only accepts strictly validated fields from the database schema (Requires Bearer token).

## Testing Health Endpoint
After starting the dev servers, visit:
`http://localhost:3000/health` (Assuming NestJS is running on port 3000).

## Frontend Routes & User Flow (Step 6 UI)
- **`/` (Landing Page)**: The public face of Veyra, showcasing the brand and features.
- **`/login` & `/register`**: Split-screen, premium authentication flows.
- **`/onboarding`**: A multi-step form capturing physical and lifestyle data. Forcefully routes here if a logged-in user lacks a complete profile.
- **`/dashboard`**: The personalized hub. Protected route requiring authentication and completed onboarding.
- **Placeholder Routes**: `/skin-analysis`, `/grooming`, `/nutrition`, `/recipes`, `/products`, `/progress`, `/profile`, `/settings`. Protected routes currently staged for future development.
