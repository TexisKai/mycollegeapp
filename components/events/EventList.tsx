'use client';

import EventCard from "./EventCard";

export default function EventList() {
  const sampleEvents = [
    {
      title: "DU Fest 2025",
      description: "The biggest cultural fest across DU campuses!",
      date: "Jan 14, 2025",
      location: "North Campus Ground",
      image: "/default-avatar.png",
    },
    {
      title: "Tech Seminar",
      description: "Latest trends in AI, ML, and cloud computing.",
      date: "Jan 20, 2025",
      location: "Convention Centre",
    },
    {
      title: "Debate Championship",
      description: "Inter-college debate competition across DU.",
      date: "Jan 25, 2025",
      location: "Arts Faculty",
    },
  ];

  return (
    <div className="mt-20 max-w-2xl mx-auto pb-20 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Upcoming Events 🎉
      </h1>

      {sampleEvents.map((event, i) => (
        <EventCard
          key={i}
          title={event.title}
          description={event.description}
          date={event.date}
          location={event.location}
          image={event.image}
        />
      ))}
    </div>
  );
}
