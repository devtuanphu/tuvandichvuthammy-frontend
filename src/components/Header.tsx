'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  phone?: string;
}

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Header({ phone }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Thẩm Mỹ Hà Nội" width={220} height={60} className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hidden md:flex items-center gap-2 text-primary font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {phone}
              </a>
            )}
            <Link
              href="/lien-he"
              className="hidden sm:inline-flex bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Đặt lịch tư vấn
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/lien-he"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold text-center transition-all"
              >
                Đặt lịch tư vấn
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
