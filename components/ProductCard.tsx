// components/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ProductItem } from '@/data/products';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80";

export default function ProductCard(product: ProductItem) {
  const { id, title, price, oldPrice, category, rating, reviewsCount, stock, isHot, image } = product;
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState<string>(image);
  
  const handleImgError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount ? Math.round(((oldPrice! - price) / oldPrice!) * 100) : 0;

  return (
    <div className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.14)] hover:border-blue-200 transition-all duration-500 flex flex-col justify-between relative transform hover:-translate-y-1.5">
      
      {/* Upper Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {isHot && (
          <span className="text-[9px] font-extrabold tracking-widest bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-lg uppercase shadow-xs">
            Hot Deal
          </span>
        )}
        {hasDiscount && (
          <span className="text-[9px] font-extrabold tracking-widest bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-lg uppercase shadow-xs">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Detail Redirection Route */}
      <Link href={`/product/${id}`} className="cursor-pointer block overflow-hidden flex-grow">
        <div className="bg-slate-50 h-60 w-full relative overflow-hidden border-b border-slate-50">
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.97]"
            loading="lazy"
          />
          <span className="text-[9px] font-extrabold tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md absolute bottom-4 left-4">
            {category}
          </span>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors h-10 mb-2 leading-snug">
              {title}
            </h3>

            {/* Ratings Row */}
            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex text-amber-400 text-xs tracking-tighter">
                {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
              </div>
              <span className="text-xs font-black text-slate-800 mt-0.5">{rating}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">({reviewsCount} reviews)</span>
            </div>
          </div>
        </div>
      </Link>

      {/* CTA Layout Frame */}
      <div className="p-5 pt-0">
        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">Rs. {price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-semibold">Rs. {oldPrice!.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            {stock > 0 ? (
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg tracking-wide">
                ● In Stock
              </span>
            ) : (
              <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg tracking-wide">
                ✕ Sold Out
              </span>
            )}

            <Link 
              href={`/product/${id}`}
              className="bg-blue-600 hover:bg-blue-700 text-center text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              {stock > 0 ? "Buy Now" : "Details"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}