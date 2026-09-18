'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi('/progress/dashboard');
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Skin Health Index', value: dashboardData ? `${dashboardData.skinHealthIndex}/100` : '0/100', change: '+2%', positive: true, note: 'Latest skin scan score' },
    { label: 'Ritual Consistency', value: dashboardData ? `${dashboardData.ritualConsistency}%` : '0%', change: '+5%', positive: true, note: dashboardData ? `${dashboardData.completedDays} of last 28 days completed` : 'No data' },
    { label: 'Mean Hydration', value: '2.4L / day', change: '+0.5L', positive: true, note: 'Cellular hydration target met' },
    { label: 'Metabolic Balance', value: '8.8 / 10', change: '+0.6', positive: true, note: 'Steady morning glucose stability' },
  ];

  const habitMatrix = dashboardData?.habitMatrix || [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ];

  const milestones = dashboardData?.historicalScans?.map((s: any) => ({
    date: new Date(s.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    title: 'Biomarker Scan Completed',
    badge: 'Clinical Progress',
    description: s.summary || 'Routine check-in of dermal metrics.',
    score: `${s.overallScore} Score`,
  })) || [];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">📈</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                BIOMETRIC TRAJECTORY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Progress & Vitality
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Observe your holistic dermal and metabolic evolution. Consistent daily micro-habits compound into lasting cellular vitality.
            </p>
          </div>

          {/* Time range pills */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#E2D4C8] shadow-sm">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#334234] text-white shadow-sm'
                    : 'text-[#6B5A52] hover:text-[#1F1916]'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st) => (
          <div key={st.label} className="bg-white p-6 rounded-[28px] border border-[#E8DCD2] shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970]">{st.label}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                {st.change}
              </span>
            </div>
            <div className="text-3xl font-serif font-bold text-[#1F1916]">{st.value}</div>
            <p className="text-[11px] text-[#6B5A52]">{st.note}</p>
          </div>
        ))}
      </div>

      {/* 3. VISUAL PROGRESS CHART & HABIT HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: SVG Skin Health Progression Curve */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E8DCD2] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">HISTORICAL TELEMETRY</span>
              <h3 className="text-xl font-serif font-bold text-[#1F1916]">Skin Health Score Progression</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Steady Upward Trend
            </span>
          </div>

          {/* SVG Smooth Curve Graph */}
          <div className="relative w-full h-64 pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#708264" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#708264" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#E8DCD2" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#E8DCD2" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#E8DCD2" strokeDasharray="4 4" strokeWidth="1" />

              {/* Area fill under curve */}
              <path
                d="M 20 140 Q 140 125, 220 95 T 380 60 T 480 35 L 480 170 L 20 170 Z"
                fill="url(#chartGradient)"
              />

              {/* Line Curve */}
              <path
                d="M 20 140 Q 140 125, 220 95 T 380 60 T 480 35"
                fill="none"
                stroke="#334234"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="20" cy="140" r="5" fill="#334234" stroke="#FFF" strokeWidth="2" />
              <circle cx="150" cy="115" r="5" fill="#334234" stroke="#FFF" strokeWidth="2" />
              <circle cx="280" cy="85" r="5" fill="#334234" stroke="#FFF" strokeWidth="2" />
              <circle cx="400" cy="55" r="5" fill="#334234" stroke="#FFF" strokeWidth="2" />
              <circle cx="480" cy="35" r="6" fill="#10B981" stroke="#FFF" strokeWidth="2" />

              {/* Point Label */}
              <text x="460" y="20" fill="#1F1916" fontSize="12" fontWeight="bold">84</text>
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between items-center text-[10px] font-mono text-[#8A7970] pt-2 border-t border-[#E8DCD2]">
              <span>Aug 10</span>
              <span>Aug 17</span>
              <span>Aug 24</span>
              <span>Aug 31</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Right: Habit Consistency Heatmap */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
          <div className="border-b border-[#E8DCD2] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">DISCIPLINE MATRIX</span>
            <h3 className="text-xl font-serif font-bold text-[#1F1916]">28-Day Consistency</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-[#8A7970] uppercase">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            {habitMatrix.map((week: boolean[], wIdx: number) => (
              <div key={wIdx} className="grid grid-cols-7 gap-2">
                {week.map((done: boolean, dIdx: number) => (
                  <div
                    key={dIdx}
                    className={`h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ${
                      done
                        ? 'bg-[#334234] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#8A7970] border border-[#E8DCD2]'
                    }`}
                  >
                    {done ? '✓' : '—'}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8DCD2] flex items-center justify-between text-xs text-[#6B5A52]">
            <span>Current Streak:</span>
            <span className="font-bold text-[#1F1916] bg-[#E8EFE6] px-3 py-1 rounded-full text-[#334234] border border-[#708264]/20">
              🔥 {dashboardData?.currentStreak || 0} Days Straight
            </span>
          </div>
        </div>
      </div>

      {/* 4. MILESTONE TIMELINE */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">CHRONOLOGY</span>
            <h3 className="text-2xl font-serif font-bold text-[#1F1916]">Wellness Milestones</h3>
          </div>
          <Link
            href="/skin-analysis"
            className="text-xs font-bold text-[#334234] hover:underline"
          >
            Record New Scan →
          </Link>
        </div>

        <div className="space-y-4">
          {milestones.map((m: any, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#EADBCE]/30 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#8A7970]">{m.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#334234] text-[9px] font-bold border border-[#E8DCD2]">
                    {m.badge}
                  </span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1F1916]">{m.title}</h4>
                <p className="text-xs text-[#6B5A52] max-w-2xl">{m.description}</p>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-bold text-[#1F1916] border border-[#E8DCD2] shadow-xs shrink-0">
                {m.score}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

