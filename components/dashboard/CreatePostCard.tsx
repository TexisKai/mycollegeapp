'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Image, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function CreatePostCard() {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);

  const handleImageUpload = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handlePost = async () => {
    if (!content && !file) return;

    setPosting(true);

    let imageUrl: string | null = null;

    if (file) {
      const fileName = `${user?.id}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from("posts")
        .upload(fileName, file);

      if (!error) {
        const publicUrl = supabase.storage.from("posts").getPublicUrl(fileName)
          .data.publicUrl;

        imageUrl = publicUrl;
      }
    }

    const { error } = await supabase.from("posts").insert({
      user_id: user?.id,
      content: content || null,
      image_url: imageUrl,
    });

    if (!error) {
      setContent("");
      setImagePreview(null);
      setFile(null);
    }

    setPosting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border p-4 mb-6">

      {/* Top Row */}
      <div className="flex items-start gap-3">
        
        <img
          src={avatarFor(user?.email || "user")}
          className="w-11 h-11 rounded-full object-cover border"
        />

        <textarea
          placeholder="Share something with the campus..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            w-full resize-none bg-gray-100 
            rounded-xl p-3 outline-none text-sm
            focus:bg-white focus:ring-2 ring-indigo-300
            transition
          "
          rows={2}
        ></textarea>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mt-3">
          <img
            src={imagePreview}
            className="w-full rounded-xl border"
          />
          <button
            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
            onClick={() => {
              setImagePreview(null);
              setFile(null);
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-3">
        <label
          className="
            flex items-center gap-2 text-indigo-600 
            cursor-pointer hover:text-indigo-700 transition
          "
        >
          <Image size={20} />
          <span className="text-sm font-medium">Add Photo</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        <button
          onClick={handlePost}
          disabled={posting || (!content && !file)}
          className="
            bg-indigo-600 text-white px-4 py-2 rounded-xl 
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-indigo-700 transition text-sm font-medium
          "
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>

    </div>
  );
}
