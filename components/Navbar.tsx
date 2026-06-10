// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="sticky top-0 z-50 font-sans">
      {/* Upper Announcement Bar */}
      <div className="bg-slate-950 text-white text-[11px] font-bold py-2 px-4 text-center tracking-wider flex justify-between items-center sm:px-8 border-b border-slate-800">
        <span className="hidden sm:inline-block opacity-80">🇵🇰 LOOKSHOP GLOBAL MALL — PREMIUM TECH ACCREDITED</span>
        <span className="mx-auto sm:mx-0 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">⚡ USE CODE "LOOK20" FOR FLAT 20% DISCOUNT</span>
        <div className="hidden md:flex gap-4 opacity-70 font-medium">
          <Link href="/faq" className="hover:text-amber-400 transition-colors">FAQs</Link>
          <Link href="/contact" className="hover:text-amber-400 transition-colors">Support</Link>
        </div>
      </div>

      {/* Glassmorphic Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent tracking-tighter">
              Lookshop.pk
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-1 font-bold text-slate-600 text-[13px] tracking-wide relative">
              <Link href="/" className="px-3 py-2 hover:text-blue-600 hover:bg-slate-100/50 rounded-xl transition-all">Home</Link>
              
              {/* Product Range Dropdown Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3 py-2 hover:text-blue-600 hover:bg-slate-100/50 rounded-xl transition-all flex items-center gap-1 cursor-pointer font-bold text-[13px]"
                >
                  <span>Products</span>
                  <svg className={`w-3 h-3 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                </button>

                {dropdownOpen && (
                  // FIXED: All internal links now feature automated `#shop-now` hash anchor routers
                  <div className="absolute top-11 left-0 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-2 w-52 z-50">
                    <Link href={`/?category=${encodeURIComponent("Chargers")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Chargers</Link>
                    <Link href={`/?category=${encodeURIComponent("Covers & Cases")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Covers & Cases</Link>
                    <Link href={`/?category=${encodeURIComponent("Screen Protectors")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Screen Protectors</Link>
                    <Link href={`/?category=${encodeURIComponent("Power Banks")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Power Banks</Link>
                    <Link href={`/?category=${encodeURIComponent("Cables")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Cables</Link>
                    <Link href={`/?category=${encodeURIComponent("Audio")}#shop-now`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 mx-1.5 rounded-xl text-slate-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">Audio</Link>
                  </div>
                )}
              </div>

              <Link href="/about" className="px-3 py-2 hover:text-blue-600 hover:bg-slate-100/50 rounded-xl transition-all">Our Company</Link>
              <Link href="/faq" className="px-3 py-2 hover:text-blue-600 hover:bg-slate-100/50 rounded-xl transition-all">FAQs</Link>
              <Link href="/contact" className="px-3 py-2 hover:text-blue-600 hover:bg-slate-100/50 rounded-xl transition-all">Contact Us</Link>
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/cart" className="relative p-2.5 bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white rounded-full transition-all flex items-center justify-center active:scale-90 shadow-2xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}