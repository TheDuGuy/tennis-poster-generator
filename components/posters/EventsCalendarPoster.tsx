import PosterHeader from '@/components/shared/PosterHeader';
import QRCodeGenerator from '@/components/shared/QRCodeGenerator';
import type { EventsCalendarData } from '@/lib/schemas/events-calendar.schema';
import { formatEventDateTime, getMonthYear } from '@/lib/utils/date-helpers';
import { eventTypeColors } from '@/lib/constants/colors';
import { colors } from '@/lib/constants/colors';

interface EventsCalendarPosterProps {
  data: EventsCalendarData;
}

export default function EventsCalendarPoster({ data }: EventsCalendarPosterProps) {
  const monthYear = data.month ? getMonthYear(data.month + '-01') : 'Events';

  // Sort events by date
  const sortedEvents = [...data.events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none">
      <PosterHeader
        title="Events Calendar"
        subtitle={monthYear}
        backgroundColor={colors.primary.deepGreen}
      />

      <div className="p-8">
        {/* Events List */}
        <div className="space-y-4 mb-8">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="flex gap-4 p-4 rounded-lg border-l-4"
              style={{ borderLeftColor: eventTypeColors[event.type] }}
            >
              {/* Date Badge */}
              <div
                className="flex-shrink-0 w-20 h-20 rounded-lg flex flex-col items-center justify-center text-white"
                style={{ backgroundColor: eventTypeColors[event.type] }}
              >
                <div className="text-2xl font-bold">
                  {new Date(event.date).getDate()}
                </div>
                <div className="text-xs uppercase">
                  {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-xl font-bold font-montserrat">
                    {event.title}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase text-white"
                    style={{ backgroundColor: eventTypeColors[event.type] }}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  {formatEventDateTime(event.date, event.time)}
                </div>

                {event.description && (
                  <p className="text-sm text-gray-700">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with QR Code and Contact */}
        <div className="border-t-2 border-primary-deep-green pt-6 flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-montserrat text-primary-deep-green">
              Stay Connected
            </h3>
            {data.contactEmail && (
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {data.contactEmail}
              </p>
            )}
            {data.contactPhone && (
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> {data.contactPhone}
              </p>
            )}
            {data.clubWebsite && (
              <p className="text-sm">
                <span className="font-semibold">Web:</span> {data.clubWebsite}
              </p>
            )}
          </div>

          {data.clubWebsite && (
            <QRCodeGenerator
              value={data.clubWebsite}
              size={120}
              label="Scan for full calendar"
            />
          )}
        </div>
      </div>
    </div>
  );
}
