'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  label?: string;
}

export default function QRCodeGenerator({
  value,
  size = 200,
  level = 'H',
  includeMargin = true,
  label,
}: QRCodeGeneratorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <QRCodeSVG
          value={value}
          size={size}
          level={level}
          includeMargin={includeMargin}
        />
      </div>
      {label && (
        <p className="text-sm font-semibold text-center max-w-[200px]">
          {label}
        </p>
      )}
    </div>
  );
}
