import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { BrowserMockup } from "../components/BrowserMockup";
import { easing, theme, timing } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";
import introDashboard from "../assets/screenshots/intro-dashboard.png";

/**
 * IntroScene - Opening sequence with logo, tagline, and dashboard flash
 * 0:00 - 0:15 (450 frames) - Logo animation starts at frame 435
 *
 * Timeline:
 * - 0-435: Just dotted background (dashboard is visible from other scene)
 * - 435-447: Logo icon fades in (120×120px, scale 0.9→1)
 * - 447-450: Brief logo show
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background fade in (0-12, faster)
  const bgOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo animation starts at frame 435
  const logoStartFrame = 435;
  const logoOpacity = interpolate(frame, [logoStartFrame, logoStartFrame + 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [logoStartFrame, logoStartFrame + 12], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Hide other branding elements - only logo shows
  const titleOpacity = 0;
  const taglineOpacity = 0;
  const badgeOpacity = 0;
  const brandingOpacity = logoOpacity;

  // No dashboard or outro in IntroScene
  const dashboardOpacity = 0;
  const outroOpacity = 1;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      {/* Dotted background */}
      <AbsoluteFill style={{ opacity: bgOpacity }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${theme.colors.dotGrid} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </AbsoluteFill>

      {/* Branding content - only logo, starts at frame 435 */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: brandingOpacity,
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              marginBottom: 32,
            }}
          >
            <img
              src={logoIcon}
              alt="Vibrant Intelligence"
              style={{
                width: 120,
                height: 120,
              }}
            />
          </div>

          {/* Title - hidden */}
          <div
            style={{
              opacity: titleOpacity,
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

          {/* Tagline - hidden */}
          <div
            style={{
              opacity: taglineOpacity,
              fontSize: 28,
              fontWeight: 500,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            AI-Powered, Lab-Integrated EHR Platform
          </div>

          {/* Badge - hidden */}
          <div
            style={{
              opacity: badgeOpacity,
              marginTop: 40,
              padding: "10px 24px",
              backgroundColor: theme.colors.accent,
              color: theme.colors.card,
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 9999,
              fontFamily: theme.fonts.body,
            }}
          >
            13 Features
          </div>
        </AbsoluteFill>
    </AbsoluteFill>
  );
};
