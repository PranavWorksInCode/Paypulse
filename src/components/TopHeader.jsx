import React from 'react';
import { Search, ChevronRight, Bell, Zap, Sliders, Shield } from 'lucide-react';

export default function TopHeader({ activeTab, onNavigateTab }) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'overview': return 'Overview & Executive KPIs';
      case 'radar': return 'Live Transaction Stream Radar';
      case 'copilot': return 'AI Financial & Compliance Copilot';
      case 'sandbox': return 'UPI & Razorpay Payment Sandbox';
      case 'rules': return 'Sliding-Window Risk Rule Engine';
      case 'analytics': return 'Regional Heatmaps & Merchant Risks';
      case 'architecture': return 'System Architecture & Resume Guide';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-20 font-sans">
      
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-slate-400">Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-indigo-400">{getTabLabel()}</span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center relative w-80">
        <Search className="w-3.5 h-3.5 absolute left-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search TXN ID, merchant, UPI, rules... (⌘K)"
          className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
        />
        <span className="absolute right-2.5 text-[10px] text-slate-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">⌘K</span>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-4">
        {/* Sandbox Quick Button */}
        <button 
          onClick={() => onNavigateTab('sandbox')}
          className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-semibold flex items-center gap-1.5 hover:bg-amber-500/20 transition-all"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>TEST MODE</span>
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
          PK
        </div>
      </div>
    </header>
  );
}
