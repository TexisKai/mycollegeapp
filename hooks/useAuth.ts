'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);   // FIXED
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!ignore) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      ignore = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
