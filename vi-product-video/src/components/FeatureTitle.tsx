import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";

interface FeatureTitleProps {
  title: string; // Feature title (e.g., "Chat + SMS + Email")
  subtitle?: string; // Optional subtitle below title
  delay?: number; // Frames to delay after browser mockup starts entering
  titleDuration?: number; // Frames for title entrance animation
  staggerDelay?: number; // Frames between each word (default: 3)
}

/**
 * FeatureTitle - Large, bold feature title with WordStagger entrance
 *
 * Visual Design:
 * - Text: Inter ExtraBold (800), ~48-56px, #00436E
 * - NO feature numbers — just the name, bold and confident
 * - WordStagger entrance: each word slides up (translateY 15→0) with ~3 frame stagger
 * - Title fades in AFTER the browser mockup has started its entrance (stagger by ~5 frames)
 * - Subtitle below: Inter Medium (500), ~22px, #6B7280, simple fade-in after title lands
 *
 * Used in FeatureScene for prominent feature titles
 */
export const FeatureTitle: React.FC<FeatureTitleProps> = ({
  title,
  subtitle,
  delay = 5,
  titleDuration = 15,
  staggerDelay = 3,
}) => {
  const frame = useCurrentFrame();

  // Split title into words for staggered animation
  const words = title.split(" ");

  // Calculate word animations
  const wordElements = words.map((word, index) => {
    const wordStartFrame = delay + (index * staggerDelay);
    const wordEndFrame = wordStartFrame + titleDuration;
    const wordProgress = Math.min(Math.max((frame - wordStartFrame) / titleDuration, 0), 1);

    const easedProgress = interpolate(wordProgress, [0, 1], [0, 1], {
      easing: Easing.bezier(...easing.material),
      extrapolateRight: "clamp",
    });

    const opacity = easedProgress;
    const translateY = interpolate(easedProgress, [0, 1], [15, 0]);

    return (
      <span
        key={index}
        style={{
          display: "inline-block",
          opacity,
          transform: `translateY(${translateY}px)`,
          marginRight: index < words.length - 1 ? "0.25em" : "0",
          whiteSpace: "nowrap",
        }}
      >
        {word}
      </span>
    );
  });

  // Subtitle fades in after title completes
  const subtitleDelay = delay + (words.length * staggerDelay) + 8; // 8 frames after last word
  const subtitleDuration = 12;
  const subtitleProgress = Math.min(Math.max((frame - subtitleDelay) / subtitleDuration, 0), 1);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 24,
      }}
    >
      {/* Title - large, bold, confident */}
      <div
        style={{
          fontSize: theme.fontSizes.featureTitle,
          fontWeight: 800,
          color: theme.colors.accent,
          fontFamily: theme.fonts.heading,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {wordElements}
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: theme.fontSizes.featureSubtitle,
            fontWeight: 500,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            marginTop: 12,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
