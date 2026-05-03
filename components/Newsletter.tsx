'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from './Toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API
    showToast('Welcome to the Artisan family! ☕ Check your inbox.', 'success');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 px-4 md:px-8 border-t border-[#3D2820]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <span className="text-4xl mb-4 block">📬</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5E6D3] mb-3">
          Get ₹50 Off Your First Order
        </h2>
        <p className="text-sm text-[#C9B8A0] mb-8">
          Subscribe to our newsletter for exclusive offers, new menu launches, and brewing tips. 
          No spam — just good coffee vibes. 🇮🇳
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-5 py-4 bg-[#2D1810] border border-[#3D2820] rounded-xl text-[#F5E6D3] placeholder-[#5A4034] focus:outline-none focus:border-[#4F9C8F] text-sm transition-colors"
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold text-sm disabled:opacity-60 whitespace-nowrap shadow-lg"
          >
            {loading ? '…' : '☕ Subscribe & Save'}
          </motion.button>
        </form>
        <p className="text-xs text-[#5A4034] mt-3">
          By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
