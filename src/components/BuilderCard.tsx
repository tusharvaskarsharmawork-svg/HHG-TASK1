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

export const BuilderCard = React.forwardRef<HTMLDivElement, BuilderCardProps>(
  ({ userData }, ref) => {
    const { name, role, teamName, tags, mood, builderId, cropResult } = userData;
    const { x, y, width, height, originalImage } = cropResult;

    const moodData = PRESET_MOODS.find(m => m.id === mood);

    // Random issue date close to current date
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
        whileHover={{ y: -8, rotate: 0.5 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex flex-col sm:flex-row w-full max-w-[960px] bg-[#050807] rounded-3xl sm:rounded-[36px] overflow-hidden text-white group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,214,180,0.05),inset_0_0_40px_rgba(0,0,0,0.6)] border border-[#FFD31A]/30 hover:shadow-[0_25px_80px_-15px_rgba(0,214,180,0.2),inset_0_0_40px_rgba(0,0,0,0.6)] hover:border-[#FFD31A]/50 max-h-[70vh]"
      >
        {/* CINEMATIC LAYERED BACKGROUND */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        >
          {/* Layer 2: Large radial emerald gradient (right bias) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[150%] bg-[radial-gradient(ellipse_at_70%_50%,#0B3E36_0%,transparent_60%)] opacity-90" />

          {/* Layer 3: Soft sea-green glow behind QR & Title */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#00D6B4] rounded-full blur-[100px] opacity-[0.1]" />

          {/* Soft warm orange ambient glow behind the profile image (left bias) */}
          <div className="absolute left-10 top-10 w-64 h-64 bg-[#FF9D00] rounded-full blur-[120px] opacity-[0.06]" />

          {/* Micro details: Topographic/organic subtle SVG pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%2300D6B4' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Layer 4: Noise Texture (Subtle paper grain) */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* Cinematic Lighting: Top-right brighter, Bottom-left darker */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050807]/80 via-transparent to-white/5 opacity-70" />

          {/* Layer 5: Dark Vignette around the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,8,7,0.95)_120%)]" />
        </motion.div>

        {/* LEFT SIDE (Main Identity) */}
        <div className="relative flex-1 min-w-0 p-4 sm:p-5 sm:pr-4 flex flex-col z-10 pb-8 sm:pb-10 overflow-y-auto sm:overflow-visible custom-scrollbar">

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              {/* Vibrant Orange Glow Behind Photo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FF9D00] to-[#FF2E8A] opacity-30 blur-2xl rounded-2xl" />

              <div className="relative w-28 h-32 sm:w-[130px] sm:h-[140px] rounded-3xl overflow-hidden border border-[#FFD31A]/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-[#050807]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalImage.src}
                  alt="Profile"
                  className="absolute max-w-none filter contrast-[1.1] saturate-[1.1]"
                  style={{
                    width: `${(originalImage.width / width) * 100}%`,
                    height: `${(originalImage.height / height) * 100}%`,
                    left: `-${(x / width) * 100}%`,
                    top: `-${(y / height) * 100}%`,
                  }}
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </div>

            {/* Builder Details */}
            <div className="flex flex-col flex-1 min-w-0 w-full pt-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] text-[#00D6B4]/80 mb-0.5 sm:mb-1">Builder</span>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-[#FFF7EA] font-serif mb-0.5 sm:mb-1 leading-[1.1] break-words whitespace-normal">{name}</h2>

              {teamName && (
                <div className="text-lg sm:text-xl text-[#FFD31A] font-medium truncate mb-0.5 sm:mb-1 font-sans tracking-wide">
                  {teamName}
                </div>
              )}

              <div className="text-xs sm:text-sm text-white/50 font-mono tracking-wider truncate mb-2 sm:mb-3">{role}</div>

              {/* Mood Badge */}
              {moodData && (
                <div className="flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-transparent border border-[#FF2E8A]/40 rounded-xl w-fit">
                  <span className="text-base sm:text-lg opacity-80">{moodData.icon}</span>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF2E8A] uppercase tracking-[0.15em]">{moodData.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
              {tags.map(tag => (
                <div key={tag} className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#00D6B4]/30 bg-transparent">
                  <span className="text-[10px] sm:text-xs font-mono text-[#00D6B4] font-medium tracking-wide">#{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Micro Metadata & Graphics */}
          <div className="mt-auto pt-4 sm:pt-5 flex items-end gap-3 sm:gap-5 z-10">
            {/* Coordinates */}
            <div className="flex flex-col gap-1 sm:gap-1.5 z-10 flex-shrink-0">
              <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-[0.2em] text-white/40 mb-0.5 sm:mb-1">Coordinates</span>
              <div className="flex items-center gap-6">
                <span className="text-[10px] sm:text-xs font-mono text-white/70 tracking-widest">15.2993° N  •  74.1240° E</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest mt-1">
                Issued {issueDate}  •  No. {Math.random().toString(16).slice(2, 9).toUpperCase()}
              </span>
            </div>

            {/* #FrameInGoa Stamp Tag (Right of Coordinates & Left Bottom of Palm Tree) */}
            <div className="flex-shrink-0 flex items-center select-none pointer-events-none z-[25] pb-0.5 opacity-65 transition-opacity duration-300 hover:opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/frame-in-goa-stamp.png"
                alt="#FrameInGoa Stamp"
                className="w-auto h-11 sm:h-14 md:h-16 lg:h-20 max-w-[150px] sm:max-w-[190px] md:max-w-[220px] object-contain drop-shadow-[0_4px_14px_rgba(255,211,26,0.3)] -rotate-3"
              />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN (Desktop Graphics) */}
        <div className="hidden sm:flex relative w-[130px] md:w-[150px] lg:w-[160px] flex-shrink-0 flex-col items-end justify-between z-20 pointer-events-none select-none pt-2 pb-[18px]">
          {/* Hacker House Goa Circular Logo Badge */}
          <div className="w-full flex justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hh-goa-circle-logo.png"
              alt="Hacker House Goa Circular Logo"
              className="w-auto h-14 md:h-[72px] lg:h-[86px] max-w-[120px] md:max-w-[150px] object-contain drop-shadow-[0_0_20px_rgba(0,214,180,0.6)] drop-shadow-[0_0_10px_rgba(255,211,26,0.4)] opacity-95 transition-transform duration-300 hover:scale-105 translate-x-2 -translate-y-2"
            />
          </div>

          {/* Palm Tree & Laptop */}
          <div className="w-full flex justify-end items-end h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/palm-laptop-clean.png"
              alt="Palm tree and laptop illustration"
              className="h-auto w-auto max-h-[170px] md:max-h-[230px] lg:max-h-[270px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] opacity-95 transition-transform duration-300 hover:scale-105 origin-bottom translate-x-3 translate-y-3"
            />
          </div>
        </div>

        {/* MOBILE ABSOLUTE GRAPHICS (Visible only on small screens) */}
        <div className="sm:hidden absolute right-4 top-3 z-[25] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hh-goa-circle-logo.png"
            alt="Hacker House Goa Circular Logo"
            className="w-auto h-12 max-w-[100px] object-contain drop-shadow-[0_0_20px_rgba(0,214,180,0.6)] opacity-95"
          />
        </div>
        <div className="sm:hidden absolute right-2 bottom-[26px] z-[15] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/palm-laptop-clean.png"
            alt="Palm tree and laptop illustration"
            className="h-auto w-auto max-h-[165px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] opacity-95 origin-bottom"
          />
        </div>

        {/* CENTER PERFORATION & DIE CUTS */}
        <div className="relative flex items-center justify-center border-t sm:border-t-0 sm:border-l border-dashed border-white/20 mx-6 sm:mx-0 sm:my-4 z-20">
          <div className="absolute -left-3 sm:left-1/2 -top-3 sm:-top-8 sm:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black border sm:border-t-0 sm:border-r-0 border-[#FFD31A]/40 z-30" />
          <div className="absolute -right-3 sm:left-1/2 -bottom-3 sm:-bottom-8 sm:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black border sm:border-b-0 sm:border-l-0 border-[#FFD31A]/40 z-30" />

          <div className="absolute top-4 sm:top-2 -translate-y-1/2 text-[#00D6B4] opacity-50 sm:-translate-x-1/2 sm:left-1/2 bg-transparent p-1">
            <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 rotate-90 sm:rotate-0" />
          </div>
        </div>

        {/* RIGHT SIDE (QR & Verification) */}
        <div className="relative w-full sm:w-[260px] p-4 sm:p-5 pb-10 sm:pb-12 flex flex-col items-center text-center z-10 bg-transparent">

          {/* Event Branding */}
          <div className="flex flex-col items-center mb-3">
            <span className="font-serif text-2xl sm:text-3xl text-[#FFF7EA] tracking-wide mb-1">HH GOA 2026</span>
            <span className="text-[9px] sm:text-[10px] text-[#FFD31A] uppercase tracking-[0.3em] font-mono">Builder Pass</span>
          </div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-2.5 sm:p-3 bg-[#FFF7EA] rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 mb-3 sm:mb-4 border border-[#FFD31A]/30"
          >
            <QRCodeSVG
              value={`${origin}/pass/${builderId}`}
              size={110}
              bgColor="#FFF7EA"
              fgColor="#050807"
              level="Q"
              includeMargin={false}
            />
          </motion.div>

          <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-white/40 mb-3 sm:mb-4">Scan to Verify Builder</span>

          {/* Builder ID & Status */}
          <div className="w-full flex flex-col items-center gap-1 sm:gap-1.5 mt-auto">
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-white/30">Builder ID</span>
            <span className="font-mono text-lg sm:text-xl text-[#00D6B4] font-bold tracking-wider">{serial}</span>
            <div className="flex items-center gap-2 mt-0.5 sm:mt-1 px-3 py-1 sm:px-4 sm:py-1.5 bg-[#00D6B4]/10 rounded-full border border-[#00D6B4]/30">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00D6B4]" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00D6B4] uppercase">Access Granted</span>
            </div>
          </div>

          {/* Vintage Stamp Overlay (Top Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 0.4, scale: 1, rotate: 15 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none mix-blend-screen select-none"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-[#FF2E8A] p-1">
              <div className="w-full h-full rounded-full border border-[#FF2E8A] flex flex-col items-center justify-center text-[#FF2E8A]">
                <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] uppercase mb-0.5 sm:mb-1">GOA</span>
                <span className="text-lg sm:text-xl font-bold uppercase leading-none mb-0.5 sm:mb-1">2026</span>
                <span className="text-[6px] sm:text-[7px] font-bold tracking-[0.2em] uppercase">Admitted</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* YELLOW FOOTER STRIP */}
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-7 bg-[#FFD31A] text-black font-bold flex items-center justify-center z-40 px-4 shadow-[0_-5px_20px_rgba(255,211,26,0.2)]">
          <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.4em] uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            GOA • INDIA • 28–31 OCT 2026 • BUILD • SHIP • REPEAT
          </span>

        </div>

      </motion.div>
    );
  }
);
BuilderCard.displayName = "BuilderCard";
