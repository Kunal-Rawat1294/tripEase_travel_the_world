'use client';

import Link from 'next/link';
import { Plane, Instagram, Linkedin, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-headline text-2xl font-semibold">TripEase</span>
            </Link>
            <p className="text-muted-foreground">Discover your next adventure with ease.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://x.com/rawat_kuna22459" className="text-muted-foreground hover:text-primary transition-colors"><XIcon /></Link>
              <Link href="https://www.instagram.com/rawatkunal1294/" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
              <Link href="https://www.linkedin.com/in/kunal-rawat-338646314/" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-muted-foreground text-sm">
          <p>&copy; {year} TripEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
