'use client';

import { useState } from "react";
import ChatList from "@/components/messages/ChatList";
import ChatWindow from "@/components/messages/ChatWindow";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<any>(null);

  return (
    <div className="h-[calc(100vh-80px)] bg-white flex rounded-xl overflow-hidden mt-20 mx-4 shadow border">

      {/* Left Sidebar Chats */}
      <ChatList onSelect={setActiveChat} />

      {/* Right Chat Window */}
      <ChatWindow user={activeChat} />
    </div>
  );
}
