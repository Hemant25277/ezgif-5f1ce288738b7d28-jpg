import { NextRequest, NextResponse } from 'next/server';
import { cart, orders, getCartTotal, Order } from '@/lib/store';

// POST /api/orders — place order from current cart
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name?: string; phone?: string };

    if (cart.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: getCartTotal(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    cart.length = 0; // clear cart after order

    return NextResponse.json({
      success: true,
      message: `Order placed successfully! Your order ID is ${order.id}`,
      data: order,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to place order' }, { status: 500 });
  }
}

// GET /api/orders — return all orders (admin view)
export async function GET() {
  return NextResponse.json({
    success: true,
    data: orders,
    count: orders.length,
  });
}
