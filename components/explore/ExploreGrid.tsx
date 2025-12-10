'use client';

import { avatarFor } from "@/lib/avatar";

export default function ExploreGrid({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl overflow-hidden shadow">
          <img src={avatarFor(item.name || `item-${i}`)} className="w-full h-40 object-cover" />
        </div>
      ))}
    </div>
  );
}
