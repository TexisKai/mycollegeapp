'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding, OnboardingData } from '@/hooks/useOnboarding';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { completeOnboarding } = useOnboarding();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OnboardingData>({
    college: '',
    course: '',
    year: '',
    interests: [],
    skills: [],
    du_id_url: '',
    bio: '',
    relationship_status: '',
    profile_picture_url: '',
  });

  useEffect(() => {
    if (authLoading || user === undefined) return;
    if (!user) router.push('/auth');
  }, [authLoading, user, router]);

  const update = (updates: Partial<OnboardingData>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  // ---- Validation rules (Option C)
  const step1Valid = useMemo(() => {
    return !!formData.college && !!formData.course && !!formData.year;
  }, [formData.college, formData.course, formData.year]);

  const step2Valid = useMemo(() => {
    // ID card required
    return !!formData.du_id_url;
  }, [formData.du_id_url]);

  const step3Valid = useMemo(() => {
    // Bio required & at least 3 interests
    return !!formData.bio && (formData.interests || []).length >= 3;
  }, [formData.bio, formData.interests]);

  const step4Valid = useMemo(() => {
    // At least 1 skill
    return (formData.skills || []).length >= 1;
  }, [formData.skills]);

  const step5Valid = useMemo(() => {
    // Profile picture required
    return !!formData.profile_picture_url;
  }, [formData.profile_picture_url]);

  const stepValid = useMemo(() => {
    switch (step) {
      case 1:
        return step1Valid;
      case 2:
        return step2Valid;
      case 3:
        return step3Valid;
      case 4:
        return step4Valid;
      case 5:
        return step5Valid;
      default:
        return false;
    }
  }, [step, step1Valid, step2Valid, step3Valid, step4Valid, step5Valid]);

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const Current = steps[step - 1];

  const next = () => {
    setError(null);
    if (!stepValid) {
      setError('Please complete required fields before continuing.');
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const prev = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setError(null);
    // final guard - ensure all steps valid
    if (!(step1Valid && step2Valid && step3Valid && step4Valid && step5Valid)) {
      setError('Please complete all required fields before finishing.');
      return;
    }

    setSaving(true);
    try {
      await completeOnboarding(user.id, formData);
      // success -> redirect dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('completeOnboarding error', err);
      setError(err.message || 'Failed to complete onboarding');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || user === undefined) {
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

          <div className="flex justify-between mt-6 items-center">
            <button
              onClick={prev}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
              disabled={step === 1 || saving}
            >
              Previous
            </button>

            {step === 5 ? (
              <button
                onClick={handleSubmit}
                disabled={saving || !stepValid}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Complete'}
              </button>
            ) : (
              <button
                onClick={next}
                disabled={!stepValid || saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
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
