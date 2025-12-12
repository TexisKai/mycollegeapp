'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  banner_image?: string;
  societies: {
    id: string;
    name: string;
    logo_url?: string;
  };
};

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    if (registered || registering) return;

    setRegistering(true);
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id }),
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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/events" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <ArrowLeft size={20} />
          Back to Events
        </Link>

        {/* Event Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {event.banner_image && (
            <img 
              src={event.banner_image} 
              alt={event.title}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={event.societies.logo_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${event.societies.name}`}
                    alt={event.societies.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-lg font-medium text-indigo-600">{event.societies.name}</span>
                </div>
              </div>
              
              <button 
                onClick={handleRegister}
                disabled={registered || registering}
                className={`px-8 py-3 rounded-xl font-medium transition ${
                  registered 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } disabled:opacity-50`}
              >
                {registering ? 'Registering...' : registered ? 'Registered ✓' : 'Register Now'}
              </button>
            </div>

            {/* Event Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-600" size={20} />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-gray-600">{formatDate(event.date)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-600" size={20} />
                <div>
                  <div className="font-medium">Time</div>
                  <div className="text-gray-600">{event.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-600" size={20} />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-600">{event.location}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}