'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'asianode-cookie-consent';
const OPEN_PREFERENCES_EVENT = 'asianode:open-cookie-preferences';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(CONSENT_KEY) === null);

    const openPreferences = () => setIsVisible(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);

    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  const savePreference = (preference: 'accepted' | 'rejected') => {
    window.localStorage.setItem(CONSENT_KEY, preference);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-labelledby="cookie-notice-title"
      aria-modal="false"
      role="dialog"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl border border-stone-200 bg-stone-50 p-5 shadow-[0_18px_45px_rgba(57,48,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:bottom-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p id="cookie-notice-title" className="text-sm font-semibold tracking-wide text-stone-900 dark:text-slate-100">
            Your privacy matters
          </p>
          <p className="mt-1.5 text-sm leading-6 text-stone-600 dark:text-slate-300">
            We use essential cookies to provide site features. Optional cookies are only used with your permission. Read our{' '}
            <Link className="underline decoration-stone-400 underline-offset-4 hover:text-stone-950 dark:hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button
            className="inline-flex items-center justify-center border border-stone-900 bg-transparent px-4 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:border-stone-100 dark:text-stone-100 dark:hover:bg-slate-800 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-slate-900"
            onClick={() => savePreference('rejected')}
            type="button"
          >
            Reject all
          </button>
          <button
            className="inline-flex items-center justify-center border border-stone-900 bg-stone-900 px-4 py-3 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-slate-900"
            onClick={() => savePreference('accepted')}
            type="button"
          >
            Accept all
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsent;
