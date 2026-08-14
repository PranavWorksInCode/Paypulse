import React, { useState } from 'react';
import { SlidersHorizontal, Plus, ShieldCheck, ShieldAlert, Check, X, AlertTriangle } from 'lucide-react';
import { INITIAL_RULES } from '../data/mockData';

export default function RuleEngine() {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newThreshold, setNewThreshold] = useState('');
  const [newSeverity, setNewSeverity] = useState('HIGH');

  const toggleRule = (id) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleName || !newThreshold) return;

    const newRule = {
      id: `RULE-${Math.floor(500 + Math.random() * 400)}`,
      name: newRuleName,
      category: "Custom Velocity",
      threshold: newThreshold,
      severity: newSeverity,
      enabled: true,
      action: "FLAG_AND_ALERT",
      triggeredToday: 0
    };

    setRules([newRule, ...rules]);
    setShowAddModal(false);
    setNewRuleName('');
    setNewThreshold('');
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Risk Velocity & Fraud Rule Engine</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Live Interceptor
            </span>
          </h2>
          <p className="text-xs text-slate-400">Configure real-time sliding-window rules evaluated in Redis & Python pipeline</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary text-xs py-2 px-3"
        >
          <Plus className="w-4 h-4" />
          <span>Create Risk Rule</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[11px]">
              <th className="py-3 px-3">Rule ID & Name</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Trigger Condition Threshold</th>
              <th className="py-3 px-3">Severity</th>
              <th className="py-3 px-3">24h Triggers</th>
              <th className="py-3 px-3 text-right">Status Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-3">
                  <div className="font-bold text-purple-300">{rule.id}</div>
                  <div className="font-sans font-semibold text-white">{rule.name}</div>
                </td>

                <td className="py-3 px-3 font-sans text-slate-400">
                  {rule.category}
                </td>

                <td className="py-3 px-3 text-slate-300">
                  <code className="bg-slate-950 px-2 py-1 rounded border border-white/5 text-[11px] text-amber-300">
                    {rule.threshold}
                  </code>
                </td>

                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rule.severity === 'CRITICAL' || rule.severity === 'HIGH'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {rule.severity}
                  </span>
                </td>

                <td className="py-3 px-3 font-bold text-white">
                  {rule.triggeredToday} times
                </td>

                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      rule.enabled
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border border-white/5 hover:bg-slate-700'
                    }`}
                  >
                    {rule.enabled ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Custom Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="font-bold text-white text-sm">Create New Risk Engine Rule</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Unusual High Frequency Retry"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Threshold Expression</label>
                <input
                  type="text"
                  placeholder="e.g. > 5 txns/min from same IP"
                  value={newThreshold}
                  onChange={(e) => setNewThreshold(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Severity</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1 justify-center text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center text-xs"
                >
                  Deploy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
