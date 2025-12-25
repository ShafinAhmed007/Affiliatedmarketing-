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
import { products as initialProducts } from './services/data';
import { Product } from './types';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <>
      <Hero />
      <TrustBar />
      <section className="py-16 px-4 max-w-7xl mx-auto" id="reviews">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Trending Digital Tools</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our editorial team independently tests and reviews the best software on the market. 
            Compare features, pricing, and performance to make data-driven decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section className="bg-white py-16 px-4 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Trust ProDigital Reviews?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Independent Testing</h3>
              <p className="text-slate-600 text-sm">We buy our own subscriptions to test features authentically.</p>
            </div>
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Data-Driven Ratings</h3>
              <p className="text-slate-600 text-sm">Our scores are based on uptime, speed, and real usability metrics.</p>
            </div>
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Transparent Disclosure</h3>
              <p className="text-slate-600 text-sm">We are upfront about how we make money. No hidden agendas.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const App: React.FC = () => {
  // Global State for Products (allows AI to modify them)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pdr_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Global State for API Keys
  const [apiKeys, setApiKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('pdr_api_keys');
    return saved ? JSON.parse(saved) : ['', '', '', '', ''];
  });

  useEffect(() => {
    localStorage.setItem('pdr_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pdr_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-dark">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/review/:id" element={<ReviewDetail products={products} />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/disclosure" element={<LegalPage type="disclosure" />} />
            
            {/* New AI Personal Sector */}
            <Route 
              path="/personal-sector" 
              element={
                <PersonalSector 
                  products={products} 
                  setProducts={setProducts} 
                  apiKeys={apiKeys}
                  setApiKeys={setApiKeys}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;