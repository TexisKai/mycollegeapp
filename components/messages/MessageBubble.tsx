'use client';

export default function MessageBubble({
  message,
  isMine,
}: {
  message: string;
  isMine: boolean;
}) {
  return (
    <div
      className={`w-full flex mb-2 ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-xs px-4 py-2 rounded-2xl text-sm 
          ${isMine ? "bg-indigo-600 text-white rounded-br-none" 
                   : "bg-gray-200 text-gray-900 rounded-bl-none"}
        `}
      >
        {message}
      </div>
    </div>
  );
}
