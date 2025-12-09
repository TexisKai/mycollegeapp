import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useOnboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completeOnboarding = async (userId: string, formData: any) => {
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          college: formData.college || null,
          course: formData.course || null,
          year: formData.year || null,
          interests: formData.interests || [],
          skills: formData.skills || [],
          bio: formData.bio || null,
          relationship_status: formData.relationship_status || null,
          du_id_url: formData.duIdUrl || null,
          profile_picture_url: formData.profile_picture_url || null,
          onboarding_complete: true,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      return { success: true };
    } catch (err: any) {
      console.error('Onboarding error:', err);
      setError(err.message || 'Failed to complete onboarding');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { completeOnboarding, loading, error };
}
