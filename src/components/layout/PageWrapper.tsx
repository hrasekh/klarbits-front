import React from 'react';
import Footer from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  topBarGradient?: {
    from: string; // e.g., from-blue-500
    via: string;  // e.g., via-green-500
    to: string;   // e.g., to-blue-500
  };
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  topBarGradient = { from: 'from-blue-500', via: 'via-green-500', to: 'to-blue-500' } // Default gradient
}) => {
  const gradientClass = `bg-gradient-to-r ${topBarGradient.from} ${topBarGradient.via} ${topBarGradient.to}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 relative"> {/* Added relative for absolute positioning of bar */}
      {/* Top Gradient Bar */}
      <div className={`absolute top-0 left-0 w-full h-2 ${gradientClass}`}></div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        {children} {/* Page specific content goes here */}
      </main>

      <Footer />
    </div>
  );
};

export default PageWrapper;