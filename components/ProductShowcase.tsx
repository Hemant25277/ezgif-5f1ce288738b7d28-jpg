'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { CoffeeProduct, Category, categories } from '@/data/products';

function SkeletonCard() {
  return (
    <div className="bg-[#3D2820]/60 rounded-2xl p-6 border border-[#5A4034] animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-[#5A4034]/50 rounded w-24" />
        <div className="h-5 bg-[#5A4034]/30 rounded w-16" />
      </div>
      <div className="w-full h-52 bg-[#2D1810] rounded-xl mb-5" />
      <div className="flex gap-2 mb-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-5 bg-[#5A4034]/30 rounded-full w-16" />)}
      </div>
      <div className="h-6 bg-[#5A4034]/50 rounded w-3/4 mb-2" />
      <div className="h-4 bg-[#5A4034]/30 rounded w-full mb-1" />
      <div className="h-4 bg-[#5A4034]/30 rounded w-5/6 mb-5" />
      <div className="flex justify-between items-center">
        <div className="h-8 bg-[#5A4034]/50 rounded w-20" />
        <div className="w-12 h-12 bg-[#5A4034]/50 rounded-full" />
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (data.success) setProducts(data.data);
        else setError('Failed to load products');
      })
      .catch(() => setError('Network error — could not load products'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const counts: Record<string, number> = { all: products.length };
  products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <section id="products" className="py-24 px-4 md:px-8 relative">

      {/* Splash Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-44 mb-16 rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2418] via-[#4D3428] to-[#3D2418]" />
        <img
          src="/coffee/splash-banner.jpg"
          alt="Coffee Splash"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -16, 0], rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.4 }}
            className="absolute w-6 h-6 opacity-30"
            style={{ left: `${10 + i * 16}%`, top: `${20 + (i % 2) * 40}%` }}
          >
            <img src="/coffee/bean.png" alt="" className="w-full h-full object-contain" />
          </motion.div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[#F5E6D3]/50 text-xs font-['Inter'] tracking-widest uppercase">
            Fresh Roasted Daily · Sourced from India · 14 Items Available
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[#4F9C8F] text-xs font-['Inter'] tracking-widest uppercase mb-3">Our Menu</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F5E6D3]">
            Signature Blends
          </h2>
          <p className="text-[#C9B8A0] mt-4 font-['Inter'] max-w-xl mx-auto text-sm">
            {products.length} handcrafted drinks across 4 categories. All prices in Indian Rupees (₹).
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-['Inter'] font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white border-transparent shadow-lg shadow-[#4F9C8F]/30'
                  : 'bg-[#2D1810]/60 text-[#C9B8A0] border-[#5A4034]/50 hover:border-[#4F9C8F]/50 hover:text-[#F5E6D3]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {counts[cat.id] !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#3D2820] text-[#C9B8A0]'
                }`}>
                  {counts[cat.id]}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Error */}
        {error && (
          <div className="text-center py-12 text-red-400 font-['Inter']">{error}</div>
        )}

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading
              ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-[#C9B8A0] font-['Inter']">
            <p className="text-4xl mb-4">☕</p>
            <p>No items in this category yet.</p>
          </div>
        )}

        {/* Item count summary */}
        {!loading && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#C9B8A0]/60 text-xs font-['Inter'] mt-10 tracking-wider"
          >
            Showing {filtered.length} of {products.length} items
          </motion.p>
        )}
      </div>
    </section>
  );
}
