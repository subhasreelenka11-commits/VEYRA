'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

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
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadRecipes();
    }
  }, [user]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/recipes');
      if (data && Array.isArray(data)) {
        setGeneratedRecipes(data.map(item => item.recipeData));
      }
    } catch (err: any) {
      console.error('Failed to load recipes', err);
    } finally {
      setLoading(false);
    }
  };

  const generateRecipes = async () => {
    try {
      setGenerating(true);
      setError('');
      const data = await fetchApi('/recipes/generate', { method: 'POST' });
      if (data && Array.isArray(data)) {
        await loadRecipes(); // Fetch fresh state from DB so deleted ones disappear from UI
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipes.');
    } finally {
      setGenerating(false);
    }
  };

  const categories = ['All', 'Skin Glow', 'High Protein', 'Under 20 Mins', 'Plant Forward'];

  const allRecipes = [...generatedRecipes];

  const filteredRecipes = allRecipes.filter((r) => {
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
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#E2D4C8] pt-6 relative z-10">
             <div className="text-xs text-[#6B5A52]">
                {loading ? 'Loading your custom recipes...' : 'Merge AI-generated custom recipes based on your exact macro targets.'}
                {error && <p className="text-red-500 font-bold mt-1">{error}</p>}
             </div>
             <button
               onClick={generateRecipes}
               disabled={generating}
               className="w-full md:w-auto px-8 py-3 bg-[#1F1916] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#334234] transition-all disabled:opacity-50 shadow-md"
             >
               {generating ? '✨ AI is Cooking...' : '✨ Generate AI Recipes'}
             </button>
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

