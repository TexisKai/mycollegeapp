'use client';

import EventCard from "./EventCard";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  society: string;
  tags: string[];
};

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No events found</div>
        <div className="text-gray-400 text-sm">Try adjusting your filters</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
          society={event.society}
          tags={event.tags}
        />
      ))}
    </div>
  );
}
