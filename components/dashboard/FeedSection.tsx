'use client';

import { useEffect, useState } from "react";
import StoriesCarousel from "./StoriesCarousel";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import SkeletonPost from "./SkeletonPost";
import { supabase } from "@/lib/supabase-browser";

interface FeedUser {
  id: string;
  full_name: string | null;
  profile_picture_url: string | null;
}

export interface FeedPost {
  id: string;
  content: string | null;
  media_urls: string[] | null;
  created_at: string;
  user: FeedUser;    // FIXED: must be singular
}

export default function FeedSection() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    async function loadFeed() {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          content,
          media_urls,
          created_at,
          users:user_id (
            id,
            full_name,
            profile_picture_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Feed error:", error);
        setLoading(false);
        return;
      }

      // 🛠 FIX: Normalize user array → single object
      const normalized = (data || []).map((p: any) => {
        const userObj = Array.isArray(p.users) ? p.users[0] : p.users;

        return {
          id: p.id,
          content: p.content,
          media_urls: p.media_urls,
          created_at: p.created_at,
          user: {
            id: userObj?.id || "",
            full_name: userObj?.full_name || "Student",
            profile_picture_url: userObj?.profile_picture_url || null,
          }
        } as FeedPost;
      });

      setPosts(normalized);
      setLoading(false);
    }

    loadFeed();
  }, []);

  return (
    <div className="pb-20">

      <StoriesCarousel />
      <CreatePostCard />

      {/* Loading state */}
      {loading &&
        [1, 2, 3].map((i) => <SkeletonPost key={i} />)
      }

      {/* Posts */}
      {!loading &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}    // FIXED — now matching PostCard.tsx update
            userName={post.user.full_name || "Student"}
            userAvatar={post.user.profile_picture_url || "/default-avatar.png"}
            content={post.content}
            image={post.media_urls?.[0] || null}
            timestamp={new Date(post.created_at).toLocaleString()}
          />
        ))
      }
    </div>
  );
}
