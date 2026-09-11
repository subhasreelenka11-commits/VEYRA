import { Module } from '@nestjs/common';
import { SkinAnalysisController } from './skin-analysis.controller';
import { SkinAnalysisService } from './skin-analysis.service';
import { ProductMatchingService } from './product-matching.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [SkinAnalysisController],
  providers: [SkinAnalysisService, ProductMatchingService],
})
export class SkinAnalysisModule {}
