"use client";

import { useRef, useState, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import { Download, RefreshCw } from "lucide-react";

// Mock toast to avoid breaking if a standard UI toast is not installed
const toast = ({ title, description }: { title: string; description: string }) => {
  alert(`${title}\n${description}`);
};

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
  const [isSharing, setIsSharing] = useState(false);

  const generateImage = useCallback(async (): Promise<string> => {
    let originalStyles = new Map<HTMLElement, string | null>();
    let elementsCleaned: HTMLElement[] = [];
    
    // STEP 8 - EXPORT ONLY AFTER RENDER
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      console.group("Builder Pass Export");
      
      // STEP 9 - DEBUGGING
      console.log("activeTab:", activeTab);
      console.log("frameRef.current:", frameRef.current);
      console.log("cardRef.current:", cardRef.current);

      const node = activeTab === "frame" ? frameRef.current : cardRef.current;
      if (!node) {
        console.error("Target ref is null! The component might be unmounted.");
        console.groupEnd();
        throw new Error(`Ticket element not found for tab: ${activeTab}. Ensure the component is mounted.`);
      }

      console.log("ticketRef.current:", node);
      const rect = node.getBoundingClientRect();
      console.log("image dimensions:", `${rect.width}x${rect.height}`);
      console.log("loaded fonts status:", document.fonts.status);
      console.log("QR generation status: rendered inline as SVG");

      await document.fonts.ready;

      // STEP 1 - FIND THE FAILING IMAGE & WAIT
      console.log("--- Verifying Images ---");
      const images = Array.from(node.querySelectorAll("img"));
      for (const img of images) {
        console.log({
          src: img.src.substring(0, 50) + "...",
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          crossOrigin: img.crossOrigin
        });
        if (!img.complete) {
          console.log("Waiting for image to load...");
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = () => {
              console.error("Image failed to load:", img.src.substring(0, 50));
              resolve(null);
            };
          });
        }
      }

      // STEP 2 - REMOVE EXPORT-INCOMPATIBLE CSS
      const elementsToClean = Array.from(node.querySelectorAll<HTMLElement>("*"));
      elementsToClean.push(node);

      elementsToClean.forEach(el => {
        const computed = window.getComputedStyle(el);
        const hasBadCSS = 
          computed.filter !== 'none' ||
          computed.mixBlendMode !== 'normal' ||
          computed.backdropFilter !== 'none' ||
          computed.maskImage !== 'none' ||
          computed.clipPath !== 'none';

        if (hasBadCSS) {
           originalStyles.set(el, el.getAttribute("style"));
           elementsCleaned.push(el);
           el.style.setProperty("filter", "none", "important");
           el.style.setProperty("mix-blend-mode", "normal", "important");
           el.style.setProperty("backdrop-filter", "none", "important");
           el.style.setProperty("mask-image", "none", "important");
           el.style.setProperty("-webkit-mask-image", "none", "important");
           el.style.setProperty("clip-path", "none", "important");
        }
      });

      // Wait a tick for styles to apply
      await new Promise(r => setTimeout(r, 50));

      let dataUrl = "";
      const options = {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#050807",
        skipAutoScale: false
      };

      try {
        dataUrl = await toPng(node, options);
      } catch (err) {
        console.warn("html-to-image failed, falling back to html2canvas...", err);
        const canvas = await html2canvas(node, { scale: 4, backgroundColor: "#050807", useCORS: true } as any);
        dataUrl = canvas.toDataURL("image/png");
      }

      console.groupEnd();
      return dataUrl;
    } catch (error: any) {
      console.error(error);
      console.trace();
      console.log(activeTab === "frame" ? frameRef.current : cardRef.current);
      console.groupEnd();
      throw error;
    } finally {
      // Restore CSS
      elementsCleaned.forEach(el => {
        const orig = originalStyles.get(el);
        if (orig === null || orig === undefined) {
          el.removeAttribute("style");
        } else {
          el.setAttribute("style", orig);
        }
      });
    }
  }, [activeTab]);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await generateImage();
      const link = document.createElement("a");
      link.download = `HH_Goa_2026_${activeTab === "frame" ? "Frame" : "BuilderCard"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error: any) {
      toast({
        title:"Export Failed",
        description: error.message || String(error)
      });
    } finally {
      setIsDownloading(false);
    }
  }, [activeTab, generateImage]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const dataUrl = await generateImage();
      const fileName = `HH_Goa_2026_${activeTab === "frame" ? "Frame" : "BuilderCard"}.png`;

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: 'image/png' });

      const text = `I'm officially joining Hacker House Goa 2026 🚀\n\nHere's my Builder Pass.\n\n#FrameInGoa #HHGoa2026`;

      const shareData = {
        title: 'HH Goa Builder Pass',
        text: text,
        files: [file]
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Desktop Fallback
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();

        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");

        toast({
          title: "Image Downloaded",
          description: "Your Builder Pass has been downloaded. Attach the downloaded image to your X post before publishing."
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Share Failed",
        description: "Unable to generate your Builder Pass. Please try again."
      });
    } finally {
      setIsSharing(false);
    }
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
      className="w-full flex flex-col items-center gap-2 sm:gap-3 pb-4"
    >
      {/* PREMIUM SEGMENTED CONTROL */}
      <div 
        role="tablist" 
        aria-label="Preview selection"
        onKeyDown={handleKeyDown}
        className="relative flex items-center p-1.5 mt-2 mb-1 sm:mt-0 rounded-full bg-[#050807]/80 border border-[#FFD31A]/30 backdrop-blur-xl shadow-2xl z-[50] w-full sm:w-[fit-content] sm:min-w-[380px]"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                console.log(tab.id);
                setActiveTab(tab.id);
              }}
              className={`relative z-[20] flex-1 py-2 text-sm font-bold rounded-full outline-none transition-all duration-300 cursor-pointer pointer-events-auto ${
                isActive 
                  ? "text-black drop-shadow-sm" 
                  : "text-white/70 hover:text-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#FFD31A]/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#FFD31A] rounded-full shadow-[0_0_20px_rgba(0,214,180,0.2)] z-[10] pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-[20] pointer-events-none">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA WITH SMOOTH OVERLAPPING TRANSITIONS */}
      <div className="grid w-full place-items-center mb-2 sm:mb-3">
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
              <div className="w-[calc(100vw-32px)] sm:w-full sm:max-w-[1000px] flex justify-center px-0 sm:px-0 box-border overflow-x-hidden sm:overflow-visible">
                 <BuilderCard ref={cardRef} userData={userData} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-6 sm:px-0 z-10">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-[#FF9D00] text-black font-bold hover:-translate-y-0.5 transition-all hover:shadow-[0_0_20px_rgba(255,210,26,0.4)] disabled:opacity-50"
        >
          {isDownloading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          Download High-Res
        </button>

        <button
          onClick={handleShare}
          disabled={isSharing}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 rounded-full bg-[#000000] border border-white/20 text-white font-medium hover:bg-black/80 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
        >
          {isSharing ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          )}
          {isSharing ? "Preparing..." : "Share on X"}
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </motion.div>
  );
}
