'use client';
import React from 'react';
import { DU_COLLEGES, DU_COURSES, YEAR_OPTIONS } from '@/lib/du-data';

export default function Step1({ data, updateData }: any) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Academic details</h2>

      <label className="block text-sm font-medium mb-1">College</label>
      <select
        value={data.college || ''}
        onChange={(e) => updateData({ college: e.target.value })}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-200"
      >
        <option value="">Select your college</option>
        {DU_COLLEGES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="block text-sm font-medium mb-1">Course</label>
      <select
        value={data.course || ''}
        onChange={(e) => updateData({ course: e.target.value })}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-200"
      >
        <option value="">Select your course</option>
        {DU_COURSES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="block text-sm font-medium mb-1">Year</label>
      <select
        value={data.year || ''}
        onChange={(e) => updateData({ year: e.target.value })}
        className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-200"
      >
        <option value="">Select year</option>
        {YEAR_OPTIONS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
