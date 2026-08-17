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
      default: return 'Dashboard';
    }
  };

  return (
    <header className="top-header">
      {/* Left: Breadcrumbs */}
      <div className="breadcrumbs font-mono">
        <span>Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="font-semibold text-indigo-400">{getTabLabel()}</span>
      </div>

      {/* Right Controls Group: Search + Test Mode + API Status */}
      <div className="top-header-right">
        {/* Center Search Input */}
        <div className="search-box hidden md:flex">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search TXN ID, merchant, UPI... (⌘K)"
            className="search-input font-mono"
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Test Mode Button */}
        <button 
          onClick={() => onNavigateTab('sandbox')}
          className="btn-test-mode"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>TEST MODE</span>
        </button>

        {/* Clean System Connection Pill */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>API v2.4 • CONNECTED</span>
        </div>
      </div>
    </header>
  );
}
