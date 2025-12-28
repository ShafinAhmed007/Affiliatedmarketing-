import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, Lock, Crown } from 'lucide-react';
import { SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
}

const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleReviewsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('reviews');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('reviews');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-brand-blue" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                {config.siteTitle.replace('Reviews', '')}<span className="text-brand-blue">Reviews</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Home</Link>
            <button onClick={handleReviewsClick} className="text-slate-600 hover:text-brand-blue font-medium transition-colors bg-transparent border-none cursor-pointer">Reviews</button>
            <Link to="/disclosure" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Transparency</Link>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <Link to="/personal-sector" className="text-slate-400 hover:text-brand-dark flex items-center gap-1 font-medium transition-colors text-sm">
              <Lock className="w-3 h-3" /> Admin
            </Link>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg active:scale-95 group">
              <Crown className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
              Go Premium
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md">Home</Link>
            <button onClick={handleReviewsClick} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md">Reviews</button>
            <Link to="/personal-sector" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md">Admin Panel</Link>
            <div className="p-3">
              <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold">
                <Crown className="w-4 h-4 text-yellow-400" /> Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;