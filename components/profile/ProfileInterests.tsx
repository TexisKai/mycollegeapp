'use client';

export default function ProfileInterests({ interests }: { interests: string[] }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Interests</h2>

      {interests.length === 0 ? (
        <p className="text-gray-500 text-sm">No interests added.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {interests.map((item, idx) => (
            <span
              key={idx}
              className="
                px-4 py-2 rounded-xl 
                bg-indigo-50 text-indigo-600 
                text-sm font-medium
              "
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
