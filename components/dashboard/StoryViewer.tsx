'use client';

import { X } from "lucide-react";

export default function StoryViewer({
  story,
  onClose,
}: {
  story: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button className="absolute top-4 right-4 text-white" onClick={onClose}>
        <X size={30} />
      </button>

      <div className="max-w-md w-full px-4">
        <img
          src={story.media_url}
          className="w-full rounded-xl border shadow-lg object-contain max-h-[80vh]"
        />
        <p className="text-center mt-4 text-white text-lg font-semibold">
          {story.user.full_name}
        </p>
      </div>
    </div>
  );
}
