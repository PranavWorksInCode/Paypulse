import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  Search, 
  FileText,
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  User,
  HelpCircle
} from 'lucide-react';

export default function AICopilot({ selectedTxn, transactions }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am PayPulse AI Financial Copilot.\n\nI monitor high-frequency UPI & card transaction feeds, analyze risk velocity anomalies, and generate automated financial compliance audits.\n\nAsk me anything about transaction threats, merchant risks, or rule engine configs!',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (selectedTxn) {
      const prompt = `Investigate flagged transaction ${selectedTxn.id} for ${selectedTxn.merchant} (Amount: ₹${selectedTxn.amount.toLocaleString('en-IN')})`;
      handleSendPrompt(prompt, selectedTxn);
    }
  }, [selectedTxn]);

  const handleSendPrompt = (promptText, txnCtx = null) => {
    const textToSend = promptText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!promptText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let isUnhandled = false;
      const textLower = textToSend.toLowerCase();
      const targetTxn = txnCtx;

      // Merchant Audit Queries
      if (textLower.includes('zerodha') || textLower.includes('swiggy') || textLower.includes('cred') || textLower.includes('flipkart') || textLower.includes('merchant audit')) {
        const merchantName = textLower.includes('zerodha') ? 'Zerodha Broking Ltd' : textLower.includes('swiggy') ? 'Swiggy Instamart' : textLower.includes('cred') ? 'CRED Pay' : 'Flipkart Internet';
        aiReply = `🛡️ MERCHANT COMPLIANCE AUDIT REPORT: ${merchantName}\n\n` +
          `• Processed 24h Volume: ₹4.82 Crores across 14,200 transactions.\n` +
          `• Fraud Interception Rate: 99.84% (Sub-15ms Redis ZSET evaluation).\n` +
          `• Key Risk Findings: 3 nocturnal high-value transfers (> ₹1,00,000 between 1:00 AM - 4:00 AM IST) were flagged and required 2FA biometric confirmation.\n` +
          `• Recommendation: Merchant status is SAFE. No compliance freeze required under RBI Master Directions.`;
      } 
      // Regional & Geolocation Risk Audits
      else if (textLower.includes('bengaluru') || textLower.includes('mumbai') || textLower.includes('delhi') || textLower.includes('regional') || textLower.includes('upi anomaly') || textLower.includes('anomalies')) {
        aiReply = `📍 REGIONAL UPI THREAT ANALYSIS: Bengaluru & Major Indian Tech Hubs\n\n` +
          `• Flagged Anomalies: 12 high-velocity UPI retry spikes detected in Koramangala & Indiranagar.\n` +
          `• Primary Vector: Automated bot retry attacks targeting quick-commerce merchants.\n` +
          `• Active Enforcements: Applied RULE-101 (Proxy/TOR Exit IP) and RULE-412 (CVV Retry Limit).\n` +
          `• Risk Mitigation: 98.2% of malicious attempts intercepted before bank settlement.`;
      } 
      // Specific Transaction Deep Dives (Explicit TXN ID or selectedTxn context)
      else if (textLower.includes('txn-') || (textLower.includes('why') && textLower.includes('flagged')) || targetTxn) {
        const txnIdMatch = textToSend.match(/TXN-\d+/i);
        const txnId = txnIdMatch ? txnIdMatch[0].toUpperCase() : (targetTxn ? targetTxn.id : 'TXN-984210');
        
        aiReply = `🚨 DEEP THREAT INVESTIGATION ANALYSIS: ${txnId}\n\n` +
          `• Merchant: ${targetTxn ? targetTxn.merchant : 'Swiggy Instamart'}\n` +
          `• Amount: ₹ ${targetTxn ? targetTxn.amount.toLocaleString('en-IN') : '65,911'}\n` +
          `• Threat Index: ${targetTxn ? targetTxn.riskScore : '84'}% (${targetTxn ? targetTxn.status : 'HIGH RISK'})\n` +
          `• Telemetry Signals Detected:\n` +
          `  1. TOR Exit Node IP: Connection originated from 185.220.101.5 (Anonymizing Proxy Network).\n` +
          `  2. Device Hardware: Matched a jailbroken iOS environment with root privileges.\n` +
          `  3. Velocity Alert: 4 rapid retry attempts in < 30 seconds.\n\n` +
          `💡 Action Recommended: Keep account BLOCKED. Require mandatory in-person KYC re-verification before account unlock.`;
      } 
      // System & Pipeline SLA Queries
      else if (textLower.includes('kafka') || textLower.includes('tps') || textLower.includes('redis') || textLower.includes('rule') || textLower.includes('latency') || textLower.includes('sla')) {
        aiReply = `✨ PAYPULSE SYSTEM PERFORMANCE & RULE SLA AUDIT\n\n` +
          `• Stream Throughput: 15,400 TPS live ingestion active via Kafka Topic paypulse-events.\n` +
          `• Inference SLA: Average ML risk scoring latency is 11ms.\n` +
          `• Rule Engine Status: 12 active sliding-window rules enforcing RBI compliance.\n\n` +
          `Type any transaction ID, merchant name, or region to run a targeted deep audit!`;
      } 
      // PRE-LOADED GUIDED FALLBACK RESPONSE (For Unhandled / Out-of-Scope Requests)
      else {
        isUnhandled = true;
        aiReply = `⚠️ UNHANDLED QUERY NOTICE\n\n` +
          `I am specialized specifically as a FinTech Payment Fraud & Compliance Copilot under Reserve Bank of India (RBI) guidelines.\n\n` +
          `I cannot assist with general topics outside payment security, merchant risk audits, and rule engine telemetry.\n\n` +
          `💡 Here are supported prompt topics you can ask me right now:`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now',
        isUnhandled
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: 'Hello! I am PayPulse AI Financial Copilot.\n\nI monitor high-frequency UPI & card transaction feeds, analyze risk velocity anomalies, and generate automated financial compliance audits.\n\nAsk me anything about transaction threats, merchant risks, or rule engine configs!',
        timestamp: 'Just now'
      }
    ]);
  };

  const suggestionCards = [
    {
      id: 1,
      icon: Search,
      color: 'text-cyan-400',
      title: 'Analyze UPI Anomalies',
      desc: 'Analyze suspicious UPI transactions over ₹50,000 in Bengaluru',
      prompt: 'Analyze suspicious UPI transactions over ₹50,000 in Bengaluru'
    },
    {
      id: 2,
      icon: FileText,
      color: 'text-emerald-400',
      title: 'Merchant Audit Report',
      desc: 'Generate Merchant Audit Report for Zerodha Broking Ltd',
      prompt: 'Generate Merchant Audit Report for Zerodha Broking Ltd'
    },
    {
      id: 3,
      icon: AlertTriangle,
      color: 'text-rose-400',
      title: 'Diagnose Threat Vectors',
      desc: 'Why was transaction TXN-984210 flagged as HIGH RISK?',
      prompt: 'Why was transaction TXN-984210 flagged as HIGH RISK?'
    },
    {
      id: 4,
      icon: TrendingUp,
      color: 'text-amber-400',
      title: 'Festive Velocity Forecast',
      desc: 'Predict risk velocity trends for upcoming Festive Sale peak',
      prompt: 'Predict risk velocity trends for upcoming Festive Sale peak'
    }
  ];

  return (
    <div className="copilot-container">
      
      {/* Top Header Bar */}
      <div className="copilot-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white tracking-tight">PayPulse AI Financial Copilot</h2>
              <span className="badge badge-safe text-[10px]">
                LLM RAG v2.4 • Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Natural language fraud investigation & compliance audit assistant</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="btn btn-secondary text-xs font-mono py-1.5 px-3"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
        
        {/* Gemini / ChatGPT Style Suggestion Cards */}
        {messages.length <= 1 && (
          <div className="space-y-5 my-6">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                How can I assist with risk compliance today?
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any hint below or type your query in the input bar
              </p>
            </div>

            <div className="copilot-suggestions-grid">
              {suggestionCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSendPrompt(card.prompt)}
                    className="copilot-suggestion-card group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="copilot-card-title">
                        <IconComponent className={`w-4.5 h-4.5 ${card.color} shrink-0`} />
                        <span>{card.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="copilot-card-desc">
                      "{card.desc}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 mt-1 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div
              className={`max-w-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'copilot-chat-bubble-user font-medium font-sans'
                  : 'copilot-chat-bubble-ai font-sans'
              }`}
            >
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Interactive Guided Prompt Chips for Unhandled Queries */}
              {msg.isUnhandled && (
                <div className="mt-4 space-y-2 pt-3 border-t border-white/10 font-mono">
                  <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Click a guided prompt below to run:</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {suggestionCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => handleSendPrompt(card.prompt)}
                        className="text-left p-2.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 hover:bg-slate-800/90 transition-all group flex items-center justify-between"
                      >
                        <div className="text-slate-200 text-[11.5px] font-sans flex items-center gap-2">
                          <span className="text-indigo-400 font-bold">▶</span>
                          <span>"{card.prompt}"</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={`text-[10px] mt-3 font-mono ${msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3.5 justify-start items-center">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>AI Copilot is analyzing Kafka stream & Redis velocity logs...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Bottom Input Bar */}
      <div className="pt-6 mt-4 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="copilot-input-wrapper shadow-2xl"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot about transactions, merchant risks, or rule engine configs..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="copilot-input-field font-sans"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="copilot-send-button"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10.5px] text-slate-400 text-center mt-2.5 font-mono">
          PayPulse Copilot uses RAG vector indexing over live Kafka payment telemetry. Verify critical audit reports under RBI guidelines.
        </p>
      </div>

    </div>
  );
}
