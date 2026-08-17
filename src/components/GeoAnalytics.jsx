import React, { useState } from 'react';
import { MapPin, Building, ShieldCheck, AlertTriangle, ShieldAlert, TrendingUp, Search, Filter, ArrowUpDown } from 'lucide-react';

export default function GeoAnalytics() {
  // Regional Hubs Data
  const cityData = [
    { city: 'Bengaluru', volume: '₹ 1.84 Cr', fraudRate: '0.14%', blockedAttempts: '28 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Mumbai', volume: '₹ 1.52 Cr', fraudRate: '0.18%', blockedAttempts: '34 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Delhi NCR', volume: '₹ 1.10 Cr', fraudRate: '0.42%', blockedAttempts: '78 attempts', threatLevel: 'Medium Risk', badgeClass: 'badge-warning', status: 'SUSPICIOUS' },
    { city: 'Hyderabad', volume: '₹ 78 Lakhs', fraudRate: '0.09%', blockedAttempts: '12 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
    { city: 'Kolkata', volume: '₹ 45 Lakhs', fraudRate: '0.68%', blockedAttempts: '94 attempts', threatLevel: 'High Risk', badgeClass: 'badge-danger', status: 'HIGH_RISK' },
    { city: 'Pune', volume: '₹ 62 Lakhs', fraudRate: '0.11%', blockedAttempts: '16 attempts', threatLevel: 'Low Risk', badgeClass: 'badge-safe', status: 'SAFE' },
  ];

  // Un-grouped Individual Merchant Partner Data
  const individualPartners = [
    { id: 1, name: 'Zerodha Broking Ltd', category: 'Investment & Trading', cleanRate: 99.84, cleanRateStr: '99.84%', volumeTier: 'High Volume', threatLevel: 'OPTIMAL', badgeClass: 'badge-safe', tps: '3,800 TPS' },
    { id: 2, name: 'Groww Investment', category: 'Investment & Trading', cleanRate: 99.78, cleanRateStr: '99.78%', volumeTier: 'High Volume', threatLevel: 'OPTIMAL', badgeClass: 'badge-safe', tps: '3,200 TPS' },
    { id: 3, name: 'Swiggy Instamart', category: 'Quick Commerce', cleanRate: 96.20, cleanRateStr: '96.20%', volumeTier: 'Ultra-High Velocity', threatLevel: 'ELEVATED_RISK', badgeClass: 'badge-warning', tps: '4,100 TPS' },
    { id: 4, name: 'Blinkit Grocery', category: 'Quick Commerce', cleanRate: 95.80, cleanRateStr: '95.80%', volumeTier: 'Ultra-High Velocity', threatLevel: 'ELEVATED_RISK', badgeClass: 'badge-warning', tps: '2,900 TPS' },
    { id: 5, name: 'Zepto Quick Delivery', category: 'Quick Commerce', cleanRate: 95.40, cleanRateStr: '95.40%', volumeTier: 'Ultra-High Velocity', threatLevel: 'ELEVATED_RISK', badgeClass: 'badge-warning', tps: '1,800 TPS' },
    { id: 6, name: 'CRED Pay', category: 'Credit Settlement', cleanRate: 99.40, cleanRateStr: '99.40%', volumeTier: 'High Volume', threatLevel: 'OPTIMAL', badgeClass: 'badge-safe', tps: '2,400 TPS' },
    { id: 7, name: 'Flipkart Internet', category: 'E-Commerce Retail', cleanRate: 98.50, cleanRateStr: '98.50%', volumeTier: 'High Volume', threatLevel: 'STABLE', badgeClass: 'badge-safe', tps: '4,500 TPS' },
    { id: 8, name: 'Amazon India', category: 'E-Commerce Retail', cleanRate: 98.90, cleanRateStr: '98.90%', volumeTier: 'High Volume', threatLevel: 'STABLE', badgeClass: 'badge-safe', tps: '5,100 TPS' },
    { id: 9, name: 'Dream11 Fantasy', category: 'Digital Gaming', cleanRate: 94.10, cleanRateStr: '94.10%', volumeTier: 'Bot Attack Vulnerable', threatLevel: 'HIGH_MONITORING', badgeClass: 'badge-danger', tps: '1,900 TPS' },
    { id: 10, name: 'WinZO Games', category: 'Digital Gaming', cleanRate: 93.70, cleanRateStr: '93.70%', volumeTier: 'Bot Attack Vulnerable', threatLevel: 'HIGH_MONITORING', badgeClass: 'badge-danger', tps: '1,200 TPS' },
  ];

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedThreat, setSelectedThreat] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DESC'); // DESC = highest clean rate first

  // Filtered & Sorted Partners List
  const filteredPartners = individualPartners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesThreat = selectedThreat === 'ALL' || p.threatLevel === selectedThreat;
    return matchesSearch && matchesCategory && matchesThreat;
  }).sort((a, b) => {
    return sortOrder === 'DESC' ? b.cleanRate - a.cleanRate : a.cleanRate - b.cleanRate;
  });

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

        {/* Clean Regional Table */}
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
                    <span className={`font-bold ${row.status === 'HIGH_RISK' ? 'text-rose-400' : row.status === 'SUSPICIOUS' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {row.fraudRate}
                    </span>
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

      {/* Section 2: Individual Merchant Partners & Risk Analytics (Filtered & Un-grouped) */}
      <div className="card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Merchant Partner Risk Analytics</h2>
              <p className="text-xs text-slate-400 font-mono">Individual risk profiles, clean traffic rates, and threat levels for each partner</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{filteredPartners.length} PARTNERS LISTED</span>
          </div>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search Zerodha, Swiggy, CRED..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select text-xs py-1.5 h-9"
              >
                <option value="ALL">All Categories</option>
                <option value="Investment & Trading">Investment & Trading</option>
                <option value="Quick Commerce">Quick Commerce</option>
                <option value="Credit Settlement">Credit Settlement</option>
                <option value="E-Commerce Retail">E-Commerce Retail</option>
                <option value="Digital Gaming">Digital Gaming</option>
              </select>
            </div>

            {/* Threat Filter */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <select
                value={selectedThreat}
                onChange={(e) => setSelectedThreat(e.target.value)}
                className="form-select text-xs py-1.5 h-9"
              >
                <option value="ALL">All Threat Levels</option>
                <option value="OPTIMAL">OPTIMAL (Low Risk)</option>
                <option value="STABLE">STABLE</option>
                <option value="ELEVATED_RISK">ELEVATED RISK</option>
                <option value="HIGH_MONITORING">HIGH MONITORING</option>
              </select>
            </div>
          </div>

          {/* Clean Rate Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC')}
            className="btn btn-secondary text-xs font-mono py-1.5 px-3"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>Clean Traffic: {sortOrder === 'DESC' ? 'Highest First' : 'Lowest First'}</span>
          </button>
        </div>

        {/* Individual Partner Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Partner Store</th>
                <th>Category Sector</th>
                <th>Clean Traffic Rate</th>
                <th>Active Stream Velocity</th>
                <th>Volume & Risk Tier</th>
                <th>Health Threat Status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500 font-sans">
                    No merchant partners match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id}>
                    <td>
                      <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-purple-400" />
                        <span>{partner.name}</span>
                      </div>
                    </td>

                    <td className="text-indigo-300 font-sans text-xs">
                      {partner.category}
                    </td>

                    <td className="font-bold text-emerald-400 text-sm">
                      {partner.cleanRateStr}
                    </td>

                    <td className="text-slate-300">
                      {partner.tps}
                    </td>

                    <td className="text-slate-300 font-sans text-xs">
                      {partner.volumeTier}
                    </td>

                    <td>
                      <span className={`badge ${partner.badgeClass}`}>
                        {partner.threatLevel.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
