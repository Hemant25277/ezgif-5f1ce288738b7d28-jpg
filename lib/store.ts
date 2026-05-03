// Simple in-memory store — acts as session-level state for the backend
// In production this would be replaced with Redis / a database

export interface CartItem {
  productId: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'confirmed' | 'preparing' | 'ready';
  createdAt: string;
}

// In-memory stores (reset on server restart — fine for demo)
export const cart: CartItem[] = [];
export const orders: Order[] = [];

export function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
}
