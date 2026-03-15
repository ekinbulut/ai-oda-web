import { LoginButton } from "@/components/auth/login-button";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#030303] text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full -z-10" />
      
      <div className="flex flex-col items-center text-center space-y-8 max-w-2xl">
        <div className="p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl mb-4">
          <Sparkles className="w-12 h-12 text-cyan-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          O.D.A
        </h1>
        <p className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em] -mt-4">
          Optimization & Distribution Assistant
        </p>
        
        <p className="text-xl text-gray-400 font-medium">
          Instagram hesabınızı bağlayın, otonom ajanlarımız verilerinizi analiz etsin ve sizin için en iyi stratejiyi kurgulasın.
        </p>
        
        <div className="mt-12">
          <LoginButton />
        </div>
        
        <div className="grid grid-cols-3 gap-8 mt-24 opacity-50">
          <div className="text-sm font-mono tracking-tighter uppercase text-cyan-500">Vision AI Enabled</div>
          <div className="text-sm font-mono tracking-tighter uppercase text-purple-500">Neural Sync Active</div>
          <div className="text-sm font-mono tracking-tighter uppercase text-orange-500">Strategy Engine V2</div>
        </div>
      </div>
    </main>
  );
}
