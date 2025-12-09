'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  MessageCircle,
  User,
  MoreHorizontal,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Feed", href: "/dashboard", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Clubs", href: "/clubs", icon: Users },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="
      hidden md:flex flex-col 
      w-64 h-[calc(100vh-4rem)] 
      fixed left-0 top-[4rem] 
      border-r border-gray-200 
      bg-white/70 backdrop-blur-xl
      pt-8 px-6
    ">
      <nav className="flex flex-col gap-4">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl 
                text-gray-700 transition-all
                ${active 
                  ? "bg-indigo-600 text-white shadow-lg" 
                  : "hover:bg-indigo-50 hover:text-indigo-600"}
              `}
            >
              <Icon size={22} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* More (Optional) */}
        <button
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl 
                     text-gray-600 hover:bg-gray-100 transition"
        >
          <MoreHorizontal size={22} />
          <span className="font-medium">More</span>
        </button>
      </nav>
    </aside>
  );
}
