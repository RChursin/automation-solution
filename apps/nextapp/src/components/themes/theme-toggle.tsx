/* apps/nextapp/src/components/themes/theme-toggle.tsx */
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wait until after hydration

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors
        ${isDark ? 'bg-gray-700' : 'bg-gray-300'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isDark ? 'translate-x-5' : 'translate-x-1'}
        `}
      />
    </button>
  );
}