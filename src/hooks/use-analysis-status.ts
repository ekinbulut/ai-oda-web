"use client";

import { useState, useEffect } from 'react';

export type AnalysisStep = {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
  logs: string[];
};

const AGENT_TASKS = [
  [
    "Instagram API handshaking initiated...",
    "Access tokens validated. Scope: [profile, media]",
    "Fetching media metadata for last 30 days...",
    "User profile weight calculated: 0.84",
    "Session established on agent worker #4"
  ],
  [
    "Vision model (ViT-L/14) loading into memory...",
    "Scanning media ID: 192837465 - Detected: [Lifestyle, Tech]",
    "Object detection active - Consistency score: 94%",
    "Color palette extracted: #030303, #06b6d4, #a855f7",
    "Scene recognition completed for 12 nodes"
  ],
  [
    "Engagement rate cross-normalization started...",
    "Analyzing comment sentiment indices...",
    "Peak activity detected: Thursday 19:45 (Local Time)",
    "Audience retention graph generated",
    "Cross-referencing with global distribution nodes..."
  ],
  [
    "Aggregating insights for final decision model...",
    "Optimization parameters: MAXIMUM_REACH, HIGH_RETAIN",
    "Generating 7-day content distribution map...",
    "Strategy weighting applied (Factor: 1.4)",
    "O.D.A strategy model compiled successfully."
  ]
];

export function useAnalysisStatus() {
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: '1', label: 'Profil Erişimi', status: 'pending', logs: [] },
    { id: '2', label: 'Görsel Analizi (Vision AI)', status: 'pending', logs: [] },
    { id: '3', label: 'Etkileşim Verileri', status: 'pending', logs: [] },
    { id: '4', label: 'Strateji Oluşturma', status: 'pending', logs: [] },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      setSteps((prev) => {
        const newSteps = [...prev];
        const currentStep = newSteps[currentStepIndex];

        if (!currentStep) return prev;

        const stageLogs = AGENT_TASKS[currentStepIndex];

        if (currentStep.status === 'pending') {
          currentStep.status = 'loading';
          currentStep.logs.push(`> [SYSTEM] Initializing ${currentStep.label}...`);
        } else if (currentStep.status === 'loading') {
          const currentLogCount = currentStep.logs.length - 1; // subtract system init log
          
          if (currentLogCount < stageLogs.length) {
            currentStep.logs.push(`> [AGENT] ${stageLogs[currentLogCount]}`);
          } else {
            currentStep.status = 'completed';
            currentStep.logs.push(`> [SUCCESS] ${currentStep.label} analysis complete.`);
            
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex(currentStepIndex + 1);
            } else {
              setIsFinished(true);
            }
          }
        }

        return [...newSteps];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [currentStepIndex, steps.length, isFinished]);

  return { steps, currentStepIndex, isFinished };
}
