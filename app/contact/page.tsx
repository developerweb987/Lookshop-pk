// app/contact/page.tsx
'use client';

import React, { FormEvent } from 'react';

export default function ContactPage() {
  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you! Your help ticket response log has been verified by Lookshop care desk.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect Details */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">Contact Channel</span>
          <h2 className="text-3xl font-black text-gray-200 tracking-tight leading-none">Get In Touch With Us</h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">Have inquiries regarding corporate distributions, dynamic wholesale orders, or customized tracking checks? Connect straight through our operational desk.</p>
          
          <div className="text-xs font-bold text-gray-700 space-y-3 pt-4 border-t border-gray-100">
            <p className="flex items-center gap-3">📍 <span className="text-gray-500 font-medium">Main Office Block, Tech Zone Complex, Karachi, Pakistan.</span></p>
            <p className="flex items-center gap-3">📞 <span className="text-gray-500 font-medium">Help Desk Link: +92 (300) 123-4567</span></p>
            <p className="flex items-center gap-3">✉ <span className="text-gray-500 font-medium">Digital Support Routing: care@lookshop.pk</span></p>
          </div>
        </div>

        {/* Right Aspect Form */}
        <form onSubmit={handleSubmission} className="lg:col-span-7 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
          <h3 className="text-base font-black text-gray-900 tracking-tight">Open Support Ticket</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-800 font-medium" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400">Email Address</label>
              <input type="email" required placeholder="john@example.com" className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-800 font-medium" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400">Message Context Description</label>
            <textarea rows={4} required placeholder="Detail your item delivery question here safely..." className="w-full border border-gray-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-gray-800 font-medium resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer">
            Submit Support Request
          </button>
        </form>

      </div>
    </div>
  );
}