import type { Metadata } from 'next';
import QuotePage from '~/components/widgets/QuotePageServer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hizmet Teklifi',
  description: 'Türkiye pazarına açılan markalar için IT ve operasyon hizmet kataloğu.',
};

export default function TurkishQuotePage() {
  return <QuotePage />;
}
