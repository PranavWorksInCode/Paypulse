import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Server, Cpu, Database, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { SYSTEM_DESIGN_INFO } from '../data/mockData';

export default function SystemArchitectureModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopyBullet = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2 font-sans">
                <span>System Design & Interview Defense Guide</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SDE-1 / SDE-2 RESUME READY
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">Use this technical architecture to answer interview questions at top FinTech unicorns</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-400" />
            <span>High-Level Distributed System Architecture (15,000 TPS)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 space-y-1">
              <div className="text-indigo-400 font-bold flex items-center gap-1.5">
                <Server className="w-4 h-4" /> 1. Ingestion Layer
              </div>
              <p className="text-slate-300 text-[11px]">React/Vite Frontend → Kong API Gateway (JWT & Rate Limiter) → Kafka Event Pipeline</p>
            </div>

            <div className="p-3.5 rounded-lg bg-purple-950/40 border border-purple-500/30 space-y-1">
              <div className="text-purple-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> 2. Real-Time Risk Engine
              </div>
              <p className="text-slate-300 text-[11px]">Redis Sliding-Window Velocity Cache + Python FastAPI (XGBoost ML + RAG LLM Copilot)</p>
            </div>

            <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Database className="w-4 h-4" /> 3. Persistence & Analytics
              </div>
              <p className="text-slate-300 text-[11px]">ClickHouse OLAP for Real-time Dashboard Analytics + PostgreSQL for Transaction Ledger</p>
            </div>
          </div>
        </div>

        {/* Detailed Component Specs */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">
            Core Engineering Stack Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
            {SYSTEM_DESIGN_INFO.architectureComponents.map((comp, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/50 border border-white/5 space-y-1">
                <h4 className="font-bold text-white text-xs">{comp.title}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyable Resume Bullet Points */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Copy-Paste Bullet Points for Your Resume & LinkedIn</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">1-Click Copy</span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {SYSTEM_DESIGN_INFO.resumeBulletPoints.map((bullet, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-lg bg-slate-900 border border-white/10 flex items-start justify-between gap-3 group hover:border-indigo-500/40 transition-colors"
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

        {/* Modal Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="btn-primary text-xs py-2 px-4">
            Close & Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
