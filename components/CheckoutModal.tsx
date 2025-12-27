import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, planName, price }) => {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [method, setMethod] = useState<'mfs' | 'card' | null>(null);
  const [mfsProvider, setMfsProvider] = useState<'bkash' | 'nagad' | 'rocket' | null>(null);

  if (!isOpen) return null;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  const MFS_DATA = {
    bkash: { name: 'bKash', color: 'bg-[#E2136E]', logo: 'https://p7.hiclipart.com/preview/440/154/983/bkash-logo-transparent-png.jpg' },
    nagad: { name: 'Nagad', color: 'bg-[#F26422]', logo: 'https://p7.hiclipart.com/preview/440/154/983/bkash-logo-transparent-png.jpg' },
    rocket: { name: 'Rocket', color: 'bg-[#8C3494]', logo: 'https://p7.hiclipart.com/preview/440/154/983/bkash-logo-transparent-png.jpg' }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Secure Checkout</h2>
            <p className="text-sm text-slate-500">{planName} Plan - {price}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 'method' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800 mb-4">Select Payment Method:</p>
              
              <button 
                onClick={() => { setMethod('mfs'); setStep('details'); }}
                className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-brand-blue">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">Mobile Financial Services</p>
                    <p className="text-xs text-slate-500">bKash, Nagad, Rocket</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue" />
              </button>

              <button 
                onClick={() => { setMethod('card'); setStep('details'); }}
                className="w-full flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-brand-blue hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">Debit / Credit Card</p>
                    <p className="text-xs text-slate-500">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue" />
              </button>
              
              <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4" /> Secure SSL Encrypted Connection
              </div>
            </div>
          )}

          {step === 'details' && method === 'mfs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {(['bkash', 'nagad', 'rocket'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMfsProvider(m)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${mfsProvider === m ? 'border-brand-blue bg-blue-50 shadow-inner' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[10px] ${MFS_DATA[m].color}`}>
                      {MFS_DATA[m].name[0]}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{MFS_DATA[m].name}</span>
                  </button>
                ))}
              </div>

              {mfsProvider && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your {MFS_DATA[mfsProvider].name} Number</label>
                    <input 
                      type="text" 
                      placeholder="017XXXXXXXX" 
                      className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                  </div>
                  <button 
                    onClick={handlePayment}
                    className={`w-full py-4 rounded-xl text-white font-bold transition-all ${MFS_DATA[mfsProvider].color} hover:opacity-90 shadow-lg`}
                  >
                    Pay with {MFS_DATA[mfsProvider].name}
                  </button>
                </div>
              )}
              
              <button onClick={() => setStep('method')} className="w-full text-sm text-slate-500 hover:underline">Go Back</button>
            </div>
          )}

          {step === 'details' && method === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-3 pl-12 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue/20" />
                  <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full p-3 border border-slate-200 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">CVV</label>
                  <input type="text" placeholder="XXX" className="w-full p-3 border border-slate-200 rounded-lg outline-none" />
                </div>
              </div>
              <button onClick={handlePayment} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg mt-4">
                Pay Securely Now
              </button>
              <button onClick={() => setStep('method')} className="w-full text-sm text-slate-500 hover:underline">Go Back</button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-900 font-bold text-lg">Verifying Transaction...</p>
              <p className="text-slate-500">Please do not close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Payment Successful!</h3>
                <p className="text-slate-500 mt-2">Welcome to ProDigital Premium. Your access is now active.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;