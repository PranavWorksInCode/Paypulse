import React from 'react';
import { IndianRupee, ShieldCheck, AlertTriangle, Cpu, TrendingUp, Activity, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Overview({ transactions, onNavigateTab }) {
  const totalCount = transactions.length;
  const highRiskCount = transactions.filter(t => t.status === 'HIGH_RISK').length;
  const suspiciousCount = transactions.filter(t => t.status === 'SUSPICIOUS').length;

  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const interceptedAmount = transactions
    .filter(t => t.status === 'HIGH_RISK')
    .reduce((acc, t) => acc + t.amount, 0);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6 font-sans animate-fade-in w-full">
      
      {/* Hero Welcome Banner */}
      <div className="card bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>SYSTEM HEALTH: OPTIMAL • 15,400 TPS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            FinTech Payment Risk Engine
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Real-time fraud interceptor processing Indian UPI & credit card payment rails with sub-15ms machine learning inference.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('radar')}
            className="btn btn-primary text-xs"
          >
            <span>View Live Stream</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab('sandbox')}
            className="btn btn-secondary text-xs"
          >
            <span>Launch Sandbox</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid-4 font-mono">
        <div className="card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Processed Volume</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            ₹ {(totalVolume / 100000).toFixed(2)} <span className="text-xs font-normal text-slate-400">Lakhs</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>{totalCount} Stream Events</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fraud Intercepted</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            ₹ {(interceptedAmount / 100000).toFixed(2)} <span className="text-xs font-normal text-slate-400">Lakhs</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>{highRiskCount} Attack Vectors</span>
            <span className="text-emerald-400 font-semibold">99.84% Saved</span>
          </div>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Flagged Anomalies</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400">
            {suspiciousCount + highRiskCount} <span className="text-xs font-normal text-slate-400">Cases</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>{suspiciousCount} Suspicious</span>
            <span className="text-rose-400 font-semibold">{(( (suspiciousCount + highRiskCount) / (totalCount || 1) ) * 100).toFixed(1)}% Rate</span>
          </div>
        </div>

        <div className="card space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inference Speed</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-300">
            11 <span className="text-sm font-normal text-slate-400">ms / req</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Redis ZSET Cache</span>
            <span className="text-cyan-400 font-semibold">&lt; 15ms SLA</span>
          </div>
        </div>
      </div>

      {/* Stream Snapshot Clean Data Table */}
      <div className="card space-y-4 font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4.5 h-4.5 text-indigo-400" />
            <span>Recent Ingestion Stream Snapshot</span>
          </h3>
          <button 
            onClick={() => onNavigateTab('radar')}
            className="btn btn-secondary text-xs font-mono py-1.5 px-3"
          >
            <span>View Full Stream Radar</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>TXN ID & Timestamp</th>
                <th>Merchant Service</th>
                <th>Payment Method</th>
                <th>Amount (INR)</th>
                <th>Threat Assessment</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {recentTransactions.map((txn) => (
                <tr 
                  key={txn.id}
                  onClick={() => onNavigateTab('radar')}
                  className="cursor-pointer"
                >
                  <td>
                    <div className="font-bold text-indigo-300">{txn.id}</div>
                    <span className="text-[10.5px] text-slate-400">{txn.timestamp} • {txn.city}</span>
                  </td>

                  <td>
                    <div className="font-bold text-white font-sans text-xs">{txn.merchant}</div>
                    <span className="text-[10.5px] text-slate-400 font-sans">{txn.merchantCategory}</span>
                  </td>

                  <td className="text-slate-300 text-xs">
                    {txn.method}
                  </td>

                  <td className="font-bold text-white text-xs">
                    ₹ {txn.amount.toLocaleString('en-IN')}
                  </td>

                  <td>
                    <span className={`badge ${
                      txn.status === 'HIGH_RISK' ? 'badge-danger' : txn.status === 'SUSPICIOUS' ? 'badge-warning' : 'badge-safe'
                    }`}>
                      {txn.status === 'HIGH_RISK' ? <ShieldAlert className="w-3.5 h-3.5" /> : txn.status === 'SUSPICIOUS' ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{txn.status.replace('_', ' ')} ({txn.riskScore}%)</span>
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('radar');
                      }}
                      className="btn btn-secondary text-xs py-1 px-2.5 font-sans"
                    >
                      <span>Radar</span>
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
