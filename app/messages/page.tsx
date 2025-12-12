'use client';

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ChatList from "@/components/messages/ChatList";
import ChatWindow from "@/components/messages/ChatWindow";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const { user } = useAuth();

  return (
    <div className="h-[calc(100vh-80px)] bg-white flex rounded-xl overflow-hidden mt-20 mx-4 shadow border">
      {/* Left Sidebar Chats */}
      <ChatList 
        onSelectConversation={setSelectedConversationId}
        selectedId={selectedConversationId}
      />

      {/* Right Chat Window */}
      <ChatWindow 
        conversationId={selectedConversationId}
        currentUserId={user?.id || ""}
      />
    </div>
  );
}
