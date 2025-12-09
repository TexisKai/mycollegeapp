'use client';
import React, { useState } from 'react';
import { SKILLS } from '/Users/mac/Downloads/mycollege_ready/lib/du-data';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step4({ data, updateData }: StepProps) {
  const selected: string[] = data.skills || [];
  const [custom, setCustom] = useState('');

  const toggle = (s: string) => {
    updateData({
      skills: selected.includes(s)
        ? selected.filter((x) => x !== s)
        : [...selected, s],
    });
  };

  const addCustom = () => {
    const val = custom.trim();
    if (!val || selected.includes(val)) return;
    updateData({ skills: [...selected, val] });
    setCustom('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Skills 🛠️</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {SKILLS.map((s) => {
          const active = selected.includes(s.value);
          return (
            <button
              key={s.value}
              onClick={() => toggle(s.value)}
              className={`p-3 rounded-lg border ${
                active ? 'bg-emerald-600 text-white' : 'bg-white'
              }`}
            >
              {s.emoji} {s.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Add a custom skill ✏️"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addCustom}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
