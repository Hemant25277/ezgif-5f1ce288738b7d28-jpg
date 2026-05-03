'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

interface CartItem {
  productId: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

export default function CartWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [placing, setPlacing] = useState(false);
  const { showToast } = useToast();

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      if (data.success) {
        setCart(data.data);
        setItemCount(data.itemCount);
        setTotal(data.total);
      }
    } catch {}
  };

  useEffect(() => {
    fetchCart();
    // Poll cart every 2 seconds to stay in sync
    const interval = setInterval(fetchCart, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎉 ${data.message}`, 'success');
        setIsOpen(false);
        fetchCart();
      } else {
        showToast(data.message || 'Order failed', 'error');
      }
    } catch {
      showToast('Failed to place order. Try again.', 'error');
    } finally {
      setPlacing(false);
    }
  };

  const handleClearCart = async () => {
    await fetch('/api/cart', { method: 'DELETE' });
    fetchCart();
    showToast('Cart cleared', 'info');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        id="cart-button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#4F9C8F] to-[#3D8B7F] rounded-full flex items-center justify-center shadow-2xl shadow-[#4F9C8F]/40"
      >
        <span className="text-white text-xl">🛒</span>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4A574] text-[#1A0F0A] text-xs font-bold rounded-full flex items-center justify-center"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1A0F0A] border-l border-[#3D2820] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#3D2820]">
              <div>
                <h2 className="text-xl font-bold font-['Playfair_Display'] text-[#F5E6D3]">Your Cart</h2>
                <p className="text-xs text-[#C9B8A0] mt-0.5">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-[#3D2820] flex items-center justify-center text-[#C9B8A0] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-6xl">☕</span>
                  <p className="text-[#C9B8A0] font-['Inter']">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#4F9C8F] text-sm underline"
                  >
                    Browse our blends
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.productId}
                    layout
                    className="flex items-center gap-4 p-4 bg-[#2D1810] rounded-xl border border-[#3D2820]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#F5E6D3] font-['Playfair_Display'] truncate">{item.name}</p>
                      <p className="text-sm text-[#C9B8A0] font-['Inter']">{item.price} × {item.quantity}</p>
                    </div>
                    <p className="text-[#D4A574] font-bold font-['Inter'] flex-shrink-0">
                      ₹{item.priceValue * item.quantity}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#3D2820] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#C9B8A0] font-['Inter']">Total</span>
                  <span className="text-2xl font-bold text-[#F5E6D3] font-['Playfair_Display']">₹{total}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold font-['Inter'] text-lg disabled:opacity-50 shadow-lg shadow-[#4F9C8F]/30"
                >
                  {placing ? 'Placing Order…' : '☕ Place Order'}
                </motion.button>
                <button
                  onClick={handleClearCart}
                  className="w-full py-2 text-sm text-[#C9B8A0] hover:text-red-400 transition-colors font-['Inter']"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
