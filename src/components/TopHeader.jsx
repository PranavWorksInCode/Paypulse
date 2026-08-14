import React from 'react';
import { Search, ChevronRight, Zap } from 'lucide-react';

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
    <header className="top-header font-sans">
      {/* Breadcrumbs */}
      <div className="breadcrumbs font-mono">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="font-semibold text-indigo-400">{getTabLabel()}</span>
      </div>

      {/* Search Input */}
      <div className="search-box hidden md:block">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search TXN ID, merchant, UPI... (⌘K)"
          className="search-input font-mono"
        />
      </div>

      {/* Sandbox Button & Profile */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onNavigateTab('sandbox')}
          className="btn bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-semibold"
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
