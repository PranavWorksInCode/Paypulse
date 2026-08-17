import React, { useState } from 'react';
import { Cpu, Server, Database, Layers, Copy, Check, Sparkles, Workflow, ArrowRight } from 'lucide-react';

export default function SystemArchitecture() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const resumeBullets = [
    "Architected PayPulse AI, a high-throughput FinTech fraud analytics platform processing simulated 15,000+ TPS with <15ms end-to-end latency.",
    "Engineered real-time rule engine & velocity cache using Redis sliding-window algorithm to detect multi-device attacks & impossible travel anomalies.",
    "Integrated an LLM-powered RAG Financial Copilot providing natural-language fraud investigations & automated compliance audit reports for Razorpay/CRED payment rails."
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in w-full">
      
      {/* Header Card */}
      <div className="card space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>System Architecture & Interview Blueprint</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Technical system design blueprint to answer interview questions at top FinTech unicorns
              </p>
            </div>
          </div>

          <span className="badge badge-safe font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SDE-1 / SDE-2 INTERVIEW READY</span>
          </span>
        </div>
      </div>

      {/* Visual Pipeline Architecture Card */}
      <div className="card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Workflow className="w-4 h-4 text-indigo-400" />
            <span>Distributed High-Throughput Pipeline (15,400 TPS)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Sub-15ms Latency SLA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Layer 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <Server className="w-4 h-4" />
              <span>1. Ingestion Layer</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              React/Vite Dashboard → Kong API Gateway (Rate Limiter & JWT Auth) → Apache Kafka Event Pipeline (32 partitions).
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-[11px]">
              <Cpu className="w-4 h-4" />
              <span>2. Real-Time Risk Engine</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Redis ZSET Velocity Cache (&lt; 2ms lookups) + FastAPI Python Engine (XGBoost ML classification + LLM RAG Copilot).
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              <Database className="w-4 h-4" />
              <span>3. Persistence & Analytics</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              ClickHouse OLAP for Real-time Dashboard Aggregations + PostgreSQL Primary OLTP for Immutable Settled Ledgers.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Stack Grid */}
      <div className="card space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono pb-4 border-b border-white/10">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Core Engineering Technology Stack Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-indigo-300 font-mono">React / Vite Frontend</div>
            <p className="text-slate-400 leading-relaxed">Glassmorphic UI, real-time WebSocket state streaming, optimistic UI updates.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-purple-300 font-mono">API Gateway (Kong / NGINX)</div>
            <p className="text-slate-400 leading-relaxed">Handles rate-limiting (100K req/min), JWT auth, and DDoS protection.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-cyan-300 font-mono">Kafka Event Pipeline</div>
            <p className="text-slate-400 leading-relaxed">Pub/Sub queue processing transaction topics at 15,000 events/second.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-amber-300 font-mono">Redis In-Memory Velocity Cache</div>
            <p className="text-slate-400 leading-relaxed">Evaluates sliding-window velocity rules (e.g. 5 txns in 60s) in &lt; 2ms latency.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-emerald-300 font-mono">Python FastAPI + XGBoost / GenAI</div>
            <p className="text-slate-400 leading-relaxed">Machine Learning model calculating 0–100 risk score + LLM RAG explanation engine.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <div className="font-bold text-rose-300 font-mono">PostgreSQL & ClickHouse</div>
            <p className="text-slate-400 leading-relaxed">ClickHouse OLAP for real-time analytics dashboards + Postgres OLTP for settled ledgers.</p>
          </div>
        </div>
      </div>

      {/* Copy-Paste Bullet Points for Resume & LinkedIn */}
      <div className="card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Copy className="w-4 h-4 text-emerald-400" />
            <span>Copy-Paste Bullet Points for Resume & LinkedIn</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Click any card to copy</span>
        </div>

        <div className="space-y-3 font-sans">
          {resumeBullets.map((bullet, idx) => (
            <div
              key={idx}
              onClick={() => handleCopy(bullet, idx)}
              className="p-4 rounded-xl bg-slate-950 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all group flex items-start justify-between gap-4 hover:bg-slate-900/80"
            >
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0 group-hover:scale-125 transition-all" />
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {bullet}
                </p>
              </div>

              <button className="btn btn-secondary text-xs p-2 shrink-0 font-mono">
                {copiedIndex === idx ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="text-slate-400 group-hover:text-white flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
