import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID required' }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        sender_id,
        created_at,
        sender:sender_id (
          full_name,
          profile_picture_url
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Messages error:', error);
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: data || [] });
  } catch (err) {
    console.error('Messages crash:', err);
    return NextResponse.json({ messages: [] });
  }
}