import React from "react";
import { motion } from "framer-motion";
import { FaceCropResult } from "@/lib/faceDetection";

interface ProfileFrameProps {
  cropResult: FaceCropResult;
}

export const ProfileFrame = React.forwardRef<HTMLDivElement, ProfileFrameProps>(
  ({ cropResult }, ref) => {
    const { x, y, width, height, originalImage } = cropResult;

    return (
      <div 
        className="relative w-full max-w-[512px] aspect-square mx-auto bg-[#050807] overflow-hidden flex flex-col font-sans text-white border border-[#FFD31A]/30 rounded-3xl sm:rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,214,180,0.05),inset_0_0_40px_rgba(0,0,0,0.6)]"
      >
        {/* CINEMATIC LAYERED BACKGROUND */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        >
          {/* Layer 2: Subtle radial emerald glow centered */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0E5A48_0%,transparent_60%)] opacity-80" />
          
          {/* Layer 3: Sea-green ambient behind portrait */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00D6B4] rounded-full blur-[100px] opacity-[0.1]" />

          {/* Micro details */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%2300D6B4' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
              backgroundSize: '100px 100px' 
            }} 
          />

          {/* Layer 4: Noise Texture */}
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />

          {/* Cinematic lighting */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050807]/80 via-transparent to-white/5 opacity-70" />

          {/* Layer 5: Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,8,7,0.95)_120%)]" />
        </motion.div>

        {/* TOP SECTION: Event Info */}
        <div className="relative z-10 flex justify-between items-start px-6 pt-6 sm:px-8 sm:pt-8">
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#FFF7EA]">HH GOA 2026</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#FF2E8A] mt-1">Boarding Pass</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#00D6B4]">Builder</span>
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">Goa, IND</span>
          </div>
        </div>

        {/* CENTER: Profile Photo */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-4">
          <div className="relative w-[55%] sm:w-[280px] aspect-square">
            {/* Orange Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#FF9D00] to-[#FF2E8A] opacity-30 blur-2xl rounded-3xl" />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#FFD31A]/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-[#050807]">
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

            {/* Verification Pill */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-[#050807] border border-[#00D6B4] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-xl z-20">
              <span className="font-mono text-[9px] sm:text-[11px] font-bold text-[#00D6B4] tracking-widest uppercase">Verified</span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Stub Perforation */}
        <div className="relative h-[22%] sm:h-[110px] w-full flex flex-col justify-end pb-6 px-6 sm:pb-8 sm:px-8 z-10">
          {/* Dashed Line */}
          <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-white/20" />
          
          {/* Transparent-simulated Die-cuts */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border border-l-0 border-[#FFD31A]/30 z-30" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-black border border-r-0 border-[#FFD31A]/30 z-30" />

          {/* Stub Content */}
          <div className="flex justify-between items-end pt-3 sm:pt-4">
            
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#FFD31A]">Terminal</span>
              <span className="font-mono text-lg sm:text-[22px] leading-none text-[#FFF7EA]">T-42</span>
            </div>

            {/* CSS Barcode */}
            <div className="flex items-end h-[24px] sm:h-[36px] gap-[1.5px] sm:gap-[2px] opacity-80">
              {[2, 4, 2, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2].map((w, i) => (
                <div key={i} className="bg-white" style={{ width: `${w}px`, height: i % 3 === 0 ? '100%' : '80%' }} />
              ))}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 text-right">
              <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#FFD31A]">Gate</span>
              <span className="font-mono text-lg sm:text-[22px] leading-none text-[#FFF7EA]">B-26</span>
            </div>

          </div>
        </div>

      </div>
    );
  }
);
ProfileFrame.displayName = "ProfileFrame";
