import { NextRequest, NextResponse } from 'next/server';
import { reviews as staticReviews, Review } from '@/data/reviews';

// In-memory store for user-submitted reviews
const userReviews: Review[] = [];

// GET /api/reviews — return all reviews
export async function GET() {
  const all = [...userReviews, ...staticReviews];
  const avgRating = all.reduce((s, r) => s + r.rating, 0) / all.length;
  return NextResponse.json({
    success: true,
    data: all,
    count: all.length,
    averageRating: Math.round(avgRating * 10) / 10,
  });
}

// POST /api/reviews — submit a new review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string;
      city: string;
      rating: number;
      text: string;
      drink: string;
    };

    const { name, city, rating, text, drink } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ success: false, message: 'Name, rating, and review text are required.' }, { status: 400 });
    }

    const review: Review = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      city: city?.trim() || 'India',
      avatar: '🙂',
      rating: Math.max(1, Math.min(5, Math.round(rating))),
      text: text.trim(),
      date: 'Just now',
      verified: false,
      drink: drink?.trim() || 'House Blend',
    };

    userReviews.unshift(review);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! ☕',
      data: review,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}
