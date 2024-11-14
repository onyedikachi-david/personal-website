'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-black/30' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            David Anyatonwu
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white transition-colors'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 text-gray-300 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className={`block w-5 h-0.5 bg-current mb-1 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current mb-1 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-lg bg-black/30">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navigation;
