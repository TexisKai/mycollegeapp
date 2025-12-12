'use client';

import { useState } from 'react';

export function useCreateComment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (postId: string, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/comments/create', {
        method: 'POST',
        body: JSON.stringify({ postId, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Failed to create comment');
      }

      const result = await res.json();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createComment, isLoading, error };
}