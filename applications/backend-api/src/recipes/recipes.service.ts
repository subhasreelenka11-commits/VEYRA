import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { NutritionCalculator } from '../nutrition/nutrition.calculator';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private calculator: NutritionCalculator,
    private awsService: AwsService,
  ) {}

  async getSavedRecipes(userId: string): Promise<any[]> {
    // @ts-ignore
    return this.prisma.smartRecipe.findMany({
      where: {
        OR: [
          { userId: userId },
          { userId: null },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async generateSmartRecipes(userId: string): Promise<any[]> {
    // 1. Get User Profile
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('User profile not found. Please complete onboarding first.');
    }

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

    // 4. Request AI Recipes
    this.logger.log(`Generating AI smart recipes for user ${userId}...`);
    const aiRecipesData = await this.aiService.generateSmartRecipes(aiContext);

    // 5. Save the Recipes & Generate/Upload Images
    const savedRecipes: any[] = [];
    for (const recipe of aiRecipesData.recipes) {
      try {
        this.logger.log(`Fetching/generating image buffer for recipe: ${recipe.title}`);
        const imageBuffer = await this.aiService.generateImageBuffer(recipe.title);
        const s3Url = await this.awsService.uploadImage(imageBuffer, 'image/jpeg');
        if (s3Url) {
          recipe.image = s3Url;
        }
      } catch (err: any) {
        this.logger.error(`Failed to generate/upload image for recipe ${recipe.title}: ${err.message}`);
        // Keep the raw generated URL or a static fallback if it fails
      }

      // @ts-ignore
      const saved = await this.prisma.smartRecipe.create({
        data: {
          userId,
          recipeData: recipe,
        },
      });
      savedRecipes.push(saved);
    }

    return savedRecipes;
  }
}
