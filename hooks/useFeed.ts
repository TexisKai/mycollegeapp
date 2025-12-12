'use client';

import { useEffect, useState } from "react";

export function useFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);

        const res = await fetch("/api/posts/feed");
        const json = await res.json();

        if (json.error) {
          setError(json.error);
        } else {
          setPosts(json.posts || []);
        }
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    }

    loadFeed();
  }, []);

  return { posts, loading, error };
}
