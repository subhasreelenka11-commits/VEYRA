'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';

export default function NutritionPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [waterCount, setWaterCount] = useState(6); // Glasses (250ml each)
  const targetWater = 10; // 2.5L

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchApi('/profile');
        if (res?.profile) {
          setProfileData(res.profile);
        }
      } catch (err) {
        // Fallback gracefully
      }
    };
    loadProfile();
  }, []);

  const addWater = () => {
    if (waterCount < targetWater + 4) {
      setWaterCount(prev => prev + 1);
    }
  };

  const removeWater = () => {
    if (waterCount > 0) {
      setWaterCount(prev => prev - 1);
    }
  };

  const goal = profileData?.goal?.toLowerCase().replace('_', ' ') || 'overall vitality & glowing skin';
  const diet = profileData?.dietaryPreference?.toLowerCase().replace('_', ' ') || 'balanced whole foods';

  const macros = [
    { name: 'Protein', grams: 140, calories: 560, percent: 30, color: 'bg-emerald-600', text: 'text-emerald-700', note: 'Cellular repair & collagen preservation' },
    { name: 'Healthy Fats', grams: 70, calories: 630, percent: 30, color: 'bg-amber-600', text: 'text-amber-700', note: 'Omega-3 fatty acids for skin lipid membrane' },
    { name: 'Complex Carbs', grams: 210, calories: 840, percent: 40, color: 'bg-[#708264]', text: 'text-[#708264]', note: 'Low-glycemic slow fuel & gut microbiome fiber' },
  ];

  const meals = [
    {
      time: '08:30 AM',
      name: 'Breakfast',
      title: 'Omega-3 Chia Pudding & Roasted Berries',
      calories: '420 kcal',
      macros: '24g P • 48g C • 16g F',
      highlights: 'Wild blueberries, chia seeds, almond butter, grass-fed collagen peptides',
      icon: '🫐',
    },
    {
      time: '01:00 PM',
      name: 'Lunch',
      title: 'Mediterranean Herb Chicken & Quinoa Greens Bowl',
      calories: '610 kcal',
      macros: '46g P • 52g C • 22g F',
      highlights: 'Free-range chicken breast, tricolor quinoa, kalamata olives, cold-pressed olive oil',
      icon: '🥗',
    },
    {
      time: '04:30 PM',
      name: 'Afternoon Nourish',
      title: 'Activated Walnut Butter & Crisp Green Apple',
      calories: '240 kcal',
      macros: '6g P • 22g C • 15g F',
      highlights: 'Polyphenol rich, prebiotic fiber, steady blood sugar curve',
      icon: '🍏',
    },
    {
      time: '07:30 PM',
      name: 'Dinner',
      title: 'Wild King Salmon with Braised Fennel & Asparagus',
      calories: '680 kcal',
      macros: '52g P • 28g C • 36g F',
      highlights: 'Astaxanthin antioxidant, high EPA/DHA omega oils, magnesium-rich greens',
      icon: '🐟',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">🥗</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                METABOLIC & DERMAL NUTRITION
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Personalized Fuel
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Calibrated to fuel your cellular energy, balance sebum, and maintain a resilient dermal barrier. Optimized for your goal of <span className="font-bold text-[#1F1916] capitalize">{goal}</span> and a <span className="font-bold text-[#1F1916] capitalize">{diet}</span> diet.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/recipes"
              className="bg-[#334234] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>🍳</span>
              <span>Browse Curated Recipes →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CALORIC & MACRONUTRIENT TARGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Energy Target Card */}
        <div className="lg:col-span-4 bg-[#2B3B2C] text-white rounded-[32px] p-8 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                DAILY METABOLIC TARGET
              </span>
              <span className="text-xl">🔥</span>
            </div>
            <h3 className="text-2xl font-serif font-bold">2,030 kcal</h3>
            <p className="text-xs text-gray-300 mt-1">Calibrated maintenance with lean muscle tone</p>
          </div>

          {/* Hydration Tracker */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">Hydration Intake</span>
                <span className="text-lg font-serif font-bold text-white">
                  {(waterCount * 0.25).toFixed(2)}L / {(targetWater * 0.25).toFixed(2)}L
                </span>
              </div>
              <span className="text-xl">💧</span>
            </div>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterCount / targetWater) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-gray-300">{waterCount} of {targetWater} glasses</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={removeWater}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={addWater}
                  className="w-7 h-7 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#1F1916] text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-gray-300 leading-relaxed border-t border-white/15">
            Tip: Ample hydration increases skin elasticity and accelerates metabolic waste filtration.
          </div>
        </div>

        {/* Right: Macro Distribution Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">
                BALANCED MACROS
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1F1916]">Nutritional Architecture</h3>
            </div>
            <span className="text-xs font-bold text-[#334234] bg-[#E8EFE6] px-3.5 py-1.5 rounded-full border border-[#708264]/20">
              Low Glycemic Load
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {macros.map((m) => (
              <div key={m.name} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DCD2] space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1F1916]">{m.name}</span>
                    <span className="font-mono font-bold text-[#8A7970]">{m.percent}%</span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#1F1916] mt-1">
                    {m.grams}g
                  </div>
                  <p className="text-[11px] text-[#8A7970]">{m.calories} kcal</p>
                </div>

                <div className="w-full h-2 bg-[#E8DCD2]/60 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.percent * 2}%` }} />
                </div>

                <p className="text-[10px] text-[#6B5A52] leading-tight pt-1 border-t border-[#E8DCD2]/60">
                  {m.note}
                </p>
              </div>
            ))}
          </div>

          {/* Skin-Targeted Micronutrient Pillars */}
          <div className="pt-4 border-t border-[#E8DCD2] flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-[#1F1916]">Zinc & Omega-3:</span>
              <span className="text-[#6B5A52]">Controls inflammatory pathways</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-bold text-[#1F1916]">Polyphenols:</span>
              <span className="text-[#6B5A52]">Antioxidant skin photoprotection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#708264]" />
              <span className="font-bold text-[#1F1916]">Prebiotic Inulin:</span>
              <span className="text-[#6B5A52]">Gut-skin axis stabilization</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DAILY MEAL TIMELINE */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E8DCD2] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">
              MEAL RHYTHM
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#1F1916]">Today's Suggested Menu</h3>
          </div>
          <p className="text-xs text-[#8A7970]">Timed for peak metabolic absorption</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.name}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DCD2] hover:border-[#334234]/30 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{meal.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#708264]">{meal.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8A7970]">{meal.time}</span>
                </div>

                <h4 className="text-base font-serif font-bold text-[#1F1916]">{meal.title}</h4>
                <p className="text-xs text-[#6B5A52] mt-1 leading-relaxed">{meal.highlights}</p>
              </div>

              <div className="pt-3 border-t border-[#E8DCD2]/60 flex justify-between items-center text-xs">
                <span className="font-bold text-[#1F1916]">{meal.calories}</span>
                <span className="font-mono text-[11px] text-[#8A7970]">{meal.macros}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

