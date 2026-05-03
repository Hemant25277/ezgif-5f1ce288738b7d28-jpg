'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProductShowcase from '@/components/ProductShowcase';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import CartWidget from '@/components/CartWidget';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import Newsletter from '@/components/Newsletter';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';

const HeroCanvasAnimation = dynamic(
  () => import('@/components/HeroCanvasAnimation'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Floating Widgets */}
      <CartWidget />
      <WhatsAppButton />

      {/* Hero: Scroll-Triggered Canvas Animation */}
      <HeroCanvasAnimation />

      {/* Animated Stats Bar */}
      <StatsSection />

      {/* Marquee ticker — menu items scrolling */}
      <MarqueeTicker />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Marquee between sections */}
      <MarqueeTicker />

      {/* Feature Highlights */}
      <FeatureSection />

      {/* About / Brand Story */}
      <AboutSection />

      {/* Customer Reviews + Write a Review */}
      <ReviewsSection />

      {/* Store Locations, Hours, Payments */}
      <LocationSection />

      {/* Newsletter Signup */}
      <Newsletter />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
