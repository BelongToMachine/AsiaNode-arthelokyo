import {
  IconBrandTiktok,
  IconBrandLinkedin,
  IconChartArrowsVertical,
  IconMapPin,
  IconMail,
  IconMessages,
  IconNetwork,
  IconRocket,
  IconShieldCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import {
  CallToActionProps,
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  PricingProps,
  SocialProofProps,
  StepsProps,
  TeamProps,
  TestimonialsProps,
} from '../../types';
import istanbulHeroImg from '~/assets/images/istanbul-hero.png';
import cameraFrontImg from '~/assets/images/camera-front.jpg';
import cameraBackImg from '~/assets/images/camera-back.jpg';
import gasImg from '~/assets/images/gas.jpg';
import nextJsLogo from '~/assets/images/nextjs-logo.png';
import reactLogo from '~/assets/images/react-logo.png';
import tailwindCssLogo from '~/assets/images/tailwind-css-logo.png';
import typescriptLogo from '~/assets/images/typescript-logo.png';

export const heroHome: HeroProps = {
  tagline: 'Türkiye growth partner',
  title: 'Turn local relevance into lasting growth.',
  subtitle:
    'Asianode helps global brands build meaningful creator partnerships, activate social commerce, and execute confidently in Türkiye.',
  callToAction: { text: 'Discuss a partnership', href: '/contact' },
  callToAction2: { text: 'Explore our services', href: '#services' },
  image: {
    src: istanbulHeroImg,
    alt: 'Istanbul waterfront at sunset',
  },
  isImageBackground: true,
};

export const featuresHome: FeaturesProps = {
  id: 'services',
  hasBackground: true,
  columns: 3,
  header: {
    tagline: 'What we do',
    title: 'One local partner. A connected growth system.',
    subtitle:
      'We connect brands, creators, channels, and market knowledge to make expansion in Türkiye more considered and more effective.',
  },
  items: [
    {
      title: 'Creator partnerships',
      description: 'Build relevant influencer ecosystems, from creator selection and briefing to campaign delivery.',
      icon: IconUsersGroup,
    },
    {
      title: 'TikTok and social commerce',
      description: 'Turn short-form content and community attention into measurable product discovery and demand.',
      icon: IconBrandTiktok,
    },
    {
      title: 'Local market activation',
      description: 'Adapt your brand strategy for Türkiye with locally informed content, media, and operations.',
      icon: IconMapPin,
    },
    {
      title: 'Channel development',
      description: 'Connect online demand with e-commerce direction, retail execution, and channel distribution.',
      icon: IconNetwork,
    },
    {
      title: 'Campaign optimisation',
      description: 'Use performance signals to improve creative, investment, and conversion throughout a campaign.',
      icon: IconChartArrowsVertical,
    },
    {
      title: 'Local compliance support',
      description: 'Move with greater confidence through the practical requirements of operating in a new market.',
      icon: IconShieldCheck,
    },
  ],
};

export const socialProofHome: SocialProofProps = {
  id: 'social-proof-on-home',
  hasBackground: false,
  images: [
    { link: 'https://nextjs.org/', src: nextJsLogo, alt: 'Next.js logo' },
    { link: 'https://react.dev/', src: reactLogo, alt: 'React logo' },
    { link: 'https://tailwindcss.com/', src: tailwindCssLogo, alt: 'Tailwind CSS logo' },
    { link: 'https://www.typescriptlang.org/', src: typescriptLogo, alt: 'TypeScript logo' },
  ],
};

export const contentHomeOne: ContentProps = {
  id: 'brands',
  hasBackground: false,
  header: {
    tagline: 'For brands',
    title: 'A practical route into Türkiye.',
    subtitle: 'Bring your global ambition. We bring the local context and execution to make it move.',
  },
  content:
    'Asianode supports brands across the full path from attention to action: content management, creator collaborations, paid-media optimisation, online commerce direction, offline retail support, and local market coordination.',
  items: [
    { title: 'Build a locally relevant brand presence', description: 'Develop content and partnerships that feel native to the market.' },
    { title: 'Connect influence to commercial results', description: 'Coordinate discovery, conversion, and channel activity rather than treating them as separate initiatives.' },
    { title: 'Operate with a local team', description: 'Gain a dependable partner for day-to-day market execution and collaboration.' },
  ],
  image: { src: cameraFrontImg, alt: 'Asianode market activation' },
};

export const contentHomeTwo: ContentProps = {
  id: 'creators',
  hasBackground: true,
  header: {
    tagline: 'For creators',
    title: 'Better collaborations begin with stronger creator support.',
  },
  content:
    'We help local creators develop the foundations for sustainable commercial work, so brands can collaborate with well-supported, thoughtfully matched partners.',
  items: [
    { title: 'Content and scenario guidance' },
    { title: 'Campaign workflow support' },
    { title: 'Long-term account planning' },
    { title: 'Commercial opportunity development' },
  ],
  isReversed: true,
  image: { src: cameraBackImg, alt: 'Asianode creator collaboration' },
};

export const stepsHome: StepsProps = {
  id: 'approach',
  hasBackground: false,
  isImageDisplayed: true,
  image: { src: gasImg, alt: 'Asianode partnership process' },
  header: {
    tagline: 'How we work',
    title: 'Built around your business objective—not a preset package.',
    subtitle: 'Every engagement begins with the market question your brand needs to answer.',
  },
  items: [
    { title: 'Align on the opportunity', description: 'We clarify your market, audience, objectives, and constraints.' },
    { title: 'Design the local plan', description: 'We shape the right combination of creators, content, commerce, and channels.' },
    { title: 'Activate with care', description: 'We coordinate execution locally and keep the work moving across partners.' },
    { title: 'Learn and grow', description: 'We use outcomes to strengthen the next phase of the partnership.' },
  ],
};

export const faqs2Home: FAQsProps = {
  id: 'faqs',
  hasBackground: true,
  header: {
    tagline: 'FAQ',
    title: 'Questions brands often ask.',
  },
  items: [
    {
      title: 'Which brands does Asianode work with?',
      description: 'We work with brands looking to enter, strengthen, or activate their presence in Türkiye through locally grounded growth initiatives.',
    },
    {
      title: 'Can you support both creator marketing and commercial channels?',
      description: 'Yes. Our approach connects creator partnerships, content, paid-media optimisation, online commerce direction, and offline channel activity.',
    },
    {
      title: 'How do we start?',
      description: 'Start with a conversation about your category, goals, timeline, and existing market presence. We will then identify the most useful next step together.',
    },
    {
      title: 'Do you support market entry as well as existing operations?',
      description: 'Yes. We can support brands that are preparing to enter Türkiye as well as those seeking to strengthen an established local presence.',
    },
    {
      title: 'Can Asianode work alongside our current agencies and teams?',
      description: 'Yes. We can work as a locally connected partner alongside your internal team, agencies, creators, and channel partners.',
    },
    {
      title: 'What should we include in an initial enquiry?',
      description: 'Please share your category, target audience, current market position, desired outcome, and timeline so we can prepare for a useful first conversation.',
    },
  ],
};

// Placeholder profiles retained from the original template. Replace these with
// verified Asianode team details before publishing them as company information.
export const teamHome: TeamProps = {
  id: 'team',
  hasBackground: false,
  header: {
    tagline: 'Our people',
    title: 'Meet the team',
    subtitle: 'Placeholder profiles for the team section. Verified Asianode team information will be added here.',
  },
  teams: [
    {
      name: 'Cindy Belcher',
      occupation: 'SEO Consultant',
      image: { src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?auto=format&fit=crop&w=1180&q=80', alt: 'Placeholder team member' },
      items: [
        { title: 'LinkedIn profile', icon: IconBrandLinkedin, href: '#' },
        { title: 'Contact by email', icon: IconMail, href: '#' },
      ],
    },
    {
      name: 'Toby Foster',
      occupation: 'Marketing Tech',
      image: { src: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?auto=format&fit=crop&w=2172&q=80', alt: 'Placeholder team member' },
      items: [
        { title: 'LinkedIn profile', icon: IconBrandLinkedin, href: '#' },
        { title: 'Contact by email', icon: IconMail, href: '#' },
      ],
    },
    {
      name: 'Clark Bourne',
      occupation: 'Content Manager',
      image: { src: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?auto=format&fit=crop&w=1674&q=80', alt: 'Placeholder team member' },
      items: [
        { title: 'LinkedIn profile', icon: IconBrandLinkedin, href: '#' },
        { title: 'Contact by email', icon: IconMail, href: '#' },
      ],
    },
    {
      name: 'Bella Chase',
      occupation: 'UX Designer',
      image: { src: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?auto=format&fit=crop&w=1674&q=80', alt: 'Placeholder team member' },
      items: [
        { title: 'LinkedIn profile', icon: IconBrandLinkedin, href: '#' },
        { title: 'Contact by email', icon: IconMail, href: '#' },
      ],
    },
  ],
};

export const contactHome: ContactProps = {
  id: 'contact',
  hasBackground: false,
  header: {
    tagline: 'Brand partnerships',
    title: 'Let’s discuss your Türkiye opportunity.',
    subtitle: 'Tell us where you are today and what you want to build next.',
  },
  content: 'Asianode is headquartered in Istanbul and works with brands looking for a capable, locally connected growth partner.',
  items: [
    { title: 'Based in', description: 'Istanbul, Türkiye', icon: IconMapPin },
    { title: 'Partnership focus', description: 'Creator economy, social commerce, and cross-border growth', icon: IconRocket },
    { title: 'Start here', description: 'Share your brand, market objective, and preferred contact details.', icon: IconMessages },
  ],
  form: {
    title: 'Start a brand conversation',
    inputs: [
      { type: 'text', name: 'name', autocomplete: 'name', placeholder: 'Your name' },
      { type: 'email', name: 'email', autocomplete: 'email', placeholder: 'Work email address' },
    ],
    textarea: { cols: 30, rows: 5, name: 'message', placeholder: 'Tell us about your brand and goals.' },
    btn: { title: 'Send enquiry', type: 'submit' },
  },
};

export const callToAction2Home: CallToActionProps = {
  title: 'Ready to explore Türkiye with a local partner?',
  subtitle: 'Bring us your next market question. We will help you turn it into a focused, executable plan.',
  callToAction: { text: 'Contact Asianode', href: '/contact' },
  items: [
    { title: 'Creator partnerships', description: 'Find the right local voices for your brand.', href: '/contact' },
    { title: 'Market activation', description: 'Connect your strategy to local execution.', href: '/contact' },
    { title: 'Business enquiry', description: 'Start a direct partnership conversation.', href: '/contact' },
  ],
};

// Retained only as minimal Storybook fixtures. These sections are intentionally
// not rendered on the Asianode marketing site until verified company data exists.
export const pricingHome: PricingProps = { id: 'pricing-story', prices: [] };
export const testimonialsHome: TestimonialsProps = { id: 'testimonials-story', testimonials: [] };
