"use client";

import { useState } from "react";

import { UploadSection, UserData } from "@/components/UploadSection";
import { PreviewSection } from "@/components/PreviewSection";
import { MapPin } from "lucide-react";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <main className={`relative flex flex-col overflow-hidden bg-transparent h-[100dvh] w-full`}>

      <div className="z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full h-full">
        {!userData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 w-full h-full overflow-y-auto lg:overflow-hidden">
            
            {/* Left Column: Typography */}
            <div className="relative space-y-6 sm:space-y-8 text-center lg:text-left flex flex-col items-center justify-center lg:items-start lg:h-[100dvh] lg:overflow-hidden py-12 lg:py-0 px-6 lg:px-4">
              
              {/* HH GOA LOGO MOVED TO TOP LEFT */}
              <div className="lg:absolute lg:top-24 lg:left-4 flex items-center justify-center w-full lg:w-auto mt-16 lg:mt-0 mb-4 lg:mb-0">
                <span className="text-secondary font-sans text-5xl sm:text-6xl -rotate-12 italic drop-shadow-[0_0_15px_rgba(255,43,138,0.5)] whitespace-nowrap z-10">
                  HH गोवा
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-primary/80">
                  Hacker House Goa 2026
                </span>
                
                <h1 className="text-7xl sm:text-8xl lg:text-[100px] font-bold tracking-tighter leading-[0.85] text-primary flex flex-col">
                  HACKER
                  <div className="relative inline-block w-max">
                    HOUSE
                  </div>
                </h1>
              </div>

              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                  Builder ID
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Upload a photo, pick a frame, and share your HH Goa card. 
                  No signup — just build and go.
                </p>
              </div>

              {/* Location Pill */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/40 bg-black/40 backdrop-blur-md text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                GOA, INDIA · 28 – 31 OCT 2026
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex justify-center lg:justify-end lg:h-[100dvh] lg:overflow-y-auto lg:overflow-x-hidden pt-12 lg:pt-32 lg:pb-32 pb-12 px-6 lg:px-4 w-full custom-scrollbar">
              <UploadSection onUploadComplete={setUserData} />
            </div>

          </div>
        ) : (
          <div className="h-[100dvh] overflow-y-auto w-full custom-scrollbar pt-20 px-4 sm:px-6 pb-12">
            <PreviewSection userData={userData!} onReset={() => setUserData(null)} />
          </div>
        )}
      </div>


    </main>
  );
}
