import React from 'react';
import Link from 'next/link';

interface QuestionListItemProps {
  title: string;
  question?: string;
  linkHref: string;
  borderColor?: string; // e.g., border-yellow-500, border-red-500
  actions: React.ReactNode; // Slot for buttons
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({
  title,
  question,
  linkHref,
  borderColor = 'border-gray-300',
  actions,
}) => {
  const baseClasses = "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300";
  const borderClass = borderColor ? `border-l-4 ${borderColor}` : '';

  // Combine classes using template literals
  const combinedClasses = `${baseClasses} ${borderClass}`.trim(); // Trim any extra spaces

  return (
    <div className={combinedClasses}>
      <div className="flex justify-between items-center gap-4">
        {/* Question Info */}
        <div className="text-left flex-1 overflow-hidden">
          <Link
            href={linkHref}
            className="text-xl text-gray-800 font-semibold hover:text-blue-600 transition-colors duration-300 line-clamp-1 block"
          >
            {title}
          </Link>
          {question && (
            <p className="text-gray-700 mt-2 line-clamp-2">{question}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex space-x-3">
           {actions}
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;