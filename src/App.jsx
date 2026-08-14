import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import LiveRadar from './components/LiveRadar';
import AICopilot from './components/AICopilot';
import RuleEngine from './components/RuleEngine';
import GeoAnalytics from './components/GeoAnalytics';
import PaymentSandbox from './components/PaymentSandbox';
import SystemArchitectureModal from './components/SystemArchitectureModal';
import { INITIAL_TRANSACTIONS } from './data/mockData';

export default function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState('radar');
  const [isSimulating, setIsSimulating] = useState(true);
  
  // Modals & Selectors
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [selectedTxnForAI, setSelectedTxnForAI] = useState(null);

  // Live Auto Simulation Engine
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const merchants = [
        "Swiggy Instamart", "Zerodha Broking Ltd", "CRED Pay", "Flipkart Internet", 
        "Zomato Gold", "Meesho Store", "Blinkit Grocery", "Amazon India"
      ];
      const cities = ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Kolkata"];
      const methods = ["UPI (GPay)", "UPI (PhonePe)", "UPI (Paytm)", "HDFC Regalia CC", "Simpl BNPL"];
      const names = ["Aarav Patel", "Sneha Rao", "Vikram Singh", "Deepika Iyer", "Aditya Sharma", "Kavya Reddy"];

      const chosenMerchant = merchants[Math.floor(Math.random() * merchants.length)];
      const chosenCity = cities[Math.floor(Math.random() * cities.length)];
      const chosenMethod = methods[Math.floor(Math.random() * methods.length)];
      const chosenName = names[Math.floor(Math.random() * names.length)];

      const isHighRiskAttempt = Math.random() < 0.2; // 20% chance of anomaly
      const randomAmount = isHighRiskAttempt 
        ? Math.floor(Math.random() * 90000) + 40000 
        : Math.floor(Math.random() * 4500) + 200;

      const riskScore = isHighRiskAttempt ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 15) + 2;
      const status = riskScore >= 75 ? "HIGH_RISK" : riskScore >= 45 ? "SUSPICIOUS" : "SAFE";

      const newTxn = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        merchant: chosenMerchant,
        merchantCategory: "E-Commerce / Digital",
        amount: randomAmount,
        currency: "INR",
        method: chosenMethod,
        upiHandle: chosenMethod.includes("UPI") ? `${chosenName.toLowerCase().replace(' ', '')}@ybl` : "N/A",
        status,
        riskScore,
        city: chosenCity,
        ipAddress: isHighRiskAttempt ? "185.220.101.5 (Tor Node)" : "106.51.72.44",
        device: isHighRiskAttempt ? "iPhone (Rooted)" : "Android 14 Chrome",
        timestamp: "Just now",
        flaggedReason: status !== "SAFE" ? "Automated live stream velocity trigger" : "Biometrics verified",
        triggeredRules: status !== "SAFE" ? ["RULE-101"] : [],
        customerName: chosenName,
        velocityAlert: isHighRiskAttempt ? "Velocity Spike Detected" : "Normal"
      };

      setTransactions(prev => [newTxn, ...prev.slice(0, 35)]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Actions
  const handleSelectTxnForAI = (txn) => {
    setSelectedTxnForAI(txn);
    setActiveTab('copilot');
  };

  const handleBlockTxn = (id) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'HIGH_RISK', riskScore: 99, flaggedReason: 'Manually blocked by Compliance Officer' } : t)
    );
  };

  const handleWhitelistTxn = (id) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'SAFE', riskScore: 2, flaggedReason: 'Manually whitelisted as verified user' } : t)
    );
  };

  const handleSimulateNewTxn = (txn) => {
    setTransactions(prev => [txn, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Top Header & Navigation */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        onOpenSandbox={() => setIsSandboxOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        {/* KPI Stat Cards */}
        <StatCards transactions={transactions} />

        {/* Tab Content */}
        {activeTab === 'radar' && (
          <LiveRadar 
            transactions={transactions}
            onSelectTxnForAI={handleSelectTxnForAI}
            onBlockTxn={handleBlockTxn}
            onWhitelistTxn={handleWhitelistTxn}
          />
        )}

        {activeTab === 'copilot' && (
          <AICopilot 
            selectedTxn={selectedTxnForAI}
            transactions={transactions}
          />
        )}

        {activeTab === 'rules' && (
          <RuleEngine />
        )}

        {activeTab === 'analytics' && (
          <GeoAnalytics />
        )}
      </main>

      {/* Payment Sandbox Modal */}
      <PaymentSandbox 
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        onSimulateTxn={handleSimulateNewTxn}
      />

      {/* System Architecture & Resume Guide Modal */}
      <SystemArchitectureModal 
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}
