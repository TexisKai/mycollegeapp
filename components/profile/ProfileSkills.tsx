'use client';

export default function ProfileSkills({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills</h2>

      {skills.length === 0 ? (
        <p className="text-gray-500 text-sm">No skills added.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((item, idx) => (
            <span
              key={idx}
              className="
                px-4 py-2 rounded-xl 
                bg-green-50 text-green-700 
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
