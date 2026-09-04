'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();

  if (loading || !user) {
    return <div className="p-12 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Veyra Dashboard</h1>
        <button 
          onClick={logout}
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl mb-4">Welcome, {user.email}</h2>
        <p className="text-gray-600">
          This is only a placeholder. The actual Veyra dashboard features will be implemented in STEP 6.
        </p>
      </div>
    </div>
  );
}
