import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductMatchingService {
  private readonly logger = new Logger(ProductMatchingService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Matches AI-generated product requirements to real products in the PostgreSQL DB.
   * Uses deterministic filtering based on categories and string matching.
   */
  async matchProducts(aiRecommendations: any, userProfile: any, skinAnalysis: any): Promise<any[]> {
    this.logger.log('Matching AI requirements against Product database...');
    
    const matchedProducts: any[] = [];
    
    // We only match skincare recommendations for products
    if (!aiRecommendations.skincare || !Array.isArray(aiRecommendations.skincare)) {
      return matchedProducts;
    }

    const allProducts = await this.prisma.product.findMany({
      where: { isActive: true }
    });

    for (const rec of aiRecommendations.skincare) {
      const type = (rec.type || '').toUpperCase();
      const requirements = rec.requirements || [];
      
      // Filter by broad category first
      let candidates = allProducts.filter(p => p.category === type);
      
      // If we don't have exact category matches, maybe try broad substring match on name/category
      if (candidates.length === 0) {
        candidates = allProducts.filter(p => p.name.toUpperCase().includes(type) || p.category.includes(type));
      }

      // If we STILL have candidates, rank them by how many requirements they hit
      if (candidates.length > 0) {
        const scoredCandidates = candidates.map(product => {
          let score = 0;
          
          const productText = `${product.name} ${product.description} ${product.ingredients.join(' ')} ${product.suitableFor.join(' ')} ${product.skinTypes.join(' ')}`.toLowerCase();
          
          for (const req of requirements) {
            if (productText.includes(req.toLowerCase())) {
              score += 1;
            }
          }
          
          return { product, score };
        });
        
        // Sort by score descending
        scoredCandidates.sort((a, b) => b.score - a.score);
        
        // Find the best match that hasn't been heavily recommended already, or just take top
        // To prevent the exact same product being recommended 4 times for different reasons,
        // let's try to find the top scored candidate that isn't already in matchedProducts for this scan.
        let bestMatch = scoredCandidates[0].product;
        
        // Deduplication: look for the highest scoring product that we haven't already recommended
        const unusedCandidates = scoredCandidates.filter(sc => 
          !matchedProducts.some(mp => mp.product && mp.product.id === sc.product.id)
        );
        
        if (unusedCandidates.length > 0) {
          bestMatch = unusedCandidates[0].product;
        }

        matchedProducts.push({
          recommendation: rec,
          product: bestMatch
        });
      } else {
        // No match found
        matchedProducts.push({
          recommendation: rec,
          product: null
        });
      }
    }

    return matchedProducts;
  }
}
