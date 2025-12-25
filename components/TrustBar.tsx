import React from 'react';

const TrustBar: React.FC = () => {
  // Using simple text placeholders or generic SVG shapes to simulate logos for this demo
  // In production, these would be grayscale SVGs of "Featured In" or "Tools We Review"
  return (
    <div className="bg-white border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
          We review tools used by industry leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
          {/* Mock Logos - Replace with real SVGs */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
            <span className="font-bold text-xl text-slate-800">Google</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="font-bold text-xl text-slate-800">Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
            <span className="font-bold text-xl text-slate-800">Shopify</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-sm"></div>
            <span className="font-bold text-xl text-slate-800">HubSpot</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            <span className="font-bold text-xl text-slate-800">WordPress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;