'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

/**
 * FIXED & PRODUCTION SAFE useAuth Hook
 *
 * Improvements:
 * - user starts as `undefined` to distinguish "loading" vs "not logged in"
 * - prevents early redirects on onboarding page
 * - consistent session hydration across refreshes & signup
 * - stable unsubscribe cleanup
 */

export function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initial session fetch (can be delayed right after signUp)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Auth state listener — updates instantly on signIn/signUp/signOut
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
