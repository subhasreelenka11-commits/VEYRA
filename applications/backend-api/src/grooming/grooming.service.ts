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

    const aiResponse = await this.aiService.generateGroomingRoutine(
      { overallScore: latestScan.overallScore, metrics: latestScan.metrics, actives: latestScan.actives },
      profile
    );

    const routine = await this.prisma.groomingRoutine.upsert({
      where: { userId },
      update: { routineData: aiResponse.routineData },
      create: {
        userId,
        routineData: aiResponse.routineData,
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
