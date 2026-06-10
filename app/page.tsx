// app/page.tsx
'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CATEGORIES = ["All Items", "Chargers", "Covers & Cases", "Screen Protectors", "Power Banks", "Cables", "Audio"];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [sortOrder, setSortOrder] = useState<string>('featured');

  // Yeh effect sirf navbar clicks (URL params) ko listen karega jab user kisi aur page se aayega
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  // FIXED: Pure local state filter—behave EXACTLY like the sort dropdown (No URL push, No scroll jank)
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Instant Filtering & Sorting Engine
  const processedProducts = useMemo(() => {
    let output = [...productsData];

    // 1. Live Text Search
    if (search.trim()) {
      const query = search.toLowerCase();
      output = output.filter(p => p.title.toLowerCase().includes(query));
    }

    // 2. Instant Local Category Filter
    if (selectedCategory !== 'All Items') {
      output = output.filter(p => p.category === selectedCategory);
    }

    // 3. Instant Sort Engine
    if (sortOrder === 'price-low') {
      output.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      output.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'top-rated') {
      output.sort((a, b) => b.rating - a.rating);
    }

    return output;
  }, [search, selectedCategory, sortOrder]);

  return (
    <main id="shop-now" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Glassmorphic Filtering Control Dashboard */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.01)] space-y-5 mb-12">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Active Live Search Input */}
          <div className="w-full lg:max-w-md relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search premium ecosystem (e.g. Anker, Magsafe)..."
              className="w-full bg-slate-50/80 border border-slate-200/60 px-4 py-3 rounded-2xl text-xs focus:outline-none focus:border-blue-500 font-semibold text-slate-800 tracking-wide"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>

          {/* Filtering Dropdown (Instant Behavior) */}
          <div className="w-full lg:w-auto flex items-center gap-3 justify-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-50/80 border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="featured">Featured Catalog</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="top-rated">Highest Ratings</option>
            </select>
          </div>
        </div>

        {/* Categories Tab badging stream layout (FIXED: Now filters instantly in place) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-50 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-95 ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid counters label feedback row */}
      <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8 pl-1">
        Found {processedProducts.length} Premium Options for <span className="text-blue-600">"{selectedCategory}"</span>
      </div>

      {/* Search Fallback View */}
      {processedProducts.length === 0 && (
        <div className="bg-white border border-slate-100 p-20 text-center rounded-3xl shadow-2xs">
          <span className="text-5xl block animate-bounce">🔍</span>
          <h4 className="text-lg font-black text-slate-800 mt-5">No Matching Accessories</h4>
          <p className="text-xs text-slate-400 mt-2 font-medium">Verify your query string parameters or switch category selectors.</p>
          <button 
            onClick={() => { setSearch(''); handleCategoryChange('All Items'); }}
            className="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
          >
            Reset Marketplace
          </button>
        </div>
      )}

      {/* Upgraded Premium Dashboard Bento Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-in fade-in duration-500">
        {processedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <div className="font-sans bg-slate-50/30 min-h-screen">
      
      {/* High-End Hero Section */}
      <section className="relative bg-[#0b0f19] text-white py-24 md:py-32 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-inner">
              📱 Premium Mobile Accessories Hub
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Elite Armor & Power <br /> For Your Flagships
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl font-medium leading-relaxed">
              Don't compromise your premium devices. Shop calibrated GaN fast chargers, tough military-grade cases, and audiophile-level wireless sound gear customized for <span className="text-white font-bold underline decoration-blue-500 decoration-2">iPhone & Samsung Galaxy</span>.
            </p>
            
            <div className="flex flex-wrap gap-3 text-[11px] font-bold text-slate-300 pt-2">
              <span className="bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">⚡ 65W GaN Power</span>
              <span className="bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">🛡️ Spigen & Anker Ecosystems</span>
              <span className="bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">💎 9H Diamond Glass</span>
            </div>

            <div className="pt-4">
              <a href="#shop-now" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 inline-block">
                Shop New Arrivals
              </a>
            </div>
          </div>

          {/* Right Visual Bento Grid */}
          <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/40 p-4 rounded-3xl border border-slate-800/50 shadow-2xl transform translate-y-6 hover:translate-y-4 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=80" alt="GaN Charger" className="rounded-2xl h-40 w-full object-cover mb-3" />
                <h4 className="text-xs font-bold text-white truncate">Anker Fast Chargers</h4>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/40 p-4 rounded-3xl border border-slate-800/50 shadow-2xl hover:translate-y-2 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=80" alt="Silicone Case" className="rounded-2xl h-32 w-full object-cover mb-3" />
                <h4 className="text-xs font-bold text-white truncate">Premium Silicone Cases</h4>
              </div>
            </div>
            <div className="space-y-4 pt-10">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/40 p-4 rounded-3xl border border-slate-800/50 shadow-2xl transform -translate-y-4 hover:-translate-y-6 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80" alt="Earbuds" className="rounded-2xl h-36 w-full object-cover mb-3" />
                <h4 className="text-xs font-bold text-white truncate">Wireless Earbuds</h4>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800/40 p-4 rounded-3xl border border-slate-800/50 shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80" alt="Power Bank" className="rounded-2xl h-36 w-full object-cover mb-3" />
                <h4 className="text-xs font-bold text-white truncate">MagSafe Power Banks</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Value Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl mb-1.5">🚚</span>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Fast Courier Delivery</h5>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">Flat Rs. 150 processing rate across Pakistan</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl mb-1.5">🔒</span>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Cash Inspection Safety</h5>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">Verify packages directly before paying courier</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl mb-1.5">🛡️</span>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Authenticity Certified</h5>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold">Direct company warranties on all factory equipment</p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-32 text-xs font-black text-slate-400 tracking-widest uppercase animate-pulse">Synchronizing Global Retail Stock...</div>}>
        <MarketplaceContent />
      </Suspense>

    </div>
  );
}