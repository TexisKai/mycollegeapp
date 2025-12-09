'use client';

import { useEffect, useState } from "react";
import StoriesCarousel from "./StoriesCarousel";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import SkeletonPost from "./SkeletonPost";

// Later we will replace sample posts with Supabase data
const samplePosts = [
  {
    id: 1,
    userName: "Enactus DU",
    userAvatar: "/default-avatar.png",
    content: "Our new sustainable project is launching soon! 🌱✨",
    image: "/default-avatar.png",
    timestamp: "2 hrs ago",
  },
  {
    id: 2,
    userName: "Dramatics Club",
    userAvatar: "/default-avatar.png",
    content: "Auditions this Friday! 🎭🔥",
    image: null,
    timestamp: "5 hrs ago",
  },
];

export default function FeedSection() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {/* Stories */}
      <StoriesCarousel />

      {/* Create Post */}
      <CreatePostCard />

      {/* Loading Skeletons */}
      {loading &&
        [1, 2, 3].map((i) => <SkeletonPost key={i} />)
      }

      {/* Feed Posts */}
      {!loading &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            userName={post.userName}
            userAvatar={post.userAvatar}
            content={post.content}
            image={post.image}
            timestamp={post.timestamp}
          />
        ))
      }
    </div>
  );
}
