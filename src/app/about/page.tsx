"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <main className="relative min-h-screen flex flex-col p-6 sm:p-12 overflow-x-hidden bg-transparent pt-32 pb-24">
      <div className="z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full">
        
        {/* Top Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Builder ID</span>
          </Link>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-[#FF9D00] text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,210,26,0.3)] hover:shadow-[0_0_30px_rgba(255,210,26,0.5)] transition-all hover:-translate-y-0.5"
          >
            Generate Your Pass
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-4 text-center sm:text-left">
            <span className="text-sm font-mono tracking-[0.2em] uppercase text-primary/80">
              Hacker House Goa 2026
            </span>
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter leading-none text-white">
              About Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
              Built for Hacker House Goa.
            </p>
          </motion.div>

          {/* OUR TEAM */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative flex flex-col p-8 sm:p-12 rounded-[2rem] border border-primary/40 bg-black/60 backdrop-blur-md shadow-2xl">
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">STILL HERE</h2>
                <p className="text-muted-foreground">Builders behind the Builder ID experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile: Akanksha */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-primary hover:shadow-[0_10px_40px_-10px_rgba(0,201,167,0.3)]"
                >
                  <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide">Akanksha Kumari</h3>
                  <p className="text-primary font-mono text-sm mb-6">Full Stack Developer</p>
                  
                  <div className="flex items-center gap-3 text-muted-foreground text-sm mb-6 bg-black/40 w-fit px-4 py-2 rounded-lg border border-white/5">
                    <Mail className="w-4 h-4 text-accent" />
                    akanksha312kumari@gmail.com
                  </div>

                  <div className="mt-auto flex gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg></button>
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></button>
                  </div>
                </motion.div>

                {/* Profile: Tushar */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-primary hover:shadow-[0_10px_40px_-10px_rgba(0,201,167,0.3)]"
                >
                  <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-wide">Tushar Vaskar Sharma</h3>
                  <p className="text-primary font-mono text-sm mb-6">Full Stack Developer</p>
                  
                  <div className="flex items-center gap-3 text-muted-foreground text-sm mb-6 bg-black/40 w-fit px-4 py-2 rounded-lg border border-white/5">
                    <Mail className="w-4 h-4 text-accent" />
                    tusharvaskarsharma@gmail.com
                  </div>

                  <div className="mt-auto flex gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg></button>
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ABOUT PROJECT */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-accent/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative p-8 sm:p-12 rounded-[2rem] border border-accent/40 bg-black/60 backdrop-blur-md shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">What is Builder ID?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                Builder ID is a fun experience built for Hacker House Goa that lets builders generate a personalized event pass in seconds. Upload a photo, choose your builder identity, and create a beautifully designed pass that captures the spirit of Hacker House Goa.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
