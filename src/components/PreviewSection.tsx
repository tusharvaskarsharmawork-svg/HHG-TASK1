"use client";

import { useRef, useState, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, RefreshCw } from "lucide-react";

import { UserData } from "./UploadSection";
import { ProfileFrame } from "./ProfileFrame";
import { BuilderCard } from "./BuilderCard";

interface PreviewSectionProps {
  userData: UserData;
  onReset: () => void;
}

const TABS = [
  { id: "frame", label: "Profile Frame" },
  { id: "card", label: "Builder Pass" }
] as const;

type TabId = typeof TABS[number]["id"];

export function PreviewSection({ userData, onReset }: PreviewSectionProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<TabId>("frame");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const node = activeTab === "frame" ? frameRef.current : cardRef.current;
      if (!node) return;

      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 4,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `HH_Goa_2026_${activeTab === "frame" ? "Frame" : "BuilderCard"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Error generating the image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [activeTab]);

  const handleShare = () => {
    const text = encodeURIComponent(
      `I'm officially joining Hacker House Goa 2026 🚀\n\nHere's my Builder Card.\n\n#FrameInGoa`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab("card");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab("frame");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center gap-8 pb-12"
    >
      {/* PREMIUM SEGMENTED CONTROL */}
      <div 
        role="tablist" 
        aria-label="Preview selection"
        onKeyDown={handleKeyDown}
        className="relative flex items-center p-1.5 mt-8 mb-2 sm:mt-0 rounded-full bg-[#050807]/80 border border-[#FFD31A]/30 backdrop-blur-xl shadow-2xl z-50 w-full sm:w-[fit-content] sm:min-w-[380px]"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 py-3 text-sm font-bold rounded-full outline-none transition-all duration-300 ${
                isActive 
                  ? "text-black drop-shadow-sm" 
                  : "text-white/70 hover:text-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#FFD31A]/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#FFD31A] rounded-full shadow-[0_0_20px_rgba(0,214,180,0.2)]"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA WITH SMOOTH OVERLAPPING TRANSITIONS */}
      <div className="grid w-full place-items-center mb-8">
        <AnimatePresence mode="popLayout">
          {activeTab === "frame" && (
            <motion.div
              key="frame"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="col-start-1 row-start-1 w-full flex justify-center"
            >
              {/* Native responsive container */}
              <div className="w-full max-w-[380px] sm:max-w-[512px] flex justify-center">
                 <ProfileFrame ref={frameRef} cropResult={userData.cropResult} />
              </div>
            </motion.div>
          )}

          {activeTab === "card" && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="col-start-1 row-start-1 w-full flex justify-center"
            >
              {/* The BuilderCard is natively responsive, so we let it flow naturally */}
              <div className="w-full max-w-[380px] sm:max-w-[1000px] flex justify-center px-4 sm:px-0">
                 <BuilderCard ref={cardRef} userData={userData} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-6 sm:px-0 z-10">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-4 sm:py-3 rounded-full bg-gradient-to-r from-primary to-[#FF9D00] text-black font-bold hover:-translate-y-0.5 transition-all hover:shadow-[0_0_20px_rgba(255,210,26,0.4)] disabled:opacity-50"
        >
          {isDownloading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          Download High-Res
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-4 sm:py-3 rounded-full bg-[#000000] border border-white/20 text-white font-medium hover:bg-black/80 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          Share on X
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-4 sm:py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </motion.div>
  );
}
