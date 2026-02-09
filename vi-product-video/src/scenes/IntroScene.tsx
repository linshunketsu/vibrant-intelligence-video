import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { BrowserMockup } from "../components/BrowserMockup";
import { ChaosTextThrow } from "../components/ChaosTextThrow";
import { easing, theme, timing } from "../styles/theme";
import logoIcon from "../assets/logo-icon.svg";
import introDashboard from "../assets/screenshots/intro-dashboard.png";

/**
 * IntroScene - Opening sequence with logo, tagline, chaos text, and dashboard
 * 0:00 - 0:21 (630 frames) - Extended for voiceover completion
 *
 * Timeline:
 * - 0-10:   Background fades in
 * - 5-25:   Logo icon fades in (120×120px, scale 0.9→1)
 * - 20-45:  "Vibrant Intelligence" text fades in
 * - 40-65:  Tagline slides up
 * - 60-85:  "13 Features" badge animates in
 * - 85-110: Brief hold
 * - 110-130: FADE OUT branding elements
 * - 110-450: CHAOS TEXT THROW (extended - "patient care", "scheduling", etc.)
 * - 450-480: Crossfade OUT chaos text, IN dashboard
 * - 480-610: Dashboard visible (voiceover continues)
 * - 610-630: Transition out
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background fade in (0-10)
  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo animation (5-25)
  const logoOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [5, 25], [0.9, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Title text fade in (20-45)
  const titleOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [20, 45], [0.95, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Tagline slide up (40-65)
  const taglineOpacity = interpolate(frame, [40, 52], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [40, 65], [20, 0], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Badge animation (60-85)
  const badgeOpacity = interpolate(frame, [60, 72], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgeScale = interpolate(frame, [60, 85], [0.85, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Branding fade out (110-130) - earlier to make room for chaos text
  const brandingOpacity = interpolate(frame, [110, 130], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Dashboard crossfade (480-510) - starts at 480 to match voiceover
  const dashboardOpacity = interpolate(frame, [480, 510], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dashboardScale = interpolate(frame, [480, 515], [0.92, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Transition out (610-630)
  const outroOpacity = interpolate(frame, [610, 630], [1, 0], {
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
        {/* Chaos text throw (140-480) - extended duration for practice management tasks */}
        <ChaosTextThrow startFrame={140} duration={340} />

        {/* Branding content (fades out at 130) */}
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

        {/* Dashboard preview (fades in at 480) */}
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
