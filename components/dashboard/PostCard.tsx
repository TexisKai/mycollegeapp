'use client';

import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState, useRef } from "react";
import CommentsDrawer from './CommentsDrawer';

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function PostCard({
  postId,
  userName,
  userAvatar,
  content,
  image,
  timestamp,
  initialLikes = 0,
}: {
  postId: string;
  userName: string;
  userAvatar: string;
  content?: string | null;
  image?: string | null;
  timestamp: string;
  initialLikes?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [anim, setAnim] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const saveTimeout = useRef<any>(null);
  const tapTimeout = useRef<any>(null);
  const tapCount = useRef(0);

  // ------------------------------
  // LIGHT HAPTIC VIBRATION
  // ------------------------------
  const vibrate = (ms = 15) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  // ------------------------------
  // LIKE (single tap)
  // ------------------------------
  const toggleLike = async () => {
    vibrate(12);

    const next = !liked;
    setLiked(next);
    setLikesCount(prev => prev + (next ? 1 : -1));

    setAnim(true);
    setTimeout(() => setAnim(false), 300);

    // API CALL
    const res = await fetch("/api/posts/like", {
      method: "POST",
      body: JSON.stringify({ postId }),
    });

    const json = await res.json();
    if (json.likesCount !== undefined) {
      setLikesCount(json.likesCount);
      setLiked(json.liked);
    }
  };

  // ------------------------------
  // DOUBLE TAP LIKE (Instagram style)
  // ------------------------------
  const handleDoubleTap = () => {
    tapCount.current += 1;

    if (tapCount.current === 1) {
      tapTimeout.current = setTimeout(() => {
        tapCount.current = 0; // reset single tap
      }, 250);
    } else {
      clearTimeout(tapTimeout.current);
      tapCount.current = 0;
      toggleLike(); // LIKE on double tap ❤️
    }
  };

  // ------------------------------
  // LONG PRESS SAVE
  // ------------------------------
  const handleLongPressStart = () => {
    saveTimeout.current = setTimeout(() => {
      vibrate(20);
      toggleSave();
    }, 430);
  };

  const handleLongPressEnd = () => {
    clearTimeout(saveTimeout.current);
  };

  // ------------------------------
  // SAVE POST
  // ------------------------------
  const toggleSave = async () => {
    vibrate(15);
    setSaved(!saved);

    await fetch("/api/posts/save", {
      method: "POST",
      body: JSON.stringify({ postId }),
    });
  };

  // ------------------------------
  // SHARE POST
  // ------------------------------
  const handleShare = () => {
    vibrate(10);
    const url = `${window.location.origin}/post/${postId}`;

    if (navigator.share) {
      navigator.share({
        title: "MyCollege Post",
        text: "Check this out!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Copied post link!");
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md border p-4 mb-6 select-none"
    >

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userAvatar || avatarFor(userName)}
          className="w-11 h-11 rounded-full border cursor-pointer hover:scale-105 transition"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-900 text-sm">{userName}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
      </div>

      {/* CONTENT TEXT */}
      {content && (
        <p className="mb-3 whitespace-pre-line text-gray-800 text-[15px]">
          {content}
        </p>
      )}

      {/* POST IMAGE */}
      {image && (
        <div
          onClick={handleDoubleTap}
          className="relative overflow-hidden rounded-xl"
        >
          <img
            src={image}
            onLoad={() => setImageLoaded(true)}
            className={`w-full rounded-xl border transition-all duration-500 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />

          {/* DOUBLE TAP HEART ANIMATION */}
          {anim && (
            <Heart
              className="absolute inset-0 m-auto text-red-500 opacity-80 animate-ping-fast"
              size={90}
              fill="red"
            />
          )}
        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex items-center justify-between pt-3 border-t mt-3">

        {/* LEFT BUTTONS */}
        <div className="flex items-center gap-6">

          {/* LIKE BUTTON */}
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 transition ${
              liked ? "text-red-500" : "text-gray-600 hover:text-red-600"
            }`}
          >
            <Heart
              size={22}
              fill={liked ? "red" : "none"}
              className={anim ? "animate-like-bounce" : ""}
            />
            <span className="text-sm">{likesCount}</span>
          </button>

          {/* COMMENT BUTTON */}
          <button 
            onClick={() => setCommentsOpen(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
          >
            <MessageCircle size={22} />
            <span className="text-sm">Comment</span>
          </button>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-4">

          {/* SHARE */}
          <button
            onClick={handleShare}
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            <Share2 size={22} />
          </button>

          {/* SAVE */}
          <button
            onMouseDown={handleLongPressStart}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={handleLongPressStart}
            onTouchEnd={handleLongPressEnd}
            className={`transition ${
              saved ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            <Bookmark size={22} fill={saved ? "indigo" : "none"} />
          </button>
        </div>
      </div>

      {/* COMMENTS DRAWER */}
      <CommentsDrawer 
        postId={postId}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
      />
    </div>
  );
}
