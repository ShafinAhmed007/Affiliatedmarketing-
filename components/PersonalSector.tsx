import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Terminal, Activity, Send, Key, Bot, ShieldCheck, Target, Settings, MoveRight, PlayCircle, Loader2, Plus, Trash2, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Product, SiteConfig } from '../types';

interface PersonalSectorProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  apiKeys: string[];
  setApiKeys: React.Dispatch<React.SetStateAction<string[]>>;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'ai';
}

const PersonalSector: React.FC<PersonalSectorProps> = ({ products, setProducts, apiKeys, setApiKeys, siteConfig, setSiteConfig }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [adminInput, setAdminInput] = useState('');
  const [verificationContext, setVerificationContext] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [monitorStatus, setMonitorStatus] = useState<string>('সিস্টেম প্রস্তুত। আপনার সাইটের কমপ্লায়েন্স চেক করতে "Initiate Deep Site Scan" বাটনে ক্লিক করুন।');
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (message: string, type: 'info' | 'error' | 'success' | 'ai') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.length === 4) {
      setIsAuthenticated(true);
      addLog('সিকিউর সেশন চালু হয়েছে: অ্যাফিলিয়েট অ্যাপ্রুভাল এক্সপার্ট এখন অনলাইন।', 'success');
    } else {
      addLog('Access Denied: Invalid Security Credentials', 'error');
    }
  };

  const executeGenAIRequest = async (modelName: string, prompt: string, config?: any) => {
    const activeKeys = apiKeys.filter(k => k.trim() !== '');
    if (activeKeys.length === 0) throw new Error("কোন অ্যাক্টিভ এপিআই কী পাওয়া যায়নি।");

    for (let i = 0; i < activeKeys.length; i++) {
      const key = activeKeys[i];
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        const result = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: config
        });
        if (!result || !result.text) throw new Error("নাল রেসপন্স পাওয়া গেছে।");
        return result.text;
      } catch (error: any) {
        addLog(`নোড #${i + 1} ত্রুটি: ${error.message}`, 'error');
        if (i === activeKeys.length - 1) throw new Error("Neural link failed.");
      }
    }
    return "";
  };

  const handleScanSite = async () => {
    setIsScanning(true);
    setMonitorStatus("গভীর কমপ্লায়েন্স স্ক্যান চলছে...");
    try {
      const siteSummary = JSON.stringify({
        products: products.map(p => ({ name: p.name, rating: p.rating, category: p.category, desc: p.shortDescription })),
        config: siteConfig,
        target: verificationContext
      });
      
      const prompt = `
        আপনি একজন সিনিয়র অ্যাফিলিয়েট নেটওয়ার্ক কমপ্লায়েন্স অফিসার। 
        সাইটটি বিশ্লেষণ করে একটি "স্থির" এবং "যৌক্তিক" রিপোর্ট প্রদান করুন।
        
        ডাটা: ${siteSummary}
        লক্ষ্য: ${verificationContext || 'General Affiliate Approval'}
        
        স্কোরিং ম্যাট্রিক্স (অবশ্যই এটি মেনে স্কোর দিবেন):
        ১. Affiliate Disclosure (পরিষ্কার ও দৃশ্যমান): ২৫%
        ২. কন্টেন্ট অথরিটি ও E-E-A-T (রিভিউ স্টাইল): ২৫%
        ৩. প্রোডাক্ট সিলেকশন ও প্রাসঙ্গিকতা: ২৫%
        ৪. টার্গেট নেটওয়ার্কের নির্দিষ্ট নীতিমালা অনুসরণ: ২৫%
        
        সতর্কতা: অযথা স্কোর পরিবর্তন করবেন না। ডাটা যদি একই থাকে তবে স্কোরও একই থাকবে। 
        প্রদান করুন:
        ১. অনুমোদনের সম্ভাবনা (Approval Probability): [X]%
        ২. স্কোর কেন এমন হলো তার লজিক্যাল কারণ।
        ৩. কি কি পরিবর্তন করলে স্কোর ১০০% হবে তার সুনির্দিষ্ট তালিকা।
        
        সবকিছু বাংলায় লিখুন।
      `;

      const responseText = await executeGenAIRequest('gemini-3-flash-preview', prompt);
      setMonitorStatus(responseText || "স্ক্যান সম্পন্ন হয়েছে।");
      addLog(`কমপ্লায়েন্স রিপোর্ট আপডেট করা হয়েছে।`, 'success');
    } catch (e: any) {
      setMonitorStatus("স্ক্যান বাতিল হয়েছে। টার্মিনাল লগ চেক করুন।");
    } finally {
      setIsScanning(false);
    }
  };

  const handleTransfer = async () => {
    if (monitorStatus.includes("সিস্টেম প্রস্তুত")) return;
    setIsThinking(true);
    addLog("রিপোর্ট থেকে টেকনিক্যাল PRD জেনারেট করা হচ্ছে...", "info");
    
    try {
      const prompt = `
        নিচের কমপ্লায়েন্স রিপোর্ট থেকে সমাধানের অংশটুকু নিয়ে একটি টেকনিক্যাল এক্সিকিউশন প্ল্যান (PRD) তৈরি করুন।
        রিপোর্ট: ${monitorStatus}
        টার্গেট: ${verificationContext}
        বাংলা ভাষায় নির্দেশনা দিন।
      `;
      const prd = await executeGenAIRequest('gemini-3-flash-preview', prompt);
      setAdminInput(`[EXECUTE PRD FOR ${verificationContext}]:\n${prd}`);
      addLog("PRD সফলভাবে ট্রান্সফার করা হয়েছে।", "success");
    } catch (e: any) {
      addLog("ব্যর্থ হয়েছে: " + e.message, "error");
    } finally {
      setIsThinking(false);
    }
  };

  const handleYouDo = async () => {
    if (monitorStatus.includes("সিস্টেম প্রস্তুত")) return;
    setIsThinking(true);
    addLog("Autonomous Mode Activated: Fixing issues directly...", "ai");

    try {
      const currentContext = JSON.stringify({ products, siteConfig, verificationContext });
      const prompt = `
        মাস্টার অর্কেস্ট্রেটর, স্ক্যানারের এই রিপোর্ট অনুযায়ী সাইটটি অটো-ফিক্স করুন।
        রিপোর্ট: ${monitorStatus}
        টার্গেট: ${verificationContext}
        বর্তমান ডাটা: ${currentContext}

        নির্দেশ: এমনভাবে সাইট সাজান যেন পরবর্তী স্ক্যানে স্কোর ১০০% হয়। 
        শুধুমাত্র JSON ফরম্যাটে উত্তর দিন:
        {
          "action": "modify_data",
          "products": [সম্পূর্ণ আপডেট করা অ্যারে],
          "siteConfig": {সম্পূর্ণ আপডেট করা কনফিগ},
          "log": "বাংলায় বিস্তারিত কাজের বিবরণ"
        }
      `;

      const responseText = await executeGenAIRequest(
        'gemini-3-flash-preview', 
        prompt,
        { responseMimeType: "application/json" }
      );

      const res = JSON.parse(responseText.trim());
      if (res.products) setProducts(res.products);
      if (res.siteConfig) setSiteConfig(res.siteConfig);
      
      addLog(`অটো-পাইলট: ${res.log}`, 'success');
      setTimeout(() => handleScanSite(), 500);

    } catch (error: any) {
      addLog(`Autonomous Failure: ${error.message}`, 'error');
    } finally {
      setIsThinking(false);
    }
  };

  const handleAdminCommand = async (e?: React.FormEvent, customCommand?: string) => {
    if (e) e.preventDefault();
    const commandText = customCommand || adminInput;
    if (!commandText.trim()) return;

    if (!customCommand) setAdminInput('');
    addLog(`নির্দেশ: "${commandText}"`, 'info');
    setIsThinking(true);

    try {
      const currentContext = JSON.stringify({ products, siteConfig, verificationContext });
      const prompt = `
        আপনি একজন সাইট অর্কেস্ট্রেটর।
        টার্গেট: ${verificationContext}
        নির্দেশ: "${commandText}"
        বর্তমান ডাটা: ${currentContext}
        
        উত্তর দিন বাংলায় এবং শুধুমাত্র JSON ফরম্যাটে:
        {
          "action": "modify_data",
          "products": [updated_products],
          "siteConfig": {updated_config},
          "log": "বাংলায় কাজের বিবরণ"
        }
      `;

      const responseText = await executeGenAIRequest(
        'gemini-3-flash-preview', 
        prompt,
        { responseMimeType: "application/json" }
      );

      const res = JSON.parse(responseText.trim());
      if (res.products) setProducts(res.products);
      if (res.siteConfig) setSiteConfig(res.siteConfig);
      addLog(`অ্যাসিস্ট্যান্ট: ${res.log}`, 'ai');

    } catch (error: any) {
      addLog(`ত্রুটি: ${error.message}`, 'error');
    } finally {
      setIsThinking(false);
    }
  };

  // NEW: handleSetFocus - 100% Autonomous Site Reconstruction based on Network Demands
  const handleSetFocus = async () => {
    if (!verificationContext.trim()) return;
    
    addLog(`Focus Account Activation: ${verificationContext} এর জন্য সাইট পুনর্গঠন করা হচ্ছে...`, 'info');
    setIsThinking(true);

    try {
      const prompt = `
        নির্ধারিত লক্ষ্য: ${verificationContext}
        বর্তমান সাইট ডাটা: ${JSON.stringify({ products, siteConfig })}

        আপনার কাজ: 
        ১. ${verificationContext} (যেমন Semrush, Impact, CJ) এর বর্তমান রিকোয়ারমেন্ট এবং ডিমান্ড অনুযায়ী সাইটটিকে ১০০% সাজিয়ে রাখুন।
        ২. সাইটের হেডলাইন, সাব-হেডলাইন এবং ইমেইল এমনভাবে পরিবর্তন করুন যা ওই নেটওয়ার্কের ভেরিফিকেশন পাসে সাহায্য করবে।
        ৩. প্রোডাক্ট লিস্টে ওই নেটওয়ার্কের টপ ক্যাটাগরির টুলস যুক্ত করুন এবং ডেসক্রিপশন অত্যন্ত প্রফেশনাল ও হাই-কনভার্টিং করুন।
        ৪. অ্যাফিলিয়েট ডিসক্লোজার এবং লিগ্যাল পেজগুলো যেন রিয়েল টাইমে ওই নেটওয়ার্কের গাইডলাইন মেনে চলে।

        আপনার এই কাজটির ওপর আমার ভেরিফিকেশন পাস নির্ভর করছে। অত্যন্ত সতর্কতার সাথে কাজ করুন।
        
        JSON ফরম্যাটে উত্তর দিন:
        {
          "action": "modify_data",
          "products": [সম্পূর্ণ পুনর্গঠিত প্রোডাক্ট অ্যারে],
          "siteConfig": {সম্পূর্ণ পুনর্গঠিত কনফিগ},
          "log": "কেন এবং কীভাবে আপনি ${verificationContext} এর জন্য সাইটটি সাজালেন তার বিস্তারিত ব্যাখ্যা বাংলায়"
        }
      `;

      const responseText = await executeGenAIRequest(
        'gemini-3-pro-preview', // Using Pro for complex reconstruction
        prompt,
        { responseMimeType: "application/json" }
      );

      const res = JSON.parse(responseText.trim());
      if (res.products) setProducts(res.products);
      if (res.siteConfig) setSiteConfig(res.siteConfig);
      
      addLog(`Focus Activation Success: ${res.log}`, 'success');
      
      // Auto-scan to show the new status
      setTimeout(() => handleScanSite(), 500);

    } catch (error: any) {
      addLog(`Focus Error: ${error.message}`, 'error');
    } finally {
      setIsThinking(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">পার্সোনাল সেক্টর লগইন</h2>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-4xl tracking-[1em] font-mono border-b-2 border-slate-300 focus:border-brand-blue outline-none py-4 mb-8 text-slate-800"
              placeholder="••••"
            />
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              অথরাইজ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
                Personal Sector <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold animate-pulse">Root Access</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">অ্যাফিলিয়েট কমপ্লায়েন্স এবং স্বয়ংক্রিয় সাইট কন্ট্রোল</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="p-3 text-slate-400 hover:text-red-500 transition-colors">
            <Unlock className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scan & Automation Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-500" /> Site Integrity Scan
              </h2>
              <div className="bg-slate-900 text-green-400 p-5 rounded-xl font-mono text-xs h-[320px] overflow-y-auto mb-4 whitespace-pre-line leading-relaxed border border-slate-700 shadow-inner scrollbar-hide">
                {isScanning ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 opacity-60">
                     <Loader2 className="animate-spin w-8 h-8" />
                     <p>গভীর বিশ্লেষণ চলছে...</p>
                  </div>
                ) : monitorStatus}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button onClick={handleScanSite} disabled={isScanning} className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  {isScanning ? <Loader2 className="animate-spin w-4 h-4" /> : <Activity className="w-4 h-4" />}
                  Initiate Deep Site Scan
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleTransfer} disabled={isScanning || isThinking} className="py-3 bg-brand-blue text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                    <MoveRight className="w-4 h-4" /> Transfer
                  </button>
                  <button onClick={handleYouDo} disabled={isScanning || isThinking} className="py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                    <PlayCircle className="w-4 h-4" /> You Do
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 text-center italic">
                * 'Transfer' রিপোর্টকে PRD তে রূপান্তর করে। 'You Do' সরাসরি ফিক্স করে।
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <Key className="w-3 h-3 text-orange-500" /> Node Configuration
                </h2>
                <button onClick={() => setApiKeys([...apiKeys, ''])} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-600 transition-all" title="Add Node">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide">
                {apiKeys.map((key, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="password" 
                      placeholder={`নোড ${index + 1}`}
                      value={key}
                      onChange={(e) => {
                        const newKeys = [...apiKeys];
                        newKeys[index] = e.target.value;
                        setApiKeys(newKeys);
                      }}
                      className="flex-1 text-[10px] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-brand-blue"
                    />
                    {apiKeys.length > 1 && (
                      <button onClick={() => setApiKeys(apiKeys.filter((_, i) => i !== index))} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assistant Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[740px] overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-blue" /> Admin Agent Assistant
                </h2>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                   <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                   <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs space-y-3">
                {logs.map((log, i) => (
                  <div key={i} className={`p-3 rounded-lg leading-relaxed ${log.type === 'error' ? 'text-red-400 bg-red-950/20' : log.type === 'success' ? 'text-green-400 bg-green-950/20' : log.type === 'ai' ? 'text-blue-300 bg-blue-950/20 italic border-l-2 border-blue-500' : 'text-slate-400 bg-slate-900/40'}`}>
                    <span className="opacity-40 block mb-1 text-[10px]">[{log.timestamp}] {log.type === 'ai' ? 'Neural Link' : 'System Log'}</span> 
                    {log.type === 'ai' ? '🤖 ' : '> '}{log.message}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              <div className="p-6 bg-white border-t border-slate-100 space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleAdminCommand} className="flex gap-2">
                  <div className="relative flex-1">
                    <textarea 
                      value={adminInput}
                      onChange={(e) => setAdminInput(e.target.value)}
                      placeholder="এখানে নির্দেশ দিন অথবা জেনারেটেড PRD দেখুন..."
                      disabled={isThinking}
                      className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-4 min-h-[120px] outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue disabled:bg-slate-50 font-medium text-slate-700 resize-none shadow-inner"
                    />
                    <Settings className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                  </div>
                  <button type="submit" disabled={isThinking} className={`px-6 h-[120px] rounded-xl font-bold text-white shadow-lg flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${isThinking ? 'bg-slate-400' : 'bg-brand-blue hover:bg-blue-600'}`}>
                    {isThinking ? <Loader2 className="animate-spin w-6 h-6" /> : <Send className="w-6 h-6" />}
                    <span className="text-[10px] uppercase tracking-tighter">Execute</span>
                  </button>
                </form>

                <div className="pt-2">
                   <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Target className="w-3 h-3 text-red-500" /> Focus Account Verification
                   </div>
                   <div className="flex gap-2">
                     <input 
                        type="text" 
                        value={verificationContext}
                        onChange={(e) => setVerificationContext(e.target.value)}
                        placeholder="যেমন: Semrush, Impact.com, CJ"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-red-400 transition-all"
                     />
                     <button 
                       onClick={handleSetFocus}
                       disabled={isThinking}
                       className="px-6 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95"
                     >
                       <RefreshCw className={`w-3 h-3 ${isThinking ? 'animate-spin' : ''}`} /> Set Focus
                     </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSector;