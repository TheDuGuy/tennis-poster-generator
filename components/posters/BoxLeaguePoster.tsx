import PosterHeader from '@/components/shared/PosterHeader';
import QRCodeGenerator from '@/components/shared/QRCodeGenerator';
import type { BoxLeagueData } from '@/lib/schemas/box-league.schema';
import { colors } from '@/lib/constants/colors';

interface BoxLeaguePosterProps {
  data: BoxLeagueData;
}

export default function BoxLeaguePoster({ data }: BoxLeaguePosterProps) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg print:shadow-none flex flex-col">
      <PosterHeader
        title="Box League"
        subtitle="Join the Competition"
        backgroundColor={colors.secondary.navy}
      />

      <div className="flex-1 p-8 flex flex-col justify-between">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Bold Headline */}
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl font-extrabold font-montserrat uppercase leading-tight"
              style={{ color: colors.secondary.navy }}
            >
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-2xl mt-3 text-gray-700 font-semibold">
                {data.subheadline}
              </p>
            )}
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {data.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border-l-4"
                style={{ borderLeftColor: colors.secondary.navy, backgroundColor: colors.neutral.warmWhite }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: colors.secondary.navy }}
                >
                  {index + 1}
                </div>
                <p className="text-lg font-semibold text-gray-800 pt-2">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          {data.additionalInfo && (
            <div className="p-4 bg-neutral-cream rounded-lg">
              <p className="text-base text-gray-700 leading-relaxed">
                {data.additionalInfo}
              </p>
            </div>
          )}
        </div>

        {/* Footer with QR Code and Contact */}
        <div className="border-t-2 pt-6 mt-8 flex justify-between items-end" style={{ borderColor: colors.secondary.navy }}>
          <div className="space-y-2">
            <h3
              className="text-xl font-bold font-montserrat mb-3"
              style={{ color: colors.secondary.navy }}
            >
              Ready to Join?
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
            {data.signupUrl && (
              <p className="text-sm">
                <span className="font-semibold">Web:</span> {data.signupUrl}
              </p>
            )}
          </div>

          {data.signupUrl && (
            <QRCodeGenerator
              value={data.signupUrl}
              size={150}
              label="Scan to sign up now"
            />
          )}
        </div>
      </div>
    </div>
  );
}
