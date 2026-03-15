"use client";

import { useState, useEffect } from 'react';

export type AnalysisStatus = {
  progress: number;
  currentAgent: string;
  message: string;
  logs: string[];
  isFinished: boolean;
};

const AGENTS = [
  { name: "Stratejist", icon: "database", initialMsg: "Instagram veritabanı senkronizasyonu başlatıldı..." },
  { name: "Küratör", icon: "image", initialMsg: "Görsel varlıklar ayrıştırılıyor ve kategorize ediliyor..." },
  { name: "Eleştirmen", icon: "feather", initialMsg: "Marka dili ve estetik bütünlük analizi yapılıyor..." }
];

const LOG_CHUNKS = [
  [
    "[FETCH] Accessing Meta Graph API v18.0...",
    "[AUTH] Token validation: SUCCESS",
    "[DATA] Last 50 media items indexed",
    "[ANALYSIS] Follower growth delta: +4.2%",
    "[SYSTEM] Stratejist data retrieval complete."
  ],
  [
    "[VISION] Image #104 detected: 'Minimalist Interior'",
    "[VISION] Image #103 detected: 'Tech Workspace'",
    "[KÜRATÖR] Dominant color palette: #121212 | #06b6d4",
    "[VISION] Scene consistency: 98.4%",
    "[SYSTEM] Küratör visual classification complete."
  ],
  [
    "[TONE] Brand personality identified: 'Professional & Innovator'",
    "[LANGUAGE] Caption sentiment: Positive (89%)",
    "[CRITIC] Brand-voice alignment score: 7.4/10",
    "[OPTIMIZATION] Content gap identified: Tuesday 18:00",
    "[SUCCESS] Final strategy model finalized by Eleştirmen."
  ]
];

export function useAnalysisStatus() {
  const [status, setStatus] = useState<AnalysisStatus>({
    progress: 0,
    currentAgent: AGENTS[0].name,
    message: AGENTS[0].initialMsg,
    logs: [`> [SYSTEM] O.D.A Ana bilgisayarına bağlanıldı.`],
    isFinished: false
  });

  useEffect(() => {
    let currentAgentIdx = 0;
    let logIdx = 0;
    
    const interval = setInterval(() => {
      setStatus(prev => {
        if (prev.isFinished) {
          clearInterval(interval);
          return prev;
        }

        const newLogs = [...prev.logs];
        // Slower at the end to build anticipation
        let increment = prev.progress < 80 ? 1.5 : 0.8;
        let nextProgress = Math.min(100, prev.progress + increment);
        let nextAgent = prev.currentAgent;
        let nextMessage = prev.message;
        let nextFinished = false;

        // Log ekleme mantığı
        if (logIdx < LOG_CHUNKS[currentAgentIdx].length && Math.random() > 0.3) {
          newLogs.push(`> ${LOG_CHUNKS[currentAgentIdx][logIdx]}`);
          logIdx++;
        }

        // Ajan değiştirme (3 ajan var, her biri ~33% progress)
        const threshold = (currentAgentIdx + 1) * 33.3;
        if (nextProgress >= threshold && currentAgentIdx < AGENTS.length - 1) {
          currentAgentIdx++;
          logIdx = 0;
          nextAgent = AGENTS[currentAgentIdx].name;
          nextMessage = AGENTS[currentAgentIdx].initialMsg;
          newLogs.push(`> [SYSTEM] Transitioning to: ${nextAgent}...`);
        }

        if (nextProgress >= 100) {
          nextFinished = true;
          newLogs.push(`> [SYSTEM] O.D.A Ready. Launching dashboard.`);
        }

        return {
          ...prev,
          progress: nextProgress,
          currentAgent: nextAgent,
          message: nextMessage,
          logs: newLogs,
          isFinished: nextFinished
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return status;
}
