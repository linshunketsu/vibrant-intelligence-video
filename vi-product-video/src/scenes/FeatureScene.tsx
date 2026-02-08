import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { FeatureLabel } from "../components/FeatureLabel";
import { BrowserMockup } from "../components/BrowserMockup";
import { SceneTransition } from "../components/SceneTransition";
import { Carousel } from "../components/Carousel";
import { AnimatedCursor } from "../components/AnimatedCursor";
import { easing, timing, theme } from "../styles/theme";

interface HighlightZoom {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  scale: number; // Zoom level (1.5 = 1.5x)
  atFrame: number; // Frame to start zoom
  duration?: number; // Frames for zoom animation (default: 20)
}

interface CursorAnimation {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  startFrame: number;
  moveDuration: number;
  clickAtFrame?: number | null;
}

type ScreenshotLayout = "single" | "carousel" | "crossfade";

interface FeatureSceneProps {
  featureNumber?: number; // 1-13 (optional - if not provided, won't show number badge)
  title: string;
  label?: string; // Optional label text to override featureNumber badge
  subtitle?: string;
  screenshots: string[]; // Paths to screenshot images
  layout?: ScreenshotLayout;
  durationInFrames?: number;
  showCursor?: CursorAnimation;
  highlightZoom?: HighlightZoom;
  fullScreen?: boolean; // For Composer finale only
}

/**
 * FeatureScene - Template scene for feature showcases
 *
 * Motion Design Philosophy:
 * - CONSISTENT floating card presentation — almost every scene uses the same entrance
 * - Content has a HOLD — static display for 1-2 seconds before transitioning
 * - Variety comes from content/layout, not motion gimmicks
 *
 * Layout Options:
 * - single: One screenshot in centered BrowserMockup
 * - carousel: Multiple screenshots with side peeks (for 3+ screenshots)
 * - crossfade: Screenshots swap with opacity crossfade (for 2 screenshots)
 * - fullScreen: Screenshot fills viewport (for Composer finale only)
 *
 * Animation Timeline:
 * - Frames 0-15: BrowserMockup enters (scale 0.95→1, opacity 0→1, translateY 20→0)
 * - Frames 5-20: Feature label + subtitle fade in
 * - Frames 20 to (end-15): Screenshot display/carousel. Content is STATIC.
 * - Frames (end-15) to (end-5): Everything fades out
 * - Frames (end-5) to end: Just dotted background visible (the "breath")
 */
export const FeatureScene: React.FC<FeatureSceneProps> = ({
  featureNumber,
  label,
  title,
  subtitle,
  screenshots,
  layout = "single",
  durationInFrames = 120, // 4 seconds default
  showCursor,
  highlightZoom,
  fullScreen = false,
}) => {
  const frame = useCurrentFrame();

  // Format feature number as "01", "02", etc. if provided, otherwise use label
  const labelText = label !== undefined
    ? label
    : featureNumber !== undefined
      ? `${featureNumber.toString().padStart(2, "0")} / ${title}`
      : title;

  if (fullScreen) {
    // Full-screen layout for Composer finale
    return <FullScreenFeatureScene title={title} screenshots={screenshots} />;
  }

  // Calculate screenshot scale and zoom animation
  let screenshotScale = 1;
  let screenshotOffsetX = 50; // Center horizontally
  let screenshotOffsetY = 50; // Center vertically

  if (highlightZoom && layout === "single") {
    const zoomDuration = highlightZoom.duration || 20;
    const zoomEndFrame = highlightZoom.atFrame + zoomDuration;
    const zoomProgress = Math.min(
      Math.max((frame - highlightZoom.atFrame) / zoomDuration, 0),
      1
    );

    if (frame >= highlightZoom.atFrame) {
      screenshotScale = interpolate(zoomProgress, [0, 1], [1, highlightZoom.scale], {
        easing: Easing.bezier(...easing.material),
        extrapolateRight: "clamp",
      });

      // Calculate offset to keep the highlighted point centered
      // When we zoom in to (x, y), we need to shift so that point stays at center
      const shiftX = interpolate(zoomProgress, [0, 1], [0, (50 - highlightZoom.x) * (highlightZoom.scale - 1) / highlightZoom.scale]);
      const shiftY = interpolate(zoomProgress, [0, 1], [0, (50 - highlightZoom.y) * (highlightZoom.scale - 1) / highlightZoom.scale]);

      screenshotOffsetX += shiftX;
      screenshotOffsetY += shiftY;
    }
  }

  // Render screenshot content based on layout
  const renderScreenshotContent = () => {
    switch (layout) {
      case "carousel":
        if (screenshots.length < 2) {
          return <SingleScreenshot screenshots={screenshots} />;
        }
        return (
          <Carousel
            items={screenshots.map((src) => ({ image: src }))}
            slideDuration={75} // 2.5 seconds per slide
            transitionDuration={18}
          />
        );

      case "crossfade":
        return <CrossfadeScreenshots screenshots={screenshots} />;

      case "single":
      default:
        return (
          <SingleScreenshot
            screenshots={screenshots}
            scale={screenshotScale}
            offsetX={screenshotOffsetX}
            offsetY={screenshotOffsetY}
          />
        );
    }
  };

  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 100px",
        }}
      >
          {/* Feature Label */}
          <FeatureLabel
            text={labelText}
            delay={5}
            duration={12}
            fontSize={16}
          />

          {/* Subtitle (if provided) */}
          {subtitle && (
            <div
              style={{
                fontSize: theme.fontSizes.featureSubtitle,
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.body,
                marginTop: 16,
                marginBottom: 24,
                opacity: frame < 10 ? 0 : 1,
                transform: frame < 20
                  ? `translateY(${interpolate(Math.min(frame, 20) - 10, [0, 10], [10, 0])}px)`
                  : "none",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Screenshot Display - full available space */}
          <div
            style={{
              flex: 1,
              width: "100%",
              marginTop: subtitle ? 20 : 30,
              minHeight: 0,
            }}
          >
            {renderScreenshotContent()}
          </div>

          {/* Optional Cursor Animation */}
          {showCursor && (
            <AnimatedCursor
              startPos={showCursor.startPos}
              endPos={showCursor.endPos}
              startFrame={showCursor.startFrame}
              moveDuration={showCursor.moveDuration}
              clickAtFrame={showCursor.clickAtFrame}
            />
          )}
        </AbsoluteFill>
    </SceneTransition>
  );
};

/**
 * SingleScreenshot - Displays one screenshot in a BrowserMockup
 */
interface SingleScreenshotProps {
  screenshots: string[];
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}

const SingleScreenshot: React.FC<SingleScreenshotProps> = ({
  screenshots,
  scale = 1,
  offsetX = 50,
  offsetY = 50,
}) => {
  if (screenshots.length === 0) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${scale})`,
        transformOrigin: `${offsetX}% ${offsetY}%`,
      }}
    >
      <BrowserMockup scale={1} shadowOnEntrance={true} minimal={true}>
        <img
          src={screenshots[0]}
          alt="Feature screenshot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </BrowserMockup>
    </div>
  );
};

/**
 * CrossfadeScreenshots - Swaps between 2 screenshots with opacity crossfade
 * Uses a single BrowserMockup with crossfading images inside for better space usage
 */
const CrossfadeScreenshots: React.FC<{ screenshots: string[] }> = ({ screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (screenshots.length === 0) return null;
  if (screenshots.length === 1) {
    return <SingleScreenshot screenshots={screenshots} />;
  }

  // Calculate when to switch (at 50% of scene, minus transition time)
  const switchFrame = Math.floor(durationInFrames / 2);
  const crossfadeDuration = 18;

  // Calculate opacity for each screenshot
  const firstOpacity =
    frame < switchFrame
      ? 1
      : interpolate(
          Math.min(frame - switchFrame, crossfadeDuration),
          [0, crossfadeDuration],
          [1, 0],
          { easing: Easing.bezier(...easing.material) }
        );

  const secondOpacity =
    frame < switchFrame - crossfadeDuration
      ? 0
      : interpolate(
          Math.min(Math.max(frame - (switchFrame - crossfadeDuration), 0), crossfadeDuration),
          [0, crossfadeDuration],
          [0, 1],
          { easing: Easing.bezier(...easing.material) }
        );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BrowserMockup scale={1} shadowOnEntrance={true} minimal={true}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* First Screenshot */}
          <img
            src={screenshots[0]}
            alt="Feature screenshot 1"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: firstOpacity,
            }}
          />
          {/* Second Screenshot */}
          <img
            src={screenshots[1]}
            alt="Feature screenshot 2"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: secondOpacity,
            }}
          />
        </div>
      </BrowserMockup>
    </div>
  );
};

/**
 * FullScreenFeatureScene - For Composer finale
 * Screenshot fills entire viewport with "Coming Soon" badge
 */
const FullScreenFeatureScene: React.FC<{
  title: string;
  screenshots: string[];
}> = ({ title, screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in screenshot
  const opacity = interpolate(
    Math.min(frame, 15),
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
      {/* Full-screen screenshot */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
        }}
      >
        {screenshots.length > 0 && (
          <img
            src={screenshots[0]}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* "Coming Soon" badge */}
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
          opacity: frame > 5 ? Math.min((frame - 5) / 10, 1) : 0,
        }}
      >
        Coming Soon
      </div>

      {/* Feature name at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 60,
          fontSize: theme.fontSizes.sectionTitle,
          fontWeight: 700,
          color: theme.colors.text,
          fontFamily: theme.fonts.heading,
          opacity: frame > 10 ? Math.min((frame - 10) / 12, 1) : 0,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
