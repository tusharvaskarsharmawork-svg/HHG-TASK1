"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PassVerificationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="relative min-h-screen flex flex-col p-6 sm:p-12 overflow-x-hidden bg-transparent pt-32 pb-24 items-center justify-center">
      <div className="z-10 flex flex-col items-center max-w-lg mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full p-12 rounded-[2rem] border border-[#00D6B4]/40 bg-[#06291F]/80 backdrop-blur-md shadow-[0_0_50px_rgba(0,214,180,0.15)] flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#00D6B4]/20 border border-[#00D6B4] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,214,180,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-[#00D6B4]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 font-serif">
            Access Granted
          </h1>
          
          <div className="flex flex-col items-center gap-1 mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-[#00D6B4]">Builder Verified</span>
            <span className="font-mono text-lg text-white font-bold">ID: {resolvedParams.id}</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-10">
            This Builder Pass is valid for entry to Hacker House Goa 2026.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-[#FF9D00] text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,210,26,0.3)] hover:shadow-[0_0_30px_rgba(255,210,26,0.5)] transition-all hover:-translate-y-0.5"
          >
            Create Your Own Pass
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
