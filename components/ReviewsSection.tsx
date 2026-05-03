'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Review } from '@/data/reviews';
import { useToast } from './Toast';

function StarRating({ rating, interactive = false, onChange }: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type={interactive ? 'button' : 'button'}
          disabled={!interactive}
          onClick={() => interactive && onChange?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-xl transition-all ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} ${
            s <= (hovered || rating) ? 'text-[#FFD700]' : 'text-[#3D2820]'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className="bg-[#2D1810]/80 backdrop-blur-sm border border-[#3D2820] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#4F9C8F]/40 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{review.avatar}</span>
          <div>
            <p className="font-semibold text-[#F5E6D3] text-sm">{review.name}</p>
            <p className="text-xs text-[#C9B8A0]">📍 {review.city}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <StarRating rating={review.rating} />
          <p className="text-xs text-[#C9B8A0] mt-1">{review.date}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-sm text-[#C9B8A0] leading-relaxed italic">"{review.text}"</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#3D2820]">
        <span className="text-xs text-[#5A4034] font-medium">☕ {review.drink}</span>
        {review.verified && (
          <span className="text-xs text-[#4F9C8F] flex items-center gap-1">
            <span>✓</span> Verified Purchase
          </span>
        )}
      </div>
    </motion.div>
  );
}

function WriteReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [form, setForm] = useState({ name: '', city: '', rating: 5, text: '', drink: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Review submitted! ☕ Thank you!', 'success');
        setForm({ name: '', city: '', rating: 5, text: '', drink: '' });
        onSubmitted();
      } else {
        showToast(data.message, 'error');
      }
    } catch {
      showToast('Failed to submit review', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inp = 'w-full bg-[#2D1810] border border-[#3D2820] rounded-xl px-4 py-3 text-sm text-[#F5E6D3] placeholder-[#5A4034] focus:outline-none focus:border-[#4F9C8F] transition-colors';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handle}
      className="bg-[#2D1810]/60 border border-[#3D2820] rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-lg font-bold text-[#F5E6D3]">Share Your Experience</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inp}
          placeholder="Your name *"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          className={inp}
          placeholder="Your city (e.g. Bengaluru)"
          value={form.city}
          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
        />
      </div>
      <input
        className={inp}
        placeholder="Which drink did you have? (e.g. Cold Brew)"
        value={form.drink}
        onChange={e => setForm(f => ({ ...f, drink: e.target.value }))}
      />
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#C9B8A0]">Rating:</span>
        <StarRating rating={form.rating} interactive onChange={r => setForm(f => ({ ...f, rating: r }))} />
        <span className="text-sm text-[#D4A574] font-bold">{form.rating}/5</span>
      </div>
      <textarea
        className={`${inp} resize-none`}
        rows={4}
        placeholder="Tell us about your experience... (Hindi/English both welcome! 🇮🇳)"
        value={form.text}
        onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold disabled:opacity-50"
      >
        {loading ? 'Submitting…' : '☕ Submit Review'}
      </motion.button>
    </motion.form>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setReviews(data.data);
          setAvgRating(data.averageRating);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-[#2D1810]/30 to-[#1A0F0A]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#4F9C8F] text-xs tracking-widest uppercase mb-3">What Our Guests Say</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F5E6D3]">Customer Reviews</h2>
          {/* Rating summary */}
          {!loading && (
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={s <= Math.round(avgRating) ? 'text-[#FFD700] text-2xl' : 'text-[#3D2820] text-2xl'}>★</span>
                ))}
              </div>
              <span className="text-3xl font-bold text-[#F5E6D3]">{avgRating}</span>
              <span className="text-[#C9B8A0] text-sm">({reviews.length} reviews)</span>
            </div>
          )}
          {/* Google rating badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#2D1810]/60 rounded-full border border-[#3D2820]">
            <span className="text-sm">🌟</span>
            <span className="text-xs text-[#C9B8A0]">4.8 on Google · 200+ reviews</span>
            <span className="text-xs text-[#C9B8A0]">|</span>
            <span className="text-xs text-[#C9B8A0]">4.9 on Zomato</span>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#2D1810]/40 rounded-2xl p-6 animate-pulse h-52 border border-[#3D2820]" />
              ))
            : reviews.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
        </div>

        {/* Write Review Form */}
        <div className="max-w-2xl mx-auto">
          <WriteReviewForm onSubmitted={fetchReviews} />
        </div>
      </div>
    </section>
  );
}
