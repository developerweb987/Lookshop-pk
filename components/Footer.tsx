// components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 text-xs font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Information Column */}
        <div className="space-y-4">
          <h4 className="text-white text-base font-black tracking-tight">Lookshop.pk</h4>
          <p className="leading-relaxed font-medium text-gray-400">
            Pakistan's trusted online marketplace for premium mobile accessories. We supply certified original brands with cash on delivery nationwide.
          </p>
          <div className="text-[11px] font-bold text-gray-300">
            <p className="flex items-center gap-2">📞 Helpline: +92 (300) 123-4567</p>
            <p className="flex items-center gap-2 mt-1.5">✉ Support: care@lookshop.pk</p>
          </div>
        </div>

        {/* Quick Shopping Categories Links */}
        <div className="space-y-3">
          <h5 className="text-white font-bold uppercase tracking-wider text-[11px]">Shop Categories</h5>
          <ul className="space-y-2 font-medium">
            <li><a href="#shop-now" className="hover:text-blue-400 transition-colors">High-Speed Chargers</a></li>
            <li><a href="#shop-now" className="hover:text-blue-400 transition-colors">Armored Covers & Cases</a></li>
            <li><a href="#shop-now" className="hover:text-blue-400 transition-colors">Privacy Screen Protectors</a></li>
            <li><a href="#shop-now" className="hover:text-blue-400 transition-colors">MagSafe Power Banks</a></li>
            <li><a href="#shop-now" className="hover:text-blue-400 transition-colors">Premium Wireless Audio</a></li>
          </ul>
        </div>

        {/* Customer Care Shrouds */}
        <div className="space-y-3">
          <h5 className="text-white font-bold uppercase tracking-wider text-[11px]">Customer Support</h5>
          <ul className="space-y-2 font-medium">
            <li><Link href="/track-order" className="hover:text-blue-400 transition-colors">Track Order Status</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-blue-400 transition-colors">Shipping & Logistics Info</Link></li>
            <li><Link href="/returns" className="hover:text-blue-400 transition-colors">7-Day Return & Exchange Form</Link></li>
            <li><Link href="/faq" className="hover:text-blue-400 transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy Terms</Link></li>
          </ul>
        </div>

        {/* Corporate Newsletter Module */}
        <div className="space-y-4">
          <h5 className="text-white font-bold uppercase tracking-wider text-[11px]">Join Our Newsletter</h5>
          <p className="leading-relaxed font-medium">Subscribe to receive instant updates on flash sales, new arrivals, and exclusive coupon codes.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Lookshop.pk updates!'); }} className="flex gap-2">
            <input 
              type="email" 
              required
              placeholder="Enter your email address..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-medium"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0">
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal bar & Payment Badges */}
      <div className="bg-slate-950/80 py-6 border-t border-slate-800/40 text-[11px] font-medium text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Lookshop.pk Store. Handcrafted with Next.js and TypeScript.</p>
          
          {/* Payment Partner Badges Mockup */}
          <div className="flex items-center gap-3 text-gray-400 text-xs select-none tracking-widest font-black opacity-60">
            <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700 text-[9px]">CASH ON DELIVERY</span>
            <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700 text-[9px]">JAZZCASH</span>
            <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700 text-[9px]">EASYPAISA</span>
            <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700 text-[9px]">VISA / MASTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}