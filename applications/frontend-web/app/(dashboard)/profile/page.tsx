'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchApi('/profile');
        if (res?.profile) {
          const p = res.profile;
          setFormData({
            firstName: p.firstName || '',
            lastName: p.lastName || '',
            age: p.age ? String(p.age) : '',
            gender: p.gender || 'PREFER_NOT_TO_SAY',
            height: p.height ? String(p.height) : '',
            weight: p.weight ? String(p.weight) : '',
            activityLevel: p.activityLevel || 'SEDENTARY',
            goal: p.goal || 'MAINTENANCE',
            dietaryPreference: p.dietaryPreference || 'NON_VEGETARIAN',
            allergies: Array.isArray(p.allergies) ? p.allergies.join(', ') : '',
            dislikes: Array.isArray(p.dislikes) ? p.dislikes.join(', ') : '',
            budget: p.budget ? String(p.budget) : '50',
            cookingTime: p.cookingTime ? String(p.cookingTime) : '30',
          });
        }
        if (res?.bmi) setBmi(res.bmi);
      } catch (err: any) {
        setErrorMsg('Unable to fetch your profile information.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        budget: parseFloat(formData.budget),
        cookingTime: parseInt(formData.cookingTime),
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
        dislikes: formData.dislikes ? formData.dislikes.split(',').map(s => s.trim()).filter(Boolean) : [],
      };

      const updated = await fetchApi('/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (updated?.bmi) setBmi(updated.bmi);
      await refreshUser();
      setSuccessMsg('Your wellness profile has been updated successfully.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
        <div className="h-28 bg-[#EADCD4]/50 rounded-[32px]" />
        <div className="h-96 bg-[#EADCD4]/50 rounded-[32px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-[#EFE7E0] rounded-[36px] p-8 border border-[#E2D4C8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#334234] text-white flex items-center justify-center text-xl font-bold shadow-md ring-4 ring-white">
            {formData.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'V'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1916]">
                {formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'Personal Health Profile'}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8EFE6] text-[#334234] font-bold border border-[#708264]/20">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#6B5A52] mt-0.5">{user?.email}</p>
          </div>
        </div>

        {bmi && (
          <div className="bg-white px-5 py-3 rounded-2xl border border-[#E2D4C8] text-center shadow-sm">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7970]">Calculated BMI</span>
            <span className="text-xl font-serif font-bold text-[#334234]">{bmi}</span>
          </div>
        )}
      </div>

      {/* Main Profile Form Card */}
      <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[#E8DCD2] shadow-sm">
        <div className="border-b border-[#E8DCD2] pb-6 mb-8">
          <h3 className="text-xl font-serif font-bold text-[#1F1916]">Personalized Calibration</h3>
          <p className="text-xs text-[#6B5A52] mt-1">
            Update your body parameters, nutrition targets, and routines to keep Veyra recommendations accurate.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-[#E8EFE6] text-[#2D452F] text-xs font-semibold rounded-2xl border border-[#708264]/30 flex items-center gap-2.5 shadow-sm">
            <span>✨</span>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2.5 shadow-sm">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#708264]">1. Core Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Physical & Goals */}
          <div className="space-y-4 pt-4 border-t border-[#E8DCD2]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#708264]">2. Body &amp; Routine Targets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  required
                  min="50"
                  step="0.1"
                  value={formData.height}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  required
                  min="20"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Primary Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="GENERAL_WELLNESS">General Wellness</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="WEIGHT_LOSS">Weight Loss</option>
                  <option value="WEIGHT_GAIN">Weight Gain / Muscle</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Activity Level</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="SEDENTARY">Sedentary (Little to no exercise)</option>
                  <option value="LIGHT">Light (1-3 days/week)</option>
                  <option value="MODERATE">Moderate (3-5 days/week)</option>
                  <option value="ACTIVE">Active (6-7 days/week)</option>
                  <option value="VERY_ACTIVE">Very Active (Physical job + training)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Nutrition & Preferences */}
          <div className="space-y-4 pt-4 border-t border-[#E8DCD2]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#708264]">3. Nutrition &amp; Preferences</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Dietary Style</label>
                <select
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none cursor-pointer"
                >
                  <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                  <option value="VEGETARIAN">Vegetarian</option>
                  <option value="VEGAN">Vegan</option>
                  <option value="EGGETARIAN">Eggetarian</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Daily Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Cooking Time (min)</label>
                <input
                  type="number"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g. peanuts, dairy"
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C504A] mb-2">Dislikes</label>
                <input
                  type="text"
                  name="dislikes"
                  value={formData.dislikes}
                  onChange={handleChange}
                  placeholder="e.g. cilantro, mushrooms"
                  className="block w-full rounded-2xl border border-[#E8DCD2] px-4 py-3.5 text-sm text-[#1F1916] shadow-sm focus:border-[#334234] focus:ring-1 focus:ring-[#334234] bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8DCD2] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#334234] hover:bg-[#253226] transition-all shadow-md disabled:opacity-70 cursor-pointer"
            >
              {saving ? 'Saving changes...' : 'Save Profile Changes →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
