import React from "react";
import {
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { easing, timing, theme } from "../styles/theme";

interface WordStaggerProps {
  text: string;
  delay?: number; // Frames before first word appears
  wordDuration?: number; // Frames per word animation (default: 10)
  staggerDelay?: number; // Frames between words (default: 3)
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
}

/**
 * WordStagger - For title cards (intro, "One More Thing", transitions)
 *
 * Creates the "Turn Your Best Session Into a Skill" effect from the Manus video
 *
 * Animation:
 * - Each word in the title enters with a stagger delay
 * - Each word: translateY 20px→0, opacity 0→1, over ~10 frames
 * - Stagger delay: ~3 frames between words
 * - Results in a cascading, rhythmic text reveal
 *
 * Used for:
 * - Intro title cards
 * - Section transitions
 * - "One More Thing" style reveals
 * - Feature headers when emphasis is needed
 */
export const WordStagger: React.FC<WordStaggerProps> = ({
  text,
  delay = 0,
  wordDuration = 10,
  staggerDelay = 3,
  fontSize = 64,
  fontWeight = 700,
  color = theme.colors.text,
  fontFamily = theme.fonts.heading,
  textAlign = "center",
  lineHeight = 1.2,
}) => {
  const frame = useCurrentFrame();

  // Split text into words while preserving structure
  const words = text.split(/\s+/);

  // Calculate animation for each word
  const renderWords = () => {
    return words.map((word, index) => {
      const wordDelay = delay + index * staggerDelay;
      const startFrame = wordDelay;
      const endFrame = startFrame + wordDuration;

      // Calculate progress for this word
      let progress = 0;
      if (frame >= startFrame) {
        progress = Math.min((frame - startFrame) / wordDuration, 1);
      }

      // Apply easing
      const easedProgress = interpolate(progress, [0, 1], [0, 1], {
        easing: Easing.bezier(...easing.material),
        extrapolateRight: "clamp",
      });

      // Animate: translateY 20px→0, opacity 0→1
      const translateY = interpolate(easedProgress, [0, 1], [20, 0]);
      const opacity = easedProgress;

      // Slight scale for polish
      const scale = interpolate(easedProgress, [0, 1], [0.95, 1]);

      return (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            whiteSpace: "pre",
            // Add margin between words, but not after last word
            marginRight: index < words.length - 1 ? "0.3em" : 0,
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily,
        textAlign,
        lineHeight,
        // Wrap text but maintain word boundaries
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {renderWords()}
    </div>
  );
};
