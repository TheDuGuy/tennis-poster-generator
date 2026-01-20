'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import ResultsGridForm from '@/components/forms/ResultsGridForm';
import ResultsGridPoster from '@/components/posters/ResultsGridPoster';
import PrintButton from '@/components/shared/PrintButton';
import type { ResultsGridData } from '@/lib/schemas/results-grid.schema';
import './print.css';
import Link from 'next/link';

const defaultData: ResultsGridData = {
  seasonName: 'Spring 2024 Box League',
  groupNames: ['Group 1', 'Group 2'],
  rowsPerGroup: 8,
  leagueTableUrl: 'https://mardentennis.club/league-tables',
  instructions: 'Fill in your match results after playing. Use pen for best visibility.',
};

export default function ResultsGridPage() {
  const [data, setData, isLoaded] = useLocalStorage<ResultsGridData>(
    'tennis-poster-results-grid',
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
      <div className="no-print bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-sm hover:underline mb-1 block">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold font-montserrat">
              Results Grid Poster
            </h1>
            <p className="text-sm text-gray-300">
              Optimized for handwritten results
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Split Layout: Form on Left, Preview on Right */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <ResultsGridForm data={data} onChange={setData} />
        </div>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Preview
            </h2>
            <p className="text-sm text-gray-600">
              Print once and handwrite results weekly
            </p>
          </div>
          <div className="transform scale-75 origin-top lg:scale-90">
            <ResultsGridPoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <ResultsGridPoster data={data} />
      </div>
    </div>
  );
}
