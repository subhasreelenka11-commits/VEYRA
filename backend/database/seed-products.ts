import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: 'postgresql://postgres:postgres@localhost:5432/veyra?schema=public'
});

const demoProducts = [
  // Veyra Brand (Demo)
  {
    name: 'Gentle Foaming Cleanser',
    brand: 'Veyra Basics',
    category: 'CLEANSER',
    description: 'A mild foaming cleanser that removes dirt and oil without stripping the skin.',
    skinTypes: ['COMBINATION', 'OILY'],
    concerns: ['ACNE', 'LARGE_PORES'],
    suitableFor: ['All skin types', 'Sensitive skin'],
    price: 18.00,
    currency: 'USD',
    imageUrl: '/products/cleanser.jpg',
    ingredients: ['Ceramides', 'Niacinamide', 'Hyaluronic Acid']
  },
  {
    name: 'Water Gel Hydrator',
    brand: 'Veyra Hydro',
    category: 'MOISTURIZER',
    description: 'An oil-free gel moisturizer that locks in intense hydration.',
    skinTypes: ['COMBINATION', 'OILY', 'NORMAL'],
    concerns: ['UNEVEN_TONE', 'LARGE_PORES'],
    suitableFor: ['Combination skin', 'Oily skin'],
    price: 25.00,
    currency: 'USD',
    imageUrl: '/products/moisturizer.jpg',
    ingredients: ['Hyaluronic Acid', 'Glycerin', 'Dimethicone']
  },
  {
    name: 'Broad Spectrum SPF 50',
    brand: 'Veyra Sun',
    category: 'SUNSCREEN',
    description: 'Daily lightweight protection from UVA and UVB rays.',
    skinTypes: ['COMBINATION', 'DRY', 'OILY', 'NORMAL'],
    concerns: ['UNEVEN_TONE', 'DARK_CIRCLES'],
    suitableFor: ['All skin types'],
    price: 22.00,
    currency: 'USD',
    imageUrl: '/products/sunscreen.jpg',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E']
  },
  
  // Real Indian Brands
  {
    name: '10% Niacinamide Serum',
    brand: 'Minimalist',
    category: 'SERUM',
    description: 'Nourishing serum that promotes protein synthesis, reduces melanin concentration & improves skin complexion.',
    skinTypes: ['ALL', 'COMBINATION', 'OILY'],
    concerns: ['UNEVEN_TONE', 'ACNE', 'LARGE_PORES'],
    suitableFor: ['All skin types'],
    price: 599.00,
    currency: 'INR',
    imageUrl: '/products/serum.jpg',
    ingredients: ['Niacinamide', 'Zinc PCA']
  },
  {
    name: '72 Hr Hydrating Probiotics Gel Moisturizer',
    brand: 'Dot & Key',
    category: 'MOISTURIZER',
    description: 'Oil-free gel moisturizer that locks in hydration without feeling sticky.',
    skinTypes: ['OILY', 'COMBINATION'],
    concerns: ['DRYNESS'],
    suitableFor: ['Oily skin', 'Acne-prone skin'],
    price: 595.00,
    currency: 'INR',
    imageUrl: '/products/moisturizer.jpg',
    ingredients: ['Probiotics', 'Hyaluronic Acid', 'Kombucha']
  },
  {
    name: 'Vitamin C Serum',
    brand: 'Foxtale',
    category: 'SERUM',
    description: 'Brightening serum that gives a radiant glow and tackles hyperpigmentation.',
    skinTypes: ['ALL', 'COMBINATION', 'DRY'],
    concerns: ['UNEVEN_TONE', 'DARK_CIRCLES', 'DULLNESS'],
    suitableFor: ['All skin types'],
    price: 595.00,
    currency: 'INR',
    imageUrl: '/products/serum.jpg',
    ingredients: ['L-Ascorbic Acid', 'Vitamin E']
  },
  {
    name: '0.15% Retinol Night Serum',
    brand: 'Foxtale',
    category: 'TREATMENT',
    description: 'Gentle retinol serum to reduce fine lines, texture, and promote collagen.',
    skinTypes: ['ALL', 'COMBINATION', 'OILY', 'DRY'],
    concerns: ['AGING', 'UNEVEN_TONE'],
    suitableFor: ['All skin types', 'Beginners'],
    price: 699.00,
    currency: 'INR',
    imageUrl: '/products/treatment.jpg',
    ingredients: ['Retinol', 'Peptides']
  },
  {
    name: 'Cica & Ceramide Night Rescue',
    brand: 'Dot & Key',
    category: 'TREATMENT',
    description: 'Calming repair cream that heals the skin barrier overnight.',
    skinTypes: ['DRY', 'SENSITIVE', 'COMBINATION'],
    concerns: ['REDNESS', 'DRYNESS'],
    suitableFor: ['Sensitive skin'],
    price: 945.00,
    currency: 'INR',
    imageUrl: '/products/treatment.jpg',
    ingredients: ['Cica', 'Ceramides']
  },
  {
    name: 'Green Tea Pore Cleansing Wash',
    brand: 'Plum',
    category: 'CLEANSER',
    description: 'Gentle, non-drying face wash that combats acne and removes excess oil.',
    skinTypes: ['OILY', 'COMBINATION'],
    concerns: ['ACNE', 'LARGE_PORES'],
    suitableFor: ['Acne-prone skin'],
    price: 345.00,
    currency: 'INR',
    imageUrl: '/products/cleanser.jpg',
    ingredients: ['Green Tea Extracts', 'Glycolic Acid']
  },
  {
    name: 'PHA Alcohol-Free Toner',
    brand: 'Minimalist',
    category: 'TONER',
    description: 'Mild exfoliating toner that tightens pores and balances skin pH.',
    skinTypes: ['OILY', 'COMBINATION', 'SENSITIVE'],
    concerns: ['LARGE_PORES', 'ACNE'],
    suitableFor: ['All skin types'],
    price: 399.00,
    currency: 'INR',
    imageUrl: '/products/toner.jpg',
    ingredients: ['PHA', 'Niacinamide', 'Aloe Vera']
  },
  {
    name: 'Under Eye Cream with Coffee',
    brand: 'MCaffeine',
    category: 'EYE CREAM',
    description: 'Coffee-infused eye cream to reduce puffiness and dark circles.',
    skinTypes: ['ALL'],
    concerns: ['DARK_CIRCLES'],
    suitableFor: ['All skin types'],
    price: 349.00,
    currency: 'INR',
    imageUrl: '/products/eye_cream.jpg',
    ingredients: ['Coffee', 'Vitamin E']
  }
];

async function main() {
  console.log('Seeding demo products...');
  
  // Clear existing products to prevent duplicates on rerun
  await prisma.product.deleteMany();

  for (const product of demoProducts) {
    await prisma.product.create({ data: product });
  }
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
