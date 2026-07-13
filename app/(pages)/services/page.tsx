import type { Metadata } from 'next';
import Content from '~/components/widgets/Content';
import Features from '~/components/widgets/Features';
import Hero from '~/components/widgets/Hero';
import Steps from '~/components/widgets/Steps';
import { contentHomeOne, contentHomeTwo, featuresHome, heroHome, stepsHome } from '~/shared/data/pages/home.data';

export const metadata: Metadata = { title: 'Services' };

export default function Page() {
  return (
    <>
      <Hero {...heroHome} />
      <Features {...featuresHome} />
      <Content {...contentHomeOne} />
      <Content {...contentHomeTwo} />
      <Steps {...stepsHome} />
    </>
  );
}
