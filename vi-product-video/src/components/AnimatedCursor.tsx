import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { easing, timing } from "../styles/theme";

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
  cursorType?: "pointer" | "hand";
  cursorSize?: number; // Pixels
}

/**
 * AnimatedCursor - Selective use for interactive storytelling
 *
 * Design:
 * - Large (~30-40px), solid black, macOS-style pointer cursor
 * - Animates position with smooth bezier easing (accelerate then decelerate)
 * - Can "click" with a subtle scale pulse (scale 1→0.85→1 over 8 frames)
 * - Enters from below/right of viewport, moves to target element
 *
 * Used in MAX 3 features — not every scene
 *
 * Usage:
 * <AnimatedCursor
 *   startPos={{ x: 120, y: 110 }} // Start below/right viewport
 *   endPos={{ x: 50, y: 40 }}      // End at button location
 *   startFrame={30}
 *   moveDuration={24}
 *   clickAtFrame={54}              // Click after arriving
 * />
 */
export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  startPos,
  endPos,
  startFrame = 0,
  moveDuration = 24,
  clickAtFrame = null,
  cursorType = "pointer",
  cursorSize = 36,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Don't render before startFrame
  if (frame < startFrame) return null;

  const frameSinceStart = frame - startFrame;

  // Calculate position progress (0 to 1)
  const moveProgress = Math.min(frameSinceStart / moveDuration, 1);

  // Smooth bezier easing for natural cursor movement
  const easedProgress = interpolate(moveProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Accelerate then decelerate
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

  // Calculate click animation (scale pulse)
  let scale = 1;
  if (clickAtFrame !== null) {
    const clickDuration = 8; // Frames for click animation
    const framesSinceClick = frame - clickAtFrame;

    if (framesSinceClick >= 0 && framesSinceClick <= clickDuration) {
      // Click in progress
      const clickProgress = framesSinceClick / clickDuration;
      // Scale down then back up (1 -> 0.85 -> 1)
      scale = interpolate(
        clickProgress,
        [0, 0.5, 1],
        [1, 0.85, 1],
        {
          easing: Easing.bezier(...easing.material),
        }
      );
    }
  }

  // Fade cursor in on entry, fade out after click (if any)
  let opacity = 1;
  const fadeInDuration = 6;
  const fadeOutDelay = clickAtFrame !== null ? clickAtFrame + 12 : moveDuration + 30;
  const fadeOutDuration = 10;

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

  // macOS-style cursor paths
  const pointerPath = "M 0 0 L 0 24 L 5.5 18 L 9 24 L 11 23 L 7.5 17 L 14 17 L 0 0 Z";
  const handPath = "M 0 12 L 3 12 L 3 4 L 6 4 L 6 12 L 9 12 L 9 2 L 12 2 L 12 12 L 15 12 L 15 4 L 18 4 L 18 12 L 21 12 L 21 14 Q 21 21 15.5 24 L 10.5 24 Q 5 21 5 14 L 5 12 L 0 12 Z";

  const cursorPath = cursorType === "hand" ? handPath : pointerPath;
  const pathScale = cursorType === "hand" ? cursorSize / 24 : cursorSize / 17;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <svg
        width={cursorSize * 1.5}
        height={cursorSize * 1.5}
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: `${currentX}%`,
          top: `${currentY}%`,
          transform: `translate(-10%, -10%) scale(${scale})`,
          opacity,
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
        }}
      >
        {/* Solid black cursor */}
        <path
          d={cursorPath}
          fill="#1A1A1A"
          stroke="none"
        />
        {/* Subtle white outline for contrast */}
        <path
          d={cursorPath}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </AbsoluteFill>
  );
};
