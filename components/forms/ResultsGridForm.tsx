'use client';

import type { ResultsGridData } from '@/lib/schemas/results-grid.schema';

interface ResultsGridFormProps {
  data: ResultsGridData;
  onChange: (data: ResultsGridData) => void;
}

export default function ResultsGridForm({ data, onChange }: ResultsGridFormProps) {
  const addGroup = () => {
    if (data.groupNames.length < 3) {
      onChange({ ...data, groupNames: [...data.groupNames, `Group ${data.groupNames.length + 1}`] });
    }
  };

  const removeGroup = (index: number) => {
    onChange({
      ...data,
      groupNames: data.groupNames.filter((_, i) => i !== index),
    });
  };

  const updateGroup = (index: number, value: string) => {
    onChange({
      ...data,
      groupNames: data.groupNames.map((g, i) => (i === index ? value : g)),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold font-montserrat text-gray-800">
        Results Grid Setup
      </h2>

      {/* Season Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Season Name *
        </label>
        <input
          type="text"
          value={data.seasonName}
          onChange={(e) => onChange({ ...data, seasonName: e.target.value })}
          placeholder="Spring 2024 Box League"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          required
        />
      </div>

      {/* Rows Per Group */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Rows Per Group (4-12)
        </label>
        <input
          type="number"
          min="4"
          max="12"
          value={data.rowsPerGroup}
          onChange={(e) => onChange({ ...data, rowsPerGroup: parseInt(e.target.value) || 6 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          Adjust based on group size. Fewer rows = larger handwriting space.
        </p>
      </div>

      {/* Groups */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Groups ({data.groupNames.length}/3)</h3>
          <button
            onClick={addGroup}
            disabled={data.groupNames.length >= 3}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            + Add Group
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Maximum 3 groups per poster for optimal readability
        </p>

        {data.groupNames.map((groupName, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={groupName}
              onChange={(e) => updateGroup(index, e.target.value)}
              placeholder={`Group ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              required
            />
            {data.groupNames.length > 1 && (
              <button
                onClick={() => removeGroup(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* League Table URL */}
      <div className="border-t pt-4">
        <label className="block text-sm font-semibold mb-2">
          Live League Table URL
        </label>
        <input
          type="url"
          value={data.leagueTableUrl || ''}
          onChange={(e) => onChange({ ...data, leagueTableUrl: e.target.value })}
          placeholder="https://mardentennis.club/league-tables"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">
          QR code will link to live league standings
        </p>
      </div>

      {/* Instructions */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Instructions for Players
        </label>
        <textarea
          value={data.instructions || ''}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Fill in your match results after playing..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
      </div>

      {/* Info Box */}
      <div className="bg-neutral-warm-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-sm mb-2">Handwriting Tips</h4>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Use a dark pen (not pencil) for visibility</li>
          <li>• Grid lines are at 60% opacity to stay subtle</li>
          <li>• Cell height: {Math.floor(240 / data.rowsPerGroup)}mm per row</li>
          <li>• Print on matte paper for best pen adhesion</li>
        </ul>
      </div>
    </div>
  );
}
