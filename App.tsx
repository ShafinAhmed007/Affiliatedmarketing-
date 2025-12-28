import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProductCard from './components/ProductCard';
import ReviewDetail from './components/ReviewDetail';
import LegalPage from './components/LegalPage';
import PersonalSector from './components/PersonalSector';
import CheckoutModal from './components/CheckoutModal';
import { products as initialProducts } from './services/data';
import { Product, SiteConfig } from './types';
import { Crown, Check, Zap, Target, TrendingUp, ShieldCheck } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC<{ products: Product[]; config: SiteConfig }> = ({ products, config }) => {
  const [checkoutData, setCheckoutData] = useState<{ isOpen: boolean; plan: string; price: string }>({
    isOpen: false,
    plan: '',
    price: ''
  });

  return (
    <>
      <Hero config={config} />
      <TrustBar />
      
      {/* Product Feed */}
      <section className="py-16 px-4 max-w-7xl mx-auto" id="reviews">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Trending Digital Tools</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our editorial team independently tests and reviews the best software on the market.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Go Premium Section - Value Proposition */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Professional Affiliate Marketers Choose ProDigital</h2>
            <p className="text-slate-500">আমরা শুধু রিভিউ দেই না, আমরা আপনার সফলতার রোডম্যাপ তৈরি করি।</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-brand-blue">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Expired Domains List</h3>
              <p className="text-slate-600 text-sm leading-relaxed">প্রতি সপ্তাহে হাই-অথরিটি (DA 30+) এক্সপায়ারড ডোমেইন এর লিস্ট পান যা দিয়ে সহজেই অ্যাফিলিয়েট সাইট র‍্যাঙ্ক করা সম্ভব।</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">SEO Volatility Alerts</h3>
              <p className="text-slate-600 text-sm leading-relaxed">গুগল অ্যালগরিদম আপডেট আসার আগেই সতর্কবাণী এবং আপনার সাইটকে পেনাল্টি থেকে বাঁচানোর সিক্রেট টিপস।</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Affiliate Approval Guarantee</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Semrush বা Impact-এর মতো বড় নেটওয়ার্ক থেকে রিজেকশন খেয়েছেন? আমাদের প্রিমিয়াম গাইডলাইন ফলো করলে ১০০% অ্যাপ্রুভাল গ্যারান্টি।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Premium Section */}
      <section className="bg-slate-900 py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Crown className="text-yellow-400 w-10 h-10" /> Upgrade to Premium
            </h2>
            <p className="text-slate-400 text-lg">অ্যাফিলিয়েট মার্কেটিং এ সফল হতে আজই জয়েন করুন।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
              <div className="text-3xl font-bold text-white mb-6">Free</div>
              <ul className="space-y-4 mb-8">
                {['Public Reviews', 'Basic Comparisons', 'Weekly Newsletter'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-slate-600 text-white font-semibold hover:bg-slate-700 transition-colors">Current Plan</button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl transform scale-105 border-2 border-brand-blue relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recommended</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pro Member</h3>
              <div className="text-3xl font-bold text-slate-900 mb-6">৳৫৯৯<span className="text-sm font-normal text-slate-500">/month</span></div>
              <ul className="space-y-4 mb-8">
                {[
                  'Weekly High-DA Expired Domains', 
                  'Private "Approval-Only" Templates', 
                  'Discord Mastermind Access', 
                  'Direct Expert Software Support'
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-700 text-sm">
                    <Check className="w-4 h-4 text-brand-blue" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setCheckoutData({ isOpen: true, plan: 'Pro Member', price: '৳৫৯৯/mo' })}
                className="w-full py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Get Premium Access
              </button>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Elite Business</h3>
              <div className="text-3xl font-bold text-white mb-6">৳১,৯৯৯<span className="text-sm font-normal text-slate-500">/year</span></div>
              <ul className="space-y-4 mb-8">
                {['1-on-1 Strategy Call', 'Complete Site Audit (Done-for-you)', 'Custom Verification Logic', 'All Pro Features'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-blue-400" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setCheckoutData({ isOpen: true, plan: 'Elite Business', price: '৳১,৯৯৯/yr' })}
                className="w-full py-3 rounded-xl border border-slate-600 text-white font-semibold hover:bg-slate-700 transition-colors"
              >
                Go Elite (Best Value)
              </button>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center items-center gap-8 opacity-40 grayscale contrast-125">
             <div className="text-white font-bold text-xl italic">bKash</div>
             <div className="text-white font-bold text-xl italic">Nagad</div>
             <div className="text-white font-bold text-xl italic">Rocket</div>
             <div className="text-white font-bold text-xl italic">VISA</div>
          </div>
        </div>
      </section>

      <CheckoutModal 
        isOpen={checkoutData.isOpen} 
        onClose={() => setCheckoutData({ ...checkoutData, isOpen: false })}
        planName={checkoutData.plan}
        price={checkoutData.price}
      />
    </>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pdr_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('pdr_site_config');
    return saved ? JSON.parse(saved) : {
      siteTitle: "ProDigital Reviews",
      heroHeadline: "Build Your Stack with Confidence.",
      heroSubheadline: "আমরা হাজার হাজার ডিজিটাল টুলস পরীক্ষা করে আপনার জন্য সেরাটি খুঁজে বের করি।",
      contactEmail: "info@biodomains-onsale.bio",
      isVerificationMode: false
    };
  });

  const [apiKeys, setApiKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('pdr_api_keys');
    return saved ? JSON.parse(saved) : ['', '', '', '', ''];
  });

  useEffect(() => {
    localStorage.setItem('pdr_products', JSON.stringify(products));
    localStorage.setItem('pdr_site_config', JSON.stringify(siteConfig));
  }, [products, siteConfig]);

  useEffect(() => {
    localStorage.setItem('pdr_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-dark">
        <Navbar config={siteConfig} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} config={siteConfig} />} />
            <Route path="/review/:id" element={<ReviewDetail products={products} />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/disclosure" element={<LegalPage type="disclosure" />} />
            <Route 
              path="/personal-sector" 
              element={
                <PersonalSector 
                  products={products} 
                  setProducts={setProducts} 
                  apiKeys={apiKeys}
                  setApiKeys={setApiKeys}
                  siteConfig={siteConfig}
                  setSiteConfig={setSiteConfig}
                />
              } 
            />
          </Routes>
        </main>
        <Footer config={siteConfig} />
      </div>
    </HashRouter>
  );
};

export default App;