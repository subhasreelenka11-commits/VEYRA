import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class GroomingService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getRoutine(userId: string, date: string): Promise<any> {
    const routine = await this.prisma.groomingRoutine.findUnique({
      where: { userId },
    });

    let progress = await this.prisma.routineProgress.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });

    if (!progress) {
      progress = await this.prisma.routineProgress.create({
        data: {
          userId,
          date,
          completedSteps: [],
        },
      });
    }

    return {
      routine: routine ? routine.routineData : null,
      progress: progress.completedSteps,
    };
  }

  async generateRoutine(userId: string): Promise<any> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new BadRequestException('User profile not found. Complete onboarding first.');
    }

    const latestScan = await this.prisma.skinScan.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestScan) {
      throw new BadRequestException('No skin scan found. Please complete a skin scan first.');
    }

    const recommendations = await this.prisma.skinRecommendation.findMany({
      where: { skinAnalysisId: latestScan.id, category: 'SKINCARE' }
    });

    const morningSteps = [];
    const eveningSteps = [];
    const weeklySteps = [];

    let mCount = 1;
    let eCount = 1;
    let wCount = 1;

    for (const rec of recommendations) {
      let instructions;
      try {
        instructions = JSON.parse(rec.instructions || '{}');
      } catch (e) {
        instructions = {};
      }

      const step = {
        id: rec.id,
        title: rec.title,
        category: rec.recommendationType,
        description: rec.reason || rec.description,
        duration: '60 sec',
        actives: [],
        productName: instructions.name || rec.title,
        productType: rec.recommendationType
      };

      const type = (rec.recommendationType || '').toUpperCase();
      
      if (type.includes('CLEANSER') || type.includes('WASH')) {
        morningSteps.push({ ...step, id: rec.id + '-m', stepNumber: `0${mCount++}` });
        eveningSteps.push({ ...step, id: rec.id + '-e', stepNumber: `0${eCount++}` });
      } else if (type.includes('SUNSCREEN') || type.includes('SPF')) {
        morningSteps.push({ ...step, id: rec.id + '-m', stepNumber: `0${mCount++}` });
      } else if (type.includes('TREATMENT') || type.includes('PEEL') || type.includes('MASK') || type.includes('RETINOL')) {
        weeklySteps.push({ ...step, id: rec.id + '-w', stepNumber: `0${wCount++}`, duration: '10 min' });
      } else {
        // Serum, Moisturizer, Toner, Eye Cream etc.
        morningSteps.push({ ...step, id: rec.id + '-m', stepNumber: `0${mCount++}` });
        eveningSteps.push({ ...step, id: rec.id + '-e', stepNumber: `0${eCount++}` });
      }
    }

    const routineData = {
      morning: morningSteps,
      evening: eveningSteps,
      weekly: weeklySteps
    };

    const routine = await this.prisma.groomingRoutine.upsert({
      where: { userId },
      update: { routineData },
      create: {
        userId,
        routineData,
      },
    });

    return {
      routine: routine.routineData,
    };
  }

  async toggleProgress(userId: string, date: string, stepId: string): Promise<any> {
    let progress = await this.prisma.routineProgress.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });

    if (!progress) {
      progress = await this.prisma.routineProgress.create({
        data: {
          userId,
          date,
          completedSteps: [stepId],
        },
      });
      return { completedSteps: progress.completedSteps };
    }

    let updatedSteps = [...progress.completedSteps];
    if (updatedSteps.includes(stepId)) {
      updatedSteps = updatedSteps.filter((id) => id !== stepId);
    } else {
      updatedSteps.push(stepId);
    }

    const updated = await this.prisma.routineProgress.update({
      where: { id: progress.id },
      data: { completedSteps: updatedSteps },
    });

    return { completedSteps: updated.completedSteps };
  }
}
