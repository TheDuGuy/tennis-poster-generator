import Link from 'next/link';
import { colors } from '@/lib/constants/colors';

export default function HomePage() {
  const posters = [
    {
      id: 'events-2026',
      title: '🎯 2026 Events - Print Ready',
      description: 'Beautiful static poster with all your 2026 events hardcoded. Just click print - no editing needed! Deep green with timeline layout.',
      location: '⭐ RECOMMENDED - Ready to Print',
      color: '#3E5F4F',
      updateMethod: 'Static - Just Print!',
      href: '/posters/events-2026',
    },
    {
      id: 'events-hero',
      title: 'Events Calendar - Editable',
      description: 'Designer-quality layout where you can add/edit events.',
      location: 'Alternative - Editable',
      color: '#3E5F4F',
      updateMethod: 'Customizable',
      href: '/posters/events-hero',
    },
    {
      id: 'events-calendar-grid',
      title: 'Calendar Grid',
      description: 'Traditional calendar layout with day-by-day event boxes.',
      location: 'Alternative - Landscape',
      color: colors.primary.deepGreen,
      updateMethod: 'Click days to add events',
      href: '/posters/events-calendar-grid',
    },
    {
      id: 'events-calendar',
      title: 'Events Calendar (Simple List)',
      description: 'Basic list format with color-coded event types.',
      location: 'Alternative - Portrait',
      color: colors.primary.forest,
      updateMethod: 'Simple format',
      href: '/posters/events-calendar',
    },
    {
      id: 'box-league',
      title: '🏆 Box League - Results & Matches',
      description: 'Print-ready poster with blank rows for handwritten results and upcoming matches. Includes QR code to live standings.',
      location: 'Courtside - Living Sheet',
      color: colors.primary.deepGreen,
      updateMethod: 'Print once, handwrite results',
      href: '/posters/box-league',
    },
    {
      id: 'results-grid',
      title: 'Results Grid',
      description: 'Pre-designed table for handwritten match results.',
      location: 'Courtside - Top',
      color: colors.neutral.lightGray,
      updateMethod: 'Print once, handwrite weekly',
      href: '/posters/results-grid',
    },
    {
      id: 'upcoming-matches',
      title: 'Upcoming Matches',
      description: 'Fixture list with spaces for names, dates, and checkboxes.',
      location: 'Courtside - Bottom',
      color: colors.secondary.royal,
      updateMethod: 'Print per round, handwrite details',
      href: '/posters/upcoming-matches',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-warm-white to-neutral-cream">
      {/* Header */}
      <header className="bg-primary-deep-green text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-2">
            Marden Tennis Club
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Poster Generator
          </h2>
          <p className="mt-3 text-lg opacity-90">
            Create professional print-ready posters for your notice boards
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            Generate 4 types of A4 posters for your club notice boards. Simply select a poster type,
            fill in the details, and print. Some posters are designed with spaces for handwritten updates.
          </p>
        </div>

        {/* Poster Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {posters.map((poster) => (
            <Link
              key={poster.id}
              href={poster.href}
              className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gray-300"
            >
              {/* Color Bar */}
              <div
                className="h-3"
                style={{ backgroundColor: poster.color }}
              />

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold font-montserrat text-gray-800 group-hover:text-primary-deep-green transition-colors">
                    {poster.title}
                  </h3>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {poster.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Location:</span>
                    <span className="text-gray-700">{poster.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Update:</span>
                    <span className="text-gray-700">{poster.updateMethod}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <span className="text-primary-deep-green font-semibold group-hover:underline">
                    Create Poster →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold font-montserrat text-gray-800 mb-6 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold"
                style={{ backgroundColor: colors.primary.deepGreen }}
              >
                1
              </div>
              <h4 className="font-semibold text-lg mb-2">Select Poster Type</h4>
              <p className="text-sm text-gray-600">
                Choose from 4 professionally designed poster templates
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold"
                style={{ backgroundColor: colors.primary.deepGreen }}
              >
                2
              </div>
              <h4 className="font-semibold text-lg mb-2">Fill in Details</h4>
              <p className="text-sm text-gray-600">
                Enter your event info, dates, and club details with live preview
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold"
                style={{ backgroundColor: colors.primary.deepGreen }}
              >
                3
              </div>
              <h4 className="font-semibold text-lg mb-2">Print & Display</h4>
              <p className="text-sm text-gray-600">
                Print directly or save as PDF. Your data auto-saves for next time
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-primary-forest text-white rounded-xl p-6">
            <h3 className="text-xl font-bold font-montserrat mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-semantic-tournament text-xl">✓</span>
                <span>Print-ready A4 format with optimized margins</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-semantic-tournament text-xl">✓</span>
                <span>Auto-save to localStorage - never lose your work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-semantic-tournament text-xl">✓</span>
                <span>QR codes for easy access to club websites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-semantic-tournament text-xl">✓</span>
                <span>Handwriting-optimized grids for results and fixtures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-semantic-tournament text-xl">✓</span>
                <span>Professional design with club branding</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Marden Tennis Club Poster Generator
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Built with Next.js, Tailwind CSS, and browser print technology
          </p>
        </div>
      </footer>
    </div>
  );
}
