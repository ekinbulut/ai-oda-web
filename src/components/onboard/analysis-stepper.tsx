"use client";

import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";
import { motion } from "framer-motion";

type Step = {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
};

interface AnalysisStepperProps {
  steps: Step[];
  currentIndex: number;
}

export function AnalysisStepper({ steps, currentIndex }: AnalysisStepperProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Analiz Süreci</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex || step.status === 'completed';

          return (
            <div key={step.id} className="relative flex items-center gap-4 group">
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute left-4 top-10 w-[2px] h-6 -translate-x-1/2 transition-colors duration-500",
                    isCompleted ? "bg-cyan-500" : "bg-white/10"
                  )}
                />
              )}
              
              <div 
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500",
                  isCompleted ? "bg-cyan-500 border-cyan-500" : 
                  isActive ? "bg-cyan-500/20 border-cyan-500 animate-pulse" : 
                  "bg-black border-white/20"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-black" />
                ) : (
                  <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-cyan-400" : "bg-white/20")} />
                )}
              </div>

              <div className="flex flex-col">
                <span 
                  className={cn(
                    "text-sm font-semibold transition-colors duration-500",
                    isCompleted || isActive ? "text-white" : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter"
                  >
                    Devam Ediyor...
                  </motion.span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
