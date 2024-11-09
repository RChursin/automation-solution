// apps/nextapp/src/app/layout.tsx
// app/layout.tsx (Root layout)
import { monoid } from '../app/fonts';
import { AuthProvider } from '../components/auth-provider';
import { ThemeProvider } from '../components/themes/theme-provider';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={monoid.variable}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem 
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}