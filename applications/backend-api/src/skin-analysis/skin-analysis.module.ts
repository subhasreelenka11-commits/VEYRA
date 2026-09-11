import { Module } from '@nestjs/common';
import { SkinAnalysisController } from './skin-analysis.controller';
import { SkinAnalysisService } from './skin-analysis.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [SkinAnalysisController],
  providers: [SkinAnalysisService],
})
export class SkinAnalysisModule {}
