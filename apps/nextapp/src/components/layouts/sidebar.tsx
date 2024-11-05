'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Beer, PinIcon, FolderKanban, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { ThemeToggle } from '../../components/themes/theme-toggle';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Home;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Blog', href: '/blog', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="fixed left-0 top-0 z-40 h-screen w-64 rounded-none border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col px-4 py-8">
        {/* Logo - explicitly using forward slash for root */}
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 text-foreground',
            pathname === '/' && 'text-primary',
          )}
        >
          <PinIcon className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold">Cyber Junk1e</span>
        </Link>

        <Separator className="my-4" />

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map(item => {
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'justify-start gap-2',
                  isActive && 'bg-primary text-primary-foreground',
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/profile">
                <Beer className="h-4 w-4" />
                Add something
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Card>
  );
}
