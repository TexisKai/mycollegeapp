import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();

    // Validate auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Read incoming file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowed = ["image/", "video/"];
    if (!allowed.some((type) => file.type.startsWith(type))) {
      return NextResponse.json(
        { error: "Only images & videos are allowed" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${user.id}-${Date.now()}.${ext}`;
    const storagePath = `${user.id}/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("stories")
      .upload(storagePath, file, {
        upsert: false, // safer — prevents accidental overwrites
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Generate public URL
    const { data: publicUrlData } = supabase.storage
      .from("stories")
      .getPublicUrl(storagePath);

    const mediaUrl = publicUrlData.publicUrl;

    // Insert story record
    const expiresIn = 24 * 60 * 60 * 1000; // 24 hours
    const expiresAt = new Date(Date.now() + expiresIn).toISOString();

    const { data: insertedStory, error: storyError } = await supabase
      .from("stories")
      .insert({
        user_id: user.id,
        media_url: mediaUrl,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (storyError) {
      return NextResponse.json(
        { error: `DB insert failed: ${storyError.message}` },
        { status: 500 }
      );
    }

    // Return full story object for instant UI update
    return NextResponse.json({
      ok: true,
      story: {
        id: insertedStory.id,
        media_url: mediaUrl,
        expires_at: expiresAt,
        user: {
          id: user.id,
          full_name: user.user_metadata?.full_name || "You",
          profile_picture_url: mediaUrl,
        },
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Unexpected server error",
        detail: err.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
