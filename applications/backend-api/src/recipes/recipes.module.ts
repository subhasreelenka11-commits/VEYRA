import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NutritionModule } from '../nutrition/nutrition.module';

@Module({
  imports: [PrismaModule, AiModule, NutritionModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
