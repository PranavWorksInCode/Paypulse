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
  PlusCircle,
  Zap
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
    <header className="sticky top-0 z-40 w-full glass-panel-glow border-b border-white/10 px-4 lg:px-8 py-3 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent flex items-center gap-2">
                PayPulse <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">AI COPILOT</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">FinTech UPI & Card Fraud Analytics</p>
            </div>
          </div>

          {/* System Telemetry Badge */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="pulse-dot bg-emerald-500"></span>
              <span>15.4k TPS</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>11ms Latency</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Live Simulator Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs transition-all border ${
              isSimulating
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'SIMULATION: ON' : 'PAUSED'}</span>
          </button>

          {/* Payment Sandbox Trigger Button */}
          <button 
            onClick={onOpenSandbox}
            className="btn-primary text-xs py-1.5 px-3"
          >
            <CreditCard className="w-4 h-4" />
            <span>UPI Sandbox</span>
          </button>

          {/* System Architecture Modal Trigger */}
          <button
            onClick={onOpenArchitecture}
            className="btn-secondary text-xs py-1.5 px-3 bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
          >
            <BookOpen className="w-4 h-4" />
            <span>Architecture & Resume Guide</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-white/5 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('radar')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'radar'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Fraud Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'copilot'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>AI Financial Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'rules'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Risk Rule Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>City & Merchant Heatmap</span>
        </button>
      </div>
    </header>
  );
}
