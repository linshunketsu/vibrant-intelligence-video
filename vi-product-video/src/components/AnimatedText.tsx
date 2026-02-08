import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing } from "../styles/theme";

type AnimationType = "fadeIn" | "fadeScale" | "slideUp";

interface AnimatedTextProps {
  text: string | string[];
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  delay?: number;
  duration?: number;
  animationType?: AnimationType;
  fontFamily?: string;
  letterSpacing?: string | number;
  textAlign?: "left" | "center" | "right";
}

/**
 * AnimatedText - Text with smooth entrance animations
 * Uses Material Design easing (bezier(0.4, 0, 0.2, 1))
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 48,
  fontWeight = 500,
  color = "#1A1A1A",
  delay = 0,
  duration = 15,
  animationType = "fadeScale",
  fontFamily = "Inter, sans-serif",
  letterSpacing = 0,
  textAlign = "left",
}) => {
  const frame = useCurrentFrame();
  const lines = Array.isArray(text) ? text : [text];

  const getAnimatedStyle = (lineIndex: number) => {
    const lineDelay = delay + lineIndex * 6; // 6-frame stagger between lines
    const startFrame = lineDelay;
    const endFrame = startFrame + duration;
    const effectiveFrame = Math.min(Math.max(frame - startFrame, 0), duration);

    const progress = interpolate(effectiveFrame, [0, duration], [0, 1], {
      easing: Easing.bezier(...easing.material),
      extrapolateRight: "clamp",
    });

    const baseStyle = {
      opacity: progress,
      fontFamily,
      fontSize,
      fontWeight,
      color,
      letterSpacing,
      textAlign,
    };

    switch (animationType) {
      case "fadeScale":
        return {
          ...baseStyle,
          transform: `scale(${interpolate(progress, [0, 1], [0.95, 1])})`,
        };
      case "slideUp":
        return {
          ...baseStyle,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
        };
      case "fadeIn":
      default:
        return baseStyle;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: textAlign === "center" ? "center" : "flex-start",
      }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={getAnimatedStyle(index)}
        >
          {line}
        </div>
      ))}
    </div>
  );
};
