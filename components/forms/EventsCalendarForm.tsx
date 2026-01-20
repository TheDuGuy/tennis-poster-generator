'use client';

import { useState } from 'react';
import type { EventsCalendarData, Event, EventType } from '@/lib/schemas/events-calendar.schema';
import { eventTypeColors } from '@/lib/constants/colors';

interface EventsCalendarFormProps {
  data: EventsCalendarData;
  onChange: (data: EventsCalendarData) => void;
}

export default function EventsCalendarForm({ data, onChange }: EventsCalendarFormProps) {
  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: '',
      title: '',
      description: '',
      type: 'social',
    };
    onChange({ ...data, events: [...data.events, newEvent] });
  };

  const removeEvent = (id: string) => {
    onChange({ ...data, events: data.events.filter(e => e.id !== id) });
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    onChange({
      ...data,
      events: data.events.map(e => e.id === id ? { ...e, ...updates } : e),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold font-montserrat text-primary-deep-green">
        Events Calendar Setup
      </h2>

      {/* Month Selection */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Month *
        </label>
        <input
          type="month"
          value={data.month}
          onChange={(e) => onChange({ ...data, month: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-deep-green focus:border-transparent"
          required
        />
      </div>

      {/* Club Info */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-lg font-semibold">Club Information</h3>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Club Website
          </label>
          <input
            type="url"
            value={data.clubWebsite || ''}
            onChange={(e) => onChange({ ...data, clubWebsite: e.target.value })}
            placeholder="https://mardentennis.club"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-deep-green focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={data.contactEmail || ''}
            onChange={(e) => onChange({ ...data, contactEmail: e.target.value })}
            placeholder="info@mardentennis.club"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-deep-green focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={data.contactPhone || ''}
            onChange={(e) => onChange({ ...data, contactPhone: e.target.value })}
            placeholder="01234 567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-deep-green focus:border-transparent"
          />
        </div>
      </div>

      {/* Events */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Events ({data.events.length}/10)</h3>
          <button
            onClick={addEvent}
            disabled={data.events.length >= 10}
            className="px-4 py-2 bg-primary-deep-green text-white rounded-md hover:bg-primary-forest disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            + Add Event
          </button>
        </div>

        {data.events.map((event, index) => (
          <div key={event.id} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-neutral-warm-white">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">Event {index + 1}</h4>
              <button
                onClick={() => removeEvent(event.id)}
                className="text-red-600 hover:text-red-800 text-sm font-semibold"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">Date *</label>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Time</label>
                <input
                  type="time"
                  value={event.time || ''}
                  onChange={(e) => updateEvent(event.id, { time: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Title *</label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                placeholder="Summer Social Evening"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                value={event.description || ''}
                onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                placeholder="Bring your racket and friends!"
                rows={2}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Event Type *</label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(eventTypeColors).map(([type, color]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateEvent(event.id, { type: type as EventType })}
                    className={`
                      px-3 py-1 rounded-full text-sm font-semibold capitalize
                      ${event.type === type ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                    `}
                    style={{
                      backgroundColor: color,
                      color: 'white',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
