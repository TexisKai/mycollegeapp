'use client';

import { useEffect, useState } from 'react';

type Comment = {
  id: string;
  content: string;
  created_at: string;
  users?: {
    id?: string;
    full_name?: string | null;
    profile_picture_url?: string | null;
  } | null;
};

export function usePostComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = async () => {
    if (!postId) return;
    
    setIsLoading(true);
    setIsError(false);
    
    try {
      const res = await fetch(`/api/comments/list?postId=${encodeURIComponent(postId)}`);
      const json = await res.json();
      setComments(Array.isArray(json.comments) ? json.comments : []);
    } catch (err) {
      setIsError(true);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [postId]);

  return { comments, isLoading, isError, refetch, setComments };
}