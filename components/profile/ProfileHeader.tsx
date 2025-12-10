'use client';

import { Pencil } from "lucide-react";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function ProfileHeader({
  name,
  avatar,
  onEdit,
}: {
  name: string;
  avatar: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-6 mb-10">

      {/* Avatar with DU gradient ring */}
      <div
        className="
          w-[110px] h-[110px] rounded-full p-[3px]
          bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
          shadow-lg
        "
      >
        <img
          src={avatarFor(name)}
          className="
            w-full h-full rounded-full 
            object-cover border-4 border-white 
            transition-all duration-200 hover:scale-[1.02]
          "
          alt="Profile picture"
        />
      </div>

      {/* Name + button */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">@mycollege</p>
        </div>

        <button
          onClick={onEdit}
          className="
            flex items-center gap-2 
            px-5 py-2 rounded-xl 
            bg-indigo-600 text-white 
            text-sm font-medium 
            shadow hover:bg-indigo-700 
            active:scale-[0.97] 
            transition-all
          "
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
