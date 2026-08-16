import React, { useState } from 'react';
import { 
  CreditCard, 
  Zap, 
  Sliders, 
  CheckCircle2, 
  AlertOctagon,
  ArrowRight,
  Globe,
  Activity,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentSandbox({ onSimulateTxn, onNavigateTab }) {
  const [merchant, setMerchant] = useState('Razorpay Merchant Store');
  const [amount, setAmount] = useState(12500);
  const [method, setMethod] = useState('UPI (GPay)');
  const [customerName, setCustomerName] = useState('Pranav Kumar');
  const [city, setCity] = useState('Bengaluru');
  
  // Threat Vector Toggles
  const [simulateTor, setSimulateTor] = useState(false);
  const [simulateVelocity, setSimulateVelocity] = useState(false);
  const [simulateJailbreak, setSimulateJailbreak] = useState(false);

  const [resultTxn, setResultTxn] = useState(null);

  const handlePayNow = (e) => {
    e.preventDefault();

    const numAmount = Number(amount);
    let baseRisk = Math.floor(Math.random() * 6) + 2;
    const triggeredRules = [];

    // Merchant-Specific Dynamic Risk Formulas
    if (merchant === 'Swiggy Instamart') {
      if (numAmount > 15000) {
        baseRisk += 50;
        triggeredRules.push('RULE-701 (Quick-Commerce Ticket Anomaly: Swiggy Instamart)');
      }
      if (numAmount > 100000) {
        baseRisk += 35;
        triggeredRules.push('RULE-204 (Extreme Quick-Commerce Amount Breached)');
      }
    } else if (merchant === 'Zerodha Broking Ltd') {
      if (numAmount > 1000000) {
        baseRisk += 30;
        triggeredRules.push('RULE-204 (High-Value Investment Transfer)');
      } else if (numAmount > 100000) {
        baseRisk += 5;
      }
    } else if (merchant === 'CRED Pay') {
      if (method.includes('BNPL')) {
        baseRisk += 35;
        triggeredRules.push('RULE-503 (CRED Card Settlement via BNPL Anomaly)');
      }
      if (numAmount > 300000) {
        baseRisk += 40;
        triggeredRules.push('RULE-204 (Extreme Credit Bill Transfer)');
      }
    } else if (merchant === 'Flipkart Internet') {
      if (numAmount > 150000) {
        baseRisk += 40;
        triggeredRules.push('RULE-702 (High-Value Electronics Asset Risk)');
      }
    } else {
      if (numAmount > 100000) {
        baseRisk += 45;
        triggeredRules.push('RULE-204 (Standard NPCI UPI Daily Limit Exceeded)');
      }
    }

    if (numAmount > 10000000) {
      baseRisk += 80;
      triggeredRules.push('RULE-204 (Astronomical Amount Exceeded)');
    }

    if (simulateTor) {
      baseRisk += 45;
      triggeredRules.push('RULE-101 (Proxy/Tor Exit Node Detected)');
    }
    if (simulateVelocity) {
      baseRisk += 30;
      triggeredRules.push('RULE-412 (High Velocity Retry Spike)');
    }
    if (simulateJailbreak) {
      baseRisk += 25;
      triggeredRules.push('SECURITY (Rooted/Jailbroken Hardware)');
    }

    const finalScore = Math.min(Math.max(baseRisk, 1), 99);
    let status = 'SAFE';
    if (finalScore >= 75) status = 'HIGH_RISK';
    else if (finalScore >= 45) status = 'SUSPICIOUS';

    const flagReason = status === 'HIGH_RISK'
      ? `High Threat Trigger: ${triggeredRules.join(', ')}`
      : status === 'SUSPICIOUS'
      ? `Secondary Verification Required: ${triggeredRules.join(', ')}`
      : `Verified Safe for ${merchant}`;

    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      merchant,
      merchantCategory: merchant === 'Zerodha Broking Ltd' ? 'Investment & Trading' : merchant === 'Swiggy Instamart' ? 'Quick Commerce' : merchant === 'CRED Pay' ? 'Credit Settlement' : 'E-Commerce Retail',
      amount: numAmount,
      currency: 'INR',
      method,
      upiHandle: method.includes('UPI') ? `${customerName.toLowerCase().replace(' ', '')}@okaxis` : 'N/A',
      status,
      riskScore: finalScore,
      city,
      ipAddress: simulateTor ? '185.220.101.5 (Tor Exit Node)' : '106.51.72.44',
      device: simulateJailbreak ? 'iPhone 15 Pro (Jailbroken)' : 'Android 14 Chrome',
      timestamp: 'Just now',
      flaggedReason: flagReason,
      triggeredRules,
      customerName,
      velocityAlert: simulateVelocity ? '6 rapid attempts in 30s' : 'Normal'
    };

    setResultTxn(newTxn);
    onSimulateTxn(newTxn);

    if (status === 'SAFE') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in w-full">
      
      {/* Spacious Header Card */}
      <div className="card space-y-2">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Razorpay & UPI Payment Gateway Sandbox
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Test merchant-specific risk profiles and inject simulated threat vectors in real time
            </p>
          </div>
        </div>
      </div>

      {resultTxn ? (
        /* Result View */
        <div className="card text-center space-y-6 animate-fade-in p-10">
          {resultTxn.status === 'SAFE' ? (
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/20 font-mono">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center shadow-xl shadow-rose-500/20 font-mono">
              <AlertOctagon className="w-10 h-10" />
            </div>
          )}

          <div className="space-y-2">
            <span className={`badge ${
              resultTxn.status === 'SAFE' ? 'badge-safe' : resultTxn.status === 'SUSPICIOUS' ? 'badge-warning' : 'badge-danger'
            }`}>
              {resultTxn.status} ({resultTxn.riskScore}% Threat Index)
            </span>
            <h3 className="text-4xl font-extrabold text-white font-mono mt-2">
              ₹ {resultTxn.amount.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-slate-400 font-mono">{resultTxn.merchant} • ID: {resultTxn.id}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 text-left text-xs space-y-3 font-mono text-slate-300 max-w-2xl mx-auto shadow-lg">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Evaluation Latency:</span>
              <span className="text-emerald-400 font-bold">11ms (Redis Velocity Cache)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Merchant Profile:</span>
              <span className="text-indigo-300 font-bold">{resultTxn.merchantCategory}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Customer Name:</span>
              <span className="text-white font-bold">{resultTxn.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Payment Method:</span>
              <span className="text-white">{resultTxn.method}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Risk Evaluation:</span>
              <span className="text-amber-300 leading-relaxed font-sans">{resultTxn.flaggedReason}</span>
            </div>
          </div>

          <div className="flex gap-5 max-w-md mx-auto pt-4 font-sans">
            <button
              onClick={() => setResultTxn(null)}
              className="btn btn-secondary flex-1 justify-center text-xs py-3"
            >
              Test Another Payment
            </button>
            <button
              onClick={() => onNavigateTab('radar')}
              className="btn btn-primary flex-1 justify-center text-xs py-3"
            >
              <span>View in Stream Radar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Form View - Ultra Spacious */
        <div className="card space-y-6">
          <form onSubmit={handlePayNow} className="space-y-6">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Select Merchant Partner Store</label>
                <select
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="form-select"
                >
                  <option value="Razorpay Merchant Store">Razorpay Merchant Store (General Gateway)</option>
                  <option value="Zerodha Broking Ltd">Zerodha Broking Ltd (Stock Investment)</option>
                  <option value="Swiggy Instamart">Swiggy Instamart (Quick Grocery Commerce)</option>
                  <option value="CRED Pay">CRED Pay (Credit Card Settlements)</option>
                  <option value="Flipkart Internet">Flipkart Internet (E-Commerce Electronics)</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Amount (INR ₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="form-select"
                >
                  <option value="UPI (GPay)">UPI (GPay)</option>
                  <option value="UPI (PhonePe)">UPI (PhonePe)</option>
                  <option value="UPI (Paytm)">UPI (Paytm)</option>
                  <option value="HDFC Regalia Credit Card">HDFC Regalia Credit Card</option>
                  <option value="ICICI NetBanking">ICICI NetBanking</option>
                  <option value="Simpl BNPL">Simpl BNPL</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input font-sans"
                />
              </div>
            </div>

            {/* Threat Vector Injection Grid Cards */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Inject Simulated Threat Vectors</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  simulateTor 
                    ? 'bg-indigo-600/15 border-indigo-500/50 text-white' 
                    : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/20'
                }`}>
                  <input
                    type="checkbox"
                    checked={simulateTor}
                    onChange={(e) => setSimulateTor(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4 shrink-0"
                  />
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Proxy / Tor Exit IP</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  simulateVelocity 
                    ? 'bg-indigo-600/15 border-indigo-500/50 text-white' 
                    : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/20'
                }`}>
                  <input
                    type="checkbox"
                    checked={simulateVelocity}
                    onChange={(e) => setSimulateVelocity(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4 shrink-0"
                  />
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>High Velocity Retries</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  simulateJailbreak 
                    ? 'bg-indigo-600/15 border-indigo-500/50 text-white' 
                    : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/20'
                }`}>
                  <input
                    type="checkbox"
                    checked={simulateJailbreak}
                    onChange={(e) => setSimulateJailbreak(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4 shrink-0"
                  />
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Jailbroken Device</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center text-sm py-3.5 mt-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Simulate Live Payment & Evaluate Risk</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
