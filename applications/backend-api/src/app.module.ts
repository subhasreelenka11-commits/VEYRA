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
import { StorageModule } from './storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/', // This serves /public/uploads/file.jpg at http://localhost:5001/uploads/file.jpg
    }),
    PrismaModule, 
    AuthModule, 
    ProfileModule,
    NutritionModule,
    RecipesModule,
    AiModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
