import React, { useState } from 'react';
import { Sliders, Plus, ShieldCheck, AlertTriangle, ShieldAlert, Activity, Cpu, CheckCircle2, Power, X } from 'lucide-react';

export default function RuleEngine() {
  const [rules, setRules] = useState([
    {
      id: 'RULE-101',
      name: 'Multi-Device Velocity Spike',
      category: 'Velocity Engine',
      threshold: '> 3 devices within 5 minutes',
      severity: 'HIGH',
      triggers24h: 142,
      active: true,
      badgeClass: 'badge-danger'
    },
    {
      id: 'RULE-204',
      name: 'High-Value Night UPI Transfer',
      category: 'Amount & Time Window',
      threshold: '> ₹1,00,000 between 1:00 AM - 5:00 AM IST',
      severity: 'HIGH',
      triggers24h: 89,
      active: true,
      badgeClass: 'badge-danger'
    },
    {
      id: 'RULE-309',
      name: 'Impossible Travel Geo-Jump',
      category: 'Geolocation Intelligence',
      threshold: 'velocity > 800 km/hr between consecutive logins',
      severity: 'MEDIUM',
      triggers24h: 310,
      active: true,
      badgeClass: 'badge-warning'
    },
    {
      id: 'RULE-412',
      name: 'Card CVV Rapid Retry Attack',
      category: 'Credential Stuffing',
      threshold: '> 4 failed CVV attempts in 60 seconds',
      severity: 'CRITICAL',
      triggers24h: 67,
      active: true,
      badgeClass: 'badge-danger'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({
    id: `RULE-${Math.floor(500 + Math.random() * 400)}`,
    name: '',
    category: 'Velocity Engine',
    threshold: '',
    severity: 'HIGH'
  });

  const handleToggleRule = (id) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  };

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.name || !newRule.threshold) return;

    const ruleObj = {
      ...newRule,
      triggers24h: 0,
      active: true,
      badgeClass: newRule.severity === 'CRITICAL' ? 'badge-danger' : newRule.severity === 'HIGH' ? 'badge-danger' : 'badge-warning'
    };

    setRules(prev => [ruleObj, ...prev]);
    setShowModal(false);
    setNewRule({
      id: `RULE-${Math.floor(500 + Math.random() * 400)}`,
      name: '',
      category: 'Velocity Engine',
      threshold: '',
      severity: 'HIGH'
    });
  };

  const totalTriggers = rules.reduce((acc, r) => acc + r.triggers24h, 0);

  return (
    <div className="space-y-8 font-sans animate-fade-in w-full">
      
      {/* Header Card */}
      <div className="card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>Sliding-Window Risk Rule Engine</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Configure real-time sliding-window rules evaluated in Redis & Python pipeline (&lt; 2ms latency)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>REDIS ZSET EVALUATOR &lt; 2ms</span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary text-xs py-2.5 px-4 font-mono"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Rule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid-4 font-mono">
        <div className="card space-y-2 p-5">
          <div className="text-xs text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>Active Rules</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {rules.filter(r => r.active).length} / {rules.length} <span className="text-xs font-normal text-slate-400">Policies</span>
          </div>
        </div>

        <div className="card space-y-2 p-5">
          <div className="text-xs text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>24h Interceptions</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-300">
            {totalTriggers} <span className="text-xs font-normal text-slate-400">Triggers</span>
          </div>
        </div>

        <div className="card space-y-2 p-5">
          <div className="text-xs text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>Avg Rule Latency</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300">
            1.4 <span className="text-xs font-normal text-slate-400">ms / eval</span>
          </div>
        </div>

        <div className="card space-y-2 p-5">
          <div className="text-xs text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>Pipeline SLA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">
            100% <span className="text-xs font-normal text-slate-400">Enforced</span>
          </div>
        </div>
      </div>

      {/* Clean Glass Data Table */}
      <div className="card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Active Fraud Policy Catalog</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Changes apply to live Kafka stream instantly</span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rule ID & Policy Name</th>
                <th>Category Sector</th>
                <th>Sliding-Window Condition Threshold</th>
                <th>Severity</th>
                <th>24h Triggers</th>
                <th>Policy Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {rules.map((rule) => (
                <tr key={rule.id} className={!rule.active ? 'opacity-50 bg-slate-950/40' : ''}>
                  <td>
                    <div className="font-bold text-indigo-300">{rule.id}</div>
                    <div className="text-xs font-bold text-white font-sans mt-0.5">{rule.name}</div>
                  </td>

                  <td>
                    <span className="text-xs text-slate-300 font-sans px-2.5 py-1 rounded-md bg-slate-900 border border-white/5 inline-block">
                      {rule.category}
                    </span>
                  </td>

                  <td>
                    <code className="text-xs text-amber-300 bg-slate-950 p-2 rounded-lg border border-white/5 font-mono block max-w-sm">
                      {rule.threshold}
                    </code>
                  </td>

                  <td>
                    <span className={`badge ${rule.badgeClass}`}>
                      {rule.severity}
                    </span>
                  </td>

                  <td className="font-bold text-white text-sm">
                    {rule.triggers24h} <span className="text-xs font-normal text-slate-400">times</span>
                  </td>

                  <td>
                    <span className={`badge ${rule.active ? 'badge-safe' : 'badge-warning'}`}>
                      <span className={`w-2 h-2 rounded-full ${rule.active ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span>{rule.active ? 'ACTIVE' : 'DISABLED'}</span>
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`btn text-xs py-1.5 px-3 font-mono ${
                        rule.active 
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25' 
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{rule.active ? 'Disable' : 'Enable'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Custom Rule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-slate-950 border border-white/10 p-6 rounded-2xl space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base font-mono">Create Custom Risk Rule</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div className="form-field">
                <label className="form-label">Rule ID</label>
                <input
                  type="text"
                  value={newRule.id}
                  disabled
                  className="form-input opacity-60 font-mono"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. High-Value Midnight UPI Transfer"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="form-input font-sans"
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Category Sector</label>
                  <select
                    value={newRule.category}
                    onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Velocity Engine">Velocity Engine</option>
                    <option value="Amount & Time Window">Amount & Time Window</option>
                    <option value="Geolocation Intelligence">Geolocation Intelligence</option>
                    <option value="Credential Stuffing">Credential Stuffing</option>
                    <option value="Merchant Settlement">Merchant Settlement</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Severity Level</label>
                  <select
                    value={newRule.severity}
                    onChange={(e) => setNewRule({ ...newRule, severity: e.target.value })}
                    className="form-select"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Trigger Condition Expression</label>
                <input
                  type="text"
                  placeholder="e.g. > 5 rapid attempts within 30 seconds"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: e.target.value })}
                  className="form-input font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 font-sans">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs"
                >
                  Deploy Rule to Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
