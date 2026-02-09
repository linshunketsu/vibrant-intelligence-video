import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { easing, timing } from "../styles/theme";
import { WaveDottedBackground } from "./WaveDottedBackground";

interface SceneTransitionProps {
  children: React.ReactNode;
  enterDuration?: number;
  exitDuration?: number;
  breathDuration?: number; // Frames where only background is visible between scenes
  fastEntrance?: boolean; // For "One More Thing" rapid-fire features - faster entrance (~10 frames)
  entranceDelay?: number; // Delay before entrance animation starts (frames)
}

/**
 * SceneTransition - Universal wrapper for every scene
 *
 * Motion Design Philosophy:
 * - ENTER: Content scales from 0.95→1.0, opacity 0→1, translateY 20px→0
 * - HOLD: Content stays fully visible and static (the "breathing room")
 * - EXIT: Content scales 1.0→0.97, opacity 1→0
 * - BREATH: Between scenes, dotted background is briefly visible alone
 *
 * Uses consistent bezier(0.4, 0, 0.2, 1) easing throughout
 */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  enterDuration = timing.transition.scale, // 21 frames default
  exitDuration = timing.transition.fade, // 15 frames default
  breathDuration = 8, // 8 frames of just background between scenes
  fastEntrance = false,
  entranceDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Faster entrance for "One More Thing" rapid-fire features
  const actualEnterDuration = fastEntrance ? 10 : enterDuration;

  // Calculate the "hold" period - when content is fully visible
  const totalTransitionTime = entranceDelay + actualEnterDuration + breathDuration + exitDuration;
  const holdDuration = Math.max(0, durationInFrames - totalTransitionTime);

  // ENTER: frames entranceDelay to entranceDelay + actualEnterDuration
  const adjustedFrame = frame - entranceDelay;
  const actualEnterProgress = interpolate(
    Math.min(Math.max(adjustedFrame, 0), actualEnterDuration),
    [0, actualEnterDuration],
    [0, 1],
    {
      easing: Easing.bezier(...easing.material),
    }
  );

  // EXIT: last exitDuration frames
  const exitStartFrame = durationInFrames - exitDuration - breathDuration;
  const exitProgress = interpolate(
    Math.max(frame - exitStartFrame, 0),
    [0, exitDuration],
    [0, 1],
    {
      easing: Easing.bezier(...easing.material),
      extrapolateRight: "clamp",
    }
  );

  // Combine animations with proper "hold" in middle
  let opacity = 1;
  let scale = 1;
  let translateY = 0;
  let showContent = true;

  if (adjustedFrame < 0) {
    // Before entrance delay - hide content
    showContent = false;
  } else if (adjustedFrame < actualEnterDuration) {
    // Entering
    opacity = actualEnterProgress;
    scale = interpolate(actualEnterProgress, [0, 1], [0.95, 1]);
    translateY = interpolate(actualEnterProgress, [0, 1], [20, 0]);
  } else if (frame > exitStartFrame && frame <= exitStartFrame + exitDuration) {
    // Exiting (fade out phase)
    opacity = 1 - exitProgress;
    scale = interpolate(exitProgress, [0, 1], [1, 0.97]);
  } else if (frame > exitStartFrame + exitDuration) {
    // Breath phase (only background visible - content hidden)
    showContent = false;
  }
  // Else: HOLD period - content fully visible, no animation

  return (
    <WaveDottedBackground>
      {showContent && (
        <AbsoluteFill
          style={{
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`,
            transformOrigin: "center",
            overflow: "visible", // Allow carousel side slides to be fully visible
          }}
        >
          {children}
        </AbsoluteFill>
      )}
    </WaveDottedBackground>
  );
};
