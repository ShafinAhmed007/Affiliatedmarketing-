import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">{config.siteTitle}</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Helping businesses and freelancers make data-driven decisions since 2021. We test, rate, and review the best digital tools.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Mail className="h-4 w-4" />
              <span>{config.contactEmail}</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Editorial Guidelines</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
              <li><Link to="/disclosure" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-white font-semibold mb-2 text-sm">Compliance Notice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {config.siteTitle} is an independent professional review site. We may receive compensation from the companies whose products we review. We test each product thoroughly and give high marks to only the very best.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} {config.siteTitle}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
             <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> New York, USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;