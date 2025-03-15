"use client";

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <select
      onChange={(e) => handleLocaleChange(e.target.value)}
      defaultValue={searchParams.get('locale') || 'en'}
      className="text-sm font-medium mr-2 text-gray-700"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          <span className='mr-6'>{lang.flag}</span>
          <span>{lang.name}</span>
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;