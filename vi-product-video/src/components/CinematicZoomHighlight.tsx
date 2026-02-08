import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, timing, theme } from "../styles/theme";
import cursorSvg from "../assets/cursor.svg";

/**
 * Cinematic zoom highlight for drawing attention to specific areas in screenshots
 *
 * Features:
 * - Animated cursor that moves to target and clicks
 * - Cinematic multi-stage zoom (approach → zoom → hold → exit)
 * - Soft blur effect that subtly blurs outside the highlighted area (no darkening)
 * - Optional spotlight/glow effect
 * - Smooth easing with professional timing
 *
 * Usage:
 * ```tsx
 * <CinematicZoomHighlight
 *   target={{ x: 30, y: 40 }}  // Target position (percentage)
 *   scale={2.5}                 // Zoom level
 *   atFrame={30}                // When to start
 *   holdDuration={45}           // How long to hold at full zoom
 *   showCursor={true}           // Show cursor animation (replaces ring)
 *   showVignette={true}         // Blur surrounding area
 * />
 * ```
 */

export interface TargetPosition {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
}

export interface CinematicZoomProps {
  target: TargetPosition;
  scale: number; // Zoom level (1.5-4 recommended)
  atFrame: number; // Frame to start zoom
  holdDuration?: number; // Frames to hold at full zoom (default: 60)
  zoomDuration?: number; // Frames for zoom in animation (default: 30)
  exitDuration?: number; // Frames for zoom out (default: 24)
  showCursor?: boolean; // Show animated cursor (default: true, replaces ring)
  cursorStartOffset?: { x: number; y: number }; // Where cursor starts (default: {x: 50, y: 90})
  showVignette?: boolean; // Apply soft blur to surrounding area (default: true)
  vignetteIntensity?: number; // Blur intensity 0-1 (default: 0.6)
  showSpotlight?: boolean; // Add glow effect at target (default: false)
  spotlightColor?: string; // Spotlight color (default: rgba(255,255,255,0.15))
  children?: React.ReactNode; // Content to zoom (screenshot, etc.)
}

/**
 * CinematicZoomHighlight - Main component with all effects
 */
export const CinematicZoomHighlight: React.FC<CinematicZoomProps> = ({
  target,
  scale,
  atFrame,
  holdDuration = 60,
  zoomDuration = 30,
  exitDuration = 24,
  showCursor = true,
  cursorStartOffset = { x: 50, y: 90 },
  showVignette = true,
  vignetteIntensity = 0.6,
  showSpotlight = false,
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  children,
}) => {
  const frame = useCurrentFrame();

  const totalDuration = zoomDuration + holdDuration + exitDuration;
  const exitStartFrame = atFrame + zoomDuration + holdDuration;
  const endFrame = atFrame + totalDuration;

  // Calculate zoom progress with stages
  const zoomProgress = calculateZoomProgress(frame, atFrame, zoomDuration, holdDuration, exitDuration);
  const scaleValue = interpolate(zoomProgress, [0, 1], [1, scale], {
    easing: Easing.bezier(...easing.easeInOut),
    extrapolateRight: "clamp",
  });

  // Cursor animation phases
  const cursorProgress = calculateCursorProgress(frame, atFrame, zoomDuration, holdDuration, exitDuration);

  // Calculate if we're in the zoom animation window to apply custom transform origin
  // Only use custom origin during actual zoom (in, hold, or out) - not before or after
  const totalEnd = atFrame + zoomDuration + holdDuration + exitDuration;
  const isInZoomWindow = frame >= atFrame && frame < totalEnd;
  const transformOrigin = isInZoomWindow ? `${target.x}% ${target.y}%` : "50% 50%";

  return (
    <AbsoluteFill style={{ overflow: "visible" }}>
      {/* Main zoomed content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scaleValue})`,
          transformOrigin,
        }}
      >
        {children}
      </div>

      {/* Animated cursor */}
      {showCursor && (
        <ZoomCursor
          target={target}
          startOffset={cursorStartOffset}
          progress={cursorProgress}
          atFrame={atFrame}
          zoomDuration={zoomDuration}
          zoomScale={scale}
        />
      )}

      {/* Optional spotlight glow */}
      {showSpotlight && (
        <SpotlightGlow
          target={target}
          progress={cursorProgress}
          color={spotlightColor}
        />
      )}
    </AbsoluteFill>
  );
};

/**
 * ZoomCursor - Animated cursor that moves to target and clicks
 */
interface ZoomCursorProps {
  target: TargetPosition;
  startOffset: { x: number; y: number };
  progress: {
    moveToTarget: number; // 0-1
    holdAtTarget: number; // 0-1
    fadeOut: number; // 0-1
  };
  atFrame: number;
  zoomDuration: number;
  zoomScale: number; // The zoom scale to counteract for cursor sizing
}

const ZoomCursor: React.FC<ZoomCursorProps> = ({
  target,
  startOffset,
  progress,
  atFrame,
  zoomDuration,
  zoomScale,
}) => {
  const { moveToTarget, holdAtTarget, fadeOut } = progress;
  const frame = useCurrentFrame();

  // Cursor moves from start position to target
  const cursorX = interpolate(
    moveToTarget,
    [0, 1],
    [startOffset.x, target.x],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );
  const cursorY = interpolate(
    moveToTarget,
    [0, 1],
    [startOffset.y, target.y],
    { extrapolateRight: "clamp", easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );

  // Click animation at target (when cursor arrives)
  const clickFrame = atFrame + zoomDuration - 8; // Click 8 frames before full zoom
  const framesSinceClick = frame - clickFrame;
  let clickScale = 1; // Separate click animation scale
  let ringScale = 1;
  let ringOpacity = 0;

  if (framesSinceClick >= 0 && framesSinceClick <= 12) {
    const clickProgress = framesSinceClick / 12;
    clickScale = interpolate(
      clickProgress,
      [0, 0.4, 1],
      [1, 0.8, 1],
      { easing: Easing.bezier(...easing.material) }
    );
    ringScale = interpolate(clickProgress, [0, 1], [1, 2.5]);
    ringOpacity = interpolate(clickProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);
  }

  // Calculate zoom progress for cursor scaling
  // Cursor is an overlay (not part of zoomed content), so it scales independently
  // We want cursor to start small (0.4x) and grow large (2.5x) to mimic zoom effect
  const zoomProgress = Math.min(Math.max((frame - atFrame) / zoomDuration, 0), 1);

  const cursorZoomScale = interpolate(
    zoomProgress,
    [0, 1],
    [0.4, 2.5],
    { easing: Easing.bezier(...easing.easeInOut) }
  );

  // Combined scale: click animation on top of zoom growth
  const finalScale = clickScale * cursorZoomScale;

  // Improved opacity: fade in at start, stay visible during hold, fade out at end
  let opacity = 1;

  if (moveToTarget < 0.15) {
    // Fade in at start
    opacity = interpolate(moveToTarget, [0, 0.15], [0, 1], { extrapolateRight: "clamp" });
  } else if (fadeOut > 0.7) {
    // Fade out at end
    opacity = interpolate(fadeOut, [0.7, 1], [1, 0], { extrapolateLeft: "clamp" });
  }

  if (opacity <= 0.01) return null;

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1000 }}>
      <img
        src={cursorSvg}
        alt=""
        width={16}
        height={16}
        style={{
          position: "absolute",
          left: `${cursorX}%`,
          top: `${cursorY}%`,
          transform: `translate(-15%, -15%) scale(${finalScale})`,
          opacity,
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
        }}
      />

      {/* Ring ripple on click - also needs to scale with zoom */}
      {ringOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: `${target.x}%`,
            top: `${target.y}%`,
            transform: `translate(-50%, -50%) scale(${ringScale * cursorZoomScale})`,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "2px solid #212121",
            opacity: ringOpacity,
          }}
        />
      )}
    </div>
  );
};

/**
 * SpotlightGlow - Subtle glow effect at target position
 */
interface SpotlightGlowProps {
  target: TargetPosition;
  progress: { moveToTarget: number; holdAtTarget: number };
  color: string;
}

const SpotlightGlow: React.FC<SpotlightGlowProps> = ({ target, progress, color }) => {
  const { moveToTarget, holdAtTarget } = progress;

  const combinedProgress = moveToTarget < 1 ? moveToTarget * 0.8 : 0.8 + holdAtTarget * 0.2;

  const opacity = interpolate(
    combinedProgress,
    [0, 0.5, 1],
    [0, 1, 0],
    { easing: Easing.bezier(...easing.easeInOut) }
  );

  const scale = interpolate(combinedProgress, [0, 1], [0.5, 2]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${target.x}%`,
        top: `${target.y}%`,
        transform: `translate(-50%, -50%)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

/**
 * Helper: Calculate zoom progress through all stages
 */
function calculateZoomProgress(
  frame: number,
  atFrame: number,
  zoomDuration: number,
  holdDuration: number,
  exitDuration: number
): number {
  if (frame < atFrame) return 0;

  const zoomEnd = atFrame + zoomDuration;
  const exitStart = zoomEnd + holdDuration;
  const totalEnd = exitStart + exitDuration;

  if (frame < zoomEnd) {
    // Zooming in
    return interpolate(
      frame - atFrame,
      [0, zoomDuration],
      [0, 1],
      { easing: Easing.bezier(...easing.easeInOut) }
    );
  } else if (frame < exitStart) {
    // Holding at max zoom
    return 1;
  } else if (frame < totalEnd) {
    // Zooming out
    const exitProgress = (frame - exitStart) / exitDuration;
    return interpolate(
      exitProgress,
      [0, 1],
      [1, 0],
      { easing: Easing.bezier(...easing.easeInOut) }
    );
  }
  return 0;
}

/**
 * Helper: Calculate cursor animation progress
 */
function calculateCursorProgress(
  frame: number,
  atFrame: number,
  zoomDuration: number,
  holdDuration: number,
  exitDuration: number
) {
  const moveStart = atFrame - 30; // Cursor starts moving 30 frames before zoom (1 second)
  const moveEnd = atFrame + zoomDuration - 10; // Arrive at target 10 frames before full zoom
  const holdEnd = moveEnd + holdDuration;
  const totalEnd = atFrame + zoomDuration + holdDuration + exitDuration;

  // Move to target progress (longer, smoother movement)
  const moveToTarget = Math.min(Math.max((frame - moveStart) / (moveEnd - moveStart), 0), 1);

  // Hold at target progress
  const holdAtTarget = Math.min(Math.max((frame - moveEnd) / holdDuration, 0), 1);

  // Fade out progress (longer fade out)
  const fadeOutStart = totalEnd - 30; // Start fading 30 frames before end
  const fadeOut = Math.min(Math.max((frame - fadeOutStart) / 30, 0), 1);

  return { moveToTarget, holdAtTarget, fadeOut };
}

/**
 * ZoomPreset - Pre-configured cinematic zoom styles
 */
export type ZoomPreset =
  | "subtle"      // Gentle zoom for small UI elements
  | "dramatic"    // Strong zoom for emphasis
  | "cinematic"   // Slow, smooth zoom for atmosphere
  | "snappy"      // Fast zoom for energy
  | "spotlight";  // Zoom with all effects enabled

export interface ZoomPresetConfig {
  scale: number;
  zoomDuration: number;
  holdDuration: number;
  exitDuration: number;
  showCursor: boolean;
  showVignette: boolean;
  showSpotlight: boolean;
}

export const ZOOM_PRESETS: Record<ZoomPreset, ZoomPresetConfig> = {
  subtle: {
    scale: 1.5,
    zoomDuration: 24,
    holdDuration: 45,
    exitDuration: 18,
    showCursor: true,
    showVignette: false,
    showSpotlight: false,
  },
  dramatic: {
    scale: 3,
    zoomDuration: 30,
    holdDuration: 60,
    exitDuration: 24,
    showCursor: true,
    showVignette: true,
    showSpotlight: true,
  },
  cinematic: {
    scale: 2,
    zoomDuration: 45,
    holdDuration: 90,
    exitDuration: 36,
    showCursor: true,
    showVignette: true,
    showSpotlight: false,
  },
  snappy: {
    scale: 2.5,
    zoomDuration: 15,
    holdDuration: 30,
    exitDuration: 12,
    showCursor: true,
    showVignette: true,
    showSpotlight: false,
  },
  spotlight: {
    scale: 2.2,
    zoomDuration: 30,
    holdDuration: 60,
    exitDuration: 24,
    showCursor: true,
    showVignette: true,
    showSpotlight: true,
  },
};

/**
 * CinematicZoomFromPreset - Convenience component using preset configurations
 */
interface CinematicZoomFromPresetProps extends Omit<CinematicZoomProps, "scale" | "zoomDuration" | "holdDuration" | "exitDuration" | "showCursor" | "showVignette" | "showSpotlight"> {
  preset: ZoomPreset;
  override?: Partial<ZoomPresetConfig>;
}

export const CinematicZoomFromPreset: React.FC<CinematicZoomFromPresetProps> = ({
  preset,
  override,
  ...props
}) => {
  const config = { ...ZOOM_PRESETS[preset], ...override };

  return (
    <CinematicZoomHighlight
      {...props}
      scale={config.scale}
      zoomDuration={config.zoomDuration}
      holdDuration={config.holdDuration}
      exitDuration={config.exitDuration}
      showCursor={config.showCursor}
      showVignette={config.showVignette}
      showSpotlight={config.showSpotlight}
    />
  );
};
