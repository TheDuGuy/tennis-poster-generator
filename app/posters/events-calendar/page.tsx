'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import EventsCalendarForm from '@/components/forms/EventsCalendarForm';
import EventsCalendarPoster from '@/components/posters/EventsCalendarPoster';
import PrintButton from '@/components/shared/PrintButton';
import type { EventsCalendarData } from '@/lib/schemas/events-calendar.schema';
import './print.css';
import Link from 'next/link';

const defaultData: EventsCalendarData = {
  month: new Date().toISOString().slice(0, 7),
  clubWebsite: 'https://mardentennis.club',
  contactEmail: 'info@mardentennis.club',
  contactPhone: '',
  events: [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      title: 'Summer Social Evening',
      description: 'Bring your racket and friends! BBQ and refreshments provided.',
      type: 'social',
    },
  ],
};

export default function EventsCalendarPage() {
  const [data, setData, isLoaded] = useLocalStorage<EventsCalendarData>(
    'tennis-poster-events-calendar',
    defaultData
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-warm-white">
      {/* Header Bar */}
      <div className="no-print bg-primary-deep-green text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-sm hover:underline mb-1 block">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold font-montserrat">
              Events Calendar Poster
            </h1>
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Split Layout: Form on Left, Preview on Right */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <EventsCalendarForm data={data} onChange={setData} />
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Preview
            </h2>
            <p className="text-sm text-gray-600">
              This is how your poster will look when printed
            </p>
          </div>
          <div className="transform scale-75 origin-top lg:scale-90">
            <EventsCalendarPoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <EventsCalendarPoster data={data} />
      </div>
    </div>
  );
}
