import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { BrowserMockup } from "../components/BrowserMockup";
import { easing, theme, timing } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";
import introDashboard from "../assets/screenshots/intro-dashboard.png";

/**
 * IntroScene - Opening sequence with logo, tagline, and dashboard flash
 * 0:00 - 0:15 (450 frames) - Shortened for snappier intro
 *
 * Timeline:
 * - 0-12: Background fades in (faster)
 * - 12-30: Logo icon fades in (120×120px, scale 0.9→1)
 * - 25-45: "Vibrant Intelligence" text fades in (overlaps logo)
 * - 40-60: Tagline slides up (overlaps title)
 * - 55-75: "13 Features" badge animates in (overlaps tagline)
 * - 75-120: Brief hold
 * - 120-180: Crossfade to dashboard screenshot (faster)
 * - 180-420: Dashboard stays visible while voiceover plays
 * - 420-450: Transition out
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background fade in (0-12, faster)
  const bgOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo animation (12-30)
  const logoOpacity = interpolate(frame, [12, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [12, 30], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Title text fade in (25-45, overlaps logo)
  const titleOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [25, 45], [0.95, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Tagline slide up (40-60, overlaps title)
  const taglineOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [40, 60], [20, 0], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Badge animation (55-75, overlaps tagline)
  const badgeOpacity = interpolate(frame, [55, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(frame, [55, 75], [0.85, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Dashboard crossfade (120-180) - branding fades out, dashboard fades in
  const brandingOpacity = interpolate(frame, [120, 180], [1, 0], {
    extrapolateRight: "clamp",
  });
  const dashboardOpacity = interpolate(frame, [120, 180], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dashboardScale = interpolate(frame, [120, 170], [0.92, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Transition out (420-450) - entire scene fades out for feature1
  const outroOpacity = interpolate(frame, [420, 450], [1, 0], {
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
