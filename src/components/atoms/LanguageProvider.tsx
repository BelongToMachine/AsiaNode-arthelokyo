'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

export type Locale = 'en' | 'zh' | 'tr';

type Messages = {
  language: { label: string; en: string; zh: string; tr: string };
  navigation: { faqs: string; about: string; contact: string; startConversation: string };
  footer: {
    headquarters: string;
    forBrands: string;
    startConversation: string;
    social: string;
    terms: string;
    privacy: string;
    copyright: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    language: { label: 'Language', en: 'English', zh: '中文', tr: 'Türkçe' },
    navigation: { faqs: 'FAQs', about: 'About', contact: 'Contact', startConversation: 'Start a conversation' },
    footer: {
      headquarters: 'Headquarters',
      forBrands: 'For brands',
      startConversation: 'Start a conversation',
      social: 'Social',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      copyright: 'All rights reserved.',
    },
  },
  zh: {
    language: { label: '语言', en: 'English', zh: '中文', tr: 'Türkçe' },
    navigation: { faqs: '常见问题', about: '关于我们', contact: '联系我们', startConversation: '开启对话' },
    footer: {
      headquarters: '总部',
      forBrands: '品牌合作',
      startConversation: '开启对话',
      social: '社交媒体',
      terms: '条款与条件',
      privacy: '隐私政策',
      copyright: '版权所有。',
    },
  },
  tr: {
    language: { label: 'Dil', en: 'English', zh: '中文', tr: 'Türkçe' },
    navigation: { faqs: 'SSS', about: 'Hakkımızda', contact: 'İletişim', startConversation: 'Görüşme başlatın' },
    footer: {
      headquarters: 'Merkez',
      forBrands: 'Markalar için',
      startConversation: 'Görüşme başlatın',
      social: 'Sosyal medya',
      terms: 'Şartlar ve Koşullar',
      privacy: 'Gizlilik Politikası',
      copyright: 'Tüm hakları saklıdır.',
    },
  },
};

type LanguageContextValue = {
  locale: Locale;
  pathForLocale: (locale: Locale) => string;
  withLocale: (href: string) => string;
  messages: Messages;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const stripLocalePrefix = (path: string) => path.replace(/^\/(zh|tr)(?=\/|$)/, '') || '/';
const localeFromPath = (path: string): Locale =>
  path === '/zh' || path.startsWith('/zh/') ? 'zh' : path === '/tr' || path.startsWith('/tr/') ? 'tr' : 'en';

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '/';
  const locale = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
  }, [locale]);

  const value = useMemo(() => {
    const currentPath = stripLocalePrefix(pathname);
    const prefix = (nextLocale: Locale, href: string) => (nextLocale === 'en' ? href : `/${nextLocale}${href === '/' ? '' : href}`);
    const withLocale = (href: string) => (!href.startsWith('/') || href.startsWith('//') ? href : prefix(locale, stripLocalePrefix(href)));
    return { locale, pathForLocale: (nextLocale: Locale) => prefix(nextLocale, currentPath), withLocale, messages: messages[locale] };
  }, [locale, pathname]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
