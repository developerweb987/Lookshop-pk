// app/faq/page.tsx
'use html';
'use client';

import React, { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  { q: "Are all mobile accessory variants 100% genuine?", a: "Yes. Lookshop.pk explicitly sources tech devices directly from factory distribution paths (such as Anker, Ugreen, Baseus) bypassing unauthorized third-party middle channels entirely." },
  { q: "What are your standard delivery timeframes across Pakistan?", a: "We dispatch items instantly via secure overnight parcel networks. Delivery across major centers (Karachi, Lahore, Islamabad) takes 2-3 business days, while peripheral zones clear within 4-5 working days." },
  { q: "How can I apply the chatbot coupon code 'LOOK20'?", a: "Copy the code string 'LOOK20'. Proceed directly into your shopping cart summary configuration panel, input the validation sequence into the active promo text block field, and trigger apply to slice subtotal rates by an immediate 20% value." },
  { q: "Do you offer a replacement guarantee on defective adapters or cables?", a: "Absolutely. We provide a complete 7-day hassle-free structural return policy. If an engineering hardware breakdown is detected, open an alert ticket via our contact page for immediate replacements." }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 font-sans">
      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">Help Center</span>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-200 mt-3 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-3">
        {FAQ_DATA.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xs">
              <button 
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="w-full p-5 text-left font-bold text-sm text-gray-800 hover:text-blue-600 transition-colors flex justify-between items-center cursor-pointer"
              >
                <span>{item.q}</span>
                <span className="text-base text-gray-400 font-light">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-500 leading-relaxed font-medium border-t border-gray-50 bg-gray-50/20 animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}