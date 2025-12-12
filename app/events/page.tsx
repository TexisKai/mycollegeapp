export const dynamic = "force-dynamic";
export const revalidate = 0;

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import EventList from "@/components/events/EventList";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [societyFilter, setSocietyFilter] = useState('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events/list');
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    let dateMatch = true;
    if (filter === 'today') {
      dateMatch = eventDate.toDateString() === now.toDateString();
    } else if (filter === 'week') {
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      dateMatch = eventDate >= now && eventDate <= weekFromNow;
    }
    
    const societyMatch = societyFilter === 'all' || event.society === societyFilter;
    
    return dateMatch && societyMatch;
  });

  const societies = [...new Set(events.map(e => e.society))];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Events</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time Filter</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All Events</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Society</label>
              <select 
                value={societyFilter} 
                onChange={(e) => setSocietyFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All Societies</option>
                {societies.map(society => (
                  <option key={society} value={society}>{society}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <EventList events={filteredEvents} />
        )}
      </div>
    </div>
  );
}
