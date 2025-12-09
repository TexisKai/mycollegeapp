'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Home, User, Megaphone, Calendar, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Profile", icon: User, href: "/profile" },
    { name: "Notices", icon: Megaphone, href: "/notices" },
    { name: "Events", icon: Calendar, href: "/events" },
    { name: "Societies", icon: Users, href: "/societies" },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 shadow-sm fixed top-0 left-0 h-screen p-6">

      {/* Brand */}
      <div className="text-2xl font-extrabold tracking-tight mb-8 text-indigo-600">
        MyCollege
      </div>

      {/* Nav Menu */}
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${active 
                  ? "bg-indigo-600 text-white shadow" 
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          mt-auto flex items-center gap-3 px-4 py-3 rounded-xl 
          bg-red-50 text-red-600 hover:bg-red-100 transition
        "
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}
