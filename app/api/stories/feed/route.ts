import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('stories')
      .select(`
        id,
        media_url,
        created_at,
        users:user_id (
          id,
          full_name,
          profile_picture_url
        )
      `)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Stories feed error:', error);
      return NextResponse.json({ stories: [] });
    }

    // Transform data to match expected format
    const stories = (data || []).map(story => ({
      id: story.id,
      media_url: story.media_url,
      user: story.users
    }));

    return NextResponse.json({ stories });
  } catch (err) {
    console.error('Stories feed crash:', err);
    return NextResponse.json({ stories: [] });
  }
}