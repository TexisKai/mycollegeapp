'use client';

import { Heart, MessageCircle } from "lucide-react";

export default function PostCard({
  userName = "Anonymous Student",
  userAvatar = "/default-avatar.png",
  content,
  image,
  timestamp = "Just now",
}: {
  userName?: string;
  userAvatar?: string;
  content?: string | null;
  image?: string | null;
  timestamp?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-4 mb-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userAvatar}
          className="w-10 h-10 rounded-full border object-cover"
        />

        <div>
          <p className="font-semibold text-gray-800">{userName}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      {content && (
        <p className="text-gray-800 mb-3 whitespace-pre-line">{content}</p>
      )}

      {/* Image */}
      {image && (
        <div className="mb-3">
          <img
            src={image}
            className="w-full rounded-xl border object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 mt-2 pt-3 border-t">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
          <Heart size={20} />
          <span>Like</span>
        </button>

        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
}
