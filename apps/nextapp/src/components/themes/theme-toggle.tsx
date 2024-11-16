// apps/nextapp/src/components/themes/theme-toggle.tsx
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react'; // Icons for light and dark themes
import { useTheme } from 'next-themes'; // Library for managing theme switching
import { Button } from '../../components/ui/button'; // Reusable Button component

/**
 * ThemeToggle Component
 * 
 * A toggle button that switches between light and dark themes.
 * It uses the `next-themes` library for theme management and dynamically updates the UI 
 * to reflect the current theme with appropriate icons.
 */
export function ThemeToggle() {
  // Access theme state and setter function from the `next-themes` hook
  const { theme, setTheme } = useTheme();

  // State to ensure the component is only rendered on the client side
  const [mounted, setMounted] = React.useState(false);

  /**
   * Ensures the component is mounted on the client before rendering.
   * This prevents hydration mismatches caused by server-rendered content.
   */
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until the component is mounted
  if (!mounted) return null;

  /**
   * Toggles the theme between light and dark modes.
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost" // Uses the ghost variant of the Button component for minimal styling
      size="icon" // Sets the Button size for an icon-only design
      onClick={toggleTheme} // Attach the toggleTheme function to the onClick event
      aria-label="Toggle theme" // Accessibility label for screen readers
    >
      {/* Render Moon icon for dark theme and Sun icon for light theme */}
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-blue-500" /> // Moon icon for dark theme
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" /> // Sun icon for light theme
      )}
    </Button>
  );
}