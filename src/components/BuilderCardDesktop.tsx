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

export const BuilderCardDesktop = React.forwardRef<HTMLDivElement, BuilderCardProps>(
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
        className="relative flex flex-row w-full max-w-[960px] box-border bg-[#050807] rounded-[36px] overflow-hidden overflow-x-hidden text-white group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,214,180,0.05),inset_0_0_40px_rgba(0,0,0,0.6)] border border-[#FFD31A]/30 hover:shadow-[0_25px_80px_-15px_rgba(0,214,180,0.2),inset_0_0_40px_rgba(0,0,0,0.6)] hover:border-[#FFD31A]/50 aspect-[23/9]"
      >
        {/* CINEMATIC LAYERED BACKGROUND */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        >
          {/* Custom Desktop Background Image with 40% opacity (aligned to bottom to show beach/van doodles) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/desktop-bg.jpg"
            alt="Desktop Background"
            className="absolute inset-0 w-full h-full object-cover object-bottom opacity-40"
          />

          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Layer 2: Large radial emerald gradient (right bias) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[150%] bg-[radial-gradient(ellipse_at_70%_50%,#0B3E36_0%,transparent_60%)] opacity-60" />

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
        <div className="relative flex-1 p-4 sm:p-5 pr-6 flex flex-col z-10 pb-10 overflow-hidden">

          <div className="flex flex-row gap-4 items-start">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              <div className="relative w-[130px] h-[140px] rounded-3xl overflow-hidden border border-[#FFD31A]/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-[#050807]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cropResult.croppedImageUrl || originalImage.src}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>

            </div>

            {/* Builder Details */}
            <div className="flex flex-col flex-1 min-w-0 w-full pt-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00D6B4]/80 mb-1">Builder</span>

              <h2 className="text-3xl lg:text-[38px] tracking-tight text-[#FFF7EA] whitespace-normal break-words font-serif mb-0.5 leading-[1.1]">{name}</h2>

              {teamName && (
                <div className="text-lg text-[#FFD31A] font-medium whitespace-normal break-words mb-0.5 font-sans tracking-wide">
                  {teamName}
                </div>
              )}

              <div className="text-sm text-white/50 font-mono tracking-wider mb-3">{role}</div>

              {/* Mood Badge */}
              {moodData && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#FF2E8A]/40 rounded-xl w-fit">
                  <span className="text-lg opacity-80">{moodData.icon}</span>
                  <span className="font-mono text-xs font-bold text-[#FF2E8A] uppercase tracking-[0.15em]">{moodData.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {tags.map(tag => (
                <div key={tag} className="px-2.5 py-0.5 rounded-full border border-[#00D6B4]/30 bg-transparent">
                  <span className="text-[11px] font-mono text-[#00D6B4] font-medium tracking-wide">#{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Micro Metadata & Graphics */}
          <div className="mt-auto pt-2 mb-5 flex flex-row items-end justify-between gap-5 z-10 w-full">
            <div className="flex items-end justify-between w-auto gap-5">
              {/* Coordinates */}
              <div className="flex flex-col gap-1 z-10 flex-shrink-0">
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#00D6B4] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">Coordinates</span>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-white font-medium tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">15.2993° N  •  74.1240° E</span>
                </div>
                <span className="text-[10px] font-mono text-white/80 tracking-widest mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Issued {issueDate}  •  No. {serial}
                </span>
              </div>

              {/* #FrameInGoa Stamp Tag */}
              <div className="static flex items-center select-none pointer-events-none z-[45] pb-0.5 opacity-85 transition-opacity duration-300 hover:opacity-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/frame-in-goa-stamp.png"
                  alt="#FrameInGoa Stamp"
                  className="w-auto h-14 md:h-16 lg:h-18 max-w-[190px] md:max-w-[220px] object-contain drop-shadow-[0_4px_14px_rgba(255,211,26,0.3)] -rotate-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hacker House Goa Circular Logo Badge (Upper Right above Palm Tree on Desktop) */}
        <div className="flex absolute right-[260px] md:right-[275px] lg:right-[290px] top-3.5 z-[50] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hh-goa-circle-logo.png"
            alt="Hacker House Goa Circular Logo"
            className="w-auto h-11 md:h-13 lg:h-15 max-w-[95px] md:max-w-[115px] object-contain drop-shadow-[0_0_20px_rgba(0,214,180,0.6)] drop-shadow-[0_0_10px_rgba(255,211,26,0.4)] opacity-95 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Middle Space Illustration (Goa Beach Artwork) - Desktop Only */}
        <div className="flex absolute right-[225px] md:right-[240px] lg:right-[250px] bottom-[26px] md:bottom-[32px] z-[15] pointer-events-none select-none items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/goa-beach-art.png"
            alt="Goa Beach Illustration"
            className="h-auto w-auto max-h-[235px] md:max-h-[260px] lg:max-h-[285px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] mix-blend-screen opacity-80 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* CENTER PERFORATION & DIE CUTS */}
        <div className="relative flex items-center justify-center border-l border-dashed border-white/20 mx-0 my-4 z-20">
          <div className="absolute left-1/2 -top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-t-0 border-r-0 border-[#FFD31A]/40 z-30" />
          <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-b-0 border-l-0 border-[#FFD31A]/40 z-30" />

          <div className="absolute top-2 text-[#00D6B4] opacity-50 -translate-x-1/2 left-1/2 bg-transparent p-1">
            <Fingerprint className="w-6 h-6 rotate-0" />
          </div>
        </div>

        {/* RIGHT SIDE (QR & Verification) */}
        <div className="relative w-[240px] p-4 pb-5 flex flex-col items-center text-center z-10 bg-transparent">

          {/* Event Branding */}
          <div className="flex flex-col items-center mb-2">
            <span className="font-serif text-2xl text-[#FFF7EA] tracking-wide mb-0.5">HH GOA 2026</span>
            <span className="text-[9px] text-[#FFD31A] uppercase tracking-[0.3em] font-mono">Builder Pass</span>
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-0">
            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-2 bg-[#FFF7EA] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 mb-2 border border-[#FFD31A]/30 flex items-center justify-center flex-shrink-0"
            >
              <QRCodeSVG
                value={`${origin}/pass/${builderId}`}
                className="w-[95px] h-[95px]"
                bgColor="#FFF7EA"
                fgColor="#050807"
                level="Q"
                includeMargin={false}
              />
            </motion.div>

            {/* Verification Content */}
            <div className="flex flex-col items-center text-center justify-center flex-1 min-w-0">
              <span className="text-[9px] uppercase font-mono tracking-widest text-white/40 mb-4 leading-relaxed">
                Scan to Verify<span className="inline"> </span>Builder
              </span>

              {/* Builder ID & Status */}
              <div className="w-full flex flex-col items-center gap-1.5 mt-auto">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/30">Builder ID</span>
                <span className="font-mono text-xl text-[#00D6B4] font-bold tracking-wider w-auto">{serial}</span>
                <div className="flex items-center gap-2 mt-1 px-4 py-1.5 bg-[#00D6B4]/10 rounded-full border border-[#00D6B4]/30 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6B4] flex-shrink-0" />
                  <span className="text-[10px] font-mono tracking-widest text-[#00D6B4] uppercase whitespace-nowrap">Access Granted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vintage Stamp Overlay (Top Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 0.4, scale: 1, rotate: 15 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute top-6 right-6 pointer-events-none mix-blend-screen select-none"
          >
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF2E8A] p-1">
              <div className="w-full h-full rounded-full border border-[#FF2E8A] flex flex-col items-center justify-center text-[#FF2E8A]">
                <span className="text-[8px] font-bold tracking-[0.2em] uppercase mb-1">GOA</span>
                <span className="text-xl font-bold uppercase leading-none mb-1">2026</span>
                <span className="text-[7px] font-bold tracking-[0.2em] uppercase">Admitted</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* YELLOW FOOTER STRIP */}
        <div className="absolute mt-0 bottom-0 left-0 right-0 h-7 py-0 bg-[#FFD31A] text-black font-bold flex flex-row items-center justify-center z-40 px-4 shadow-[0_-5px_20px_rgba(255,211,26,0.2)]">
          <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-center whitespace-nowrap overflow-hidden text-ellipsis leading-tight w-full">
            GOA • INDIA • 28–31 OCT 2026 • BUILD • SHIP • REPEAT
          </span>
        </div>

      </motion.div>
    );
  }
);
BuilderCardDesktop.displayName = "BuilderCardDesktop";
