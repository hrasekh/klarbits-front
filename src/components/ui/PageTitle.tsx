import React from 'react';

interface PageTitleProps {
  title: string;
  gradientColors?: {
    from: string; // e.g., from-blue-700
    via?: string; // e.g., via-green-700 (optional)
    to: string;   // e.g., to-green-700
  };
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  gradientColors = { from: 'from-blue-700', to: 'to-green-700' } // Default gradient
}) => {
  const gradientClass = `bg-gradient-to-r ${gradientColors.from} ${gradientColors.via ? gradientColors.via : ''} ${gradientColors.to}`;

  return (
    <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
      <h1 className={`text-4xl sm:text-5xl font-bold text-transparent bg-clip-text ${gradientClass} mb-2`}>
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;