import React, { useState } from 'react';
import { BookOpen, Copy, Check, Server, Cpu, Database, Network, Sparkles } from 'lucide-react';
import { SYSTEM_DESIGN_INFO } from '../data/mockData';

export default function SystemArchitecture() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyBullet = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>System Architecture & Interview Guide</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                SDE-1 / SDE-2 READY
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">Use this technical system design blueprint to answer interview questions at top FinTech unicorns</p>
          </div>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          <span>High-Level Distributed Architecture (15,400 TPS)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
            <div className="text-indigo-400 font-bold flex items-center gap-2">
              <Server className="w-4 h-4" /> 1. Ingestion Layer
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              React/Vite Dashboard → Kong API Gateway (Rate Limiter & JWT Auth) → Apache Kafka Event Pipeline (32 partitions).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
            <div className="text-purple-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" /> 2. Real-Time Risk Engine
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Redis ZSET Velocity Cache (&lt; 2ms lookups) + FastAPI Python Engine (XGBoost ML classification + LLM RAG Copilot).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
            <div className="text-cyan-400 font-bold flex items-center gap-2">
              <Database className="w-4 h-4" /> 3. Persistence & Analytics
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              ClickHouse OLAP for Real-time Dashboard Aggregations + PostgreSQL Primary OLTP for Immutable Settled Ledgers.
            </p>
          </div>
        </div>
      </div>

      {/* Core Engineering Specs */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          Engineering Stack Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {SYSTEM_DESIGN_INFO.architectureComponents.map((comp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <h4 className="font-bold text-white text-xs">{comp.title}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Bullet Point Copy Generator */}
      <div className="glass-panel p-6 space-y-4 border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Copy-Paste Bullet Points for Resume & LinkedIn</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">1-Click Copy</span>
        </div>

        <div className="space-y-3 text-xs">
          {SYSTEM_DESIGN_INFO.resumeBulletPoints.map((bullet, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex items-start justify-between gap-4 hover:border-indigo-500/40 transition-colors"
            >
              <p className="text-slate-200 text-xs leading-relaxed font-mono">
                • {bullet}
              </p>
              <button
                onClick={() => handleCopyBullet(bullet, idx)}
                className="p-2 rounded bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shrink-0 font-sans"
                title="Copy bullet point"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
