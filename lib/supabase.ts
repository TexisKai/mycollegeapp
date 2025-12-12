import { createClient } from '@supabase/supabase-js';

// These must be defined in your .env.local
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(url, key, {
  auth: {
    // Persist session to localStorage and use cookies
    persistSession: true,
    // Automatically refresh token
    autoRefreshToken: true,
  },
});

// Optionally export helpers if needed (don’t use this on client pages)
export function getServerSupabase() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return createClient(url, serviceRole);
}
