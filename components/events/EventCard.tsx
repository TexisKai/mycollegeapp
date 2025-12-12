'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import Link from 'next/link';

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  society,
  tags,
}: {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  society: string;
  tags: string[];
}) {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (registered || registering) return;

    setRegistering(true);
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: id }),
      });

      if (res.ok) {
        setRegistered(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setRegistering(false);
    }
  };
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/events/${id}`}>
      <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Calendar size={16} />
                {formatDate(date)}
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <Clock size={16} />
                {time}
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <MapPin size={16} />
                {location}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-indigo-600">{society}</div>
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={handleRegister}
          disabled={registered || registering}
          className={`w-full py-2 rounded-xl transition ${
            registered 
              ? 'bg-green-600 text-white cursor-default' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } disabled:opacity-50`}
        >
          {registering ? 'Registering...' : registered ? 'Registered ✓' : 'Register'}
        </button>
      </div>
    </Link>
  );
}
