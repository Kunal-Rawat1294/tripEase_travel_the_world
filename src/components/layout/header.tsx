'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLinks = ({ className, isMobile = false }: { className?: string, isMobile?: boolean }) => (
    <nav className={cn('items-center gap-6 text-sm font-medium', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-foreground/60'
          )}
          onClick={() => isMobile && setSheetOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 h-20 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-semibold">TripEase</span>
        </Link>

        <NavLinks className="hidden md:flex" />

        <div className="flex items-center gap-4">
           <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost"><SignInButton mode="modal" /></Button>
              <Button asChild><SignUpButton mode="modal" /></Button>
            </div>
          </SignedOut>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className='flex flex-col items-center justify-center h-full gap-8'>
                <NavLinks className="flex flex-col gap-4" isMobile />
                <SignedOut>
                  <div className="w-full flex flex-col gap-2">
                    <Button asChild className='w-full'><SignInButton mode="modal" /></Button>
                    <Button asChild variant="outline" className='w-full'><SignUpButton mode="modal" /></Button>
                  </div>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
