'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4F0] text-[#1F1916] font-sans antialiased selection:bg-[#EADBCE]">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#F7F4F0]/90 backdrop-blur-md px-4 sm:px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-serif tracking-tight font-bold text-[#1F1916]">
              VEYRA
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide text-[#5C504A]">
              <Link href="#features" className="hover:text-[#1F1916] transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="hover:text-[#1F1916] transition-colors">
                How It Works
              </Link>
              <Link href="#about" className="hover:text-[#1F1916] transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-[#1F1916] hover:opacity-80 px-4 py-2 rounded-full"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#334234] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#253226] transition-all shadow-sm flex items-center gap-1.5"
            >
              Get Started
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
          <div className="md:hidden bg-[#F7F4F0] border-b border-[#EADCD4] px-6 pt-4 pb-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-gray-800">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="#about" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </nav>
            <div className="pt-4 border-t border-[#EADCD4] flex flex-col space-y-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium text-gray-800">
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-[#334234] text-white py-3 rounded-full font-medium shadow"
              >
                Get Started →
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow space-y-16 lg:space-y-24">
        {/* 2. HERO SECTION */}
        <section className="px-4 sm:px-6 lg:px-12 pt-6 pb-12 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-[11px] font-bold tracking-widest text-[#6B5A52] uppercase">
                PERSONALIZED WELLNESS, MADE FOR YOU
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F1916] leading-[1.12] tracking-tight">
                Your personal <br />
                <span className="italic font-serif font-normal text-[#4A3E3D]">grooming &amp;</span> <br />
                wellness companion.
              </h1>

              <p className="text-sm sm:text-base text-[#6B5A52] max-w-md leading-relaxed">
                Personalized skincare, grooming, nutrition, and wellness guidance — designed around you.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="bg-[#334234] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  Get Started →
                </Link>
                <Link
                  href="#features"
                  className="bg-white text-[#1F1916] border border-[#E5D7CD] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#FAF4EE] transition-all"
                >
                  Explore VEYRA
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-4 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7F4F0] bg-[#8C6D58] text-white flex items-center justify-center text-[10px] font-bold">
                    S
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7F4F0] bg-[#708264] text-white flex items-center justify-center text-[10px] font-bold">
                    M
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7F4F0] bg-[#4A3E3D] text-white flex items-center justify-center text-[10px] font-bold">
                    A
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7F4F0] bg-[#B0937A] text-white flex items-center justify-center text-[10px] font-bold">
                    R
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-amber-600 text-xs gap-1">
                    ★★★★★
                  </div>
                  <p className="text-[11px] text-[#6B5A52] font-medium">
                    Trusted by 10,000+ users
                  </p>
                </div>
              </div>
            </div>

            {/* Right Hero Column Arch Graphic */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] h-[480px] sm:h-[540px] rounded-t-full bg-[#EADCD4] border border-[#E0D2C8] overflow-hidden shadow-2xl flex justify-center items-end">
                <Image
                  src="/images/veyra_hero_silk_robe.png"
                  alt="Veyra Personal Grooming & Wellness Model"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating Badge 1 (Bottom Left of Arch) */}
              <div className="absolute bottom-10 left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E5D7CD] shadow-lg space-y-1 max-w-[210px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1916]">
                  <span>🏷️</span>
                  <span>Personalized for you</span>
                </div>
                <p className="text-[11px] text-[#6B5A52]">Skin • Nutrition • Wellness</p>
              </div>

              {/* Floating Badge 2 (Top Right of Arch) */}
              <div className="absolute top-12 right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E5D7CD] shadow-lg space-y-2 max-w-[190px]">
                <p className="text-xs font-bold text-[#1F1916]">Your morning routine</p>
                <ul className="text-[11px] text-[#5C504A] space-y-1 font-medium">
                  <li className="flex items-center gap-1.5 text-emerald-700">✓ Hydration</li>
                  <li className="flex items-center gap-1.5 text-emerald-700">✓ Skincare</li>
                  <li className="flex items-center gap-1.5 text-emerald-700">✓ Breakfast</li>
                  <li className="flex items-center gap-1.5 text-emerald-700">✓ Movement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CATEGORY ICON STRIP */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#EFE7E0] rounded-2xl p-6 border border-[#E2D4C8] space-y-4">
            <h3 className="text-center text-xs font-bold tracking-widest text-[#6B5A52] uppercase">
              One place for your everyday wellness
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {[
                { label: 'Skin', icon: '🌿' },
                { label: 'Grooming', icon: '🧴' },
                { label: 'Nutrition', icon: '🥗' },
                { label: 'Recipes', icon: '🍳' },
                { label: 'Wellness', icon: '🧘' },
                { label: 'Progress', icon: '📊' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm py-3 px-4 rounded-xl border border-white/60 flex items-center justify-center gap-2 text-xs font-bold text-[#1F1916] hover:bg-white transition-colors cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. BENTO GRID FEATURES SECTION */}
        <section id="features" className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1916] tracking-tight">
            Everything you need to take better care of yourself.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left AI Skin Analysis Card */}
            <div className="md:col-span-5 bg-[#EFE7E0] p-8 rounded-3xl border border-[#E2D4C8] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-white/80 text-[10px] font-extrabold tracking-widest text-[#334234] uppercase border border-[#E2D4C8]">
                  AI POWERED
                </span>
                <h3 className="text-2xl font-serif text-[#1F1916]">AI Skin Analysis</h3>
                <p className="text-xs text-[#6B5A52] leading-relaxed">
                  Understand your skin and get personalized guidance with AI.
                </p>
                <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] hover:underline">
                  Learn more →
                </Link>
              </div>

              {/* Graphic Mock Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E2D4C8] shadow-sm space-y-3 max-w-[240px] mx-auto text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Skin Health Score</p>
                <div className="w-16 h-16 rounded-full border-4 border-[#334234] flex items-center justify-center text-xl font-bold text-[#1F1916] mx-auto">
                  82
                </div>
                <div className="text-[11px] space-y-1 text-left pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hydration</span>
                    <span className="font-bold text-emerald-700">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Texture</span>
                    <span className="font-bold text-emerald-700">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Redness</span>
                    <span className="font-bold text-amber-600">Mild</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Acne</span>
                    <span className="font-bold text-emerald-700">Clear</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Bento Grid Stack */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Personalized Routines */}
              <div className="bg-[#EFE7E0] p-6 rounded-3xl border border-[#E2D4C8] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-[#1F1916]">Personalized Routines</h4>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">
                    Build skincare and grooming routines that fit your needs.
                  </p>
                  <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] hover:underline">
                    Learn more →
                  </Link>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#E2D4C8] text-center text-2xl">
                  🧴 🧼 ✨
                </div>
              </div>

              {/* Card 2: Nutrition */}
              <div className="bg-[#EFE7E0] p-6 rounded-3xl border border-[#E2D4C8] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-[#1F1916]">Nutrition</h4>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">
                    Get meal ideas personalized to your goals and preferences.
                  </p>
                  <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] hover:underline">
                    Learn more →
                  </Link>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#E2D4C8] text-center text-2xl">
                  🥗 🥑 🫐
                </div>
              </div>

              {/* Card 3: Smart Recipes */}
              <div className="bg-[#EFE7E0] p-6 rounded-3xl border border-[#E2D4C8] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-[#1F1916]">Smart Recipes</h4>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">
                    Discover recipes based on your preferences and what's available.
                  </p>
                  <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] hover:underline">
                    Learn more →
                  </Link>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#E2D4C8] text-center text-2xl">
                  🍳 🍲 🥣
                </div>
              </div>

              {/* Card 4: Progress Tracking */}
              <div className="bg-[#EFE7E0] p-6 rounded-3xl border border-[#E2D4C8] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-[#1F1916]">Progress Tracking</h4>
                  <p className="text-xs text-[#6B5A52] leading-relaxed">
                    Track your wellness and personal progress over time effortlessly.
                  </p>
                  <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] hover:underline">
                    Learn more →
                  </Link>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-[#E2D4C8] text-center text-2xl">
                  📈 🎯 🏆
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#EFE7E0] rounded-3xl p-8 sm:p-12 border border-[#E2D4C8] space-y-8">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1916]">How it works</h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white text-[#1F1916] border border-[#E2D4C8] flex items-center justify-center text-xs font-bold shrink-0">
                      01
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1F1916]">Tell VEYRA about yourself.</h4>
                      <p className="text-xs text-[#6B5A52] mt-0.5">
                        Share your goals, lifestyle, preferences, and routines.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white text-[#1F1916] border border-[#E2D4C8] flex items-center justify-center text-xs font-bold shrink-0">
                      02
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1F1916]">Get personalized recommendations.</h4>
                      <p className="text-xs text-[#6B5A52] mt-0.5">
                        Receive tailored routines, meals, and product suggestions.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white text-[#1F1916] border border-[#E2D4C8] flex items-center justify-center text-xs font-bold shrink-0">
                      03
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1F1916]">Build better daily habits.</h4>
                      <p className="text-xs text-[#6B5A52] mt-0.5">
                        Follow your plan and track your progress over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 relative h-[240px] sm:h-[280px] rounded-2xl overflow-hidden border border-[#E2D4C8] shadow-md">
                <Image
                  src="/images/veyra_hero_model_portrait.png"
                  alt="Woman reviewing personalized Veyra plan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. ONE PROFILE. EVERYTHING PERSONALIZED */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side Profile Graphic */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2D4C8] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="font-bold text-[#1F1916] text-sm">Your Profile</h4>
                <span className="text-xs text-emerald-700 font-bold">Edit</span>
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

            {/* Right Side Text */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916] leading-tight">
                One profile. Everything personalized.
              </h2>
              <p className="text-sm text-[#6B5A52] leading-relaxed max-w-lg">
                VEYRA learns your goals, lifestyle, preferences, routines, and needs to make every recommendation more relevant to you.
              </p>
              <div>
                <Link
                  href="/register"
                  className="bg-[#334234] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. EVERYTHING YOU NEED, IN ONE PLACE. (DASHBOARD PREVIEW) */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl font-serif text-[#1F1916]">
                Everything you need, <br /> in one place.
              </h2>
              <p className="text-xs text-[#6B5A52] leading-relaxed">
                Your personalized dashboard for a better you.
              </p>
              <Link href="/register" className="inline-block text-xs font-bold text-[#1F1916] underline">
                See how it works →
              </Link>
            </div>

            {/* Dashboard Interface Mockup */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E2D4C8] shadow-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h4 className="font-serif text-lg text-[#1F1916]">Good morning, Subhasree 👋</h4>
                  <p className="text-xs text-[#6B5A52]">Let's take care of you today.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#334234] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#FAF4EE] p-3.5 rounded-xl border border-[#EADCD4]">
                  <p className="text-gray-400">Skin Health Score</p>
                  <p className="text-xl font-bold text-[#1F1916] mt-1">82</p>
                </div>
                <div className="bg-[#FAF4EE] p-3.5 rounded-xl border border-[#EADCD4]">
                  <p className="text-gray-400">Today's Routine</p>
                  <p className="text-xl font-bold text-[#1F1916] mt-1">4 / 5</p>
                </div>
                <div className="bg-[#FAF4EE] p-3.5 rounded-xl border border-[#EADCD4]">
                  <p className="text-gray-400">Daily Calories</p>
                  <p className="text-xl font-bold text-[#1F1916] mt-1">1,450</p>
                </div>
                <div className="bg-[#FAF4EE] p-3.5 rounded-xl border border-[#EADCD4]">
                  <p className="text-gray-400">Water Intake</p>
                  <p className="text-xl font-bold text-[#1F1916] mt-1">1.6 / 2 L</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. DARK GREEN AI INTELLIGENCE BANNER */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#2D3C2F] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl font-serif leading-tight">
                Personal care, <br /> powered by intelligence.
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed max-w-md">
                VEYRA uses your profile, goals, preferences, and routines to provide guidance that becomes more relevant over time.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3">
              <p className="text-xs font-bold text-emerald-300">Good morning, Subhasree ✨</p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="bg-white/20 px-3 py-1 rounded-full">Morning skincare</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Protein-rich breakfast</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">20 min movement</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Hydration</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. MEDICAL DISCLAIMER STRIP */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#EFE7E0] text-[#1F1916] border border-[#E2D4C8] flex items-center justify-center text-xs mx-auto">
            🛡️
          </div>
          <h4 className="text-xs font-bold text-[#1F1916] uppercase tracking-wider">
            Guidance designed around you.
          </h4>
          <p className="text-[11px] text-[#6B5A52] leading-relaxed max-w-xl mx-auto">
            VEYRA provides general grooming and wellness guidance based on the information you provide. AI skin insights are informational and are not a medical diagnosis or replacement for professional care.
          </p>
        </section>

        {/* 10. FINAL CTA SECTION */}
        <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#EFE7E0] rounded-3xl p-10 sm:p-16 text-center space-y-6 border border-[#E2D4C8]">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1916] tracking-tight">
              Feel better. Look after yourself. Make it yours.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A52] max-w-md mx-auto">
              Build a personalized routine for your skin, grooming, nutrition, and everyday wellness.
            </p>
            <div>
              <Link
                href="/register"
                className="bg-[#334234] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-sm inline-flex items-center gap-2"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 11. FOOTER */}
      <footer className="bg-[#F7F4F0] border-t border-[#E2D4C8] mt-16 py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-[#1F1916]">VEYRA</h3>
            <p className="text-xs text-[#6B5A52]">Your personal grooming &amp; wellness companion.</p>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1916] uppercase mb-3">Product</h5>
            <ul className="text-xs text-[#6B5A52] space-y-2">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#how-it-works">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1916] uppercase mb-3">Company</h5>
            <ul className="text-xs text-[#6B5A52] space-y-2">
              <li><Link href="#about">About</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1916] uppercase mb-3">Account</h5>
            <ul className="text-xs text-[#6B5A52] space-y-2">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E2D4C8] text-center text-[11px] text-gray-400">
          &copy; {new Date().getFullYear()} VEYRA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
