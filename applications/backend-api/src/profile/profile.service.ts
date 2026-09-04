import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string): Promise<any> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    return this.formatProfileResponse(profile);
  }

  async upsertProfile(userId: string, dto: UpdateProfileDto): Promise<any> {
    const profile = await this.prisma.userProfile.upsert({
      where: { userId },
      update: dto,
      create: {
        userId,
        ...dto,
      },
    });

    return this.formatProfileResponse(profile);
  }

  private formatProfileResponse(profile: any) {
    if (!profile) {
      return {
        profile: null,
        isComplete: false,
        bmi: null,
      };
    }

    const isComplete = this.checkIfComplete(profile);
    const bmi = this.calculateBMI(profile.weight, profile.height);

    return {
      profile,
      isComplete,
      bmi,
    };
  }

  private checkIfComplete(profile: any): boolean {
    const requiredFields = [
      'firstName',
      'lastName',
      'age',
      'height',
      'weight',
      'gender',
      'goal',
    ];
    
    return requiredFields.every(
      (field) => profile[field] !== null && profile[field] !== undefined,
    );
  }

  private calculateBMI(weightInKg?: number | null, heightInCm?: number | null): number | null {
    if (!weightInKg || !heightInCm) {
      return null;
    }

    const heightInMeters = heightInCm / 100;
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  }
}
