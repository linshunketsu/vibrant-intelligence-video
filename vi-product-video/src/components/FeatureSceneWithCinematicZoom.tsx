import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { FeatureTitle } from "./FeatureTitle";
import { BrowserMockup } from "./BrowserMockup";
import { SceneTransition } from "./SceneTransition";
import { Carousel } from "./Carousel";
import { AnimatedCursor } from "./AnimatedCursor";
import {
  CinematicZoomHighlight,
  CinematicZoomFromPreset,
  TargetPosition,
  ZoomPreset,
} from "./CinematicZoomHighlight";
import { easing, timing, theme } from "../styles/theme";

/**
 * Enhanced highlight zoom configuration with cinematic options
 */
export interface HighlightZoom {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  scale?: number; // Zoom level (default: from preset or 2)
  atFrame: number; // Frame to start zoom
  duration?: number; // Frames for zoom animation (default: from preset or 20)
  holdDuration?: number; // Frames to hold at full zoom (default: from preset or 60)
  preset?: ZoomPreset; // Use a pre-configured cinematic preset
  showCursor?: boolean; // Show animated cursor (replaces ring)
  showVignette?: boolean; // Darken surrounding area
  showSpotlight?: boolean; // Add glow effect
  cursorStartOffset?: { x: number; y: number }; // Where cursor starts
}

export interface CursorAnimation {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  startFrame: number;
  moveDuration: number;
  clickAtFrame?: number | null;
}

type ScreenshotLayout = "single" | "carousel" | "crossfade" | "cinematic-zoom";

export interface FeatureSceneWithCinematicZoomProps {
  title: string;
  subtitle?: string;
  screenshots: string[];
  layout?: ScreenshotLayout;
  durationInFrames?: number;
  showCursor?: CursorAnimation;
  highlightZoom?: HighlightZoom;
  fullScreen?: boolean;
  fastEntrance?: boolean; // For "One More Thing" rapid-fire features - faster entrance (~10 frames)
}

/**
 * FeatureSceneWithCinematicZoom - Enhanced feature scene with cinematic zoom effects
 *
 * This is an enhanced version of FeatureScene that supports the new CinematicZoomHighlight
 * component for dramatic, professional product video effects.
 *
 * Usage:
 * ```tsx
 * <FeatureSceneWithCinematicZoom
 *   title="AI-Powered Analytics"
 *   screenshots={["/screenshot1.png"]}
 *   highlightZoom={{
 *     x: 65,
 *     y: 30,
 *     preset: "dramatic",
 *     atFrame: 40,
 *   }}
 * />
 * ```
 */
export const FeatureSceneWithCinematicZoom: React.FC<FeatureSceneWithCinematicZoomProps> = ({
  title,
  subtitle,
  screenshots,
  layout = "single",
  durationInFrames = 120,
  showCursor,
  highlightZoom,
  fullScreen = false,
  fastEntrance = false,
}) => {
  const frame = useCurrentFrame();

  if (fullScreen) {
    return <FullScreenFeatureScene title={title} screenshots={screenshots} />;
  }

  // Use cinematic zoom layout when highlightZoom is provided with preset
  // NOTE: For carousel layouts, cinematic zoom causes clipping issues with side slides
  // So we only use cinematic zoom for single/crossfade layouts, or when explicitly requested
  const useCinematicZoom = highlightZoom && (
    highlightZoom.preset || layout === "cinematic-zoom" || layout === "crossfade"
  );

  return (
    <SceneTransition fastEntrance={fastEntrance}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 100px",
          overflow: "visible", // Allow carousel side slides to be fully visible
        }}
      >
        {/* Feature Title - large, bold, striking */}
        <FeatureTitle
          title={title}
          subtitle={subtitle}
          delay={5}
          titleDuration={15}
          staggerDelay={3}
        />

        {/* Screenshot Display */}
        <div
          style={{
            flex: 1,
            width: "100%",
            marginTop: subtitle ? 20 : 30,
            minHeight: 0,
            position: "relative",
            overflow: "visible", // Allow carousel side slides to be fully visible
          }}
        >
          {useCinematicZoom && highlightZoom ? (
            <CinematicZoomContent
              screenshots={screenshots}
              highlightZoom={highlightZoom}
              layout={layout}
              showCursor={showCursor}
            />
          ) : (
            <StandardScreenshotContent
              screenshots={screenshots}
              layout={layout}
              highlightZoom={highlightZoom}
              showCursor={showCursor}
            />
          )}
        </div>

        {/* Optional Cursor Animation - only show if NOT using cinematic zoom (cursor handled inside zoom) */}
        {showCursor && !useCinematicZoom && (
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
 * CinematicZoomContent - Wrapper for cinematic zoom effect
 * Supports both single screenshots and carousel/crossfade layouts
 */
interface CinematicZoomContentProps {
  screenshots: string[];
  highlightZoom: HighlightZoom;
  layout: ScreenshotLayout;
  showCursor?: CursorAnimation;
}

const CinematicZoomContent: React.FC<CinematicZoomContentProps> = ({
  screenshots,
  highlightZoom,
  layout,
  showCursor,
}) => {
  if (screenshots.length === 0) return null;

  const target: TargetPosition = { x: highlightZoom.x, y: highlightZoom.y };

  const zoomProps = {
    target,
    scale: highlightZoom.scale || 2, // Default to 2x if not specified
    atFrame: highlightZoom.atFrame,
    holdDuration: highlightZoom.holdDuration,
    zoomDuration: highlightZoom.duration,
    showCursor: highlightZoom.showCursor,
    cursorStartOffset: highlightZoom.cursorStartOffset,
    showVignette: highlightZoom.showVignette,
    showSpotlight: highlightZoom.showSpotlight,
  };

  // For carousel and crossfade, wrap the existing components
  if (layout === "carousel" && screenshots.length >= 2) {
    const ZoomContent = () => (
      <>
        <Carousel
          items={screenshots.map((src) => ({ image: src }))}
          slideDuration={75}
          transitionDuration={18}
        />
        {showCursor && (
          <AnimatedCursor
            startPos={showCursor.startPos}
            endPos={showCursor.endPos}
            startFrame={showCursor.startFrame}
            moveDuration={showCursor.moveDuration}
            clickAtFrame={showCursor.clickAtFrame}
          />
        )}
      </>
    );

    if (highlightZoom.preset) {
      return (
        <CinematicZoomFromPreset
          preset={highlightZoom.preset}
          override={{
            ...(highlightZoom.scale !== undefined && { scale: highlightZoom.scale }),
            ...(highlightZoom.showCursor !== undefined && { showCursor: highlightZoom.showCursor }),
            ...(highlightZoom.showVignette !== undefined && { showVignette: highlightZoom.showVignette }),
            ...(highlightZoom.showSpotlight !== undefined && { showSpotlight: highlightZoom.showSpotlight }),
          }}
          {...zoomProps}
        >
          <ZoomContent />
        </CinematicZoomFromPreset>
      );
    }

    return (
      <CinematicZoomHighlight {...zoomProps} scale={highlightZoom.scale || 2}>
        <ZoomContent />
      </CinematicZoomHighlight>
    );
  }

  if (layout === "crossfade" && screenshots.length >= 2) {
    const ZoomContent = () => (
      <>
        <CrossfadeScreenshots screenshots={screenshots} />
        {showCursor && (
          <AnimatedCursor
            startPos={showCursor.startPos}
            endPos={showCursor.endPos}
            startFrame={showCursor.startFrame}
            moveDuration={showCursor.moveDuration}
            clickAtFrame={showCursor.clickAtFrame}
          />
        )}
      </>
    );

    if (highlightZoom.preset) {
      return (
        <CinematicZoomFromPreset
          preset={highlightZoom.preset}
          override={{
            ...(highlightZoom.scale !== undefined && { scale: highlightZoom.scale }),
            ...(highlightZoom.showCursor !== undefined && { showCursor: highlightZoom.showCursor }),
            ...(highlightZoom.showVignette !== undefined && { showVignette: highlightZoom.showVignette }),
            ...(highlightZoom.showSpotlight !== undefined && { showSpotlight: highlightZoom.showSpotlight }),
          }}
          {...zoomProps}
        >
          <ZoomContent />
        </CinematicZoomFromPreset>
      );
    }

    return (
      <CinematicZoomHighlight {...zoomProps} scale={highlightZoom.scale || 2}>
        <ZoomContent />
      </CinematicZoomHighlight>
    );
  }

  // For single layout, use the simple image approach
  const ZoomContent = () => (
    <>
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
      {showCursor && (
        <AnimatedCursor
          startPos={showCursor.startPos}
          endPos={showCursor.endPos}
          startFrame={showCursor.startFrame}
          moveDuration={showCursor.moveDuration}
          clickAtFrame={showCursor.clickAtFrame}
        />
      )}
    </>
  );

  // Use preset if provided
  if (highlightZoom.preset) {
    return (
      <CinematicZoomFromPreset
        preset={highlightZoom.preset}
        override={{
          ...(highlightZoom.scale !== undefined && { scale: highlightZoom.scale }),
          ...(highlightZoom.showCursor !== undefined && { showCursor: highlightZoom.showCursor }),
          ...(highlightZoom.showVignette !== undefined && { showVignette: highlightZoom.showVignette }),
          ...(highlightZoom.showSpotlight !== undefined && { showSpotlight: highlightZoom.showSpotlight }),
        }}
        {...zoomProps}
      >
        <ZoomContent />
      </CinematicZoomFromPreset>
    );
  }

  // Use custom configuration
  return (
    <CinematicZoomHighlight {...zoomProps} scale={highlightZoom.scale || 2}>
      <ZoomContent />
    </CinematicZoomHighlight>
  );
};

/**
 * StandardScreenshotContent - Original screenshot display logic
 */
interface StandardScreenshotContentProps {
  screenshots: string[];
  layout: ScreenshotLayout;
  highlightZoom?: HighlightZoom;
  showCursor?: CursorAnimation;
}

const StandardScreenshotContent: React.FC<StandardScreenshotContentProps> = ({
  screenshots,
  layout,
  highlightZoom,
  showCursor,
}) => {
  const frame = useCurrentFrame();

  // Calculate screenshot scale and zoom animation (original logic)
  let screenshotScale = 1;
  let screenshotOffsetX = 50;
  let screenshotOffsetY = 50;

  if (highlightZoom && layout === "single") {
    const zoomDuration = highlightZoom.duration || 20;
    const zoomProgress = Math.min(
      Math.max((frame - highlightZoom.atFrame) / zoomDuration, 0),
      1
    );

    if (frame >= highlightZoom.atFrame) {
      screenshotScale = interpolate(zoomProgress, [0, 1], [1, highlightZoom.scale || 2], {
        easing: Easing.bezier(...easing.material),
        extrapolateRight: "clamp",
      });

      const shiftX = interpolate(zoomProgress, [0, 1], [0, (50 - highlightZoom.x) * ((highlightZoom.scale || 2) - 1) / (highlightZoom.scale || 2)]);
      const shiftY = interpolate(zoomProgress, [0, 1], [0, (50 - highlightZoom.y) * ((highlightZoom.scale || 2) - 1) / (highlightZoom.scale || 2)]);

      screenshotOffsetX += shiftX;
      screenshotOffsetY += shiftY;
    }
  }

  // Content based on layout
  const content = (() => {
    switch (layout) {
      case "carousel":
        if (screenshots.length < 2) {
          return <SingleScreenshot screenshots={screenshots} />;
        }
        return (
          <Carousel
            items={screenshots.map((src) => ({ image: src }))}
            slideDuration={75}
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
  })();

  // Wrap content with cursor if provided
  return showCursor ? (
    <>
      {content}
      <AnimatedCursor
        startPos={showCursor.startPos}
        endPos={showCursor.endPos}
        startFrame={showCursor.startFrame}
        moveDuration={showCursor.moveDuration}
        clickAtFrame={showCursor.clickAtFrame}
      />
    </>
  ) : (
    <>{content}</>
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
 */
const CrossfadeScreenshots: React.FC<{ screenshots: string[] }> = ({ screenshots }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (screenshots.length === 0) return null;
  if (screenshots.length === 1) {
    return <SingleScreenshot screenshots={screenshots} />;
  }

  const switchFrame = Math.floor(durationInFrames / 2);
  const crossfadeDuration = 18;

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
 */
const FullScreenFeatureScene: React.FC<{
  title: string;
  screenshots: string[];
}> = ({ title, screenshots }) => {
  const frame = useCurrentFrame();

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
