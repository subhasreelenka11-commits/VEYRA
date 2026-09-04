'use client';

import React, { useState } from 'react';
import { fetchApi } from '../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      router.push('/login');
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8F5F0] font-sans text-[#1F1916] antialiased selection:bg-[#EADBCE]">
      {/* Left Column: Full Bleed High-Definition Image Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative min-h-screen p-12 flex-col justify-between overflow-hidden">
        <Image
          src="/images/veyra_hero_velera_portrait.png"
          alt="Veyra Personal Grooming & AI Wellness"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Soft Dark Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/90 via-[#1F1916]/40 to-black/20" />
        
        {/* Header / Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-block text-3xl font-serif font-bold tracking-tight text-white drop-shadow-md">
            VEYRA
          </Link>
        </div>

        {/* Bottom-left Content / Floating Glass Card */}
        <div className="relative z-10 mt-auto max-w-md space-y-6 text-left">
          {/* Glassmorphism Card */}
          <div className="bg-white/15 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/25 shadow-2xl text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-amber-300 text-sm">✨</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">AI Skin &amp; Grooming Scan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Start building a routine that's made for you.
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium">
              Join 10,000+ users transforming their skincare, nutrition, and wellness habits with Veyra.
            </p>
          </div>
        </div>

      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-12 bg-[#F8F5F0]">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Brand Link */}
          <div className="mb-8 lg:hidden text-center">
            <Link href="/" className="text-3xl font-serif font-bold tracking-tight text-[#1F1916]">
              VEYRA
            </Link>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F1916] tracking-tight">
              Create an account
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] font-medium">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-[#334234] hover:underline underline-offset-4 transition-all"
              >
                Log in here →
              </Link>
            </p>
          </div>

          {/* Social Signups */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E8DCD2] rounded-2xl text-xs font-semibold text-[#1F1916] hover:bg-[#FAF4EE] transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E8DCD2] rounded-2xl text-xs font-semibold text-[#1F1916] hover:bg-[#FAF4EE] transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.16.67-2.84 1.47-.6.7-1.12 1.83-.98 2.94 1.12.09 2.17-.57 2.83-1.37z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#E8DCD2] w-full" />
            <span className="bg-[#F8F5F0] px-3 text-[11px] font-bold uppercase tracking-wider text-[#8A7970] absolute">
              or with email
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200 shadow-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] placeholder-[#A09289] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] placeholder-[#A09289] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none pr-12"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-[#6B5A52] hover:text-[#1F1916] focus:outline-none"
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] placeholder-[#A09289] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start pt-1">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-[#E8DCD2] text-[#334234] focus:ring-[#334234] mt-0.5"
              />
              <label htmlFor="agree-terms" className="ml-2.5 block text-xs font-medium text-[#5C504A]">
                I agree to Veyra's{' '}
                <Link href="#" className="underline text-[#1F1916] font-semibold">
                  Terms of Service
                </Link>{' '}
                &amp;{' '}
                <Link href="#" className="underline text-[#1F1916] font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-full shadow-md text-xs font-bold uppercase tracking-wider text-white bg-[#334234] hover:bg-[#253226] focus:outline-none transition-all disabled:opacity-70 mt-2"
            >
              {isLoading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
