// apps/nextapp/src/app/layout.tsx
import { monoid } from '../../src/app/fonts';
import { RootLayout } from '../components/layouts/root-layout';
import { ThemeProvider } from '../components/themes/theme-provider';
import { SessionProvider } from 'next-auth/react';
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={monoid.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem 
            disableTransitionOnChange
          >
            <RootLayout>{children}</RootLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}