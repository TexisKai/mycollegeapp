'use client';

import { Bell, MessageCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string>("/default-avatar.png");
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Load profile picture
  useEffect(() => {
    async function loadPic() {
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("profile_picture_url")
        .eq("id", user.id)
        .maybeSingle();

      if (data?.profile_picture_url) {
        setProfilePic(data.profile_picture_url);
      }
    }
    loadPic();
  }, [user]);


  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth");
  }

  return (
    <header
      className="
        fixed top-0 left-0 w-full h-16 z-50
        bg-white/50 backdrop-blur-xl
        border-b border-gray-200
        flex items-center justify-between px-6
      "
    >
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard")}
        className="text-2xl font-extrabold cursor-pointer text-indigo-600"
      >
        MyCollege
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <input
          type="text"
          placeholder="Search colleges, societies, people..."
          className="
            w-full max-w-lg px-4 py-2 rounded-xl 
            bg-gray-100 focus:bg-white shadow 
            outline-none border border-gray-200 
            focus:border-indigo-500 transition
          "
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">
        <button className="hover:text-indigo-600 transition">
          <Bell size={22} />
        </button>

        <button className="hover:text-indigo-600 transition">
          <MessageCircle size={22} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2"
          >
            <img
              src={profilePic}
              className="w-9 h-9 rounded-full object-cover border"
            />
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {openMenu && (
            <div
              className="
                absolute right-0 mt-3 w-44 
                bg-white shadow-xl rounded-xl p-2 
                border border-gray-200
              "
            >
              <button
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => router.push("/profile")}
              >
                Profile
              </button>

              <button
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => router.push("/settings")}
              >
                Settings
              </button>

              <button
                className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
