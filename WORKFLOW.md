# 🏗️ VEYRA — Complete Project Workflow & Architecture

> **Your Personal Grooming & Wellness Companion**
> Last Updated: September 10, 2026

---

## 📁 Monorepo Structure

```
VEYRA/
├── .env                          # Root environment variables (shared)
├── .env.example                  # Template for new developers
├── .nvmrc                        # Node version: 20
├── package.json                  # Root scripts (turbo run dev/build/lint)
├── pnpm-workspace.yaml           # Workspace: applications/*, backend/*
├── turbo.json                    # Turborepo pipeline config
├── tsconfig.json                 # Base TypeScript config
│
├── applications/
│   ├── backend-api/              # NestJS Backend (port 5001)
│   └── frontend-web/             # Next.js 14 Frontend (port 3001)
│
├── backend/
│   └── database/                 # Prisma schema, migrations, client
│
└── infrastructure/
    └── docker/
        └── docker-compose.yml    # PostgreSQL 15 service
```

---

## 🚀 Quick Start (First Time Setup)

### Prerequisites
- **Node.js** >= 18 (pinned to 20 via `.nvmrc`)
- **pnpm** 9.1.0
- **PostgreSQL** 15 (via Docker or local)

### Step-by-Step

```bash
# 1. Clone & Install
git clone <repo-url> && cd VEYRA
pnpm install

# 2. Environment
cp .env.example .env
# Edit .env with your credentials (see Environment Variables section below)

# 3. Start PostgreSQL
cd infrastructure/docker
docker compose up -d
cd ../..

# 4. Database Setup
cd backend/database
npx prisma migrate dev      # Apply migrations
npx prisma generate         # Generate Prisma Client
cd ../..

# 5. Run Everything
pnpm dev                    # Starts both frontend + backend via Turborepo
```

### Access Points
| Service         | URL                          |
|-----------------|------------------------------|
| Frontend        | http://localhost:3001         |
| Backend API     | http://localhost:5001         |
| Health Check    | http://localhost:5001/health  |
| Prisma Studio   | `cd backend/database && pnpm run studio` |

---

## 🔐 Environment Variables (`.env`)

```env
# ── Database ──
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veyra?schema=public"
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=veyra

# ── Authentication ──
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ── Server ──
PORT=5001

# ── AI Providers ──
GEMINI_API_KEY="your_gemini_api_key"                    # Primary: Google Gemini
FALLBACK_LLM_API_KEY="sk-or-v1-your_openrouter_key"    # Fallback: OpenRouter

# ── Legacy (can be removed) ──
FALLBACK_LLM_BASE_URL="https://api.openai.com/v1"
FALLBACK_AI_MODEL="gpt-4o-mini"
FALLBACK_AI_IMAGE_ANALYZER_MODEL="gpt-4o-mini"
```

### Frontend Environment (`applications/frontend-web/.env.local`)
```env
NEXT_PUBLIC_API_URL=/api
PORT=5001
BACKEND_URL=http://localhost:5001
```

---

## 🧠 AI Provider Architecture

All AI tasks use a **dual-provider fallback strategy** implemented in `AiService.executeWithFallback()`:

```
Request ──► Gemini (gemini-3.6-flash) ──► Success ✅
                    │
                    ▼ (if fails)
            OpenRouter (google/gemini-2.5-flash) ──► Success ✅
                    │
                    ▼ (if fails)
              500 Internal Server Error
```

### Provider Details

| Provider      | Endpoint                                                              | Model               | Max Tokens |
|---------------|-----------------------------------------------------------------------|----------------------|------------|
| **Gemini**    | `generativelanguage.googleapis.com/v1beta/openai/chat/completions`    | `gemini-3.6-flash`  | 4096       |
| **OpenRouter**| `openrouter.ai/api/v1/chat/completions`                               | `google/gemini-2.5-flash` | 4096  |

### AI Tasks

| Feature              | Method                          | What It Does                                                       |
|----------------------|---------------------------------|--------------------------------------------------------------------|
| **Nutrition Plans**  | `generateNutritionPlan(context)`| Clinical macro-nutrient schedule (no food items, only time blocks)  |
| **Smart Recipes**    | `generateSmartRecipes(context)` | 7 personalized recipes respecting allergies, dislikes, and macros  |
| **Skin Analysis**    | `analyzeSkinImage(base64Image)` | 6-metric dermal scan + 3-4 recommended active ingredients          |

### Console Logs (What to look for)
```
[AiService] Attempting AI generation with Gemini Pro...
[AiService] ✅ SUCCESS: AI request fulfilled by GEMINI PRO

[AiService] Attempting AI generation with OpenRouter Fallback...
[AiService] ✅ SUCCESS: AI request fulfilled by OPENROUTER
```

---

## 🗄️ Database Schema (Prisma)

**Location:** `backend/database/prisma/schema.prisma`

```mermaid
erDiagram
    User ||--o| UserProfile : has
    User ||--o| NutritionPlan : has
    User ||--o{ SmartRecipe : has
    User ||--o{ SkinScan : has

    User {
        String id PK
        String email UK
        String passwordHash
        DateTime createdAt
        DateTime updatedAt
    }
    UserProfile {
        String id PK
        String userId FK
        String firstName
        String lastName
        Int age
        Float height
        Float weight
        String gender
        ActivityLevel activityLevel
        Goal goal
        DietaryPreference dietaryPreference
        String[] allergies
        String[] dislikes
        Float budget
        Int cookingTime
    }
    NutritionPlan {
        String id PK
        String userId FK
        Float bmi
        Float bmr
        Float tdee
        Float targetCalories
        Float proteinGrams
        Float carbsGrams
        Float fatGrams
        Json planData
    }
    SmartRecipe {
        String id PK
        String userId FK
        Json recipeData
    }
    SkinScan {
        String id PK
        String userId FK
        Int overallScore
        Json metrics
        Json actives
    }
```

### Enums
- **`ActivityLevel`**: `SEDENTARY` | `LIGHT` | `MODERATE` | `ACTIVE` | `VERY_ACTIVE`
- **`Goal`**: `WEIGHT_LOSS` | `WEIGHT_GAIN` | `MAINTENANCE` | `GENERAL_WELLNESS`
- **`DietaryPreference`**: `VEGETARIAN` | `NON_VEGETARIAN` | `VEGAN` | `EGGETARIAN` | `OTHER`

### Database Commands
```bash
cd backend/database

npx prisma migrate dev       # Create & apply migrations
npx prisma db push           # Quick schema push (no migration file)
npx prisma generate          # Regenerate Prisma Client
npx prisma studio            # Open database GUI
```

---

## 🔌 Backend API Reference

**Base URL:** `http://localhost:5001`

### Public Endpoints

| Method | Route             | Description                    |
|--------|-------------------|--------------------------------|
| `GET`  | `/health`         | Health check → `{ status: 'ok' }` |
| `POST` | `/auth/register`  | Create account (email, password) |
| `POST` | `/auth/login`     | Login → sets `accessToken` cookie |
| `POST` | `/auth/logout`    | Clears auth cookie              |

### Protected Endpoints (require `accessToken` cookie)

| Method | Route                   | Description                                      |
|--------|-------------------------|--------------------------------------------------|
| `GET`  | `/auth/me`              | Current user + profile                           |
| `GET`  | `/profile`              | User profile + BMI + `isComplete` flag           |
| `PUT`  | `/profile`              | Upsert profile fields                            |
| `GET`  | `/nutrition`            | Get saved nutrition plan                         |
| `POST` | `/nutrition/generate`   | AI-generate nutrition plan                       |
| `GET`  | `/recipes`              | Get saved recipes                                |
| `POST` | `/recipes/generate`     | AI-generate 7 personalized recipes               |
| `POST` | `/skin-analysis/scan`   | AI-analyze face scan (body: `{ image: base64 }`) |
| `GET`  | `/skin-analysis/history`| Get scan history                                 |

---

## 🖥️ Frontend Page Map

### Public Routes

| Route          | Page                        | Description                               |
|----------------|-----------------------------|-------------------------------------------|
| `/`            | Landing Page                | Hero, features, how-it-works, CTA         |
| `/login`       | Sign In                     | Email/password + social OAuth             |
| `/register`    | Create Account              | Registration → auto-login → onboarding   |
| `/onboarding`  | 3-Step Profile Setup        | About You → Body & Goals → Food & Lifestyle |

### Protected Dashboard Routes

| Route              | Page                  | Key Features                                                |
|--------------------|-----------------------|-------------------------------------------------------------|
| `/dashboard`       | Overview Hub          | Greeting, BMI, skin score, daily rituals, action tiles      |
| `/skin-analysis`   | AI Skin Scanner       | Camera capture (3s auto), 6 biomarkers, prescribed actives  |
| `/grooming`        | Skincare Routines     | Morning/Evening/Weekly rituals, 60s cleanse timer           |
| `/nutrition`       | Nutrition Plan        | AI macro schedule, hydration, BMR/TDEE/BMI snapshot         |
| `/recipes`         | Smart Recipes         | 7 AI recipes, search/filter, detail modal                   |
| `/products`        | Apothecary            | Product recommendations matched to skin biomarkers          |
| `/progress`        | Biometric Tracking    | SVG charts, habit heatmap, milestone timeline               |
| `/profile`         | Health Blueprint      | Edit demographics, goals, allergies, BMI live calc          |
| `/settings`        | Preferences           | Notifications, privacy, units, data export                  |

### Route Protection Flow
```
User visits protected route
        │
        ▼
  Is authenticated? ──No──► Redirect to /login
        │
       Yes
        │
        ▼
  Is profile complete? ──No──► Redirect to /onboarding
        │
       Yes
        │
        ▼
  Render page ✅
```

---

## 🔄 Next.js Proxy Rewrites

**Location:** `applications/frontend-web/next.config.mjs`

The frontend proxies API calls through Next.js rewrites to avoid CORS:

| Frontend Path         | Proxied To                          |
|-----------------------|-------------------------------------|
| `/api/:path*`         | `http://localhost:5001/:path*`      |
| `/auth/:path*`        | `http://localhost:5001/auth/:path*` |
| `/recipes/:path*`     | `http://localhost:5001/recipes/:path*` |
| `/skin-analysis/:path*` | `http://localhost:5001/skin-analysis/:path*` |
| `/health`             | `http://localhost:5001/health`      |

> **Proxy Timeout:** `experimental.proxyTimeout = 120000ms` (2 min) for AI requests.

---

## ⏱️ Timeout Configuration

AI requests can take 30-60 seconds. Timeouts are set at every layer:

| Layer                  | Setting                        | Value    |
|------------------------|--------------------------------|----------|
| Backend HTTP Server    | `server.setTimeout()`          | 120s     |
| Backend Keep-Alive     | `server.keepAliveTimeout`      | 120s     |
| Backend Headers        | `server.headersTimeout`        | 125s     |
| Next.js Proxy          | `experimental.proxyTimeout`    | 120s     |
| Frontend `fetchApi()`  | `AbortSignal.timeout()`        | 120s     |

---

## 🧮 Nutrition Calculation Engine

**Location:** `applications/backend-api/src/nutrition/nutrition.calculator.ts`

| Metric           | Formula                                                              |
|------------------|----------------------------------------------------------------------|
| **BMI**          | `weight / (height_m)²`                                              |
| **BMR (Male)**   | `10 × weight + 6.25 × height - 5 × age + 5`                        |
| **BMR (Female)** | `10 × weight + 6.25 × height - 5 × age - 161`                      |
| **TDEE**         | `BMR × Activity Multiplier`                                         |
| **Protein**      | `2.2 g/kg` (loss) or `2.0 g/kg` (maintain/gain)                     |
| **Fat**          | `25% of total calories ÷ 9`                                         |
| **Carbs**        | `Remaining calories ÷ 4`                                            |
| **Calorie Clamp**| `1200 ≤ targetCalories ≤ 4000`                                      |

Activity Multipliers: Sedentary `1.2` · Light `1.375` · Moderate `1.55` · Active `1.725` · Very Active `1.9`

---

## 📦 Common Commands

```bash
# ── Development ──
pnpm dev                    # Start all services (Turborepo)
pnpm build                  # Build all packages

# ── Backend Only ──
cd applications/backend-api
pnpm dev                    # Start backend with hot-reload
pnpm build                  # Compile TypeScript
npx nest build              # Alternative build command

# ── Frontend Only ──
cd applications/frontend-web
pnpm dev                    # Start Next.js on port 3001

# ── Database ──
cd backend/database
npx prisma migrate dev      # Run migrations
npx prisma db push          # Push schema changes
npx prisma generate         # Regenerate client
npx prisma studio           # Visual DB editor

# ── Docker ──
cd infrastructure/docker
docker compose up -d        # Start PostgreSQL
docker compose down         # Stop PostgreSQL
```

---

## 🐛 Troubleshooting

### `Cannot POST /skin-analysis/scan` (404)
- The backend failed to compile. Check the terminal for TypeScript errors.
- Run `npx nest build` in `applications/backend-api` to see errors.
- Common fix: Ensure `jwt-auth.guard` import path is `../auth/guards/jwt-auth.guard`.

### `socket hang up` / `ECONNRESET`
- AI request took longer than the proxy timeout.
- Verify `proxyTimeout: 120000` is set in `next.config.mjs`.
- Verify `server.setTimeout(120000)` is set in `main.ts`.

### `Gemini 404: model not found`
- Model names get deprecated frequently.
- Run: `curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"` to list available models.
- Update the model name in `ai.service.ts` → `executeWithFallback()`.

### `OpenRouter 402: insufficient credits`
- Add `max_tokens: 4096` to the OpenRouter payload to reduce token usage.
- Or add credits at https://openrouter.ai/settings/credits.

### `413 Payload Too Large`
- Skin scan images are large base64 strings.
- Ensure `json({ limit: '50mb' })` is configured in `main.ts`.

### Backend won't pick up code changes
- `nest start --watch` can get stuck after compile errors.
- Always `Ctrl+C` and re-run `pnpm dev` after fixing errors.

---

## 📋 User Flow Summary

```
Register ──► Onboarding (3 steps) ──► Dashboard
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 │                       │                       │
           Skin Analysis           Nutrition Plan          Smart Recipes
           (Camera → AI)           (Profile → AI)         (Profile → AI)
                 │                       │                       │
           6 Biomarkers            Macro Schedule           7 Recipes
           + Actives               + Hydration              + Instructions
                 │                       │                       │
                 └───────────────────────┼───────────────────────┘
                                         │
                                    Progress Tracking
                                    Profile Editor
                                    Settings
```

---

> **Built with**: Next.js 14 · NestJS 10 · Prisma 5 · PostgreSQL 15 · Tailwind CSS 3 · Google Gemini · OpenRouter · Turborepo
