import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {}

  async generateNutritionPlan(context: any): Promise<any> {
    const apiKey = this.configService.get<string>('FALLBACK_LLM_API_KEY');
    const baseUrl = this.configService.get<string>('FALLBACK_LLM_BASE_URL') || 'https://api.openai.com/v1';
    const model = this.configService.get<string>('FALLBACK_AI_MODEL') || 'gpt-4o-mini';
    
    if (!apiKey) {
      this.logger.error('FALLBACK_LLM_API_KEY is not defined in environment variables.');
      throw new InternalServerErrorException('AI configuration error.');
    }

    const systemPrompt = `You are an elite, professional clinical dietitian and sports nutritionist for the Veyra app.
Your task is to generate a highly structured, clinical macro-nutrient and supplementation schedule based strictly on the user's profile and pre-calculated targets.

IMPORTANT INSTRUCTIONS:
- The backend has already calculated the exact daily nutrition targets (Calories, Protein, Carbs, Fat). DO NOT recalculate them.
- DO NOT suggest ANY specific food items, ingredients, or recipes.
- ONLY provide the precise time block (e.g., "08:00 AM - 09:00 AM" or "Post-Workout"), the exact macro-nutrient distribution required for that block, and professional clinical instructions.
- Provide expert guidance on nutrient timing, hydration protocols, and any essential supplementary intake (e.g., Whey isolate, Creatine, Omega-3s, Multivitamins) if relevant to their goal.
- For the hydration protocol, provide highly specific, elite-level sports science recommendations (including precise electrolyte replenishment targets like sodium/potassium, and exact fluid timing around workouts).
- Maintain a clinical, highly professional tone.
- Return ONLY valid JSON. Do not include markdown code blocks or any free-form text outside the JSON.

REQUIRED JSON STRUCTURE:
{
  "summary": "Clinical overview of the prescribed protocol and macro distribution strategy.",
  "dailyCalories": 1800,
  "macros": { "protein": 120, "carbs": 200, "fat": 55 },
  "meals": [
    {
      "name": "Meal 1 (Morning Protocol)",
      "suggestions": [
        { "meal": "Macro-Nutrient Target", "description": "Consume 25% of daily protein. Clinical instruction: Prioritize fast-absorbing protein and complex carbohydrates to break the fast.", "approxCalories": 400, "protein": 25, "carbs": 45, "fat": 12 }
      ]
    },
    { "name": "Meal 2 (Mid-Day Protocol)", "suggestions": [] },
    { "name": "Meal 3 (Pre/Post Training Protocol)", "suggestions": [] },
    { "name": "Meal 4 (Evening Protocol)", "suggestions": [] }
  ],
  "hydration": { "suggestion": "Base clinical protocol: 3.5-4.0L structured daily intake.", "note": "Intra-workout: Consume 500ml-750ml hypotonic fluid per hour of training. Add 500mg sodium and 200mg potassium to replenish critical electrolytes and support cellular hydration." },
  "tips": ["Clinical Tip 1 (e.g., regarding nutrient timing)", "Clinical Tip 2 (e.g., regarding supplement timing)"]
}`;

    const userPrompt = `User Profile & Targets:
${JSON.stringify(context, null, 2)}

Generate the personalized meal plan as a JSON object matching the required structure exactly.`;

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`AI API Error: ${response.status} - ${errorText}`);
        throw new Error(`AI Provider failed: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      
      if (!text) {
        throw new Error('No content returned from AI');
      }

      // Ensure valid JSON parsing by stripping markdown code blocks
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonPlan = JSON.parse(cleanedText);
      return jsonPlan;

    } catch (error: any) {
      this.logger.error('Failed to generate nutrition plan:', error.message);
      throw new InternalServerErrorException('Failed to generate personalized nutrition plan.');
    }
  }

  async generateSmartRecipes(context: any): Promise<any> {
    const apiKey = this.configService.get<string>('FALLBACK_LLM_API_KEY');
    const baseUrl = this.configService.get<string>('FALLBACK_LLM_BASE_URL') || 'https://api.openai.com/v1';
    const model = this.configService.get<string>('FALLBACK_AI_MODEL') || 'gpt-4o-mini';
    
    if (!apiKey) {
      throw new InternalServerErrorException('AI configuration error.');
    }

    const systemPrompt = `You are an elite, professional culinary nutritionist for the Veyra app.
Your task is to generate 7 personalized, delicious recipes (one for each day of the week) that STRICTLY adhere to the user's calculated macro-nutrient targets, dietary preferences, and constraints (allergies, dislikes).

IMPORTANT INSTRUCTIONS:
- Generate exactly 7 recipes.
- The macros for each recipe should represent roughly one main meal (e.g., 30-40% of their daily target).
- Allergies are HARD CONSTRAINTS. Never suggest any ingredient listed in allergies.
- Return ONLY valid JSON. Do not include markdown code blocks.

REQUIRED JSON STRUCTURE:
{
  "recipes": [
    {
      "id": "will_be_generated_by_db",
      "title": "Creative & Appetizing Recipe Name",
      "category": "High Protein",
      "time": "25 min",
      "calories": "[DYNAMIC: Calculate to be roughly 30-40% of the user's daily target kcal]",
      "macros": { 
        "protein": "[DYNAMIC: ~33% of daily target]g", 
        "carbs": "[DYNAMIC: ~33% of daily target]g", 
        "fat": "[DYNAMIC: ~33% of daily target]g" 
      },
      "tags": ["Gluten-Free", "High Omega-3"],
      "image": "/placeholder.png",
      "description": "Mouth-watering description of the meal.",
      "benefits": "Targeted wellness benefit (e.g., Skin Glow, Muscle Recovery).",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "instructions": ["Step 1", "Step 2"]
    }
  ]
}`;

    const userPrompt = `User Profile & Targets:
${JSON.stringify(context, null, 2)}

Generate the recipes JSON.`;

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI Provider error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      
      if (!text) {
        throw new Error('No content returned from AI');
      }

      // Strip potential markdown code blocks (e.g., ```json\n...\n```) before parsing
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      return JSON.parse(cleanedText);
    } catch (error: any) {
      this.logger.error('Failed to generate smart recipes:', error.message);
      throw new InternalServerErrorException(`Failed to generate personalized recipes: ${error.message}`);
    }
  }
}
