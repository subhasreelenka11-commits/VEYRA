'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../lib/api';

export default function Onboarding() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'PREFER_NOT_TO_SAY',
    height: '',
    weight: '',
    activityLevel: 'SEDENTARY',
    goal: 'MAINTENANCE',
    dietaryPreference: 'NONE',
    allergies: '',
    dislikes: '',
    budget: 'MEDIUM',
    cookingTime: 'MEDIUM',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
        dislikes: formData.dislikes ? formData.dislikes.split(',').map(s => s.trim()) : [],
      };

      await fetchApi('/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      await refreshUser();
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.message || 'Failed to save profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>
        <p className="text-gray-500 mb-8">We need a little more information to personalize your Veyra experience.</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name="firstName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="lastName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.lastName} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" required min="13" max="120" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.age} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.gender} onChange={handleChange}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>
            </div>
          </section>

          {/* Body Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Body Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input type="number" name="height" required min="50" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.height} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input type="number" name="weight" required min="20" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.weight} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* Lifestyle */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Lifestyle</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                <select name="activityLevel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.activityLevel} onChange={handleChange}>
                  <option value="SEDENTARY">Sedentary</option>
                  <option value="LIGHTLY_ACTIVE">Lightly Active</option>
                  <option value="MODERATELY_ACTIVE">Moderately Active</option>
                  <option value="VERY_ACTIVE">Very Active</option>
                  <option value="EXTRA_ACTIVE">Extra Active</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Goal</label>
                <select name="goal" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.goal} onChange={handleChange}>
                  <option value="WEIGHT_LOSS">Weight Loss</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="MUSCLE_GAIN">Muscle Gain</option>
                  <option value="GENERAL_HEALTH">General Health</option>
                </select>
              </div>
            </div>
          </section>

          {/* Food Preferences */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Food Preferences</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dietary Preference</label>
                <select name="dietaryPreference" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.dietaryPreference} onChange={handleChange}>
                  <option value="NONE">None</option>
                  <option value="VEGETARIAN">Vegetarian</option>
                  <option value="VEGAN">Vegan</option>
                  <option value="PESCATARIAN">Pescatarian</option>
                  <option value="KETO">Keto</option>
                  <option value="PALEO">Paleo</option>
                  <option value="HALAL">Halal</option>
                  <option value="KOSHER">Kosher</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Budget</label>
                  <select name="budget" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.budget} onChange={handleChange}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cooking Time</label>
                  <select name="cookingTime" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white" value={formData.cookingTime} onChange={handleChange}>
                    <option value="LOW">Low (Quick)</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High (Elaborate)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
                <input type="text" name="allergies" placeholder="e.g. peanuts, shellfish" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.allergies} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dislikes (comma separated)</label>
                <input type="text" name="dislikes" placeholder="e.g. mushrooms, eggplant" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" value={formData.dislikes} onChange={handleChange} />
              </div>
            </div>
          </section>

          <div className="pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Saving Profile...' : 'Complete Onboarding'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
