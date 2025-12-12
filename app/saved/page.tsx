export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import SavedPostsList from '@/components/saved/SavedPostsList';

export default async function SavedPage() {
  const supabase = createSupabaseServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>
        <SavedPostsList />
      </div>
    </div>
  );
}