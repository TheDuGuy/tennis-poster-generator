'use client';

import { useState } from 'react';
import type { EventsCalendarGridData, DayEvent, NoteItem } from '@/lib/schemas/events-calendar-grid.schema';
import { generateCalendarGrid, WEEKDAY_NAMES } from '@/lib/utils/calendar-helpers';

interface EventsCalendarGridFormProps {
  data: EventsCalendarGridData;
  onChange: (data: EventsCalendarGridData) => void;
}

export default function EventsCalendarGridForm({ data, onChange }: EventsCalendarGridFormProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const calendarGrid = generateCalendarGrid(data.year, data.month);

  const getEventsForDay = (day: number) => {
    const dayData = data.days.find(d => d.date === day);
    return dayData?.events || [];
  };

  const addEventToDay = (day: number) => {
    const existingDay = data.days.find(d => d.date === day);
    const newEvent: DayEvent = { title: '', time: '', type: 'other' };

    if (existingDay) {
      onChange({
        ...data,
        days: data.days.map(d =>
          d.date === day ? { ...d, events: [...d.events, newEvent] } : d
        ),
      });
    } else {
      onChange({
        ...data,
        days: [...data.days, { date: day, events: [newEvent] }].sort((a, b) => a.date - b.date),
      });
    }
  };

  const updateEvent = (day: number, eventIndex: number, updates: Partial<DayEvent>) => {
    onChange({
      ...data,
      days: data.days.map(d =>
        d.date === day
          ? {
              ...d,
              events: d.events.map((e, i) => (i === eventIndex ? { ...e, ...updates } : e)),
            }
          : d
      ),
    });
  };

  const removeEvent = (day: number, eventIndex: number) => {
    onChange({
      ...data,
      days: data.days.map(d =>
        d.date === day
          ? { ...d, events: d.events.filter((_, i) => i !== eventIndex) }
          : d
      ).filter(d => d.events.length > 0),
    });
  };

  const addNote = () => {
    onChange({
      ...data,
      notes: [...data.notes, { title: '', content: '' }],
    });
  };

  const updateNote = (index: number, updates: Partial<NoteItem>) => {
    onChange({
      ...data,
      notes: data.notes.map((n, i) => (i === index ? { ...n, ...updates } : n)),
    });
  };

  const removeNote = (index: number) => {
    onChange({
      ...data,
      notes: data.notes.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold font-montserrat text-primary-deep-green">
        Calendar Grid Setup
      </h2>

      {/* Month/Year Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Year</label>
          <input
            type="number"
            value={data.year}
            onChange={(e) => onChange({ ...data, year: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Month</label>
          <select
            value={data.month}
            onChange={(e) => onChange({ ...data, month: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-3 border-t pt-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="WHAT'S ON"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Club Name</label>
          <input
            type="text"
            value={data.clubName}
            onChange={(e) => onChange({ ...data, clubName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Header Info</label>
          <input
            type="text"
            value={data.headerInfo || ''}
            onChange={(e) => onChange({ ...data, headerInfo: e.target.value })}
            placeholder="Pricing & membership info: ..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Club Website</label>
          <input
            type="url"
            value={data.clubWebsite || ''}
            onChange={(e) => onChange({ ...data, clubWebsite: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Mini Calendar for selecting days */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Click a day to add/edit events</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {WEEKDAY_NAMES.map((day) => (
            <div key={day} className="text-center text-xs font-bold p-1 bg-gray-100">
              {day}
            </div>
          ))}
          {calendarGrid.flatMap((week) =>
            week.days.map((day, index) => (
              <button
                key={`${week}-${index}`}
                onClick={() => day && setSelectedDay(day)}
                disabled={!day}
                className={`
                  aspect-square p-1 text-xs border rounded
                  ${day ? 'hover:bg-primary-deep-green hover:text-white cursor-pointer' : 'bg-gray-50 cursor-default'}
                  ${selectedDay === day ? 'bg-primary-deep-green text-white' : ''}
                  ${day && getEventsForDay(day).length > 0 ? 'font-bold border-primary-deep-green' : 'border-gray-300'}
                `}
              >
                {day || ''}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Edit events for selected day */}
      {selectedDay && (
        <div className="border-t pt-4 bg-neutral-warm-white p-4 rounded">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
              Events for Day {selectedDay}
            </h3>
            <button
              onClick={() => addEventToDay(selectedDay)}
              className="px-3 py-1 bg-primary-deep-green text-white rounded text-sm"
            >
              + Add Event
            </button>
          </div>

          {getEventsForDay(selectedDay).map((event, eventIndex) => (
            <div key={eventIndex} className="mb-3 p-3 bg-white rounded border">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Event {eventIndex + 1}</span>
                <button
                  onClick={() => removeEvent(selectedDay, eventIndex)}
                  className="text-red-600 text-xs"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={event.time || ''}
                  onChange={(e) => updateEvent(selectedDay, eventIndex, { time: e.target.value })}
                  placeholder="Time (e.g., 10:00-12:00)"
                  className="w-full px-2 py-1 border rounded text-sm"
                />

                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => updateEvent(selectedDay, eventIndex, { title: e.target.value })}
                  placeholder="Event title"
                  className="w-full px-2 py-1 border rounded text-sm"
                />

                <select
                  value={event.type || 'other'}
                  onChange={(e) => updateEvent(selectedDay, eventIndex, { type: e.target.value as any })}
                  className="w-full px-2 py-1 border rounded text-sm"
                >
                  <option value="tournament">Tournament</option>
                  <option value="social">Social</option>
                  <option value="meeting">Meeting</option>
                  <option value="training">Training</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}

          {getEventsForDay(selectedDay).length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No events yet. Click &quot;Add Event&quot; to get started.
            </p>
          )}
        </div>
      )}

      {/* Notes Section */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Side Panel Notes</h3>
          <button
            onClick={addNote}
            className="px-3 py-1 bg-semantic-match text-white rounded text-sm"
          >
            + Add Note
          </button>
        </div>

        {data.notes.map((note, index) => (
          <div key={index} className="mb-3 p-3 bg-neutral-cream rounded border">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Note {index + 1}</span>
              <button
                onClick={() => removeNote(index)}
                className="text-red-600 text-xs"
              >
                Remove
              </button>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={note.title}
                onChange={(e) => updateNote(index, { title: e.target.value })}
                placeholder="Note title (optional)"
                className="w-full px-2 py-1 border rounded text-sm"
              />

              <textarea
                value={note.content}
                onChange={(e) => updateNote(index, { content: e.target.value })}
                placeholder="Note content"
                rows={2}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="border-t pt-4 space-y-3">
        <div>
          <label className="block text-sm font-semibold mb-2">Committee Info</label>
          <textarea
            value={data.committeeInfo || ''}
            onChange={(e) => onChange({ ...data, committeeInfo: e.target.value })}
            placeholder="Committee members, roles, etc."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Captains Info</label>
          <textarea
            value={data.captainsInfo || ''}
            onChange={(e) => onChange({ ...data, captainsInfo: e.target.value })}
            placeholder="Team captains, contact info, etc."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">QR Code URL</label>
          <input
            type="url"
            value={data.qrCodeUrl || ''}
            onChange={(e) => onChange({ ...data, qrCodeUrl: e.target.value })}
            placeholder="URL for QR code (WhatsApp, website, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
