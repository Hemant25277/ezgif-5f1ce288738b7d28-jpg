'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface CartItem {
  productId: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 500;

const inputClass =
  'w-full bg-[#2D1810] border border-[#5A4034] rounded-xl px-4 py-3 text-[#F5E6D3] placeholder-[#5A4034] focus:outline-none focus:border-[#4F9C8F] transition-colors text-sm font-[Inter]';

const Field = ({ label, value, onChange, error, placeholder, type = 'text', half = false }: {
  label: string; value: string; onChange: (val: string) => void; error?: string; placeholder: string; type?: string; half?: boolean;
}) => (
  <div className={half ? 'flex-1' : 'w-full'}>
    <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`${inputClass} ${error ? 'border-red-500/70' : ''}`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = total >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = total + deliveryFee;

  useEffect(() => {
    fetch('/api/cart')
      .then(r => r.json())
      .then(data => {
        if (data.success) { setCart(data.data); setTotal(data.total); }
      })
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit PIN code';
    if (paymentMethod === 'upi' && !upiId.match(/^[\w.\-]+@[\w]+$/)) e.upiId = 'Enter a valid UPI ID (e.g. name@upi)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, paymentMethod }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.data.id);
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handleChange = (name: keyof typeof form) => (val: string) => {
    setForm(f => ({ ...f, [name]: val }));
  };

  // ── Success screen ────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#1A0F0A] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-[#2D1810] border border-[#4F9C8F]/40 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-7xl mb-6"
          >
            ☕
          </motion.div>
          <h1 className="text-3xl font-bold text-[#F5E6D3] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            Order Confirmed!
          </h1>
          <p className="text-[#C9B8A0] text-sm mb-2">Your artisan coffee is being prepared with love.</p>
          <div className="bg-[#1A0F0A] rounded-xl px-5 py-3 my-6 border border-[#3D2820]">
            <p className="text-xs text-[#C9B8A0] uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-[#4F9C8F] font-bold text-lg font-mono">{success}</p>
          </div>
          <div className="space-y-2 text-sm text-[#C9B8A0] mb-8">
            <p>📦 Estimated delivery: <span className="text-[#F5E6D3]">30–45 minutes</span></p>
            <p>📞 We'll call you at <span className="text-[#F5E6D3]">+91 {form.phone}</span></p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/')}
            className="w-full py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold text-lg shadow-lg"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3]" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <div className="border-b border-[#3D2820] bg-[#150C07]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#C9B8A0] hover:text-[#F5E6D3] transition-colors text-sm"
          >
            ← Back
          </button>
          <span className="text-[#3D2820]">|</span>
          <span className="text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>☕ Artisan Coffee</span>
          <span className="ml-auto text-[#4F9C8F] text-sm font-medium">Secure Checkout 🔒</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        {/* ── LEFT: Forms ── */}
        <div className="space-y-8">

          {/* Delivery Address */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#2D1810]/70 border border-[#5A4034] rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="text-2xl">📍</span> Delivery Details
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Field label="Full Name *" value={form.name} onChange={handleChange('name')} error={errors.name} placeholder="Rahul Sharma" half />
                <Field label="Phone Number *" value={form.phone} onChange={handleChange('phone')} error={errors.phone} placeholder="9876543210" type="tel" half />
              </div>
              <Field label="Email Address" value={form.email} onChange={handleChange('email')} error={errors.email} placeholder="rahul@example.com" type="email" />
              <Field label="Full Address *" value={form.address} onChange={handleChange('address')} error={errors.address} placeholder="Flat 4B, Sunshine Apartments, MG Road" />
              <div className="flex gap-4">
                <Field label="City *" value={form.city} onChange={handleChange('city')} error={errors.city} placeholder="Bengaluru" half />
                <Field label="PIN Code *" value={form.pincode} onChange={handleChange('pincode')} error={errors.pincode} placeholder="560001" half />
              </div>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#2D1810]/70 border border-[#5A4034] rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="text-2xl">💳</span> Payment Method
            </h2>

            {/* Payment Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {([
                { id: 'upi', icon: '📲', label: 'UPI', sub: 'GPay, PhonePe, Paytm' },
                { id: 'card', icon: '💳', label: 'Card', sub: 'Credit / Debit' },
                { id: 'netbanking', icon: '🏦', label: 'Net Banking', sub: 'All major banks' },
                { id: 'cod', icon: '💵', label: 'Cash on Delivery', sub: 'Pay at door' },
              ] as { id: PaymentMethod; icon: string; label: string; sub: string }[]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === opt.id
                      ? 'border-[#4F9C8F] bg-[#4F9C8F]/10 shadow-lg shadow-[#4F9C8F]/20'
                      : 'border-[#5A4034] bg-[#1A0F0A]/60 hover:border-[#5A4034]/80'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-xs font-semibold text-[#F5E6D3]">{opt.label}</span>
                  <span className="text-[10px] text-[#C9B8A0] text-center leading-tight">{opt.sub}</span>
                </button>
              ))}
            </div>

            {/* Dynamic payment fields */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'upi' && (
                <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">UPI ID *</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className={`${inputClass} ${errors.upiId ? 'border-red-500/70' : ''}`}
                  />
                  {errors.upiId && <p className="text-red-400 text-xs mt-1">{errors.upiId}</p>}
                  <p className="text-xs text-[#C9B8A0] mt-5 mb-2">Or open app directly on your phone:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Any UPI App', intent: 'upi://pay', icon: '📲' },
                      { name: 'GPay', intent: 'tez://upi/pay', icon: '🔵' },
                      { name: 'PhonePe', intent: 'phonepe://pay', icon: '🟣' },
                      { name: 'Paytm', intent: 'paytmmp://pay', icon: '🔷' },
                    ].map(app => (
                      <a
                        key={app.name}
                        href={`${app.intent}?pa=artisan@upi&pn=Artisan%20Coffee&am=${grandTotal}&cu=INR`}
                        className="flex items-center gap-1.5 bg-[#1A0F0A] border border-[#3D2820] rounded-lg px-3 py-2 text-xs text-[#C9B8A0] hover:border-[#4F9C8F] hover:text-[#F5E6D3] transition-colors"
                      >
                        <span>{app.icon}</span>{app.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'card' && (
                <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className={inputClass} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" maxLength={7} className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#C9B8A0] mb-1.5 uppercase tracking-widest">Cardholder Name</label>
                    <input type="text" placeholder="As on card" className={inputClass} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#C9B8A0]">
                    <span>🔒</span>
                    <span>256-bit SSL secured · We never store your card details</span>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'netbanking' && (
                <motion.div key="netbanking" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-xs text-[#C9B8A0] mb-3 uppercase tracking-widest">Select Your Bank</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Bank of Baroda', 'PNB', 'Canara Bank', 'Other'].map(bank => (
                      <button key={bank} className="flex items-center gap-2 px-3 py-2.5 bg-[#1A0F0A] border border-[#3D2820] rounded-lg text-sm text-[#C9B8A0] hover:border-[#4F9C8F]/50 hover:text-[#F5E6D3] transition-colors text-left">
                        🏦 <span className="truncate">{bank}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'cod' && (
                <motion.div key="cod" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <div className="flex items-start gap-4 p-4 bg-[#1A0F0A]/80 border border-[#3D2820] rounded-xl">
                    <span className="text-3xl">💵</span>
                    <div>
                      <p className="text-[#F5E6D3] font-semibold mb-1">Cash on Delivery</p>
                      <p className="text-sm text-[#C9B8A0]">Pay in cash when your order arrives at your doorstep. Exact change appreciated!</p>
                      <p className="text-xs text-[#4F9C8F] mt-2">✓ No extra charges · ✓ Pay at your convenience</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          className="lg:sticky lg:top-24 h-fit space-y-4"
        >
          <div className="bg-[#2D1810]/70 border border-[#5A4034] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>Order Summary</h2>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-14 h-14 bg-[#3D2820] rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-[#3D2820] rounded w-3/4" />
                      <div className="h-3 bg-[#3D2820] rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-8 text-[#C9B8A0]">
                <span className="text-4xl block mb-3">🛒</span>
                <p>Your cart is empty.</p>
                <button onClick={() => router.push('/')} className="text-[#4F9C8F] text-sm underline mt-2">Go back to menu</button>
              </div>
            ) : (
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-[#3D2820]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#F5E6D3] truncate">{item.name}</p>
                      <p className="text-xs text-[#C9B8A0]">{item.price} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#D4A574] flex-shrink-0">₹{item.priceValue * item.quantity}</p>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <>
                <div className="border-t border-[#3D2820] pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-[#C9B8A0]">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-[#C9B8A0]">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0
                      ? <span className="text-[#4F9C8F] font-medium">FREE 🎉</span>
                      : <span>₹{deliveryFee}</span>
                    }
                  </div>
                  {total < FREE_DELIVERY_THRESHOLD && (
                    <p className="text-xs text-[#C9B8A0]/70 bg-[#1A0F0A] rounded-lg px-3 py-2">
                      Add ₹{FREE_DELIVERY_THRESHOLD - total} more for free delivery!
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-[#F5E6D3] text-base pt-2 border-t border-[#3D2820]">
                    <span>Total Payable</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(79,156,143,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePlaceOrder}
                  disabled={placing || cart.length === 0}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 relative overflow-hidden"
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="inline-block">⟳</motion.span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {paymentMethod === 'cod' ? '💵' : '🔒'} Place Order · ₹{grandTotal}
                    </span>
                  )}
                </motion.button>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="bg-[#2D1810]/40 border border-[#3D2820] rounded-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '🔒', text: 'Secure Payment' },
                { icon: '🚚', text: 'Fast Delivery' },
                { icon: '✅', text: 'Quality Assured' },
              ].map(b => (
                <div key={b.text} className="flex flex-col items-center gap-1">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[10px] text-[#C9B8A0] leading-tight">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
