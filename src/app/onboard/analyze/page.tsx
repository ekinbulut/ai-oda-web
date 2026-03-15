"use client";

import { useAnalysisStatus } from "@/hooks/use-analysis-status";
import { AnalysisStepper } from "@/components/onboard/analysis-stepper";
import { TerminalLog } from "@/components/onboard/terminal-log";
import { VisionPreview } from "@/components/onboard/vision-preview";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, ArrowRight, Share2, Download } from "lucide-react";
import Link from "next/link";

export default function AnalyzePage() {
  const { steps, currentStepIndex, isFinished } = useAnalysisStatus();
  
  const allLogs = steps.reduce((acc, step) => [...acc, ...step.logs], [] as string[]);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Info & Stepper */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-widest"
            >
              <Cpu className="w-3 h-3" />
              {isFinished ? "Analiz Tamamlandı" : "Sistem Aktif (v4.2)"}
            </motion.div>
            
            <h1 className="text-4xl font-black leading-tight tracking-tighter">
              {isFinished ? (
                <>Stratejiniz <br /><span className="text-green-400">Hazır!</span></>
              ) : (
                <>Ajanlar <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Profilinizi Analiz Ediyor</span></>
              )}
            </h1>
            
            <p className="text-gray-400 font-medium leading-relaxed">
              {isFinished 
                ? "Profilinizdeki görsel ve etkileşim verileri optimize edildi. Aşağıdaki buton ile dağıtım asistanınızı aktif edebilirsiniz."
                : "Yapay zeka modellerimiz paylaşımlarınızı, etkileşimlerinizi ve görsel dilinizi çözümlüyor. Bu işlem birkaç dakika sürebilir."}
            </p>
          </div>

          <AnalysisStepper steps={steps} currentIndex={currentStepIndex} />
          
          <AnimatePresence>
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="space-y-4 pt-4"
              >
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-colors group"
                >
                  DASHBOARD'A GİT
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4" /> RAPOR İNDİR
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">
                    <Share2 className="w-4 h-4" /> PAYLAŞ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isFinished && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/10">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-sm uppercase tracking-widest text-cyan-400">Otonom İşlem</span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono leading-relaxed lowercase">
                [info] system is working in background. you don't need to keep this tab open, but we recommend watching the live feed.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Visuals & Logs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Panel: Vision Preview */}
          <motion.div 
            animate={!isFinished ? {
              x: [0, -1, 1, -1, 1, 0],
              y: [0, 1, -1, 1, -1, 0]
            } : {}}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: Math.random() * 5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <VisionPreview />
          </motion.div>

          {/* Bottom Panel: Terminal */}
          <div className="h-[350px]">
            <TerminalLog logs={allLogs} />
          </div>

          {/* Progress Indicator */}
          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            {!isFinished && (
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              />
            )}
            <div className="flex justify-between items-center px-1">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest shrink-0">Neural Strategy Sync</div>
              <div className="text-xs font-mono text-cyan-500">{isFinished ? "100%" : `${Math.min(99, Math.floor((currentStepIndex / steps.length) * 100))}%`}</div>
            </div>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: isFinished ? "100%" : `${((currentStepIndex + 0.5) / steps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
