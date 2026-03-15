"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

export function LoginButton() {
  const handleLogin = () => {
    // Instagram OAuth URL starts here
    console.log("Instagram Login Initiated");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Instagram className="w-6 h-6 animate-pulse" />
      <span className="text-lg">Instagram ile Bağlan</span>
    </motion.button>
  );
}
