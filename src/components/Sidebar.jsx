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
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSimulating, 
  setIsSimulating 
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'radar', label: 'Live Stream Radar', icon: Activity, badge: 'LIVE' },
    { id: 'copilot', label: 'AI Copilot', icon: Bot, badge: 'AI' },
    { id: 'sandbox', label: 'UPI Sandbox', icon: CreditCard, badge: 'TEST' },
    { id: 'rules', label: 'Risk Rule Engine', icon: SlidersHorizontal, badge: null },
    { id: 'analytics', label: 'Geo & Merchants', icon: MapPin, badge: null },
    { id: 'architecture', label: 'System Design', icon: BookOpen, badge: 'SDE' }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 font-sans z-30">
      <div>
        {/* Stripe/Razorpay Style Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                <span>PayPulse</span>
                <span className="text-indigo-400 font-mono text-xs">AI</span>
              </h1>
              <span className="text-[10px] text-slate-400 font-mono">Enterprise Fraud Engine</span>
            </div>
          </div>
        </div>

        {/* Workspace Switcher Pill */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="p-2 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-between text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-200">Razorpay Production</span>
            </div>
            <span className="text-[10px] text-slate-400">v2.4</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.badge === 'LIVE' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.badge === 'AI'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Telemetry */}
      <div className="p-4 border-t border-white/10 space-y-3 bg-slate-950/60">
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-white/5 text-xs font-mono space-y-1.5">
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

        {/* Live Simulator Toggle Switch */}
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-mono text-xs font-semibold transition-all border ${
            isSimulating
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
          }`}
        >
          {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isSimulating ? 'SIMULATION ACTIVE' : 'STREAM PAUSED'}</span>
        </button>
      </div>
    </aside>
  );
}
