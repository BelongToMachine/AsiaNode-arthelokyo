import type { Metadata } from 'next';

import FaqAdvisor from '~/components/widgets/FaqAdvisor';
import { heroFaqs } from '~/shared/data/pages/faqs.data';
import Hero from '~/components/widgets/Hero';

export const metadata: Metadata = {
  title: 'FAQs',
};

const Page = () => {
  return (
    <>
      <Hero {...heroFaqs} />
      <FaqAdvisor />
    </>
  );
};

export default Page;
