import React from "react";
import { AbsoluteFill } from "remotion";
import { DottedBackground } from "../components/DottedBackground";
import { FeatureLabel } from "../components/FeatureLabel";
import { theme } from "../styles/theme";

interface ComposerSceneProps {
  screenshots: string[];
}

/**
 * ComposerScene - Finale scene with "Coming Soon" badge
 * 3:01 - 3:18 (510 frames, 17s)
 * Special treatment with glow effect
 */
export const ComposerScene: React.FC<ComposerSceneProps> = ({ screenshots }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      <DottedBackground>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
          }}
        >
          {/* Coming Soon Badge */}
          <div
            style={{
              padding: "8px 20px",
              backgroundColor: theme.colors.success,
              color: theme.colors.card,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: theme.borderRadius.button,
              fontFamily: theme.fonts.body,
              marginBottom: 24,
            }}
          >
            Coming Soon
          </div>

          <div
            style={{
              fontSize: theme.fontSizes.featureTitle,
              fontWeight: 700,
              color: theme.colors.text,
              marginBottom: 16,
              fontFamily: theme.fonts.heading,
            }}
          >
            AI Composer
          </div>

          <div
            style={{
              fontSize: theme.fontSizes.caption,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
            }}
          >
            {screenshots.length} screenshots with glow effect
          </div>

          {/* Screenshot preview cards with glow */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                style={{
                  width: 200,
                  height: 120,
                  backgroundColor: theme.colors.card,
                  borderRadius: theme.borderRadius.card,
                  boxShadow: `0 4px 24px ${theme.colors.cardShadow}, 0 0 40px ${theme.colors.accentLight}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.body,
                }}
              >
                {screenshot}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </DottedBackground>
    </AbsoluteFill>
  );
};
