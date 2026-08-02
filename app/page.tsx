import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import { HomeMarketingPage } from '~/components/widgets/LocalizedMarketingPages';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
  return (
    <HomeMarketingPage />
  );
}
