import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NutritionModule } from '../nutrition/nutrition.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [PrismaModule, AiModule, NutritionModule, AwsModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
