// app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 font-sans text-gray-800">
      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">Our Mission</span>
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-200 mt-3 mb-6">About Lookshop.pk</h1>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
        Founded with a vision to streamline tech access, Lookshop.pk stands as Pakistan's premium catalog hub for premium tech mobile components. We address standard distribution vulnerabilities by curating fully verified equipment directly from authorized manufacturing outlets.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">🔒 Authenticity Gurantee</h4>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">Every charger block, case protection layer, and earbud configuration undergoes rigorous electrical testing parameters to avoid compatibility drops.</p>
        </div>
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">🚀 Consumer Central Logistics</h4>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">With integrated flat rate pricing infrastructures across Sindh, Punjab, KPK, and Balochistan, packages clear standard custom checkpoints efficiently.</p>
        </div>
      </div>
    </div>
  );
}