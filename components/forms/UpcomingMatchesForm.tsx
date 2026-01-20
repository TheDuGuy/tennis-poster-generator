'use client';

import type { UpcomingMatchesData } from '@/lib/schemas/upcoming-matches.schema';

interface UpcomingMatchesFormProps {
  data: UpcomingMatchesData;
  onChange: (data: UpcomingMatchesData) => void;
}

export default function UpcomingMatchesForm({ data, onChange }: UpcomingMatchesFormProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold font-montserrat text-gray-800">
        Upcoming Matches Setup
      </h2>

      {/* Round Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Round/Week Name *
        </label>
        <input
          type="text"
          value={data.roundName}
          onChange={(e) => onChange({ ...data, roundName: e.target.value })}
          placeholder="Round 3 - Week of March 18"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          required
        />
      </div>

      {/* Number of Matches */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Number of Matches (4-15)
        </label>
        <input
          type="number"
          min="4"
          max="15"
          value={data.numberOfMatches}
          onChange={(e) => onChange({ ...data, numberOfMatches: parseInt(e.target.value) || 8 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          More matches = less space per row. Keep readable for handwriting.
        </p>
      </div>

      {/* Deadline Date */}
      <div className="border-t pt-4">
        <label className="block text-sm font-semibold mb-2">
          Play By Deadline (Optional)
        </label>
        <input
          type="date"
          value={data.deadlineDate || ''}
          onChange={(e) => onChange({ ...data, deadlineDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          Shown prominently on poster if set
        </p>
      </div>

      {/* WhatsApp Group */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          WhatsApp Group/Contact Info
        </label>
        <input
          type="text"
          value={data.whatsappGroup || ''}
          onChange={(e) => onChange({ ...data, whatsappGroup: e.target.value })}
          placeholder="Marden Tennis Box League"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          For players to coordinate match times
        </p>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Additional Notes
        </label>
        <textarea
          value={data.additionalNotes || ''}
          onChange={(e) => onChange({ ...data, additionalNotes: e.target.value })}
          placeholder="Court availability, weather info, etc."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
      </div>

      {/* Info Box */}
      <div className="bg-neutral-cream p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-sm mb-2">How This Poster Works</h4>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Print poster with blank player spaces</li>
          <li>• Players handwrite opponent names</li>
          <li>• Fill in &quot;Play by&quot; dates for each match</li>
          <li>• Check boxes when matches are complete</li>
          <li>• Row height: {Math.floor(230 / data.numberOfMatches)}mm per match</li>
        </ul>
      </div>
    </div>
  );
}
