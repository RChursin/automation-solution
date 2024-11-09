// apps/nextapp/src/components/layouts/sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Beer, Code, FolderKanban, BookOpen, X, StickyNote, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { ThemeToggle } from '../../components/themes/theme-toggle';
import { useSession, signOut } from 'next-auth/react';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Home;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Notes', href: '/notes', icon: StickyNote },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: true, 
        callbackUrl: '/login'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Card className={cn(
      "fixed left-0 top-0 z-40 h-screen w-[280px] rounded-none border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-full flex-col px-4 py-8">
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 lg:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close sidebar</span>
        </Button>

        {/* Logo - explicitly using forward slash for root */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 text-foreground',
              pathname === '/' && 'text-primary',
            )}
          >
            <Code className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold">The Source Build</span>
          </Link>
          <ThemeToggle />
        </div>

        <Separator className="my-4" />

        {/* User Info */}
        {session?.user && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Signed in as: {session.user.username}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map(item => {
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'justify-start gap-2 h-10 px-3',
                  isActive && 'bg-primary text-primary-foreground',
                  'hover:bg-primary/90 hover:text-primary-foreground'
                )}
                onClick={() => {
                  if (onClose && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              className="justify-start gap-2 h-10 px-3 w-full hover:bg-primary/90 hover:text-primary-foreground" 
              asChild
            >
              <Link href="/profile">
                <Beer className="h-4 w-4" />
                <span className="text-sm">Add something</span>
              </Link>
            </Button>

            {status === 'authenticated' && (
              <Button
                variant="ghost"
                className="justify-start gap-2 h-10 px-3 w-full hover:bg-destructive/90 hover:text-destructive-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign out</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}