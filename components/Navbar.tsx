'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Menu', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit Us', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A0F0A]/95 backdrop-blur-md border-b border-[#3D2820] shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-2xl">☕</span>
          <div>
            <span className="font-bold text-lg text-[#F5E6D3] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Artisan
            </span>
            <span className="text-[#4F9C8F] font-bold text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
              {' '}Coffee
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#C9B8A0] hover:text-[#F5E6D3] text-sm font-medium transition-colors tracking-wide"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+918012345678"
            className="flex items-center gap-2 text-xs text-[#C9B8A0] hover:text-[#4F9C8F] transition-colors"
          >
            <span>📞</span>
            <span style={{ fontFamily: 'var(--font-inter)' }}>+91 80123 45678</span>
          </a>
          <motion.a
            href="#products"
            onClick={e => { e.preventDefault(); scrollTo('#products'); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-sm font-semibold shadow-lg"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Order Now
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden w-9 h-9 flex flex-col justify-center gap-1.5 p-1"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 8 } : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1 }}
              className="block h-0.5 w-full bg-[#C9B8A0] rounded"
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1A0F0A]/98 border-t border-[#3D2820] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-[#C9B8A0] hover:text-[#F5E6D3] py-2 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a href="tel:+918012345678" className="block text-[#4F9C8F] text-sm pt-2 border-t border-[#3D2820]">
                📞 +91 80123 45678
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
