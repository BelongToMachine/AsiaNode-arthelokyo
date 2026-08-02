'use client';

import { IconMessageCircle2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import AsianodeChat from './AsianodeChat';
import { useLanguage } from '~/components/atoms/LanguageProvider';
import { localizeContent } from '~/shared/data/locale-content';

export default function FloatingAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLanguage();
  const t = (value: string) => localizeContent(value, locale);

  useEffect(() => {
    const openAdvisor = () => setIsOpen(true);
    window.addEventListener('open-asianode-advisor', openAdvisor);
    return () => window.removeEventListener('open-asianode-advisor', openAdvisor);
  }, []);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-300 dark:hover:bg-amber-200"
        aria-label={t('Open Asianode Advisor')}
      >
        <IconMessageCircle2 className="h-5 w-5" aria-hidden="true" />
        {t('Ask AI about Asianode')}
      </button>
    );
  }

  return (
    <div className="advisor-drawer-in fixed inset-y-3 right-3 z-50 w-[calc(100vw_-_1.5rem)] max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 motion-reduce:animate-none dark:border-slate-700 dark:bg-slate-900 sm:inset-y-5 sm:right-5 sm:w-[26rem]">
      <AsianodeChat embedded onClose={() => setIsOpen(false)} />
    </div>
  );
}
