'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '~/components/atoms/LanguageProvider';

export interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <LanguageProvider>{children}</LanguageProvider>
  </ThemeProvider>
);

export default Providers;
