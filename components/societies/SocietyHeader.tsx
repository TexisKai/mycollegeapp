'use client';

import { avatarFor } from "@/lib/avatar";

export default function SocietyHeader({ name, logo, category }: any) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img src={logo || avatarFor(name)} className="w-20 h-20 rounded-xl object-cover" />
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-indigo-600">{category}</p>
      </div>
    </div>
  );
}
