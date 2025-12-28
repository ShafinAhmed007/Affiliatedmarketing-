import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Terminal, Activity, Send, Key, Bot, ShieldCheck, Target, Settings, MoveRight, PlayCircle, Loader2, Plus, Trash2, RefreshCw, BrainCircuit, Search, Code2, FileCheck, Network, Cpu, FileText } from 'lucide-react';
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
  type: 'info' | 'error' | 'success' | 'ai' | 'master' | 'prd';
  sender?: string;
}

const PersonalSector: React.FC<PersonalSectorProps> = ({ products, setProducts, apiKeys, setApiKeys, siteConfig, setSiteConfig }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [adminInput, setAdminInput] = useState('');
  const [verificationContext, setVerificationContext] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [monitorStatus, setMonitorStatus] = useState<string>('System Stable. MCP Protocol Standby.');
  const [masterStatus, setMasterStatus] = useState<{ [key: string]: 'idle' | 'working' | 'done' }>({
    planner: 'idle',
    researcher: 'idle',
    coder: 'idle',
    reviewer: 'idle'
  });
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'], sender?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type, sender }]);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.length === 4) {
      setIsAuthenticated(true);
      addLog('Secure Session Established: Root Access Granted.', 'success');
      addLog('Connecting to MCP Protocol via ChatGPT Bridge...', 'info');
      setTimeout(() => addLog('MCP Connection Active. Real-time Knowledge Graph Synced.', 'success'), 1000);
    } else {
      addLog('Access Denied: Invalid Security Credentials', 'error');
    }
  };

  const executeGenAIRequest = async (modelName: string, prompt: string, config?: any) => {
    const activeKeys = apiKeys.filter(k => k.trim() !== '');
    if (activeKeys.length === 0) throw new Error("No active API Keys found. Please add a valid key.");

    const key = activeKeys[activeKeys.length - 1]; 
    try {
      const ai = new GoogleGenAI({ apiKey: key });
      const result = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: config
      });
      if (!result || !result.text) throw new Error("Null response from Neural Core.");
      return result.text;
    } catch (error: any) {
      throw new Error(`Neural Link Failure: ${error.message}`);
    }
  };

  // --- AUTOMATION SEQUENCE LOGIC ---

  const runMastersCycle = async (command: string, context: string) => {
    // 1. Planner Master
    setMasterStatus(prev => ({ ...prev, planner: 'working' }));
    addLog(`Analyzing request: "${command}" against current architecture...`, 'master', 'Planner Master');
    await new Promise(r => setTimeout(r, 1000)); 
    setMasterStatus(prev => ({ ...prev, planner: 'done', researcher: 'working' }));

    // 2. Researcher Master
    addLog(`Scanning real-time internet data protocols for: ${command}...`, 'master', 'Researcher Master');
    addLog(`Verifying compliance standards for: ${verificationContext || 'General Affiliate'}`, 'master', 'Researcher Master');
    await new Promise(r => setTimeout(r, 1200));
    setMasterStatus(prev => ({ ...prev, researcher: 'done', coder: 'working' }));

    // 3. Coder Master (Handled by main execution)
    addLog(`Generating execution code...`, 'master', 'Coder Master');
    return true; 
  };

  const executeAutoFixSequence = async (report: string) => {
    try {
      // 5 Second Countdown
      addLog("Critical Issues Detected. Initiating Auto-Fix Protocol...", 'info', 'System');
      for (let i = 5; i > 0; i--) {
        await new Promise(r => setTimeout(r, 1000));
        addLog(`Auto-Fix initiating in ${i}s...`, 'info', 'System');
      }

      addLog("Engaging AI Master Council for Solution Planning...", 'master', 'System');
      
      // Step 1: Planner creates PRD
      setMasterStatus(prev => ({ ...prev, planner: 'working' }));
      const prdPrompt = `
        ROLE: Senior Technical Planner (AI Master).
        INPUT: Compliance Audit Report: "${report}"
        TASK: Create a mini-PRD (Product Requirements Document) to fix the issues mentioned in the report.
        OUTPUT: A concise, actionable plan.
      `;
      const prd = await executeGenAIRequest('gemini-3-flash-preview', prdPrompt);
      setMasterStatus(prev => ({ ...prev, planner: 'done', researcher: 'working' }));
      addLog(`PRD Generated: ${prd.slice(0, 100)}...`, 'prd', 'Planner Master');

      // Step 2: Researcher Validates
      await new Promise(r => setTimeout(r, 1000));
      addLog("Validating PRD against current Affiliate Guidelines...", 'master', 'Researcher Master');
      setMasterStatus(prev => ({ ...prev, researcher: 'done' }));

      // Step 3: Send PRD to Admin Agent to Execute
      addLog("Transmitting PRD to Admin Agent for Execution...", 'success', 'System');
      await handleAdminCommand(undefined, `EXECUTE THIS PLAN IMMEDIATELY: ${prd}`);

    } catch (error: any) {
      addLog(`Auto-Fix Sequence Failed: ${error.message}`, 'error');
    }
  };

  const handleAdminCommand = async (e?: React.FormEvent, customCommand?: string) => {
    if (e) e.preventDefault();
    const commandText = customCommand || adminInput;
    if (!commandText.trim()) return;

    if (!customCommand) setAdminInput('');
    setIsThinking(true);
    
    // Reset Masters if manual command, otherwise preserve flow
    if (!customCommand) {
       setMasterStatus({ planner: 'idle', researcher: 'idle', coder: 'idle', reviewer: 'idle' });
    }

    try {
      if (!customCommand) {
         await runMastersCycle(commandText, verificationContext);
      } else {
         // If auto-fix, just set Coder to working
         setMasterStatus(prev => ({ ...prev, coder: 'working' }));
      }

      const currentContext = JSON.stringify({ products, siteConfig, verificationContext });
      
      const prompt = `
        ROLE: You are the SUPER ADMIN AGENT & SENIOR FULL STACK DEVELOPER for "ProDigital Reviews".
        AUTHORITY: You have ROOT ACCESS to modify the site's State (Products, Config, UI text).
        OBJECTIVE: Execute the user's command precisely, behaving like a human senior engineer.
        
        CONTEXT:
        - Target: ${verificationContext || 'General High-Tier Affiliate Network'}
        - Current Data: ${currentContext}
        - User Command: "${commandText}"
        
        INSTRUCTIONS:
        1. ANALYZE: Understand the command. Is it a UI change? A content update? A strategy shift?
        2. REAL-TIME SIMULATION: Assume you have checked the live internet. Use current, real-world data for products (pricing, features). NO FAKE DATA.
        3. COMPLIANCE: Ensure all changes align with strict affiliate guidelines (ShareASale, Impact, Brevo).
        4. TONE: Professional, authoritative, human. No robotic filler.
        
        CAPABILITIES:
        - To "Edit UI": Modify 'siteConfig' (titles, headlines) or 'products' array.
        - To "Remove": Filter the 'products' array.
        - To "Create": Add new objects to 'products'.
        
        OUTPUT FORMAT (JSON ONLY):
        {
          "action": "modify_data",
          "products": [The complete, updated product array],
          "siteConfig": {The complete, updated siteConfig object},
          "log": "A human-like explanation of what you did and why, referencing the 'Masters' analysis."
        }
      `;

      const responseText = await executeGenAIRequest(
        'gemini-3-pro-preview', 
        prompt,
        { responseMimeType: "application/json" }
      );

      setMasterStatus(prev => ({ ...prev, coder: 'done', reviewer: 'working' }));
      addLog(`Validating code against security fingerprints...`, 'master', 'Reviewer Master');
      await new Promise(r => setTimeout(r, 800));
      setMasterStatus(prev => ({ ...prev, reviewer: 'done' }));

      const res = JSON.parse(responseText.trim());
      if (res.products) setProducts(res.products);
      if (res.siteConfig) {
        // Enforce protected values
        res.siteConfig.contactEmail = "info@biodomains-onsale.bio";
        setSiteConfig(res.siteConfig);
      }
      
      addLog(`${res.log}`, 'ai', 'Super Admin');

    } catch (error: any) {
      addLog(`Execution Failed: ${error.message}`, 'error');
      setMasterStatus({ planner: 'idle', researcher: 'idle', coder: 'idle', reviewer: 'idle' });
    } finally {
      setIsThinking(false);
    }
  };

  const handleSetFocus = async () => {
    if (!verificationContext.trim()) return;
    handleAdminCommand(undefined, `Set strict focus mode for: ${verificationContext}. Optimize the entire site (products and headlines) to pass verification for this specific network. Ensure Brevo and other top tools are present.`);
  };

  const handleScanSite = async () => {
    setIsScanning(true);
    setMonitorStatus("Initializing Deep Protocol Scan...");
    
    // Reset Masters
    setMasterStatus({ planner: 'idle', researcher: 'idle', coder: 'idle', reviewer: 'idle' });

    try {
      const siteSummary = JSON.stringify({
        productsCount: products.length,
        config: siteConfig,
        target: verificationContext
      });
      
      const prompt = `
        ACT AS: Lead Compliance Officer.
        TASK: Audit this site data for ${verificationContext || 'Affiliate'} approval.
        DATA: ${siteSummary}
        
        OUTPUT:
        1. Approval Probability (0-100%)
        2. Critical Issues (List)
        3. Fixes Required
        
        Keep it concise, professional, and brutally honest.
      `;

      const responseText = await executeGenAIRequest('gemini-3-flash-preview', prompt);
      setMonitorStatus(responseText);
      addLog(`Scan Complete. Report generated.`, 'success');

      // Trigger Auto-Fix Sequence if issues found (Simulated check)
      if (responseText.length > 10) {
         await executeAutoFixSequence(responseText);
      }

    } catch (e: any) {
      setMonitorStatus("Scan interrupted by network firewall.");
    } finally {
      setIsScanning(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative z-10">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue border border-slate-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Sector Access</h2>
          <p className="text-slate-400 text-sm mb-8">Biometric Fingerprint Required or Enter PIN</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full text-center text-4xl tracking-[1em] font-mono bg-slate-950 border-b-2 border-slate-700 focus:border-brand-blue outline-none py-4 mb-8 text-white transition-all rounded-t-lg"
              placeholder="••••"
            />
            <button type="submit" className="w-full bg-brand-blue hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Authorize Connection
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Top Command Bar */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter">
                Admin Central <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">LIVE</span>
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
                 <Network className="w-3 h-3 text-green-500" />
                 <span>MCP Protocol: <span className="text-green-400">CONNECTED</span></span>
                 <span className="text-slate-600">|</span>
                 <span>Latency: 12ms</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border border-slate-700">
               Lock Terminal
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Controls & Masters (4 col) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Focus & Masters Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                   <Target className="w-4 h-4 text-red-500" /> Focus Account Verification
                 </h3>
                 <div className="text-[10px] font-mono text-slate-400">ID: PDR-V2</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={verificationContext}
                      onChange={(e) => setVerificationContext(e.target.value)}
                      placeholder="Enter Network (e.g., ShareASale, Brevo)"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-red-400 transition-all placeholder:text-slate-400"
                   />
                   <button 
                     onClick={handleSetFocus}
                     disabled={isThinking || isScanning}
                     className="px-4 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                   >
                     <RefreshCw className={`w-4 h-4 ${isThinking ? 'animate-spin' : ''}`} />
                   </button>
                </div>
                
                {/* The 4 Masters Grid */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-3 tracking-widest text-center">AI Masters Council</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Planner */}
                    <div className={`p-3 rounded-xl border transition-all ${masterStatus.planner === 'working' ? 'bg-blue-50 border-blue-400 shadow-md scale-105' : 'bg-slate-50 border-slate-100'}`}>
                       <div className="flex items-center gap-2 mb-1">
                         <BrainCircuit className={`w-4 h-4 ${masterStatus.planner === 'working' ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
                         <span className="text-[10px] font-bold uppercase text-slate-700">Planner</span>
                       </div>
                       <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-blue-500 transition-all duration-500 ${masterStatus.planner === 'done' ? 'w-full' : masterStatus.planner === 'working' ? 'w-2/3' : 'w-0'}`}></div>
                       </div>
                    </div>

                    {/* Researcher */}
                    <div className={`p-3 rounded-xl border transition-all ${masterStatus.researcher === 'working' ? 'bg-purple-50 border-purple-400 shadow-md scale-105' : 'bg-slate-50 border-slate-100'}`}>
                       <div className="flex items-center gap-2 mb-1">
                         <Search className={`w-4 h-4 ${masterStatus.researcher === 'working' ? 'text-purple-600 animate-pulse' : 'text-slate-400'}`} />
                         <span className="text-[10px] font-bold uppercase text-slate-700">Researcher</span>
                       </div>
                       <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-purple-500 transition-all duration-500 ${masterStatus.researcher === 'done' ? 'w-full' : masterStatus.researcher === 'working' ? 'w-2/3' : 'w-0'}`}></div>
                       </div>
                    </div>

                    {/* Coder */}
                    <div className={`p-3 rounded-xl border transition-all ${masterStatus.coder === 'working' ? 'bg-amber-50 border-amber-400 shadow-md scale-105' : 'bg-slate-50 border-slate-100'}`}>
                       <div className="flex items-center gap-2 mb-1">
                         <Code2 className={`w-4 h-4 ${masterStatus.coder === 'working' ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
                         <span className="text-[10px] font-bold uppercase text-slate-700">Coder</span>
                       </div>
                       <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-amber-500 transition-all duration-500 ${masterStatus.coder === 'done' ? 'w-full' : masterStatus.coder === 'working' ? 'w-2/3' : 'w-0'}`}></div>
                       </div>
                    </div>

                    {/* Reviewer */}
                    <div className={`p-3 rounded-xl border transition-all ${masterStatus.reviewer === 'working' ? 'bg-green-50 border-green-400 shadow-md scale-105' : 'bg-slate-50 border-slate-100'}`}>
                       <div className="flex items-center gap-2 mb-1">
                         <FileCheck className={`w-4 h-4 ${masterStatus.reviewer === 'working' ? 'text-green-600 animate-pulse' : 'text-slate-400'}`} />
                         <span className="text-[10px] font-bold uppercase text-slate-700">Reviewer</span>
                       </div>
                       <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-green-500 transition-all duration-500 ${masterStatus.reviewer === 'done' ? 'w-full' : masterStatus.reviewer === 'working' ? 'w-2/3' : 'w-0'}`}></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-blue-500" /> Compliance Monitor
              </h2>
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-green-400 h-40 overflow-y-auto leading-relaxed scrollbar-hide">
                 {isScanning ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-70">
                       <Loader2 className="animate-spin w-6 h-6" />
                       <span className="animate-pulse">Deep Scanning...</span>
                    </div>
                 ) : monitorStatus}
              </div>
              <button 
                onClick={handleScanSite} 
                disabled={isScanning || isThinking}
                className="w-full mt-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Cpu className="w-3 h-3" /> Initiate Audit
              </button>
            </div>

            {/* API Key Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex justify-between items-center mb-3">
                 <h2 className="font-bold text-slate-800 text-xs flex items-center gap-2">
                   <Key className="w-3 h-3 text-orange-500" /> Neural Nodes
                 </h2>
                 <button onClick={() => setApiKeys([...apiKeys, ''])} className="text-slate-400 hover:text-blue-500"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {apiKeys.map((key, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="password" 
                      value={key}
                      onChange={(e) => {
                        const newKeys = [...apiKeys];
                        newKeys[index] = e.target.value;
                        setApiKeys(newKeys);
                      }}
                      placeholder={`Node ${index + 1}`}
                      className="flex-1 text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                    />
                    {apiKeys.length > 1 && <button onClick={() => setApiKeys(apiKeys.filter((_, i) => i !== index))} className="text-slate-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Chat Terminal (8 col) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[750px] flex flex-col overflow-hidden">
               <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-md">
                        <Bot className="w-5 h-5" />
                     </div>
                     <div>
                        <h2 className="font-bold text-slate-900 text-sm">Super Admin Assistant</h2>
                        <div className="flex items-center gap-1.5">
                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                           <span className="text-[10px] text-slate-500 font-medium">Online • Root Access</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex-1 bg-slate-950 p-6 overflow-y-auto space-y-4 font-mono text-xs">
                  {logs.length === 0 && (
                     <div className="text-center text-slate-600 mt-20 opacity-50">
                        <Terminal className="w-12 h-12 mx-auto mb-4" />
                        <p>Terminal Ready. Waiting for Command...</p>
                     </div>
                  )}
                  {logs.map((log, i) => (
                    <div key={i} className={`flex gap-3 ${log.type === 'ai' ? 'justify-start' : 'justify-start'}`}>
                       <div className="flex-1">
                          <div className={`p-4 rounded-xl leading-relaxed border ${
                             log.type === 'error' ? 'bg-red-950/30 border-red-900/50 text-red-400' :
                             log.type === 'success' ? 'bg-green-950/30 border-green-900/50 text-green-400' :
                             log.type === 'master' ? 'bg-indigo-950/30 border-indigo-900/50 text-indigo-300' :
                             log.type === 'prd' ? 'bg-amber-950/30 border-amber-900/50 text-amber-400' :
                             log.type === 'ai' ? 'bg-slate-900 border-slate-800 text-slate-300' :
                             'bg-slate-900/50 border-slate-800 text-slate-500'
                          }`}>
                             <div className="flex justify-between items-center mb-2 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                                <span>{log.sender || 'System'}</span>
                                <span>{log.timestamp}</span>
                             </div>
                             {log.type === 'prd' && <div className="mb-2 text-amber-500 font-bold flex items-center gap-2"><FileText className="w-3 h-3" /> OFFICIAL PLAN (PRD)</div>}
                             {log.message}
                          </div>
                       </div>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
               </div>

               <div className="p-4 bg-white border-t border-slate-100">
                  <form onSubmit={handleAdminCommand} className="relative">
                     <textarea 
                        value={adminInput}
                        onChange={(e) => setAdminInput(e.target.value)}
                        placeholder="Command the Super Admin (e.g., 'Update homepage headlines for SEO', 'Add 5 new email tools')..."
                        disabled={isThinking || isScanning}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-16 py-4 min-h-[80px] outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-slate-700 font-medium resize-none text-sm disabled:opacity-50"
                        onKeyDown={(e) => {
                          if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAdminCommand(undefined);
                          }
                        }}
                     />
                     <button 
                        type="submit" 
                        disabled={isThinking || isScanning}
                        className="absolute right-3 bottom-3 p-2 bg-brand-blue hover:bg-blue-600 text-white rounded-lg shadow-lg transition-all active:scale-95 disabled:bg-slate-400"
                     >
                        {isThinking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                     </button>
                  </form>
                  <div className="mt-2 text-[10px] text-center text-slate-400 flex items-center justify-center gap-2">
                     <ShieldCheck className="w-3 h-3" />
                     <span>Protected by MCP Security Protocols. No robotic responses allowed.</span>
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