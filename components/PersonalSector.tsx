import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Terminal, Activity, Send, Trash2, Key, Bot } from 'lucide-react';
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
  
  // Ref for chat auto-scroll
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --- LOGGING HELPER ---
  const addLog = (message: string, type: 'info' | 'error' | 'success') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  // --- AUTHENTICATION ---
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      // Allows any 4 digit pin for demo, or specifically '1234'
      setIsAuthenticated(true);
      addLog('Access granted to Personal Sector', 'success');
    } else {
      addLog('Invalid PIN format', 'error');
    }
  };

  // --- API KEY ROTATION LOGIC ---
  const getWorkingClient = async (): Promise<{ client: GoogleGenAI, keyIndex: number } | null> => {
    for (let i = 0; i < apiKeys.length; i++) {
      const key = apiKeys[i];
      if (!key) continue;

      try {
        const client = new GoogleGenAI({ apiKey: key });
        return { client, keyIndex: i + 1 };
      } catch (error) {
        addLog(`API Key #${i + 1} configuration error.`, 'error');
      }
    }
    return null;
  };

  const executeGenAIRequest = async (modelName: string, prompt: any, config?: any) => {
    for (let i = 0; i < apiKeys.length; i++) {
      const key = apiKeys[i];
      if (!key) continue;

      try {
        addLog(`Attempting connection with Key #${i + 1}...`, 'info');
        const ai = new GoogleGenAI({ apiKey: key });
        const result = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: config
        });
        addLog(`Success with Key #${i + 1}`, 'success');
        return result;
      } catch (error: any) {
        // Detailed error logging to help identify model vs key issues
        const errorMsg = error.message || JSON.stringify(error);
        addLog(`Key #${i + 1} Failed: ${errorMsg}`, 'error');
        
        if (i === apiKeys.length - 1) {
          throw new Error("All API keys failed or model not found.");
        }
        addLog(`Switching to Key #${i + 2}...`, 'info');
      }
    }
    throw new Error("No API keys available.");
  };

  // --- FEATURE: SITE MONITOR (AI Assistant Display) ---
  const handleScanSite = async () => {
    if (apiKeys.filter(k => k).length === 0) {
      addLog("Please add at least one API Key first.", "error");
      return;
    }

    setMonitorStatus("বিশ্লেষণ চলছে... দয়া করে অপেক্ষা করুন।");
    try {
      const siteSummary = JSON.stringify(products.map(p => ({ name: p.name, rating: p.rating, category: p.category })));
      
      const prompt = `
        এই ওয়েবসাইটের বর্তমান প্রোডাক্ট ডাটা বিশ্লেষণ করুন: ${siteSummary}
        
        অনুগ্রহ করে উত্তরটি সম্পূর্ণ বাংলায় দিন।
        ১. এই ওয়েবসাইটের কন্টেন্ট অনুযায়ী কারা বর্তমানে ভিজিট করছে (Target Audience)?
        ২. অন্যান্য এফিলিয়েট মার্কেটিং সাইটের তুলনায় এটি কতটা লাভজনক বা উপযোগী?
        ৩. উন্নতির জন্য ছোট ১টি পরামর্শ দিন।
        
        খুব সংক্ষেপে পয়েন্ট আকারে উত্তর দিন।
      `;

      // Updated to latest stable model
      const response = await executeGenAIRequest(
        'gemini-3-flash-preview', 
        prompt
      );
      
      setMonitorStatus(response.text || "কোন তথ্য পাওয়া যায়নি।");
    } catch (e: any) {
      setMonitorStatus("স্ক্যান ব্যর্থ হয়েছে। টার্মিনাল লগ দেখুন।");
    }
  };

  // --- FEATURE: ADMIN CHAT (Action Execution) ---
  const handleAdminCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminInput.trim()) return;

    const command = adminInput;
    setAdminInput('');
    addLog(`Admin Command: "${command}"`, 'info');
    setIsThinking(true);

    if (apiKeys.filter(k => k).length === 0) {
      addLog("Please add at least one API Key first.", "error");
      setIsThinking(false);
      return;
    }

    try {
      const currentContext = JSON.stringify(products);
      
      // We ask Gemini to return JSON instructions to modify the state
      const prompt = `
        You are the System Admin for ProDigital Reviews. 
        Current Website Data (JSON): ${currentContext}
        
        User Command: "${command}"
        
        INSTRUCTIONS:
        1. Analyze the command.
        2. If the user is just saying hello, return {"action": "none", "message": "Hello! I am ready to edit the site."}
        3. You can ADD, UPDATE, or DELETE products based on the command.
        4. You MUST return valid JSON only. No markdown formatting.
        5. Structure: { "action": "add" | "update" | "delete" | "none", "data": ..., "message": "optional text" }
        
        Examples:
        - DELETE: { "action": "delete", "id": "product-id" }
        - UPDATE: { "action": "update", "id": "product-id", "changes": { "rating": 5.0 } }
        - ADD: { "action": "add", "data": { ...full product object... } }
      `;

      // Updated to latest stable model
      const response = await executeGenAIRequest(
        'gemini-3-flash-preview', 
        prompt
      );

      const responseText = response.text || "";
      
      // Clean up markdown code blocks if present
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let instructions;
      try {
        instructions = JSON.parse(jsonStr);
      } catch (e) {
        addLog(`AI Response not JSON: ${responseText.substring(0, 50)}...`, 'error');
        return;
      }

      if (instructions.action === 'delete') {
        setProducts(prev => prev.filter(p => p.id !== instructions.id));
        addLog(`Successfully deleted product: ${instructions.id}`, 'success');
      } else if (instructions.action === 'update') {
        setProducts(prev => prev.map(p => p.id === instructions.id ? { ...p, ...instructions.changes } : p));
        addLog(`Successfully updated product: ${instructions.id}`, 'success');
      } else if (instructions.action === 'add') {
        // Ensure ID is unique if not provided properly
        const newProduct = { ...instructions.data, id: instructions.data.id || `new-${Date.now()}` };
        setProducts(prev => [...prev, newProduct]);
        addLog(`Successfully added new product: ${newProduct.name}`, 'success');
      } else if (instructions.action === 'none') {
        addLog(`AI: ${instructions.message || 'No action taken.'}`, 'info');
      } else {
        addLog(`Unknown action received from AI`, 'error');
      }

    } catch (error: any) {
      addLog(`Admin Action Failed: ${error.message}`, 'error');
    } finally {
      setIsThinking(false);
    }
  };

  // --- RENDER: PIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Sector</h2>
          <p className="text-slate-500 mb-6">Enter 4-digit security PIN to access Admin Panel.</p>
          
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
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Unlock System
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-brand-blue" /> Personal Sector Dashboard
            </h1>
            <p className="text-slate-500 text-sm">System Status: Active | User: Admin</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-slate-400 hover:text-red-500">
            <Unlock className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COL 1: API KEYS & MONITOR */}
          <div className="space-y-6">
            
            {/* API Key Manager */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Key className="w-4 h-4 text-orange-500" /> API Key Rotation
              </h2>
              <div className="space-y-3">
                {apiKeys.map((key, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 w-6">#{index + 1}</span>
                    <input 
                      type="password" 
                      placeholder={`API Key ${index + 1} (Free Tier)`}
                      value={key}
                      onChange={(e) => {
                        const newKeys = [...apiKeys];
                        newKeys[index] = e.target.value;
                        setApiKeys(newKeys);
                      }}
                      className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none focus:border-brand-blue"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                System auto-switches to next key if a request fails (429/Quota).
              </p>
            </div>

            {/* AI Site Monitor */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" /> AI Site Assistant
              </h2>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[150px] mb-4 whitespace-pre-line leading-relaxed">
                {monitorStatus}
              </div>
              <button 
                onClick={handleScanSite}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Scan Website Health (Bangla)
              </button>
            </div>

          </div>

          {/* COL 2: ADMIN CHAT INTERFACE */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Admin Chat */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-blue" /> Admin Agent Assistant
                </h2>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Model: Gemini 3 Flash
                </span>
              </div>
              
              {/* Terminal / Chat History */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 font-mono text-sm space-y-2">
                {logs.length === 0 && (
                   <div className="text-center text-slate-400 mt-20">
                     <Terminal className="w-12 h-12 mx-auto mb-2 opacity-20" />
                     <p>Ready for commands.</p>
                     <p className="text-xs">Try: "Delete Semrush" or "Change NordVPN price to $5"</p>
                   </div>
                )}
                {logs.map((log, i) => (
                  <div key={i} className={`flex gap-2 ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-green-600' : 'text-slate-600'}`}>
                    <span className="opacity-50 text-xs mt-1">[{log.timestamp}]</span>
                    <span>{log.message}</span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleAdminCommand} className="flex gap-2">
                  <input 
                    type="text" 
                    value={adminInput}
                    onChange={(e) => setAdminInput(e.target.value)}
                    placeholder={isThinking ? "Admin Agent is working..." : "Type instruction (e.g., 'Remove the Semrush review')"}
                    disabled={isThinking}
                    className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <button 
                    type="submit" 
                    disabled={isThinking}
                    className={`px-6 rounded-lg font-bold text-white flex items-center gap-2 ${isThinking ? 'bg-slate-400' : 'bg-brand-blue hover:bg-blue-600'}`}
                  >
                    {isThinking ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Manual Data Override (Visual confirmation) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-800 mb-2">Live Data Preview</h3>
               <p className="text-sm text-slate-500 mb-4">Total Active Products: {products.length}</p>
               <div className="flex flex-wrap gap-2">
                 {products.map(p => (
                   <span key={p.id} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">
                     {p.name}
                   </span>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSector;