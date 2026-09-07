'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Skin Analysis', href: '/skin-analysis', icon: '✨' },
    { name: 'Grooming & Skincare', href: '/grooming', icon: '🌿' },
    { name: 'Nutrition', href: '/nutrition', icon: '🥗' },
    { name: 'Smart Recipes', href: '/recipes', icon: '🍳' },
    { name: 'Product Picks', href: '/products', icon: '🧴' },
    { name: 'Progress Tracking', href: '/progress', icon: '📈' },
  ];

  const secondaryNavigation = [
    { name: 'Profile & Health', href: '/profile', icon: '👤' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const currentNav = navigation.find(n => n.href === pathname) || secondaryNavigation.find(n => n.href === pathname);

  return (
    <div className="flex h-screen bg-[#F8F5F0] text-[#1F1916] font-sans antialiased selection:bg-[#EADBCE]">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#FAF7F2] border-r border-[#E8DCD2] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col justify-between
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between h-20 border-b border-[#E8DCD2] px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-2xl font-serif font-bold tracking-tight text-[#1F1916]">
                VEYRA
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8EFE6] text-[#334234] font-bold uppercase tracking-wider border border-[#708264]/20">
                PRO
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-[#6B5A52] hover:text-[#1F1916] rounded-lg"
            >
              ✕
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970] px-3 mb-2">
              Wellness Hub
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all
                    ${isActive 
                      ? 'bg-[#334234] text-white shadow-sm' 
                      : 'text-[#6B5A52] hover:bg-[#EADBCE]/40 hover:text-[#1F1916]'}
                  `}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Secondary Navigation & User info */}
          <div className="p-4 border-t border-[#E8DCD2] space-y-1.5 bg-[#FAF7F2]/80">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970] px-3 mb-2">
              Account
            </div>
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all
                    ${isActive 
                      ? 'bg-[#334234] text-white shadow-sm' 
                      : 'text-[#6B5A52] hover:bg-[#EADBCE]/40 hover:text-[#1F1916]'}
                  `}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-2xl text-[#9A4B3E] hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
            >
              <span className="text-sm">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DCD2] flex items-center justify-between px-6 h-20 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-[#5C504A] hover:text-[#1F1916] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xl">{currentNav?.icon || '🌿'}</span>
              <div>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-[#1F1916]">
                  {currentNav?.name || 'Wellness Portal'}
                </h1>
                <p className="text-[11px] text-[#8A7970] hidden sm:block">Veyra Intelligent Wellness</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B5A52] hover:text-[#1F1916] py-1.5 px-3 rounded-full hover:bg-[#EADBCE]/50 border border-transparent hover:border-[#E8DCD2] transition-colors"
            >
              <span>←</span> Return to site
            </Link>

            <div className="flex items-center gap-3 pl-3 border-l border-[#E8DCD2]">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#1F1916] truncate max-w-[150px]">
                  {user?.email?.split('@')[0] || 'Member'}
                </p>
                <p className="text-[10px] text-[#708264] font-semibold">Active Plan</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#334234] text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-[#FAF7F2]">
                {user?.email?.[0].toUpperCase() || 'V'}
              </div>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto bg-[#F8F5F0] p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
