'use client';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({
  label = 'Print Poster',
  className = '',
}: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`
        no-print
        px-6 py-3
        bg-primary-deep-green hover:bg-primary-forest
        text-white font-semibold rounded-lg
        transition-colors duration-200
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {label}
    </button>
  );
}
