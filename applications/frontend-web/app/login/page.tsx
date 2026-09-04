'use client';

import React, { useState } from 'react';
import { fetchApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      await refreshUser();
      // Redirection handled by AuthContext
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      {/* Left side: Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FAF9F6] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/60 via-[#FAF9F6] to-[#FAF9F6]"></div>
        <div className="relative z-10 max-w-lg px-12 text-center">
          <Link href="/" className="inline-block text-4xl font-bold tracking-tight text-gray-900 mb-8">
            VEYRA
          </Link>
          <h2 className="text-3xl font-semibold mb-6 leading-tight">Welcome back to your personalized wellness journey.</h2>
          <p className="text-gray-500 text-lg">
            Log in to access your customized skincare routines, meal plans, and wellness tracking.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10 lg:hidden text-center">
            <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900">
              VEYRA
            </Link>
          </div>
          
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Log in</h2>
          <p className="mt-3 text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-gray-900 hover:underline decoration-gray-300 underline-offset-4">
              Create one
            </Link>
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50 pr-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <span className="text-sm font-medium">{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
