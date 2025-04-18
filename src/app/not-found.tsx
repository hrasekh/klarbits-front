'use client';

import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';

export default function NotFound() {
    return (
        <PageWrapper topBarGradient={{ from: 'from-blue-500', via: 'via-red-500', to: 'to-blue-500' }}>
            
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

            {/* Error Title Section */}
            <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-700 mb-2">
                    404
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
            </div>

            <p className="text-lg text-gray-700 max-w-md mb-10 leading-relaxed">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            <Link href="/">
                <span className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                    Return to Home Page
                </span>
            </Link>

        </PageWrapper>
    );
}