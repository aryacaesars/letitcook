import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Let <span className="text-orange-500">IT</span> Cook
          </Link>
        </div>
        <nav className="items-center hidden space-x-8 md:flex">
          <Link href="/" className="text-gray-600 transition-colors hover:text-orange-500">
            Home
          </Link>
          <Link href="/collection" className="text-gray-600 transition-colors hover:text-orange-500">
            Collection
          </Link>
          <Link href="/education" className="text-gray-600 transition-colors hover:text-orange-500">
            Education
          </Link>
          <Link href="/about" className="text-gray-600 transition-colors hover:text-orange-500">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 