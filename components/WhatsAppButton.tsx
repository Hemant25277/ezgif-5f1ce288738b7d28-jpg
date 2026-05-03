'use client';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const message = encodeURIComponent("Namaste! 🙏 I'd like to know more about Artisan Coffee.");
  const phone = '918012345678';
  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40"
    >
      {/* WhatsApp icon SVG */}
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.7 1.9 6.6L4 29l7.6-1.9c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.4 12-12S22.6 3 16 3zm6.4 16.6c-.3.8-1.5 1.5-2.2 1.6-.6.1-1.4.1-2.2-.1-.5-.1-1.2-.3-2-.7-3.5-1.5-5.8-5.1-5.9-5.3-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.4-.1.6.4.7 1 1.4 1.7 2s1.6 1.2 2.4 1.5c.2.1.4.1.5-.1l.6-.7c.2-.2.4-.3.6-.2l1.9.9c.2.1.4.2.4.4 0 .2 0 1-.3 1.7z"/>
      </svg>
      {/* Pulse ring */}
      <motion.span
        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-[#25D366]"
      />
    </motion.a>
  );
}
