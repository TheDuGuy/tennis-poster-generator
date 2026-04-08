'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import './print.css';

type Event = {
  day: string;
  month: string;
  weekday: string;
  title: string;
  time: string;
  note?: string;
  highlight: boolean;
};

const defaultEvents: Event[] = [
  { day: "8", month: "MAR", weekday: "Sunday", title: "American Tournament", time: "10:00 - 12:00", highlight: true },
  { day: "25", month: "APR", weekday: "Saturday", title: "Open Morning", time: "10:30 - 12:30", highlight: false },
  { day: "10", month: "MAY", weekday: "Sunday", title: "American Tournament + BBQ", time: "10:00 - 12:00", highlight: true },
  { day: "10", month: "JUN", weekday: "Wednesday", title: "AGM", time: "7:00pm start", highlight: false },
  { day: "12", month: "JUL", weekday: "Sunday", title: "American Tournament", time: "10:00 - 12:00", highlight: true },
  { day: "11", month: "SEP", weekday: "Friday", title: "Social Evening", time: "from 7:30pm", note: "Curry Night with Padel Section", highlight: false },
  { day: "20", month: "SEP", weekday: "Sunday", title: "American Tournament", time: "10:00 - 12:00", highlight: true },
  { day: "27", month: "NOV", weekday: "Friday", title: "Christmas Party", time: "from 7:30pm", note: "with Padel Section", highlight: false },
];

export default function Events2026PortraitPage() {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tennis-poster-events-2026-portrait');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved events', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tennis-poster-events-2026-portrait', JSON.stringify(events));
    }
  }, [events, isLoaded]);

  const updateEvent = (index: number, field: keyof Event, value: string | boolean) => {
    const newEvents = [...events];
    if (field === 'highlight') {
      newEvents[index][field] = value as boolean;
    } else {
      newEvents[index][field] = value as string;
    }
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([...events, { day: "1", month: "JAN", weekday: "Monday", title: "New Event", time: "10:00 - 12:00", highlight: false }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const resetToDefaults = () => {
    if (confirm('Reset all events to defaults? This cannot be undone.')) {
      setEvents(defaultEvents);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Control Bar */}
      <div className="no-print bg-primary-deep-green text-white p-4 shadow-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-montserrat">2026 Events Poster — Portrait</h1>
            <p className="text-sm text-gray-200">Edit events then print when ready (A4 Portrait)</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-white text-primary-deep-green font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isEditing ? 'Preview Poster' : 'Edit Events'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-semantic-tournament text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Print Poster
            </button>
          </div>
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <div className="no-print container mx-auto px-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Events</h2>
              <div className="flex gap-2">
                <button onClick={addEvent} className="px-4 py-2 bg-primary-deep-green text-white rounded-lg hover:bg-primary-forest transition-colors">
                  + Add Event
                </button>
                <button onClick={resetToDefaults} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  Reset to Defaults
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Day</label>
                      <input type="text" value={event.day} onChange={(e) => updateEvent(index, 'day', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="8" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Month</label>
                      <input type="text" value={event.month} onChange={(e) => updateEvent(index, 'month', e.target.value.toUpperCase())} className="w-full px-3 py-2 border rounded-lg" placeholder="MAR" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Weekday</label>
                      <input type="text" value={event.weekday} onChange={(e) => updateEvent(index, 'weekday', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Sunday" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Time</label>
                      <input type="text" value={event.time} onChange={(e) => updateEvent(index, 'time', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="10:00 - 12:00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Title</label>
                      <input type="text" value={event.title} onChange={(e) => updateEvent(index, 'title', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="American Tournament" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Note (optional)</label>
                      <input type="text" value={event.note || ''} onChange={(e) => updateEvent(index, 'note', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="with Padel Section" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={event.highlight} onChange={(e) => updateEvent(index, 'highlight', e.target.checked)} className="w-5 h-5" />
                      <span className="text-sm font-semibold">Highlight (Yellow card for tournaments)</span>
                    </label>
                    <button onClick={() => removeEvent(index)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Poster */}
      <div className={isEditing ? 'no-print' : 'print:block poster-container'}>
        <div className="w-[210mm] h-[297mm] mx-auto relative overflow-hidden poster-container">

          {/* Tennis Court Background — portrait orientation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 210 297" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="210" height="297" fill="#2D8B5E" />
            {/* Outer boundary */}
            <rect x="15" y="20" width="180" height="257" fill="none" stroke="white" strokeWidth="3" />
            {/* Singles sidelines */}
            <line x1="37" y1="20" x2="37" y2="277" stroke="white" strokeWidth="2.5" />
            <line x1="173" y1="20" x2="173" y2="277" stroke="white" strokeWidth="2.5" />
            {/* Service lines */}
            <line x1="37" y1="108" x2="173" y2="108" stroke="white" strokeWidth="2.5" />
            <line x1="37" y1="189" x2="173" y2="189" stroke="white" strokeWidth="2.5" />
            {/* Center service line */}
            <line x1="105" y1="108" x2="105" y2="189" stroke="white" strokeWidth="2.5" />
            {/* Center marks */}
            <line x1="105" y1="20" x2="105" y2="30" stroke="white" strokeWidth="2.5" />
            <line x1="105" y1="267" x2="105" y2="277" stroke="white" strokeWidth="2.5" />
            {/* Net */}
            <line x1="15" y1="148.5" x2="195" y2="148.5" stroke="white" strokeWidth="1.5" opacity="0.5" />
          </svg>

          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }} />

          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col p-7">

            {/* Header */}
            <div className="flex flex-col items-center mb-5">
              <div className="mb-3 relative flex items-center justify-center">
                <div className="absolute rounded-full" style={{ width: '96px', height: '96px', backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
                <Image src="/assets/marden-logo.png" alt="Marden Tennis Club" width={90} height={90} className="relative z-10 rounded-full" style={{ background: 'transparent' }} />
              </div>

              <div className="text-center relative">
                <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: '#D0E04D' }}>
                  Marden Tennis Club
                </p>
                <h1 className="text-5xl font-black uppercase tracking-tight leading-none" style={{ color: 'white', fontFamily: 'var(--font-montserrat)', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  Save the Date
                </h1>
                <p className="text-2xl font-black uppercase mt-1" style={{ color: '#D0E04D', textShadow: '0 4px 30px rgba(208, 224, 77, 0.4)', fontFamily: 'var(--font-montserrat)' }}>
                  2026 Events
                </p>

                {/* Tennis Ball */}
                <svg className="absolute left-full ml-1 -top-1 w-24 h-20" viewBox="0 0 100 80" style={{ opacity: 0.9 }}>
                  <path d="M 2 15 Q 20 28, 32 58" stroke="white" strokeWidth="3.5" strokeDasharray="5,7" fill="none" opacity="0.85" />
                  <ellipse cx="32" cy="60" rx="8" ry="2.5" fill="rgba(255,255,255,0.4)" />
                  <path d="M 32 58 Q 48 42, 64 24" stroke="white" strokeWidth="3.5" strokeDasharray="5,7" fill="none" opacity="0.85" />
                  <g transform="translate(64, 24)">
                    <circle cx="1.5" cy="1.5" r="14" fill="rgba(0,0,0,0.3)" />
                    <circle cx="0" cy="0" r="14" fill="#D0E04D" />
                    <circle cx="-3" cy="-3" r="5" fill="rgba(255,255,255,0.4)" />
                    <path d="M -10 -5 Q -7 0, -10 5" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
                    <path d="M 10 -5 Q 7 0, 10 5" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Events Grid — 2 columns × 4 rows */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="rounded-xl p-3 flex flex-col"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <div className="text-4xl font-black leading-none" style={{ color: '#2D4A3E' }}>
                      {event.day}
                    </div>
                    <div className="text-base font-bold uppercase tracking-wider" style={{ color: '#2D4A3E', opacity: 0.7 }}>
                      {event.month}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-10 h-0.5 mb-2 rounded-full" style={{ backgroundColor: '#2D4A3E', opacity: 0.3 }} />

                  {/* Event Details */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider mb-0.5 font-semibold" style={{ color: '#2D4A3E', opacity: 0.6 }}>
                      {event.weekday}
                    </p>
                    <h3 className="text-base font-extrabold leading-tight mb-1" style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}>
                      {event.title}
                    </h3>
                    <p className="text-sm font-bold" style={{ color: '#2D4A3E', opacity: 0.8 }}>
                      {event.time}
                    </p>
                    {event.note && (
                      <p className="text-xs mt-1.5 font-bold px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: '#2D4A3E', color: 'white' }}>
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>tennis@mardensportsclub.com</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black uppercase tracking-widest" style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  All Welcome
                </p>
              </div>
              <div className="px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <p className="text-xs font-bold" style={{ color: '#2D4A3E' }}>mardensportsclub.com/tennis</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
