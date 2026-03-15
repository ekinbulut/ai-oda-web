"use client";

import { motion } from "framer-motion";
import { Eye, Scan, Target, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function VisionPreview() {
  const [activeData, setActiveData] = useState({ id: 0, confidence: 94 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveData({
        id: Math.floor(Math.random() * 100000),
        confidence: 85 + Math.floor(Math.random() * 15)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const images = [
    { id: 1, label: "Nesne Tespiti", color: "text-cyan-400" },
    { id: 2, label: "Duygu Analizi", color: "text-purple-400" },
    { id: 3, label: "Kompozisyon", color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Vision AI Live Feed</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <Activity className="w-3 h-3 animate-pulse" />
            CPU: 42%
          </div>
          <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 font-mono animate-pulse">
            REC ●
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={img.id} className="relative group overflow-hidden rounded-xl bg-black border border-white/10 aspect-square flex items-center justify-center">
            {/* Simulated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <Scan className="w-12 h-12 text-white/5" />

            {/* AI Overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-1 z-30">
              <div className="px-1.5 py-0.5 bg-black/80 border border-white/10 rounded text-[8px] font-mono text-white">
                OBJ_{activeData.id}
              </div>
              <div className={`px-1.5 py-0.5 bg-black/80 border border-white/10 rounded text-[8px] font-mono ${img.color}`}>
                CONF: {activeData.confidence}%
              </div>
            </div>

            <Target className={`absolute bottom-4 right-4 w-4 h-4 ${img.color} opacity-40`} />

            {/* Scan Line Animation */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: idx * 1.2 }}
              className="absolute left-0 right-0 h-[10%] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent z-20"
            >
              <div className="h-[1px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]" />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md border-t border-white/10 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-white uppercase">{img.label}</span>
                <span className="text-[10px] font-mono text-gray-500">v2.0.4</span>
              </div>
              <div className="flex gap-1 h-1">
                <motion.div 
                  animate={{ width: ["10%", "90%", "40%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`h-full bg-cyan-500 rounded-full`} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
