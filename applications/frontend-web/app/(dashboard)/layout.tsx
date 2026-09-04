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
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Skin Analysis', href: '/skin-analysis' },
    { name: 'Grooming & Skincare', href: '/grooming' },
    { name: 'Nutrition', href: '/nutrition' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Products', href: '/products' },
    { name: 'Progress', href: '/progress' },
  ];

  const secondaryNavigation = [
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Veyra</h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Navigation */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-4 h-16 md:px-8">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 hidden md:block">
              {navigation.find(n => n.href === pathname)?.name || secondaryNavigation.find(n => n.href === pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.email || 'User'}
              </span>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {user?.email?.[0].toUpperCase() || 'V'}
              </div>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
