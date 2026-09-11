import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { ProductMatchingService } from './product-matching.service';

@Injectable()
export class SkinAnalysisService {
  private readonly logger = new Logger(SkinAnalysisService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
    private productMatchingService: ProductMatchingService,
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

  async getLatestRecommendations(userId: string): Promise<any> {
    const latestScan = await this.prisma.skinScan.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        recommendations: true
      }
    });

    if (!latestScan) {
      throw new NotFoundException('No skin scan found for user');
    }

    return latestScan.recommendations;
  }

  async generateRecommendations(userId: string): Promise<any> {
    const latestScan = await this.prisma.skinScan.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latestScan) {
      throw new NotFoundException('No skin scan found to generate recommendations for');
    }

    const userProfile = await this.prisma.userProfile.findUnique({
      where: { userId }
    });

    // 1. Ask AI for recommendations based on skin scan & user profile
    const aiRecommendations = await this.aiService.generateSkinRecommendations({
      profile: userProfile,
      skinAnalysis: latestScan
    });

    // 2. Clear out old recommendations for this scan
    await this.prisma.skinRecommendation.deleteMany({
      where: { skinAnalysisId: latestScan.id }
    });

    const createdRecommendations = [];

    // 3. Match Skincare requirements to Real Products via backend engine
    const matchedSkincare = await this.productMatchingService.matchProducts(aiRecommendations, userProfile, latestScan);

    for (const match of matchedSkincare) {
      const rec = match.recommendation;
      const product = match.product; // Can be null if no match

      const created = await this.prisma.skinRecommendation.create({
        data: {
          skinAnalysisId: latestScan.id,
          category: 'SKINCARE',
          recommendationType: rec.type,
          title: product ? product.name : `Recommended: ${rec.type}`,
          description: product ? `${product.brand} - ${product.description}` : rec.instructions,
          reason: rec.reason,
          priority: rec.priority || 'NORMAL',
          requirements: rec.requirements || [],
          // We can attach product details in requirements or a generic JSON field if needed for UI
          // Using requirements field to store match info temporarily for UI
          instructions: product ? JSON.stringify(product) : null,
        }
      });
      createdRecommendations.push(created);
    }

    // 4. Save Lifestyle, Diet, and Home Remedies
    const categories = ['lifestyle', 'diet', 'homeRemedies'];
    for (const cat of categories) {
      if (aiRecommendations[cat] && Array.isArray(aiRecommendations[cat])) {
        for (const rec of aiRecommendations[cat]) {
          const created = await this.prisma.skinRecommendation.create({
            data: {
              skinAnalysisId: latestScan.id,
              category: cat.toUpperCase(),
              recommendationType: rec.type || cat.toUpperCase(),
              title: rec.title,
              description: rec.description,
              reason: rec.reason,
              priority: 'NORMAL',
            }
          });
          createdRecommendations.push(created);
        }
      }
    }

    return createdRecommendations;
  }
}
