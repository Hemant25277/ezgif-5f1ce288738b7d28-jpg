'use client';
import { motion } from 'framer-motion';
import AmbientOrbs from './AmbientOrbs';
import SplitHeading from './SplitHeading';

const milestones = [
  { year: '2016', event: 'Founded in a small garage in Indiranagar, Bengaluru with just 3 blends.' },
  { year: '2018', event: 'Opened our first proper cafe. Queues on Day 1 told us we were onto something.' },
  { year: '2020', event: 'Launched online ordering and survived the lockdown through community love.' },
  { year: '2022', event: 'Second outlet in Koramangala. Became Bengaluru\'s most-reviewed indie cafe.' },
  { year: '2024', event: '25,000+ customers served. Sourcing exclusively from Coorg & Chikmagalur farms.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <AmbientOrbs opacity={0.06} />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#4F9C8F] text-xs tracking-widest uppercase mb-3">Our Story</p>
            <SplitHeading
              text="Born in Bengaluru, Brewed with Love"
              className="text-4xl md:text-5xl font-bold text-[#F5E6D3] mb-6 leading-tight"
              tag="h2"
            />
            <p className="text-[#C9B8A0] text-sm leading-relaxed mb-4">
              Artisan Coffee started as a dream in a Bengaluru garage. Two coffee-obsessed friends — Kiran and Meera — were tired of paying ₹600 for average coffee at soulless chains. They believed India deserved better.
            </p>
            <p className="text-[#C9B8A0] text-sm leading-relaxed mb-6">
              We source our beans directly from family-owned estates in <strong className="text-[#D4A574]">Coorg</strong>, <strong className="text-[#D4A574]">Chikmagalur</strong>, and <strong className="text-[#D4A574]">Wayanad</strong> — cutting out the middlemen and ensuring fair prices for farmers. Every cup you drink supports a farming family in Karnataka or Kerala.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Direct Trade', 'Single Origin', 'No Compromises', 'Made in India 🇮🇳'].map(tag => (
                <span key={tag} className="px-3 py-1 text-xs bg-[#3D2820] text-[#C9B8A0] rounded-full border border-[#5A4034]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pl-8 space-y-6"
          >
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F]" />

            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#4F9C8F] border-2 border-[#1A0F0A]" />
                <p className="text-xs text-[#4F9C8F] font-bold tracking-widest mb-1">{m.year}</p>
                <p className="text-sm text-[#C9B8A0] leading-relaxed">{m.event}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
