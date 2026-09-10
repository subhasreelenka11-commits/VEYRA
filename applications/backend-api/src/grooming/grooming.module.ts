import { Module } from '@nestjs/common';
import { GroomingService } from './grooming.service';
import { GroomingController } from './grooming.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  providers: [GroomingService],
  controllers: [GroomingController]
})
export class GroomingModule {}
