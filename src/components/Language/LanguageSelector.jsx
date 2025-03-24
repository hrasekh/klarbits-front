"use client";

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from "react";

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);


  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
    { code: 'fa', flag: '🇮🇷', name: 'فارسی' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' }
  ];

  const handleLocaleChange = (newLocale) => {
    // Create a new URL with the updated locale
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('locale', newLocale);

    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  const currentLocale = searchParams.get("locale") || "en";
  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-lg text-gray-700 px-4 py-2 rounded flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {/* <span className='text-sm'>{currentLanguage.code}</span> */}
        <span>{currentLanguage.flag}</span>
      </button>
      {isOpen && (
        <div className="absolute bottom-full mb-2 bg-white border rounded shadow-md w-40">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { handleLocaleChange(lang.code); setIsOpen(!isOpen) }}
              className="flex items-center px-3 py-2 w-full text-gray-800 text-left hover:bg-gray-100"
            >
              <span>{lang.flag}</span>
              <span className="ml-2">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;