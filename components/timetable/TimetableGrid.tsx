'use client';

export default function TimetableGrid({ schedule }: any) {
  return (
    <div className="grid grid-cols-6 gap-4 bg-white p-4 rounded-xl shadow">
      {schedule.map((cell: any, idx: number) => (
        <div
          key={idx}
          className="border p-3 rounded-lg text-center bg-gray-50"
        >
          <p className="font-semibold">{cell.subject}</p>
          <p className="text-xs text-gray-500">{cell.time}</p>
        </div>
      ))}
    </div>
  );
}
