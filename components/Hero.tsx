import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-white via-blue-50 to-white pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Updated for 2025
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Honest Reviews for <br className="hidden md:block" />
          <span className="text-brand-blue">Digital Growth Tools</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          Stop guessing. We verify uptime, speed, and features of the top software 
          so you can scale your business with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#reviews" 
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-brand-blue hover:bg-blue-700 md:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Browse Top Reviews
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <Link 
            to="/disclosure" 
            className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-colors"
          >
            How We Test
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Unbiased Data</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Expert Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Verified Results</span>
          </div>
        </div>

      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
         <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-blue-200 rounded-full blur-3xl mix-blend-multiply filter"></div>
         <div className="absolute top-[10%] right-[20%] w-72 h-72 bg-orange-100 rounded-full blur-3xl mix-blend-multiply filter"></div>
      </div>
    </div>
  );
};
import { Link } from 'react-router-dom';
export default Hero;