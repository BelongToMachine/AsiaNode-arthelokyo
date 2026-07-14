import { FAQsProps, HeroProps } from '~/shared/types';
import { asianodeFaqs } from '../asianode-knowledge';

export const heroFaqs: HeroProps = {
  title: 'Questions about growing in Türkiye?',
  subtitle: 'Explore Asianode’s published guidance or ask our AI advisor for a practical starting point.',
  tagline: 'Asianode knowledge',
};

// Kept as a Storybook fixture for the reusable FAQs4 widget.
export const faqs4Faqs: FAQsProps = {
  id: 'asianode-faqs-story',
  tabs: [
    {
      link: { label: 'Asianode knowledge', href: '#asianode-knowledge' },
      items: [...asianodeFaqs],
    },
  ],
};
