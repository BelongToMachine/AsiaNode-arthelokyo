import {
  IconBrandLinkedin,
} from '@tabler/icons-react';
import { AnnouncementProps, FooterProps, HeaderProps } from '../types';

// Announcement data
export const announcementData: AnnouncementProps = {
  title: 'ASIANODE',
  callToAction: {
    text: 'Building meaningful growth partnerships in Türkiye.',
    href: '/contact',
  },
};

// Header data
export const headerData: HeaderProps = {
  links: [
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  actions: [
    {
      text: 'Start a conversation',
      href: '/contact',
    },
  ],
  isSticky: true,
  showToggleTheme: true,
  showRssFeed: false,
  position: 'right',
};

// Footer data
export const footerData: FooterProps = {
  title: 'Asianode',
  links: [
    {
      label: 'Terms & Conditions',
      href: '/terms',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
  ],
  columns: [
    {
      title: 'Services',
      links: [
        {
          label: 'Creator partnerships',
          href: '/services',
        },
        {
          label: 'Social commerce',
          href: '/services',
        },
        {
          label: 'Channel development',
          href: '/services',
        },
        {
          label: 'Local operations',
          href: '/services',
        },
        {
          label: 'Brand partnerships',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          label: 'About Asianode',
          href: '/about',
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/company/asianode-limited-sirketi/',
        },
      ],
    },
    {
      title: 'Contact',
      links: [
        {
          label: 'Start a conversation',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          label: 'Privacy policy',
          href: '/privacy',
        },
      ],
    },
  ],
  socials: [
    { label: 'LinkedIn', icon: IconBrandLinkedin, href: 'https://www.linkedin.com/company/asianode-limited-sirketi/' },
  ],
  footNote: (
    <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm">
      <span>
        © {new Date().getFullYear()} Asianode Limited Şirketi. All rights reserved.
      </span>
    </div>
  ),
};

// Footer2 data
export const footerData2: FooterProps = {
  links: [
    {
      label: 'Terms & Conditions',
      href: '/terms',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
  ],
  columns: [
    {
      title: 'Headquarters',
      texts: ['Istanbul, Türkiye'],
    },
    {
      title: 'For brands',
      texts: ['Tell us about your market and growth goals.'],
    },
    {
      title: 'Start a conversation',
      texts: ['Use our contact form to reach the Asianode team.'],
    },
  ],
  socials: [
    { label: 'LinkedIn', icon: IconBrandLinkedin, href: 'https://www.linkedin.com/company/asianode-limited-sirketi/' },
  ],
  footNote: (
    <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm">
      <span>
        © {new Date().getFullYear()} Asianode Limited Şirketi. All rights reserved.
      </span>
    </div>
  ),
};
