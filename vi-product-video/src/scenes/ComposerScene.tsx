import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { theme, easing } from "../styles/theme";
import { Carousel } from "../components/Carousel";
import { BrowserMockup } from "../components/BrowserMockup";
import { AnimatedCursor } from "../components/AnimatedCursor";

interface ComposerSceneProps {
  screenshots: string[];
}

/**
 * ComposerScene - Finale scene with full-screen takeover
 * 3:01 - 3:18 (510 frames, 17s)
 *
 * Special treatment:
 * - fullScreen: true — fills entire viewport, no floating card, no dotted bg
 * - This is the ONE full-screen takeover (like Manus Scene 6) — creates dramatic contrast
 * - "Coming Soon" badge floats top-right
 * - Subtle teal glow (#8BBDC7) behind edges
 * - Carousel layout for screenshots
 * - Cursor animation interacting with composer input
 */
export const ComposerScene: React.FC<ComposerSceneProps> = ({ screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in for screenshots
  const opacity = interpolate(
    Math.min(frame, 20),
    [0, 20],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
  );

  // "Coming Soon" badge fade in (slightly delayed)
  const badgeOpacity = interpolate(
    Math.min(Math.max(frame - 10, 0), 15),
    [0, 15],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
  );

  // Feature name fade in (delayed more)
  const titleOpacity = interpolate(
    Math.min(Math.max(frame - 15, 0), 15),
    [0, 15],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Subtle teal glow behind edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${theme.colors.accentLight}20 0%, transparent 70%)`,
          opacity: 0.5,
        }}
      />

      {/* Full-screen carousel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
        }}
      >
        <Carousel
          items={screenshots.map((src) => ({ image: src }))}
          slideDuration={120} // ~4 seconds per slide (510 / 4 ≈ 127)
          transitionDuration={20}
          centerCardWidth={75} // Wider for full-screen effect
          sidePeekWidth={12}
        />
      </div>

      {/* "Coming Soon" badge - top right */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          padding: "12px 24px",
          backgroundColor: theme.colors.accent,
          color: theme.colors.card,
          fontSize: 18,
          fontWeight: 600,
          fontFamily: theme.fonts.body,
          borderRadius: theme.borderRadius.button,
          opacity: badgeOpacity,
        }}
      >
        Coming Soon
      </div>

      {/* Feature name at bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 60,
          fontSize: theme.fontSizes.sectionTitle,
          fontWeight: 700,
          color: theme.colors.text,
          fontFamily: theme.fonts.heading,
          opacity: titleOpacity,
        }}
      >
        Composer
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 60,
          fontSize: theme.fontSizes.featureSubtitle,
          fontWeight: 400,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
          opacity: titleOpacity,
        }}
      >
        Your AI Command Center
      </div>

      {/* Cursor animation - simulate typing in composer input */}
      <AnimatedCursor
        startPos={{ x: 50, y: 70 }} // Start from center
        endPos={{ x: 40, y: 60 }} // Move to composer input area
        startFrame={40}
        moveDuration={25}
        clickAtFrame={65}
      />
    </AbsoluteFill>
  );
};
