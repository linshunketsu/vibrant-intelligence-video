import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";

/**
 * OutroScene - Closing sequence with logo, tagline, and CTA
 * 4:32 - 4:48 (480 frames)
 *
 * Slides up from below to replace StackedCardsScene
 *
 * Timeline:
 * - 0-30: Slide up from bottom (covering StackedCardsScene)
 * - 30-70: Logo icon fades in (150×150px)
 * - 70-110: "Vibrant Intelligence" text fades in
 * - 110-150: Tagline fades in
 * - 150-220: Hold
 * - 220-260: CTA fades in
 * - 260-480: Hold to end
 */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slide up animation from bottom (0-30 frames)
  const slideUpY = interpolate(frame, [0, 30], [1080, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Fade in content (starts at frame 30)
  const fadeInStart = 30;

  // Logo animation (30-70)
  const logoOpacity = interpolate(frame, [fadeInStart, fadeInStart + 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [fadeInStart, fadeInStart + 40], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Title text fade in (70-110)
  const titleOpacity = interpolate(frame, [fadeInStart + 40, fadeInStart + 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [fadeInStart + 40, fadeInStart + 80], [0.95, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Tagline fade in (110-150)
  const taglineOpacity = interpolate(frame, [fadeInStart + 80, fadeInStart + 100], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [fadeInStart + 80, fadeInStart + 120], [15, 0], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // CTA fade in (220-260)
  const ctaOpacity = interpolate(frame, [220, 240], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [220, 260], [0.92, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

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

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            marginTop: 48,
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: theme.colors.accentLight,
            fontSize: 24,
            fontWeight: 700,
            borderRadius: theme.borderRadius.button,
            fontFamily: theme.fonts.heading,
            letterSpacing: "0.02em",
            border: `2px solid ${theme.colors.accentLight}`,
            cursor: "pointer",
          }}
        >
          Join Our Beta
        </div>
      </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
