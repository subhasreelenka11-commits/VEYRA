import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { SkinAnalysisService } from './skin-analysis.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('skin-analysis')
@UseGuards(JwtAuthGuard)
export class SkinAnalysisController {
  constructor(private readonly skinAnalysisService: SkinAnalysisService) {}

  @Post('scan')
  async processScan(@Req() req: any, @Body() body: { image: string }): Promise<any> {
    return this.skinAnalysisService.processScan(req.user.userId, body.image);
  }

  @Get('history')
  async getHistory(@Req() req: any): Promise<any> {
    return this.skinAnalysisService.getHistory(req.user.userId);
  }
}
