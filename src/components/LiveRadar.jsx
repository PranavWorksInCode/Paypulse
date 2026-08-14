import React, { useState } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Bot, 
  X, 
  Terminal, 
  Smartphone, 
  Globe, 
  UserCheck, 
  Ban
} from 'lucide-react';

export default function LiveRadar({ 
  transactions, 
  onSelectTxnForAI, 
  onBlockTxn, 
  onWhitelistTxn 
}) {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxn, setSelectedTxn] = useState(null);

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      t.id.toLowerCase().includes(q) ||
      t.merchant.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      (t.upiHandle && t.upiHandle.toLowerCase().includes(q)) ||
      t.city.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status, score) => {
    if (status === 'HIGH_RISK') {
      return (
        <span className="badge-danger px-2.5 py-1 rounded-md text-xs font-bold font-mono inline-flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HIGH RISK ({score}%)</span>
        </span>
      );
    }
    if (status === 'SUSPICIOUS') {
      return (
        <span className="badge-warning px-2.5 py-1 rounded-md text-xs font-bold font-mono inline-flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SUSPICIOUS ({score}%)</span>
        </span>
      );
    }
    return (
      <span className="badge-safe px-2.5 py-1 rounded-md text-xs font-bold font-mono inline-flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>SAFE ({score}%)</span>
      </span>
    );
  };

  return (
    <div className="glass-panel p-6 relative">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-sans">
            <span>Live Transaction Stream Radar</span>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              WebSocket Pipeline Active
            </span>
          </h2>
          <p className="text-xs text-slate-400">Streamed via Kafka topic with sub-15ms ML risk classification</p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter TXN ID, Merchant, UPI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-white/10">
            {['ALL', 'HIGH_RISK', 'SUSPICIOUS', 'SAFE'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  filter === type
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'ALL' ? 'ALL' : type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[11px] bg-slate-900/40">
              <th className="py-3 px-4">TXN ID & Timestamp</th>
              <th className="py-3 px-4">Merchant Service</th>
              <th className="py-3 px-4">Customer & Method</th>
              <th className="py-3 px-4">Amount (INR)</th>
              <th className="py-3 px-4">Threat Assessment</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500 font-sans">
                  No transaction records match the active filter.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn) => (
                <tr 
                  key={txn.id}
                  className="hover:bg-slate-900/70 transition-colors cursor-pointer group"
                  onClick={() => setSelectedTxn(txn)}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-indigo-300 group-hover:text-indigo-200 transition-colors">
                      {txn.id}
                    </div>
                    <span className="text-[10px] text-slate-400">{txn.timestamp} • {txn.city}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200 font-sans">{txn.merchant}</div>
                    <span className="text-[10px] text-slate-400 font-sans">{txn.merchantCategory}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-sans">{txn.customerName}</div>
                    <span className="text-[11px] text-slate-400">{txn.method} {txn.upiHandle !== 'N/A' && `(${txn.upiHandle})`}</span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white text-sm">
                    ₹ {txn.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(txn.status, txn.riskScore)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTxn(txn);
                      }}
                      className="px-3 py-1 rounded bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all text-xs font-sans inline-flex items-center gap-1.5 border border-white/10"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Inspection Side Drawer */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border-l border-white/10 p-6 overflow-y-auto h-full flex flex-col justify-between">
            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-base font-mono">Deep Threat Inspection</h3>
                </div>
                <button 
                  onClick={() => setSelectedTxn(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-xl mb-5 bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono mb-1">TXN: {selectedTxn.id}</div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    ₹ {selectedTxn.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">{selectedTxn.merchant}</div>
                </div>
                <div>
                  {getStatusBadge(selectedTxn.status, selectedTxn.riskScore)}
                </div>
              </div>

              {/* Risk Gauge Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-400">Threat Index</span>
                  <span className="text-indigo-400 font-bold">{selectedTxn.riskScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedTxn.riskScore > 80 ? 'bg-rose-500' : selectedTxn.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${selectedTxn.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Risk Trigger Breakdown */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Flagged Risk Trigger</span>
                </h4>
                <p className="text-xs text-slate-200 bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-lg leading-relaxed">
                  {selectedTxn.flaggedReason}
                </p>

                {selectedTxn.triggeredRules.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {selectedTxn.triggeredRules.map((ruleId) => (
                      <span key={ruleId} className="px-2.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[11px] font-mono border border-rose-500/30">
                        Triggered Rule: {ruleId}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Device Telemetry */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Device Telemetry</h4>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-white/5 text-xs space-y-2.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" /> IP Address:
                    </span>
                    <span className="text-slate-200 font-bold">{selectedTxn.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-purple-400" /> Device Fingerprint:
                    </span>
                    <span className="text-slate-200">{selectedTxn.device}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">City / Region:</span>
                    <span className="text-slate-200">{selectedTxn.city}, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Velocity Tracker:</span>
                    <span className="text-amber-400 font-bold">{selectedTxn.velocityAlert}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectTxnForAI(selectedTxn);
                  setSelectedTxn(null);
                }}
                className="w-full btn-primary justify-center text-xs py-2.5"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>Investigate with AI Financial Copilot</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onBlockTxn(selectedTxn.id);
                    setSelectedTxn(null);
                  }}
                  className="py-2 px-3 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Block Account</span>
                </button>

                <button
                  onClick={() => {
                    onWhitelistTxn(selectedTxn.id);
                    setSelectedTxn(null);
                  }}
                  className="py-2 px-3 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Mark Safe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
