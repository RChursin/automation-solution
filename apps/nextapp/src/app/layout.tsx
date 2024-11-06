import { RootLayout } from '../components/layouts/root-layout';
import { ThemeProvider } from '../components/themes/theme-provider';
// import { Inter } from 'next/font/google';
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${inter.className} dark`}></body> */}
      <body className="dark">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

