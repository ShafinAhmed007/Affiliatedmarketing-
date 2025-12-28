import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white pt-16 pb-16 lg:pt-24 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            <span>Independent & 100% Honest Reviews</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8 whitespace-pre-line">
            {config.heroHeadline.split(' Confidence.')[0]} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-600">Confidence.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
            {config.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={scrollToReviews}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-white bg-brand-blue hover:bg-blue-700 shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1"
            >
              Explore Top Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/disclosure" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border-2 border-slate-200 text-lg font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Our Testing Process
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-500 border-t border-slate-100 pt-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Real User Data</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>No Sponsored Bias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;