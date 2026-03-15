"use client";

import { Instagram, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function LoginButton() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const handleInstagramLogin = () => {
    setStatus('loading');
    // Go backend'deki OAuth başlangıç noktasına yönlendir
    window.location.href = "https://amada-ludicrous-overstoutly.ngrok-free.dev/auth/instagram/login";
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInstagramLogin}
      disabled={status === 'loading'}
      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {status === 'loading' ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <Instagram className="w-6 h-6" />
      )}
      
      <span className="text-lg">
        {status === 'loading' ? "Bağlanıyor..." : "Instagram ile Bağlan"}
      </span>

      {/* Security Indicator */}
      <div className="absolute -right-2 -top-2 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500 text-[8px] font-bold rounded-full">
          <Lock className="w-2 h-2" /> SSL
        </div>
      </div>
    </motion.button>
  );
}
