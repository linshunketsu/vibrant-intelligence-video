import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
} from "remotion";
import { easing, timing, theme } from "../styles/theme";

interface CarouselItem {
  image: string;
  alt?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  slideDuration?: number; // Frames per slide
  transitionDuration?: number; // Frames for slide transition
  centerCardWidth?: number; // Percentage of viewport (60-65)
  sidePeekWidth?: number; // Percentage of viewport (15)
}

/**
 * Carousel - Hero animation component for multi-screenshot features
 *
 * Visual Design:
 * - Fixed heading text stays at TOP, never moves
 * - Center card: ~60-65% viewport width, full opacity, full scale, with shadow
 * - Left peek: ~15% visible at left edge, opacity 0.4, scale 0.9
 * - Right peek: ~15% visible at right edge, opacity 0.4, scale 0.9
 * - Smooth horizontal translateX for slide transitions
 * - Pagination dots below showing current slide
 *
 * Used for features with 3+ screenshots
 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  slideDuration = 90, // 3 seconds per slide @ 30fps
  transitionDuration = 18, // 0.6 second transitions
  centerCardWidth = 62, // 62% of viewport
  sidePeekWidth = 16, // 16% of viewport
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (items.length === 0) return null;

  // Calculate total cycles we can fit
  const totalCycleTime = slideDuration + transitionDuration;
  const totalSlides = items.length;
  const maxSlidesPossible = Math.floor(durationInFrames / totalCycleTime);

  // Calculate current slide index based on frame
  const currentSlideIndex = Math.min(
    Math.floor(frame / totalCycleTime),
    totalSlides - 1
  );

  // Progress within current slide (0 to 1)
  const frameInCycle = frame % totalCycleTime;
  const slideProgress = Math.min(frameInCycle / transitionDuration, 1);

  // Calculate if we're in transition or holding
  const isTransitioning = frameInCycle >= slideDuration;

  // Calculate offset for sliding animation
  const getSlideOffset = (index: number) => {
    // Base position: 0 for current, -1 for left, 1 for right
    const relativePosition = index - currentSlideIndex;

    if (!isTransitioning) {
      // Hold phase: cards are static
      return relativePosition * 100;
    }

    // During transition, interpolate to next position
    const nextIndex = Math.min(currentSlideIndex + 1, totalSlides - 1);
    const nextRelativePosition = index - nextIndex;

    return interpolate(
      slideProgress,
      [0, 1],
      [relativePosition * 100, nextRelativePosition * 100],
      {
        easing: Easing.bezier(...easing.material),
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }
    );
  };

  // Calculate style for each card based on position
  const getCardStyle = (index: number) => {
    const relativePosition = index - currentSlideIndex;
    const isCurrent = relativePosition === 0;
    const isLeft = relativePosition === -1 || (isTransitioning && relativePosition === 1 && currentSlideIndex > 0);
    const isRight = relativePosition === 1 || (isTransitioning && relativePosition === -1);

    let opacity = 0;
    let scale = 1;
    let xOffset = 0;
    let visible = true;

    if (isCurrent) {
      // Center card (or transitioning to center)
      opacity = 1;
      scale = 1;
      xOffset = 0;
    } else if (relativePosition < 0 || (isTransitioning && index > currentSlideIndex)) {
      // Left peek
      visible = true;
      opacity = 0.4;
      scale = 0.9;
      xOffset = -50; // Move left
    } else {
      // Right peek
      visible = true;
      opacity = 0.4;
      scale = 0.9;
      xOffset = 50; // Move right
    }

    return { opacity, scale, xOffset, visible };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Carousel Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.map((item, index) => {
          const { opacity, scale, xOffset, visible } = getCardStyle(index);

          if (!visible) return null;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: `${centerCardWidth}%`,
                height: "100%",
                opacity,
                transform: `translateX(${xOffset}%) scale(${scale})`,
                transition: "none", // Remotion handles all animations
              }}
            >
              {/* Screenshot Card with minimal browser chrome */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: theme.colors.card,
                  borderRadius: theme.borderRadius.card,
                  overflow: "hidden",
                  boxShadow: `0 20px 60px ${theme.colors.cardShadow}`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Minimal browser chrome */}
                <div
                  style={{
                    height: 20,
                    backgroundColor: "#F1F5F9",
                    borderBottom: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 10,
                      display: "flex",
                      gap: 5,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#28C840" }} />
                  </div>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 3,
                      padding: "1px 8px",
                      fontSize: 8,
                      color: "#64748B",
                      fontFamily: theme.fonts.body,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    vibrantintelligence.com
                  </div>
                </div>
                {/* Screenshot */}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.alt || `Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 32,
        }}
      >
        {items.map((_, index) => {
          const isActive = index === currentSlideIndex;
          const dotScale = isActive ? 1.2 : 1;
          const dotOpacity = isActive ? 1 : 0.3;

          return (
            <div
              key={index}
              style={{
                width: 8 * dotScale,
                height: 8 * dotScale,
                borderRadius: "50%",
                backgroundColor: theme.colors.accent,
                opacity: dotOpacity,
                transition: "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
