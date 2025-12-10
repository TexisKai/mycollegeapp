'use client';

export default function ProfileInfo({
  bio,
  college,
  course,
  year,
}: {
  bio: string;
  college: string;
  course: string;
  year: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>

      <p className="text-gray-700 mb-4">{bio || "No bio added yet."}</p>

      <div className="space-y-2 text-sm">
        <p><strong>College:</strong> {college}</p>
        <p><strong>Course:</strong> {course}</p>
        <p><strong>Year:</strong> {year}</p>
      </div>
    </div>
  );
}
