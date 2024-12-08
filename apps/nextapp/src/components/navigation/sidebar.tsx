/* apps/nextapp/src/components/layouts/sidebar.tsx */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from '../themes/theme-toggle';
import {
  Home as HomeIcon,
  FileText,
  StickyNote,
  Layout,
  User,
  LogOut,
} from 'lucide-react';

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

  // Main nav items (top)
  const navItems = [
    { name: 'Home', href: '/home', icon: HomeIcon },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Notes', href: '/notes', icon: StickyNote },
    { name: 'Projects', href: '/projects', icon: Layout },
  ];

  return (
    <aside
      className={`flex flex-col justify-between h-screen w-64 bg-secondary text-secondary-foreground p-4 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2 rounded-md py-2 px-2 text-sm transition-colors 
                  ${isActive ? 'bg-muted/20 font-semibold' : ''}
                  hover:bg-muted/10 hover:text-foreground hover:font-medium hover:text-base`}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section: Profile, Theme Toggle, and Logout */}
      <div className="mt-4 border-t border-border pt-4 flex items-center justify-between">
        {/* Profile Link */}
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-2 rounded-md py-2 px-2 text-sm text-foreground transition-colors
          hover:bg-muted/10 hover:text-foreground hover:font-medium hover:text-base"
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Logout Button (only if session is present) */}
        {session && (
          <button
            onClick={handleLogout}
            className="ml-2 flex items-center gap-1 rounded-md py-2 px-3 text-sm text-foreground transition-colors 
            hover:bg-muted/10 hover:text-foreground hover:font-medium"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
}
