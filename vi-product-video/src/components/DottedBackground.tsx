import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { theme } from "../styles/theme";

/**
 * DottedBackground - Consistent warm off-white background with subtle dot grid
 * Wraps every scene for visual consistency
 *
 * Includes a very subtle parallax drift animation - dots shift ~5-10 pixels
 * over the full video duration. Almost imperceptible, but gives the background life.
 */
export const DottedBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle drift animation - dots shift slowly over time
  // ~10 pixels shift over full video duration for parallax effect
  const driftX = interpolate(frame, [0, durationInFrames], [0, 10], {
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, durationInFrames], [0, -5], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        backgroundImage: `radial-gradient(circle, ${theme.colors.dotGrid} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: `${driftX}px ${driftY}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
