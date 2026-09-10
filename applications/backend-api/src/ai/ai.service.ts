import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {}

  /**
   * Internal helper to call AI providers with fallback logic.
   * Tries Gemini first (if key is available), then falls back to OpenRouter.
   */
  private async executeWithFallback(payload: any): Promise<any> {
    const geminiKey = this.configService.get<string>('GEMINI_API_KEY');
    const openRouterKey = this.configService.get<string>('FALLBACK_LLM_API_KEY') || this.configService.get<string>('OPENROUTER_API_KEY');
    
    let lastError: any = null;

    // 1. Try Gemini
    if (geminiKey) {
      try {
        this.logger.log('Attempting AI generation with Gemini Pro...');
        const geminiPayload = { ...payload, model: 'gemini-3.6-flash', max_tokens: 4096 };
        
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${geminiKey}`
          },
          body: JSON.stringify(geminiPayload)
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) {
            this.logger.log('✅ SUCCESS: AI request fulfilled by GEMINI PRO');
            const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanedText);
          }
        } else {
          this.logger.warn(`Gemini failed with status ${res.status}: ${await res.text()}`);
        }
      } catch (err: any) {
        this.logger.warn(`Gemini exception: ${err.message}`);
        lastError = err;
      }
    } else {
      this.logger.warn('No GEMINI_API_KEY provided, skipping Gemini.');
    }

    // 2. Try OpenRouter (Fallback)
    if (openRouterKey) {
      try {
        this.logger.log('Attempting AI generation with OpenRouter Fallback...');
        const orPayload = { ...payload, model: 'google/gemini-2.5-flash', max_tokens: 4096 };
        
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Veyra'
          },
          body: JSON.stringify(orPayload)
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) {
            this.logger.log('✅ SUCCESS: AI request fulfilled by OPENROUTER');
            const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanedText);
          }
        } else {
          this.logger.error(`OpenRouter failed with status ${res.status}: ${await res.text()}`);
        }
      } catch (err: any) {
        this.logger.error(`OpenRouter exception: ${err.message}`);
        lastError = err;
      }
    } else {
      this.logger.error('No FALLBACK_LLM_API_KEY (OpenRouter) provided.');
    }

    throw new InternalServerErrorException('All AI providers failed to generate a response.');
  }

  async generateNutritionPlan(context: any): Promise<any> {
    const systemPrompt = `You are an elite, professional clinical dietitian and sports nutritionist for the Veyra app.
Your task is to generate a highly structured, clinical macro-nutrient and supplementation schedule based strictly on the user's profile and pre-calculated targets.

IMPORTANT INSTRUCTIONS:
- The backend has already calculated the exact daily nutrition targets (Calories, Protein, Carbs, Fat). DO NOT recalculate them.
- DO NOT suggest ANY specific food items, ingredients, or recipes.
- ONLY provide the precise time block, exact macro-nutrient distribution, and professional clinical instructions.
- Return ONLY valid JSON. Do not include markdown code blocks.

REQUIRED JSON STRUCTURE:
{
  "summary": "Clinical overview of the prescribed protocol and macro distribution strategy.",
  "dailyCalories": 1800,
  "macros": { "protein": 120, "carbs": 200, "fat": 55 },
  "meals": [
    {
      "name": "Meal 1 (Morning Protocol)",
      "suggestions": [
        { "meal": "Macro-Nutrient Target", "description": "Instruction here.", "approxCalories": 400, "protein": 25, "carbs": 45, "fat": 12 }
      ]
    }
  ],
  "hydration": { "suggestion": "...", "note": "..." },
  "tips": ["Tip 1", "Tip 2"]
}`;

    const userPrompt = `User Profile & Targets:
${JSON.stringify(context, null, 2)}

Generate the personalized meal plan as a JSON object matching the required structure exactly.`;

    const payload = {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" }
    };

    return this.executeWithFallback(payload);
  }

  async generateSmartRecipes(context: any): Promise<any> {
    const systemPrompt = `You are an elite, professional culinary nutritionist for the Veyra app.
Your task is to generate 7 personalized, delicious recipes that STRICTLY adhere to the user's calculated macro-nutrient targets and constraints (allergies, dislikes).

IMPORTANT INSTRUCTIONS:
- Generate exactly 7 recipes.
- Allergies are HARD CONSTRAINTS.
- Return ONLY valid JSON. Do not include markdown code blocks.

REQUIRED JSON STRUCTURE:
{
  "recipes": [
    {
      "id": "will_be_generated_by_db",
      "title": "Recipe Name",
      "category": "High Protein",
      "time": "25 min",
      "calories": "[DYNAMIC]",
      "macros": { "protein": "[DYNAMIC]g", "carbs": "[DYNAMIC]g", "fat": "[DYNAMIC]g" },
      "tags": ["Gluten-Free"],
      "image": "/placeholder.png",
      "description": "Description",
      "benefits": "Benefit",
      "ingredients": ["Ingredient 1"],
      "instructions": ["Step 1"]
    }
  ]
}`;

    const userPrompt = `User Profile & Targets:
${JSON.stringify(context, null, 2)}

Generate the recipes JSON.`;

    const payload = {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" }
    };

    return this.executeWithFallback(payload);
  }

  async analyzeSkinImage(base64Image: string): Promise<any> {
    const systemPrompt = `You are an elite, AI-powered virtual dermatologist. Analyze the provided facial scan image.
You must return your analysis STRICTLY as a valid JSON object. Do not include markdown code blocks.

REQUIRED JSON STRUCTURE:
{
  "overallScore": 85,
  "metrics": [
    { "name": "Barrier Integrity", "score": 88, "status": "Optimal", "color": "text-emerald-700", "bg": "bg-emerald-500", "note": "Analysis note here" },
    { "name": "Hydration Level", "score": 82, "status": "Hydrated", "color": "text-emerald-700", "bg": "bg-emerald-500", "note": "Analysis note here" },
    { "name": "Texture & Micro-relief", "score": 79, "status": "Smooth", "color": "text-emerald-700", "bg": "bg-emerald-500", "note": "Analysis note here" },
    { "name": "Redness & Sensitivity", "score": 22, "status": "Low Risk", "color": "text-[#708264]", "bg": "bg-[#708264]", "note": "Analysis note here" },
    { "name": "Sebum Equilibrium", "score": 38, "status": "Balanced", "color": "text-emerald-700", "bg": "bg-emerald-500", "note": "Analysis note here" },
    { "name": "UV / Photo-stress", "score": 16, "status": "Low", "color": "text-[#708264]", "bg": "bg-[#708264]", "note": "Analysis note here" }
  ],
  "actives": [
    {
      "name": "Recommended Active Ingredient Name",
      "purpose": "Why this is prescribed based on the scan.",
      "match": "96% Match",
      "type": "Morning & Night"
    }
  ]
}

Provide exactly 6 metrics matching those names, and 3-4 recommended actives. Format precisely as requested.`;

    const payload = {
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this skin scan.' },
            { type: 'image_url', image_url: { url: base64Image } }
          ]
        }
      ],
      response_format: { type: "json_object" }
    };

    return this.executeWithFallback(payload);
  }

  async generateGroomingRoutine(skinScanData: any, userProfile: any): Promise<any> {
    const systemPrompt = `You are an elite, AI-powered virtual dermatologist and skincare expert.
Your task is to generate a highly personalized daily and weekly grooming routine based on the user's latest skin scan and profile.

IMPORTANT INSTRUCTIONS:
- You must generate three separate routines: "morning", "evening", and "weekly".
- Each routine should have 2-5 steps.
- Suggest specific product types and active ingredients based on the skin scan's recommended actives and the user's skin metrics.
- Take into account the user's profile, including their gender, age, and budget, to tailor the product recommendations.
- Return ONLY valid JSON. Do not include markdown code blocks.

REQUIRED JSON STRUCTURE:
{
  "routineData": {
    "morning": [
      {
        "id": "m1",
        "stepNumber": "01",
        "title": "Gentle Hydrating Cleanse",
        "category": "Cleanse",
        "description": "Massage onto damp skin...",
        "duration": "60 sec",
        "actives": ["Glycerin", "Amino Acids"],
        "productName": "Botanical Velvet Cleanser",
        "productType": "Cleanser"
      }
    ],
    "evening": [
      {
        "id": "e1",
        "stepNumber": "01",
        "title": "Clarifying Oil Pre-Cleanse",
        "category": "First Cleanse",
        "description": "Dissolves mineral sunscreen...",
        "duration": "60 sec",
        "actives": ["Squalane"],
        "productName": "Purifying Botanical Cleansing Oil",
        "productType": "Oil Cleanse"
      }
    ],
    "weekly": [
      {
        "id": "w1",
        "stepNumber": "01",
        "title": "Papaya Enzyme Gentle Peel",
        "category": "Exfoliate",
        "description": "Natural enzymatic non-abrasive treatment...",
        "duration": "10 min",
        "actives": ["Papain", "Lactic Acid 5%"],
        "productName": "Micro-Exfoliating Enzyme Glaze",
        "productType": "Weekly Mask"
      }
    ]
  }
}`;

    const userPrompt = `User Profile:
${JSON.stringify(userProfile, null, 2)}

Latest Skin Scan Metrics:
${JSON.stringify(skinScanData, null, 2)}

Generate the personalized grooming routine as a JSON object matching the required structure exactly.`;

    const payload = {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" }
    };

    return this.executeWithFallback(payload);
  }
}
