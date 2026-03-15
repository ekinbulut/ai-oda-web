"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Sparkles, Info, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#030303] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full -z-10" />
      
      <div className="flex flex-col items-center text-center space-y-8 max-w-2xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl mb-4"
        >
          <Sparkles className="w-12 h-12 text-cyan-400" />
        </motion.div>
        
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter"
          >
            O.D.A
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-bold text-cyan-400 uppercase tracking-[0.4em]"
          >
            Optimization & Distribution Assistant
          </motion.p>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 font-medium max-w-lg"
        >
          Instagram hesabınızı bağlayın, otonom ajanlarımız verilerinizi analiz etsin ve sizin için en iyi stratejiyi kurgulasın.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex flex-col items-center space-y-8"
        >
          <div className="mt-8">
            <LoginButton />
          </div>

          {/* Business Account Education Phase */}
          <div className="w-full p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] backdrop-blur-md relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start gap-4 text-left relative z-10">
              <div className="p-2 bg-cyan-500/10 rounded-xl">
                <Info className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">Önemli: Profesyonel Hesap Gerekli</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Instagram Graph API gereği, sadece <span className="text-white font-medium">İşletme (Business)</span> veya <span className="text-white font-medium">İçerik Üreticisi (Creator)</span> hesapları desteklenmektedir. Hesabınızın bir Facebook Sayfasına bağlı olduğundan emin olun.
                </p>
                <a 
                  href="https://help.instagram.com/502981923235522" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                >
                  Profesyonel Hesaba Nasıl Geçilir?
                  <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-12"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-mono tracking-tighter uppercase text-cyan-500">Vision AI Enabled</div>
            <div className="h-[1px] w-8 bg-cyan-500/30" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-mono tracking-tighter uppercase text-purple-500">Neural Sync Active</div>
            <div className="h-[1px] w-8 bg-purple-500/30" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-mono tracking-tighter uppercase text-orange-500">Strategy Engine V2</div>
            <div className="h-[1px] w-8 bg-orange-500/30" />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
