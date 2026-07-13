import type { Metadata } from 'next';
import Content from '~/components/widgets/Content';
import Features from '~/components/widgets/Features';
import Hero from '~/components/widgets/Hero';
import Steps from '~/components/widgets/Steps';
import { contentHomeOne, contentHomeTwo, featuresHome, stepsHome } from '~/shared/data/pages/home.data';

export const metadata: Metadata = { title: 'About Asianode' };

const hero = {
  tagline: 'About Asianode',
  title: 'A locally rooted partner for global ambition.',
  subtitle:
    'Asianode is a Türkiye-based digital business organisation connecting brands, creators, and channels to build sustainable local growth.',
  callToAction: { text: 'Start a conversation', href: '/contact' },
};

export default function Page() {
  return (
    <>
      <Hero {...hero} />
      <Features {...featuresHome} />
      <Content {...contentHomeOne} />
      <Content {...contentHomeTwo} />
      <Steps {...stepsHome} />
    </>
  );
}
