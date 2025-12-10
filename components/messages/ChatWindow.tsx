'use client';

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { avatarFor } from "@/lib/avatar";

export default function ChatWindow({ user }: { user: any }) {
  const [messages, setMessages] = useState([
    { fromMe: false, text: "Hey there!" },
    { fromMe: true, text: "Hello! How are you?" },
  ]);

  const sendMessage = (msg: string) => {
    setMessages([...messages, { fromMe: true, text: msg }]);
  };

  if (!user)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging.
      </div>
    );

  return (
    <div className="flex-1 flex flex-col">

      {/* Header */}
      <div className="border-b px-5 py-4 flex items-center gap-3 bg-white shadow-sm">
        <img
          src={avatarFor(user.name)}
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold text-gray-900">{user.name}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m.text} isMine={m.fromMe} />
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
