'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Image, X, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function CreatePostCard({ onPostCreated }: { onPostCreated?: () => void }) {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle image selection
  // -----------------------------
  const handleImageSelect = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    // Preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  // -----------------------------
  // Upload file to supabase bucket
  // -----------------------------
  async function uploadToBucket(file: File) {
    const filePath = `posts/${user?.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, file, {
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      alert("Failed to upload image. Check storage policies.");
      return null;
    }

    // Get public URL
    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);

    return data.publicUrl;
  }

  // -----------------------------
  // Handle Post Submission
  // -----------------------------
  const handlePost = async () => {
    if (!content.trim() && !file) return;
    if (!user) return alert("You must be logged in.");

    setLoading(true);

    let imageUrl: string | null = null;

    if (file) {
      imageUrl = await uploadToBucket(file);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      content: content.trim() || null,
      media_urls: imageUrl ? [imageUrl] : null,
    });

    if (error) {
      console.error("Post insert failed:", error);
      alert("Post failed. Check console.");
    } else {
      // Reset UI
      setContent("");
      setImagePreview(null);
      setFile(null);

      // Refresh feed without reload
      onPostCreated?.();
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-5 mb-6 transition-all hover:shadow-lg">

      {/* TOP SECTION */}
      <div className="flex gap-3 items-start">
        <img
          src={avatarFor(user?.email || "user")}
          className="w-11 h-11 rounded-full border object-cover"
        />

        <textarea
          placeholder="Share something with the campus..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className="
            w-full bg-gray-100 rounded-xl p-3 text-sm resize-none
            focus:ring-2 focus:ring-indigo-300 focus:bg-white outline-none
            transition
          "
        />
      </div>

      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <div className="relative mt-3">
          <img
            src={imagePreview}
            className="rounded-xl border w-full object-cover"
          />

          {/* Close Button */}
          <button
            onClick={() => {
              setImagePreview(null);
              setFile(null);
            }}
            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="mt-4 flex justify-between items-center">

        <label
          className="flex items-center gap-2 cursor-pointer text-indigo-600 hover:text-indigo-700 transition"
        >
          <Image size={20} />
          <span className="text-sm font-medium">Add Photo</span>
          <input type="file" className="hidden" onChange={handleImageSelect} />
        </label>

        <button
          onClick={handlePost}
          disabled={loading || (!content.trim() && !file)}
          className="
            bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium
            hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2 transition
          "
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

    </div>
  );
}
