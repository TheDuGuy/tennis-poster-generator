'use client';

import type { BoxLeagueData } from '@/lib/schemas/box-league.schema';

interface BoxLeagueFormProps {
  data: BoxLeagueData;
  onChange: (data: BoxLeagueData) => void;
}

export default function BoxLeagueForm({ data, onChange }: BoxLeagueFormProps) {
  const addBenefit = () => {
    if (data.benefits.length < 4) {
      onChange({ ...data, benefits: [...data.benefits, ''] });
    }
  };

  const removeBenefit = (index: number) => {
    onChange({
      ...data,
      benefits: data.benefits.filter((_, i) => i !== index),
    });
  };

  const updateBenefit = (index: number, value: string) => {
    onChange({
      ...data,
      benefits: data.benefits.map((b, i) => (i === index ? value : b)),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold font-montserrat text-secondary-navy">
        Box League Recruitment Setup
      </h2>

      {/* Headlines */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Main Headline *
        </label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => onChange({ ...data, headline: e.target.value })}
          placeholder="THINK YOU'VE GOT WHAT IT TAKES?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Subheadline
        </label>
        <input
          type="text"
          value={data.subheadline || ''}
          onChange={(e) => onChange({ ...data, subheadline: e.target.value })}
          placeholder="Join our competitive Box League"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
        />
      </div>

      {/* Benefits */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Key Benefits ({data.benefits.length}/4)</h3>
          <button
            onClick={addBenefit}
            disabled={data.benefits.length >= 4}
            className="px-4 py-2 bg-secondary-navy text-white rounded-md hover:bg-secondary-royal disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            + Add Benefit
          </button>
        </div>

        {data.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
              placeholder={`Benefit ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
              required
            />
            <button
              onClick={() => removeBenefit(index)}
              className="px-3 py-2 text-red-600 hover:text-red-800 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Sign-up URL
          </label>
          <input
            type="url"
            value={data.signupUrl || ''}
            onChange={(e) => onChange({ ...data, signupUrl: e.target.value })}
            placeholder="https://mardentennis.club/box-league"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
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
            placeholder="boxleague@mardentennis.club"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t pt-4">
        <label className="block text-sm font-semibold mb-2">
          Additional Information
        </label>
        <textarea
          value={data.additionalInfo || ''}
          onChange={(e) => onChange({ ...data, additionalInfo: e.target.value })}
          placeholder="Any extra details about the league..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-navy focus:border-transparent"
        />
      </div>
    </div>
  );
}
