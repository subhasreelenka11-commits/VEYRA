'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  category: string;
  time: string;
  calories: string;
  macros: { protein: string; carbs: string; fat: string };
  tags: string[];
  image: string;
  description: string;
  benefits: string;
  ingredients: string[];
  instructions: string[];
}

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Wild King Salmon with Herb Quinoa & Charred Broccolini',
      category: 'Skin Glow',
      time: '20 min',
      calories: '540 kcal',
      macros: { protein: '46g', carbs: '32g', fat: '24g' },
      tags: ['High Omega-3', 'Astaxanthin', 'Gluten-Free'],
      image: '/images/hero_wellness.png',
      description: 'Pan-seared wild salmon served over fluffy lemon thyme quinoa and tender broccolini sautéed in cold-pressed extra virgin olive oil.',
      benefits: 'Rich in EPA and DHA fatty acids that reduce systemic inflammation and preserve dermal elasticity.',
      ingredients: [
        '180g Wild King Salmon fillet',
        '1/2 cup Organic Tricolor Quinoa (rinsed)',
        '1 cup Tender Broccolini florets',
        '1 tbsp Cold-pressed Extra Virgin Olive Oil',
        '1/2 Fresh Lemon (juiced and zested)',
        '1 tbsp Fresh Chopped Dill & Chives',
        'Pinch of Maldon Flaky Sea Salt & Cracked Black Pepper',
      ],
      instructions: [
        'Cook quinoa in 1 cup filtered water with a pinch of sea salt for 14 minutes until tender, then fluff with lemon zest and fresh herbs.',
        'Heat olive oil in a cast-iron skillet over medium-high heat. Season salmon with sea salt and cracked pepper.',
        'Sear salmon skin-side down for 4 minutes until crisp, flip gently and cook for another 3 minutes.',
        'Toss broccolini into the skillet with a squeeze of fresh lemon for the last 2 minutes until bright green and slightly charred.',
        'Plate warm quinoa, rest salmon on top, and garnish with fresh dill and lemon wedges.',
      ],
    },
    {
      id: '2',
      title: 'Green Goddess Avocado & Edamame Vitality Bowl',
      category: 'Plant Forward',
      time: '15 min',
      calories: '420 kcal',
      macros: { protein: '22g', carbs: '38g', fat: '21g' },
      tags: ['Plant Protein', 'Zinc Rich', 'Fiber'],
      image: '/images/veyra_bento_nutrition.png',
      description: 'Silky avocado cubes, organic steamed edamame, cucumber ribbons, and microgreens tossed in an herbaceous pumpkin seed tahini vinaigrette.',
      benefits: 'High zinc and vitamin E content accelerates cell membrane turnover and shields against free radicals.',
      ingredients: [
        '1 cup Organic Shelled Edamame (steamed)',
        '1/2 Haas Avocado (diced)',
        '1 Japanese Cucumber (ribboned)',
        '2 cups Baby Spinach & Wild Arugula',
        '2 tbsp Pumpkin Seeds (Pepitas, toasted)',
        '2 tbsp Green Goddess Herb Tahini Dressing',
      ],
      instructions: [
        'Steam edamame for 4 minutes in salted water, then plunge into cold water to preserve vivid emerald green color.',
        'Arrange fresh baby greens at the base of your bowl.',
        'Layer ribboned cucumber, diced avocado, and chilled edamame evenly.',
        'Drizzle generously with house herb tahini vinaigrette and top with roasted pumpkin seeds.',
      ],
    },
    {
      id: '3',
      title: 'Golden Bone Broth with Ginger, Shiitake & Poached Egg',
      category: 'High Protein',
      time: '18 min',
      calories: '320 kcal',
      macros: { protein: '34g', carbs: '12g', fat: '14g' },
      tags: ['Collagen Synthesis', 'Gut Health', 'Low Carb'],
      image: '/images/hero_wellness.png',
      description: 'Slow-simmered pasture-raised collagen bone broth infused with fresh ginger root, turmeric, sliced shiitake, and pasture-raised poached eggs.',
      benefits: 'Pure collagen peptides nourish gut mucosal lining and support collagen fibrils in the dermis.',
      ingredients: [
        '2 cups Grass-fed Beef or Organic Chicken Bone Broth',
        '2 Pasture-Raised Organic Eggs',
        '1/2 cup Fresh Shiitake Mushrooms (sliced)',
        '1 thumb Fresh Ginger (finely grated)',
        '1/2 tsp Golden Turmeric & pinch of black pepper',
        '1 Green Onion (scallion, finely sliced)',
        '1 tsp Tamari / Coconut Aminos',
      ],
      instructions: [
        'Gently heat bone broth with grated ginger, turmeric, tamari, and sliced shiitake over medium heat for 6-8 minutes.',
        'In a separate small saucepan of simmering water, gently poach two pasture-raised eggs for 3 minutes.',
        'Ladle fragrant golden broth and tender mushrooms into deep ceramic bowl.',
        'Carefully center poached eggs and garnish with sliced scallions.',
      ],
    },
    {
      id: '4',
      title: 'Mediterranean Herb Crusted Chicken with Greek Tzatziki',
      category: 'Under 20 Mins',
      time: '18 min',
      calories: '490 kcal',
      macros: { protein: '50g', carbs: '18g', fat: '22g' },
      tags: ['Lean Protein', 'Metabolic Boost', 'Probiotic'],
      image: '/images/veyra_bento_nutrition.png',
      description: 'Char-grilled chicken breast coated in oregano and garlic rub, served alongside chilled cucumber mint probiotic yogurt tzatziki.',
      benefits: 'Clean amino acids boost muscle protein synthesis and maintain firm tissue tone.',
      ingredients: [
        '200g Organic Free-Range Chicken Breast',
        '1 tbsp Dried Oregano, Thyme & Garlic Powder',
        '1/2 cup Full-Fat Greek Yogurt (A2 or Organic)',
        '1/2 Cucumber (grated and squeezed dry)',
        '1 clove Garlic (micro-planed)',
        '1 tbsp Extra Virgin Olive Oil & Lemon Juice',
      ],
      instructions: [
        'Pound chicken to even 1/2-inch thickness. Coat with oregano rub, sea salt, and a splash of olive oil.',
        'Grill on medium-high heat for 5 minutes per side until internal temp reaches 165°F (74°C). Rest for 4 minutes.',
        'Whisk Greek yogurt, squeezed cucumber, garlic, dill, lemon juice, and olive oil in a small bowl.',
        'Slice chicken breast into medallions and serve alongside cooling tzatziki dip.',
      ],
    },
    {
      id: '5',
      title: 'Wild Blueberry & Acai Antioxidant Chia Parfait',
      category: 'Skin Glow',
      time: '8 min',
      calories: '340 kcal',
      macros: { protein: '18g', carbs: '42g', fat: '12g' },
      tags: ['Polyphenols', 'Anti-Inflammatory', 'Quick Prep'],
      image: '/images/hero_wellness.png',
      description: 'Velvety overnight coconut milk chia pudding layered with antioxidant-rich wild blueberries, freeze-dried acai, and raw almond slivers.',
      benefits: 'Packed with anthocyanins that protect microcapillaries and enhance facial microcirculation.',
      ingredients: [
        '3 tbsp Organic Chia Seeds',
        '3/4 cup Unsweetened Almond or Coconut Milk',
        '1/2 cup Wild Organic Blueberries',
        '1 scoop Plant or Marine Collagen Peptides',
        '1 tbsp Raw Almond Slivers',
        '1 tsp Raw Honey (optional)',
      ],
      instructions: [
        'Whisk chia seeds and collagen powder into almond milk until completely suspended. Chill overnight or for 30 minutes.',
        'Lightly crush half of the wild blueberries with a fork to release juices.',
        'Layer chia pudding in a glass jar with crushed berries and fresh whole berries.',
        'Top with toasted almond slivers and raw honey drizzle.',
      ],
    },
  ];

  const categories = ['All', 'Skin Glow', 'High Protein', 'Under 20 Mins', 'Plant Forward'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">🍳</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                SMART CULINARY SANCTUARY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Curated Recipes
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Wholesome, chef-calibrated recipes designed specifically for dermal radiance, anti-inflammatory repair, and sustained metabolic balance.
            </p>
          </div>

          <div className="w-full md:w-72 bg-white rounded-full p-1.5 border border-[#E2D4C8] shadow-sm flex items-center gap-2 px-4">
            <span className="text-sm text-[#8A7970]">🔍</span>
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-[#1F1916] placeholder-[#8A7970] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER PILLS */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#334234] text-white shadow-sm'
                : 'bg-white text-[#6B5A52] border border-[#E8DCD2] hover:bg-[#FAF7F2] hover:text-[#1F1916]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. RECIPES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-[32px] border border-[#E8DCD2] overflow-hidden shadow-sm hover:shadow-md hover:border-[#334234]/30 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Recipe Image Banner */}
              <div className="relative h-48 w-full bg-[#FAF7F2] overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#334234] border border-[#E8DCD2]">
                  ⏱ {recipe.time}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">
                  {recipe.calories}
                </div>
              </div>

              {/* Recipe Body */}
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {recipe.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-[#E8EFE6] text-[#334234] text-[9px] font-bold border border-[#708264]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-base font-serif font-bold text-[#1F1916] leading-snug group-hover:text-[#334234] transition-colors">
                  {recipe.title}
                </h3>

                <p className="text-xs text-[#6B5A52] line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Macro summary strip */}
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DCD2]/60 flex justify-between items-center text-[10px] font-mono text-[#5C504A]">
                  <span>P: <strong className="text-[#1F1916]">{recipe.macros.protein}</strong></span>
                  <span>•</span>
                  <span>C: <strong className="text-[#1F1916]">{recipe.macros.carbs}</strong></span>
                  <span>•</span>
                  <span>F: <strong className="text-[#1F1916]">{recipe.macros.fat}</strong></span>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#334234] text-[#1F1916] hover:text-white border border-[#E8DCD2] hover:border-[#334234] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Full Recipe & Prep</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. INTERACTIVE RECIPE DETAIL MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-[36px] border border-[#E8DCD2] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6 relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white border border-[#E8DCD2] text-[#6B5A52] hover:text-[#1F1916] flex items-center justify-center font-bold text-sm cursor-pointer shadow-sm"
            >
              ✕
            </button>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#334234] text-white text-[10px] font-bold uppercase tracking-wider">
                  {selectedRecipe.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#334234] text-[10px] font-bold border border-[#E8DCD2]">
                  ⏱ {selectedRecipe.time}
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#1F1916] text-[10px] font-bold border border-[#E8DCD2]">
                  {selectedRecipe.calories}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1916]">
                {selectedRecipe.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
                {selectedRecipe.description}
              </p>
            </div>

            {/* Dermal Health Benefit Callout */}
            <div className="p-4 rounded-2xl bg-[#E8EFE6] border border-[#708264]/20 flex items-start gap-3 text-xs text-[#334234]">
              <span className="text-lg">🌿</span>
              <div>
                <strong className="block font-bold">Targeted Wellness Benefit:</strong>
                <span>{selectedRecipe.benefits}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#E8DCD2]">
              <h4 className="text-sm font-serif font-bold text-[#1F1916] uppercase tracking-wider">
                Ingredients Needed ({selectedRecipe.ingredients.length})
              </h4>
              <ul className="space-y-2 text-xs text-[#5C504A]">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#708264]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#E8DCD2]">
              <h4 className="text-sm font-serif font-bold text-[#1F1916] uppercase tracking-wider">
                Preparation Instructions
              </h4>
              <ol className="space-y-3 text-xs text-[#5C504A]">
                {selectedRecipe.instructions.map((ins, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E8DCD2] text-[#334234] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed flex-1">{ins}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="w-full py-3 bg-[#334234] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all cursor-pointer shadow-md"
            >
              Close Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

