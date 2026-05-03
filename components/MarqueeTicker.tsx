'use client';
import { motion } from 'framer-motion';

const items = [
  '☕ Cappuccino ₹290',
  '🧊 Cold Brew ₹349',
  '✨ Caramel Macchiato ₹390',
  '🇮🇳 Filter Coffee ₹179',
  '🍫 Mocha ₹380',
  '🌿 Masala Chai ₹149',
  '❄️ Frappuccino ₹420',
  '🥛 Flat White ₹310',
  '💛 Hazelnut Latte ₹370',
  '☕ Americano ₹220',
  '⚡ Espresso ₹149',
  '🌊 Dalgona Coffee ₹299',
];

const doubled = [...items, ...items];

export default function MarqueeTicker() {
  return (
    <div className="py-5 border-y border-[#3D2820] bg-[#150C07]/60 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#150C07] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#150C07] to-transparent z-10" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm text-[#C9B8A0] font-medium tracking-wide flex items-center gap-2">
            {item}
            <span className="text-[#4F9C8F] opacity-60 mx-3">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
