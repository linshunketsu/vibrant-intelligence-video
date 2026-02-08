import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { easing, theme } from "../styles/theme";

interface FeatureLabelProps {
  text: string;
  delay?: number;
  duration?: number;
  fontSize?: number;
}

/**
 * FeatureLabel - Styled pill/badge showing feature category
 * Accent blue (#00436E) background with white text
 */
export const FeatureLabel: React.FC<FeatureLabelProps> = ({
  text,
  delay = 0,
  duration = 12,
  fontSize = 16,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    Math.min(Math.max(frame - delay, 0), duration),
    [0, duration],
    [0, 1],
    {
      easing: Easing.bezier(...easing.material),
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(progress, [0, 1], [-8, 0]);
  const opacity = progress;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        backgroundColor: theme.colors.accent,
        color: theme.colors.card,
        fontSize,
        fontWeight: 500,
        borderRadius: theme.borderRadius.button,
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: theme.fonts.body,
        letterSpacing: 0.2,
      }}
    >
      {text}
    </div>
  );
};
