'use client';

import { useState } from "react";
import { avatarFor } from "@/lib/avatar";

export default function ChatList({ onSelect }: { onSelect: (user: any) => void }) {
  const [search, setSearch] = useState("");

  const mockChats = [
    { id: 1, name: "Aditi Sharma", lastMessage: "Hey, what's up?" },
    { id: 2, name: "Rohan Gupta", lastMessage: "Let's meet tomorrow." },
    { id: 3, name: "Enactus DU", lastMessage: "Meeting at 4 PM today!" },
    { id: 4, name: "Dramatics Club", lastMessage: "Practice session confirmed." },
  ];

  const filtered = mockChats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white h-full overflow-y-auto">

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded-xl bg-gray-100 border outline-none"
        />
      </div>

      {/* Chat Items */}
      {filtered.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat)}
          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition text-left"
        >
          <img
            src={avatarFor(chat.name)}
            className="w-12 h-12 rounded-full"
          />

          <div className="flex-1">
            <p className="font-medium text-gray-800">{chat.name}</p>
            <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
