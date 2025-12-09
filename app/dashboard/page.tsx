'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome{user ? `, ${user.email}` : ''}</h1>
          <button onClick={()=>router.push('/auth')} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p>Your dashboard content goes here.</p>
        </div>
      </div>
    </div>
  );
}
