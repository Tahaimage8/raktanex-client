"use client";

import Logo from "@/components/shared/Logo";
import { motion } from "framer-motion";


const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-red-50">
      {/* Logo with Pulse */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        <Logo />
      </motion.div>

      {/* Double Ring Spinner */}
      <div className="relative mt-8">
        <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-red-200 border-t-red-600"></div>
        <div 
          className="absolute inset-1.5 animate-spin rounded-full border-[3px] border-red-100 border-b-red-500"
          style={{ animationDirection: 'reverse', animationDuration: '0.7s' }}
        ></div>
      </div>

      {/* Text */}
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-slate-400"
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;