import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";

interface FloatingCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  delay?: number;
  duration?: number;
  padding?: number;
}

/**
 * FloatingCard - White rounded card with subtle drop shadow
 * Entrance animation: scale 0.95→1 + fade in over ~15 frames
 */
export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  width = "auto",
  height = "auto",
  delay = 0,
  duration = 15,
  padding = 32,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    Math.min(Math.max(frame - delay, 0), duration),
    [0, duration],
    [0, 1],
    {
      easing: Easing.bezier(...easing.material),
      extrapolateRight: "clamp",
    }
  );

  const scale = interpolate(progress, [0, 1], [0.95, 1]);
  const opacity = progress;

  return (
    <div
      style={{
        width,
        height,
        padding,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.card,
        boxShadow: `0 4px 24px ${theme.colors.cardShadow}`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  );
};
