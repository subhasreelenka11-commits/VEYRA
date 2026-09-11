import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class SkinAnalysisService {
  private readonly logger = new Logger(SkinAnalysisService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async processScan(userId: string, base64Image: string): Promise<any> {
    this.logger.log(`Processing skin scan for user ${userId}`);
    
    // Call AI Service
    const analysis = await this.aiService.analyzeSkinImage(base64Image);

    // Parse scores to integers to ensure database compatibility, as AI might return strings
    const parsedOverallScore = parseInt(String(analysis.overallScore), 10) || 0;
    const parsedMetrics = (analysis.metrics || []).map((m: any) => ({
      ...m,
      score: parseInt(String(m.score), 10) || 0,
    }));

    // Save to DB
    const scan = await this.prisma.skinScan.create({
      data: {
        userId,
        overallScore: parsedOverallScore,
        summary: analysis.summary || null,
        metrics: parsedMetrics,
        actives: analysis.actives || [],
      },
    });

    return scan;
  }

  async getHistory(userId: string): Promise<any> {
    return this.prisma.skinScan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
