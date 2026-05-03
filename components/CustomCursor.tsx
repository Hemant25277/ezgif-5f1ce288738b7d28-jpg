'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [onLink, setOnLink] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring — lag behind
  const ringX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setOnLink(!!(t.closest('a') || t.closest('button') || t.dataset.cursor));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
    };
  }, [mouseX, mouseY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches) return null;

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: clicked ? 0.5 : onLink ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#4F9C8F] z-[999] pointer-events-none mix-blend-screen"
      />
      {/* Ring — lagged */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: onLink ? 2.2 : clicked ? 0.7 : 1,
          opacity: visible ? 1 : 0,
          borderColor: onLink ? '#D4A574' : '#4F9C8F',
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#4F9C8F]/60 z-[998] pointer-events-none"
      />
      {/* Glow blob */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? (onLink ? 0.5 : 0.2) : 0 }}
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-[#4F9C8F] z-[997] pointer-events-none blur-2xl"
      />
    </>
  );
}
