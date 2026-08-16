import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldAlert, 
  Zap, 
  Sliders, 
  CheckCircle2, 
  AlertOctagon,
  ArrowRight
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

    let baseRisk = Math.floor(Math.random() * 10) + 2;
    const triggeredRules = [];

    if (amount > 100000) {
      baseRisk += 35;
      triggeredRules.push('RULE-204');
    }
    if (simulateTor) {
      baseRisk += 45;
      triggeredRules.push('RULE-101');
    }
    if (simulateVelocity) {
      baseRisk += 30;
      triggeredRules.push('RULE-412');
    }
    if (simulateJailbreak) {
      baseRisk += 25;
    }

    const finalScore = Math.min(Math.max(baseRisk, 1), 99);
    let status = 'SAFE';
    if (finalScore >= 75) status = 'HIGH_RISK';
    else if (finalScore >= 45) status = 'SUSPICIOUS';

    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      merchant,
      merchantCategory: 'Digital Gateway Sandbox',
      amount: Number(amount),
      currency: 'INR',
      method,
      upiHandle: method.includes('UPI') ? `${customerName.toLowerCase().replace(' ', '')}@okaxis` : 'N/A',
      status,
      riskScore: finalScore,
      city,
      ipAddress: simulateTor ? '185.220.101.5 (Tor Exit Node)' : '106.51.72.44',
      device: simulateJailbreak ? 'iPhone 15 Pro (Jailbroken)' : 'Android 14 Chrome',
      timestamp: 'Just now',
      flaggedReason: status !== 'SAFE' 
        ? `${simulateTor ? 'Tor Proxy IP + ' : ''}${amount > 100000 ? 'High-Value Night Transfer + ' : ''}${simulateVelocity ? 'Velocity Spike' : 'Risk threshold breach'}` 
        : 'Biometrics & IP Verified Safe',
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
    <div className="space-y-6 font-sans animate-fade-in w-full">
      
      {/* Header */}
      <div className="card space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Razorpay & UPI Payment Gateway Sandbox</h2>
            <p className="text-xs text-slate-400 font-mono">Test live payment evaluation and inject simulated threat vectors in real time</p>
          </div>
        </div>
      </div>

      {resultTxn ? (
        /* Result Screen */
        <div className="card text-center space-y-6 animate-fade-in p-8">
          {resultTxn.status === 'SAFE' ? (
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/20">
              <AlertOctagon className="w-8 h-8" />
            </div>
          )}

          <div>
            <span className={`badge ${
              resultTxn.status === 'SAFE' ? 'badge-safe' : resultTxn.status === 'SUSPICIOUS' ? 'badge-warning' : 'badge-danger'
            }`}>
              {resultTxn.status} ({resultTxn.riskScore}% Threat Index)
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-3 font-mono">
              ₹ {resultTxn.amount.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{resultTxn.merchant} • ID: {resultTxn.id}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-white/10 text-left text-xs space-y-2.5 font-mono text-slate-300 max-w-xl mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-400">Evaluation Latency:</span>
              <span className="text-emerald-400 font-bold">11ms (Redis Velocity Cache)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Customer:</span>
              <span className="text-white">{resultTxn.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Method:</span>
              <span className="text-white">{resultTxn.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Flag Reason:</span>
              <span className="text-amber-300">{resultTxn.flaggedReason}</span>
            </div>
          </div>

          <div className="flex gap-4 max-w-md mx-auto pt-2">
            <button
              onClick={() => setResultTxn(null)}
              className="btn btn-secondary flex-1 justify-center text-xs py-2.5"
            >
              Test Another Payment
            </button>
            <button
              onClick={() => onNavigateTab('radar')}
              className="btn btn-primary flex-1 justify-center text-xs py-2.5"
            >
              <span>View in Stream Radar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <div className="card">
          <form onSubmit={handlePayNow} className="space-y-5">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Select Merchant Store</label>
                <select
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="form-select"
                >
                  <option value="Razorpay Merchant Store">Razorpay Merchant Store</option>
                  <option value="Zerodha Broking Ltd">Zerodha Broking Ltd</option>
                  <option value="Swiggy Instamart">Swiggy Instamart</option>
                  <option value="CRED Pay">CRED Pay</option>
                  <option value="Flipkart Internet">Flipkart Internet</option>
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
                  className="form-input"
                />
              </div>
            </div>

            {/* Threat Vector Injection Checks */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-3 font-sans">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Inject Simulated Threat Vectors</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer p-2.5 hover:bg-white/5 rounded-lg border border-white/5">
                  <input
                    type="checkbox"
                    checked={simulateTor}
                    onChange={(e) => setSimulateTor(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Proxy / Tor Exit IP</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer p-2.5 hover:bg-white/5 rounded-lg border border-white/5">
                  <input
                    type="checkbox"
                    checked={simulateVelocity}
                    onChange={(e) => setSimulateVelocity(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>High Velocity Retries</span>
                </label>

                <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer p-2.5 hover:bg-white/5 rounded-lg border border-white/5">
                  <input
                    type="checkbox"
                    checked={simulateJailbreak}
                    onChange={(e) => setSimulateJailbreak(e.target.checked)}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Jailbroken Device</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center text-xs py-3"
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
