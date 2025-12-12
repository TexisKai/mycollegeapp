'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/dashboard/PostCard';

type SavedPost = {
  id: string;
  posts: {
    id: string;
    content: string;
    media_urls: string[];
    created_at: string;
    users: {
      id: string;
      full_name: string;
      profile_picture_url: string;
    };
  };
};

export default function SavedPostsList() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedPosts() {
      try {
        const res = await fetch('/api/posts/save/list');
        const data = await res.json();
        setSavedPosts(data.savedPosts || []);
      } catch (error) {
        console.error('Failed to fetch saved posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No saved posts yet</div>
        <div className="text-gray-400 text-sm">Posts you save will appear here</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {savedPosts.map((savedPost) => (
        <PostCard
          key={savedPost.posts.id}
          postId={savedPost.posts.id}
          userName={savedPost.posts.users.full_name}
          userAvatar={savedPost.posts.users.profile_picture_url}
          content={savedPost.posts.content}
          image={savedPost.posts.media_urls?.[0]}
          timestamp={new Date(savedPost.posts.created_at).toLocaleDateString()}
        />
      ))}
    </div>
  );
}