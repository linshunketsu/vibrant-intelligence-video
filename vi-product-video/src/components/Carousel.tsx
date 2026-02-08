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
 * - Shows one slide at a time, cleanly fading between slides
 * - No overlapping cards during transition
 * - Smooth fade transition: current fades out as next fades in
 * - Pagination dots below showing current slide
 *
 * Used for features with 3+ screenshots
 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  slideDuration = 90, // 3 seconds per slide @ 30fps
  transitionDuration = 18, // 0.6 second transitions
  centerCardWidth = 85, // 85% of viewport - larger for readability
  sidePeekWidth = 8, // 8% of viewport - smaller side peek
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (items.length === 0) return null;
  if (items.length === 1) {
    // Single item - just display it
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
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SlideCard item={items[0]} centerCardWidth={centerCardWidth} />
        </div>
      </div>
    );
  }

  const totalCycleTime = slideDuration + transitionDuration;
  const totalSlides = items.length;

  // Calculate current slide index
  // After all slides are shown, hold on the last slide
  const totalCarouselTime = totalSlides * totalCycleTime;
  const currentSlideIndex = frame < totalCarouselTime
    ? Math.floor(frame / totalCycleTime)
    : totalSlides - 1; // Hold on last slide after carousel completes

  const frameInCycle = frame % totalCycleTime;

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
          height: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.map((item, index) => {
          // Each slide is visible during its cycle
          const slideStartFrame = index * totalCycleTime;
          const slideEndFrame = slideStartFrame + slideDuration;
          const transitionEndFrame = slideStartFrame + totalCycleTime;

          // For the last slide, keep it visible after the carousel completes
          const isLastSlide = index === items.length - 1;

          // Not visible at all
          // Last slide stays visible from its start until end of scene
          // Other slides are only visible during their cycle
          if (frame < slideStartFrame || (!isLastSlide && frame >= transitionEndFrame)) {
            return null;
          }

          let opacity = 1;
          let scale = 1;

          // Fade in at start
          if (frame < slideStartFrame + 10) {
            opacity = interpolate(
              frame - slideStartFrame,
              [0, 10],
              [0, 1],
              { easing: Easing.bezier(...easing.material), extrapolateRight: "clamp" }
            );
            scale = interpolate(
              frame - slideStartFrame,
              [0, 10],
              [0.97, 1],
              { easing: Easing.bezier(...easing.material), extrapolateRight: "clamp" }
            );
          }
          // Fade out at end (during transition period)
          // Last slide NEVER fades out, others fade normally
          else if (frame >= slideEndFrame && !isLastSlide) {
            const framesIntoTransition = frame - slideEndFrame;
            opacity = interpolate(
              framesIntoTransition,
              [0, transitionDuration],
              [1, 0],
              { easing: Easing.bezier(...easing.material) }
            );
            scale = interpolate(
              framesIntoTransition,
              [0, transitionDuration],
              [1, 1.03],
              { easing: Easing.bezier(...easing.material) }
            );
          }

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: `${centerCardWidth}%`,
                height: "100%",
                opacity,
                transform: `scale(${scale})`,
                zIndex: index === currentSlideIndex ? 10 : 1,
              }}
            >
              <SlideCard item={item} centerCardWidth={centerCardWidth} />
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
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 * SlideCard - Individual slide component with browser chrome
 */
const SlideCard: React.FC<{
  item: CarouselItem;
  centerCardWidth: number;
}> = ({ item, centerCardWidth }) => {
  return (
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
          height: 16,
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
          alt={item.alt || "Slide"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};
