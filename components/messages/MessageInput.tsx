'use client';

import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend, disabled }: { onSend: (msg: string) => void; disabled?: boolean }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t p-3 flex items-center gap-3 bg-white">
      <textarea
        placeholder="Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 p-3 rounded-xl bg-gray-100 border outline-none resize-none min-h-[48px] max-h-[120px] disabled:opacity-50"
        rows={1}
      />

      <button
        onClick={send}
        disabled={!text.trim() || disabled}
        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
