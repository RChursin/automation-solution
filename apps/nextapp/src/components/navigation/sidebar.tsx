/* apps/nextapp/src/components/layouts/sidebar.tsx */

'use client';

import styles from './sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from '../themes/theme-toggle'; // Import your next-themes toggle

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Blog', href: '/blog' },
    { name: 'Notes', href: '/notes' },
    { name: 'Profile', href: '/profile' },
    { name: 'Projects', href: '/projects' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.activeLink : ''}
                onClick={onClose} 
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {session && (
        <button onClick={handleLogout} className={styles.themeToggle}>
          Logout
        </button>
      )}

      {/* Use ThemeToggle from next-themes */}
      <ThemeToggle />
    </aside>
  );
}
