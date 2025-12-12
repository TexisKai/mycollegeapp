'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import StoryViewer from "./StoryViewer";
import StoriesUploader from "./StoriesUploader";

interface StoryUser {
  id: string;
  full_name: string | null;
  profile_picture_url: string | null;
}

interface Story {
  id: string;
  media_url: string;
  user: StoryUser;
}

export default function StoriesCarousel() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch('/api/stories/feed');
      const data = await res.json();
      setStories(data.stories || []);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchStories();
  };

  return (
    <>
      {/* STORY VIEWER MODAL */}
      {selectedStory && (
        <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}

      {/* STORIES UPLOADER */}
      {showUploader && (
        <StoriesUploader 
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setShowUploader(false)}
        />
      )}

      {/* STORIES LIST */}
      <div className="flex items-center gap-4 overflow-x-auto pb-3 mb-4 no-scrollbar">

        {/* ADD STORY BUTTON */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setShowUploader(true)}
        >
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border shadow-sm hover:bg-gray-300 transition">
            <Plus size={28} className="text-gray-600" />
          </div>
          <p className="text-xs mt-1 text-gray-700">Your Story</p>
        </div>

        {/* USER STORIES */}
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="w-12 h-2 bg-gray-200 rounded mt-1 animate-pulse" />
            </div>
          ))
        ) : (
          stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-yellow-500">
                <img
                  src={story.user.profile_picture_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${story.user.full_name}`}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                  alt={story.user.full_name || 'User'}
                />
              </div>
              <p className="text-xs mt-1 truncate max-w-[70px]">{story.user.full_name}</p>
            </div>
          ))
        )}

        {!loading && stories.length === 0 && (
          <div className="text-gray-500 text-sm ml-4">No stories yet</div>
        )}

      </div>
    </>
  );
}
