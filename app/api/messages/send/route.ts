import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { conversation_id, content } = await req.json();

    if (!conversation_id || !content)
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const { error } = await supabase.from("messages").insert({
      conversation_id,
      sender_id: user.id,
      content,
    });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
