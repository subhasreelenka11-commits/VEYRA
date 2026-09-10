import { Controller, Get, Post, Body, Req, UseGuards, Query } from '@nestjs/common';
import { GroomingService } from './grooming.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('grooming')
@UseGuards(JwtAuthGuard)
export class GroomingController {
  constructor(private readonly groomingService: GroomingService) {}

  @Get('routine')
  getRoutine(@Req() req: any, @Query('date') date: string): Promise<any> {
    const today = date || new Date().toISOString().split('T')[0];
    return this.groomingService.getRoutine(req.user.sub, today);
  }

  @Post('generate')
  generateRoutine(@Req() req: any): Promise<any> {
    return this.groomingService.generateRoutine(req.user.sub);
  }

  @Post('progress')
  toggleProgress(
    @Req() req: any,
    @Body('date') date: string,
    @Body('stepId') stepId: string,
  ) {
    if (!date || !stepId) {
      throw new Error('date and stepId are required');
    }
    return this.groomingService.toggleProgress(req.user.sub, date, stepId);
  }
}
