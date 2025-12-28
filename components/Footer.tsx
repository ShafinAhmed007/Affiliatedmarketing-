import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin, Globe, CreditCard, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Shield className="h-6 w-6 text-brand-blue" />
              <span className="font-bold text-lg">{config.siteTitle}</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Helping businesses and freelancers make data-driven decisions since 2021. We provide deep testing, performance metrics, and compliance-ready reviews for the world's best digital tools.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-brand-blue" />
                <span>{config.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Globe className="h-4 w-4 text-brand-blue" />
                <span>www.biodomains-onsale.bio</span>
              </div>
              <div className="pt-2 space-y-2">
                <a 
                  href="https://wa.me/qr/IZ2VD4HDSUGQD1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-slate-400 hover:text-green-400 transition-colors bg-white/5 p-2 rounded-lg border border-white/10 group"
                >
                  <MessageCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">Chat Support</span>
                    <span className="opacity-60 text-[10px]">Click to connect on WhatsApp</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-brand-blue transition-colors">Expert Reviews</Link></li>
              <li><Link to="/disclosure" className="hover:text-brand-blue transition-colors">Editorial Standards</Link></li>
              <li><Link to="/" className="hover:text-brand-blue transition-colors">Partner Program</Link></li>
              <li><Link to="/personal-sector" className="hover:text-brand-blue transition-colors">Compliance Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Legal & Privacy</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclosure" className="hover:text-brand-blue transition-colors">Affiliate Disclosure</Link></li>
              <li><Link to="/disclosure" className="hover:text-brand-blue transition-colors">GDPR Compliance</Link></li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-white font-bold mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-500" /> Compliance
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
              {config.siteTitle} is an independent review hub. Compensation from partners never influences our ratings. We maintain strict editorial integrity to ensure you get unbiased data for your business.
            </p>
            <div className="flex gap-2">
               <div className="w-8 h-5 bg-slate-700 rounded-sm"></div>
               <div className="w-8 h-5 bg-slate-700 rounded-sm"></div>
               <div className="w-8 h-5 bg-slate-700 rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {currentYear} {config.siteTitle} Network. Powered by Secure BioDomains Architecture.
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-brand-blue" /> Global Head Office</span>
             <span className="flex items-center gap-1.5"><CreditCard className="h-3 w-3 text-brand-blue" /> PCI-DSS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;