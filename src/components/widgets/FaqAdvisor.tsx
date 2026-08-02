'use client';

import { IconChevronDown, IconChevronUp, IconMessageCircle2 } from '@tabler/icons-react';
import { useState } from 'react';

import { asianodeFaqs } from '~/shared/data/asianode-knowledge';
import { useLanguage } from '~/components/atoms/LanguageProvider';
import { localizeContent } from '~/shared/data/locale-content';

export default function FaqAdvisor() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLanguage();
  const t = (value: string) => localizeContent(value, locale);
  const faqs = localizeContent(asianodeFaqs, locale);

  return (
    <section className="bg-stone-50 py-16 dark:bg-slate-950 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            {t('Asianode knowledge')}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {t('Find an answer your way.')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t('Browse our published answers or ask a question when you need a more specific starting point.')}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-asianode-advisor'))}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200"
          >
            <IconMessageCircle2 className="h-4 w-4" aria-hidden="true" /> {t('Ask Asianode')}
          </button>
        </div>

        <div className="mt-10">
          <div className="mx-auto max-w-3xl divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-700 dark:border-slate-700">
            {faqs.map((item, index) => {
              const isOpen = index === openIndex;

              return (
                <div key={item.title}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-slate-900 dark:text-white">{item.title}</span>
                    {isOpen ? (
                      <IconChevronUp className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
                    ) : (
                      <IconChevronDown className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-6 leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
