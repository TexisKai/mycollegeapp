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
      .from('conversations')
      .select(`
        id,
        participant_1_id,
        participant_2_id,
        updated_at,
        messages:messages(content, created_at, sender_id)
      `)
      .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Conversations error:', error);
      return NextResponse.json({ conversations: [] });
    }

    // Get participant details and format conversations
    const conversations = await Promise.all(
      (data || []).map(async (conv) => {
        const participantId = conv.participant_1_id === user.id 
          ? conv.participant_2_id 
          : conv.participant_1_id;

        const { data: participant } = await supabase
          .from('users')
          .select('id, full_name, profile_picture_url')
          .eq('id', participantId)
          .single();

        const lastMessage = conv.messages?.[0];
        
        return {
          id: conv.id,
          participant: participant || { id: participantId, full_name: 'Unknown User' },
          last_message: lastMessage ? {
            content: lastMessage.content,
            created_at: lastMessage.created_at
          } : null,
          unread_count: 0 // TODO: Implement unread count logic
        };
      })
    );

    return NextResponse.json({ conversations });
  } catch (err) {
    console.error('Conversations crash:', err);
    return NextResponse.json({ conversations: [] });
  }
}