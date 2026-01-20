import type { EventsCalendarGridData } from '@/lib/schemas/events-calendar-grid.schema';
import { generateCalendarGrid, getMonthName, WEEKDAY_NAMES } from '@/lib/utils/calendar-helpers';
import { colors } from '@/lib/constants/colors';
import QRCodeGenerator from '@/components/shared/QRCodeGenerator';

interface EventsCalendarGridPosterProps {
  data: EventsCalendarGridData;
}

export default function EventsCalendarGridPoster({ data }: EventsCalendarGridPosterProps) {
  const calendarGrid = generateCalendarGrid(data.year, data.month);
  const monthName = getMonthName(data.month);

  // Helper to get events for a specific day
  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const dayData = data.days.find(d => d.date === day);
    return dayData?.events || [];
  };

  return (
    <div className="w-[297mm] h-[210mm] bg-white mx-auto shadow-lg print:shadow-none flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="px-8 py-4 text-white flex justify-between items-center"
        style={{ backgroundColor: colors.primary.deepGreen }}
      >
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-montserrat uppercase tracking-wide">
            {monthName} {data.year} - {data.title}
          </h1>
          {data.headerInfo && (
            <p className="text-sm mt-1 opacity-90">
              {data.headerInfo}
            </p>
          )}
          {data.clubWebsite && (
            <p className="text-sm opacity-90">
              {data.clubWebsite}
            </p>
          )}
        </div>

        {/* Logo placeholder */}
        <div
          className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: colors.neutral.warmWhite }}
        >
          <span className="text-xs text-center font-bold" style={{ color: colors.primary.deepGreen }}>
            {data.clubName}
          </span>
        </div>
      </div>

      {/* Main content: Calendar + Notes sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          <table className="w-full h-full border-collapse">
            <thead>
              <tr>
                {WEEKDAY_NAMES.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-400 bg-neutral-warm-white p-2 text-sm font-bold"
                    style={{ width: '14.28%' }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarGrid.map((week, weekIndex) => (
                <tr key={weekIndex} className="calendar-row">
                  {week.days.map((day, dayIndex) => {
                    const events = getEventsForDay(day);
                    const hasEvents = events.length > 0;

                    return (
                      <td
                        key={dayIndex}
                        className="border border-dotted border-gray-400 p-2 align-top relative"
                        style={{
                          backgroundColor: hasEvents ? colors.neutral.warmWhite : 'white',
                          minHeight: '60px',
                        }}
                      >
                        {day && (
                          <>
                            {/* Day number */}
                            <div className="text-right font-bold text-lg mb-1">
                              {day}
                            </div>

                            {/* Events */}
                            <div className="space-y-1">
                              {events.map((event, eventIndex) => (
                                <div key={eventIndex} className="text-xs leading-tight">
                                  {event.time && (
                                    <div className="font-semibold">{event.time}</div>
                                  )}
                                  <div className={event.type === 'tournament' ? 'font-bold' : ''}>
                                    {event.title}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Sidebar */}
        <div
          className="w-64 p-4 flex flex-col justify-between"
          style={{ backgroundColor: colors.semantic.match }}
        >
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-3 text-white">
              NOTES
            </h3>

            {/* Notes list */}
            <div className="space-y-3 text-sm text-white">
              {data.notes.map((note, index) => (
                <div key={index}>
                  {note.title && (
                    <p className="font-semibold mb-1">{note.title}</p>
                  )}
                  <p className="text-xs leading-relaxed opacity-90">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Committee info */}
            {data.committeeInfo && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="text-xs text-white leading-relaxed whitespace-pre-line">
                  {data.committeeInfo}
                </p>
              </div>
            )}

            {/* Captains info */}
            {data.captainsInfo && (
              <div className="mt-3">
                <p className="text-xs text-white leading-relaxed whitespace-pre-line">
                  {data.captainsInfo}
                </p>
              </div>
            )}
          </div>

          {/* QR Code at bottom */}
          {data.qrCodeUrl && (
            <div className="mt-4 flex justify-center">
              <QRCodeGenerator
                value={data.qrCodeUrl}
                size={80}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
