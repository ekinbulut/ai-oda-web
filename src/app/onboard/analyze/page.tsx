"use client";

import { useAnalysisStatus } from "@/hooks/use-analysis-status";
import { AnalysisStepper } from "@/components/onboard/analysis-stepper";
import { TerminalLog } from "@/components/onboard/terminal-log";
import { VisionPreview } from "@/components/onboard/vision-preview";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Share2, Download, Database, Image as ImageIcon, Feather, LayoutDashboard, Search, Settings } from "lucide-react";
import Link from "next/link";

export default function AnalysisPage() {
  const { progress, currentAgent, message, logs, isFinished } = useAnalysisStatus();

  const agents = [
    { name: "Stratejist", icon: Database, threshold: 33 },
    { name: "Küratör", icon: ImageIcon, threshold: 66 },
    { name: "Eleştirmen", icon: Feather, threshold: 99 },
  ];

  const uiSteps = [
    { id: '1', label: 'Veri Senkronizasyonu', status: progress > 33 ? 'completed' : 'loading' },
    { id: '2', label: 'Görsel Kategorizasyon', status: progress > 66 ? 'completed' : progress > 33 ? 'loading' : 'pending' },
    { id: '3', label: 'Marka Tonu Analizi', status: progress === 100 ? 'completed' : progress > 66 ? 'loading' : 'pending' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* 3. UX Dokunuşu: Skeleton Background Preview */}
      <AnimatePresence>
        {progress > 70 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="absolute inset-0 z-0 pointer-events-none p-12 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex gap-4">
                <div className="w-1/4 h-64 bg-white/20 rounded-3xl" />
                <div className="w-2/4 h-64 bg-white/20 rounded-3xl" />
                <div className="w-1/4 h-64 bg-white/20 rounded-3xl" />
              </div>
              <div className="h-96 bg-white/10 rounded-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]"
          >
            <Cpu className="w-3 h-3 animate-spin-slow" />
            {isFinished ? "SYSTEM READY" : "NEURAL PROCESSING ACTIVE"}
          </motion.div>
          
          <h2 className="text-5xl font-black tracking-tighter text-white">
            O.D.A Analiz Ediyor
          </h2>
          <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            {isFinished ? "Analiz tamamlandı. Taslak dashboard hazır." : message}
          </p>
        </div>

        {/* 2. UX Dokunuşu: Sequential Agent Icons */}
        <div className="flex justify-center items-center gap-12 py-4">
          {agents.map((agent, idx) => {
            const isActive = currentAgent === agent.name;
            const isDone = progress > agent.threshold;
            const Icon = agent.icon;

            return (
              <div key={agent.name} className="flex flex-col items-center gap-3">
                <motion.div 
                  animate={isActive ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0)"] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`p-5 rounded-2xl border-2 transition-all duration-500 shadow-2xl ${
                    isDone ? "bg-cyan-500 border-cyan-500 text-black shadow-cyan-500/20" : 
                    isActive ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : 
                    "bg-white/5 border-white/10 text-gray-700"
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isActive ? "animate-pulse" : ""}`} />
                </motion.div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? "text-cyan-400" : isDone ? "text-white" : "text-gray-700"}`}>
                  {agent.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Büyük Progress Bar */}
        <div className="w-full space-y-3 bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
          <Progress value={progress} className="h-5" />
          <div className="flex justify-between text-[11px] text-gray-500 font-mono tracking-widest uppercase font-bold px-1">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isFinished ? "bg-green-500" : "bg-cyan-500 animate-ping"}`} />
              {isFinished ? "STATUS: READY" : `LOGGING: ${currentAgent.toUpperCase()}_UNIT`}
            </span>
            <span className="text-cyan-400 tracking-tighter">{Math.floor(progress)}% OPTIMIZED</span>
          </div>
        </div>

        {/* Ana İçerik Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Middle: Vision Preview */}
          <div className="md:col-span-8 space-y-8">
            <div className="p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
               <VisionPreview />
            </div>
            
            {/* 1. UX Dokunuşu: Terminal Log (Technical lines) */}
            <div className="h-[250px]">
              <TerminalLog logs={logs} />
            </div>
          </div>

          {/* Right: Sidebar Stepper & Final Actions */}
          <div className="md:col-span-4 space-y-6">
            <AnalysisStepper steps={uiSteps as any} currentIndex={Math.floor(progress / 33.3)} />
            
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl relative overflow-hidden group"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    DASHBOARD'A GİT
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-white/10 transition-colors text-white uppercase tracking-widest">
                      <Download className="w-4 h-4" /> RAPOR
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-white/10 transition-colors text-white uppercase tracking-widest">
                      <Share2 className="w-4 h-4" /> PAYLAŞ
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isFinished && (
              <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <Settings className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sistem Konfigürasyonu</span>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-600">GPU Acceleration</span>
                      <span className="text-green-500 text-[8px]">ACTIVE</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-600">Model Precision</span>
                      <span className="text-cyan-500 text-[8px]">FLOAT16</span>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
