'use client';
import { motion } from 'framer-motion';

// Ambient floating orbs — purely decorative background depth effect
const orbs = [
  { w: 600, h: 600, x: '-10%', y: '-20%', color: '#4F9C8F', dur: 12, delay: 0 },
  { w: 400, h: 400, x: '70%',  y: '30%',  color: '#D4A574', dur: 16, delay: 2 },
  { w: 500, h: 500, x: '20%',  y: '60%',  color: '#3D2820', dur: 14, delay: 4 },
  { w: 300, h: 300, x: '85%',  y: '-10%', color: '#4F9C8F', dur: 10, delay: 1 },
];

export default function AmbientOrbs({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          animate={{
            x: ['0px', '30px', '-20px', '0px'],
            y: ['0px', '-25px', '20px', '0px'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: o.dur,
            delay: o.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: o.w,
            height: o.h,
            left: o.x,
            top: o.y,
            backgroundColor: o.color,
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity,
          }}
        />
      ))}
    </div>
  );
}
