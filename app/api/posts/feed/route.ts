import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        content,
        media_urls,
        created_at,
        users:user_id (
          id,
          full_name,
          profile_picture_url
        ),
        post_likes(count),
        post_comments(count)
        `
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Feed error:", error);
      return NextResponse.json({ posts: [] });
    }

    return NextResponse.json({ posts: data ?? [] });
  } catch (err) {
    console.error("Feed crash:", err);
    return NextResponse.json({ posts: [] });
  }
}
