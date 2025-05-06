"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Let <span className="text-orange-500">IT</span> Cook
          </Link>
        </div>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Hamburger Button */}
        <button 
          className="flex flex-col justify-center items-center md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-600 transition-colors hover:text-orange-500 px-2 py-1">
              Home
            </Link>
            <Link href="/collection" className="text-gray-600 transition-colors hover:text-orange-500 px-2 py-1">
              Collection
            </Link>
            <Link href="/education" className="text-gray-600 transition-colors hover:text-orange-500 px-2 py-1">
              Education
            </Link>
            <Link href="/about" className="text-gray-600 transition-colors hover:text-orange-500 px-2 py-1">
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;