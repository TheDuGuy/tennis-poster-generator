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

export default function Events2026Page() {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tennis-poster-events-2026');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved events', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever events change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tennis-poster-events-2026', JSON.stringify(events));
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
      {/* Control Bar - Hidden when printing */}
      <div className="no-print bg-primary-deep-green text-white p-4 shadow-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-montserrat">2026 Events Poster</h1>
            <p className="text-sm text-gray-200">Edit events then print when ready</p>
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

      {/* Editing Form - Hidden when not editing or printing */}
      {isEditing && (
        <div className="no-print container mx-auto px-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Events</h2>
              <div className="flex gap-2">
                <button
                  onClick={addEvent}
                  className="px-4 py-2 bg-primary-deep-green text-white rounded-lg hover:bg-primary-forest transition-colors"
                >
                  + Add Event
                </button>
                <button
                  onClick={resetToDefaults}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
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
                      <input
                        type="text"
                        value={event.day}
                        onChange={(e) => updateEvent(index, 'day', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Month</label>
                      <input
                        type="text"
                        value={event.month}
                        onChange={(e) => updateEvent(index, 'month', e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="MAR"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Weekday</label>
                      <input
                        type="text"
                        value={event.weekday}
                        onChange={(e) => updateEvent(index, 'weekday', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Sunday"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Time</label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => updateEvent(index, 'time', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="10:00 - 12:00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => updateEvent(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="American Tournament"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Note (optional)</label>
                      <input
                        type="text"
                        value={event.note || ''}
                        onChange={(e) => updateEvent(index, 'note', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="with Padel Section"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={event.highlight}
                        onChange={(e) => updateEvent(index, 'highlight', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-semibold">
                        Highlight (Yellow card for tournaments)
                      </span>
                    </label>
                    <button
                      onClick={() => removeEvent(index)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Tips:</strong> Changes auto-save. Click &quot;Preview Poster&quot; to see your changes, then &quot;Print Poster&quot; when ready.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Poster - Always visible, only shown when printing */}
      <div className={isEditing ? 'no-print' : 'print:block poster-container'}>
        <div className="w-[297mm] h-[210mm] mx-auto relative overflow-hidden poster-container">

      {/* Tennis Court Background - Bird's Eye View */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 297 210" preserveAspectRatio="xMidYMid slice">
        {/* Court Surface - Green */}
        <rect x="0" y="0" width="297" height="210" fill="#2D8B5E" />

        {/* Outer Boundary - Doubles */}
        <rect x="20" y="15" width="257" height="180" fill="none" stroke="white" strokeWidth="3" />

        {/* Singles Lines */}
        <line x1="45" y1="15" x2="45" y2="195" stroke="white" strokeWidth="2.5" />
        <line x1="252" y1="15" x2="252" y2="195" stroke="white" strokeWidth="2.5" />

        {/* Service Line */}
        <line x1="45" y1="75" x2="252" y2="75" stroke="white" strokeWidth="2.5" />
        <line x1="45" y1="135" x2="252" y2="135" stroke="white" strokeWidth="2.5" />

        {/* Center Service Line */}
        <line x1="148.5" y1="75" x2="148.5" y2="135" stroke="white" strokeWidth="2.5" />

        {/* Center Mark */}
        <line x1="148.5" y1="15" x2="148.5" y2="25" stroke="white" strokeWidth="2.5" />
        <line x1="148.5" y1="185" x2="148.5" y2="195" stroke="white" strokeWidth="2.5" />

        {/* Net Line */}
        <line x1="20" y1="105" x2="277" y2="105" stroke="white" strokeWidth="1.5" opacity="0.5" />
      </svg>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }} />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col p-6">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Logo */}
          <div className="mb-3 relative flex items-center justify-center">
            {/* White circle background */}
            <div
              className="absolute rounded-full"
              style={{
                width: '116px',
                height: '116px',
                backgroundColor: 'white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
            />
            {/* Logo on top */}
            <Image
              src="/assets/marden-logo.png"
              alt="Marden Tennis Club"
              width={110}
              height={110}
              className="relative z-10 rounded-full"
              style={{ background: 'transparent' }}
            />
          </div>

          {/* Title */}
          <div className="text-center relative">
            <h1
              className="text-6xl font-black uppercase tracking-tight leading-none"
              style={{ color: 'white', fontFamily: 'var(--font-montserrat)', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              Upcoming Events{' '}
              <span
                style={{
                  color: '#D0E04D',
                  textShadow: '0 4px 30px rgba(208, 224, 77, 0.4)'
                }}
              >
                2026
              </span>
            </h1>

            {/* Tennis Ball Bounce - Coming from "2026" */}
            <svg className="absolute left-full ml-2 -top-2 w-36 h-28" viewBox="0 0 130 100" style={{ opacity: 0.9 }}>
              {/* Trajectory line coming from 2026 text - touching the 6 */}
              <path
                d="M 2 18 Q 28 35, 45 72"
                stroke="white"
                strokeWidth="4"
                strokeDasharray="5,7"
                fill="none"
                opacity="0.85"
              />

              {/* Bounce mark at impact */}
              <ellipse cx="45" cy="74" rx="10" ry="3" fill="rgba(255,255,255,0.4)" />

              {/* Trajectory line bouncing up */}
              <path
                d="M 45 72 Q 62 52, 82 32"
                stroke="white"
                strokeWidth="4"
                strokeDasharray="5,7"
                fill="none"
                opacity="0.85"
              />

              {/* Tennis Ball - Bigger */}
              <g transform="translate(82, 32)">
                {/* Ball shadow */}
                <circle cx="2" cy="2" r="20" fill="rgba(0,0,0,0.3)" />
                {/* Ball base */}
                <circle cx="0" cy="0" r="20" fill="#D0E04D" />
                {/* Ball highlight */}
                <circle cx="-5" cy="-5" r="7" fill="rgba(255,255,255,0.4)" />
                {/* Tennis ball curved seam line 1 */}
                <path
                  d="M -14 -7 Q -10 0, -14 7"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.9"
                />
                {/* Tennis ball curved seam line 2 */}
                <path
                  d="M 14 -7 Q 10 0, 14 7"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.9"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Events Grid */}
        <div className="flex-1 grid grid-cols-4 gap-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="rounded-xl p-3 flex flex-col"
              style={{
                backgroundColor: event.highlight ? 'rgba(208, 224, 77, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              {/* Date */}
              <div className="text-center mb-2">
                <div
                  className="text-5xl font-black leading-none"
                  style={{ color: '#2D4A3E' }}
                >
                  {event.day}
                </div>
                <div
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: '#2D4A3E', opacity: 0.7 }}
                >
                  {event.month}
                </div>
              </div>

              {/* Divider */}
              <div className="w-12 h-1 mx-auto mb-2 rounded-full" style={{ backgroundColor: '#2D4A3E', opacity: 0.3 }} />

              {/* Event Details */}
              <div className="flex-1 text-center">
                <p
                  className="text-xs uppercase tracking-wider mb-1 font-semibold"
                  style={{ color: '#2D4A3E', opacity: 0.6 }}
                >
                  {event.weekday}
                </p>
                <h3
                  className="text-base font-extrabold leading-tight mb-1"
                  style={{ color: '#2D4A3E', fontFamily: 'var(--font-montserrat)' }}
                >
                  {event.title}
                </h3>
                <p
                  className="text-sm font-bold"
                  style={{ color: '#2D4A3E', opacity: 0.8 }}
                >
                  {event.time}
                </p>
                {event.note && (
                  <p
                    className="text-xs mt-2 font-bold px-2 py-1 rounded-full inline-block"
                    style={{ backgroundColor: '#2D4A3E', color: 'white' }}
                  >
                    {event.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div
            className="px-6 py-3 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          >
            <p className="text-sm font-bold" style={{ color: '#2D4A3E' }}>
              tennis@mardensportsclub.com
            </p>
          </div>

          <div className="text-center">
            <p
              className="text-2xl font-black uppercase tracking-widest"
              style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              All Welcome • All Levels
            </p>
          </div>

          <div
            className="px-6 py-3 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          >
            <p className="text-sm font-bold" style={{ color: '#2D4A3E' }}>
              mardensportsclub.com/tennis
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}
