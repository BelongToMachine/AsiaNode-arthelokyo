'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'asianode-cookie-consent';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(CONSENT_KEY) !== 'accepted');
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl border border-stone-200 bg-stone-50 p-5 shadow-[0_18px_45px_rgba(57,48,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:bottom-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-semibold tracking-wide text-stone-900 dark:text-slate-100">Your privacy matters</p>
          <p className="mt-1.5 text-sm leading-6 text-stone-600 dark:text-slate-300">
            We use cookies to remember your preferences and improve your experience. Read our{' '}
            <Link className="underline decoration-stone-400 underline-offset-4 hover:text-stone-950 dark:hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <button
          className="inline-flex shrink-0 items-center justify-center bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-slate-900"
          onClick={acceptCookies}
          type="button"
        >
          Accept cookies
        </button>
      </div>
    </aside>
  );
};

export default CookieConsent;
