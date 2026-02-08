import React from "react";
import {
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { easing, theme } from "../styles/theme";

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
  /**
   * Layout mode:
   * - "centered": Shows 3 slides at once (prev, center, next) with center being full size
   * - "single": Original single slide view (one at a time)
   */
  layoutMode?: "centered" | "single";
}

/**
 * Carousel - Hero animation component for multi-screenshot features
 *
 * Visual Design (centered mode):
 * - Shows 3 slides simultaneously: prev (left), center (full), next (right)
 * - Center slide: Full size (1x scale), full opacity (1), no blur
 * - Side slides: Scaled down (0.7x), dimmed (0.5 opacity), blurred (6px)
 * - Smooth spring-based transitions as slides move between positions
 * - Pagination dots below showing current slide
 *
 * Visual Design (single mode):
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
  transitionDuration = 24, // 0.8 second transitions (slightly longer for smoother motion)
  centerCardWidth = 75, // 75% of viewport for centered card (larger for better readability)
  sidePeekWidth = 15, // 15% of viewport for side peek
  layoutMode = "centered",
}) => {
  const frame = useCurrentFrame();

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
          <SlideCard item={items[0]} scale={1} opacity={1} blur={0} dimAmount={0} />
        </div>
      </div>
    );
  }

  const totalCycleTime = slideDuration + transitionDuration;
  const totalSlides = items.length;

  // Calculate current slide index
  const totalCarouselTime = totalSlides * totalCycleTime;
  const currentSlideIndex = frame < totalCarouselTime
    ? Math.floor(frame / totalCycleTime)
    : totalSlides - 1;

  // Calculate progress through the transition (0 = at start of slide, 1 = at end of transition)
  const frameInCycle = frame % totalCycleTime;
  const transitionProgress = frameInCycle >= slideDuration
    ? (frameInCycle - slideDuration) / transitionDuration
    : 0;

  // Use centered mode with 3-slide layout
  if (layoutMode === "centered") {
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
        {/* Carousel Container - wider to accommodate side slides */}
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
            const relativePosition = getRelativePosition(index, currentSlideIndex, totalSlides, transitionProgress);

            // Skip rendering if slide is too far away
            if (relativePosition === null) return null;

            const { xPercent, scale, opacity, blur, zIndex } = relativePosition;

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  width: `${centerCardWidth}%`,
                  height: "100%",
                  transform: `translateX(${xPercent}%) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  zIndex,
                  transition: "none", // Remotion handles animations via frame-based interpolation
                }}
              >
                <SlideCard item={item} scale={scale} opacity={1} blur={blur} dimAmount={(1 - opacity) * 1.2} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Original single-slide mode (for backward compatibility)
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
        {items.map((item, index) => {
          const slideStartFrame = index * totalCycleTime;
          const slideEndFrame = slideStartFrame + slideDuration;
          const transitionEndFrame = slideStartFrame + totalCycleTime;
          const isLastSlide = index === items.length - 1;

          if (frame < slideStartFrame || (!isLastSlide && frame >= transitionEndFrame)) {
            return null;
          }

          let opacity = 1;
          let scale = 1;

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
          } else if (frame >= slideEndFrame && !isLastSlide) {
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
              <SlideCard item={item} scale={scale} opacity={1} blur={0} dimAmount={0} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Calculate the position, scale, opacity, and blur for a slide based on its
 * relationship to the current slide index and transition progress.
 */
function getRelativePosition(
  index: number,
  currentIndex: number,
  totalSlides: number,
  transitionProgress: number
): { xPercent: number; scale: number; opacity: number; blur: number; zIndex: number } | null {
  // Handle wrap-around for circular navigation
  const getWrappedIndex = (idx: number, max: number) => ((idx % max) + max) % max;

  // Distance from current index (can be negative)
  let distance = index - currentIndex;

  // Handle wrap-around distances
  if (distance > totalSlides / 2) distance -= totalSlides;
  if (distance < -totalSlides / 2) distance += totalSlides;

  // During transition, slides interpolate between their positions
  // If transitioning forward, currentIndex moves toward currentIndex + 1
  // So the "center" position interpolates from currentIndex to currentIndex + 1
  const isTransitioning = transitionProgress > 0;

  if (!isTransitioning) {
    // Static state - no transition in progress
    if (distance === 0) {
      // Center slide
      return { xPercent: 0, scale: 1.1, opacity: 1, blur: 0, zIndex: 10 };
    } else if (distance === -1 || (distance === totalSlides - 1 && totalSlides > 2)) {
      // Previous slide (left side)
      return { xPercent: -100, scale: 0.75, opacity: 0.4, blur: 2, zIndex: 5 };
    } else if (distance === 1 || (distance === -(totalSlides - 1) && totalSlides > 2)) {
      // Next slide (right side)
      return { xPercent: 100, scale: 0.75, opacity: 0.4, blur: 2, zIndex: 5 };
    }
    return null; // Too far away, don't render
  }

  // Transition state - interpolate positions
  // When transitioning, the "center" moves from currentIndex to currentIndex + 1
  // So we need to interpolate each slide's position

  // Use spring easing for smooth motion
  const easedProgress = interpolate(transitionProgress, [0, 1], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  if (distance === 0) {
    // Current slide - moving from center to left
    return {
      xPercent: interpolate(easedProgress, [0, 1], [0, -100]),
      scale: interpolate(easedProgress, [0, 1], [1.1, 0.75]),
      opacity: interpolate(easedProgress, [0, 1], [1, 0.4]),
      blur: interpolate(easedProgress, [0, 1], [0, 2]),
      zIndex: 10,
    };
  } else if (distance === 1 || (distance === -(totalSlides - 1) && totalSlides > 2)) {
    // Next slide - moving from right to center
    return {
      xPercent: interpolate(easedProgress, [0, 1], [100, 0]),
      scale: interpolate(easedProgress, [0, 1], [0.75, 1.1]),
      opacity: interpolate(easedProgress, [0, 1], [0.4, 1]),
      blur: interpolate(easedProgress, [0, 1], [2, 0]),
      zIndex: 10,
    };
  } else if (distance === -1 || (distance === totalSlides - 1 && totalSlides > 2)) {
    // Previous slide - moving from left to further left (exiting)
    const exitingX = interpolate(easedProgress, [0, 1], [-100, -140]);
    const exitingScale = interpolate(easedProgress, [0, 1], [0.75, 0.6]);
    const exitingOpacity = interpolate(easedProgress, [0, 1], [0.4, 0]);
    const exitingBlur = interpolate(easedProgress, [0, 1], [2, 6]);
    return {
      xPercent: exitingX,
      scale: exitingScale,
      opacity: exitingOpacity,
      blur: exitingBlur,
      zIndex: 3,
    };
  } else if (distance === 2 || (distance === -(totalSlides - 2) && totalSlides > 3)) {
    // Two steps ahead - entering from right
    const enteringX = interpolate(easedProgress, [0, 1], [140, 100]);
    const enteringScale = interpolate(easedProgress, [0, 1], [0.6, 0.75]);
    const enteringOpacity = interpolate(easedProgress, [0, 1], [0, 0.4]);
    const enteringBlur = interpolate(easedProgress, [0, 1], [6, 2]);
    return {
      xPercent: enteringX,
      scale: enteringScale,
      opacity: enteringOpacity,
      blur: enteringBlur,
      zIndex: 3,
    };
  }

  return null;
}

/**
 * SlideCard - Individual slide component with browser chrome
 */
const SlideCard: React.FC<{
  item: CarouselItem;
  scale: number;
  opacity: number;
  blur: number;
  dimAmount?: number; // 0 = no dim, 1 = fully dimmed (dark overlay)
}> = ({ item, scale, opacity, blur, dimAmount = 0 }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.card,
          overflow: "hidden",
          boxShadow: `0 20px 60px ${theme.colors.cardShadow}`,
          display: "flex",
          flexDirection: "column",
          // Auto height based on content
          height: "auto",
          width: "100%",
          maxHeight: "100%",
          position: "relative",
        }}
      >
        {/* Dark overlay for side slides - positioned BEFORE chrome so chrome goes on top */}
        {dimAmount > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#000",
              opacity: Math.min(dimAmount * 0.5, 0.75),
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        )}
        {/* Minimal browser chrome */}
        <div
          style={{
            height: 28,
            backgroundColor: "#F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 1,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 12,
              display: "flex",
              gap: 6,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28C840" }} />
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              padding: "2px 10px",
              fontSize: 11,
              color: "#64748B",
              fontFamily: theme.fonts.body,
              border: "1px solid #E2E8F0",
            }}
          >
            vibrantintelligence.com
          </div>
        </div>
        {/* Screenshot - full width, auto height */}
        <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
          <img
            src={item.image}
            alt={item.alt || "Slide"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
