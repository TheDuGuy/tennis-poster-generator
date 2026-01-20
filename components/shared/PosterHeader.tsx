interface PosterHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function PosterHeader({
  title,
  subtitle,
  backgroundColor = '#2E8B57',
  textColor = 'white',
}: PosterHeaderProps) {
  return (
    <div
      className="w-full p-6 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <h1 className="text-3xl md:text-4xl font-bold font-montserrat uppercase tracking-wide">
        Marden Tennis Club
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold font-montserrat mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl mt-1 opacity-90">
          {subtitle}
        </p>
      )}
    </div>
  );
}
