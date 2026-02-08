import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../styles/theme";

/**
 * WaveDottedBackground - Dotted background with flowing wave animation
 *
 * Creates a true wave effect where dots ripple across the screen like waves.
 * Uses SVG with individual circle elements where each dot's opacity animates
 * based on a wave function of its position.
 *
 * This creates the "filling in and disappearing" effect: dots at different
 * positions fade in/out at different times, creating an organic flowing wave.
 */
export const WaveDottedBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const frame = useCurrentFrame();

  // Wave parameters
  const waveSpeed = 0.05; // How fast the wave moves (increased for more obvious animation)
  const waveFrequency = 0.1; // How close together wave peaks are (higher = smaller troughs)
  const waveAmplitude = 0.6; // How dramatic the opacity change is (increased for more contrast)

  // Generate all dots with their calculated opacity
  const dots = generateWaveDots(frame, waveSpeed, waveFrequency, waveAmplitude);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.background,
        position: "relative",
        overflow: "visible",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        {dots}
      </svg>
      {children}
    </AbsoluteFill>
  );
};

/**
 * Generate SVG circle elements with wave-based opacity
 *
 * Each dot's opacity is calculated based on:
 * - Its position (x, y) - creates spatial variation
 * - Current frame - creates temporal animation
 * - Multiple overlapping sine waves - creates organic, non-repeating pattern
 */
function generateWaveDots(
  frame: number,
  speed: number,
  frequency: number,
  amplitude: number
): React.ReactNode {
  const dots: React.ReactNode[] = [];

  // Grid spacing
  const spacing = 20;
  const dotRadius = 1.2; // Slightly larger dots for more visibility

  // Cover the entire viewport with some buffer
  const cols = Math.ceil(1920 / spacing) + 4;
  const rows = Math.ceil(1080 / spacing) + 4;

  for (let row = -2; row < rows; row++) {
    for (let col = -2; col < cols; col++) {
      const x = col * spacing;
      const y = row * spacing;

      // Calculate wave phase based on position AND time
      // This creates waves that move across the screen
      const phase1 = (col * frequency) + (row * frequency * 0.5) + (frame * speed);
      const phase2 = (col * frequency * 0.7) + (row * frequency * 0.3) + (frame * speed * 0.7);
      const phase3 = (col * frequency * 1.3) - (row * frequency * 0.4) + (frame * speed * 1.2);

      // Combine multiple sine waves for organic, non-uniform motion
      const waveValue =
        Math.sin(phase1) * 0.5 +
        Math.sin(phase2) * 0.3 +
        Math.sin(phase3) * 0.2;

      // Convert wave value (-1 to 1) to opacity (0.4 to 1.0)
      // Higher base opacity so troughs are still visible, peaks are fully solid
      const opacity = 0.4 + (waveValue + 1) * 0.5 * 0.6;

      // Scale varies with wave - peaks are larger and more solid
      const scale = 0.85 + (waveValue + 1) * 0.5 * 0.3;

      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={x}
          cy={y}
          r={dotRadius * scale}
          fill={theme.colors.dotGrid}
          opacity={opacity}
        />
      );
    }
  }

  return dots;
}
