import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";
import { AnimatedCursor } from "../components/AnimatedCursor";

/**
 * OutroScene - Closing sequence with logo, tagline, and CTA
 * 4:28 - 4:32 (130 frames = 4.3s)
 *
 * Slides up from below to replace StackedCardsScene
 *
 * Timeline (faster):
 * - 0-15: Slide up from bottom (covering StackedCardsScene)
 * - 15-35: Logo icon fades in (150×150px)
 * - 25-50: "Vibrant Intelligence" text fades in
 * - 40-65: Tagline fades in
 * - 60-80: CTA fades in
 * - 80-88: Cursor moves in from left and clicks on CTA button (global frame 8120)
 * - 88-130: Hold to end
 */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slide up animation from bottom (0-15 frames) - faster
  const slideUpY = interpolate(frame, [0, 15], [1080, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Fade in content (starts earlier, at frame 15)
  const fadeInStart = 15;

  // Logo animation (15-35) - 20 frames
  const logoOpacity = interpolate(frame, [fadeInStart, fadeInStart + 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [fadeInStart, fadeInStart + 25], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Title text fade in (25-50) - starts before logo finishes, overlaps
  const titleOpacity = interpolate(frame, [fadeInStart + 10, fadeInStart + 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [fadeInStart + 10, fadeInStart + 40], [0.95, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Tagline fade in (40-65) - overlaps with title
  const taglineOpacity = interpolate(frame, [fadeInStart + 25, fadeInStart + 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [fadeInStart + 25, fadeInStart + 55], [15, 0], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // CTA fade in (60-80) - faster for the shorter outro
  const ctaOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [60, 80], [0.92, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // CTA button highlight pulse on click (frame 80-88)
  const clickFrame = 80;
  const ctaClickScale = interpolate(
    frame,
    [clickFrame - 5, clickFrame, clickFrame + 8],
    [1, 0.95, 1],
    { extrapolateRight: "clamp", easing: Easing.bezier(...easing.material) }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Container that slides up */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${slideUpY}px)`,
        }}
      >
        {/* Dotted background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${theme.colors.dotGrid} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              marginBottom: 40,
            }}
          >
            <img
              src={logoIcon}
              alt="Vibrant Intelligence"
              style={{
                width: 150,
                height: 150,
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              fontSize: 80,
              fontWeight: 800,
              color: theme.colors.accent,
              fontFamily: theme.fonts.heading,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Vibrant Intelligence
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
              fontSize: 28,
              fontWeight: 500,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Built for the way you actually work
          </div>

          {/* CTA - with click animation at frame 80 (global frame 8120) */}
          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${ctaScale * (frame >= clickFrame - 5 && frame <= clickFrame + 8 ? ctaClickScale : 1)})`,
              marginTop: 48,
              padding: "14px 32px",
              backgroundColor: frame >= clickFrame ? theme.colors.accent : "transparent",
              color: frame >= clickFrame ? theme.colors.card : theme.colors.accentLight,
              fontSize: 24,
              fontWeight: 700,
              borderRadius: theme.borderRadius.button,
              fontFamily: theme.fonts.heading,
              letterSpacing: "0.02em",
              border: `2px solid ${theme.colors.accentLight}`,
              cursor: "pointer",
              transition: "background-color 0.2s, color 0.2s",
            }}
          >
            Join Our Beta
          </div>
        </AbsoluteFill>
      </div>

      {/* Cursor animation - moves from bottom right to click CTA button at frame 80 (global frame 8120) */}
      <AnimatedCursor
        startPos={{ x: 75, y: 85 }} // Start from bottom right
        endPos={{ x: 50, y: 68 }} // End at center of CTA button
        startFrame={70} // Start moving at frame 70
        moveDuration={10} // Take 10 frames to reach the button
        clickAtFrame={80} // Click at frame 80 (global frame 8120)
        cursorSize={20}
      />
    </AbsoluteFill>
  );
};
