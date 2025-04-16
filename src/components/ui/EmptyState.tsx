import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-6xl mb-4"> {/* Adjust icon styling container if needed */}
            {icon}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">{message}</h2>
        <p className="mt-2 text-gray-500 mb-8 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;