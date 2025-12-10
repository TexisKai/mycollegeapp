'use client';

export default function SearchBar({ value, onChange }: any) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-xl bg-gray-100 border outline-none"
    />
  );
}
