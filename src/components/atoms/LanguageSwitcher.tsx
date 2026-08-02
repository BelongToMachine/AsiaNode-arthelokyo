'use client';

import { IconCheck, IconLanguage } from '@tabler/icons-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Locale, useLanguage } from '~/components/atoms/LanguageProvider';

const locales: Locale[] = ['en', 'zh', 'tr'];

const LanguageSwitcher = ({ isOnLandingPage = false }: { isOnLandingPage?: boolean }) => {
  const { locale, pathForLocale, messages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = `language-menu-${useId()}`;

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const buttonTone = isOnLandingPage ? 'text-white hover:bg-white/15 focus:ring-white/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-700';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={messages.language.label}
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${buttonTone}`}
      >
        <IconLanguage className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
      </button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={messages.language.label}
          className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {locales.map((option) => (
            <a
              key={option}
              role="menuitemradio"
              aria-checked={locale === option}
              href={pathForLocale(option)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-800 transition-colors hover:bg-amber-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {messages.language[option]}
              {locale === option && <IconCheck className="h-4 w-4 text-amber-600" aria-hidden="true" />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
