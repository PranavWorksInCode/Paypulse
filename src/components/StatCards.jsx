import React from 'react';
import { IndianRupee, ShieldCheck, AlertTriangle, Cpu, TrendingUp } from 'lucide-react';

export default function StatCards({ transactions }) {
  const totalCount = transactions.length;
  const highRiskCount = transactions.filter(t => t.status === 'HIGH_RISK').length;
  const suspiciousCount = transactions.filter(t => t.status === 'SUSPICIOUS').length;
  const safeCount = transactions.filter(t => t.status === 'SAFE').length;

  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const interceptedAmount = transactions
    .filter(t => t.status === 'HIGH_RISK')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 24h Transaction Volume */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Processed Volume</span>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-extrabold text-white font-mono">
            ₹ {(totalVolume / 100000).toFixed(2)} Lakhs
          </h3>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +14.2%
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">{totalCount} Live Transactions Evaluated</p>
      </div>

      {/* Intercepted Fraud Value */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Fraud Savings</span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-extrabold text-emerald-400 font-mono">
            ₹ {(interceptedAmount / 100000).toFixed(2)} Lakhs
          </h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            99.8% Saved
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">{highRiskCount} Threat Attacks Blocked</p>
      </div>

      {/* Flagged Anomalies */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Risk Flags</span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-extrabold text-amber-400 font-mono">
            {suspiciousCount + highRiskCount} <span className="text-xs text-slate-400 font-normal">Anomalies</span>
          </h3>
          <span className="text-xs font-semibold text-rose-400">
            {(( (suspiciousCount + highRiskCount) / (totalCount || 1) ) * 100).toFixed(1)}% Ratio
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">{suspiciousCount} Pending AI Audit Verification</p>
      </div>

      {/* AI Latency & Inference Rate */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Inference Velocity</span>
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-extrabold text-purple-300 font-mono">
            11 <span className="text-sm font-normal text-slate-400">ms / req</span>
          </h3>
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
            Redis Slidewindow
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-mono">Sub-second Fraud Gatekeeper</p>
      </div>
    </div>
  );
}
