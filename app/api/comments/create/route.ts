import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);

    if (!body || !body.postId || !body.content) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    await supabase.from("post_comments").insert({
      post_id: body.postId,
      user_id: user.id,
      content: body.content,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
