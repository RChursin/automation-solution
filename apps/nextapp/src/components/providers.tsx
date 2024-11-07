// apps/nextapp/src/components/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './themes/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem 
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}