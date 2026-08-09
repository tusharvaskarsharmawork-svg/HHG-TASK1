import React from "react";
import { UserData } from "@/components/UploadSection";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BuilderCardDesktop } from "./BuilderCardDesktop";
import { BuilderCardMobile } from "./BuilderCardMobile";

interface BuilderCardProps {
  userData: UserData;
}

export const BuilderCard = React.forwardRef<HTMLDivElement, BuilderCardProps>(
  ({ userData }, ref) => {
    const isMobile = useIsMobile();

    // To prevent hydration mismatch or errors during SSR, we conditionally render
    // Since this component might be rendered on server initially where isMobile might default to false,
    // this could cause a flicker. But since useIsMobile delays to useEffect, the initial render
    // might be false, then swap to true. 
    // Given the simplicity, we'll just return the correct component.

    if (isMobile) {
      return <BuilderCardMobile ref={ref} userData={userData} />;
    }

    return <BuilderCardDesktop ref={ref} userData={userData} />;
  }
);
BuilderCard.displayName = "BuilderCard";
