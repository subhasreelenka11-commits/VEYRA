import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { RecipesModule } from './recipes/recipes.module';
import { AiModule } from './ai/ai.module';
import { GroomingModule } from './grooming/grooming.module';
import { SkinAnalysisModule } from './skin-analysis/skin-analysis.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    PrismaModule, 
    AuthModule, 
    ProfileModule,
    NutritionModule,
    RecipesModule,
    AiModule,
    GroomingModule,
    SkinAnalysisModule,
    ProgressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
