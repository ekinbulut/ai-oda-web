"use client";

import { useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalLogProps {
  logs: string[];
}

export function TerminalLog({ logs }: TerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <TerminalIcon className="w-4 h-4 text-cyan-500" />
        <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-widest">Ajan Terminali</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2 custom-scrollbar"
      >
        {logs.length === 0 && (
          <div className="text-gray-600 animate-pulse">Inizializing core modules...</div>
        )}
        {logs.map((log, i) => (
          <div 
            key={i} 
            className="flex gap-3 leading-relaxed"
          >
            <span className="text-gray-600 shrink-0">[{new Date().toLocaleTimeString('tr-TR', { hour12: false })}]</span>
            <span className={log.includes('[SUCCESS]') ? "text-green-400" : log.includes('[SYSTEM]') ? "text-cyan-400" : "text-gray-300"}>
              {log}
            </span>
          </div>
        ))}
        <div className="w-2 h-4 bg-cyan-500/50 animate-pulse inline-block" />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
