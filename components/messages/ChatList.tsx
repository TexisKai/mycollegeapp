'use client';

import { useState, useEffect } from "react";

interface Conversation {
  id: string;
  participant: {
    id: string;
    full_name: string;
    profile_picture_url?: string;
  };
  last_message?: {
    content: string;
    created_at: string;
  };
  unread_count?: number;
}

interface ChatListProps {
  onSelectConversation: (id: string) => void;
  selectedId?: string;
}

export default function ChatList({ onSelectConversation, selectedId }: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/messages/conversations');
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.full_name.toLowerCase().includes(search.toLowerCase())
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

      {loading ? (
        <div className="p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <div className="text-lg mb-2">No conversations</div>
          <div className="text-sm">Start a new chat</div>
        </div>
      ) : (
        filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition ${
              selectedId === conv.id ? "bg-indigo-50 border-r-2 border-r-indigo-500" : ""
            }`}
          >
            <img 
              src={conv.participant.profile_picture_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${conv.participant.full_name}`}
              className="w-12 h-12 rounded-full object-cover"
              alt={conv.participant.full_name}
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm truncate">{conv.participant.full_name}</h4>
                {conv.last_message && (
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(conv.last_message.created_at)}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-600 truncate">
                  {conv.last_message?.content || 'No messages yet'}
                </p>
                {(conv.unread_count || 0) > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {conv.unread_count}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
