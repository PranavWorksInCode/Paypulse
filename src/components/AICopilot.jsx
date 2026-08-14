import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertTriangle, ShieldCheck, Terminal, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { SUGGESTED_AI_PROMPTS } from '../data/mockData';

export default function AICopilot({ selectedTxn, transactions }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 **Hello! I am PayPulse AI Copilot.** I monitor high-frequency UPI & card transaction feeds, analyze risk velocity anomalies, and generate financial compliance audits.\n\nAsk me anything about transaction threats, merchant risks, or rule engine configs!",
      timestamp: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Trigger automatic investigation when a transaction is passed from LiveRadar
  useEffect(() => {
    if (selectedTxn) {
      handleInvestigateTxn(selectedTxn);
    }
  }, [selectedTxn]);

  const handleInvestigateTxn = (txn) => {
    const promptText = `Investigate Transaction ${txn.id} (${txn.merchant} - ₹${txn.amount.toLocaleString('en-IN')})`;
    
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: promptText, timestamp: 'Just now' }
    ]);

    setIsGenerating(true);

    setTimeout(() => {
      let aiResponseText = '';
      if (txn.status === 'HIGH_RISK') {
        aiResponseText = `🚨 **HIGH RISK ALERT INVESTIGATION: ${txn.id}**\n\n` +
          `• **Merchant**: ${txn.merchant} (${txn.merchantCategory})\n` +
          `• **Amount**: ₹${txn.amount.toLocaleString('en-IN')} via ${txn.method}\n` +
          `• **Threat Vectors Identified**:\n` +
          `  1. **Tor IP Exit Node**: Connection originated from \`${txn.ipAddress}\` (Known malicious node).\n` +
          `  2. **Device Jailbreak**: Hardware signature matched a jailbroken iOS environment.\n` +
          `  3. **High Velocity**: ${txn.velocityAlert}.\n\n` +
          `💡 **Recommended Action**: **Immediate Hold & Freeze Account**. Trigger SMS OTP Re-authentication before merchant settlement.`;
      } else if (txn.status === 'SUSPICIOUS') {
        aiResponseText = `⚠️ **SUSPICIOUS TRANSACTION ANALYSIS: ${txn.id}**\n\n` +
          `• **Merchant**: ${txn.merchant}\n` +
          `• **Flagged Reason**: ${txn.flaggedReason}\n` +
          `• **Anomaly**: Velocity tracker registered an impossible location jump.\n\n` +
          `💡 **Recommended Action**: Flag for secondary compliance review within 15 minutes.`;
      } else {
        aiResponseText = `✅ **SAFE TRANSACTION VERIFICATION: ${txn.id}**\n\n` +
          `• **Merchant**: ${txn.merchant}\n` +
          `• **Risk Score**: ${txn.riskScore}%\n` +
          `• **Verification**: Customer biometric signatures verified with 0 velocity anomalies. Safe to settle immediately.`;
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiResponseText, timestamp: 'Just now' }
      ]);
      setIsGenerating(false);
    }, 900);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim() || isGenerating) return;

    const userText = inputQuery.trim();
    setInputQuery('');
    
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userText, timestamp: 'Just now' }
    ]);

    setIsGenerating(true);

    setTimeout(() => {
      const textLower = userText.toLowerCase();
      let response = '';

      if (textLower.includes('zerodha') || textLower.includes('merchant audit')) {
        response = `📊 **MERCHANT AUDIT REPORT: Zerodha Broking Ltd**\n\n` +
          `• **Total 24h Settlement Volume**: ₹ 1.45 Crore\n` +
          `• **Average Risk Score**: 14% (Clean)\n` +
          `• **Flagged High Risk Attempts**: 1 (Blocked TOR attempt of ₹1.45L)\n` +
          `• **Success Rate**: 99.82%\n` +
          `• **Compliance Status**: Compliant with RBI Master Directions on Payment Aggregators.`;
      } else if (textLower.includes('bengaluru') || textLower.includes('upi') || textLower.includes('50,000')) {
        response = `🔍 **UPI RISK ANOMALY REPORT (BENGALURU REGION)**\n\n` +
          `Found 2 high-value UPI transfers (> ₹50,000) flagged in the last 10 minutes:\n` +
          `1. **TXN-984210**: ₹1,45,000 via GPay (\`investor99@okaxis\`) - TOR exit node detected. Status: **BLOCKED**.\n` +
          `2. **TXN-984205**: ₹89,000 via NetBanking - Botnet retry pattern. Status: **BLOCKED**.\n\n` +
          `🛡️ **System Protection**: Automated rules saved ₹2,34,000 from potential fraud loss.`;
      } else if (textLower.includes('rule') || textLower.includes('explain')) {
        response = `⚡ **RULE ENGINE EXPLANATION: RULE-204 (High-Value Night UPI)**\n\n` +
          `• **Condition**: Triggered when a UPI payment exceeds ₹1,00,000 between 1:00 AM and 5:00 AM IST.\n` +
          `• **Rationale**: Historical bank telemetry shows 74% of unauthorized SIM-swap attacks occur in night windows.\n` +
          `• **Action Enforcement**: Enforces Mandatory Biometric 2FA before API authorization.`;
      } else {
        response = `🤖 **PAYPULSE AI ANALYTICS INSIGHT**\n\n` +
          `Analyzed current transaction buffer (${transactions.length} active sessions):\n` +
          `• **Clean Traffic**: ${((transactions.filter(t => t.status === 'SAFE').length / transactions.length) * 100).toFixed(0)}%\n` +
          `• **High Risk Threats**: ${transactions.filter(t => t.status === 'HIGH_RISK').length} sessions blocked.\n` +
          `• **Fraud Interception Speed**: < 12ms average latency.\n\n` +
          `Would you like me to adjust risk velocity rules or run a deep audit on a specific transaction ID?`;
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: response, timestamp: 'Just now' }
      ]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 flex flex-col h-[650px] relative">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>PayPulse AI Financial Copilot</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                LLM RAG Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">Natural language fraud investigation & compliance audit assistant</p>
          </div>
        </div>

        <button 
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        {SUGGESTED_AI_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputQuery(prompt.replace(/^[^\w]+/, ''));
            }}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-500/40 border border-white/10 text-xs text-slate-300 transition-all whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 font-sans">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none font-mono'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div className="text-[10px] opacity-60 mt-2 text-right">{msg.timestamp}</div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                You
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl w-fit animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>AI Copilot is analyzing transaction vector telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI Copilot to analyze transactions, investigate risk, or explain rules..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isGenerating}
          className="btn-primary py-2.5 px-4 text-xs disabled:opacity-50"
        >
          <span>Ask Copilot</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
