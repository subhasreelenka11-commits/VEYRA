import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NutritionModule } from '../nutrition/nutrition.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, AiModule, NutritionModule, StorageModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
