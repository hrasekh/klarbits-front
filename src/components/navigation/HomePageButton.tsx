import React from 'react';
import Link from 'next/link';
import GradientButton from '../ui/GradientButton'; // Adjust path if needed

const HomePageButton: React.FC = () => {
  return (
    <Link href="/" className="cursor-pointer">
       {/* The Link component itself doesn't need the gradient styles */}
       {/* Apply specific size/padding here or pass via className to GradientButton */}
      <GradientButton
         className="py-3 px-6 text-base hover:-translate-y-1" // Add specific styles needed
      >
        Home Page <span className="ml-2">→</span>
      </GradientButton>
    </Link>
  );
};

export default HomePageButton;