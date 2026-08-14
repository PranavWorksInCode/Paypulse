import React from 'react';
import { MapPin, Building2, TrendingUp, ShieldAlert, BarChart3 } from 'lucide-react';
import { CITY_RISK_METRICS } from '../data/mockData';

export default function GeoAnalytics() {
  return (
    <div className="space-y-6">
      {/* City Risk Breakdown Grid */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <span>Regional Indian Market Threat Heatmap</span>
            </h2>
            <p className="text-xs text-slate-400">Transaction volume vs fraud rate distribution across major tech & business hubs</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            6 Major Metropolitan Hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITY_RISK_METRICS.map((cityData) => (
            <div 
              key={cityData.city}
              className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-indigo-500/30 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base flex items-center gap-2">
                  <span>{cityData.city}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                  cityData.riskLevel === 'High' 
                    ? 'badge-danger' 
                    : cityData.riskLevel === 'Medium' 
                    ? 'badge-warning' 
                    : 'badge-safe'
                }`}>
                  {cityData.riskLevel} Risk
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>24h Volume:</span>
                  <span className="text-white font-bold">{cityData.totalVolume}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fraud Interception Rate:</span>
                  <span className="text-indigo-300 font-bold">{cityData.fraudRate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Blocked Anomalies:</span>
                  <span className="text-amber-400 font-bold">{cityData.flagCount} attempts</span>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    cityData.riskLevel === 'High' ? 'bg-rose-500' : cityData.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${parseFloat(cityData.fraudRate) * 150}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Merchant Category Risk Breakdown */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyan-400" />
          <span>Top Merchant Categories & Risk Profiles</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <span className="text-xs text-slate-400 font-mono">Investment & Trading</span>
            <h4 className="text-lg font-bold text-white mt-1">Zerodha & Groww</h4>
            <div className="text-xs text-emerald-400 mt-2 font-mono">99.8% Clean • High Volume</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <span className="text-xs text-slate-400 font-mono">Quick Commerce</span>
            <h4 className="text-lg font-bold text-white mt-1">Blinkit & Swiggy</h4>
            <div className="text-xs text-emerald-400 mt-2 font-mono">99.9% Clean • High Velocity</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <span className="text-xs text-slate-400 font-mono">Credit Card Settlements</span>
            <h4 className="text-lg font-bold text-white mt-1">CRED Pay & Cheq</h4>
            <div className="text-xs text-amber-400 mt-2 font-mono">98.4% Clean • Moderate Risk</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <span className="text-xs text-slate-400 font-mono">Digital Stores & Gaming</span>
            <h4 className="text-lg font-bold text-white mt-1">Virtual Vouchers</h4>
            <div className="text-xs text-rose-400 mt-2 font-mono">94.1% Clean • High Fraud Target</div>
          </div>
        </div>
      </div>
    </div>
  );
}
