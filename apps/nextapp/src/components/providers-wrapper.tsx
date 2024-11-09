// apps/nextapp/src/components/providers-wrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './themes/theme-provider';
import { useState, useEffect } from 'react';

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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