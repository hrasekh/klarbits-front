// src/components/LanguageSelector.jsx
"use client";

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    >
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
      <option value="fa">فارسی</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSelector;