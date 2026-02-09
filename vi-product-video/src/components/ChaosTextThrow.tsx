import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";

interface ChaosCard {
  text: string;
  color: string;
  // Random properties calculated once
  startAngle: number;
  startDistance: number;
  rotation: number;
  delay: number;
  endX: number; // Final position X (%)
  endY: number; // Final position Y (%)
}

/**
 * ChaosTextThrow - Chaotic card throw animation for intro scene
 *
 * Shows 25 real-world practice management tasks being "thrown" onto screen
 * to depict the messiness/overwhelm of running a modern practice.
 *
 * Animation:
 * - Cards fly in rapidly from random off-screen positions
 * - One-by-one rapid-fire sequence (8-12 frames between cards)
 * - Aggressive throw with fast entrance and snappy deceleration
 * - Cards pile up chaotically - NO floating drift
 * - Continuous cross-out line starts at local frame 240 (global 380)
 * - Single hand-drawn line crosses through cards across the screen
 * - Styled as badges/pills with white background and shadow
 */
export const ChaosTextThrow: React.FC<{
  startFrame?: number;
  duration?: number;
  crossOutStartFrame?: number;
}> = ({
  startFrame = 140,
  duration = 340,
  crossOutStartFrame = 240
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  // Define 25 chaos cards with real-world practice management tasks
  const cards = useMemo<ChaosCard[]>(() => {
    const cardList: Omit<ChaosCard, "startAngle" | "startDistance" | "rotation" | "delay">[] = [
      // Patient Care
      { text: "prior authorizations", color: theme.colors.accent, endX: 20, endY: 25 },
      { text: "referrals", color: theme.colors.accentLight, endX: 75, endY: 20 },
      { text: "lab results", color: theme.colors.accent, endX: 35, endY: 75 },
      { text: "prescriptions", color: theme.colors.textSecondary, endX: 80, endY: 70 },
      { text: "patient messages", color: theme.colors.accentLight, endX: 50, endY: 45 },

      // Scheduling
      { text: "appointment reminders", color: theme.colors.accent, endX: 15, endY: 40 },
      { text: "cancelations", color: theme.colors.textSecondary, endX: 85, endY: 35 },
      { text: "rescheduling", color: theme.colors.accentLight, endX: 25, endY: 80 },
      { text: "waitlist", color: theme.colors.accent, endX: 70, endY: 15 },
      { text: "no-shows", color: theme.colors.textSecondary, endX: 60, endY: 85 },

      // Communication
      { text: "phone calls", color: theme.colors.accent, endX: 40, endY: 60 },
      { text: "emails", color: theme.colors.accentLight, endX: 90, endY: 50 },
      { text: "fax requests", color: theme.colors.textSecondary, endX: 10, endY: 60 },
      { text: "patient portal", color: theme.colors.accent, endX: 55, endY: 25 },
      { text: "team chat", color: theme.colors.accentLight, endX: 30, endY: 10 },

      // Documentation
      { text: "chart notes", color: theme.colors.accent, endX: 65, endY: 55 },
      { text: "coding", color: theme.colors.textSecondary, endX: 12, endY: 88 },
      { text: "billing claims", color: theme.colors.accentLight, endX: 88, endY: 82 },
      { text: "insurance verification", color: theme.colors.accent, endX: 45, endY: 30 },
      { text: "intake forms", color: theme.colors.textSecondary, endX: 78, endY: 45 },

      // Workflows
      { text: "follow-ups", color: theme.colors.accentLight, endX: 22, endY: 55 },
      { text: "task assignments", color: theme.colors.accent, endX: 58, endY: 68 },
      { text: "order tracking", color: theme.colors.textSecondary, endX: 82, endY: 28 },
      { text: "document signing", color: theme.colors.accentLight, endX: 38, endY: 92 },
      { text: "care plans", color: theme.colors.accent, endX: 68, endY: 78 },
    ];

    // Add random properties for chaos effect
    // Use deterministic seeding based on index for consistent rendering
    return cardList.map((card, index) => {
      const seed = index * 7321.4567;

      // Random angle (0 to 2π)
      const startAngle = (seed % 1) * Math.PI * 2;

      // Random distance (1000-1500px - ensures way off-screen)
      const startDistance = 1000 + ((seed * 2000) % 500);

      // More dramatic rotation (-45 to +45 degrees)
      const rotation = ((seed % 1) - 0.5) * 90;

      // Slower stagger to spread out the throwing over more time (8-12 frames between cards)
      const delay = index * 8 + Math.floor((seed % 1) * 4);

      return {
        ...card,
        startAngle,
        startDistance,
        rotation,
        delay,
      };
    });
  }, []);

  const renderCard = (card: ChaosCard, index: number) => {
    const cardStartFrame = card.delay;
    const throwDuration = 14; // Faster entrance - 14 frames

    // Skip if animation hasn't started
    if (localFrame < cardStartFrame) return null;
    if (localFrame < 0) return null;

    // Skip if past duration
    if (localFrame > duration) return null;

    // Calculate throw progress
    const throwProgress = Math.min(
      Math.max((localFrame - cardStartFrame) / throwDuration, 0),
      1
    );

    // Apply snappier easing for aggressive throw feel
    const easedProgress = interpolate(throwProgress, [0, 1], [0, 1], {
      easing: Easing.bezier(...easing.easeOut),
      extrapolateRight: "clamp",
    });

    // Calculate position - flying from off-screen toward final position
    const startX = 50 + Math.cos(card.startAngle) * 150; // % from center (further out)
    const startY = 50 + Math.sin(card.startAngle) * 150;

    // Current position (interpolated)
    const currentX = interpolate(easedProgress, [0, 1], [startX, card.endX]);
    const currentY = interpolate(easedProgress, [0, 1], [startY, card.endY]);

    // Rotation - starts dramatic, settles with some remaining tilt
    const currentRotation = interpolate(easedProgress, [0, 1], [card.rotation, card.rotation * 0.3]);

    // Scale - starts much larger for aggressive entrance
    const scale = interpolate(easedProgress, [0, 1], [1.8, 1]);

    // Opacity - quick fade in
    const opacity = interpolate(
      Math.min(throwProgress * 2, 1),
      [0, 1],
      [0, 1],
      { extrapolateRight: "clamp" }
    );

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `${currentX}%`,
          top: `${currentY}%`,
          transform: `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${scale})`,
          opacity,
          pointerEvents: "none",
        }}
      >
        {/* Badge/pill container - smaller for more cards */}
        <div
          style={{
            backgroundColor: theme.colors.card,
            padding: "10px 18px",
            borderRadius: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            border: `1px solid ${theme.colors.cardShadow}`,
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 28,
              fontWeight: 600,
              color: card.color,
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            {card.text}
          </span>
        </div>
      </div>
    );
  };

  // Cross-out line animation - calculate properly using global frame
  const crossOutGlobalStartFrame = startFrame + crossOutStartFrame; // 140 + 240 = 380
  const crossOutDuration = 100; // Frames to draw the full line

  // Calculate progress using global frame
  const crossOutProgress = Math.min(
    Math.max((frame - crossOutGlobalStartFrame) / crossOutDuration, 0),
    1
  );

  // Generate cross-out path - single continuous curved line from top to bottom
  const crossOutPath = useMemo(() => {
    // Curved path flowing from top to bottom (never goes back up)
    // Using cubic bezier curves for smooth flowing motion
    return `
      M 100,150
      C 250,180 350,160 450,220
      S 700,180 850,250
      S 1150,300 1250,380
      S 1500,350 1600,450
      S 1750,550 1550,600
      S 1250,650 1000,700
      S 700,750 550,800
      S 350,850 300,880
      S 700,920 1000,950
      S 1400,980 1700,1020
    `.trim().replace(/\s+/g, ' ');
  }, []);

  // Estimate path length (~10000 for this path)
  const pathLength = 10000;
  const strokeDashoffset = interpolate(crossOutProgress, [0, 1], [pathLength, 0]);

  // Opacity - fade in quickly
  const crossOutOpacity = interpolate(crossOutProgress, [0, 0.05], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out the entire container near end of duration (last 30 frames)
  const containerOpacity = interpolate(
    localFrame,
    [duration - 30, duration],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        overflow: "hidden",
      }}
    >
      {cards.map((card, index) => renderCard(card, index))}

      {/* Continuous cross-out line overlay */}
      {frame >= crossOutGlobalStartFrame && (
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: crossOutOpacity,
          }}
          viewBox="0 0 1920 1080"
        >
          <path
            d={crossOutPath}
            fill="none"
            stroke="#EF4444"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      )}
    </AbsoluteFill>
  );
};
