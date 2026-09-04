'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetchApi } from '../lib/api';
import Link from 'next/link';

export default function Onboarding() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'PREFER_NOT_TO_SAY',
    height: '',
    weight: '',
    activityLevel: 'SEDENTARY',
    goal: 'MAINTENANCE',
    dietaryPreference: 'NON_VEGETARIAN',
    allergies: '',
    dislikes: '',
    budget: '50',
    cookingTime: '30',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.age)) {
      setError("Please fill out all required fields.");
      return;
    }
    if (step === 2 && (!formData.height || !formData.weight)) {
      setError("Please fill out all required fields.");
      return;
    }
    setError('');
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== totalSteps) {
      nextStep();
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        budget: parseFloat(formData.budget),
        cookingTime: parseInt(formData.cookingTime),
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
        dislikes: formData.dislikes ? formData.dislikes.split(',').map(s => s.trim()) : [],
      };

      await fetchApi('/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      await refreshUser();
      router.push('/dashboard');
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.message || 'Failed to save profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl text-center mb-12">
        <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900">
          VEYRA
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you.</h2>
          <p className="text-gray-500">Tell us a little about yourself so Veyra can personalize your experience.</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-900 rounded-full z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2 
                  ${step >= num ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400'}`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-gray-400">
            <span className={step >= 1 ? 'text-gray-900' : ''}>About You</span>
            <span className={step >= 2 ? 'text-gray-900' : ''}>Body & Goals</span>
            <span className={step >= 3 ? 'text-gray-900' : ''}>Food & Lifestyle</span>
          </div>
        </div>
        
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 text-sm border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: About You */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" name="firstName" required className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" name="lastName" required className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input type="number" name="age" required min="13" max="120" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.age} onChange={handleChange} placeholder="e.g. 24" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select name="gender" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.gender} onChange={handleChange}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                    <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Body & Goals */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input type="number" name="height" required min="50" step="0.1" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.height} onChange={handleChange} placeholder="e.g. 165" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input type="number" name="weight" required min="20" step="0.1" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.weight} onChange={handleChange} placeholder="e.g. 60" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  <select name="activityLevel" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.activityLevel} onChange={handleChange}>
                    <option value="SEDENTARY">Sedentary (Little to no exercise)</option>
                    <option value="LIGHT">Light (1-3 days/week)</option>
                    <option value="MODERATE">Moderate (3-5 days/week)</option>
                    <option value="ACTIVE">Active (6-7 days/week)</option>
                    <option value="VERY_ACTIVE">Very Active (Physical job + training)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                  <select name="goal" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.goal} onChange={handleChange}>
                    <option value="WEIGHT_LOSS">Weight Loss</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="WEIGHT_GAIN">Weight Gain / Muscle</option>
                    <option value="GENERAL_WELLNESS">General Wellness</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Food & Lifestyle */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                <select name="dietaryPreference" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.dietaryPreference} onChange={handleChange}>
                  <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                  <option value="VEGETARIAN">Vegetarian</option>
                  <option value="VEGAN">Vegan</option>
                  <option value="EGGETARIAN">Eggetarian</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Budget ($ per day)</label>
                  <input type="number" name="budget" required min="1" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.budget} onChange={handleChange} placeholder="e.g. 50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time (minutes)</label>
                  <input type="number" name="cookingTime" required min="5" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.cookingTime} onChange={handleChange} placeholder="e.g. 30" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies <span className="text-gray-400 font-normal">(Optional, comma separated)</span></label>
                <input type="text" name="allergies" placeholder="e.g. peanuts, shellfish" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.allergies} onChange={handleChange} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dislikes <span className="text-gray-400 font-normal">(Optional, comma separated)</span></label>
                <input type="text" name="dislikes" placeholder="e.g. mushrooms, eggplant" className="block w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 bg-gray-50/50" value={formData.dislikes} onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2 ml-auto"
            >
              {loading ? 'Saving...' : step === totalSteps ? 'Complete Onboarding' : 'Continue'}
              {!loading && step < totalSteps && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
