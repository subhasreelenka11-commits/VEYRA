import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string): Promise<any> {
    const latestScan = await this.prisma.skinScan.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const historicalScans = await this.prisma.skinScan.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 20
    });

    const chartData = historicalScans.map((scan: any) => ({
      date: scan.createdAt.toISOString(),
      score: scan.overallScore
    }));

    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);
    const dateStr = twentyEightDaysAgo.toISOString().split('T')[0];

    const progressRecords = await this.prisma.routineProgress.findMany({
      where: { 
        userId,
        date: { gte: dateStr }
      },
      orderBy: { date: 'asc' }
    });

    const habitMatrix = Array(4).fill(null).map(() => Array(7).fill(false));
    let completedCount = 0;
    let currentStreak = 0;

    const today = new Date();
    
    // Calculate matrix
    for (let i = 0; i < 28; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - (27 - i));
      const ds = d.toLocaleDateString('en-CA'); // local timezone YYYY-MM-DD
      
      const record = progressRecords.find((r: any) => r.date === ds);
      const isDone = record && record.completedSteps && record.completedSteps.length > 0;
      
      if (isDone) completedCount++;
      
      const week = Math.floor(i / 7);
      const day = i % 7;
      habitMatrix[week][day] = !!isDone;
    }

    // Calculate current streak backwards
    for (let i = 0; i < 28; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toLocaleDateString('en-CA');
      
      const record = progressRecords.find((r: any) => r.date === ds);
      const isDone = record && record.completedSteps && record.completedSteps.length > 0;
      
      if (isDone) {
        currentStreak++;
      } else if (i !== 0) { 
        break;
      }
    }

    const consistencyPercentage = Math.round((completedCount / 28) * 100) || 0;

    return {
      skinHealthIndex: latestScan ? latestScan.overallScore : 0,
      ritualConsistency: consistencyPercentage,
      completedDays: completedCount,
      chartData,
      habitMatrix,
      currentStreak,
      historicalScans: historicalScans.reverse()
    };
  }
}
