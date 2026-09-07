'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SkinAnalysisPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [activeMetricTab, setActiveMetricTab] = useState<'overview' | 'ingredients' | 'history'>('overview');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  const metrics = [
    { name: 'Barrier Integrity', score: 88, status: 'Optimal', color: 'text-emerald-700', bg: 'bg-emerald-500', note: 'Strong stratum corneum lipid matrix' },
    { name: 'Hydration Level', score: 82, status: 'Hydrated', color: 'text-emerald-700', bg: 'bg-emerald-500', note: 'Epidermal moisture retention is high' },
    { name: 'Texture & Micro-relief', score: 79, status: 'Smooth', color: 'text-emerald-700', bg: 'bg-emerald-500', note: 'Minimal congestion, slight unevenness on forehead' },
    { name: 'Redness & Sensitivity', score: 22, status: 'Low Risk', color: 'text-[#708264]', bg: 'bg-[#708264]', note: 'Mild vascular flush around cheekbones' },
    { name: 'Sebum Equilibrium', score: 38, status: 'Balanced', color: 'text-emerald-700', bg: 'bg-emerald-500', note: 'Normal T-zone activity with no excess sheen' },
    { name: 'UV / Photo-stress', score: 16, status: 'Low', color: 'text-[#708264]', bg: 'bg-[#708264]', note: 'Low hyperpigmentation; sunscreen compliance working' },
  ];

  const recommendedActives = [
    {
      name: 'Niacinamide (Vitamin B3) 4%',
      purpose: 'Fortifies lipid barrier and balances sebum production',
      match: '96% Match',
      type: 'Morning & Night',
    },
    {
      name: 'Centella Asiatica (Cica)',
      purpose: 'Soothes micro-inflammation and calms vascular reactivity',
      match: '94% Match',
      type: 'Morning',
    },
    {
      name: 'Micro-Molecular Hyaluronic Acid',
      purpose: 'Deep dermal cellular hydration with zero comedogenic risk',
      match: '92% Match',
      type: 'Morning & Night',
    },
    {
      name: 'Non-Nano Zinc Oxide SPF 50+',
      purpose: 'Physical broad-spectrum protection against photo-aging',
      match: '99% Match',
      type: 'Daily Essential',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">✨</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                DERMATOLOGY AI LAB
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              AI Skin Diagnostics
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Clinical-grade dermal intelligence. Our neural scan analyzes pore geometry, surface hydration, redness, and cellular vitality in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-[#334234] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning Dermis...</span>
                </>
              ) : (
                <>
                  <span>📸</span>
                  <span>Capture New Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Scan & Metric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Phone Scanner Mockup */}
        <div className="lg:col-span-5 bg-white rounded-[36px] border border-[#E8DCD2] p-8 shadow-sm flex flex-col items-center text-center space-y-6">
          <div className="w-full flex justify-between items-center border-b border-[#E8DCD2] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970]">Active Scan Session</span>
              <p className="text-xs font-bold text-[#1F1916]">High-Resolution Optical Sensor</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E8EFE6] text-[10px] font-bold text-[#334234] border border-[#708264]/20">
              HD 4K Neural Feed
            </span>
          </div>

          {/* Phone Mockup Frame */}
          <div className="relative bg-[#FAF7F2] rounded-[36px] border-4 border-stone-200 shadow-xl overflow-hidden w-full max-w-[290px] aspect-[9/14] flex flex-col justify-between">
            {/* Camera notch */}
            <div className="w-16 h-2 bg-stone-300 rounded-full mx-auto mt-3 shrink-0 z-20" />

            {/* Model Face with Real Scan Reticle */}
            <div className="relative flex-1 w-full overflow-hidden">
              <Image
                src="/images/veyra_hero_velera_portrait.png"
                alt="AI Face Scan Diagnostics"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Scanning laser beam animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-bounce top-1/3 z-30" />
              )}

              {/* Scanning Target Reticles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-32 h-32 rounded-full border-2 border-dashed ${isScanning ? 'border-emerald-400 animate-spin' : 'border-emerald-500/80'} flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full border border-emerald-400/60 flex items-center justify-center bg-emerald-500/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Top Sensor Readout Badges */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                FACIAL MATRIX
              </div>

              {/* Bottom Floating Score Pill */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-md flex justify-between items-center">
                <div className="text-left">
                  <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider">Overall Skin Index</span>
                  <span className="text-base font-serif font-bold text-[#1F1916]">84 / 100</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Grade A: Balanced
                </span>
              </div>
            </div>

            {/* Bottom bar indicator */}
            <div className="w-20 h-1 bg-stone-300 rounded-full mx-auto mb-2 shrink-0 z-20" />
          </div>

          <p className="text-xs text-[#6B5A52] leading-relaxed max-w-xs">
            Calibrated against over 25,000 clinical dermatological benchmarks. Next recommended diagnostic: in 7 days.
          </p>
        </div>

        {/* Right: Comprehensive Clinical Metric Report */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Pills */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-full border border-[#E8DCD2] w-fit">
            <button
              onClick={() => setActiveMetricTab('overview')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'overview'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Biomarker Overview
            </button>
            <button
              onClick={() => setActiveMetricTab('ingredients')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'ingredients'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Prescribed Actives
            </button>
            <button
              onClick={() => setActiveMetricTab('history')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'history'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Scan History
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeMetricTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#1F1916]">Dermal Parameters</h3>
                    <p className="text-xs text-[#8A7970]">Real-time optical evaluation</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Confidence: 97.4%
                  </span>
                </div>

                <div className="space-y-5">
                  {metrics.map((m) => (
                    <div key={m.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#1F1916]">{m.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#8A7970]">{m.status}</span>
                          <span className={`font-mono font-bold ${m.color}`}>{m.score}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DCD2]/60">
                        <div
                          className={`h-full rounded-full ${m.bg}`}
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-[#8A7970]">{m.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routine Action Callout */}
              <div className="bg-[#FAF7F2] rounded-[28px] border border-[#E8DCD2] p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl p-3 bg-white rounded-2xl border border-[#E8DCD2]">🌿</span>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#1F1916]">Synchronize Daily Routine</h4>
                    <p className="text-xs text-[#6B5A52]">Update your morning and evening skincare steps based on today's diagnostics.</p>
                  </div>
                </div>
                <Link
                  href="/grooming"
                  className="px-5 py-2.5 bg-[#334234] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#253226] transition-all shrink-0"
                >
                  View Routine →
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: PRESCRIBED ACTIVES */}
          {activeMetricTab === 'ingredients' && (
            <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1F1916]">Curated Active Ingredients</h3>
                  <p className="text-xs text-[#8A7970]">Selected by AI based on your barrier status</p>
                </div>
                <span className="text-xs font-bold text-[#334234]">4 Targeted Actives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedActives.map((active) => (
                  <div key={active.name} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2] space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-xs font-bold text-[#1F1916]">{active.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {active.match}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B5A52] leading-relaxed">{active.purpose}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E8DCD2]/60 flex justify-between items-center text-[10px]">
                      <span className="text-[#8A7970] font-semibold">Recommended Application</span>
                      <span className="font-bold text-[#334234]">{active.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <span className="text-base">⚠️</span>
                <div>
                  <span className="font-bold block">Actives to Pause This Week:</span>
                  <span>High concentration Alpha Hydroxy Acids (Glycolic &gt; 10%) and coarse physical scrubs to avoid micro-tearing your barrier.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCAN HISTORY */}
          {activeMetricTab === 'history' && (
            <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1F1916]">Diagnostic Timeline</h3>
                  <p className="text-xs text-[#8A7970]">Past evaluations and barrier progression</p>
                </div>
                <span className="text-xs font-bold text-emerald-700">↗ +6 Pts This Month</span>
              </div>

              <div className="space-y-3">
                {[
                  { date: 'Today, 08:30 AM', score: 84, grade: 'Optimal', note: 'Hydration up by 4%, redness calm' },
                  { date: 'Aug 31, 2026', score: 81, grade: 'Good', note: 'Slight dryness after outdoor run' },
                  { date: 'Aug 24, 2026', score: 78, grade: 'Fair', note: 'Mild barrier fatigue from travel' },
                  { date: 'Aug 17, 2026', score: 76, grade: 'Fair', note: 'Initial baseline scan' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2] hover:bg-[#EADBCE]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#334234] text-white flex items-center justify-center text-xs font-serif font-bold">
                        {item.score}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1F1916]">{item.date}</p>
                        <p className="text-[11px] text-[#6B5A52]">{item.note}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white text-[#334234] border border-[#E8DCD2]">
                      {item.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

