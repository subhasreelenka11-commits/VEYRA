import { Controller, Get, Post, Request, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getSavedRecipes(@Request() req: any) {
    try {
      const userId = req.user.userId;
      return await this.recipesService.getSavedRecipes(userId);
    } catch (e: any) {
      console.error('ERROR in getSavedRecipes:', e);
      throw new InternalServerErrorException(e.message || 'Failed to get recipes');
    }
  }

  @Post('generate')
  async generateRecipes(@Request() req: any) {
    try {
      const userId = req.user.userId;
      return await this.recipesService.generateSmartRecipes(userId);
    } catch (e: any) {
      console.error('Recipes endpoint error:', e);
      throw new InternalServerErrorException(e.message || 'Failed to generate recipes');
    }
  }
}
