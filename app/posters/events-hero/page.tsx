'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import EventsCalendarGridForm from '@/components/forms/EventsCalendarGridForm';
import EventsCalendarHeroPoster from '@/components/posters/EventsCalendarHeroPoster';
import PrintButton from '@/components/shared/PrintButton';
import type { EventsCalendarGridData } from '@/lib/schemas/events-calendar-grid.schema';
import '../events-calendar/print-grid.css';
import Link from 'next/link';

const defaultData: EventsCalendarGridData = {
  year: 2025,
  month: 3,
  title: "Upcoming Events",
  clubName: "Marden Tennis Club",
  clubWebsite: "www.mardensportsclub.com/tennis",
  headerInfo: "",
  days: [
    { date: 9, events: [{ time: "10-12", title: "American Tournament", type: "tournament" }] },
    { date: 26, events: [{ time: "10.30-12.30", title: "Open Morning", type: "social" }] },
  ],
  notes: [],
  committeeInfo: `Committee Members:
AJC, RN, MRV, Smith, Eddie, Rob`,
  captainsInfo: `Pete - Men's 1 Captain
Rob - Men's 2 Captain
AJC - Mixed, Fixtures, Social
Steve - Maintenance
Mel - Membership
Eddie - Marketing & Posters`,
  qrCodeUrl: "",
};

export default function EventsHeroPage() {
  const [data, setData, isLoaded] = useLocalStorage<EventsCalendarGridData>(
    'tennis-poster-events-hero',
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
              Events Calendar - Hero Style (Landscape)
            </h1>
            <p className="text-sm text-gray-200">
              Professional designer-quality layout
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

          <div className="mt-6 p-4 bg-primary-forest text-white rounded-lg">
            <h3 className="font-bold mb-2">Design Features:</h3>
            <ul className="text-sm space-y-1">
              <li>✓ Your actual Marden Tennis logo</li>
              <li>✓ Deep green & peach color scheme</li>
              <li>✓ Timeline-style event layout</li>
              <li>✓ Tennis ball graphics</li>
              <li>✓ Professional designer quality</li>
              <li>✓ Landscape A4 format</li>
            </ul>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Preview (Landscape A4)
            </h2>
            <p className="text-sm text-gray-600">
              Designer-quality professional layout
            </p>
          </div>
          <div className="transform scale-50 origin-top lg:scale-60">
            <EventsCalendarHeroPoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <EventsCalendarHeroPoster data={data} />
      </div>
    </div>
  );
}
