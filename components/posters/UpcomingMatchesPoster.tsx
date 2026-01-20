import PosterHeader from '@/components/shared/PosterHeader';
import type { UpcomingMatchesData } from '@/lib/schemas/upcoming-matches.schema';
import { colors } from '@/lib/constants/colors';
import { formatEventDate } from '@/lib/utils/date-helpers';

interface UpcomingMatchesPosterProps {
  data: UpcomingMatchesData;
}

export default function UpcomingMatchesPoster({ data }: UpcomingMatchesPosterProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      <PosterHeader
        title="Upcoming Matches"
        subtitle={data.roundName}
        backgroundColor={colors.secondary.royal}
      />

      <div className="p-6">
        {/* Deadline Banner */}
        {data.deadlineDate && (
          <div
            className="mb-4 p-3 rounded-lg text-center"
            style={{ backgroundColor: colors.semantic.match }}
          >
            <p className="text-white font-bold text-lg">
              Play By: {formatEventDate(data.deadlineDate)}
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-4 p-3 bg-neutral-warm-white rounded text-sm text-gray-700 border-l-4" style={{ borderLeftColor: colors.secondary.royal }}>
          <p className="font-semibold mb-1">How to use this sheet:</p>
          <p>1. Fill in opponent names in the blank spaces</p>
          <p>2. Agree on a date and write it in the &quot;Play by&quot; field</p>
          <p>3. Check the box when the match is complete</p>
        </div>

        {/* Matches List */}
        <div className="space-y-3">
          {Array.from({ length: data.numberOfMatches }).map((_, index) => (
            <div
              key={index}
              className="border-2 border-gray-300 rounded-lg p-3 flex items-center gap-3 min-h-[30mm] handwriting-match"
              style={{ backgroundColor: colors.neutral.cream }}
            >
              {/* Checkbox */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 border-3 border-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-300 text-xs">✓</span>
                </div>
              </div>

              {/* Match Details */}
              <div className="flex-1 flex items-center gap-4">
                {/* Player A */}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1 font-semibold">Player A</div>
                  <div className="border-b-2 border-dotted border-gray-400 h-8 flex items-center px-2">
                    <span className="text-gray-300 text-sm">Write name here</span>
                  </div>
                </div>

                {/* VS */}
                <div className="flex-shrink-0 text-xl font-bold text-gray-400">
                  VS
                </div>

                {/* Player B */}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1 font-semibold">Player B</div>
                  <div className="border-b-2 border-dotted border-gray-400 h-8 flex items-center px-2">
                    <span className="text-gray-300 text-sm">Write name here</span>
                  </div>
                </div>
              </div>

              {/* Play By Date */}
              <div className="flex-shrink-0 w-32">
                <div className="text-xs text-gray-500 mb-1 font-semibold text-center">Play by</div>
                <div className="border-2 border-dotted border-gray-400 rounded p-2 h-8 flex items-center justify-center">
                  <span className="text-gray-300 text-sm">__/__/__</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-secondary-royal">
          {data.whatsappGroup && (
            <div className="mb-3 p-3 bg-semantic-social text-white rounded-lg text-center">
              <p className="font-semibold">Need to arrange a match?</p>
              <p className="text-sm">Check {data.whatsappGroup}</p>
            </div>
          )}

          {data.additionalNotes && (
            <div className="text-sm text-gray-700 p-3 bg-neutral-warm-white rounded">
              <p className="font-semibold mb-1">Notes:</p>
              <p>{data.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
