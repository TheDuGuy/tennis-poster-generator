'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import EventsCalendarGridForm from '@/components/forms/EventsCalendarGridForm';
import EventsCalendarGridPoster from '@/components/posters/EventsCalendarGridPoster';
import PrintButton from '@/components/shared/PrintButton';
import type { EventsCalendarGridData } from '@/lib/schemas/events-calendar-grid.schema';
import '../events-calendar/print-grid.css';
import Link from 'next/link';

const defaultData: EventsCalendarGridData = {
  year: 2026,
  month: 3, // March 2026
  title: "WHAT'S ON",
  clubName: "Marden Tennis Club",
  clubWebsite: "mardensportsclub.com",
  headerInfo: "Pricing & membership info: mardensportsclub.com",
  days: [
    {
      date: 8,
      events: [
        { title: "American Tournament", type: "tournament" }
      ]
    },
  ],
  notes: [
    {
      title: "All sessions booked via MSC app",
      content: "Go to Activities > Tennis Open Sessions - choose desired date/session."
    },
    {
      title: "American Tournaments",
      content: "Fun mixed doubles format. All levels welcome!"
    },
  ],
  committeeInfo: `Committee Members:
AJC, RN, MRV, Smith, Eddie, Rob

Team Captains:
Pete - Men's 1 Captain
Rob - Men's 2 Captain
AJC - Mixed, Fixtures, Social`,
  captainsInfo: `Roles:
Steve - Maintenance
Mel - Membership
Eddie - Marketing & Posters`,
  qrCodeUrl: "https://mardensportsclub.com",
};

export default function EventsCalendarGridPage() {
  const [data, setData, isLoaded] = useLocalStorage<EventsCalendarGridData>(
    'tennis-poster-events-calendar-grid',
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
              Calendar Grid Poster (Landscape)
            </h1>
            <p className="text-sm text-gray-200">
              Professional calendar layout - click days to add events
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Split Layout: Form on Left, Preview on Right */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <EventsCalendarGridForm data={data} onChange={setData} />
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Preview (Landscape A4)
            </h2>
            <p className="text-sm text-gray-600">
              Professional calendar grid format
            </p>
          </div>
          <div className="transform scale-50 origin-top lg:scale-60">
            <EventsCalendarGridPoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <EventsCalendarGridPoster data={data} />
      </div>
    </div>
  );
}
