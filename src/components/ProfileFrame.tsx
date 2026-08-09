import React from "react";
import { FaceCropResult } from "@/lib/faceDetection";

interface ProfileFrameProps {
  cropResult: FaceCropResult;
}

export const ProfileFrame = React.forwardRef<HTMLDivElement, ProfileFrameProps>(
  ({ cropResult }, ref) => {
    const { x, y, width, height, originalImage } = cropResult;

    // Enforce a square view window based on the face size
    const faceSize = Math.max(width, height);

    // Zoom factor: 2.2 zooms out perfectly to show the full head and shoulders.
    let viewSize = faceSize * 2.2;

    // Prevent zooming out past the image's actual boundaries
    const maxViewSize = Math.min(originalImage.width, originalImage.height);
    if (viewSize > maxViewSize) {
      viewSize = maxViewSize;
    }

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    let viewX = centerX - viewSize / 2;
    let viewY = centerY - viewSize / 2;

    // Clamp coordinates so we never see empty background gaps
    if (viewX < 0) viewX = 0;
    if (viewX + viewSize > originalImage.width) viewX = originalImage.width - viewSize;

    if (viewY < 0) viewY = 0;
    if (viewY + viewSize > originalImage.height) viewY = originalImage.height - viewSize;

    return (
      <div 
        ref={ref}
        className="relative w-full max-w-[512px] aspect-square mx-auto bg-[#091812] overflow-hidden flex flex-col font-sans text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
      >
        {/* TEMPLATE LAYER (Base) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/frame-template.jpg" 
            alt="Frame Template" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* PHOTO LAYER */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative w-[55%] aspect-square translate-y-[5%] rounded-full overflow-hidden">
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
          </div>
        </div>
      </div>
    );
  }
);
ProfileFrame.displayName = "ProfileFrame";
