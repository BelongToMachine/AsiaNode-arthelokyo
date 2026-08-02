'use client';

import { useLanguage } from '~/components/atoms/LanguageProvider';
import { localizeContent } from '~/shared/data/locale-content';
import { callToAction2Home, contactHome, contentHomeOne, contentHomeTwo, faqs2Home, featuresHome, heroHome, stepsHome, teamHome } from '~/shared/data/pages/home.data';
import Hero from '~/components/widgets/Hero';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Steps from '~/components/widgets/Steps';
import FAQs2 from '~/components/widgets/FAQs2';
import Contact from '~/components/widgets/Contact';
import CallToAction2 from '~/components/widgets/CallToAction2';
import Team from '~/components/widgets/Team';
import FaqAdvisor from '~/components/widgets/FaqAdvisor';
import { heroFaqs } from '~/shared/data/pages/faqs.data';

export const HomeMarketingPage = () => {
  const { locale } = useLanguage();
  return (
    <>
      <Hero {...localizeContent(heroHome, locale)} />
      <Features {...localizeContent(featuresHome, locale)} />
      <Content {...localizeContent(contentHomeOne, locale)} />
      <Content {...localizeContent(contentHomeTwo, locale)} />
      <Steps {...localizeContent(stepsHome, locale)} />
      <FAQs2 {...localizeContent(faqs2Home, locale)} />
      <Team {...localizeContent(teamHome, locale)} />
      <Contact {...localizeContent(contactHome, locale)} />
      <CallToAction2 {...localizeContent(callToAction2Home, locale)} />
    </>
  );
};

export const AboutMarketingPage = () => {
  const { locale } = useLanguage();
  const hero = localizeContent({
    tagline: 'About Asianode', title: 'A locally rooted partner for global ambition.',
    subtitle: 'Asianode is a Türkiye-based digital business organisation connecting brands, creators, and channels to build sustainable local growth.',
    callToAction: { text: 'Start a conversation', href: '/contact' },
  }, locale);
  return <><Hero {...hero} /><Features {...localizeContent(featuresHome, locale)} /><Content {...localizeContent(contentHomeOne, locale)} /><Content {...localizeContent(contentHomeTwo, locale)} /><Steps {...localizeContent(stepsHome, locale)} /></>;
};

export const ContactMarketingPage = () => {
  const { locale } = useLanguage();
  const hero = localizeContent({
    tagline: 'Brand partnerships', title: 'Make Türkiye your next growth story.',
    subtitle: 'Share your business objective with Asianode. We will help identify the most relevant route into the market.',
  }, locale);
  return <><Hero {...hero} /><Contact {...localizeContent(contactHome, locale)} /></>;
};

export const FaqMarketingPage = () => {
  const { locale } = useLanguage();
  return <><Hero {...localizeContent(heroFaqs, locale)} /><FaqAdvisor /></>;
};
