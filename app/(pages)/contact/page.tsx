import type { Metadata } from 'next';
import { ContactMarketingPage } from '~/components/widgets/LocalizedMarketingPages';

export const metadata: Metadata = { title: 'Brand partnerships' };

export default function Page() {
  return <ContactMarketingPage />;
}
