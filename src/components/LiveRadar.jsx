import React, { useState } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  X, 
  Terminal, 
  Smartphone, 
  Globe, 
  UserCheck, 
  Ban,
  Bot
} from 'lucide-react';

export default function LiveRadar({ 
  transactions, 
  onSelectTxnForAI, 
  onBlockTxn, 
  onWhitelistTxn 
}) {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTxn, setActiveTxn] = useState(null);

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
        <span className="badge badge-danger">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HIGH RISK ({score}%)</span>
        </span>
      );
    }
    if (status === 'SUSPICIOUS') {
      return (
        <span className="badge badge-warning">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SUSPICIOUS ({score}%)</span>
        </span>
      );
    }
    return (
      <span className="badge badge-safe">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>SAFE ({score}%)</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans w-full animate-fade-in">
      
      {/* Master Layout Container */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        
        {/* Left Side: Live Transaction Stream Radar Table */}
        <div className={`card space-y-6 transition-all duration-300 ${activeTxn ? 'w-full lg:w-[60%]' : 'w-full'}`}>
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Live Transaction Stream Radar
                </h2>
                <span className="text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 shrink-0">
                  WebSocket Ingestion Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">Streamed via Kafka topic with sub-15ms ML risk classification</p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search TXN, Merchant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input text-xs"
                />
              </div>

              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10 font-mono text-[11px]">
                {['ALL', 'HIGH_RISK', 'SUSPICIOUS', 'SAFE'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      filter === type
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {type === 'ALL' ? 'ALL' : type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TXN ID & Timestamp</th>
                  <th>Merchant Service</th>
                  <th>Customer & Method</th>
                  <th>Amount (INR)</th>
                  <th>Threat Assessment</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 font-sans">
                      No transaction records match the active filter.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => {
                    const isSelected = activeTxn && activeTxn.id === txn.id;
                    return (
                      <tr 
                        key={txn.id}
                        onClick={() => setActiveTxn(txn)}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'bg-indigo-600/15 border-l-4 border-l-indigo-500' : ''
                        }`}
                      >
                        <td>
                          <div className="font-bold text-indigo-300">{txn.id}</div>
                          <span className="text-[10.5px] text-slate-400">{txn.timestamp} • {txn.city}</span>
                        </td>

                        <td>
                          <div className="font-bold text-slate-200 font-sans text-xs">{txn.merchant}</div>
                          <span className="text-[10.5px] text-slate-400 font-sans">{txn.merchantCategory}</span>
                        </td>

                        <td>
                          <div className="text-slate-200 font-sans text-xs font-medium">{txn.customerName}</div>
                          <span className="text-[10.5px] text-slate-400">{txn.method}</span>
                        </td>

                        <td className="font-bold text-white text-xs">
                          ₹ {txn.amount.toLocaleString('en-IN')}
                        </td>

                        <td>
                          {getStatusBadge(txn.status, txn.riskScore)}
                        </td>

                        <td className="text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTxn(txn);
                            }}
                            className={`btn text-xs py-1 px-2.5 font-sans ${
                              isSelected ? 'btn-primary' : 'btn-secondary'
                            }`}
                          >
                            <span>{isSelected ? 'Active' : 'Inspect'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Deep Threat Inspection Side Panel */}
        {activeTxn && (
          <div className="w-full lg:w-[40%] card border border-indigo-500/30 bg-slate-950/95 space-y-6 sticky top-24 shadow-2xl animate-fade-in shrink-0">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-mono">Deep Threat Inspection</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Telemetry & Risk Signal Breakdown</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTxn(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Transaction Header Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between shadow-lg">
              <div>
                <div className="text-xs text-slate-400 font-mono mb-1">TXN ID: {activeTxn.id}</div>
                <div className="text-2xl font-extrabold text-white font-mono">
                  ₹ {activeTxn.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-sans font-medium">{activeTxn.merchant}</div>
              </div>
              <div>
                {getStatusBadge(activeTxn.status, activeTxn.riskScore)}
              </div>
            </div>

            {/* Risk Threat Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Threat Index Rating</span>
                <span className="text-indigo-400 font-bold text-sm">{activeTxn.riskScore}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    activeTxn.riskScore > 80 ? 'bg-rose-500 shadow-lg shadow-rose-500/50' : activeTxn.riskScore > 50 ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                  }`} 
                  style={{ width: `${activeTxn.riskScore}%` }}
                />
              </div>
            </div>

            {/* Flagged Risk Trigger */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Flagged Risk Trigger</span>
              </h4>
              <div className="text-xs text-slate-200 bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl leading-relaxed font-sans">
                {activeTxn.flaggedReason}
              </div>
            </div>

            {/* Device Telemetry */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Device Telemetry & Proxy Signals</h4>
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs space-y-3 font-mono">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-cyan-400" /> IP Address:
                  </span>
                  <span className="text-slate-100 font-bold">{activeTxn.ipAddress}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-purple-400" /> Device Environment:
                  </span>
                  <span className="text-slate-200 font-medium">{activeTxn.device}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400">City / Origin Hub:</span>
                  <span className="text-slate-200 font-medium">{activeTxn.city}, India</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10 font-sans">
              <button
                type="button"
                onClick={() => {
                  onSelectTxnForAI(activeTxn);
                }}
                className="w-full btn btn-primary justify-center text-xs py-3"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>Investigate with AI Financial Copilot</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onBlockTxn(activeTxn.id);
                  }}
                  className="btn bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 justify-center text-xs py-2.5 font-mono"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Block Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onWhitelistTxn(activeTxn.id);
                  }}
                  className="btn bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 justify-center text-xs py-2.5 font-mono"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Mark Safe</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
