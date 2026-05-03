'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface SplitHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3';
}

export default function SplitHeading({
  text,
  className = '',
  delay = 0,
  tag: Tag = 'h2',
}: SplitHeadingProps) {
  const words = text.split(' ');

  return (
    <Tag className={`overflow-hidden ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + wi * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
