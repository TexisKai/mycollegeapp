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

    // Check if already liked
    const { data: like } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    let liked;
    if (like) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("id", like.id);

      liked = false;
    } else {
      await supabase
        .from("post_likes")
        .insert({ post_id: postId, user_id: user.id });

      liked = true;
    }

    // Get updated count
    const { count } = await supabase
      .from("post_likes")
      .select("id", { count: "exact" })
      .eq("post_id", postId);

    return NextResponse.json({
      ok: true,
      liked,
      likesCount: count ?? 0,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
