import type { Metadata } from 'next';
import { AboutMarketingPage } from '~/components/widgets/LocalizedMarketingPages';

export const metadata: Metadata = { title: 'About Asianode' };

export default function Page() {
  return <AboutMarketingPage />;
}
