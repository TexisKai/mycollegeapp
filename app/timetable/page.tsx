'use client';

import TimetableGrid from "@/components/timetable/TimetableGrid";

export default function TimetablePage() {
  const mockSchedule = [
    { subject: "Economics", time: "10:00 AM" },
    { subject: "Political Science", time: "11:00 AM" },
    { subject: "Maths", time: "1:00 PM" },
    { subject: "English", time: "2:00 PM" },
    { subject: "History", time: "3:00 PM" },
    { subject: "Physics", time: "4:00 PM" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 pb-20">
      <h1 className="text-4xl font-bold mb-8">My Timetable 📚</h1>
      <TimetableGrid schedule={mockSchedule} />
    </div>
  );
}
