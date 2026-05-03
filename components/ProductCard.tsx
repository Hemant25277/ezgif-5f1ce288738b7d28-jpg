'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CoffeeProduct } from '@/data/products';
import { useToast } from './Toast';

interface ProductCardProps {
  product: CoffeeProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const { showToast } = useToast();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`${product.name} added to cart!`, 'success');
      } else {
        showToast('Failed to add to cart', 'error');
      }
    } catch {
      showToast('Network error — try again', 'error');
    } finally {
      setTimeout(() => setAdding(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-[#3D2820]/80 backdrop-blur-sm rounded-2xl p-5 border border-[#5A4034] hover:border-[#4F9C8F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#4F9C8F]/20 flex flex-col relative overflow-hidden"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-4 right-4 z-10 text-xs px-2.5 py-1 rounded-full bg-[#4F9C8F]/20 text-[#4F9C8F] border border-[#4F9C8F]/30 font-['Inter'] font-medium">
          {product.badge}
        </span>
      )}
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.rating) ? 'text-[#FFD700]' : 'text-[#5A4034]'}>★</span>
          ))}
        </div>
        <span className="text-[#F5E6D3] font-semibold text-sm">{product.rating.toFixed(1)}</span>
      </div>

      {/* Coffee Image */}
      <div className="w-full h-56 bg-[#2D1810] rounded-xl mb-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Features Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.features.map(f => (
          <span key={f} className="px-2 py-0.5 text-xs bg-[#2D1810] text-[#C9B8A0] rounded-full border border-[#5A4034]/50 font-['Inter']">
            {f}
          </span>
        ))}
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-[#C9B8A0] mb-5 line-clamp-2 font-['Inter'] flex-1">
        {product.description}
      </p>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-3xl font-bold text-[#F5E6D3] font-['Inter']">
            {product.price}
          </span>
          <p className="text-xs text-[#C9B8A0] font-['Inter']">incl. taxes</p>
        </div>
        <motion.button
          id={`add-to-cart-${product.id}`}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9, rotate: 90 }}
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
            adding
              ? 'bg-[#4F9C8F]/60'
              : 'bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] hover:shadow-[#4F9C8F]/50'
          }`}
        >
          <motion.span
            animate={{ rotate: adding ? 180 : 0 }}
            className="text-white text-2xl font-bold leading-none"
          >
            {adding ? '✓' : '+'}
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
