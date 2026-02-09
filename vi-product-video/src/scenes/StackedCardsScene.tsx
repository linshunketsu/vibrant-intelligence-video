import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { easing, theme } from "../styles/theme";
import { WordStagger } from "../components/WordStagger";

// Screenshot imports for the stacked cards
import chatInbox from "../assets/screenshots/chat-multichannel-inbox.png";
import healthOverview from "../assets/screenshots/health-tab-overview.png";
import calendarClinic from "../assets/screenshots/calendar-clinic-view.png";
import pegboardPanel from "../assets/screenshots/pegboard-panel.png";
import quickBar from "../assets/screenshots/quick-actions-bar.png";
import encounterEditor from "../assets/screenshots/encounter-note-editor.png";
import workflowOverview from "../assets/screenshots/workflow-builder-overview.png";
import formComponents from "../assets/screenshots/form-builder-components.png";
import practiceDashboard from "../assets/screenshots/practice-dashboard.png";
import encounterCollaborate from "../assets/screenshots/encounter-collaborate.png";
import encounterSign from "../assets/screenshots/encounter-sign.png";
import approvalCenter from "../assets/screenshots/approval-center.png";
import composerInterface from "../assets/screenshots/composer-interface.png";

/**
 * StackedCardsScene - "One Platform, Everything You Need" summary
 *
 * Duration: 150 frames (5 seconds)
 *
 * Cards fly from the camera (bottom of screen) towards their stack positions
 * They start very large (close to camera) and scale down as they move away into the stack
 *
 * Timeline:
 * - 0-5: Headline words start staggering in
 * - 5-50: Cards stack one by one (7 cards, every 6 frames)
 * - 50-150: Hold - OutroScene slides up to replace this scene
 *
 * Voiceover timing:
 * - Frame 20: "That's Vibrant Intelligence." (50 frames, ends at 70)
 * - Frame 60: "Everything you need." (38 frames, ends at 98)
 */
export const StackedCardsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 7 key feature screenshots (most important features only)
  const featureScreenshots = [
    chatInbox,       // Appears first - lands at top (farthest) - Unified communication
    healthOverview,  // Patient context
    calendarClinic,  // Scheduling
    encounterEditor, // Encounter notes
    workflowOverview,// Workflows + AI
    practiceDashboard,// Practice dashboard
    composerInterface, // Appears last - stacks at bottom (closest) - AI Composer
  ];

  // Animation timings
  const cardStartFrame = 5;
  const cardsPerCard = 6; // Cards stack every 6 frames (7 cards × 6 = 42 frames, done by frame 47)
  const cardAnimDuration = 14; // Each card takes 14 frames to animate in

  // Card dimensions - smaller to avoid blocking headline text
  const cardWidth = 550;
  const cardHeight = 309; // 16:9 ratio

  // Overall stack opacity fade in
  const stackOpacity = interpolate(Math.min(frame / 8, 1), [0, 1], [0, 1]);

  // Calculate vertical spacing - cards stacked downward
  const verticalSpacing = 18; // Space between cards
  const stackStartTop = 420; // Where the stack starts - moved down to not block headline

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Dotted background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${theme.colors.dotGrid} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Headline container - top 25% */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <WordStagger
          text="One Platform"
          delay={0}
          wordDuration={8}
          staggerDelay={2}
          fontSize={80}
          fontWeight={800}
          color={theme.colors.accent}
          letterSpacing="-0.02em"
        />
        <WordStagger
          text="Everything You Need"
          delay={3}
          wordDuration={8}
          staggerDelay={2}
          fontSize={64}
          fontWeight={700}
          color={theme.colors.text}
          letterSpacing="-0.02em"
        />
      </div>

      {/* Stacked cards container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: stackOpacity,
          perspective: "1200px",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Stack container - positioned so stack grows toward bottom */}
        <div
          style={{
            position: "absolute",
            top: stackStartTop,
            left: "50%",
            transform: "translateX(-50%)",
            width: cardWidth,
            height: "100%",
          }}
        >
          {/* Render all cards - flying from camera, stacking top to bottom */}
          {featureScreenshots.map((screenshot, index) => {
            // Calculate animation timing for this card
            const thisCardStartFrame = cardStartFrame + (index * cardsPerCard);

            // Calculate this card's animation progress
            let cardProgress = 0;
            if (frame >= thisCardStartFrame) {
              cardProgress = Math.min((frame - thisCardStartFrame) / cardAnimDuration, 1);
            }

            // Smooth easing - no overshoot, direct approach to final size
            const easedCard = interpolate(cardProgress, [0, 1], [0, 1], {
              easing: Easing.out(Easing.cubic),
            });

            // Stack position: first card at TOP (index 0 = farthest), subsequent cards stack BELOW
            // Stack grows downward from top
            const stackY = index * verticalSpacing;

            // Card flies FROM camera (below screen, very large) TO stack position
            // Higher index = lands LOWER on screen (closer to camera/viewer)
            const flyFromY = 900; // Start from below screen
            const yPosition = interpolate(easedCard, [0, 1], [flyFromY, stackY]);

            // Scale animation - starts very large (close to camera), ends at 100%
            const startScale = 4.0; // Starts large (close to camera)
            const endScale = 1.0; // All cards same size - flat stack
            const cardScale = interpolate(easedCard, [0, 1], [startScale, endScale]);

            // Opacity - fade in as it emerges from camera
            const cardOpacity = interpolate(Math.min(cardProgress * 2, 1), [0, 1], [0, 1]);

            // Z-index - higher index = on top (last card shows on top)
            const zIndex = index;

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: cardWidth,
                  height: cardHeight,
                  // Apply transform: Y position and scale
                  transform: `translateY(${yPosition}px) scale(${cardScale})`,
                  transformOrigin: "center top",
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  boxShadow: `
                    0 2px 4px rgba(0, 0, 0, 0.08),
                    0 8px 16px rgba(0, 0, 0, 0.06),
                    0 16px 32px rgba(0, 0, 0, 0.04)
                  `,
                  overflow: "hidden",
                  opacity: cardOpacity,
                  zIndex,
                }}
              >
                <img
                  src={screenshot}
                  alt={`Feature ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
