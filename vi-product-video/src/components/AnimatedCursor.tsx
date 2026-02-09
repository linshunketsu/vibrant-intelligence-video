import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { easing, timing } from "../styles/theme";
import cursorSvg from "../assets/cursor.svg";

interface Position {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
}

interface AnimatedCursorProps {
  startPos: Position;
  endPos: Position;
  startFrame?: number;
  moveDuration?: number; // Frames for movement animation
  clickAtFrame?: number | null; // Frame to perform click (null = no click)
  cursorSize?: number; // Pixels
  zoomSync?: {
    atFrame: number; // When zoom starts
    zoomDuration: number; // How long zoom takes
    minScale?: number; // Starting scale (default: 0.4)
    maxScale?: number; // Ending scale (default: 2.5)
  };
}

/**
 * AnimatedCursor - Custom SVG cursor for interactive storytelling
 *
 * Uses the custom cursor.svg asset - a sleek pointer design
 */
export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  startPos,
  endPos,
  startFrame = 0,
  moveDuration = 24,
  clickAtFrame = null,
  cursorSize = 16,
  zoomSync,
}) => {
  const frame = useCurrentFrame();

  // Don't render before startFrame
  if (frame < startFrame) return null;

  const frameSinceStart = frame - startFrame;

  // Calculate position progress (0 to 1)
  const moveProgress = Math.min(frameSinceStart / moveDuration, 1);

  // Smooth bezier easing for natural cursor movement
  const easedProgress = interpolate(moveProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Calculate current position
  const currentX = interpolate(
    easedProgress,
    [0, 1],
    [startPos.x, endPos.x],
    { extrapolateRight: "clamp" }
  );
  const currentY = interpolate(
    easedProgress,
    [0, 1],
    [startPos.y, endPos.y],
    { extrapolateRight: "clamp" }
  );

  // Calculate click animation (scale pulse + ring ripple)
  let scale = 1;
  let ringScale = 1;
  let ringOpacity = 0;

  // Calculate zoom sync scale (cursor grows as content zooms in)
  let zoomScale = 1;
  if (zoomSync) {
    const { atFrame, zoomDuration, minScale = 0.4, maxScale = 2.5 } = zoomSync;
    const zoomProgress = Math.min(Math.max((frame - atFrame) / zoomDuration, 0), 1);
    zoomScale = interpolate(
      zoomProgress,
      [0, 1],
      [minScale, maxScale],
      { easing: Easing.bezier(0.4, 0, 0.2, 1) }
    );
  }

  if (clickAtFrame !== null) {
    const clickDuration = 8;
    const framesSinceClick = frame - clickAtFrame;

    if (framesSinceClick >= 0 && framesSinceClick <= clickDuration) {
      const clickProgress = framesSinceClick / clickDuration;
      scale = interpolate(
        clickProgress,
        [0, 0.5, 1],
        [1, 0.85, 1],
        {
          easing: Easing.bezier(...easing.material),
        }
      );
      ringScale = interpolate(clickProgress, [0, 1], [1, 2]);
      ringOpacity = interpolate(clickProgress, [0, 0.5, 1], [0, 0.4, 0]);
    }
  }

  // Combined scale: click animation on top of zoom growth
  const finalScale = scale * zoomScale;

  // Fade cursor in on entry, fade out after click (if any)
  let opacity = 1;
  const fadeInDuration = 6;
  // Calculate fade out delay relative to startFrame
  // If there's a click, fade out after click animation (8 frames), otherwise after move + delay
  const clickOffset = clickAtFrame !== null ? clickAtFrame - startFrame + 8 : null;
  const fadeOutDelay = clickOffset !== null ? clickOffset : moveDuration + 30;
  const fadeOutDuration = 6; // Quick fade out

  if (frameSinceStart < fadeInDuration) {
    opacity = interpolate(frameSinceStart, [0, fadeInDuration], [0, 1]);
  } else if (frameSinceStart > fadeOutDelay) {
    opacity = Math.max(
      0,
      interpolate(frameSinceStart, [fadeOutDelay, fadeOutDelay + fadeOutDuration], [1, 0])
    );
  }

  // Don't render if faded out
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <img
        src={cursorSvg}
        alt=""
        width={cursorSize}
        height={cursorSize}
        style={{
          position: "absolute",
          left: `${currentX}%`,
          top: `${currentY}%`,
          transform: `translate(-15%, -15%) scale(${finalScale})`,
          opacity,
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
        }}
      />

      {/* Ring ripple on click - also scales with zoom */}
      {ringOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: `${currentX}%`,
            top: `${currentY}%`,
            transform: `translate(-50%, -50%) scale(${ringScale * zoomScale})`,
            width: cursorSize * 1.5,
            height: cursorSize * 1.5,
            borderRadius: "50%",
            border: "2px solid #212121",
            opacity: ringOpacity,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
