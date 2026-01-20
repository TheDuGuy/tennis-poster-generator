import PosterHeader from '@/components/shared/PosterHeader';
import QRCodeGenerator from '@/components/shared/QRCodeGenerator';
import type { ResultsGridData } from '@/lib/schemas/results-grid.schema';
import { colors } from '@/lib/constants/colors';

interface ResultsGridPosterProps {
  data: ResultsGridData;
}

export default function ResultsGridPoster({ data }: ResultsGridPosterProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      <PosterHeader
        title="Match Results"
        subtitle={data.seasonName}
        backgroundColor={colors.neutral.lightGray}
        textColor="#333"
      />

      <div className="p-6">
        {/* Instructions */}
        {data.instructions && (
          <div className="mb-4 p-3 bg-neutral-cream rounded text-sm text-gray-700 text-center">
            {data.instructions}
          </div>
        )}

        {/* Groups */}
        <div className="space-y-6">
          {data.groupNames.map((groupName, groupIndex) => (
            <div key={groupIndex} className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Group Header */}
              <div
                className="p-2 text-center font-bold text-lg font-montserrat"
                style={{ backgroundColor: colors.neutral.lightGray }}
              >
                {groupName}
              </div>

              {/* Results Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-warm-white">
                    <th className="border border-gray-300 p-2 text-sm font-semibold w-[40%]">
                      Player A
                    </th>
                    <th className="border border-gray-300 p-2 text-sm font-semibold w-[15%]">
                      Score
                    </th>
                    <th className="border border-gray-300 p-2 text-sm font-semibold w-[40%]">
                      Player B
                    </th>
                    <th className="border border-gray-300 p-2 text-sm font-semibold w-[5%]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: data.rowsPerGroup }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="handwriting-row">
                      {/* Player A */}
                      <td className="border border-gray-300 p-1 h-[20mm]">
                        <div className="border-b-2 border-dotted border-gray-400 h-full flex items-center px-2">
                          <span className="text-gray-300 text-xs">Write name here</span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="border border-gray-300 p-1 text-center">
                        <div className="flex items-center justify-center h-full gap-1">
                          <div className="w-10 h-10 border-2 border-gray-400 border-dotted rounded flex items-center justify-center">
                            <span className="text-gray-300 text-xs">0</span>
                          </div>
                          <span className="text-gray-400 font-bold">-</span>
                          <div className="w-10 h-10 border-2 border-gray-400 border-dotted rounded flex items-center justify-center">
                            <span className="text-gray-300 text-xs">0</span>
                          </div>
                        </div>
                      </td>

                      {/* Player B */}
                      <td className="border border-gray-300 p-1">
                        <div className="border-b-2 border-dotted border-gray-400 h-full flex items-center px-2">
                          <span className="text-gray-300 text-xs">Write name here</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="border border-gray-300 p-1 text-center">
                        <div className="text-xs text-gray-300 border-b-2 border-dotted border-gray-400 h-full flex items-center justify-center">
                          __/__
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-semibold">How to use this sheet:</p>
            <p>• Fill in player names and scores after each match</p>
            <p>• Use pen (not pencil) for best visibility</p>
            <p>• Check live standings via QR code</p>
          </div>

          {data.leagueTableUrl && (
            <QRCodeGenerator
              value={data.leagueTableUrl}
              size={100}
              label="View live tables"
            />
          )}
        </div>
      </div>
    </div>
  );
}
