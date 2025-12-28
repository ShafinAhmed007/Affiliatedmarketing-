import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Lock, ShieldAlert, BadgeCheck } from 'lucide-react';

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
  const [formData, setFormData] = useState({ number: '', cardName: '', cardNumber: '', expiry: '', cvv: '' });

  useEffect(() => {
    if (!isOpen) {
      setStep('method');
      setMethod(null);
      setMfsProvider(null);
      setFormData({ number: '', cardName: '', cardNumber: '', expiry: '', cvv: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => setStep('success'), 3500);
  };

  const MFS_DATA = {
    bkash: { name: 'bKash', color: 'bg-[#E2136E]', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bkash_logo.png' },
    nagad: { name: 'Nagad', color: 'bg-[#F26422]', logo: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Nagad_Logo.png' },
    rocket: { name: 'Rocket', color: 'bg-[#8C3494]', logo: 'https://i.ibb.co/L5hYfT3/rocket-logo.png' }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row min-h-[500px]">
        
        {/* Order Summary Sidebar (Desktop) */}
        <div className="bg-slate-50 w-full md:w-64 p-8 border-r border-slate-100 hidden md:block">
           <div className="mb-8">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Order Summary</h3>
             <div className="space-y-4">
               <div className="flex justify-between text-sm">
                 <span className="text-slate-600">{planName}</span>
                 <span className="font-bold text-slate-900">{price}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-slate-600">VAT (0%)</span>
                 <span className="font-bold text-slate-900">৳০</span>
               </div>
               <div className="pt-4 border-t border-slate-200 flex justify-between">
                 <span className="font-bold text-slate-900">Total</span>
                 <span className="font-bold text-brand-blue text-lg">{price}</span>
               </div>
             </div>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3 h-3 text-green-500" /> Secure SSL Encryption
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <BadgeCheck className="w-3 h-3 text-blue-500" /> Authorized Gateway
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
               <Lock className="w-4 h-4 text-slate-400" />
               <span className="text-sm font-bold text-slate-700">Official Payment Gateway</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            {step === 'method' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Select Payment Method</h2>
                  <p className="text-slate-500 text-sm">Please choose your preferred way to pay securely.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => { setMethod('mfs'); setStep('details'); }}
                    className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-2xl hover:border-brand-blue hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Mobile Banking (MFS)</p>
                        <p className="text-xs text-slate-500">bKash, Nagad, Rocket, Upay</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => { setMethod('card'); setStep('details'); }}
                    className="flex items-center justify-between p-5 border-2 border-slate-100 rounded-2xl hover:border-brand-blue hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Card Payment</p>
                        <p className="text-xs text-slate-500">Visa, Mastercard, Amex, UnionPay</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                   <ShieldAlert className="w-5 h-5 text-brand-blue flex-shrink-0" />
                   <p className="text-[10px] text-brand-blue leading-relaxed">
                     Your payment data is encrypted. We do not store your full card number or MFS PIN. Transaction processed via highly secure SSLCommerz/PCI-DSS compliant partner.
                   </p>
                </div>
              </div>
            )}

            {step === 'details' && method === 'mfs' && (
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {(['bkash', 'nagad', 'rocket'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMfsProvider(m)}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${mfsProvider === m ? 'border-brand-blue bg-blue-50 shadow-inner' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[10px] ${MFS_DATA[m].color} shadow-sm uppercase`}>
                        {MFS_DATA[m].name[0]}
                      </div>
                      <span className="text-[10px] font-black text-slate-700 uppercase">{MFS_DATA[m].name}</span>
                    </button>
                  ))}
                </div>

                {mfsProvider ? (
                  <div className="space-y-5 animate-in slide-in-from-top-4 duration-300">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Account Number</label>
                      <div className="relative">
                        <input 
                          required
                          type="tel" 
                          pattern="[0-9]{11}"
                          value={formData.number}
                          onChange={(e) => setFormData({...formData, number: e.target.value})}
                          placeholder="01XXXXXXXXX" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue font-mono text-lg tracking-widest"
                        />
                        <div className="absolute right-4 top-4 text-[10px] font-bold text-slate-400 uppercase">Required</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-[11px] text-amber-700">
                       <p className="font-bold mb-1">Payment Instructions:</p>
                       <ol className="list-decimal pl-4 space-y-1">
                          <li>Enter your {MFS_DATA[mfsProvider].name} account number above.</li>
                          <li>Click the pay button below.</li>
                          <li>Wait for the OTP/PIN request on your mobile screen.</li>
                       </ol>
                    </div>

                    <button 
                      type="submit"
                      className={`w-full py-4 rounded-2xl text-white font-bold transition-all ${MFS_DATA[mfsProvider].color} hover:opacity-90 shadow-xl shadow-pink-200 active:scale-[0.98]`}
                    >
                      Verify & Pay {price}
                    </button>
                  </div>
                ) : (
                   <p className="text-center text-slate-400 text-sm py-8">Please choose an MFS provider to continue.</p>
                )}
                
                <button type="button" onClick={() => setStep('method')} className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Change Method</button>
              </form>
            )}

            {step === 'details' && method === 'card' && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Cardholder Name</label>
                  <input required type="text" placeholder="JOHN DOE" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-blue/10 uppercase font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Card Number</label>
                  <div className="relative">
                    <input required type="text" placeholder="4XXX XXXX XXXX XXXX" className="w-full p-4 pl-14 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-blue/10 font-mono tracking-widest" />
                    <CreditCard className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Expiry Date</label>
                    <input required type="text" placeholder="MM/YY" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-blue/10 font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">CVV / CVC</label>
                    <input required type="password" placeholder="XXX" maxLength={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-blue/10 font-mono" />
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-2xl mt-6 active:scale-[0.98]">
                  Pay {price} Securely
                </button>
                <button type="button" onClick={() => setStep('method')} className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors mt-4">Change Method</button>
              </form>
            )}

            {step === 'processing' && (
              <div className="py-20 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                   <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <p className="text-slate-900 font-black text-xl mb-2">Processing Transaction...</p>
                  <p className="text-slate-500 text-sm">Communicating with the bank's secure server. <br/>Please do not refresh or close this tab.</p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner">
                  <CheckCircle2 className="w-14 h-14" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Thank you for going Pro. Your Premium features have been activated on your account.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left">
                   <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-4">
                      <span>Transaction ID</span>
                      <span className="text-slate-900">PDR-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                   </div>
                   <button 
                    onClick={onClose}
                    className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Go to Member Area
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;