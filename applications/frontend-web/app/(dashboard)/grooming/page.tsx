'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  actives: string[];
  productName: string;
  productType: string;
  done: boolean;
}

export default function GroomingPage() {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'weekly'>('morning');
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [morningSteps, setMorningSteps] = useState<Step[]>([
    {
      id: 'm1',
      stepNumber: '01',
      title: 'Gentle Hydrating Cleanse',
      category: 'Cleanse',
      description: 'Massage onto damp skin with lukewarm water for 60 seconds to clear overnight sebum without stripping lipid barrier.',
      duration: '60 sec',
      actives: ['Amino Acids', 'Glycerin'],
      productName: 'Botanical Velvet Cleanser',
      productType: 'Cleanser',
      done: true,
    },
    {
      id: 'm2',
      stepNumber: '02',
      title: 'Antioxidant Defense Serum',
      category: 'Treatment',
      description: 'Dispense 4-5 drops onto fingertips and press gently into face and neck to neutralize environmental free radicals.',
      duration: '30 sec',
      actives: ['15% Vitamin C', 'Ferulic Acid', 'Vitamin E'],
      productName: 'Radiance Elixir Concentrate',
      productType: 'Serum',
      done: true,
    },
    {
      id: 'm3',
      stepNumber: '03',
      title: 'Ceramide Barrier Emulsion',
      category: 'Hydrate',
      description: 'Lightweight soothing moisture layer that seals in active serums and maintains skin elasticity throughout the day.',
      duration: '30 sec',
      actives: ['Ceramide NP', 'Hyaluronic Acid'],
      productName: 'Nutrient Silk Day Lotion',
      productType: 'Moisturizer',
      done: false,
    },
    {
      id: 'm4',
      stepNumber: '04',
      title: 'Invisible Mineral Shield SPF 50',
      category: 'Protect',
      description: 'Apply a generous two-finger length coat. Non-greasy velvet matte finish with full UVA/UVB and HEV blue light protection.',
      duration: '45 sec',
      actives: ['Non-Nano Zinc Oxide 21%'],
      productName: 'Cellular Mineral Veil SPF 50+',
      productType: 'Sunscreen',
      done: false,
    },
  ]);

  const [eveningSteps, setEveningSteps] = useState<Step[]>([
    {
      id: 'e1',
      stepNumber: '01',
      title: 'Clarifying Oil Pre-Cleanse',
      category: 'First Cleanse',
      description: 'Dissolves mineral sunscreen, airborne particulates, and sebum buildup from the day without irritating eyes.',
      duration: '60 sec',
      actives: ['Squalane', 'Jojoba Seed Oil'],
      productName: 'Purifying Botanical Cleansing Oil',
      productType: 'Oil Cleanse',
      done: false,
    },
    {
      id: 'e2',
      stepNumber: '02',
      title: 'Nourishing Purifying Wash',
      category: 'Second Cleanse',
      description: 'Lather lightly to complete double-cleansing ritual, leaving skin balanced and primed for cellular repair.',
      duration: '60 sec',
      actives: ['Centella Asiatica', 'Green Tea'],
      productName: 'Botanical Velvet Cleanser',
      productType: 'Cleanser',
      done: false,
    },
    {
      id: 'e3',
      stepNumber: '03',
      title: 'Cellular Renewal Night Complex',
      category: 'Restoration',
      description: 'Encapsulated gentle retinol or bakuchiol alternative to stimulate collagen turnover and refine texture overnight.',
      duration: '45 sec',
      actives: ['Bakuchiol 2%', 'Peptide Complex'],
      productName: 'Overnight Regenerative Serum',
      productType: 'Night Treatment',
      done: false,
    },
    {
      id: 'e4',
      stepNumber: '04',
      title: 'Rich Barrier Recovery Crème',
      category: 'Recovery',
      description: 'Thick restorative lipid blanket that locks in active repair complexes and prevents transepidermal water loss.',
      duration: '45 sec',
      actives: ['Oat Beta-Glucan', 'Shea Butter Ester'],
      productName: 'Deep Recovery Night Balm',
      productType: 'Night Balm',
      done: false,
    },
  ]);

  const [weeklySteps, setWeeklySteps] = useState<Step[]>([
    {
      id: 'w1',
      stepNumber: '01',
      title: 'Papaya Enzyme Gentle Peel',
      category: 'Exfoliate',
      description: 'Natural enzymatic non-abrasive treatment used twice weekly to melt dead surface cells and restore radiance.',
      duration: '10 min',
      actives: ['Papain', 'Bromelain', 'Lactic Acid 5%'],
      productName: 'Micro-Exfoliating Enzyme Glaze',
      productType: 'Weekly Mask',
      done: false,
    },
    {
      id: 'w2',
      stepNumber: '02',
      title: 'Rosemary Scalp & Follicle Tonic',
      category: 'Scalp Health',
      description: 'Stimulating botanical scalp massage to support hair thickness, relieve scalp tension, and promote circulation.',
      duration: '5 min',
      actives: ['Rosemary Leaf Extract', 'Biotin', 'Caffeine'],
      productName: 'Scalp Vitality Follicle Drops',
      productType: 'Hair & Scalp',
      done: false,
    },
  ]);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    if (timerSeconds === 0) setTimerSeconds(60);
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(60);
  };

  const toggleStep = (id: string, list: 'morning' | 'evening' | 'weekly') => {
    if (list === 'morning') {
      setMorningSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
    } else if (list === 'evening') {
      setEveningSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
    } else {
      setWeeklySteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
    }
  };

  const currentSteps = activeTab === 'morning' ? morningSteps : activeTab === 'evening' ? eveningSteps : weeklySteps;
  const completedCount = currentSteps.filter(s => s.done).length;
  const completionPercentage = Math.round((completedCount / currentSteps.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">🌿</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                DAILY RITUALS & GROOMING
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Skincare Sanctuary
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Thoughtfully curated morning and evening regimens tailored to your skin biomarker scan. Elevate your daily routine into a conscious ritual.
            </p>
          </div>

          {/* Quick 60-Second Cleanse Timer Widget */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#E2D4C8] shadow-sm flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DCD2] flex items-center justify-center font-mono font-bold text-sm text-[#1F1916]">
              {timerSeconds}s
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A7970]">
                60-Sec Cleanse Timer
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className="px-3 py-1 bg-[#334234] text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#253226] transition-all cursor-pointer"
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-3 py-1 bg-[#FAF7F2] text-[#6B5A52] border border-[#E8DCD2] rounded-full text-[10px] font-bold hover:text-[#1F1916] transition-all cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB CONTROLS & ROUTINE STATUS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Tab Pills */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-full border border-[#E8DCD2]">
          <button
            onClick={() => setActiveTab('morning')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'morning'
                ? 'bg-[#334234] text-white shadow-sm'
                : 'text-[#6B5A52] hover:text-[#1F1916]'
            }`}
          >
            <span>☀️</span>
            <span>Morning Ritual</span>
          </button>
          <button
            onClick={() => setActiveTab('evening')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'evening'
                ? 'bg-[#334234] text-white shadow-sm'
                : 'text-[#6B5A52] hover:text-[#1F1916]'
            }`}
          >
            <span>🌙</span>
            <span>Evening Ritual</span>
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'weekly'
                ? 'bg-[#334234] text-white shadow-sm'
                : 'text-[#6B5A52] hover:text-[#1F1916]'
            }`}
          >
            <span>✨</span>
            <span>Weekly Special</span>
          </button>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#E8DCD2] shadow-sm">
          <div className="w-24 h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DCD2]/60">
            <div
              className="h-full bg-[#334234] rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#1F1916]">
            {completedCount} of {currentSteps.length} Completed ({completionPercentage}%)
          </span>
        </div>
      </div>

      {/* 3. STEP-BY-STEP CARDS */}
      <div className="space-y-4">
        {currentSteps.map((step) => (
          <div
            key={step.id}
            className={`bg-white rounded-[32px] border transition-all p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
              step.done
                ? 'border-[#708264]/40 bg-[#FAF9F6]'
                : 'border-[#E8DCD2] hover:border-[#334234]/30'
            }`}
          >
            {/* Left: Step Info */}
            <div className="flex items-start gap-4 sm:gap-6 flex-1">
              <button
                onClick={() => toggleStep(step.id, activeTab)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all cursor-pointer ${
                  step.done
                    ? 'bg-[#334234] text-white shadow-sm'
                    : 'border-2 border-[#E8DCD2] text-[#8A7970] hover:border-[#334234]'
                }`}
              >
                {step.done ? '✓' : step.stepNumber}
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#708264] border border-[#E8DCD2]">
                    {step.category}
                  </span>
                  <span className="text-xs text-[#8A7970] font-medium flex items-center gap-1">
                    ⏱ {step.duration}
                  </span>
                </div>

                <h3 className={`text-lg sm:text-xl font-serif font-bold text-[#1F1916] ${
                  step.done ? 'line-through opacity-70' : ''
                }`}>
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed max-w-2xl">
                  {step.description}
                </p>

                {/* Actives Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7970]">Key Actives:</span>
                  {step.actives.map((act) => (
                    <span
                      key={act}
                      className="px-2.5 py-0.5 rounded-full bg-[#E8EFE6] text-[#334234] text-[10px] font-bold border border-[#708264]/20"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Matched Product Card */}
            <div className="w-full md:w-64 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DCD2] flex flex-col justify-between space-y-3 shrink-0">
              <div>
                <div className="flex justify-between items-center text-[10px] text-[#8A7970] font-bold uppercase mb-1">
                  <span>Matched Product</span>
                  <span className="text-emerald-700">★ 4.9</span>
                </div>
                <h4 className="text-xs font-bold text-[#1F1916]">{step.productName}</h4>
                <p className="text-[11px] text-[#6B5A52]">{step.productType}</p>
              </div>

              <div className="pt-2 border-t border-[#E8DCD2]/60 flex items-center justify-between">
                <Link
                  href="/products"
                  className="text-[11px] font-bold text-[#334234] hover:underline"
                >
                  View Product Details →
                </Link>
                <button
                  onClick={() => toggleStep(step.id, activeTab)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full cursor-pointer transition-all ${
                    step.done
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white border border-[#E8DCD2] text-[#1F1916] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {step.done ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. DERMATOLOGY EXPERT ADVICE BANNER */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#E8DCD2]">
          <Image
            src="/images/features_skincare.png"
            alt="Dermatology advice"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">
            CLINICAL TIP FOR TODAY
          </span>
          <h4 className="text-base font-serif font-bold text-[#1F1916]">
            Layering from Thinnest to Thickest Density
          </h4>
          <p className="text-xs text-[#6B5A52] leading-relaxed">
            Always apply water-based antioxidant serums before lipid barrier crèmes. This allows lightweight actives like Vitamin C to permeate down to the basal membrane without being blocked by heavier emollient matrices.
          </p>
        </div>
        <Link
          href="/skin-analysis"
          className="px-5 py-2.5 rounded-full border border-[#E8DCD2] text-xs font-bold text-[#1F1916] hover:bg-[#FAF7F2] transition-colors shrink-0"
        >
          Re-check Skin Score →
        </Link>
      </section>
    </div>
  );
}

