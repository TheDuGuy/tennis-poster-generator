'use client';

import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import BoxLeagueForm from '@/components/forms/BoxLeagueForm';
import BoxLeaguePoster from '@/components/posters/BoxLeaguePoster';
import PrintButton from '@/components/shared/PrintButton';
import type { BoxLeagueData } from '@/lib/schemas/box-league.schema';
import './print.css';
import Link from 'next/link';

const defaultData: BoxLeagueData = {
  headline: "THINK YOU'VE GOT WHAT IT TAKES?",
  subheadline: 'Join our competitive Box League',
  benefits: [
    'Play against members of similar ability',
    'Flexible scheduling - play when it suits you',
    'Track your progress and climb the rankings',
    'Meet new players and improve your game',
  ],
  signupUrl: 'https://mardentennis.club/box-league',
  contactEmail: 'boxleague@mardentennis.club',
  contactPhone: '',
  additionalInfo: 'New seasons start every 8 weeks. All ability levels welcome!',
};

export default function BoxLeagueRecruitmentPage() {
  const [data, setData, isLoaded] = useLocalStorage<BoxLeagueData>(
    'tennis-poster-box-league',
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
      <div className="no-print bg-secondary-navy text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-sm hover:underline mb-1 block">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold font-montserrat">
              Box League Recruitment Poster
            </h1>
          </div>
          <PrintButton />
        </div>
      </div>

      {/* Split Layout: Form on Left, Preview on Right */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <BoxLeagueForm data={data} onChange={setData} />
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
            <BoxLeaguePoster data={data} />
          </div>
        </div>
      </div>

      {/* Print View - Hidden on screen, shown when printing */}
      <div className="hidden print:block poster-container">
        <BoxLeaguePoster data={data} />
      </div>
    </div>
  );
}
