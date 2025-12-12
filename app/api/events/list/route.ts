import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        description,
        date,
        time,
        location,
        tags,
        societies:society_id (
          id,
          name,
          logo_url
        )
      `)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      console.error('Events error:', error);
      return NextResponse.json({ events: [] });
    }

    const events = (data || []).map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,

      // 🔥 FIX: Use array index!
      society: event.societies?.[0]?.name ?? "Unknown Society",

      society_logo: event.societies?.[0]?.logo_url ?? null,
      tags: event.tags || []
    }));

    return NextResponse.json({ events });
  } catch (err) {
    console.error('Events crash:', err);
    return NextResponse.json({ events: [] });
  }
}
