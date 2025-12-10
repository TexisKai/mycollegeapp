'use client';

import { Calendar, MapPin } from "lucide-react";

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

export default function EventCard({
  title,
  description,
  date,
  location,
  image,
}: {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-4 mb-6 hover:shadow-lg transition">
      <img
        src={image || avatarFor(title)}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>

      <div className="flex items-center gap-2 mt-4 text-gray-700 text-sm">
        <Calendar size={16} />
        {date}
      </div>

      <div className="flex items-center gap-2 mt-1 text-gray-700 text-sm">
        <MapPin size={16} />
        {location}
      </div>

      <button className="
        mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl 
        hover:bg-indigo-700 transition
      ">
        View Event
      </button>
    </div>
  );
}
