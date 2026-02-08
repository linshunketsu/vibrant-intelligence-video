import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { WordStagger } from "../components/WordStagger";
import { easing, theme } from "../styles/theme";

interface SectionTitleSceneProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  enterDuration?: number;
  exitDuration?: number;
  dramatic?: boolean; // For "One More Thing..." style
  useWordStagger?: boolean; // Use WordStagger animation for title (default true)
}

/**
 * SectionTitleScene - Reusable section transition/title card
 *
 * Used for transitions like "One More Thing..." and "Coming Soon".
 * Features flow directly into each other with crossfades.
 *
 * Props:
 * - title: Large bold text (72px), VI dark blue
 * - subtitle: Optional gray text below (24px)
 * - icon: Optional React node above title
 * - enterDuration: Fade-in duration (default 15, 25 for dramatic)
 * - exitDuration: Fade-out duration (default 10)
 * - dramatic: Enables Apple keynote-style slower entrance
 * - useWordStagger: Use WordStagger animation for title (default true)
 *
 * Duration: ~90 frames (3 seconds) — fast and punchy
 */
export const SectionTitleScene: React.FC<SectionTitleSceneProps> = ({
  title,
  subtitle,
  icon,
  enterDuration = 15,
  exitDuration = 10,
  dramatic = false,
  useWordStagger = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Adjust timing for dramatic effect
  const actualEnterDuration = dramatic ? 25 : enterDuration;

  // Entrance animation (first actualEnterDuration frames)
  const enterProgress = interpolate(
    Math.min(frame, actualEnterDuration),
    [0, actualEnterDuration],
    [0, 1],
    {
      easing: Easing.bezier(...easing.material),
    }
  );

  // Exit animation (last exitDuration frames)
  const exitStartFrame = durationInFrames - exitDuration;
  const exitProgress = interpolate(
    Math.max(frame - exitStartFrame, 0),
    [0, exitDuration],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateRight: "clamp",
    }
  );

  // Combine animations
  let opacity = 1;
  let scale = 1;

  if (frame < actualEnterDuration) {
    // Entering
    opacity = enterProgress;
    scale = interpolate(enterProgress, [0, 1], [0.95, 1], {
      easing: Easing.bezier(...easing.material),
    });
  } else if (frame > exitStartFrame) {
    // Exiting
    opacity = 1 - exitProgress;
    scale = 1;
  }

  // For dramatic effect, add subtle slide up (only when not using WordStagger)
  const translateY = !useWordStagger && dramatic
    ? interpolate(enterProgress, [0, 1], [30, 0], {
        easing: Easing.bezier(...easing.material),
        extrapolateRight: "clamp",
      })
    : 0;

  // Dramatic style tweaks
  const titleStyle = dramatic
    ? {
        fontSize: 84,
        fontWeight: 600 as const,
        fontStyle: "italic" as const,
      }
    : {
        fontSize: theme.fontSizes.sectionTitle,
        fontWeight: 700 as const,
        fontStyle: "normal" as const,
      };

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <DottedBackground>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity,
            transform: `scale(${scale})${translateY ? ` translateY(${translateY}px)` : ""}`,
          }}
        >
          {/* Optional icon */}
          {icon && (
            <div
              style={{
                marginBottom: 24,
                opacity: enterProgress,
              }}
            >
              {icon}
            </div>
          )}

          {/* Title - with WordStagger animation or plain */}
          {useWordStagger ? (
            <WordStagger
              text={title}
              delay={dramatic ? 5 : 0}
              wordDuration={dramatic ? 12 : 10}
              staggerDelay={dramatic ? 4 : 3}
              fontSize={titleStyle.fontSize}
              fontWeight={titleStyle.fontWeight}
              color={theme.colors.accent}
              fontFamily={theme.fonts.heading}
              textAlign="center"
            />
          ) : (
            <div
              style={{
                ...titleStyle,
                color: theme.colors.accent,
                fontFamily: theme.fonts.heading,
                letterSpacing: dramatic ? "-0.01em" : "-0.02em",
                textAlign: "center",
              }}
            >
              {title}
            </div>
          )}

          {/* Optional subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: theme.fontSizes.featureSubtitle,
                color: theme.colors.textSecondary,
                marginTop: 24,
                fontFamily: theme.fonts.body,
                opacity: interpolate(frame, [actualEnterDuration, actualEnterDuration + 10], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {subtitle}
            </div>
          )}
        </AbsoluteFill>
      </DottedBackground>
    </AbsoluteFill>
  );
};
