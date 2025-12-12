'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { X, Send } from "lucide-react";

export default function CommentModal({ postId, onClose }: { postId: string; onClose: () => void }) {
  const [comments, setComments] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function loadComments() {
    const { data } = await supabase
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

    setComments(data || []);
  }

  async function handleSend() {
    if (!input.trim()) return;

    await fetch("/api/posts/comment", {
      method: "POST",
      body: JSON.stringify({ post_id: postId, content: input }),
    });

    setInput("");
    loadComments();
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-end md:items-center p-3 z-50">

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-4 relative">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {/* Comment List */}
        <div className="max-h-80 overflow-y-auto space-y-3 mb-4 pr-1">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <img
                src={c.users?.profile_picture_url || "/default-avatar.png"}
                className="w-8 h-8 rounded-full border"
              />
              <div>
                <p className="text-sm font-medium">{c.users?.full_name}</p>
                <p className="text-sm text-gray-700">{c.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 border-t pt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 p-2 rounded-xl outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-700"
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
