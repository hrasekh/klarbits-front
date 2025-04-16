import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-gray-800 text-center text-gray-300 text-sm mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        <p>© {new Date().getFullYear()} German Citizenship Test Preparation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;