import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { BrowserMockup } from "../components/BrowserMockup";
import { easing, theme, timing } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";
import introDashboard from "../assets/screenshots/intro-dashboard.png";

/**
 * IntroScene - Opening sequence with logo, tagline, and dashboard flash
 * 0:00 - 0:15 (450 frames)
 *
 * Timeline:
 * - 0-15: Background fades in
 * - 15-40: Logo icon fades in (120×120px, scale 0.9→1)
 * - 40-70: "Vibrant Intelligence" text fades in
 * - 70-100: Tagline slides up
 * - 100-130: "13 Features" badge animates in
 * - 130-200: Hold
 * - 200-400: Crossfade to dashboard screenshot
 * - 400-450: Transition out
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background fade in (0-15)
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo animation (15-40)
  const logoOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [15, 40], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Title text fade in (40-70)
  const titleOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [40, 70], [0.95, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Tagline slide up (70-100)
  const taglineOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [70, 100], [20, 0], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Badge animation (100-130)
  const badgeOpacity = interpolate(frame, [100, 115], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(frame, [100, 130], [0.85, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Dashboard crossfade (200-400)
  const brandingOpacity = interpolate(frame, [200, 230], [1, 0], {
    extrapolateRight: "clamp",
  });
  const dashboardOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dashboardScale = interpolate(frame, [200, 250], [0.92, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Transition out (400-450)
  const outroOpacity = interpolate(frame, [400, 450], [1, 0], {
    extrapolateRight: "clamp",
  });

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

      <AbsoluteFill style={{ opacity: outroOpacity }}>
        {/* Branding content (fades out at 200) */}
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
            AI-Powered, Lab-Integrated EHR Platform
          </div>

          {/* Badge */}
          <div
            style={{
              opacity: badgeOpacity,
              transform: `scale(${badgeScale})`,
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

        {/* Dashboard preview (fades in at 200) */}
        <AbsoluteFill
          style={{
            opacity: dashboardOpacity,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "95%",
              height: "90%",
              transform: `scale(${dashboardScale})`,
            }}
          >
            <BrowserMockup url="app.vibrantintelligence.com" minimal={true}>
              <img
                src={introDashboard}
                alt="Vibrant Intelligence Dashboard"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </BrowserMockup>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
