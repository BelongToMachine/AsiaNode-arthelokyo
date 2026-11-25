import type { Metadata } from 'next';
import QuotePage from '~/components/widgets/QuotePageServer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '服务报价',
  description: 'Asianode 面向中国品牌出海土耳其的 IT 技术与运营服务目录。',
};

export default function ChineseQuotePage() {
  return <QuotePage />;
}
