'use client';

import { Heart, MessageCircle, Users, Calendar } from "lucide-react";
import { avatarFor } from "@/lib/avatar";

export default function NotificationItem({
  type,
  user,
  message,
  time,
  unread,
}: {
  type: string;
  user: string;
  message: string;
  time: string;
  unread: boolean;
}) {
  const icons: any = {
    like: <Heart size={18} className="text-red-500" />,
    comment: <MessageCircle size={18} className="text-blue-500" />,
    follow: <Users size={18} className="text-green-600" />,
    event: <Calendar size={18} className="text-indigo-600" />,
  };

  return (
    <div
      className={`
        flex items-center gap-4 p-4 border-b 
        ${unread ? "bg-indigo-50" : "bg-white"}
      `}
    >
      <img
        src={avatarFor(user)}
        className="w-12 h-12 rounded-full"
      />

      <div className="flex-1">
        <p className="text-gray-800 text-sm">
          <span className="font-semibold">{user}</span> {message}
        </p>
        <p className="text-gray-500 text-xs mt-1">{time}</p>
      </div>

      <div>{icons[type]}</div>
    </div>
  );
}
