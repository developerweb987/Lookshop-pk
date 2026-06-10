// app/cart/page.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [promo, setPromo] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharges = subtotal > 0 ? 150 : 0;
  
  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'LOOK20') {
      setDiscount(0.20);
      alert("Promo code applied successfully! 20% off.");
    } else {
      alert("Invalid promo code.");
    }
  };

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount + deliveryCharges;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-xs">
          <p className="text-gray-500 text-lg mb-6">Your shopping cart is currently empty.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wide">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  {/* FIXED: Standard layout SVG replaced with live typed thumbnail rendering */}
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-semibold uppercase tracking-wider">{item.category}</p>
                    <p className="text-sm font-black text-blue-600 mt-1">
                      Rs. {item.price.toLocaleString()} <span className="text-xs text-gray-400 font-bold">x {item.quantity}</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors shrink-0 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button onClick={clearCart} className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest pl-1 cursor-pointer">
              Clear All Items
            </button>
          </div>

          {/* Order Summary Summary Panel */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight border-b border-slate-50 pb-3">Order Summary</h3>
            
            <div className="space-y-3 text-sm font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 font-black">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount (20%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-slate-900 font-black">Rs. {deliveryCharges}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-blue-600 text-lg">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo Code Fields */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo Code (e.g., LOOK20)" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 uppercase font-bold text-slate-700 bg-slate-50"
                />
                <button onClick={applyPromo} className="bg-slate-900 text-white font-black px-4 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors cursor-pointer">
                  Apply
                </button>
              </div>
            </div>

            <button 
              onClick={() => { alert('Order Placed Successfully via Cash On Delivery!'); clearCart(); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-colors cursor-pointer text-center"
            >
              Confirm Cash on Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}