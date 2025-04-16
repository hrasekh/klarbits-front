import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-4"></div>
        <div className="text-gray-500 text-lg">{message}</div>
      </div>
    </div>
  );
};

export default LoadingState;