import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../styles/theme";

/**
 * DottedBackground - Consistent warm off-white background with subtle dot grid
 * Wraps every scene for visual consistency
 */
export const DottedBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        backgroundImage: `radial-gradient(circle, ${theme.colors.dotGrid} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
