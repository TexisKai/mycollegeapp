'use client';

import React, { useState, useEffect } from 'react';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { completeOnboarding, loading: onboardingLoading, error } = useOnboarding();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    college: '',
    course: '',
    year: '',
    interests: [],
    skills: [],
    teams: [],
    duIdUrl: '',
    bio: '',
    relationship_status: '',
    profile_picture_url: ''
  });

  useEffect(() => {
    if (authLoading) return;
    if (user === null) {
      router.push('/auth');
    }
  }, [authLoading, user, router]);

  const update = (updates: any) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const Current = steps[step - 1];

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await completeOnboarding(user.id, formData);
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>

        <ProgressBar current={step} total={5} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded shadow">
          <Current data={formData} updateData={update} />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
              disabled={step === 1}
            >
              Previous
            </button>

            {step === 5 ? (
              <button
                onClick={handleSubmit}
                disabled={onboardingLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {onboardingLoading ? 'Completing...' : 'Complete'}
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
