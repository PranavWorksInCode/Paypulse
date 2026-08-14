import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Bot, 
  CreditCard, 
  SlidersHorizontal, 
  MapPin, 
  BookOpen, 
  Play, 
  Pause,
  Zap,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isSimulating, 
  setIsSimulating, 
  onOpenSandbox, 
  onOpenArchitecture 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel-glow border-b border-white/10 px-4 lg:px-8 py-3.5 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shadow-md shadow-indigo-500/10">
              <ShieldAlert className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-sans">
                  PayPulse <span className="text-indigo-400">AI</span>
                </h1>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  ENTERPRISE v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Real-Time UPI & Card Fraud Analytics</p>
            </div>
          </div>

          {/* Network Health Telemetry */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="pulse-dot bg-emerald-500"></span>
              <span>15,400 TPS</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>11ms Latency</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="text-cyan-400">
              99.99% SLA
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2.5">
          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all border ${
              isSimulating
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'SIMULATION: ON' : 'PAUSED'}</span>
          </button>

          {/* UPI Payment Sandbox Trigger */}
          <button 
            onClick={onOpenSandbox}
            className="btn-primary text-xs"
          >
            <CreditCard className="w-4 h-4" />
            <span>UPI Gateway Sandbox</span>
          </button>

          {/* System Architecture Guide Modal */}
          <button
            onClick={onOpenArchitecture}
            className="btn-secondary text-xs"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Architecture & Resume Guide</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto mt-4 pt-2.5 border-t border-white/5 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('radar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'radar'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Activity className="w-4 h-4 text-indigo-400" />
          <span>Live Fraud Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'copilot'
              ? 'bg-indigo-600/20 text-cyan-300 border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>AI Financial Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'rules'
              ? 'bg-indigo-600/20 text-purple-300 border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <span>Risk Rule Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-indigo-600/20 text-emerald-300 border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Regional & Merchant Analytics</span>
        </button>
      </div>
    </header>
  );
}
