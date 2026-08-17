import React from 'react';
import { Search, ChevronRight, Zap, Menu } from 'lucide-react';

export default function TopHeader({ activeTab, onNavigateTab, setIsMobileOpen }) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'overview': return 'Overview & Executive KPIs';
      case 'radar': return 'Live Stream Radar';
      case 'copilot': return 'AI Financial Copilot';
      case 'sandbox': return 'UPI Payment Sandbox';
      case 'rules': return 'Sliding-Window Rule Engine';
      case 'analytics': return 'Geo & Merchant Analytics';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="top-header">
      {/* Left: Mobile Menu Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="breadcrumbs font-mono">
          <span className="hidden sm:inline">Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
          <span className="font-semibold text-indigo-400 text-xs sm:text-sm">{getTabLabel()}</span>
        </div>
      </div>

      {/* Right Controls Group: Search + Test Mode + API Status */}
      <div className="top-header-right">
        {/* Center Search Input */}
        <div className="search-box hidden md:flex">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search TXN ID, merchant, UPI... (⌘K)"
            className="search-input font-mono text-xs"
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Test Mode Button */}
        <button 
          onClick={() => onNavigateTab('sandbox')}
          className="btn-test-mode text-xs py-1 px-3"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">TEST MODE</span>
        </button>

        {/* Clean System Connection Pill */}
        <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>API v2.4 • CONNECTED</span>
        </div>
      </div>
    </header>
  );
}
