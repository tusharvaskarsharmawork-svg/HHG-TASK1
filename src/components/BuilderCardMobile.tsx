import React, { useEffect, useState } from "react";
import { UserData } from "@/components/UploadSection";
import { Fingerprint, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface BuilderCardProps {
  userData: UserData;
}

const PRESET_MOODS = [
  { id: "shipping", label: "SHIPPING", icon: "⚡" },
  { id: "grinding", label: "GRINDING", icon: "🔥" },
  { id: "building", label: "BUILDING", icon: "🚀" },
  { id: "locked-in", label: "LOCKED IN", icon: "🧠" },
  { id: "debugging", label: "DEBUGGING", icon: "☕" },
  { id: "chill", label: "CHILL", icon: "🌴" },
  { id: "flow", label: "FLOW STATE", icon: "🌊" },
  { id: "vibing", label: "VIBING", icon: "🎉" },
  { id: "sleep", label: "SLEEP DEPRIVED", icon: "😴" },
  { id: "ai", label: "AI MODE", icon: "🤖" },
];

export const BuilderCardMobile = React.forwardRef<HTMLDivElement, BuilderCardProps>(
  ({ userData }, ref) => {
    const { name, role, teamName, tags, mood, builderId, cropResult } = userData;
    const { x, y, width, height, originalImage } = cropResult;

    const moodData = PRESET_MOODS.find(m => m.id === mood);

    const issueDate = "08 Aug 2026";
    const serial = `HHG-2026-${builderId}`;

    const [origin, setOrigin] = useState("https://hhgoa.com");

    useEffect(() => {
      setOrigin(window.location.origin);
    }, []);

    return (
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex flex-col w-full max-w-[360px] box-border bg-[#050807] rounded-3xl overflow-hidden text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,214,180,0.05),inset_0_0_40px_rgba(0,0,0,0.6)] border border-[#FFD31A]/30 h-auto"
      >
        {/* TOP AND MIDDLE SECTIONS (WITH CUSTOM BACKGROUND) */}
        <div className="relative w-full flex flex-col flex-1">
          {/* Custom Background Image layer (Only spans top part) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/bg.png"
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover object-bottom opacity-45"
            />
            {/* Subtle overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Smooth fade into the bottom black section */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050807] via-[#050807]/80 to-transparent" />
          </div>

          {/* TOP SECTION: Identity */}
          <div className="relative p-5 pt-6 pb-2 flex flex-col items-center text-center z-10 w-full">
            {/* Profile Photo - SCALED DOWN to fit on screen better */}
            <div className="relative mb-3">
              <div className="relative w-[110px] h-[120px] rounded-3xl overflow-hidden border border-[#FFD31A]/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-[#050807]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cropResult.croppedImageUrl || originalImage.src}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </div>

            <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-[#00D6B4]/80 mb-1">Builder Pass</span>
            <h2 className="text-2xl sm:text-3xl tracking-tight text-[#FFF7EA] whitespace-normal break-words font-serif leading-[1.1] mb-0.5">{name}</h2>
            
            {teamName && (
              <div className="text-base text-[#FFD31A] font-medium mb-1 font-sans tracking-wide">
                {teamName}
              </div>
            )}

            <div className="text-xs text-white/50 font-mono tracking-wider mb-3">{role}</div>

            {moodData && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-[#FF2E8A]/40 rounded-lg mb-1">
                <span className="text-base opacity-80">{moodData.icon}</span>
                <span className="font-mono text-[10px] font-bold text-[#FF2E8A] uppercase tracking-[0.1em]">{moodData.label}</span>
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {tags.map(tag => (
                  <div key={tag} className="px-2.5 py-0.5 rounded-full border border-[#00D6B4]/30 bg-transparent">
                    <span className="text-[10px] font-mono text-[#00D6B4] font-medium tracking-wide">#{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: Reduced height to prevent scrolling */}
          <div className="relative flex flex-row items-end justify-between w-full z-10 px-4 pb-2 min-h-[120px]">
            {/* FrameInGoa Stamp - Scaled down slightly */}
            <div className="relative mb-2 z-[45] opacity-95 pointer-events-none flex items-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/frame-in-goa-stamp.png"
                alt="#FrameInGoa Stamp"
                className="h-[55px] max-w-[130px] object-contain drop-shadow-[0_4px_14px_rgba(255,211,26,0.3)] rotate-6"
              />
            </div>
          </div>
        </div>

        {/* HORIZONTAL PERFORATION */}
        <div className="relative flex items-center justify-center border-t border-dashed border-white/20 mx-6 z-20">
          <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#050807] border border-l-0 border-[#FFD31A]/40 z-30" />
          <div className="absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#050807] border border-r-0 border-[#FFD31A]/40 z-30" />
          
          <div className="absolute top-1/2 -translate-y-1/2 text-[#00D6B4] opacity-50 bg-[#050807] px-2 rounded-full">
            <Fingerprint className="w-5 h-5 rotate-90" />
          </div>
        </div>

        {/* BOTTOM SECTION: QR Code & Verification (Solid Dark Background) */}
        <div className="relative w-full p-4 pb-9 flex flex-row items-center justify-center gap-5 z-10 bg-[#050807]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-1.5 bg-[#FFF7EA] rounded-xl shadow-xl border border-[#FFD31A]/30 flex-shrink-0"
          >
            <QRCodeSVG
              value={`${origin}/pass/${builderId}`}
              className="w-[75px] h-[75px]"
              bgColor="#FFF7EA"
              fgColor="#050807"
              level="Q"
              includeMargin={false}
            />
          </motion.div>

          <div className="flex flex-col items-start justify-center flex-1">
            <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 mb-1.5">Scan to Verify</span>
            <span className="font-mono text-base text-[#00D6B4] font-bold tracking-wider truncate w-full">{serial}</span>
            <div className="flex items-center gap-1.5 mt-1 px-2.5 py-0.5 bg-[#00D6B4]/10 rounded-full border border-[#00D6B4]/30 w-fit">
              <CheckCircle2 className="w-3 h-3 text-[#00D6B4]" />
              <span className="text-[8px] font-mono tracking-widest text-[#00D6B4] uppercase">Admitted</span>
            </div>
            <span className="text-[8px] font-mono text-white/50 tracking-widest mt-2">
              15.2993° N  •  74.1240° E
            </span>
          </div>
          
          {/* Hacker House Goa Logo in bottom right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 5 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-10 right-4 pointer-events-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hh-goa-circle-logo.png"
              alt="Hacker House Goa Logo"
              className="w-16 h-16 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        {/* YELLOW FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 h-auto py-1.5 bg-[#FFD31A] text-black font-bold flex items-center justify-center z-40 px-3">
          <span className="font-mono text-[8px] tracking-widest uppercase text-center w-full">
            GOA • INDIA • OCT '26 • BUILD • SHIP • REPEAT
          </span>
        </div>
      </motion.div>
    );
  }
);
BuilderCardMobile.displayName = "BuilderCardMobile";
