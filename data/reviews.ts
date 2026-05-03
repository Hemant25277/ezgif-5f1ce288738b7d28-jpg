// Customer reviews data — realistic Indian customers
export interface Review {
  id: string;
  name: string;
  city: string;
  avatar: string; // emoji avatar
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  drink: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Priya Venkataraman',
    city: 'Bengaluru',
    avatar: '👩🏾',
    rating: 5,
    text: 'Ekdum mast! The filter coffee here takes me straight back to my paati\'s house in Chennai. The davara set, the frothy milk — bilkul authentic. Best coffee in Bangalore, no doubt!',
    date: '3 days ago',
    verified: true,
    drink: 'South Indian Filter Coffee',
  },
  {
    id: 'r2',
    name: 'Arjun Mehta',
    city: 'Mumbai',
    avatar: '👨🏽',
    rating: 5,
    text: 'Ordered the Hazelnut Latte and the Cold Brew on the same day — both were phenomenal. The delivery was super fast too. Yaar, this has become my daily fix now. 10/10!',
    date: '1 week ago',
    verified: true,
    drink: 'Cold Brew',
  },
  {
    id: 'r3',
    name: 'Sneha Iyer',
    city: 'Chennai',
    avatar: '👩🏽',
    rating: 5,
    text: 'The Masala Chai is the real deal — not that watery stuff you get elsewhere. Strong spices, proper milk, perfect sweetness. Came for the coffee, stayed for the chai! ❤️',
    date: '2 weeks ago',
    verified: true,
    drink: 'Masala Chai',
  },
  {
    id: 'r4',
    name: 'Rahul Sharma',
    city: 'Delhi',
    avatar: '👨🏻',
    rating: 4,
    text: 'The Caramel Macchiato is absolute banger. Presentation is too good, tastes even better. Slightly expensive but worth every rupee. UPI payment worked seamlessly too.',
    date: '3 weeks ago',
    verified: true,
    drink: 'Caramel Macchiato',
  },
  {
    id: 'r5',
    name: 'Divya Krishnamurthy',
    city: 'Hyderabad',
    avatar: '👩🏾',
    rating: 5,
    text: 'Been visiting every weekend for 3 months now. The ambiance is stunning and the baristas actually remember my usual order. This is what a real coffee experience should feel like!',
    date: '1 month ago',
    verified: true,
    drink: 'Cappuccino',
  },
  {
    id: 'r6',
    name: 'Vikram Nair',
    city: 'Kochi',
    avatar: '👨🏽',
    rating: 5,
    text: 'As a Malayali, I was skeptical about the filter coffee. But yaar, these people know their decoction! The coffee beans are from Coorg and you can actually taste the quality. Superb!',
    date: '1 month ago',
    verified: true,
    drink: 'South Indian Filter Coffee',
  },
];
