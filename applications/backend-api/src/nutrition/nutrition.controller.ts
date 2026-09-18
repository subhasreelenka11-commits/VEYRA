import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NutritionPlan } from '../generated/client';

@Controller('nutrition')
@UseGuards(JwtAuthGuard)
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get()
  async getNutritionPlan(@Request() req: any): Promise<NutritionPlan | null> {
    const userId = req.user.userId;
    const plan = await this.nutritionService.getNutritionPlan(userId);
    return plan;
  }

  @Post('generate')
  async generateNutritionPlan(@Request() req: any): Promise<NutritionPlan> {
    const userId = req.user.userId;
    const plan = await this.nutritionService.generateNutritionPlan(userId);
    return plan;
  }
}
