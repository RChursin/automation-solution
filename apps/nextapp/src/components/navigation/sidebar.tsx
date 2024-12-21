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

import Image from 'next/image';
import { Button } from '../ui/button/button';
import { Separator } from '../ui/separator';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // You can fetch user info from session or use placeholders
  const userName = session?.user?.username ?? 'John Doe';
  const userImage = session?.user?.image ?? '/sakura.png';

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error(error);
    }
  };

  // Main nav items
  const navItems = [
    { name: 'Home', href: '/home', icon: HomeIcon },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Notes', href: '/notes', icon: StickyNote },
    { name: 'Projects', href: '/projects', icon: Layout },
  ];

  return (
    <aside
      className={`flex flex-col h-screen w-64 bg-secondary text-secondary-foreground transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* TOP: Avatar, Name, Theme Toggle in one row */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left side: bigger avatar & name */}
          <div className="flex items-center gap-2">
            <Image
              src={userImage}
              alt={userName}
              width={48}   // bigger avatar
              height={48}
              className="rounded-full"
            />
            <span className="text-base font-semibold">{userName}</span>
          </div>

          {/* Right side: Theme Toggle Switch */}
          <ThemeToggle />
        </div>
      </div>

      <Separator className="my-2" />

      {/* MIDDLE: Navigation Buttons */}
      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Button
                  variant="sidebar"
                  asChild
                  className={isActive ? 'bg-muted/20 font-semibold' : ''}
                >
                  <Link href={item.href} onClick={onClose}>
                    <div className="flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator className="my-2" />

      {/* BOTTOM: Profile + Logout */}
      <div className="p-4 space-y-2">
        {session && (
          <>
            {/* Profile button */}
            <Button
              variant="sidebar"
              asChild
              className="flex w-full items-center gap-2"
            >
              <Link href="/profile">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </div>
              </Link>
            </Button>

            {/* Logout button */}
            <Button
              variant="sidebar"
              onClick={handleLogout}
              className="flex w-full items-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}