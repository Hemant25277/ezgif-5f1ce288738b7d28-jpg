'use client';
import { motion } from 'framer-motion';

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 9:00 PM' },
  { day: 'Public Holidays', time: '10:00 AM – 8:00 PM' },
];

const locations = [
  {
    id: 1,
    name: 'Indiranagar Flagship',
    address: '12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 80123 45678',
    landmark: 'Near 100 Feet Road Signal',
    parking: 'Free parking available',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9837059!2d77.6408!3d12.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1317d07c4c35%3A0x6ebba1cd3b33069d!2sIndiranagar%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1683000000000',
  },
  {
    id: 2,
    name: 'Koramangala Outlet',
    address: '5th Block, 80 Feet Rd, Koramangala, Bengaluru, Karnataka 560095',
    phone: '+91 80987 65432',
    landmark: 'Near Sony Signal, Forum Mall',
    parking: 'Paid parking nearby',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6241!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b8d3f8f355%3A0x6c5b98ccfbfe1a54!2sKoramangala%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1683000000001',
  },
];

const paymentMethods = [
  { icon: '📱', label: 'UPI / GPay' },
  { icon: '💳', label: 'All Cards' },
  { icon: '💵', label: 'Cash' },
  { icon: '📲', label: 'PhonePe' },
  { icon: '🏦', label: 'Net Banking' },
];

export default function LocationSection() {
  return (
    <section id="location" className="py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] to-[#2D1810]/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#4F9C8F] text-xs tracking-widest uppercase mb-3">Find Us</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F5E6D3]">Visit Our Stores</h2>
          <p className="text-[#C9B8A0] mt-4 max-w-xl mx-auto text-sm">
            Two outlets in Bengaluru. Walk in, sit down, and let us brew something special for you. Chai pe charcha always welcome! ☕
          </p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#2D1810]/70 border border-[#3D2820] rounded-3xl overflow-hidden"
            >
              {/* Map Embed */}
              <div className="h-64 w-full relative">
                <iframe
                  src={loc.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(0.85) brightness(0.8)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${loc.name}`}
                />
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-[#F5E6D3]">{loc.name}</h3>
                  <span className="text-xs px-2 py-1 bg-[#4F9C8F]/20 text-[#4F9C8F] rounded-full border border-[#4F9C8F]/30 flex-shrink-0">
                    Open Now
                  </span>
                </div>
                <div className="space-y-2 text-sm text-[#C9B8A0]">
                  <p className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5">📍</span>
                    <span>{loc.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🏛️</span>
                    <span>{loc.landmark}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🚗</span>
                    <span>{loc.parking}</span>
                  </p>
                  <a href={`tel:${loc.phone}`} className="flex items-center gap-2 hover:text-[#4F9C8F] transition-colors">
                    <span>📞</span>
                    <span>{loc.phone}</span>
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center text-sm bg-[#3D2820] hover:bg-[#4F9C8F]/20 border border-[#5A4034] hover:border-[#4F9C8F]/50 text-[#F5E6D3] rounded-xl transition-all"
                  >
                    🗺️ Get Directions
                  </a>
                  <a
                    href={`https://wa.me/91${loc.phone.replace(/\D/g,'').slice(-10)}?text=Hi, I'd like to know more about your cafe!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center text-sm bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] rounded-xl transition-all"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hours + Payments Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D1810]/70 border border-[#3D2820] rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-[#F5E6D3] mb-5 flex items-center gap-2">
              🕐 Opening Hours
            </h3>
            <div className="space-y-3">
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[#3D2820] last:border-0">
                  <span className="text-sm text-[#C9B8A0]">{h.day}</span>
                  <span className={`text-sm font-semibold ${i === 0 ? 'text-[#4F9C8F]' : 'text-[#F5E6D3]'}`}>{h.time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#5A4034] mt-4">* Hours may vary on Indian national holidays. Call ahead to confirm.</p>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D1810]/70 border border-[#3D2820] rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-[#F5E6D3] mb-5 flex items-center gap-2">
              💳 We Accept
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {paymentMethods.map(p => (
                <div key={p.label} className="flex items-center gap-2 px-3 py-2.5 bg-[#3D2820]/60 rounded-xl border border-[#5A4034]/50">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-xs text-[#C9B8A0] font-medium">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#1A0F0A] rounded-xl border border-[#3D2820]">
              <p className="text-xs text-[#C9B8A0] flex items-center gap-2">
                <span className="text-lg">🚚</span>
                <span>
                  <strong className="text-[#F5E6D3]">Free Delivery</strong> on orders above ₹500 · 
                  Same-day delivery in Bengaluru · 
                  Available on <strong className="text-[#FF6B35]">Swiggy</strong> & <strong className="text-[#E23744]">Zomato</strong>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
