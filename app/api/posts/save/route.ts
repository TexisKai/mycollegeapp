import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);

    if (!body || !body.postId) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { postId } = body;

    // Check if already saved
    const { data: existing } = await supabase
      .from("saved_posts")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("saved_posts")
        .delete()
        .eq("id", existing.id);

      return NextResponse.json({
        ok: true,
        saved: false,
      });
    }

    await supabase
      .from("saved_posts")
      .insert({ post_id: postId, user_id: user.id });

    return NextResponse.json({
      ok: true,
      saved: true,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
