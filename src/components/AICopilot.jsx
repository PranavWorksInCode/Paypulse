import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  User,
  ArrowRight,
  Terminal
} from 'lucide-react';

export default function AICopilot({ selectedTxn, transactions }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '👋 **Hello! I am PayPulse AI Financial Copilot.**\n\nI monitor high-frequency UPI & card transaction feeds, analyze risk velocity anomalies, and generate automated financial compliance audits.\n\nAsk me anything about transaction threats, merchant risks, or rule engine configs!',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle auto-investigate trigger from Live Radar selection
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
      const targetTxn = txnCtx || (transactions && transactions[0]);

      if (textToSend.toLowerCase().includes('zerodha')) {
        aiReply = `🛡️ **MERCHANT COMPLIANCE AUDIT REPORT: Zerodha Broking Ltd**\n\n` +
          `• **Processed 24h Volume**: ₹4.82 Crores across 14,200 transactions.\n` +
          `• **Fraud Interception Rate**: 99.84% (Sub-15ms Redis ZSET evaluation).\n` +
          `• **Key Risk Findings**: 3 nocturnal high-value transfers (> ₹1,00,000 between 1:00 AM - 4:00 AM IST) were flagged and required 2FA biometric confirmation.\n` +
          `• **Recommendation**: Merchant status is **SAFE**. No compliance freeze required under RBI Master Directions.`;
      } else if (textToSend.toLowerCase().includes('bengaluru') || textToSend.toLowerCase().includes('upi')) {
        aiReply = `📍 **REGIONAL UPI THREAT ANALYSIS: Bengaluru Tech Hub**\n\n` +
          `• **Flagged Anomalies**: 12 high-velocity UPI retry spikes detected in Koramangala & Indiranagar.\n` +
          `• **Primary Vector**: Automated bot retry attacks targeting quick-commerce merchants.\n` +
          `• **Active Enforcements**: Applied \`RULE-101\` (Proxy/TOR Exit IP) and \`RULE-412\` (CVV Retry Limit).\n` +
          `• **Risk Mitigation**: 98.2% of malicious attempts intercepted before bank settlement.`;
      } else if (textToSend.toLowerCase().includes('txn') || textToSend.toLowerCase().includes('flagged') || targetTxn) {
        aiReply = `🚨 **DEEP THREAT INVESTIGATION ANALYSIS: ${targetTxn ? targetTxn.id : 'TXN-984210'}**\n\n` +
          `• **Merchant**: ${targetTxn ? targetTxn.merchant : 'Swiggy Instamart'}\n` +
          `• **Amount**: ₹ ${targetTxn ? targetTxn.amount.toLocaleString('en-IN') : '65,911'}\n` +
          `• **Threat Index**: ${targetTxn ? targetTxn.riskScore : '84'}% (${targetTxn ? targetTxn.status : 'HIGH RISK'})\n` +
          `• **Telemetry Signals Detected**:\n` +
          `  1. **TOR Exit Node IP**: Connection originated from \`185.220.101.5\` (Anonymizing Proxy Network).\n` +
          `  2. **Device Hardware**: Matched a jailbroken iOS environment with root privileges.\n` +
          `  3. **Velocity Alert**: 4 rapid retry attempts in < 30 seconds.\n\n` +
          `💡 **Action Recommended**: Keep account **BLOCKED**. Require mandatory in-person KYC re-verification before account unlock.`;
      } else {
        aiReply = `✨ **PAYPULSE CO-PILOT ANALYSIS COMPLETE**\n\n` +
          `I have audited the active transaction stream matching your query.\n\n` +
          `• **Stream Health**: 15,400 TPS live ingestion active via Kafka Topic \`paypulse-events\`.\n` +
          `• **Inference SLA**: Average ML risk scoring latency is **11ms**.\n` +
          `• **Rule Engine Status**: 12 active sliding-window rules enforcing RBI compliance.\n\n` +
          `Type any transaction ID, merchant name, or region to run a targeted deep audit!`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: '👋 **Hello! I am PayPulse AI Financial Copilot.**\n\nI monitor high-frequency UPI & card transaction feeds, analyze risk velocity anomalies, and generate automated financial compliance audits.\n\nAsk me anything about transaction threats, merchant risks, or rule engine configs!',
        timestamp: 'Just now'
      }
    ]);
  };

  // Suggestion Hint Cards (Gemini / ChatGPT Style)
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
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto font-sans">
      
      {/* Top Header Bar (Gemini / ChatGPT Style) */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>PayPulse AI Financial Copilot</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LLM RAG v2.4 • Active
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">Natural language fraud investigation & compliance audit assistant</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 font-mono"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Scroll Container */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
        
        {/* Gemini / ChatGPT Style Suggestion Cards (Show when only initial message exists) */}
        {messages.length <= 1 && (
          <div className="space-y-4 my-6">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                How can I assist with risk compliance today?
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any hint below or type your query in the input bar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {suggestionCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleSendPrompt(card.prompt)}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/40 text-left transition-all group hover:bg-slate-800/80 shadow-lg flex flex-col justify-between h-28"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-indigo-300 font-mono flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${card.color}`} />
                        <span>{card.title}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
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
              className={`max-w-2xl rounded-2xl p-5 text-xs leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                  : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none font-sans'
              }`}
            >
              {/* Formatted Text Render */}
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className={`text-[10px] mt-3 font-mono ${msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs font-mono shadow-md">
                PK
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
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>AI Copilot is analyzing Kafka stream & Redis velocity logs...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Bottom Input Bar (ChatGPT / Gemini Style) */}
      <div className="pt-4 mt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="relative flex items-center max-w-4xl mx-auto shadow-2xl"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot about transactions, merchant risks, or rule engine configs..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="w-full h-14 bg-slate-900 border border-white/15 rounded-full pl-6 pr-16 text-xs text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-sans transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="absolute right-2 top-2 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
          PayPulse Copilot uses RAG vector indexing over live Kafka payment telemetry. Verify critical audit reports under RBI guidelines.
        </p>
      </div>

    </div>
  );
}
