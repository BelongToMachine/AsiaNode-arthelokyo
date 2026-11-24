export const supportedLocales = ['en', 'zh', 'tr'] as const;

export type Locale = (typeof supportedLocales)[number];

export const localePreferenceCookie = 'asianode_locale';

export const isLocale = (value: string | undefined): value is Locale =>
  supportedLocales.includes(value as Locale);

export const localeFromPath = (path: string): Locale =>
  path === '/zh' || path.startsWith('/zh/') ? 'zh' : path === '/tr' || path.startsWith('/tr/') ? 'tr' : 'en';

export const localeFromAcceptLanguage = (header: string | null): Locale => {
  if (!header) return 'en';

  const preferences = header
    .split(',')
    .map((entry, index) => {
      const [tag, ...parameters] = entry.trim().split(';');
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      const language = tag.trim().toLowerCase().split('-')[0];

      return { language, quality, index };
    })
    .filter(({ language, quality }) => isLocale(language) && quality > 0 && quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const preferredLocale = preferences[0]?.language;
  return isLocale(preferredLocale) ? preferredLocale : 'en';
};
