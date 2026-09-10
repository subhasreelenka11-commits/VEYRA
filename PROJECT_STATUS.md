# 📊 VEYRA — Project Status Tracker

> Last Updated: September 10, 2026 | 3:12 PM IST

---

## 1. Infrastructure Setup

| #  | Step                           | Command / Action                                        | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | Node.js v20 installed          | `node -v` → v20.x.x                                    | ✅ Done |
| 2  | pnpm v9 installed              | `pnpm -v` → 9.x.x                                      | ✅ Done |
| 3  | Docker installed               | `docker -v`                                              | ✅ Done |
| 4  | PostgreSQL container running   | `cd infrastructure/docker && docker compose up -d`       | ✅ Done |
| 5  | Dependencies installed         | `pnpm install` (from root)                              | ✅ Done |
| 6  | `.env` configured              | Copied from `.env.example`, keys filled in              | ✅ Done |
| 7  | `GEMINI_API_KEY` set           | Google Gemini Pro key in `.env`                         | ✅ Done |
| 8  | `FALLBACK_LLM_API_KEY` set     | OpenRouter key in `.env`                                | ✅ Done |

---

## 2. Database Setup

| #  | Step                           | Command / Action                                        | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | Prisma schema defined          | `backend/database/prisma/schema.prisma`                 | ✅ Done |
| 2  | Initial migration applied      | `npx prisma migrate dev`                                | ✅ Done |
| 3  | Prisma Client generated        | `npx prisma generate`                                   | ✅ Done |
| 4  | `User` model                   | id, email, passwordHash, timestamps                     | ✅ Done |
| 5  | `UserProfile` model            | demographics, body stats, allergies, dislikes           | ✅ Done |
| 6  | `NutritionPlan` model          | BMI, BMR, TDEE, macros, planData (JSON)                 | ✅ Done |
| 7  | `SmartRecipe` model            | recipeData (JSON), userId                               | ✅ Done |
| 8  | `SkinScan` model               | overallScore, metrics (JSON), actives (JSON)            | ✅ Done |
| 9  | Enums (Activity, Goal, Diet)   | ActivityLevel, Goal, DietaryPreference                  | ✅ Done |

---

## 3. Backend API (NestJS — Port 5001)

### 3.1 Core Setup

| #  | Step                           | Details                                                 | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | NestJS app bootstrap           | `main.ts` with CORS, ValidationPipe, cookieParser       | ✅ Done |
| 2  | CORS configured                | Allows localhost:3000, 3001, 127.0.0.1:3000, 3001      | ✅ Done |
| 3  | Server timeout (120s)          | `server.setTimeout(120000)` for AI requests             | ✅ Done |
| 4  | Global validation pipe         | Whitelist, forbidNonWhitelisted, transform              | ✅ Done |
| 5  | ConfigModule (global)          | Reads `../../.env` automatically                        | ✅ Done |
| 6  | PrismaModule (global)          | Shared DB service across all modules                    | ✅ Done |

### 3.2 Modules & Controllers

| #  | Module           | Controller Route        | Method | Auth Required | Description                              | Status |
|----|------------------|-------------------------|--------|---------------|------------------------------------------|--------|
| 1  | **AppModule**    | `/health`               | GET    | ❌ No         | Health check → `{ status: 'ok' }`       | ✅ Done |
| 2  | **AuthModule**   | `/auth/register`        | POST   | ❌ No         | Create account (email + password)        | ✅ Done |
| 3  | **AuthModule**   | `/auth/login`           | POST   | ❌ No         | Login → sets `accessToken` cookie        | ✅ Done |
| 4  | **AuthModule**   | `/auth/logout`          | POST   | ❌ No         | Clears auth cookie                       | ✅ Done |
| 5  | **AuthModule**   | `/auth/me`              | GET    | ✅ Yes        | Current user + profile data              | ✅ Done |
| 6  | **ProfileModule**| `/profile`              | GET    | ✅ Yes        | Profile + BMI + isComplete flag          | ✅ Done |
| 7  | **ProfileModule**| `/profile`              | PUT    | ✅ Yes        | Upsert profile fields                   | ✅ Done |
| 8  | **NutritionModule** | `/nutrition`         | GET    | ✅ Yes        | Get saved nutrition plan                 | ✅ Done |
| 9  | **NutritionModule** | `/nutrition/generate`| POST   | ✅ Yes        | AI-generate nutrition plan               | ✅ Done |
| 10 | **RecipesModule**| `/recipes`              | GET    | ✅ Yes        | Get saved recipes                        | ✅ Done |
| 11 | **RecipesModule**| `/recipes/generate`     | POST   | ✅ Yes        | AI-generate 7 recipes                    | ✅ Done |
| 12 | **SkinAnalysis** | `/skin-analysis/scan`   | POST   | ✅ Yes        | AI-analyze face scan (base64 image)      | ✅ Done |
| 13 | **SkinAnalysis** | `/skin-analysis/history`| GET    | ✅ Yes        | Get past scan results                    | ✅ Done |

### 3.3 Services

| #  | Service                | Key Methods                                    | Status |
|----|------------------------|------------------------------------------------|--------|
| 1  | `PrismaService`        | `$connect()`, `$disconnect()`                  | ✅ Done |
| 2  | `AuthService`          | `register()`, `login()`, `getCurrentUser()`    | ✅ Done |
| 3  | `ProfileService`       | `getProfile()`, `upsertProfile()`, BMI calc    | ✅ Done |
| 4  | `NutritionCalculator`  | `calculateAll()` — BMI, BMR, TDEE, macros      | ✅ Done |
| 5  | `NutritionService`     | `getNutritionPlan()`, `generateNutritionPlan()` | ✅ Done |
| 6  | `RecipesService`       | `getSavedRecipes()`, `generateSmartRecipes()`  | ✅ Done |
| 7  | `SkinAnalysisService`  | `processScan()`, `getHistory()`                | ✅ Done |
| 8  | `AiService`            | `executeWithFallback()` — Gemini + OpenRouter  | ✅ Done |

---

## 4. AI Provider Integration

| #  | Step                           | Details                                                 | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | Gemini API integration         | Primary provider via OpenAI-compatible endpoint         | ✅ Done |
| 2  | Gemini model configured        | `gemini-3.6-flash`                                      | ✅ Done |
| 3  | OpenRouter API integration     | Fallback provider                                       | ✅ Done |
| 4  | OpenRouter model configured    | `google/gemini-2.5-flash`                               | ✅ Done |
| 5  | Fallback logic                 | Try Gemini → fail → Try OpenRouter → fail → 500        | ✅ Done |
| 6  | `max_tokens: 4096` set         | Prevents OpenRouter 402 credit errors                   | ✅ Done |
| 7  | Success logging                | `✅ SUCCESS: AI request fulfilled by GEMINI PRO`        | ✅ Done |
| 8  | Failure logging                | Warns on Gemini fail, errors on OpenRouter fail         | ✅ Done |
| 9  | Nutrition plan AI prompt       | Clinical dietitian, macro time-blocks, no food items    | ✅ Done |
| 10 | Smart recipes AI prompt        | 7 recipes, allergy-safe, macro-matched                  | ✅ Done |
| 11 | Skin analysis AI prompt        | 6 biomarkers + 3-4 active ingredients                   | ✅ Done |

---

## 5. Frontend (Next.js 14 — Port 3001)

### 5.1 Core Setup

| #  | Step                           | Details                                                 | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | Next.js 14 App Router          | `applications/frontend-web`                             | ✅ Done |
| 2  | Tailwind CSS 3 configured      | Styling framework                                       | ✅ Done |
| 3  | `fetchApi()` utility           | Centralized API wrapper with 120s timeout               | ✅ Done |
| 4  | `AuthContext` provider         | User state, route guarding, auto-redirect               | ✅ Done |
| 5  | Dashboard layout (sidebar)     | Collapsible sidebar + top header bar                    | ✅ Done |
| 6  | Proxy rewrites configured      | `/api/*`, `/auth/*`, `/recipes/*`, `/skin-analysis/*`   | ✅ Done |
| 7  | `proxyTimeout: 120000`         | 2-min timeout for AI proxy requests                     | ✅ Done |

### 5.2 Pages

| #  | Route              | Page Name              | Key Features                                         | Status |
|----|--------------------|------------------------|------------------------------------------------------|--------|
| 1  | `/`                | Landing Page           | Hero, features grid, how-it-works, CTA               | ✅ Done |
| 2  | `/login`           | Sign In                | Email/password, social OAuth buttons                  | ✅ Done |
| 3  | `/register`        | Create Account         | Registration → auto-login → onboarding               | ✅ Done |
| 4  | `/onboarding`      | Profile Setup          | 3-step wizard (About → Body → Food)                  | ✅ Done |
| 5  | `/dashboard`       | Dashboard Overview     | Greeting, BMI card, skin score, daily rituals         | ✅ Done |
| 6  | `/skin-analysis`   | AI Skin Scanner        | Camera + oval guide + 3s countdown + auto-capture     | ✅ Done |
| 7  | `/grooming`        | Skincare Routines      | Morning/Evening/Weekly rituals, cleanse timer         | ✅ Done |
| 8  | `/nutrition`       | Nutrition Plan         | AI macro schedule, hydration, BMR/TDEE snapshot       | ✅ Done |
| 9  | `/recipes`         | Smart Recipes          | 7 AI recipes, search/filter, detail modal             | ✅ Done |
| 10 | `/products`        | Apothecary             | Product recs matched to skin biomarkers               | ✅ Done |
| 11 | `/progress`        | Biometric Tracking     | SVG charts, habit heatmap, milestone timeline         | ✅ Done |
| 12 | `/profile`         | Health Blueprint       | Edit demographics, allergies, live BMI calc           | ✅ Done |
| 13 | `/settings`        | Preferences            | Notifications, privacy, units, data export            | ✅ Done |

### 5.3 Skin Analysis Camera Flow

| #  | Step                           | Details                                                 | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | Click "Start New Scan"         | Opens browser camera via `getUserMedia`                 | ✅ Done |
| 2  | Face oval guide overlay        | Dashed emerald oval with scanning animation             | ✅ Done |
| 3  | 3-second countdown             | Big number in center: 3... 2... 1...                    | ✅ Done |
| 4  | Auto-capture at 0              | Canvas captures video frame as JPEG base64              | ✅ Done |
| 5  | Camera stops                   | Stream tracks stopped, UI transitions to "Scanning..."  | ✅ Done |
| 6  | POST to `/skin-analysis/scan`  | Sends `{ image: base64 }` to backend                   | ✅ Done |
| 7  | AI analyzes image              | Gemini/OpenRouter processes the facial scan             | ✅ Done |
| 8  | Results displayed              | 6 biomarkers + active ingredients + overall score       | ✅ Done |
| 9  | Saved to database              | `SkinScan` record created in PostgreSQL                 | ✅ Done |

---

## 6. Route Protection & Auth Flow

| #  | Step                           | Details                                                 | Status |
|----|--------------------------------|---------------------------------------------------------|--------|
| 1  | JWT token generation           | On login, signed with `JWT_SECRET`, 7-day expiry        | ✅ Done |
| 2  | HttpOnly cookie storage        | `accessToken` cookie, secure, same-site                 | ✅ Done |
| 3  | JwtAuthGuard on routes         | All `/profile`, `/nutrition`, `/recipes`, `/skin-*`     | ✅ Done |
| 4  | Frontend route protection      | `AuthContext` checks auth on every navigation           | ✅ Done |
| 5  | Unauthenticated → `/login`     | Auto-redirect for protected routes                      | ✅ Done |
| 6  | Incomplete profile → `/onboarding` | Auto-redirect if profile missing required fields    | ✅ Done |
| 7  | Already logged in → `/dashboard` | Prevents accessing `/login` or `/register`            | ✅ Done |

---

## 7. Timeout & Performance

| #  | Layer                    | Config                            | Value   | Status |
|----|--------------------------|-----------------------------------|---------|--------|
| 1  | Backend HTTP server      | `server.setTimeout()`             | 120s    | ✅ Done |
| 2  | Backend keep-alive       | `server.keepAliveTimeout`         | 120s    | ✅ Done |
| 3  | Backend headers          | `server.headersTimeout`           | 125s    | ✅ Done |
| 4  | Next.js proxy            | `experimental.proxyTimeout`       | 120s    | ✅ Done |
| 5  | Frontend fetch           | `AbortSignal.timeout()`           | 120s    | ✅ Done |
| 6  | AI `max_tokens`          | Capped in `executeWithFallback()` | 4096    | ✅ Done |

---

## 8. Bugs Fixed

| #  | Bug                                     | Root Cause                                  | Fix Applied                              | Status |
|----|-----------------------------------------|---------------------------------------------|------------------------------------------|--------|
| 1  | `Cannot POST /skin-analysis/scan` (404) | TypeScript compile errors in controller     | Fixed import path + added return types   | ✅ Fixed |
| 2  | `Module not found: ../../../lib/api`    | Wrong relative import path                  | Changed to `../../lib/api`               | ✅ Fixed |
| 3  | `body-parser` module not found          | Package not installed                       | Switched to `express.json()` built-in    | ✅ Fixed |
| 4  | `413 Payload Too Large`                 | Default body limit too small for base64     | Set `json({ limit: '50mb' })`           | ✅ Fixed |
| 5  | `socket hang up` / `ECONNRESET`        | Proxy timeout shorter than AI response time | Set 120s timeout on all layers           | ✅ Fixed |
| 6  | Gemini 404: `gemini-1.5-pro` not found | Model deprecated by Google                  | Updated to `gemini-3.6-flash`            | ✅ Fixed |
| 7  | OpenRouter 402: insufficient credits   | Default 65535 max_tokens too expensive      | Added `max_tokens: 4096`                 | ✅ Fixed |
| 8  | OpenRouter 400: invalid model ID       | `google/gemini-1.5-pro` doesn't exist       | Updated to `google/gemini-2.5-flash`     | ✅ Fixed |
| 9  | Backend not picking up code changes    | `nest --watch` stuck after compile error    | Manual restart: `Ctrl+C` → `pnpm dev`   | ✅ Fixed |

---

## 9. Static/Mock Data Pages (Future Work)

| #  | Page              | What's Static                                              | Status       |
|----|-------------------|------------------------------------------------------------|--------------|
| 1  | `/grooming`       | Morning/Evening/Weekly routines are hardcoded              | 📋 Static    |
| 2  | `/products`       | Product recommendations are hardcoded                      | 📋 Static    |
| 3  | `/progress`       | SVG charts, heatmap, milestones are mock data              | 📋 Static    |
| 4  | `/settings`       | Notification toggles, privacy switches (UI only, no save)  | 📋 Static    |
| 5  | `/dashboard`      | Skin score (84/100) hardcoded, daily rituals local state   | 📋 Partial   |

---

## 10. Overall Summary

| Category               | Total | Done | Pending | Status       |
|------------------------|-------|------|---------|--------------|
| Infrastructure         | 8     | 8    | 0       | ✅ Complete   |
| Database               | 9     | 9    | 0       | ✅ Complete   |
| Backend API Routes     | 13    | 13   | 0       | ✅ Complete   |
| Backend Services       | 8     | 8    | 0       | ✅ Complete   |
| AI Integration         | 11    | 11   | 0       | ✅ Complete   |
| Frontend Core          | 7     | 7    | 0       | ✅ Complete   |
| Frontend Pages         | 13    | 13   | 0       | ✅ Complete   |
| Camera Scan Flow       | 9     | 9    | 0       | ✅ Complete   |
| Auth & Route Guards    | 7     | 7    | 0       | ✅ Complete   |
| Timeout Config         | 6     | 6    | 0       | ✅ Complete   |
| Bugs Fixed             | 9     | 9    | 0       | ✅ All Fixed  |
| Static/Mock Pages      | 5     | 0    | 5       | 📋 Future     |
| **TOTAL**              | **105** | **100** | **5** | **95% Done** |

---

> 📌 **Legend:** ✅ Done/Fixed | 📋 Static/Future | ⚠️ In Progress | ❌ Blocked
