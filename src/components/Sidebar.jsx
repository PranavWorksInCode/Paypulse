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
  Play,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSimulating, 
  setIsSimulating 
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, tag: null },
    { id: 'radar', label: 'Live Stream Radar', icon: Activity, tag: 'LIVE', tagClass: 'nav-tag-live' },
    { id: 'copilot', label: 'AI Copilot', icon: Bot, tag: 'AI', tagClass: 'nav-tag-ai' },
    { id: 'sandbox', label: 'UPI Sandbox', icon: CreditCard, tag: 'TEST', tagClass: 'nav-tag-test' },
    { id: 'rules', label: 'Risk Rule Engine', icon: SlidersHorizontal, tag: null },
    { id: 'analytics', label: 'Geo & Merchants', icon: MapPin, tag: null },
    { id: 'architecture', label: 'System Design', icon: BookOpen, tag: 'SDE', tagClass: 'nav-tag-sde' }
  ];

  return (
    <aside className="sidebar font-sans">
      <div>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>PayPulse</span>
              <span className="text-indigo-400 font-mono text-xs">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">Enterprise Fraud Engine</p>
          </div>
        </div>

        {/* Workspace Pill */}
        <div className="sidebar-workspace">
          <div className="workspace-badge font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-200">Razorpay Prod</span>
            </div>
            <span className="text-[10px] text-slate-400">v2.4</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-heading">Navigation Menu</div>

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
                  <span className={`nav-tag ${item.tagClass || ''}`}>
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Telemetry & Stream Switch */}
      <div className="sidebar-footer font-mono">
        <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-400">
            <span>System Status:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Operational
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Peak Velocity:</span>
            <span className="text-indigo-300 font-bold">15,400 TPS</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Avg Latency:</span>
            <span className="text-amber-300 font-bold">11 ms</span>
          </div>
        </div>

        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`btn w-full justify-center text-xs font-mono ${
            isSimulating
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}
        >
          {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isSimulating ? 'SIMULATION ACTIVE' : 'STREAM PAUSED'}</span>
        </button>
      </div>
    </aside>
  );
}
