'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import UpcomingMatchesForm from '@/components/forms/UpcomingMatchesForm';
import UpcomingMatchesPoster from '@/components/posters/UpcomingMatchesPoster';
import PrintButton from '@/components/shared/PrintButton';
import type { UpcomingMatchesData } from '@/lib/schemas/upcoming-matches.schema';
import './print.css';
import Link from 'next/link';

const defaultData: UpcomingMatchesData = {
  roundName: 'Round 3 - Week of March 18',
  numberOfMatches: 8,
  deadlineDate: '',
  whatsappGroup: 'Marden Tennis Box League',
  additionalNotes: 'Court 1 and 2 are available Monday-Friday 9am-9pm. Book via the app.',
};

export default function UpcomingMatchesPage() {
  const [data, setData, isLoaded] = useLocalStorage<UpcomingMatchesData>(
    'tennis-poster-upcoming-matches',
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
      <div className="no-print bg-secondary-royal text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-sm hover:underline mb-1 block">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold font-montserrat">
              Upcoming Matches Poster
            </h1>
            <p className="text-sm text-gray-200">
              Fixture list with completion tracking
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Split Layout: Form on Left, Preview on Right */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <UpcomingMatchesForm data={data} onChange={setData} />
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Preview
            </h2>
            <p className="text-sm text-gray-600">
              Print and handwrite player names and dates
            </p>
          </div>
          <div className="transform scale-75 origin-top lg:scale-90">
            <UpcomingMatchesPoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <UpcomingMatchesPoster data={data} />
      </div>
    </div>
  );
}
