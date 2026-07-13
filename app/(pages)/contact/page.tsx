import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import Hero from '~/components/widgets/Hero';
import { contactHome } from '~/shared/data/pages/home.data';

export const metadata: Metadata = { title: 'Brand partnerships' };

const hero = {
  tagline: 'Brand partnerships',
  title: 'Make Türkiye your next growth story.',
  subtitle:
    'Share your business objective with Asianode. We will help identify the most relevant route into the market.',
};

export default function Page() {
  return (
    <>
      <Hero {...hero} />
      <Contact {...contactHome} />
    </>
  );
}
