import React from 'react';
import { MapPin, Building, ShieldCheck, AlertTriangle, ShieldAlert, TrendingUp } from 'lucide-react';

export default function GeoAnalytics() {
  const cityData = [
    { city: 'Bengaluru', volume: '₹ 1.84 Cr', fraudRate: '0.14%', blockedAttempts: '28 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Mumbai', volume: '₹ 1.52 Cr', fraudRate: '0.18%', blockedAttempts: '34 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Delhi NCR', volume: '₹ 1.10 Cr', fraudRate: '0.42%', blockedAttempts: '78 attempts', threatLevel: 'Medium Risk', badgeClass: 'badge-warning', status: 'SUSPICIOUS' },
    { city: 'Hyderabad', volume: '₹ 78 Lakhs', fraudRate: '0.09%', blockedAttempts: '12 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Kolkata', volume: '₹ 45 Lakhs', fraudRate: '0.68%', blockedAttempts: '94 attempts', threatLevel: 'High Risk', badgeClass: 'badge-danger', status: 'HIGH_RISK' },
    { city: 'Pune', volume: '₹ 62 Lakhs', fraudRate: '0.11%', blockedAttempts: '16 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
  ];

  const merchantData = [
    { category: 'Investment & Trading', partners: 'Zerodha & Groww', cleanRate: '99.84%', volumeTier: 'High Volume', status: 'OPTIMAL', badgeClass: 'badge-safe' },
    { category: 'Quick-Commerce Grocery', partners: 'Blinkit, Swiggy Instamart, Zepto', cleanRate: '96.20%', volumeTier: 'Ultra-High Velocity', status: 'ELEVATED_RISK', badgeClass: 'badge-warning' },
    { category: 'Credit Card Bill Settlement', partners: 'CRED Pay', cleanRate: '99.40%', volumeTier: 'High Volume', status: 'OPTIMAL', badgeClass: 'badge-safe' },
    { category: 'E-Commerce Retail', partners: 'Flipkart & Amazon India', cleanRate: '98.50%', volumeTier: 'High Volume', status: 'STABLE', badgeClass: 'badge-safe' },
    { category: 'Digital Gaming & Wallets', partners: 'Dream11 & WinZO', cleanRate: '94.10%', volumeTier: 'Bot Attack Vulnerable', status: 'HIGH_MONITORING', badgeClass: 'badge-danger' },
  ];

  return (
    <div className="space-y-8 font-sans animate-fade-in w-full">
      
      {/* Section 1: Regional Heatmap Data Table */}
      <div className="card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Regional Indian Market Threat Heatmap</h2>
              <p className="text-xs text-slate-400 font-mono">Transaction volume vs fraud rate distribution across 6 major tech & business hubs</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>6 METROPOLITAN HUBS MONITORED</span>
          </div>
        </div>

        {/* Clean Modern Data Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metropolitan Region</th>
                <th>24h Processed Volume</th>
                <th>Fraud Interception Rate</th>
                <th>Blocked Anomalies</th>
                <th>Regional Threat Level</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {cityData.map((row) => (
                <tr key={row.city}>
                  <td>
                    <div className="font-bold text-white font-sans flex items-center gap-2 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{row.city}</span>
                    </div>
                  </td>

                  <td className="font-bold text-slate-200">
                    {row.volume}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${row.status === 'HIGH_RISK' ? 'text-rose-400' : row.status === 'SUSPICIOUS' ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {row.fraudRate}
                      </span>
                    </div>
                  </td>

                  <td className="text-slate-300">
                    {row.blockedAttempts}
                  </td>

                  <td>
                    <span className={`badge ${row.badgeClass}`}>
                      {row.status === 'HIGH_RISK' ? <ShieldAlert className="w-3.5 h-3.5" /> : row.status === 'SUSPICIOUS' ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{row.threatLevel}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Top Merchant Categories & Risk Profiles Table */}
      <div className="card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Top Merchant Categories & Risk Profiles</h2>
              <p className="text-xs text-slate-400 font-mono">Category risk benchmarks across investment, quick-commerce, credit, and retail</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5 CATEGORY SECTORS</span>
          </div>
        </div>

        {/* Clean Merchant Data Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Industry Category</th>
                <th>Major Partners Included</th>
                <th>Clean Traffic Rate</th>
                <th>Volume / Threat Tier</th>
                <th>Category Health</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {merchantData.map((m) => (
                <tr key={m.category}>
                  <td>
                    <div className="font-bold text-white font-sans text-sm">{m.category}</div>
                  </td>

                  <td className="text-indigo-300 font-sans">
                    {m.partners}
                  </td>

                  <td className="font-bold text-emerald-400">
                    {m.cleanRate}
                  </td>

                  <td className="text-slate-300">
                    {m.volumeTier}
                  </td>

                  <td>
                    <span className={`badge ${m.badgeClass}`}>
                      {m.status.replace('_', ' ')}
                    </span>
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
