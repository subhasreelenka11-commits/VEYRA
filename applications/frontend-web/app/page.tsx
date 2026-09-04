'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6EFE9] text-[#1F1916] font-sans antialiased selection:bg-[#EADBCE] pt-4 sm:pt-6">

      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#F6EFE9]/95 backdrop-blur-md border-b border-[#EADCD4]/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-serif tracking-tight text-[#1F1916]">
              VEYRA
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#5C504A]">
              <Link href="#features" className="hover:text-[#1F1916] transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="hover:text-[#1F1916] transition-colors">
                How It Works
              </Link>
              <Link href="#personalization" className="hover:text-[#1F1916] transition-colors">
                Personalization
              </Link>
              <Link href="#about" className="hover:text-[#1F1916] transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs font-semibold tracking-wider">
            <Link href="/login" className="text-[#1F1916] hover:opacity-80 transition-opacity uppercase px-2 py-1">
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#2A221E] text-white px-6 py-2.5 rounded-full hover:bg-[#3D322C] transition-all shadow-sm"
            >
              Get Started →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F6EFE9] border-b border-[#EADCD4] px-6 pt-4 pb-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-gray-800">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="#personalization" onClick={() => setMobileMenuOpen(false)}>
                Personalization
              </Link>
            </nav>
            <div className="pt-4 border-t border-[#EADCD4] flex flex-col space-y-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium text-gray-800">
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-[#2A221E] text-white py-3 rounded-full font-medium shadow"
              >
                Get Started →
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* 2. HERO SECTION — ARCH & PORTRAIT EDITORIAL (Inspired by Velera & Velour Aesthetics) */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F1916] leading-[1.12] tracking-tight">
                Smarter Grooming & <br />
                <span className="italic font-serif font-normal text-[#6B5A52]">Wellness Starts Here.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C504A] max-w-xl leading-relaxed font-normal">
                Personalized routines powered by AI to match your skin's unique needs, nutrition goals, and daily habits — backed by science and intelligent design.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-[#2A221E] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#3D322C] transition-all shadow-md"
                >
                  Get Started →
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center bg-white text-[#1F1916] border border-[#EADCD4] px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#FAF4EE] transition-all"
                >
                  Explore VEYRA
                </Link>
              </div>

              {/* Social Proof Row */}
              <div className="pt-6 flex items-center gap-4 border-t border-[#EADCD4]/80">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#F6EFE9] bg-[#8C6D58] text-white flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#F6EFE9] bg-[#708264] text-white flex items-center justify-center text-xs font-bold">
                    M
                  </div>
                  <div className="inline-block h-9 w-9 rounded-full ring-2 ring-[#F6EFE9] bg-[#4A3E3D] text-white flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-amber-600 text-xs gap-1">
                    ★★★★★ <span className="text-[#1F1916] font-bold text-xs">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-[#6B5A52] font-medium mt-0.5">
                    2,300+ Members Active Today
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Portrait Arch with AI Dots */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[440px] h-[500px] sm:h-[540px] rounded-t-full bg-[#E8DCD4] border border-[#E0D2C8] overflow-hidden shadow-2xl flex justify-center items-end">
                <Image
                  src="/images/veyra_hero_model_portrait.png"
                  alt="Veyra Radiant Skincare Model"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating UI Badge 1: AI Skin Analysis */}
              <div className="absolute top-12 left-0 sm:-left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EADCD4] shadow-xl space-y-1 max-w-[190px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1916]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Smooth Texture</span>
                </div>
                <p className="text-[11px] text-[#6B5A52]">Barrier Intact • 92 Glow</p>
              </div>

              {/* Floating UI Badge 2: Custom Routine */}
              <div className="absolute top-1/2 right-0 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EADCD4] shadow-xl space-y-1 max-w-[190px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1916]">
                  <span>🧴</span>
                  <span>Custom Routine</span>
                </div>
                <p className="text-[11px] text-[#6B5A52]">Niacinamide + SPF 50</p>
              </div>

              {/* Floating UI Badge 3: Smart Nutrition */}
              <div className="absolute bottom-6 left-2 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EADCD4] shadow-xl space-y-1 max-w-[200px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1916]">
                  <span>🥗</span>
                  <span>Smart Nutrition</span>
                </div>
                <p className="text-[11px] text-[#6B5A52]">Vegetarian • 2.5L Hydration</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BENTO GRID SECTION (Inspired by Lumine & Velera) */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916] tracking-tight">
              Everything you need to feel radiant & balanced.
            </h2>
            <p className="text-[#6B5A52] text-base">
              A holistic approach to personal skincare, nutrition, and daily wellness.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADCD4] shadow-xl space-y-6">
            {/* Bento Top Featured Card (Dark Forest Green like Lumine) */}
            <div className="bg-[#384836] text-white p-8 sm:p-12 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-widest uppercase">
                  AI-Powered Skincare & Wellness
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif leading-tight">
                  Glow Naturally. Feel Confident. Every Day.
                </h3>
                <p className="text-gray-200 text-base leading-relaxed font-normal max-w-lg">
                  VEYRA brings intelligent skin analysis, morning & evening routines, smart nutrition, and curated product matches together in one seamless platform.
                </p>
                <div>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 bg-white text-[#384836] px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    Start Your Plan →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-[260px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/images/veyra_hero_silk_robe.png"
                  alt="VEYRA Silk Robe Routine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bento Bottom 3 Cards (Muted Colors like Lumine) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Sage Tint */}
              <div className="bg-[#E7ECE4] p-8 rounded-2xl border border-[#D5DFC3]/60 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-2xl">✨</span>
                  <h4 className="text-xl font-serif text-[#2B3829]">AI Skin Analysis</h4>
                  <p className="text-xs text-[#4A5748] leading-relaxed">
                    Scan visible skin traits to track hydration, smooth texture, and radiance metrics in real time.
                  </p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl text-xs font-bold text-[#2B3829] border border-[#D5DFC3]">
                  Hydration: 84% • Smoothness: High
                </div>
              </div>

              {/* Card 2: Warm Mocha Tint */}
              <div className="bg-[#F5ECE5] p-8 rounded-2xl border border-[#E5D7CD] flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-2xl">🧴</span>
                  <h4 className="text-xl font-serif text-[#3D2E27]">Hydrate. Nourish. Glow.</h4>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">
                    Custom morning & evening grooming routines tailored strictly to your skin type and daily environment.
                  </p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl text-xs font-bold text-[#3D2E27] border border-[#E5D7CD]">
                  3-Step Morning Routine Active
                </div>
              </div>

              {/* Card 3: Nude Sand Tint */}
              <div className="bg-[#EFE6DC] p-8 rounded-2xl border border-[#DECFC3] flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-2xl">🥗</span>
                  <h4 className="text-xl font-serif text-[#362B25]">Pure. Natural. Grounded.</h4>
                  <p className="text-xs text-[#5C4C44] leading-relaxed">
                    Smart recipes and nutrition guidance matching your diet, cooking time, and calorie targets.
                  </p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl text-xs font-bold text-[#362B25] border border-[#DECFC3]">
                  Vegetarian • High Protein Match
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section id="how-it-works" className="bg-[#EFE7E0] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#E2D4C8]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916]">How it works</h2>
              <p className="text-[#6B5A52] text-sm">Three simple steps to your personalized wellness plan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Tell VEYRA about yourself.',
                  desc: 'Complete a brief profile wizard sharing your skin goals, lifestyle, body metrics, and diet.',
                },
                {
                  step: '02',
                  title: 'Get personalized recommendations.',
                  desc: 'Receive your custom skincare steps, macro meal plans, smart recipes, and product matches.',
                },
                {
                  step: '03',
                  title: 'Build better daily habits.',
                  desc: 'Follow your plan in your interactive dashboard, track your hydration, and watch your progress grow.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-[#E5D7CD] shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#2A221E] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-serif text-[#1F1916]">{item.title}</h3>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. "ONE PROFILE. EVERYTHING PERSONALIZED." */}
        <section id="personalization" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#E8DCD4] text-[#6B5A52] text-xs font-bold tracking-widest uppercase">
                True Personalization
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916] leading-tight">
                One profile. Everything personalized.
              </h2>
              <p className="text-[#5C504A] text-sm leading-relaxed">
                VEYRA learns your goals, lifestyle, preferences, routines, and needs to make every recommendation relevant to you.
              </p>

              {/* Sample Profile Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5D7CD] shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h4 className="font-bold text-[#1F1916]">Subhasree's Profile</h4>
                    <p className="text-xs text-[#6B5A52]">Updated today</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#FAF4EE] p-3 rounded-xl border border-[#EADCD4]">
                    <p className="text-gray-400">Goal</p>
                    <p className="font-bold text-[#1F1916] mt-0.5">General Wellness</p>
                  </div>
                  <div className="bg-[#FAF4EE] p-3 rounded-xl border border-[#EADCD4]">
                    <p className="text-gray-400">Activity</p>
                    <p className="font-bold text-[#1F1916] mt-0.5">Moderately Active</p>
                  </div>
                  <div className="bg-[#FAF4EE] p-3 rounded-xl border border-[#EADCD4]">
                    <p className="text-gray-400">Diet</p>
                    <p className="font-bold text-[#1F1916] mt-0.5">Vegetarian</p>
                  </div>
                  <div className="bg-[#FAF4EE] p-3 rounded-xl border border-[#EADCD4]">
                    <p className="text-gray-400">Focus</p>
                    <p className="font-bold text-[#1F1916] mt-0.5">Skin + Nutrition</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-[#E5D7CD] shadow-sm space-y-2">
                <p className="text-xs font-bold text-[#708264]">🧴 MORNING ROUTINE</p>
                <h4 className="font-serif text-[#1F1916]">Hydration & SPF</h4>
                <p className="text-xs text-[#6B5A52]">Gentle cleanser + Niacinamide serum + SPF 50.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5D7CD] shadow-sm space-y-2">
                <p className="text-xs font-bold text-[#708264]">🥗 HEALTHY MEAL</p>
                <h4 className="font-serif text-[#1F1916]">High-Protein Quinoa Bowl</h4>
                <p className="text-xs text-[#6B5A52]">Roasted chickpeas, avocado, and olive oil dressing.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5D7CD] shadow-sm space-y-2">
                <p className="text-xs font-bold text-[#708264]">✨ GROOMING TIP</p>
                <h4 className="font-serif text-[#1F1916]">Night Moisture Barrier</h4>
                <p className="text-xs text-[#6B5A52]">Apply peptide cream before sleep to restore skin balance.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5D7CD] shadow-sm space-y-2">
                <p className="text-xs font-bold text-[#708264]">🎯 WELLNESS GOAL</p>
                <h4 className="font-serif text-[#1F1916]">2.5L Daily Water Goal</h4>
                <p className="text-xs text-[#6B5A52]">Track hydration for skin clarity and metabolic health.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DASHBOARD PREVIEW */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EFE7E0] border-y border-[#E2D4C8]">
          <div className="max-w-7xl mx-auto space-y-12 text-center">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916]">Everything you need, in one place.</h2>
              <p className="text-[#6B5A52] text-sm">An intelligent dashboard designed to give you clarity and focus.</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E5D7CD] shadow-2xl p-6 sm:p-8 space-y-8 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                  <h3 className="text-2xl font-serif text-[#1F1916]">Good morning, Subhasree 👋</h3>
                  <p className="text-xs text-[#6B5A52]">Let's take care of you today.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#FAF4EE] border border-[#EADCD4] text-xs font-bold text-[#1F1916]">
                    BMI: 25.7 (Optimal)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#EADCD4] space-y-2">
                  <p className="text-xs font-medium text-gray-500">Today's Routine</p>
                  <p className="text-xl font-bold text-gray-900">3 of 4 Completed</p>
                </div>
                <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#EADCD4] space-y-2">
                  <p className="text-xs font-medium text-gray-500">Hydration Tracker</p>
                  <p className="text-xl font-bold text-gray-900">2.1 L / 2.5 L</p>
                </div>
                <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#EADCD4] space-y-2">
                  <p className="text-xs font-medium text-gray-500">Habit Streak</p>
                  <p className="text-xl font-bold text-gray-900">5 Days Active 🔥</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="bg-[#2A221E] text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight leading-tight">
              Feel better. Look after yourself. Make it yours.
            </h2>
            <p className="text-[#EADBCE] text-base max-w-xl mx-auto font-normal">
              Build a personalized routine for your skin, grooming, nutrition, and everyday wellness.
            </p>
            <div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-[#2A221E] px-9 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-md"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t border-[#EADCD4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif tracking-tight text-[#1F1916]">VEYRA</h3>
            <p className="text-xs text-[#6B5A52] mt-1">Your personal grooming & wellness companion.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-wider text-[#6B5A52]">
            <Link href="/" className="hover:text-[#1F1916]">Home</Link>
            <Link href="#features" className="hover:text-[#1F1916]">Features</Link>
            <Link href="#how-it-works" className="hover:text-[#1F1916]">How It Works</Link>
            <Link href="/login" className="hover:text-[#1F1916]">Login</Link>
            <Link href="/register" className="hover:text-[#1F1916]">Register</Link>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Veyra. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
