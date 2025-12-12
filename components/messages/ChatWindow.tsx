'use client';

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: {
    full_name: string;
    profile_picture_url?: string;
  };
}

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
}

export default function ChatWindow({ conversationId, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/list?conversationId=${conversationId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content }),
      });

      if (res.ok) {
        fetchMessages(); // Refresh messages
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-lg mb-2">Select a conversation</div>
          <div className="text-sm">Choose a chat to start messaging</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-500 text-center">
              <div className="text-lg mb-2">No messages yet</div>
              <div className="text-sm">Start the conversation!</div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.content}
                isMine={message.sender_id === currentUserId}
                timestamp={message.created_at}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <MessageInput onSend={sendMessage} disabled={sending} />
    </div>
  );
}
