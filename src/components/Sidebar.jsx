import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Bot, 
  Sliders, 
  Map, 
  CreditCard, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSimulating, 
  setIsSimulating 
}) {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Activity,
      tag: null
    },
    {
      id: 'radar',
      label: 'Live Stream Radar',
      icon: ShieldCheck,
      tag: 'LIVE',
      tagClass: 'nav-tag-live'
    },
    {
      id: 'copilot',
      label: 'AI Copilot',
      icon: Bot,
      tag: 'AI',
      tagClass: 'nav-tag-ai'
    },
    {
      id: 'sandbox',
      label: 'UPI Sandbox',
      icon: CreditCard,
      tag: 'TEST',
      tagClass: 'nav-tag-test'
    },
    {
      id: 'rules',
      label: 'Risk Rule Engine',
      icon: Sliders,
      tag: null
    },
    {
      id: 'analytics',
      label: 'Geo & Merchants',
      icon: Map,
      tag: null
    }
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-icon-box">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight leading-none">
              PayPulse<span className="text-indigo-400">AI</span>
            </h1>
            <span className="text-[10.5px] font-mono text-slate-400">Enterprise Fraud Engine</span>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="sidebar-workspace">
          <div className="workspace-badge font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white">Razorpay Prod</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">v2.4</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-heading font-mono">Navigation Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="nav-btn-content">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.tag && (
                  <span className={`nav-tag ${item.tagClass}`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Telemetry */}
      <div className="sidebar-footer font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <span>System Status:</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Operational</span>
        </div>

        <div className="text-[11px] text-slate-400 space-y-1 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
          <div className="flex justify-between">
            <span>Peak Velocity:</span>
            <span className="text-white font-bold">15,400 TPS</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Latency:</span>
            <span className="text-cyan-400 font-bold">11 ms</span>
          </div>
        </div>

        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`w-full btn text-xs justify-center font-mono py-2 ${
            isSimulating
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
          <span>{isSimulating ? 'SIMULATION ACTIVE' : 'SIMULATION PAUSED'}</span>
        </button>
      </div>
    </aside>
  );
}
