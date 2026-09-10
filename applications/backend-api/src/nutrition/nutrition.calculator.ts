import { Injectable } from '@nestjs/common';
import { ActivityLevel, Goal } from '@prisma/client';

export interface NutritionTargets {
  bmi: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

@Injectable()
export class NutritionCalculator {
  calculateAll(
    age: number,
    weightKg: number,
    heightCm: number,
    gender: string,
    activityLevel: ActivityLevel,
    goal: Goal,
  ): NutritionTargets {
    // 1. BMI
    const heightM = heightCm / 100;
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

    // 2. BMR (Mifflin-St Jeor)
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'MALE') {
      bmr += 5;
    } else if (gender === 'FEMALE') {
      bmr -= 161;
    } else {
      // Neutral fallback for 'OTHER' or 'PREFER_NOT_TO_SAY'
      // Average of male and female constants: (5 - 161) / 2 = -78
      bmr -= 78;
    }
    bmr = Math.round(bmr);

    // 3. TDEE
    const activityMultipliers: Record<ActivityLevel, number> = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      ACTIVE: 1.725,
      VERY_ACTIVE: 1.9,
    };
    
    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));

    // 4. Target Calories
    let targetCalories = tdee;
    if (goal === 'WEIGHT_LOSS') {
      targetCalories = tdee - 500; // Moderate deficit
      // Safety bound: don't go below BMR
      if (targetCalories < bmr) {
        targetCalories = bmr;
      }
    } else if (goal === 'WEIGHT_GAIN') {
      targetCalories = tdee + 300; // Moderate surplus
    }
    // MAINTENANCE and GENERAL_WELLNESS target TDEE
    
    // Safety bounds
    if (targetCalories < 1200) targetCalories = 1200;
    if (targetCalories > 4000) targetCalories = 4000;

    // 5. Macros
    // Protein: ~2g per kg for gain/maintenance, a bit more if cutting to preserve mass
    let proteinGrams = Math.round(weightKg * (goal === 'WEIGHT_LOSS' ? 2.2 : 2.0));
    
    // Fat: ~25-30% of total calories. (1g fat = 9 kcal)
    const fatCalories = targetCalories * 0.25;
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: Remaining calories. (1g carb = 4 kcal, 1g protein = 4 kcal)
    const proteinCalories = proteinGrams * 4;
    const remainingCalories = targetCalories - proteinCalories - fatCalories;
    const carbsGrams = Math.max(0, Math.round(remainingCalories / 4));

    return {
      bmi,
      bmr,
      tdee,
      targetCalories,
      proteinGrams,
      carbsGrams,
      fatGrams,
    };
  }
}
