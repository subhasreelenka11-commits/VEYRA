'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '../../lib/api';

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
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const [morningSteps, setMorningSteps] = useState<Step[]>([]);
  const [eveningSteps, setEveningSteps] = useState<Step[]>([]);
  const [weeklySteps, setWeeklySteps] = useState<Step[]>([]);

  useEffect(() => {
    loadRoutine();
  }, []);

  const loadRoutine = async () => {
    try {
      setIsLoading(true);
      setError('');
      // Use today's date in local time for daily progress
      const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
      const data = await fetchApi(`/grooming/routine?date=${today}`);
      
      if (data.routine) {
        populateSteps(data.routine, data.progress);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load grooming routine.');
    } finally {
      setIsLoading(false);
    }
  };

  const populateSteps = (routineData: any, completedIds: string[]) => {
    const mapSteps = (steps: any[]) => steps.map((s: any) => ({
      ...s,
      done: completedIds.includes(s.id)
    }));

    setMorningSteps(mapSteps(routineData.morning || []));
    setEveningSteps(mapSteps(routineData.evening || []));
    setWeeklySteps(mapSteps(routineData.weekly || []));
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError('');
      const data = await fetchApi('/grooming/generate', { method: 'POST' });
      if (data.routine) {
        populateSteps(data.routine, []); // new routine, 0 progress
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate routine. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

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

  const toggleStep = async (id: string, list: 'morning' | 'evening' | 'weekly') => {
    // Optimistic UI update
    const updateLocal = (prev: Step[]) => prev.map(s => s.id === id ? { ...s, done: !s.done } : s);
    if (list === 'morning') setMorningSteps(updateLocal);
    else if (list === 'evening') setEveningSteps(updateLocal);
    else setWeeklySteps(updateLocal);

    try {
      const today = new Date().toLocaleDateString('en-CA');
      await fetchApi('/grooming/progress', {
        method: 'POST',
        body: JSON.stringify({ date: today, stepId: id })
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
      // Revert on failure
      const revertLocal = (prev: Step[]) => prev.map(s => s.id === id ? { ...s, done: !s.done } : s);
      if (list === 'morning') setMorningSteps(revertLocal);
      else if (list === 'evening') setEveningSteps(revertLocal);
      else setWeeklySteps(revertLocal);
    }
  };

  const currentSteps = activeTab === 'morning' ? morningSteps : activeTab === 'evening' ? eveningSteps : weeklySteps;
  const completedCount = currentSteps.filter(s => s.done).length;
  const completionPercentage = currentSteps.length > 0 ? Math.round((completedCount / currentSteps.length) * 100) : 0;
  
  const hasRoutine = morningSteps.length > 0 || eveningSteps.length > 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#334234] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm">
          {error}
        </div>
      )}

      {!hasRoutine ? (
        <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-12 text-center shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto border border-[#E8DCD2]">
            <span className="text-3xl">✨</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-[#1F1916]">Unlock Your Ritual</h2>
            <p className="text-sm text-[#6B5A52] leading-relaxed">
              We'll use your latest AI Skin Scan to generate a personalized morning, evening, and weekly skincare routine perfectly matched to your biomarkers.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-8 py-3 bg-[#334234] text-white font-bold rounded-full hover:bg-[#1F1916] transition-colors shadow-lg shadow-emerald-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Analyzing Skin & Generating...' : 'Generate My Routine'}
          </button>
          
          <p className="text-xs text-[#8A7970]">
            Don't have a skin scan yet? <Link href="/skin-analysis" className="underline hover:text-[#1F1916]">Scan your face first</Link>.
          </p>
        </div>
      ) : (
        <>
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
            {currentSteps.length === 0 && (
               <div className="p-8 text-center text-[#6B5A52] border border-dashed border-[#E8DCD2] rounded-3xl">
                 No steps defined for this routine.
               </div>
            )}
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
                    {step.actives && step.actives.length > 0 && (
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
                    )}
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
        </>
      )}

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
