// app/layout.tsx
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Premium component footer
import Chatbot from '@/components/Chatbot';

export const metadata = {
  title: 'Lookshop.pk | Premium Mobile Accessories Mall',
  description: 'Pakistan premier shopping engine for chargers, cases, screen protection films, and earbuds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen">
        <CartProvider>
          {/* 1. Header Navigation */}
          <Navbar />
          
          {/* 2. Main Dynamic Content (Pages load here) */}
          <main className="flex-grow">{children}</main>
          
          {/* 3. ONLY ONE Global Premium Footer */}
          <Footer /> 
          
          {/* 4. Support Floating Chatbot */}
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}