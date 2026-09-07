'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [toastMessage, setToastMessage] = useState('');

  // Notification toggles
  const [morningAlarm, setMorningAlarm] = useState(true);
  const [morningTime, setMorningTime] = useState('08:00');
  const [eveningAlarm, setEveningAlarm] = useState(true);
  const [eveningTime, setEveningTime] = useState('21:30');
  const [hydrationPing, setHydrationPing] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Privacy & Units
  const [localBiometrics, setLocalBiometrics] = useState(true);
  const [shareAnonymousStats, setShareAnonymousStats] = useState(false);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleSavePreferences = () => {
    showToast('Preferences updated and synchronized.');
  };

  return (
    <div className="space-y-8 pb-12 relative max-w-4xl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#334234] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-500/30 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">⚙️</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                SYSTEM & PROFILE PREFERENCES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Settings & Privacy
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Configure your notifications, security parameters, and data governance. You hold complete ownership of your biometric wellness telemetry.
            </p>
          </div>

          <button
            onClick={handleSavePreferences}
            className="bg-[#334234] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Save Settings</span>
          </button>
        </div>
      </section>

      {/* 2. ACCOUNT CREDENTIALS */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">MEMBERSHIP IDENTITY</span>
            <h3 className="text-xl font-serif font-bold text-[#1F1916]">Account Credentials</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#E8EFE6] text-[#334234] text-[10px] font-bold border border-[#708264]/20">
            Verified Account
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8A7970]">Registered Email</label>
            <input
              type="text"
              readOnly
              value={user?.email || 'member@veyra.com'}
              className="w-full bg-[#FAF7F2] border border-[#E8DCD2] rounded-2xl px-4 py-3 text-xs text-[#1F1916] font-medium outline-none cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8A7970]">Account Tier</label>
            <div className="w-full bg-[#FAF7F2] border border-[#E8DCD2] rounded-2xl px-4 py-3 text-xs text-[#1F1916] font-medium flex justify-between items-center">
              <span>Veyra Precision Tier (Pro)</span>
              <span className="text-[10px] font-bold text-emerald-700">Active</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/profile"
            className="px-5 py-2.5 rounded-full border border-[#E8DCD2] text-xs font-bold text-[#1F1916] hover:bg-[#FAF7F2] transition-colors"
          >
            Edit Health Blueprint & Body Composition →
          </Link>
        </div>
      </section>

      {/* 3. DAILY RITUAL REMINDERS */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="border-b border-[#E8DCD2] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">PROACTIVE CADENCE</span>
          <h3 className="text-xl font-serif font-bold text-[#1F1916]">Daily Ritual Notifications</h3>
        </div>

        <div className="space-y-4">
          {/* Morning ritual */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#1F1916]">Morning Skincare & Cleanse Prompt</span>
              <p className="text-[11px] text-[#6B5A52]">Notification to apply antioxidant serum and SPF protection.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={morningTime}
                onChange={(e) => setMorningTime(e.target.value)}
                className="bg-white border border-[#E8DCD2] rounded-xl px-2.5 py-1 text-xs text-[#1F1916] font-mono outline-none"
              />
              <button
                onClick={() => setMorningAlarm(!morningAlarm)}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  morningAlarm ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                    morningAlarm ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Evening ritual */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#1F1916]">Evening Restorative Night Care</span>
              <p className="text-[11px] text-[#6B5A52]">Reminder for double-cleanse and nightly peptide lipid recovery crème.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
                className="bg-white border border-[#E8DCD2] rounded-xl px-2.5 py-1 text-xs text-[#1F1916] font-mono outline-none"
              />
              <button
                onClick={() => setEveningAlarm(!eveningAlarm)}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  eveningAlarm ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                    eveningAlarm ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hydration pings */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#1F1916]">Hydration Gentle Pings</span>
              <p className="text-[11px] text-[#6B5A52]">Periodic reminders to hit your 2.5L cellular water target.</p>
            </div>
            <button
              onClick={() => setHydrationPing(!hydrationPing)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                hydrationPing ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                  hydrationPing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weekly digest */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#1F1916]">Weekly Dermal Progress Digest</span>
              <p className="text-[11px] text-[#6B5A52]">Comprehensive summary of your 7-day biomarker improvement.</p>
            </div>
            <button
              onClick={() => setWeeklyDigest(!weeklyDigest)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                weeklyDigest ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                  weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 4. PRIVACY & TELEMETRY */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="border-b border-[#E8DCD2] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">SECURITY & ETHICS</span>
          <h3 className="text-xl font-serif font-bold text-[#1F1916]">Biometric Data Governance</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5 max-w-xl">
              <span className="text-xs font-bold text-[#1F1916]">Client-Side Face Processing</span>
              <p className="text-[11px] text-[#6B5A52]">Optical photos are analyzed in-browser with neural weights and never permanently stored on external cloud disks without encryption.</p>
            </div>
            <button
              onClick={() => setLocalBiometrics(!localBiometrics)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                localBiometrics ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                  localBiometrics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2]">
            <div className="space-y-0.5 max-w-xl">
              <span className="text-xs font-bold text-[#1F1916]">Anonymized Wellness Telemetry</span>
              <p className="text-[11px] text-[#6B5A52]">Contribute non-identifiable demographic statistics to help refine clinical dermatology algorithms.</p>
            </div>
            <button
              onClick={() => setShareAnonymousStats(!shareAnonymousStats)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                shareAnonymousStats ? 'bg-[#334234]' : 'bg-[#E8DCD2]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-1 ${
                  shareAnonymousStats ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => showToast('Encrypted export downloaded.')}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DCD2] text-xs font-bold text-[#1F1916] hover:bg-[#EADBCE]/40 transition-colors cursor-pointer"
          >
            Export All Health & Biometric Data (JSON)
          </button>
        </div>
      </section>

      {/* 5. MEASUREMENT UNITS */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm space-y-6">
        <div className="border-b border-[#E8DCD2] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#708264]">LOCALIZATION</span>
          <h3 className="text-xl font-serif font-bold text-[#1F1916]">Units of Measurement</h3>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              unitSystem === 'metric'
                ? 'bg-[#334234] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#6B5A52] border border-[#E8DCD2] hover:text-[#1F1916]'
            }`}
          >
            Metric System (cm, kg, ml)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              unitSystem === 'imperial'
                ? 'bg-[#334234] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#6B5A52] border border-[#E8DCD2] hover:text-[#1F1916]'
            }`}
          >
            Imperial System (in, lbs, fl oz)
          </button>
        </div>
      </section>

      {/* 6. SIGN OUT */}
      <section className="bg-white rounded-[32px] border border-[#E8DCD2] p-8 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="text-sm font-serif font-bold text-[#1F1916]">Sign Out of Session</h4>
          <p className="text-xs text-[#6B5A52]">End current active session on this device.</p>
        </div>
        <button
          onClick={logout}
          className="px-6 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-100 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </section>
    </div>
  );
}

