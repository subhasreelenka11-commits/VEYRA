import { Module } from '@nestjs/common';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';
import { NutritionCalculator } from './nutrition.calculator';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [NutritionController],
  providers: [NutritionService, NutritionCalculator],
  exports: [NutritionCalculator],
})
export class NutritionModule {}
