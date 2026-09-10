# 📖 VEYRA — Step-by-Step Setup & Run Guide

A simple, beginner-friendly guide to get Veyra running from scratch.

---

## Step 1: Install Prerequisites

Before anything, make sure you have these installed on your machine:

| Tool        | Version  | How to Install                                      |
|-------------|----------|-----------------------------------------------------|
| **Node.js** | v20+     | `nvm install 20` or download from https://nodejs.org |
| **pnpm**    | v9+      | `npm install -g pnpm`                               |
| **Docker**  | Latest   | https://docs.docker.com/get-docker/                 |

Verify everything is ready:
```bash
node -v     # Should show v20.x.x
pnpm -v     # Should show 9.x.x
docker -v   # Should show Docker version xx.x.x
```

---

## Step 2: Clone the Project

```bash
git clone <your-repo-url>
cd VEYRA
```

---

## Step 3: Install All Dependencies

Veyra is a **monorepo** — one command installs everything (frontend + backend + database):

```bash
pnpm install
```

> This installs packages for all 3 workspaces:
> - `applications/backend-api` (NestJS Backend)
> - `applications/frontend-web` (Next.js Frontend)
> - `backend/database` (Prisma Database Client)

---

## Step 4: Set Up Environment Variables

```bash
cp .env.example .env
```

Now open `.env` in your editor and fill in:

```env
# Database (keep as-is for local Docker setup)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veyra?schema=public"
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=veyra

# Auth (change the secret in production!)
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server Port
PORT=5001

# AI Keys (you need at least ONE of these)
GEMINI_API_KEY="your_google_gemini_api_key_here"
FALLBACK_LLM_API_KEY="sk-or-v1-your_openrouter_key_here"
```

### Where to get the API keys:

| Key                  | Where to Get It                                    |
|----------------------|----------------------------------------------------|
| `GEMINI_API_KEY`     | https://aistudio.google.com/apikey                 |
| `FALLBACK_LLM_API_KEY` | https://openrouter.ai/settings/keys             |

> 💡 **Gemini is the primary AI provider.** OpenRouter is the automatic fallback if Gemini fails or hits rate limits.

---

## Step 5: Start the Database (PostgreSQL)

```bash
cd infrastructure/docker
docker compose up -d
cd ../..
```

Verify it's running:
```bash
docker ps
# Should show a postgres:15-alpine container on port 5432
```

---

## Step 6: Set Up the Database Schema

```bash
cd backend/database
npx prisma migrate dev
```

This does 3 things:
1. Creates the `veyra` database tables (`User`, `UserProfile`, `NutritionPlan`, `SmartRecipe`, `SkinScan`)
2. Records the migration in version control
3. Auto-generates the Prisma Client for TypeScript

> If prompted for a migration name, type something like `init`

Verify the schema:
```bash
npx prisma studio
# Opens a visual database browser at http://localhost:5555
```

Go back to root:
```bash
cd ../..
```

---

## Step 7: Start the Application

From the project root, run:

```bash
pnpm dev
```

This uses **Turborepo** to start both services simultaneously:

| Service         | URL                      | What It Does                   |
|-----------------|--------------------------|--------------------------------|
| **Backend API** | http://localhost:5001     | NestJS server handling all API calls |
| **Frontend**    | http://localhost:3001     | Next.js web app you see in browser   |

### What you should see in the terminal:

```
backend-api:dev: [NestApplication] Veyra Backend listening on port 5001
frontend-web:dev: ▲ Next.js 14.2.15
frontend-web:dev: - Local: http://localhost:3001
frontend-web:dev: ✓ Ready in 1756ms
```

✅ **Both lines must appear** before you open the browser!

---

## Step 8: Open in Browser & Create Account

1. Open **http://localhost:3001** in Chrome
2. Click **"Begin Your Journey"** or go to `/register`
3. Enter your email and password → Click **Create Account**
4. You'll be automatically redirected to the **Onboarding Wizard**

---

## Step 9: Complete Onboarding (3 Steps)

The app requires a complete profile before you can use dashboard features:

### Step 1 of 3 — About You
- First Name, Last Name
- Age
- Gender

### Step 2 of 3 — Body & Goals
- Height (cm)
- Weight (kg)
- Fitness Goal (Weight Loss / Gain / Maintenance / Wellness)
- Activity Level

### Step 3 of 3 — Food & Lifestyle
- Dietary Preference (Veg / Non-Veg / Vegan / etc.)
- Monthly Food Budget
- Available Cooking Time
- Allergies (comma-separated)
- Dislikes (comma-separated)

After completing all 3 steps → You land on the **Dashboard**.

---

## Step 10: Using the Features

### 🍽️ Nutrition Plan
1. Go to **Nutrition** from the sidebar
2. Click **"Generate My Plan"**
3. Wait 15-40 seconds (AI is working)
4. Your personalized macro schedule appears with:
   - Daily calorie target
   - Protein / Carbs / Fat breakdown
   - Meal time-blocks with clinical instructions
   - Hydration protocol

### 🥗 Smart Recipes
1. Go to **Recipes** from the sidebar
2. Click **"Generate Recipes"**
3. Wait 15-40 seconds
4. 7 personalized recipes appear with:
   - Ingredients, instructions, cook time
   - Per-recipe macros matching your targets
   - Allergy-safe (respects your profile)

### 🔬 Skin Analysis
1. Go to **Skin Analysis** from the sidebar
2. Click **"Start New Scan"**
3. Your camera opens with a face-fitting oval guide
4. A **3-second countdown** appears: 3... 2... 1...
5. Photo auto-captures at 0
6. Wait 15-40 seconds for AI analysis
7. Results appear with:
   - Overall skin health score (0-100)
   - 6 biomarkers (Hydration, Barrier, Texture, Redness, Sebum, UV)
   - 3-4 recommended active ingredients

> ⚠️ **Camera permission required!** Chrome will ask to allow camera access.

---

## How the AI Works (Behind the Scenes)

When you click "Generate" on any AI feature, here's what happens:

```
You click "Generate"
        │
        ▼
Frontend sends POST request to Backend (localhost:5001)
        │
        ▼
Backend reads your profile from PostgreSQL database
        │
        ▼
Backend calculates your BMI, BMR, TDEE, and macro targets
        │
        ▼
Backend sends prompt + your data to Gemini API
        │
        ├──► Gemini responds ──► Parse JSON ──► Save to DB ──► Return to Frontend ✅
        │
        └──► Gemini fails ──► Try OpenRouter ──► Same flow ✅
                                    │
                                    └──► Also fails ──► 500 Error ❌
```

### Check which AI provider was used:
Look at your **backend terminal** for these logs:
```
✅ SUCCESS: AI request fulfilled by GEMINI PRO      ← Used your Gemini quota
✅ SUCCESS: AI request fulfilled by OPENROUTER       ← Used OpenRouter fallback
```

---

## Common Errors & Fixes

### ❌ "Internal Server Error" (500) on AI features
**Cause:** AI provider key is missing or invalid.
**Fix:**
1. Check your `.env` has a valid `GEMINI_API_KEY`
2. Restart backend: `Ctrl+C` → `pnpm dev`

### ❌ "socket hang up" in terminal
**Cause:** AI took too long and the connection timed out.
**Fix:** Already configured with 120s timeouts. If still happening, restart both frontend and backend.

### ❌ "Cannot POST /skin-analysis/scan" (404)
**Cause:** Backend didn't compile properly.
**Fix:**
```bash
cd applications/backend-api
npx nest build          # Check for TypeScript errors
# Fix any errors shown, then restart
pnpm dev
```

### ❌ "Gemini 404: model not found"
**Cause:** Google deprecated the model name.
**Fix:** List current models and update `ai.service.ts`:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
```

### ❌ Frontend shows blank page or redirect loop
**Cause:** Profile is incomplete.
**Fix:** Complete all 3 onboarding steps, or check `/onboarding` page.

### ❌ Database connection refused
**Cause:** PostgreSQL isn't running.
**Fix:**
```bash
cd infrastructure/docker
docker compose up -d
```

---

## Restarting After a Break

When you come back to work on the project:

```bash
# 1. Make sure Docker (PostgreSQL) is running
cd infrastructure/docker
docker compose up -d
cd ../..

# 2. Start the app
pnpm dev

# 3. Open browser
# http://localhost:3001
```

That's it! Your account and data are saved in PostgreSQL, so everything persists between sessions.

---

## Project Scripts Cheat Sheet

| What                     | Command                                | Where to Run |
|--------------------------|----------------------------------------|-------------|
| Start everything         | `pnpm dev`                             | Root        |
| Build everything         | `pnpm build`                           | Root        |
| Start backend only       | `pnpm dev`                             | `applications/backend-api` |
| Start frontend only      | `pnpm dev`                             | `applications/frontend-web` |
| Run database migrations  | `npx prisma migrate dev`               | `backend/database` |
| Push schema (no migration)| `npx prisma db push`                  | `backend/database` |
| Open database GUI        | `npx prisma studio`                    | `backend/database` |
| Check backend compiles   | `npx nest build`                       | `applications/backend-api` |
| Start PostgreSQL         | `docker compose up -d`                 | `infrastructure/docker` |
| Stop PostgreSQL          | `docker compose down`                  | `infrastructure/docker` |

---

> 🎉 **You're all set!** If you followed every step, Veyra should be fully running with AI-powered nutrition, recipes, and skin analysis.
