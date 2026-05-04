import { NextRequest, NextResponse } from 'next/server';
import { coffeeProducts, Category } from '@/data/products';

// GET /api/products?category=hot
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') as Category | null;

  const data = category && category !== 'all'
    ? coffeeProducts.filter(p => p.category === category)
    : coffeeProducts;

  return NextResponse.json({
    success: true,
    data,
    count: data.length,
    total: coffeeProducts.length,
    currency: 'INR',
    categories: ['all', 'hot', 'cold', 'specialty', 'indian', 'summer', 'food'],
  });
}
