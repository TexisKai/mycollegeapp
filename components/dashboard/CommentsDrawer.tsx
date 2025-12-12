'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase-browser';
import { usePostComments } from '@/hooks/usePostComments';
import { useCreateComment } from '@/hooks/useCreateComment';

interface DrawerProps {
  postId: string;
  open: boolean;
  onClose: () => void;
}

type CommentRow = {
  id: string;
  content: string;
  created_at: string;
  user_id?: string;
  users?: {
    id?: string;
    full_name?: string | null;
    profile_picture_url?: string | null;
  } | null;
};

export default function CommentsDrawer({ postId, open, onClose }: DrawerProps) {
  const { comments, isLoading, isError, refetch, setComments } = usePostComments(postId);
  const { createComment, isLoading: isCreating, error: createError } = useCreateComment();
  const [content, setContent] = useState('');
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const commentsEndRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Auto-scroll to bottom when new comments are added
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  // Realtime subscription (non-async cleanup)
  useEffect(() => {
    if (!postId) return;

    // create channel (do not await subscribe)
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'post_comments', filter: `post_id=eq.${postId}` },
        (payload: any) => {
          // payload.new is the new row
          const newRow = payload?.new as CommentRow | undefined;
          if (newRow) {
            setComments(prev => [...prev, newRow]);
          }
        }
      );

    // subscribe (returns Promise) — call but don't await
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    channel.subscribe();

    // cleanup must be synchronous
    return () => {
      try {
        supabase.removeChannel(channel);
      } catch (err) {
        // fallback: try unsubscribe
        try {
          // channel.unsubscribe may exist
          // @ts-ignore
          channel.unsubscribe?.();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [postId]);

  // send comment
  async function sendComment() {
    if (!content.trim() || isCreating) return;
    
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content,
      created_at: new Date().toISOString(),
      users: { full_name: 'You', profile_picture_url: null }
    };
    
    // Optimistic update
    setComments(prev => [...prev, optimisticComment]);
    setContent('');
    
    try {
      await createComment(postId, content);
      // Remove optimistic comment and refetch to get real data
      setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
      refetch();
    } catch (err) {
      // Remove optimistic comment on error
      setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
      setContent(content); // Restore content
    }
  }

  // touch handlers for drag-to-close
  function onTouchStart(e: any) {
    startY.current = e.touches?.[0]?.clientY ?? 0;
  }

  function onTouchMove(e: any) {
    currentY.current = (e.touches?.[0]?.clientY ?? 0) - startY.current;
    if (currentY.current > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${currentY.current}px)`;
    }
  }

  function onTouchEnd() {
    if (currentY.current > 120) {
      onClose();
    } else if (drawerRef.current) {
      drawerRef.current.style.transform = 'translateY(0)';
    }
    currentY.current = 0;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl h-[75vh] flex flex-col transform transition-transform"
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h3 className="text-lg font-semibold">Comments</h3>
          <button onClick={onClose} aria-label="Close comments">
            <X size={20} />
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {isLoading && (
            <div className="text-center text-gray-500 text-sm">Loading comments...</div>
          )}
          
          {isError && (
            <div className="text-center text-red-500 text-sm">Failed to load comments</div>
          )}
          
          {!isLoading && !isError && comments.length === 0 && (
            <div className="text-center text-gray-500 text-sm">No comments yet — be the first ✨</div>
          )}

          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <img
                src={c.users?.profile_picture_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${c.users?.full_name || 'user'}`}
                className="w-9 h-9 rounded-full border object-cover"
                alt={c.users?.full_name ?? 'avatar'}
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-3 py-2 max-w-xs">
                  <p className="font-semibold text-sm">{c.users?.full_name ?? 'User'}</p>
                  <p className="text-gray-700 text-sm break-words">{c.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-3">
                  {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          {createError && (
            <div className="text-red-500 text-sm mb-2">{createError}</div>
          )}
          <div className="flex gap-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendComment();
                }
              }}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-100 px-3 py-2 rounded-xl outline-none resize-none min-h-[40px] max-h-[120px]"
              rows={1}
            />
            <button
              onClick={sendComment}
              disabled={!content.trim() || isCreating}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
