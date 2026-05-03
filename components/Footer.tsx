'use client';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Menu', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit Us', href: '#location' },
  { label: 'Order on Swiggy', href: '#' },
  { label: 'Order on Zomato', href: '#' },
];

const social = [
  { icon: '📷', label: 'Instagram', href: 'https://instagram.com' },
  { icon: '📘', label: 'Facebook', href: 'https://facebook.com' },
  { icon: '🐦', label: 'Twitter / X', href: 'https://x.com' },
  { icon: '▶️', label: 'YouTube', href: 'https://youtube.com' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#3D2820] bg-[#150C07] pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <span className="text-xl font-bold text-[#F5E6D3]" style={{ fontFamily: 'var(--font-playfair)' }}>
                Artisan Coffee
              </span>
            </div>
            <p className="text-sm text-[#C9B8A0] leading-relaxed mb-4">
              Bengaluru's favourite indie coffee brand. Brewing joy since 2016 from farm to cup. 
              Proudly Indian. 🇮🇳
            </p>
            <div className="flex gap-3">
              {social.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 bg-[#2D1810] rounded-full flex items-center justify-center text-base hover:bg-[#4F9C8F]/30 transition-colors border border-[#3D2820] hover:border-[#4F9C8F]/50"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F5E6D3] mb-4 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm text-[#C9B8A0] hover:text-[#4F9C8F] transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#F5E6D3] mb-4 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[#C9B8A0]">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+918012345678" className="hover:text-[#4F9C8F] transition-colors">+91 80123 45678</a>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a href="mailto:hello@artisancoffee.in" className="hover:text-[#4F9C8F] transition-colors">hello@artisancoffee.in</a>
              </li>
              <li className="flex items-start gap-2">
                <span>💬</span>
                <a href="https://wa.me/918012345678" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Indiranagar & Koramangala, Bengaluru</span>
              </li>
            </ul>
          </div>

          {/* App Download / Delivery */}
          <div>
            <h4 className="text-sm font-bold text-[#F5E6D3] mb-4 uppercase tracking-widest">Order Online</h4>
            <div className="space-y-3">
              {[
                { icon: '🛵', name: 'Swiggy', color: '#FF6B35' },
                { icon: '🍽️', name: 'Zomato', color: '#E23744' },
              ].map(p => (
                <a
                  key={p.name}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 bg-[#2D1810] rounded-xl border border-[#3D2820] hover:border-[#5A4034] transition-colors"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="text-xs text-[#C9B8A0]">Order on</p>
                    <p className="text-sm font-bold" style={{ color: p.color }}>{p.name}</p>
                  </div>
                </a>
              ))}
              <p className="text-xs text-[#5A4034] mt-2">
                🚚 Free delivery above ₹500 in Bengaluru
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3D2820] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5A4034]">
          <p>© {new Date().getFullYear()} Artisan Coffee Pvt. Ltd. All rights reserved. | FSSAI Lic: 12345678901234</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C9B8A0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C9B8A0] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#C9B8A0] transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
