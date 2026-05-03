import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/Toast';
import GlobalEffects from '@/components/GlobalEffects';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Artisan Coffee | Experience Excellence',
  description: 'Premium coffee experiences crafted to perfection. Order online in India. Sourced from Coorg, Chikmagalur & Wayanad.',
  keywords: 'coffee, bangalore, specialty coffee, filter coffee, cappuccino, latte, order online, india',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ToastProvider>
          {/* GlobalEffects is a Client Component so dynamic(ssr:false) works */}
          <GlobalEffects />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
