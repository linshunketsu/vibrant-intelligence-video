import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";

interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  scale?: number;
  shadowOnEntrance?: boolean; // Animate shadow on entrance
  entranceDuration?: number; // Frames for entrance animation
  minimal?: boolean; // Use minimal chrome (just top bar, no buttons)
  fullscreen?: boolean; // No chrome at all - just the content
  reducedShadow?: boolean; // Use ~50% intensity shadow (for carousel side cards)
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
  entranceDuration = 15,
  minimal = false,
  fullscreen = false,
  reducedShadow = false,
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

  // RICH LAYERED SHADOW - creates premium "floating" effect
  // Reduced shadow (~50% intensity) for carousel side cards to reinforce depth hierarchy
  const shadowIntensity = reducedShadow ? 0.5 : 1;

  // CRITICAL FIX: Round all shadow values to integers to prevent sub-pixel rendering
  // artifacts that cause flickering during video export
  // Layer 1: Tight ambient shadow (closest to card)
  const l1Opacity = Math.round(0.04 * shadowIntensity * easedProgress * 1000) / 1000;
  // Layer 2: Medium spread shadow
  const l2Opacity = Math.round(0.04 * shadowIntensity * easedProgress * 1000) / 1000;
  const l2Offset = Math.round(4 * easedProgress * 10) / 10;
  const l2Blur = Math.round(8 * easedProgress * 10) / 10;
  // Layer 3: Large diffuse shadow (main depth)
  const l3Opacity = Math.round(0.06 * shadowIntensity * easedProgress * 1000) / 1000;
  const l3Offset = Math.round(12 * easedProgress * 10) / 10;
  const l3Blur = Math.round(24 * easedProgress * 10) / 10;
  // Layer 4: Far ambient shadow (creates "lift" feeling)
  const l4Opacity = Math.round(0.08 * shadowIntensity * easedProgress * 1000) / 1000;
  const l4Offset = Math.round(24 * easedProgress * 10) / 10;
  const l4Blur = Math.round(48 * easedProgress * 10) / 10;

  const richShadow = `
    0 1px 2px rgba(0, 0, 0, ${l1Opacity}),
    0 ${l2Offset}px ${l2Blur}px rgba(0, 0, 0, ${l2Opacity}),
    0 ${l3Offset}px ${l3Blur}px rgba(0, 0, 0, ${l3Opacity}),
    0 ${l4Offset}px ${l4Blur}px rgba(0, 0, 0, ${l4Opacity})
  `;

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
            boxShadow: richShadow,
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
            boxShadow: richShadow,
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
          boxShadow: richShadow,
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
