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
 * - Enhanced radial teal glow (#8BBDC7) at edges for intentional full-screen feel
 * - Carousel layout for screenshots with slower transitions (25 frames instead of 20)
 * - Cursor animation interacting with composer input
 */
export const ComposerScene: React.FC<ComposerSceneProps> = ({ screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Cinematic zoom for first slide (frames 0-185) - zoom to far right
  const firstSlideEnd = 185;
  const zoomStartFrame = 30; // Start zoom after content fades in
  const zoomDuration = 40; // Zoom in over 40 frames
  const zoomHoldDuration = 80; // Hold at max zoom
  const zoomEndFrame = zoomStartFrame + zoomDuration + zoomHoldDuration;

  // Calculate zoom progress for first slide
  let zoomScale = 1;
  let zoomOffsetX = 0;
  let zoomOffsetY = 0;

  if (frame < firstSlideEnd) {
    if (frame >= zoomStartFrame && frame < zoomStartFrame + zoomDuration) {
      // Zooming in
      const zoomProgress = (frame - zoomStartFrame) / zoomDuration;
      const easedProgress = interpolate(zoomProgress, [0, 1], [0, 1], {
        easing: Easing.bezier(...easing.material),
      });
      zoomScale = interpolate(easedProgress, [0, 1], [1, 2.2]);

      // Shift toward far right (x: 90, y: 50)
      const targetX = 90;
      const targetY = 50;
      zoomOffsetX = interpolate(easedProgress, [0, 1], [0, (50 - targetX) * (zoomScale - 1) / zoomScale]);
      zoomOffsetY = interpolate(easedProgress, [0, 1], [0, (50 - targetY) * (zoomScale - 1) / zoomScale]);
    } else if (frame >= zoomStartFrame + zoomDuration && frame < zoomEndFrame) {
      // Holding at max zoom
      zoomScale = 2.2;
      const targetX = 90;
      const targetY = 50;
      zoomOffsetX = (50 - targetX) * (zoomScale - 1) / zoomScale;
      zoomOffsetY = (50 - targetY) * (zoomScale - 1) / zoomScale;
    } else if (frame >= zoomEndFrame) {
      // Zooming out before slide transition
      const zoomOutDuration = firstSlideEnd - zoomEndFrame;
      const zoomOutProgress = Math.min((frame - zoomEndFrame) / zoomOutDuration, 1);
      const easedOutProgress = interpolate(zoomOutProgress, [0, 1], [0, 1], {
        easing: Easing.bezier(...easing.material),
      });

      const startScale = 2.2;
      const startOffsetX = (50 - 90) * (startScale - 1) / startScale;
      const startOffsetY = (50 - 50) * (startScale - 1) / startScale;

      zoomScale = interpolate(easedOutProgress, [0, 1], [startScale, 1]);
      zoomOffsetX = interpolate(easedOutProgress, [0, 1], [startOffsetX, 0]);
      zoomOffsetY = interpolate(easedOutProgress, [0, 1], [startOffsetY, 0]);
    }
  }

  // Fade in for screenshots
  const opacity = interpolate(
    Math.min(frame, 25),
    [0, 25],
    [0, 1],
    { easing: Easing.bezier(...easing.material) }
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
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${zoomScale}) translate(${zoomOffsetX}%, ${zoomOffsetY}%)`,
            transformOrigin: "center",
            transition: "none",
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
    </AbsoluteFill>
  );
};
