export type Category = 'all' | 'hot' | 'cold' | 'specialty' | 'indian';

export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  rating: number;
  image: string;
  features: string[];
  category: Category;
  badge?: string; // e.g. "Best Seller", "New", "Popular"
}

export const coffeeProducts: CoffeeProduct[] = [
  // ── HOT COFFEES ──────────────────────────────────────────────
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated shot of pure coffee excellence — bold, intense, and full of character. The foundation of all great coffee.',
    price: '₹149',
    priceValue: 149,
    rating: 4.8,
    image: '/coffee/espresso.jpg',
    features: ['Single Origin', 'High Pressure Brew', 'Crema'],
    category: 'hot',
    badge: 'Classic',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal thirds of espresso, steamed milk and rich velvety foam — a timeless Italian classic that never disappoints.',
    price: '₹290',
    priceValue: 290,
    rating: 4.9,
    image: '/coffee/cappuccino.jpg',
    features: ['Espresso', 'Steamed Milk', 'Thick Foam'],
    category: 'hot',
    badge: 'Best Seller',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'A generous pour of silky steamed milk over a double shot of espresso, finished with a delicate layer of microfoam.',
    price: '₹340',
    priceValue: 340,
    rating: 5.0,
    image: '/coffee/latte.jpg',
    features: ['Espresso', 'Steamed Milk', 'Microfoam'],
    category: 'hot',
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Bold espresso diluted with hot water for a smooth, full-bodied brew. Clean, straightforward, and deeply satisfying.',
    price: '₹220',
    priceValue: 220,
    rating: 4.6,
    image: '/coffee/americano.jpg',
    features: ['Double Espresso', 'Hot Water', 'Bold'],
    category: 'hot',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'A ristretto base with velvety microfoam — stronger than a latte, smoother than a cappuccino. The barista\'s choice.',
    price: '₹310',
    priceValue: 310,
    rating: 4.8,
    image: '/coffee/flat-white.jpg',
    features: ['Ristretto', 'Microfoam', 'Velvety'],
    category: 'hot',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Where dark espresso meets rich Belgian chocolate and creamy steamed milk. An indulgent treat in every sip.',
    price: '₹380',
    priceValue: 380,
    rating: 4.7,
    image: '/coffee/mocha.jpg',
    features: ['Espresso', 'Chocolate', 'Steamed Milk'],
    category: 'hot',
    badge: 'Popular',
  },
  {
    id: 'hazelnut-latte',
    name: 'Hazelnut Latte',
    description: 'Our signature latte elevated with premium hazelnut syrup. Sweet, nutty and utterly irresistible.',
    price: '₹370',
    priceValue: 370,
    rating: 4.9,
    image: '/coffee/hazelnut-latte.jpg',
    features: ['Espresso', 'Hazelnut Syrup', 'Steamed Milk'],
    category: 'hot',
    badge: 'Chef\'s Pick',
  },
  // ── COLD COFFEES ─────────────────────────────────────────────
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Steeped for 18 hours in cold water for a smooth, low-acid concentrate with natural chocolate and caramel notes.',
    price: '₹349',
    priceValue: 349,
    rating: 4.9,
    image: '/coffee/cold-brew.jpg',
    features: ['18-Hour Steep', 'Low Acid', 'Chilled'],
    category: 'cold',
    badge: 'New',
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    description: 'Espresso poured over ice with fresh cold milk. Watch the perfect swirl form before you stir and sip.',
    price: '₹320',
    priceValue: 320,
    rating: 4.7,
    image: '/coffee/iced-latte.jpg',
    features: ['Espresso', 'Cold Milk', 'Ice'],
    category: 'cold',
  },
  {
    id: 'frappuccino',
    name: 'Frappuccino',
    description: 'A blended iced coffee drink topped with whipped cream and chocolate drizzle. Thick, rich and impossibly refreshing.',
    price: '₹420',
    priceValue: 420,
    rating: 4.8,
    image: '/coffee/frappuccino.jpg',
    features: ['Blended Ice', 'Whipped Cream', 'Chocolate Drizzle'],
    category: 'cold',
    badge: 'Fan Favourite',
  },
  {
    id: 'dalgona',
    name: 'Dalgona Coffee',
    description: 'Whipped instant coffee beaten to a cloud-like froth, dolloped over chilled milk. Viral for a reason.',
    price: '₹299',
    priceValue: 299,
    rating: 4.6,
    image: '/coffee/dalgona.jpg',
    features: ['Whipped Foam', 'Chilled Milk', 'Trending'],
    category: 'cold',
  },
  // ── SPECIALTY ────────────────────────────────────────────────
  {
    id: 'macchiato',
    name: 'Caramel Macchiato',
    description: 'Layered vanilla milk, espresso and golden caramel drizzle. A stunning drink to look at — and even better to drink.',
    price: '₹390',
    priceValue: 390,
    rating: 4.9,
    image: '/coffee/macchiato.jpg',
    features: ['Vanilla', 'Espresso', 'Caramel Drizzle'],
    category: 'specialty',
    badge: 'Popular',
  },
  // ── INDIAN SPECIALS ──────────────────────────────────────────
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    description: 'The legendary Kaapi — strong dark decoction blended with full-cream milk and served frothed in a steel davara. Pure nostalgia.',
    price: '₹179',
    priceValue: 179,
    rating: 5.0,
    image: '/coffee/filter-coffee.jpg',
    features: ['Dark Decoction', 'Full-Cream Milk', 'Steel Tumbler'],
    category: 'indian',
    badge: '🇮🇳 Indian',
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    description: 'Aromatic whole spices — cardamom, ginger, cloves and cinnamon — simmered with Assam tea and fresh milk. Warmth in a cup.',
    price: '₹149',
    priceValue: 149,
    rating: 4.8,
    image: '/coffee/masala-chai.jpg',
    features: ['Whole Spices', 'Assam Tea', 'Fresh Milk'],
    category: 'indian',
    badge: '🇮🇳 Indian',
  },
];

export type { Category as MenuCategory };

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'all',       label: 'All Items',   icon: '☕' },
  { id: 'hot',       label: 'Hot Coffee',  icon: '♨️' },
  { id: 'cold',      label: 'Cold & Iced', icon: '🧊' },
  { id: 'specialty', label: 'Specialty',   icon: '✨' },
  { id: 'indian',    label: 'Indian',      icon: '🇮🇳' },
];

export interface FeatureHighlight {
  title: string;
  description: string;
  position: 'left' | 'right';
}

export const features: FeatureHighlight[] = [
  {
    title: 'High-Quality Beans',
    description: 'Hand-picked from the finest estates across Coorg, Chikmagalur, and Wayanad — every bean tells a story of craft and dedication.',
    position: 'left',
  },
  {
    title: 'Individual Approach',
    description: 'Every cup is brewed to your preference. We take time to understand your palate and craft a coffee experience that is uniquely yours.',
    position: 'right',
  },
  {
    title: 'Atmosphere of Inspiration',
    description: 'Our spaces are designed to spark creativity and calm the mind — the perfect backdrop for great conversations and great coffee.',
    position: 'left',
  },
  {
    title: 'Professional Baristas',
    description: 'Our baristas are certified artisans trained in the science and art of coffee. Every cup is crafted with precision, passion, and pride.',
    position: 'right',
  },
];
