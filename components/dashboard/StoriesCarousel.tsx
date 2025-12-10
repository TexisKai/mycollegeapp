'use client';

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

const sampleStories = [
  { name: "Enactus" },
  { name: "Dramatics" },
  { name: "NSS DU" },
  { name: "Tech Club" },
  { name: "Music Club" },
  { name: "Fashion" },
];

export default function StoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full mb-6">

      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        className="
          absolute left-0 top-1/2 -translate-y-1/2 
          bg-white shadow-lg 
          p-2 rounded-full z-10
          hidden md:flex
        "
      >
        <ChevronLeft size={20} />
      </button>

      {/* Stories List */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto px-2 py-3 scrollbar-hide
        "
      >
        {sampleStories.map((story, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="
              w-16 h-16 rounded-full p-1
              bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
              group-hover:scale-105 transition
            ">
              <img
                src={avatarFor(story.name)}
                className="
                  w-full h-full object-cover rounded-full border-2 border-white
                "
              />
            </div>

            <p className="text-xs text-gray-600">{story.name}</p>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        className="
          absolute right-0 top-1/2 -translate-y-1/2 
          bg-white shadow-lg 
          p-2 rounded-full z-10
          hidden md:flex
        "
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
