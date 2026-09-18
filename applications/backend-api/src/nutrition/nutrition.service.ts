import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NutritionCalculator } from './nutrition.calculator';
import { AiService } from '../ai/ai.service';
import { UserProfile, NutritionPlan } from '../generated/client';

@Injectable()
export class NutritionService {
  private readonly logger = new Logger(NutritionService.name);

  constructor(
    private prisma: PrismaService,
    private calculator: NutritionCalculator,
    private aiService: AiService,
  ) {}

  async getNutritionPlan(userId: string): Promise<NutritionPlan | null> {
    // @ts-ignore: This error will resolve once npx prisma generate is run
    const plan = await this.prisma.nutritionPlan.findUnique({
      where: { userId },
    });
    return plan;
  }

  async generateNutritionPlan(userId: string): Promise<NutritionPlan> {
    // 1. Get User Profile
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('User profile not found. Please complete onboarding first.');
    }

    // Validate required fields
    if (!profile.age || !profile.weight || !profile.height) {
      throw new BadRequestException('Profile is missing required health metrics (age, weight, height).');
    }

    // 2. Calculate Targets
    const targets = this.calculator.calculateAll(
      profile.age,
      profile.weight,
      profile.height,
      profile.gender || 'PREFER_NOT_TO_SAY',
      profile.activityLevel || 'SEDENTARY',
      profile.goal || 'MAINTENANCE',
    );

    // 3. Prepare AI Context
    const aiContext = {
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      activityLevel: profile.activityLevel,
      goal: profile.goal,
      dietaryPreference: profile.dietaryPreference,
      allergies: profile.allergies,
      dislikes: profile.dislikes,
      budget: profile.budget,
      cookingTime: profile.cookingTime,
      calculatedNutrition: targets,
    };

    // 4. Request AI Plan
    this.logger.log(`Generating AI nutrition plan for user ${userId}...`);
    const aiPlanData = await this.aiService.generateNutritionPlan(aiContext);

    // 5. Save the Plan (Upsert to replace existing)
    // @ts-ignore: This error will resolve once npx prisma generate is run
    const savedPlan = await this.prisma.nutritionPlan.upsert({
      where: { userId },
      create: {
        userId,
        ...targets,
        planData: aiPlanData,
      },
      update: {
        ...targets,
        planData: aiPlanData,
      },
    });

    return savedPlan;
  }
}
