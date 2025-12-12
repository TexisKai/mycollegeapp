import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);

    // Validate request body
    if (!body || !body.postId || !body.content) {
      return NextResponse.json(
        { error: "Missing postId or content" },
        { status: 400 }
      );
    }

    // Insert comment
    const { error } = await supabase.from("post_comments").insert({
      post_id: body.postId,
      user_id: user.id,
      content: body.content,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
