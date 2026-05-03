import { NextRequest, NextResponse } from 'next/server';
import { cart, getCartTotal, CartItem } from '@/lib/store';
import { coffeeProducts } from '@/data/products';

// GET /api/cart — return current cart
export async function GET() {
  return NextResponse.json({
    success: true,
    data: cart,
    itemCount: cart.reduce((s, i) => s + i.quantity, 0),
    total: getCartTotal(),
    totalFormatted: `₹${getCartTotal()}`,
  });
}

// POST /api/cart — add item { productId, quantity? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { productId: string; quantity?: number };
    const { productId, quantity = 1 } = body;

    const product = coffeeProducts.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    const existing = cart.find((i: CartItem) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        productId,
        name: product.name,
        price: product.price,
        priceValue: product.priceValue,
        image: product.image,
        quantity,
      });
    }

    return NextResponse.json({
      success: true,
      message: `${product.name} added to cart`,
      data: cart,
      total: getCartTotal(),
      totalFormatted: `₹${getCartTotal()}`,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/cart — clear cart
export async function DELETE() {
  cart.length = 0;
  return NextResponse.json({ success: true, message: 'Cart cleared' });
}
