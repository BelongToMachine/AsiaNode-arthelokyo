'use client';

import { footerData2 } from '~/shared/data/global.data';
import CookiePreferencesButton from '~/components/widgets/CookiePreferencesButton';
import { useLanguage } from '~/components/atoms/LanguageProvider';
import { localizeContent } from '~/shared/data/locale-content';

const Footer2 = () => {
  const { links, columns, socials } = footerData2;
  const { messages, locale, withLocale } = useLanguage();
  const footerLabels: Record<string, string> = {
    Headquarters: messages.footer.headquarters,
    'For brands': messages.footer.forBrands,
    'Start a conversation': messages.footer.startConversation,
    'Terms & Conditions': messages.footer.terms,
    'Privacy Policy': messages.footer.privacy,
  };
  const localize = (label?: string) => (label ? footerLabels[label] ?? label : '');
  const localizeText = (text: string) => localizeContent(text, locale);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="xs:gap-8 grid grid-cols-4 gap-4 gap-y-8 py-8 md:py-12">
        {columns.map(({ title, texts }, index) => (
          <div
            key={`item-column-${index}`}
            className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1"
          >
            <div className="mb-2 font-medium text-gray-800 dark:text-gray-300">{localize(title)}</div>
            {texts &&
              texts.map((text, index2) => (
                <p key={`item-text-${index2}`} className="text-gray-600 dark:text-slate-400">
                  {localizeText(text)}
                </p>
              ))}
          </div>
        ))}
        <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
          <div className="mb-2 font-medium text-gray-800 dark:text-gray-300">{messages.footer.social}</div>
          <ul className="mb-4 -ml-2 rtl:ml-0 rtl:-mr-2 flex md:order-1 md:mb-0">
            {socials.map(({ label, icon: Icon, href }, index) => (
              <li key={`item-social-${index}`}>
                <a
                  className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  aria-label={label}
                  href={withLocale(href ?? '')}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-muted py-6 text-sm text-gray-700 dark:text-slate-400 md:flex md:items-center md:justify-between md:py-8">
        <ul className="mb-4 flex pl-2 rtl:pl-0 rtl:pr-2 md:order-1 md:mb-0">
          {links &&
            links.map(({ label, href }, index) => (
              <li key={`item-link-${index}`}>
                <a
                  className="duration-150 ease-in-out placeholder:transition hover:text-gray-700 hover:underline dark:text-gray-400"
                  aria-label={label}
                  href={withLocale(href ?? '')}
                >
                  {localize(label)}
                </a>
                {links.length - 1 !== index && <span className="mr-1 rtl:mr-0 rtl:ml-1"> · </span>}
              </li>
            ))}
          <li>
            <span className="mr-1 rtl:mr-0 rtl:ml-1"> · </span>
            <CookiePreferencesButton />
          </li>
        </ul>
        <div className="mr-4 text-sm">© {new Date().getFullYear()} Asianode Limited Şirketi. {messages.footer.copyright}</div>
      </div>
    </div>
  );
};

export default Footer2;
