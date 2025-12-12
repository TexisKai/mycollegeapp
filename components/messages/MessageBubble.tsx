'use client';

export default function MessageBubble({
  message,
  isMine,
  timestamp,
}: {
  message: string;
  isMine: boolean;
  timestamp?: string;
}) {
  return (
    <div
      className={`w-full flex mb-2 ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-col">
        <div
          className={`
            max-w-xs px-4 py-2 rounded-2xl text-sm break-words
            ${isMine ? "bg-indigo-600 text-white rounded-br-none" 
                     : "bg-gray-200 text-gray-900 rounded-bl-none"}
          `}
        >
          {message}
        </div>
        {timestamp && (
          <div className={`text-xs text-gray-400 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}
