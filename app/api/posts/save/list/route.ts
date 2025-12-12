import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('saved_posts')
      .select(`
        id,
        posts:post_id (
          id,
          content,
          media_urls,
          created_at,
          users:user_id (
            id,
            full_name,
            profile_picture_url
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Saved posts error:', error);
      return NextResponse.json({ savedPosts: [] });
    }

    return NextResponse.json({ savedPosts: data || [] });
  } catch (err) {
    console.error('Saved posts crash:', err);
    return NextResponse.json({ savedPosts: [] });
  }
}