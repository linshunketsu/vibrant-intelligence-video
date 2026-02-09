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
 * 3:52 - 4:18 (780 frames, 26s)
 *
 * Special treatment:
 * - fullScreen: true — fills entire viewport, no floating card, no dotted bg
 * - This is the ONE full-screen takeover (like Manus Scene 6) — creates dramatic contrast
 * - "Coming Soon" badge floats top-right with subtle pulse animation
 * - Enhanced radial teal glow (#8BBDC7) at edges for intentional full-screen feel
 * - Carousel layout for screenshots with slower transitions (25 frames instead of 20)
 * - Cursor animation interacting with composer input
 */
export const ComposerScene: React.FC<ComposerSceneProps> = ({ screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in for screenshots
  const opacity = interpolate(
    Math.min(frame, 25),
    [0, 25],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
  );

  // "Coming Soon" badge fade in (slightly delayed)
  const badgeOpacity = interpolate(
    Math.min(Math.max(frame - 15, 0), 15),
    [0, 15],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
  );

  // Subtle pulse animation for "Coming Soon" badge
  // Very gentle: scale 1 → 1.02 → 1 on loop
  const pulseCycle = 90; // 3 seconds per pulse cycle
  const pulseProgress = (frame % pulseCycle) / pulseCycle;
  const pulseScale = interpolate(
    pulseProgress,
    [0, 0.5, 1],
    [1, 1.02, 1],
    { easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );

  // Feature name fade in (delayed more)
  const titleOpacity = interpolate(
    Math.min(Math.max(frame - 20, 0), 15),
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
      {/* Enhanced radial teal glow at edges - makes full-screen feel intentional */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          // Stronger radial gradient - teal at edges (~5% opacity), transparent in center
          background: `radial-gradient(ellipse at center, transparent 40%, ${theme.colors.accentLight}15 100%)`,
          opacity: 0.8,
        }}
      />

      {/* Full-screen carousel with slower transitions for dramatic pacing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
        }}
      >
        <Carousel
          items={screenshots.map((src) => ({ image: src }))}
          slideDuration={185} // ~6.2 seconds per slide (780 / 4 ≈ 195, minus transitions)
          transitionDuration={25} // Slower transitions for dramatic pacing (25 instead of 20)
          centerCardWidth={95} // Nearly full-width for composer finale
          sidePeekWidth={5}
        />
      </div>

      {/* "Coming Soon" badge - top right with pulse animation */}
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
          transform: `scale(${pulseScale})`,
          transformOrigin: "center",
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

      {/* Cursor animation - simulate typing in composer input (starts on second slide) */}
      <AnimatedCursor
        startPos={{ x: 50, y: 70 }} // Start from center
        endPos={{ x: 40, y: 60 }} // Move to composer input area
        startFrame={210} // Start after first slide (185 + 25 transition)
        moveDuration={25}
        clickAtFrame={235}
      />
    </AbsoluteFill>
  );
};
