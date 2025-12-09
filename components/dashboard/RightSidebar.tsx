'use client';

import { Calendar, Users, TrendingUp } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside 
      className="
        hidden lg:flex flex-col 
        w-72 h-[calc(100vh-4rem)]
        fixed right-0 top-[4rem]
        px-6 py-6 
        bg-white/70 backdrop-blur-xl 
        border-l border-gray-200
        overflow-y-auto
      "
    >
      {/* Suggested Events */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Calendar size={18} className="text-indigo-600" />
          Upcoming Events
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="font-semibold text-indigo-700">TEDx DU</p>
            <p className="text-sm text-gray-500">12 Jan • Convention Centre</p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="font-semibold text-indigo-700">Debate Championship</p>
            <p className="text-sm text-gray-500">18 Jan • Arts Faculty</p>
          </div>
        </div>
      </div>

      {/* Trending Societies */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <TrendingUp size={18} className="text-indigo-600" />
          Trending Societies
        </h2>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white border shadow-sm">
            <p className="font-semibold text-gray-800">Enactus</p>
            <p className="text-sm text-gray-500">Project updates, new recruits</p>
          </div>

          <div className="p-3 rounded-xl bg-white border shadow-sm">
            <p className="font-semibold text-gray-800">Dramatics Club</p>
            <p className="text-sm text-gray-500">Auditions next week</p>
          </div>
        </div>
      </div>

      {/* People to Follow */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <Users size={18} className="text-indigo-600" />
          People You May Know
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full border" />
            <div>
              <p className="font-semibold text-gray-800">Aditi Sharma</p>
              <p className="text-xs text-gray-500">B.Com • 2nd Year</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img src="/default-avatar.png" className="w-10 h-10 rounded-full border" />
            <div>
              <p className="font-semibold text-gray-800">Rohan Gupta</p>
              <p className="text-xs text-gray-500">Eco • 3rd Year</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
