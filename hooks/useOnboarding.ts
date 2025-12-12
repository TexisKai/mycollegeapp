"use client";

import { supabase } from "@/lib/supabase-browser";

export type OnboardingData = {
  college?: string;
  course?: string;
  year?: string | number;
  du_id_url?: string;
  bio?: string;
  relationship_status?: string;
  interests?: string[];
  skills?: string[];
  profile_picture_url?: string;
};

export function useOnboarding() {
  const completeOnboarding = async (userId: string, data: OnboardingData) => {
    const payload: any = {
      college: data.college ?? null,
      course: data.course ?? null,
      year: data.year ? Number(data.year) : null,
      du_id_url: data.du_id_url ?? null,
      bio: data.bio ?? null,
      relationship_status: data.relationship_status ?? null,
      interests: data.interests ?? null,
      skills: data.skills ?? null,
      profile_picture_url: data.profile_picture_url ?? null,
      onboarding_completed: true,
      profile_completed: true,
      updated_at: new Date().toISOString(),
    };

    // CORRECT Supabase JS update pattern
    const { data: updated, error } = await supabase
      .from("users")
      .update(payload)
      .eq("id", userId)
      .select("*")
      .maybeSingle(); // prevents JSON coercion failures

    if (error) throw error;

    if (!updated) {
      throw new Error("User row not found — onboarding could not complete.");
    }

    return updated;
  };

  return { completeOnboarding };
}
