import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShieldCheck, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-brand-blue" />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                ProDigital<span className="text-brand-blue">Reviews</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Home</Link>
            <a href="/#reviews" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Reviews</a>
            <Link to="/disclosure" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Transparency</Link>
            <Link to="/personal-sector" className="text-slate-400 hover:text-brand-dark flex items-center gap-1 font-medium transition-colors text-sm">
              <Lock className="w-3 h-3" /> Personal Sector
            </Link>
            <button className="bg-brand-blue hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md"
            >
              Home
            </Link>
            <a 
              href="/#reviews"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md"
            >
              Reviews
            </a>
            <Link 
              to="/personal-sector"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50 rounded-md"
            >
              Personal Sector
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;