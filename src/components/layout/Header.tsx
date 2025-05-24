
"use client";

import Link from 'next/link';
import { Home, Search, Heart, MessageSquare, User, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4 14v5.5c0 1.381 2.619 2.5 6 2.5h4c3.381 0 6-1.119 6-2.5V14L12 9.5zM6 15.5V18c0 .828 2.015 1.5 4.5 1.5h.5V15L6 15.5zm12 0V18c0 .828-2.015 1.5-4.5 1.5h-.5V15L18 15.5z"/>
          </svg>
          <span className="font-bold text-xl">Tenant Haven</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60"
              )}
            >
              <item.icon className="inline-block h-4 w-4 mr-1 mb-0.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="p-4">
                <Link href="/" className="flex items-center gap-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
                    <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4 14v5.5c0 1.381 2.619 2.5 6 2.5h4c3.381 0 6-1.119 6-2.5V14L12 9.5zM6 15.5V18c0 .828 2.015 1.5 4.5 1.5h.5V15L6 15.5zm12 0V18c0 .828-2.015 1.5-4.5 1.5h-.5V15L18 15.5z"/>
                  </svg>
                  <span className="font-bold text-lg">Tenant Haven</span>
                </Link>
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg transition-colors hover:text-foreground/80 py-2 px-2 rounded-md hover:bg-muted",
                        pathname === item.href ? "text-primary font-semibold bg-muted" : "text-foreground/80"
                      )}
                    >
                      <item.icon className="inline-block h-5 w-5 mr-2 mb-0.5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
