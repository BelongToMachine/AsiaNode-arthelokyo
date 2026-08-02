import type { Metadata } from 'next';

import { FaqMarketingPage } from '~/components/widgets/LocalizedMarketingPages';

export const metadata: Metadata = {
  title: 'FAQs',
};

const Page = () => {
  return <FaqMarketingPage />;
};

export default Page;
