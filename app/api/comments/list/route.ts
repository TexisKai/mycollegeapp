import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const supabase = createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json({ comments: [] });

  const { data, error } = await supabase
    .from("post_comments")
    .select(`
      id,
      content,
      created_at,
      users:user_id (
        id,
        full_name,
        profile_picture_url
      )
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return NextResponse.json({ comments: data ?? [] });
}
