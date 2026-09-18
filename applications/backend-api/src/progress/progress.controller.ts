import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('dashboard')
  async getDashboard(@Req() req: any): Promise<any> {
    return this.progressService.getDashboard(req.user.userId);
  }
}
