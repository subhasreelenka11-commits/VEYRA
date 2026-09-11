'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function NutritionPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPlan();
  }, [user]);

  const loadPlan = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchApi('/nutrition');
      if (data) {
        setPlan(data);
      } else {
        setPlan(null); // No plan exists
      }
    } catch (err: any) {
      if (err.message?.includes('404')) {
         setPlan(null);
      } else {
         setError(err.message || 'Failed to load nutrition plan.');
      }
    } finally {
      setLoading(false);
    }
  };

  const generatePlan = async () => {
    try {
      setGenerating(true);
      setError('');
      const data = await fetchApi('/nutrition/generate', { method: 'POST' });
      setPlan(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate nutrition plan. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-24 bg-[#EADCD4]/50 rounded-[32px]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="h-32 bg-[#EADCD4]/50 rounded-[24px]" />
          <div className="h-32 bg-[#EADCD4]/50 rounded-[24px]" />
          <div className="h-32 bg-[#EADCD4]/50 rounded-[24px]" />
          <div className="h-32 bg-[#EADCD4]/50 rounded-[24px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans pb-12 w-full mx-auto max-w-[1500px] space-y-12">
      <div className="mb-8 pt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center text-[#869188] text-[13px] font-medium mb-3 cursor-pointer hover:text-[#516454] transition-colors">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Nutrition
          </div>
          <h1 className="text-[32px] font-serif font-semibold text-[#1F2922] leading-tight">Your Nutrition Plan</h1>
        </div>
        {plan && (
          <button 
            onClick={generatePlan}
            disabled={generating}
            className="px-5 py-2.5 bg-white border border-[#E8DCD2] text-[#334234] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#FAF7F2] transition-colors disabled:opacity-50 mt-4"
          >
            {generating ? 'Regenerating...' : 'Regenerate Plan ↻'}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-red-800 text-sm font-medium flex items-center gap-3">
          <span>⚠️</span>
          <span>{error}</span>
          <button onClick={loadPlan} className="ml-auto underline font-bold">Retry</button>
        </div>
      )}

      {/* NO PLAN STATE */}
      {!plan && !error && (
        <div className="bg-white rounded-[36px] border border-[#E8DCD2] p-10 md:p-16 text-center shadow-sm flex flex-col items-center max-w-3xl mx-auto">
          <div className="text-5xl mb-6">🥗</div>
          <h2 className="text-3xl font-serif font-bold text-[#1F1916] mb-3">Let's build your nutrition plan.</h2>
          <p className="text-[#6B5A52] font-medium max-w-md mb-10 leading-relaxed">
            Veyra will use your profile, goals, preferences, and lifestyle to create a plan made exactly for you.
          </p>
          
          {generating ? (
            <div className="space-y-4">
              <div className="w-8 h-8 border-4 border-[#334234] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-[#334234] font-bold text-sm uppercase tracking-wider animate-pulse">
                Creating your personalized plan...
              </p>
            </div>
          ) : (
            <button
              onClick={generatePlan}
              className="px-8 py-4 bg-[#334234] text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#253226] transition-all shadow-md flex items-center gap-2"
            >
              Generate My Plan →
            </button>
          )}
        </div>
      )}

      {/* PLAN EXISTS STATE */}
      {plan && !generating && (
        <div className="space-y-10 animate-in fade-in duration-700">
          
          {/* Top Macros Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#334234] text-white p-6 rounded-[28px] shadow-sm flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">Calories</span>
              <span className="text-3xl font-serif font-bold">{plan.targetCalories} <span className="text-sm font-sans font-normal text-emerald-100">kcal</span></span>
            </div>
            <div className="bg-white border border-[#E8DCD2] p-6 rounded-[28px] shadow-sm flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970] mb-1">Protein</span>
              <span className="text-3xl font-serif font-bold text-[#1F1916]">{plan.proteinGrams} <span className="text-sm font-sans font-normal text-[#8A7970]">g</span></span>
            </div>
            <div className="bg-white border border-[#E8DCD2] p-6 rounded-[28px] shadow-sm flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970] mb-1">Carbs</span>
              <span className="text-3xl font-serif font-bold text-[#1F1916]">{plan.carbsGrams} <span className="text-sm font-sans font-normal text-[#8A7970]">g</span></span>
            </div>
            <div className="bg-white border border-[#E8DCD2] p-6 rounded-[28px] shadow-sm flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970] mb-1">Fat</span>
              <span className="text-3xl font-serif font-bold text-[#1F1916]">{plan.fatGrams} <span className="text-sm font-sans font-normal text-[#8A7970]">g</span></span>
            </div>
          </div>

          {/* Summary / Encouragement */}
          {plan.planData?.summary && (
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DCD2]/60 flex items-start gap-4">
              <span className="text-2xl mt-1">✨</span>
              <p className="text-[#5C504A] font-medium leading-relaxed italic">"{plan.planData.summary}"</p>
            </div>
          )}

          {/* Meals Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#1F1916]">Your personalized plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.planData?.meals?.map((meal: any, idx: number) => (
                <div key={idx} className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-6 border-b border-[#E8DCD2] pb-4">
                    <span className="text-xl">
                      {meal.name.toLowerCase().includes('breakfast') ? '🌅' 
                        : meal.name.toLowerCase().includes('lunch') ? '☀️'
                        : meal.name.toLowerCase().includes('snack') ? '🍎'
                        : '🌙'}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#1F1916]">{meal.name}</h3>
                  </div>

                  <div className="space-y-6 flex-1">
                    {meal.suggestions?.length > 0 ? (
                      meal.suggestions.map((sug: any, sIdx: number) => (
                        <div key={sIdx} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DCD2]/50">
                          <h4 className="font-bold text-[#1F1916] mb-1">{sug.meal}</h4>
                          <p className="text-xs text-[#6B5A52] mb-3 leading-relaxed">{sug.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#E8DCD2]/50">
                            <span className="text-[10px] font-bold px-2 py-1 bg-white rounded border border-[#E8DCD2] text-[#5C504A]">
                              ~{sug.approxCalories} kcal
                            </span>
                            <span className="text-[10px] font-bold px-2 py-1 bg-[#E8EFE6] rounded border border-[#708264]/20 text-[#2D452F]">
                              P: {sug.protein}g
                            </span>
                            <span className="text-[10px] font-bold px-2 py-1 bg-white rounded border border-[#E8DCD2] text-[#5C504A]">
                              C: {sug.carbs}g
                            </span>
                            <span className="text-[10px] font-bold px-2 py-1 bg-white rounded border border-[#E8DCD2] text-[#5C504A]">
                              F: {sug.fat}g
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#8A7970] italic">No suggestions provided.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Guidance (Hydration & Tips) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.planData?.hydration && (
              <div className="bg-[#E8F0F2] rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💧</span>
                  <h3 className="text-lg font-serif font-bold text-[#1F1916]">Hydration Focus</h3>
                </div>
                <p className="text-sm font-bold text-[#1F1916] mb-1">{plan.planData.hydration.suggestion}</p>
                <p className="text-xs text-[#5C504A]">{plan.planData.hydration.note}</p>
              </div>
            )}
            
            {plan.planData?.tips?.length > 0 && (
              <div className="bg-[#EADCD4]/20 rounded-[32px] p-8 shadow-sm border border-[#EADCD4]/40">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💡</span>
                  <h3 className="text-lg font-serif font-bold text-[#1F1916]">Wellness Tips</h3>
                </div>
                <ul className="space-y-3">
                  {plan.planData.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#5C504A]">
                      <span className="text-[#A09289] text-[10px] mt-1">✦</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Health Snapshot */}
          <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm mt-8">
            <h3 className="text-lg font-serif font-bold text-[#1F1916] mb-6">Your Nutrition Snapshot</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                <span className="block text-[10px] uppercase font-bold text-[#8A7970] mb-1">Calculated BMI</span>
                <span className="text-lg font-bold text-[#1F1916]">{plan.bmi}</span>
                <span className="block text-[9px] text-[#A09289] mt-1 uppercase tracking-wider">General screening metric</span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                <span className="block text-[10px] uppercase font-bold text-[#8A7970] mb-1">BMR (Basal)</span>
                <span className="text-lg font-bold text-[#1F1916]">{plan.bmr} <span className="text-xs font-normal">kcal</span></span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                <span className="block text-[10px] uppercase font-bold text-[#8A7970] mb-1">TDEE (Total)</span>
                <span className="text-lg font-bold text-[#1F1916]">{plan.tdee} <span className="text-xs font-normal">kcal</span></span>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                <span className="block text-[10px] uppercase font-bold text-[#8A7970] mb-1">Primary Goal</span>
                <span className="text-base font-bold text-[#334234] capitalize">
                  {/* Assuming plan contains user context eventually, otherwise fallback */}
                  Wellness Goal
                </span>
              </div>
            </div>
            
            {/* Safety Disclaimer */}
            <div className="text-[10px] text-[#A09289] leading-relaxed max-w-3xl">
              <strong className="text-[#8A7970]">Disclaimer:</strong> Veyra provides general nutrition and wellness guidance, not medical advice. If you have a medical condition, are pregnant, have a history of eating disorders, or need therapeutic nutrition, consult a qualified healthcare professional. Do not use this tool to create extreme calorie restrictions.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
