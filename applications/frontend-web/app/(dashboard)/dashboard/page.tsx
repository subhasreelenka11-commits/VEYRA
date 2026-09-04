'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, profileComplete } = useAuth();
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Rely on context for protection, but we fetch fresh profile data for the dashboard here
    const loadData = async () => {
      try {
        const response = await fetchApi('/profile');
        if (!response.isComplete) {
          router.push('/onboarding');
          return;
        }
        setData(response);
      } catch (err) {
        setError("We couldn't load your profile.");
      } finally {
        setLoading(false);
      }
    };

    if (user && profileComplete) {
      loadData();
    }
  }, [user, profileComplete, router]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg md:col-span-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center">
        <h3 className="text-red-800 font-medium">{error}</h3>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  const p = data?.profile;
  const firstName = p?.firstName || 'User';

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {greeting()}, {firstName}.
        </h1>
        <p className="text-gray-500 text-lg">Let's take care of you today.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Profile</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex justify-between">
              <span className="text-gray-500">Age</span>
              <span className="font-medium">{p?.age || '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Height</span>
              <span className="font-medium">{p?.height ? `${p.height} cm` : '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">{p?.weight ? `${p.weight} kg` : '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Goal</span>
              <span className="font-medium capitalize">{p?.goal?.toLowerCase().replace('_', ' ') || '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Activity</span>
              <span className="font-medium capitalize">{p?.activityLevel?.toLowerCase().replace('_', ' ') || '-'}</span>
            </li>
          </ul>
        </section>

        {/* BMI Card */}
        {data?.bmi && (
          <section className="bg-indigo-600 rounded-2xl p-6 shadow-sm text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-medium text-indigo-100 mb-2">Current BMI</h2>
            <div className="text-5xl font-bold mb-4">{data.bmi}</div>
            <p className="text-xs text-indigo-200 mt-auto opacity-80">
              *BMI is a general screening metric and not a medical diagnosis. Consult a professional for personalized advice.
            </p>
          </section>
        )}

        {/* Today Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Your Day</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-medium text-gray-800">Morning Routine</h3>
              <p className="text-sm text-gray-500 mt-1">Coming soon</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-medium text-gray-800">Nutrition</h3>
              <p className="text-sm text-gray-500 mt-1">Coming soon</p>
            </div>
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Analyze My Skin', bg: 'bg-rose-50', text: 'text-rose-700' },
            { name: 'Build My Routine', bg: 'bg-blue-50', text: 'text-blue-700' },
            { name: 'Plan My Meals', bg: 'bg-emerald-50', text: 'text-emerald-700' },
            { name: 'Find a Recipe', bg: 'bg-amber-50', text: 'text-amber-700' },
          ].map((action) => (
            <button key={action.name} className={`${action.bg} ${action.text} p-4 rounded-xl font-medium transition-transform hover:scale-105 shadow-sm text-sm sm:text-base`}>
              {action.name}
            </button>
          ))}
        </div>
      </section>

      {/* Feature Overview */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Explore Veyra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Skin Analysis', desc: 'AI-assisted analysis of visible skin characteristics.' },
            { title: 'Grooming & Skincare', desc: 'Personalized grooming and skincare routines.' },
            { title: 'Nutrition', desc: 'Personalized meal planning based on user information.' },
            { title: 'Recipes', desc: 'Recipes based on preferences and available ingredients.' },
            { title: 'Products', desc: 'Product recommendations based on user needs.' },
            { title: 'Progress', desc: 'Track wellness and personal progress.' },
          ].map((feature) => (
            <div key={feature.title} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
