import type { EventsCalendarGridData } from '@/lib/schemas/events-calendar-grid.schema';
import { getMonthName, getShortMonthName } from '@/lib/utils/calendar-helpers';
import Image from 'next/image';

interface EventsCalendarHeroPosterProps {
  data: EventsCalendarGridData;
}

export default function EventsCalendarHeroPoster({ data }: EventsCalendarHeroPosterProps) {
  // Group events by month for better organization
  const eventsByMonth = data.days.reduce((acc, day) => {
    day.events.forEach(event => {
      const monthKey = data.month;
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push({ date: day.date, ...event });
    });
    return acc;
  }, {} as Record<number, Array<{ date: number; time?: string; title: string }>>);

  const allEvents = data.days.flatMap(day =>
    day.events.map(event => ({
      date: day.date,
      month: data.month,
      year: data.year,
      ...event
    }))
  ).sort((a, b) => a.date - b.date);

  return (
    <div
      className="w-[297mm] h-[210mm] mx-auto shadow-lg print:shadow-none relative overflow-hidden"
      style={{ backgroundColor: '#3E5F4F' }}
    >
      {/* Tennis Ball Graphics - Decorative */}
      <div className="absolute top-8 right-12 w-24 h-24 rounded-full opacity-20"
           style={{ backgroundColor: '#D0E04D' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 20,50 Q 35,30 50,50 T 80,50" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 20,50 Q 35,70 50,50 T 80,50" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      <div className="absolute bottom-12 left-12 w-20 h-20 rounded-full opacity-15"
           style={{ backgroundColor: '#D0E04D' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 20,50 Q 35,30 50,50 T 80,50" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M 20,50 Q 35,70 50,50 T 80,50" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* Court Line Accent */}
      <div className="absolute top-0 left-0 w-full h-1 opacity-10"
           style={{ backgroundColor: 'white' }} />
      <div className="absolute bottom-0 left-0 w-full h-1 opacity-10"
           style={{ backgroundColor: 'white' }} />

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex">
        {/* LEFT SIDE - Hero Section with Logo */}
        <div className="w-2/5 flex flex-col justify-center items-center p-12 border-r border-white/10">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/assets/marden-logo.png"
              alt="Marden Tennis Club"
              width={180}
              height={180}
              className="drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h1
            className="text-5xl font-bold text-center leading-tight mb-2"
            style={{
              color: '#E8C4A8',
              fontFamily: 'var(--font-montserrat)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Upcoming
            <br />
            Events
          </h1>

          {/* Year */}
          <div
            className="text-7xl font-bold"
            style={{
              color: 'white',
              fontFamily: 'var(--font-montserrat)',
              WebkitTextStroke: '2px #E8C4A8',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {data.year}
          </div>

          {/* Bottom Info */}
          {data.clubWebsite && (
            <div className="mt-8 text-center">
              <p className="text-white text-sm opacity-90 mb-2">
                For any queries & more info
              </p>
              <div
                className="px-6 py-3 rounded-lg"
                style={{ backgroundColor: 'white' }}
              >
                <p
                  className="font-semibold text-sm"
                  style={{ color: '#3E5F4F' }}
                >
                  {data.clubWebsite}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Events List */}
        <div className="w-3/5 p-8 overflow-y-auto">
          <div className="space-y-4">
            {allEvents.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: '#E8C4A8' }} className="text-xl">
                  No events scheduled yet
                </p>
              </div>
            ) : (
              allEvents.map((event, index) => {
                const monthName = getShortMonthName(event.month);
                const isPrimary = event.type === 'tournament';

                return (
                  <div
                    key={index}
                    className="relative pl-20 pb-6 border-l-2 border-white/20"
                    style={{
                      marginLeft: '20px',
                      borderLeftColor: isPrimary ? '#D0E04D' : 'rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Date Circle */}
                    <div
                      className="absolute left-0 top-0 w-16 h-16 rounded-full flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: isPrimary ? '#D0E04D' : '#E8C4A8',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div
                        className="text-2xl font-bold leading-none"
                        style={{ color: '#3E5F4F' }}
                      >
                        {event.date}
                      </div>
                      <div
                        className="text-xs font-semibold uppercase"
                        style={{ color: '#3E5F4F', opacity: 0.8 }}
                      >
                        {monthName}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="ml-4">
                      {event.time && (
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: '#E8C4A8' }}
                        >
                          {event.time}
                        </div>
                      )}
                      <h3
                        className={`text-xl font-bold ${isPrimary ? 'text-2xl' : ''}`}
                        style={{
                          color: 'white',
                          fontFamily: 'var(--font-montserrat)'
                        }}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {/* Connector dot */}
                    <div
                      className="absolute left-0 top-0 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: isPrimary ? '#D0E04D' : '#E8C4A8',
                        transform: 'translateX(-50%) translateY(-8px)'
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Tennis Ball with Dashed Line */}
          <div className="mt-12 flex items-center justify-end">
            <svg width="100" height="40" className="mr-4">
              <line
                x1="0"
                y1="20"
                x2="70"
                y2="20"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            </svg>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#D0E04D' }}
            >
              <svg viewBox="0 0 100 100" className="w-10 h-10">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="3"/>
                <path d="M 20,50 Q 35,30 50,50 T 80,50" fill="none" stroke="white" strokeWidth="3"/>
                <path d="M 20,50 Q 35,70 50,50 T 80,50" fill="none" stroke="white" strokeWidth="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
