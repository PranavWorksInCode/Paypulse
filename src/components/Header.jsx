import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Activity, 
  Bot, 
  CreditCard, 
  SlidersHorizontal, 
  MapPin, 
  BookOpen, 
  Pause,
  Play
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isSimulating, 
  setIsSimulating 
}) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'radar', label: 'Live Stream Radar', icon: Activity },
    { id: 'copilot', label: 'AI Copilot', icon: Bot },
    { id: 'sandbox', label: 'UPI Sandbox', icon: CreditCard },
    { id: 'rules', label: 'Risk Rules', icon: SlidersHorizontal },
    { id: 'analytics', label: 'Regional Analytics', icon: MapPin },
    { id: 'architecture', label: 'System Design', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white font-sans tracking-tight">
              PayPulse <span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">FinTech Risk Platform</p>
          </div>
        </div>

        {/* Clean Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Simulation Controls & Status Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all border ${
              isSimulating
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'SIM: ACTIVE' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown/Bar */}
      <div className="flex lg:hidden items-center gap-1 overflow-x-auto no-scrollbar mt-3 pt-3 border-t border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
