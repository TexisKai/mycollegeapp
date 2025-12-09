'use client';
import React from 'react';

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="mb-6" aria-hidden>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-700">Step {current} of {total}</div>
        <div className="text-sm font-medium text-gray-700">{percent}%</div>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
