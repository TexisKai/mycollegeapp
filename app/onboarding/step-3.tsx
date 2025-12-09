'use client';
import React, { useState, useMemo } from 'react';
import { INTERESTS } from '/Users/mac/Downloads/mycollege_ready/lib/du-data';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step3({ data, updateData }: StepProps) {
  const selected: string[] = data.interests || [];
  const [filter, setFilter] = useState('');

  const filtered = useMemo(
    () =>
      INTERESTS.filter((i) =>
        i.label.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  const toggle = (value: string) => {
    const exists = selected.includes(value);
    updateData({
      interests: exists
        ? selected.filter((i) => i !== value)
        : [...selected, value],
    });
  };

  const relationship = [
    { label: 'Single 💫', value: 'single' },
    { label: 'In a Relationship ❤️', value: 'in_relationship' },
    { label: 'Complicated 😵‍💫', value: 'complicated' },
    { label: 'Prefer not to say 🙊', value: 'prefer_not_to_say' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Interests 💛</h2>

      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="Search interests 🔍"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {selected.map((s) => {
          const i = INTERESTS.find((x) => x.value === s);
          return (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm flex items-center gap-2"
            >
              {i?.emoji} {i?.label}
              <button onClick={() => toggle(s)}>✕</button>
            </span>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-auto">
        {filtered.map((i) => {
          const active = selected.includes(i.value);
          return (
            <button
              key={i.value}
              onClick={() => toggle(i.value)}
              className={`border p-3 rounded-lg text-left ${
                active ? 'bg-indigo-600 text-white' : 'bg-white'
              }`}
            >
              {i.emoji} {i.label}
            </button>
          );
        })}
      </div>

      {/* Bio */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Your Bio ✨</h3>
      <textarea
        rows={3}
        maxLength={150}
        value={data.bio || ''}
        onChange={(e) => updateData({ bio: e.target.value })}
        placeholder="Tell us about yourself (max 150 chars)"
        className="w-full p-3 border rounded mb-6"
      />

      {/* Relationship */}
      <h3 className="text-xl font-semibold mb-2">Relationship Status 💘</h3>
      <select
        value={data.relationship_status || ''}
        onChange={(e) => updateData({ relationship_status: e.target.value })}
        className="w-full p-3 border rounded"
      >
        <option value="">Select…</option>
        {relationship.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
