import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Terminal, Activity, Send, Key, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

interface PersonalSectorProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  apiKeys: string[];
  setApiKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}

const PersonalSector: React.FC<PersonalSectorProps> = ({ products, setProducts, apiKeys, setApiKeys }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [adminInput, setAdminInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [monitorStatus, setMonitorStatus] = useState<string>('সিস্টেম নিষ্ক্রিয়। সাইট বিশ্লেষণ করতে "Scan" বাটনে ক্লিক করুন।');
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (message: string, type: 'info' | 'error' | 'success') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.length === 4) {
      setIsAuthenticated(true);
      addLog('Access granted to Personal Sector', 'success');
    } else {
      addLog('Invalid PIN format', 'error');
    }
  };

  const executeGenAIRequest = async (modelName: string, prompt: string, config?: any) => {
    const activeKeys = apiKeys.filter(k => k.trim() !== '');
    if (activeKeys.length === 0) throw new Error("No API keys configured.");

    for (let i = 0; i < activeKeys.length; i++) {
      const key = activeKeys[i];
      try {
        addLog(`Attempting connection with Key #${i + 1}...`, 'info');
        const ai = new GoogleGenAI({ apiKey: key });
        const result = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: config
        });
        
        if (!result || !result.text) throw new Error("Empty response from AI");
        
        addLog(`Success with Key #${i + 1}`, 'success');
        return result.text;
      } catch (error: any) {
        addLog(`Key #${i + 1} Failed: ${error.message || 'Unknown error'}`, 'error');
        if (i === activeKeys.length - 1) throw new Error("All API keys failed.");
      }
    }
    return "";
  };

  const handleScanSite = async () => {
    setMonitorStatus("বিশ্লেষণ চলছে... দয়া করে অপেক্ষা করুন।");
    try {
      const siteSummary = JSON.stringify(products.map(p => ({ name: p.name, rating: p.rating, category: p.category })));
      const prompt = `এই ওয়েবসাইটের বর্তমান প্রোডাক্ট ডাটা বিশ্লেষণ করুন: ${siteSummary}. উত্তরটি বাংলায় সংক্ষেপে দিন। ১. টার্গেট অডিয়েন্স কারা? ২. এটি কতটা লাভজনক? ৩. ১টি ছোট পরামর্শ।`;

      const responseText = await executeGenAIRequest('gemini-3-flash-preview', prompt);
      setMonitorStatus(responseText || "কোন তথ্য পাওয়া যায়নি।");
    } catch (e: any) {
      setMonitorStatus("স্ক্যান ব্যর্থ হয়েছে। টার্মিনাল লগ দেখুন।");
    }
  };

  const handleAdminCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminInput.trim()) return;

    const command = adminInput;
    setAdminInput('');
    addLog(`Admin Command: "${command}"`, 'info');
    setIsThinking(true);

    try {
      const currentContext = JSON.stringify(products);
      const prompt = `
        You are the System Admin. Current Data: ${currentContext}
        User Command: "${command}"
        
        Return ONLY valid JSON.
        { "action": "add" | "update" | "delete" | "none", "id": "product_id_if_any", "data": {product_object_if_adding}, "message": "status message" }
      `;

      const responseText = await executeGenAIRequest(
        'gemini-3-flash-preview', 
        prompt,
        { responseMimeType: "application/json" }
      );

      const instructions = JSON.parse(responseText.trim());

      if (instructions.action === 'delete') {
        setProducts(prev => prev.filter(p => p.id !== instructions.id));
        addLog(`Deleted product: ${instructions.id}`, 'success');
      } else if (instructions.action === 'update') {
        setProducts(prev => prev.map(p => p.id === instructions.id ? { ...p, ...instructions.changes } : p));
        addLog(`Updated product: ${instructions.id}`, 'success');
      } else if (instructions.action === 'add') {
        const newProduct = { ...instructions.data, id: instructions.data.id || `p-${Date.now()}` };
        setProducts(prev => [...prev, newProduct]);
        addLog(`Added new product: ${newProduct.name}`, 'success');
      } else {
        addLog(`AI: ${instructions.message || 'No changes made.'}`, 'info');
      }

    } catch (error: any) {
      addLog(`Admin Action Failed: ${error.message}`, 'error');
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Sector Access</h2>
          <p className="text-slate-500 mb-6">Enter PIN to access System Controls.</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-4xl tracking-[1em] font-mono border-b-2 border-slate-300 focus:border-brand-blue outline-none py-4 mb-8 text-slate-800"
              placeholder="••••"
              autoFocus
            />
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Unlock System
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-brand-blue" /> Personal Sector
            </h1>
            <p className="text-slate-500 text-sm">Target: gemini-3-flash-preview (Stable)</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-slate-400 hover:text-red-500">
            <Unlock className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Key className="w-4 h-4 text-orange-500" /> API Keys
              </h2>
              <div className="space-y-2">
                {apiKeys.map((key, index) => (
                  <input 
                    key={index}
                    type="password" 
                    placeholder={`Key ${index + 1}`}
                    value={key}
                    onChange={(e) => {
                      const newKeys = [...apiKeys];
                      newKeys[index] = e.target.value;
                      setApiKeys(newKeys);
                    }}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none focus:border-brand-blue"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" /> AI Site Monitor
              </h2>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[150px] mb-4 whitespace-pre-line leading-relaxed border border-slate-700">
                {monitorStatus}
              </div>
              <button onClick={handleScanSite} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                Refresh Site Scan
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[550px]">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-blue" /> Admin Agent Assistant
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-900 font-mono text-xs space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-slate-400'}`}>
                    <span className="opacity-40">[{log.timestamp}]</span> {log.message}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleAdminCommand} className="flex gap-2">
                  <input 
                    type="text" 
                    value={adminInput}
                    onChange={(e) => setAdminInput(e.target.value)}
                    placeholder="Type instruction (e.g., 'Delete Semrush')"
                    disabled={isThinking}
                    className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-brand-blue disabled:bg-slate-50"
                  />
                  <button type="submit" disabled={isThinking} className={`px-6 rounded-lg font-bold text-white ${isThinking ? 'bg-slate-400' : 'bg-brand-blue hover:bg-blue-600'}`}>
                    {isThinking ? '...' : <Send className="w-5 h-5" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSector;