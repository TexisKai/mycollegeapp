import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  
  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  });
}

export function getServerSupabase() {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceRole);
}