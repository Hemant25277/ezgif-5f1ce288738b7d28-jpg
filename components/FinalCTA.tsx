'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SplitHeading from './SplitHeading';
import AmbientOrbs from './AmbientOrbs';

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Parallax for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative py-40 px-4 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#0E0805]" />
      <AmbientOrbs opacity={0.12} />

      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
      />

      {/* Parallax rings */}
      <motion.div style={{ y: y1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-[#4F9C8F]/10 pointer-events-none"
      />
      <motion.div style={{ y: y2 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-[#D4A574]/10 pointer-events-none"
      />

      {/* Central glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F9C8F] rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ scale, opacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F9C8F]/10 border border-[#4F9C8F]/30 text-[#4F9C8F] text-xs tracking-widest uppercase mb-8"
        >
          <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>☕</motion.span>
          Order Now · Same Day Delivery in Bengaluru
        </motion.div>

        {/* Heading with split reveal */}
        <SplitHeading
          text="Find the Perfect Coffee for You"
          className="text-5xl md:text-7xl font-bold text-[#F5E6D3] mb-6 leading-tight"
          tag="h2"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-lg text-[#C9B8A0] mb-12 max-w-xl mx-auto"
        >
          Experience the art of coffee craftsmanship — sourced from Indian farms,<br />
          brewed with love in Bengaluru. 🇮🇳
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(79,156,143,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToProducts}
            className="px-12 py-5 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl relative overflow-hidden group"
          >
            {/* Shimmer sweep */}
            <motion.span
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            <span className="relative">Explore Full Menu ↓</span>
          </motion.button>

          <motion.a
            href="https://wa.me/918012345678"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-5 bg-transparent border border-[#3D2820] hover:border-[#4F9C8F]/60 text-[#C9B8A0] hover:text-[#F5E6D3] rounded-full text-lg font-semibold transition-all"
          >
            💬 WhatsApp Order
          </motion.a>
        </motion.div>

        {/* Rotating sparkle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="mt-16 text-[#D4A574]/50 text-5xl select-none"
        >
          ✦
        </motion.div>
      </motion.div>
    </section>
  );
}
