'use client';

import NotificationItem from "./NotificationItem";

export default function NotificationList() {
  const notifications = [
    {
      type: "like",
      user: "Aditi Sharma",
      message: "liked your post.",
      time: "2m ago",
      unread: true,
    },
    {
      type: "comment",
      user: "Tech Society",
      message: "commented on your post.",
      time: "10m ago",
      unread: true,
    },
    {
      type: "follow",
      user: "Rohan Gupta",
      message: "started following you.",
      time: "1h ago",
      unread: false,
    },
    {
      type: "event",
      user: "Dramatics Club",
      message: "invited you to an event.",
      time: "3h ago",
      unread: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-20 pb-20 bg-white rounded-xl shadow border overflow-hidden">

      <h1 className="text-3xl font-bold text-gray-900 p-6 pb-2">
        Notifications 🔔
      </h1>

      <div>
        {notifications.map((n, i) => (
          <NotificationItem
            key={i}
            type={n.type}
            user={n.user}
            message={n.message}
            time={n.time}
            unread={n.unread}
          />
        ))}
      </div>
    </div>
  );
}
