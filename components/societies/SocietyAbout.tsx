'use client';

export default function SocietyAbout({ about }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">About</h2>
      <p className="text-gray-600">{about}</p>
    </div>
  );
}
