// app/product/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { productsData } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  
  const productId = Number(params.id);
  const product = productsData.find((p) => p.id === productId);

  const [detailImgSrc, setDetailImgSrc] = useState<string>(FALLBACK_IMAGE);

  useEffect(() => {
    if (product) {
      setDetailImgSrc(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-sm">
          <h2 className="text-xl font-black text-slate-900 mb-2">Item Unavailable</h2>
          <p className="text-xs text-slate-400 mb-5">The mobile accessory item might be out of stock or relocated.</p>
          <Link href="/" className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-bold text-slate-400 mb-8 flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link> 
        <span className="text-slate-300">/</span> 
        <span className="text-slate-500">{product.category}</span> 
        <span className="text-slate-300">/</span> 
        <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main Structural Detail Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-slate-100 rounded-3xl p-5 md:p-8 shadow-2xs">
        
        {/* Left Side: Product Image Display */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center max-h-[450px]">
          <img 
            src={detailImgSrc} 
            alt={product.title}
            onError={() => setDetailImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* Right Side: Product Custom Configuration & Checkout Controls */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-3 py-1 rounded-md tracking-widest uppercase border border-blue-100">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">✓ Item Available</span>
              ) : (
                <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-md">✕ Out of Stock</span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-4 leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* Live review counters */}
            <div className="flex items-center gap-2 mt-3 pb-4 border-b border-slate-100">
              <div className="flex text-amber-400 text-sm">
                {"★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm font-black text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400 font-medium">({product.reviewsCount} Verified Customer Orders)</span>
            </div>

            {/* Pricing block */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-black text-blue-600 tracking-tight">Rs. {product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through font-semibold">Rs. {product.oldPrice.toLocaleString()}</span>
              )}
            </div>
            
            {/* Overview Highlights Description */}
            <div className="mt-5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Product Highlights</h4>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed font-medium">{product.description}</p>
            </div>
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-center text-slate-600 bg-slate-50/30 rounded-xl px-2">
            <div className="p-1">
              <p className="text-lg">🛡️</p>
              <p className="text-[10px] font-bold text-slate-800 uppercase mt-1">100% Original</p>
              <p className="text-[9px] text-slate-400 font-medium">Brand Verified</p>
            </div>
            <div className="p-1">
              <p className="text-lg">🔄</p>
              <p className="text-[10px] font-bold text-slate-800 uppercase mt-1">7 Days Return</p>
              <p className="text-[9px] text-slate-400 font-medium">Hassle-Free Claims</p>
            </div>
            <div className="p-1">
              <p className="text-lg">⚡</p>
              <p className="text-[10px] font-bold text-slate-800 uppercase mt-1">Safe Shipping</p>
              <p className="text-[9px] text-gray-400 font-medium">Cash On Delivery</p>
            </div>
          </div>

          {/* 🛒 ADD TO BAG CORE ACTION CART BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button 
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                alert(`${product.title} has been added to your shopping bag!`);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-extrabold py-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center text-xs uppercase tracking-wider cursor-pointer active:scale-98"
            >
              {product.stock > 0 ? "Add To Shopping Bag 🛒" : "Sold Out"}
            </button>
            <Link 
              href="/cart"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 rounded-xl text-center text-xs uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer"
            >
              Open Cart & Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}