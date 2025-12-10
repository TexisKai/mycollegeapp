'use client';

import { Users } from "lucide-react";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function SocietyCard({
  name,
  description,
  category,
  logo,
}: {
  name: string;
  description: string;
  category: string;
  logo?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition cursor-pointer">

      <div className="flex items-center gap-4 mb-3">
        <img
          src={logo || avatarFor(name)}
          className="w-14 h-14 rounded-xl object-cover border"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 inline-block rounded-full">
            {category}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3">
        {description}
      </p>

      <button className="
        mt-4 w-full flex items-center justify-center gap-2 
        bg-indigo-600 text-white py-2 rounded-xl
        hover:bg-indigo-700 transition
      ">
        <Users size={16} />
        View Society
      </button>
    </div>
  );
}
