'use client';
import { motion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AmbientOrbs from './AmbientOrbs';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const controls = animate(0, target, {
          duration: 2,
          ease: 'easeOut',
          onUpdate: v => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display.toLocaleString('en-IN')}{suffix}</span>;
}

const stats = [
  { value: 25000, suffix: '+', label: 'Happy Customers', icon: '😊', sub: 'Pan India' },
  { value: 14,    suffix: '+', label: 'Signature Drinks', icon: '☕', sub: 'New blends every season' },
  { value: 8,     suffix: '',  label: 'Years of Brewing', icon: '🏆', sub: 'Est. 2016, Bengaluru' },
  { value: 4.8,   suffix: '',  label: 'Google Rating',   icon: '⭐', sub: '200+ verified reviews' },
  { value: 2,     suffix: '',  label: 'Store Locations',  icon: '📍', sub: 'Indiranagar & Koramangala' },
  { value: 98,    suffix: '%', label: 'Satisfaction Rate', icon: '💚', sub: 'Based on customer surveys' },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-4 md:px-8 border-y border-[#3D2820] bg-gradient-to-r from-[#2D1810]/40 via-[#1A0F0A] to-[#2D1810]/40 relative overflow-hidden">
      <AmbientOrbs opacity={0.05} />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-4"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-3xl md:text-4xl font-bold text-[#F5E6D3] mb-1">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm font-semibold text-[#4F9C8F] mb-1">{stat.label}</p>
              <p className="text-xs text-[#5A4034]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
