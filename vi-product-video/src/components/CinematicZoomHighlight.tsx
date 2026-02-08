import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, timing, theme } from "../styles/theme";

/**
 * Cinematic zoom highlight for drawing attention to specific areas in screenshots
 *
 * Features:
 * - Animated highlight ring that draws attention
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
 *   showRing={true}             // Show highlight ring
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
  showRing?: boolean; // Show animated highlight ring (default: true)
  ringColor?: string; // Ring color (default: theme.colors.accent)
  ringSize?: number; // Ring size in pixels (default: 120)
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
  showRing = true,
  ringColor,
  ringSize = 120,
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

  // Ring animation phases
  const ringProgress = calculateRingProgress(frame, atFrame, zoomDuration, holdDuration, exitDuration);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Main zoomed content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scaleValue})`,
          transformOrigin: `${target.x}% ${target.y}%`,
        }}
      >
        {children}
      </div>

      {/* Animated highlight ring */}
      {showRing && (
        <HighlightRing
          target={target}
          progress={ringProgress}
          color={ringColor || theme.colors.accent}
          size={ringSize}
        />
      )}

      {/* Optional spotlight glow */}
      {showSpotlight && (
        <SpotlightGlow
          target={target}
          progress={ringProgress}
          color={spotlightColor}
        />
      )}
    </AbsoluteFill>
  );
};

/**
 * HighlightRing - Animated ring that draws attention to target
 */
interface HighlightRingProps {
  target: TargetPosition;
  progress: {
    drawIn: number; // 0-1
    hold: number; // 0-1
    pulse: number; // 0-1
    fadeOut: number; // 0-1
  };
  color: string;
  size: number;
}

const HighlightRing: React.FC<HighlightRingProps> = ({ target, progress, color, size }) => {
  const { drawIn, hold, pulse, fadeOut } = progress;

  // Ring scale animation (grows in, pulses, shrinks out)
  const ringScale = interpolate(
    drawIn,
    [0, 0.6, 1],
    [0, 1.2, 1],
    { easing: Easing.bezier(...easing.easeOut) }
  );

  // Pulse effect during hold
  const pulseScale = interpolate(
    pulse,
    [0, 0.5, 1],
    [1, 1.08, 1],
    { easing: Easing.bezier(...easing.easeInOut) }
  );

  // Final scale combining all effects
  const finalScale = ringScale * pulseScale;

  // Opacity (fade in, hold, fade out)
  const opacity = interpolate(
    drawIn < 1 ? drawIn : fadeOut,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", easing: Easing.bezier(...easing.material) }
  );

  // Ring thickness varies with animation
  const strokeWidth = interpolate(
    drawIn,
    [0, 1],
    [size / 2, size / 8],
    { easing: Easing.bezier(...easing.easeOut) }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${target.x}%`,
        top: `${target.y}%`,
        transform: `translate(-50%, -50%) scale(${finalScale})`,
        pointerEvents: "none",
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${strokeWidth * 0.5}px solid ${color}`,
          opacity: opacity * 0.3,
          transform: "scale(1.3)",
        }}
      />

      {/* Main ring */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${strokeWidth}px solid ${color}`,
          opacity,
          boxShadow: `0 0 ${size / 2}px ${color}`,
        }}
      />

      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size / 6,
          height: size / 6,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: opacity * 0.8,
        }}
      />
    </div>
  );
};

/**
 * SpotlightGlow - Subtle glow effect at target position
 */
interface SpotlightGlowProps {
  target: TargetPosition;
  progress: { drawIn: number; hold: number };
  color: string;
}

const SpotlightGlow: React.FC<SpotlightGlowProps> = ({ target, progress, color }) => {
  const { drawIn, hold } = progress;

  const combinedProgress = drawIn < 1 ? drawIn * 0.8 : 0.8 + hold * 0.2;

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
 * Helper: Calculate ring animation progress
 */
function calculateRingProgress(
  frame: number,
  atFrame: number,
  zoomDuration: number,
  holdDuration: number,
  exitDuration: number
) {
  const drawInStart = atFrame - 10; // Ring appears 10 frames before zoom
  const drawInEnd = atFrame + zoomDuration * 0.5;
  const holdEnd = drawInEnd + holdDuration;
  const totalEnd = atFrame + zoomDuration + holdDuration + exitDuration;

  // Draw in progress (ring appears and animates in)
  const drawIn = Math.min(Math.max((frame - drawInStart) / (drawInEnd - drawInStart), 0), 1);

  // Hold progress (for pulse effect)
  const hold = Math.min(Math.max((frame - drawInEnd) / holdDuration, 0), 1);

  // Pulse cycles during hold
  const pulseDuration = 30; // 1 second per pulse
  const pulseFrame = (frame - drawInEnd) % pulseDuration;
  const pulse = interpolate(
    pulseFrame,
    [0, pulseDuration / 2, pulseDuration],
    [0, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // Fade out progress
  const fadeOutStart = holdEnd - 20;
  const fadeOut = Math.min(Math.max((frame - fadeOutStart) / 20, 0), 1);

  return { drawIn, hold, pulse, fadeOut };
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
  showRing: boolean;
  showVignette: boolean;
  showSpotlight: boolean;
}

export const ZOOM_PRESETS: Record<ZoomPreset, ZoomPresetConfig> = {
  subtle: {
    scale: 1.5,
    zoomDuration: 24,
    holdDuration: 45,
    exitDuration: 18,
    showRing: true,
    showVignette: false,
    showSpotlight: false,
  },
  dramatic: {
    scale: 3,
    zoomDuration: 30,
    holdDuration: 60,
    exitDuration: 24,
    showRing: true,
    showVignette: true,
    showSpotlight: true,
  },
  cinematic: {
    scale: 2,
    zoomDuration: 45,
    holdDuration: 90,
    exitDuration: 36,
    showRing: true,
    showVignette: true,
    showSpotlight: false,
  },
  snappy: {
    scale: 2.5,
    zoomDuration: 15,
    holdDuration: 30,
    exitDuration: 12,
    showRing: true,
    showVignette: true,
    showSpotlight: false,
  },
  spotlight: {
    scale: 2.2,
    zoomDuration: 30,
    holdDuration: 60,
    exitDuration: 24,
    showRing: true,
    showVignette: true,
    showSpotlight: true,
  },
};

/**
 * CinematicZoomFromPreset - Convenience component using preset configurations
 */
interface CinematicZoomFromPresetProps extends Omit<CinematicZoomProps, "scale" | "zoomDuration" | "holdDuration" | "exitDuration" | "showRing" | "showVignette" | "showSpotlight"> {
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
      showRing={config.showRing}
      showVignette={config.showVignette}
      showSpotlight={config.showSpotlight}
    />
  );
};
