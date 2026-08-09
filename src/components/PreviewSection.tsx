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
    let originalSrcs = new Map<HTMLImageElement, string>();
    let elementsCleaned: HTMLElement[] = [];

    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      console.group("Builder Pass Export");

      const node = activeTab === "frame" ? frameRef.current : cardRef.current;
      if (!node) {
        throw new Error(`Ticket element not found for tab: ${activeTab}. Ensure the component is mounted.`);
      }

      await document.fonts.ready;

      // STEP 1 - PRE-CONVERT ALL IMAGES TO BASE64 DATA URLS VIA FETCH + FILEREADER
      const images = Array.from(node.querySelectorAll("img"));
      for (const img of images) {
        if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }

        try {
          if (img.src && !img.src.startsWith("data:")) {
            originalSrcs.set(img, img.getAttribute("src") || img.src);
            
            // Fetch image as Blob and convert to Base64 Data URL to prevent canvas tainting and CORS issues
            const res = await fetch(img.src);
            const blob = await res.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            img.src = dataUrl;
          }
        } catch (e) {
          console.warn("Could not pre-convert image to data URL:", img.src, e);
        }
      }

      // STEP 2 - TEMPORARILY CLEAN UP EXPORT-INCOMPATIBLE CSS
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
          el.style.setProperty("backdrop-filter", "none", "important");
        }
      });

      await new Promise(r => setTimeout(r, 60));

      let dataUrl = "";

      // Prioritize html2canvas as it reliably draws DOM elements on mobile WebKit without foreignObject issues
      try {
        const rect = node.getBoundingClientRect();
        const canvas = await html2canvas(node, { 
          scale: 3, 
          backgroundColor: "#050807", 
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          width: rect.width,
          height: rect.height,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
        } as any);
        dataUrl = canvas.toDataURL("image/png");
      } catch (err) {
        console.warn("html2canvas failed, falling back to html-to-image...", err);
        dataUrl = await toPng(node, {
          pixelRatio: 3,
          cacheBust: false,
          backgroundColor: "#050807",
          skipAutoScale: false
        });
      }

      console.groupEnd();
      return dataUrl;
    } catch (error: any) {
      console.error(error);
      console.groupEnd();
      throw error;
    } finally {
      // Restore original image sources
      originalSrcs.forEach((origSrc, img) => {
        img.src = origSrc;
      });

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
        title: "Export Failed",
        description: error.message || String(error)
      });
    } finally {
      setIsDownloading(false);
    }
  }, [activeTab, generateImage]);

  const handleShare = async () => {
    const text = `Hacker House Goa 2026 🌴\nI’m ready for HH Goa 2026!\n\n#HHGoa #HackerHouseGoa #HHGOA2026 #Goa #Hackathon #Builders #FrameInGoa`;
    const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

    // 1 & 2: Immediately open X intent to bypass popup blockers
    window.open(xIntentUrl, "_blank", "noopener,noreferrer");

    setIsSharing(true);
    try {
      // 3: Generate image in background
      const dataUrl = await generateImage();
      const fileName = "HH-Goa-2026-Builder-Pass.png";

      let useNativeShare = false;
      let file: File | null = null;

      if (navigator.canShare) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        file = new File([blob], fileName, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          useNativeShare = true;
        }
      }

      // 4: Provide secondary share/download action
      if (useNativeShare && file) {
        try {
          await navigator.share({
            title: "Hacker House Goa 2026",
            files: [file]
          });
        } catch (shareErr: any) {
          if (shareErr.name !== "AbortError") {
            if (shareErr.name === "NotAllowedError") {
              console.warn("Native share blocked (likely user gesture expired). Falling back to download.");
            } else {
              console.warn("Native share failed:", shareErr);
            }
            // Fallback to download if share is blocked (e.g. user gesture expired)
            const link = document.createElement("a");
            link.download = fileName;
            link.href = dataUrl;
            link.click();

            toast({
              title: "Image Downloaded",
              description: "Your Builder Pass has been downloaded. Switch to the X tab and attach it to your post!"
            });
          }
        }
      } else {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();

        toast({
          title: "Image Downloaded",
          description: "Your Builder Pass has been downloaded. Switch to the X tab and attach it to your post!"
        });
      }
    } catch (error: any) {
      console.error("Image generation failed:", error);
      toast({
        title: "Export Failed",
        description: "Unable to automatically generate your Builder Pass image."
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
              className={`relative z-[20] flex-1 py-2 text-sm font-bold rounded-full outline-none transition-all duration-300 cursor-pointer pointer-events-auto ${isActive
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
              <div className="w-full sm:max-w-[1000px] flex justify-center px-4 sm:px-0 box-border overflow-x-hidden sm:overflow-visible">
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
