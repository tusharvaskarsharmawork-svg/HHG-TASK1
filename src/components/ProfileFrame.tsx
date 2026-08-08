import React from "react";
import { FaceCropResult } from "@/lib/faceDetection";

interface ProfileFrameProps {
  cropResult: FaceCropResult;
}

export const ProfileFrame = React.forwardRef<HTMLDivElement, ProfileFrameProps>(
  ({ cropResult }, ref) => {
    const { x, y, width, height, originalImage } = cropResult;

    return (
      <div 
        ref={ref}
        className="relative w-full max-w-[512px] aspect-square mx-auto bg-[#06291F] overflow-hidden flex flex-col font-sans text-white border border-[#FFD31A]/30 rounded-3xl sm:rounded-[32px] shadow-2xl"
      >
        {/* Paper Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

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
