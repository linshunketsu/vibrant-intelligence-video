import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, timing, theme } from "../styles/theme";

interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  scale?: number;
  shadowOnEntrance?: boolean; // Animate shadow on entrance
  entranceDuration?: number; // Frames for entrance animation
  minimal?: boolean; // Use minimal chrome (just top bar, no buttons)
  fullscreen?: boolean; // No chrome at all - just the content
}

/**
 * BrowserMockup - Clean browser chrome frame for displaying screenshots
 *
 * Design:
 * - White card with rounded corners (~12-16px)
 * - Subtle drop shadow that grows on entrance
 * - Chrome-style top bar with dots (window controls)
 * - Screenshot displayed inside at proper scale
 *
 * Props:
 * - minimal: Uses just a slim top bar instead of full chrome
 * - fullscreen: No chrome at all - screenshot fills entire container
 *
 * Entrance Animation (when shadowOnEntrance=true):
 * - Shadow spread: 0→full over entranceDuration frames
 * - Creates a "lifting" effect as the card appears
 */
export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url = "vibrantintelligence.com",
  children,
  scale = 1,
  shadowOnEntrance = true,
  entranceDuration = 10,
  minimal = false,
  fullscreen = false,
}) => {
  const frame = useCurrentFrame();

  // Calculate entrance progress for shadow animation
  const shadowProgress = shadowOnEntrance
    ? Math.min(frame / entranceDuration, 1)
    : 1;

  const easedProgress = interpolate(shadowProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(...easing.material),
    extrapolateRight: "clamp",
  });

  // Animate shadow spread (0 → full value)
  const shadowSpread = interpolate(easedProgress, [0, 1], [0, 1]);
  const shadowOpacity = interpolate(easedProgress, [0, 1], [0, 0.15]);

  const baseShadow = `0 20px 60px rgba(0, 0, 0, ${shadowOpacity})`;
  const additionalShadow = shadowSpread > 0
    ? `, 0 ${4 * shadowSpread}px ${24 * shadowSpread}px rgba(0, 0, 0, ${shadowOpacity * 0.5})`
    : "";

  const borderRadius = fullscreen ? 0 : 12 * scale;

  // Fullscreen mode - no chrome at all
  if (fullscreen) {
    return (
      <div
        style={{
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius,
            overflow: "hidden",
            boxShadow: baseShadow + additionalShadow,
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Minimal mode - just a slim top bar
  if (minimal) {
    const minimalBarHeight = 18 * scale;

    return (
      <div
        style={{
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius,
            overflow: "hidden",
            boxShadow: baseShadow + additionalShadow,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Minimal Title Bar */}
          <div
            style={{
              height: minimalBarHeight,
              backgroundColor: "#F1F5F9",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: `0 ${16 * scale}px`,
            }}
          >
            {/* Window controls - smaller */}
            <div
              style={{
                position: "absolute",
                left: 12 * scale,
                display: "flex",
                gap: 6 * scale,
              }}
            >
              <div
                style={{
                  width: 8 * scale,
                  height: 8 * scale,
                  borderRadius: "50%",
                  backgroundColor: "#FF5F57",
                }}
              />
              <div
                style={{
                  width: 8 * scale,
                  height: 8 * scale,
                  borderRadius: "50%",
                  backgroundColor: "#FEBC2E",
                }}
              />
              <div
                style={{
                  width: 8 * scale,
                  height: 8 * scale,
                  borderRadius: "50%",
                  backgroundColor: "#28C840",
                }}
              />
            </div>

            {/* URL - smaller */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 4 * scale,
                padding: `2px ${10 * scale}px`,
                fontSize: 10 * scale,
                color: "#64748B",
                fontFamily: theme.fonts.body,
                border: "1px solid #E2E8F0",
              }}
            >
              {url}
            </div>
          </div>

          {/* Content Area */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Full browser chrome (original)
  const barHeight = 44 * scale;
  const padding = 16 * scale;

  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Browser Frame */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius,
          overflow: "hidden",
          boxShadow: baseShadow + additionalShadow,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: barHeight,
            backgroundColor: "#F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            padding: `0 ${padding}px`,
            gap: 12 * scale,
          }}
        >
          {/* Window Controls */}
          <div style={{ display: "flex", gap: 8 * scale }}>
            <div
              style={{
                width: 12 * scale,
                height: 12 * scale,
                borderRadius: "50%",
                backgroundColor: "#FF5F57",
              }}
            />
            <div
              style={{
                width: 12 * scale,
                height: 12 * scale,
                borderRadius: "50%",
                backgroundColor: "#FEBC2E",
              }}
            />
            <div
              style={{
                width: 12 * scale,
                height: 12 * scale,
                borderRadius: "50%",
                backgroundColor: "#28C840",
              }}
            />
          </div>

          {/* Address Bar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 6 * scale,
                padding: `6px ${12 * scale}px`,
                fontSize: 13 * scale,
                color: "#64748B",
                fontFamily: theme.fonts.body,
                minWidth: 200 * scale,
                textAlign: "center",
                border: "1px solid #E2E8F0",
              }}
            >
              {url}
            </div>
          </div>

          {/* Three dots menu */}
          <div style={{ display: "flex", gap: 3 * scale }}>
            <div
              style={{
                width: 4 * scale,
                height: 4 * scale,
                borderRadius: "50%",
                backgroundColor: "#94A3B8",
              }}
            />
            <div
              style={{
                width: 4 * scale,
                height: 4 * scale,
                borderRadius: "50%",
                backgroundColor: "#94A3B8",
              }}
            />
            <div
              style={{
                width: 4 * scale,
                height: 4 * scale,
                borderRadius: "50%",
                backgroundColor: "#94A3B8",
              }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
