'use client';

import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t p-3 flex items-center gap-3 bg-white">
      <input
        type="text"
        placeholder="Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded-xl bg-gray-100 border outline-none"
      />

      <button
        onClick={send}
        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
