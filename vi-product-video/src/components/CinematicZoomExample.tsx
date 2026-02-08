import React from "react";
import { Composition } from "remotion";
import { FeatureSceneWithCinematicZoom, HighlightZoom } from "./FeatureSceneWithCinematicZoom";
import { CinematicZoomHighlight, CinematicZoomFromPreset, TargetPosition } from "./CinematicZoomHighlight";

/**
 * Example compositions demonstrating the CinematicZoomHighlight component
 *
 * These examples show different ways to use the cinematic zoom effect:
 * 1. Using presets (subtle, dramatic, cinematic, snappy, spotlight)
 * 2. Using custom configuration
 * 3. Integrating with FeatureScene
 */

const EXAMPLE_SCREENSHOT = "https://placehold.co/1920x1080/1a1a2e/FFF?text=Product+Screenshot";

// ============================================================================
// EXAMPLE 1: Using Presets
// ============================================================================

export const PresetExample: React.FC = () => {
  return (
    <FeatureSceneWithCinematicZoom
      featureNumber={1}
      title="Preset: Dramatic"
      subtitle="Strong zoom with ring, vignette, and spotlight"
      screenshots={[EXAMPLE_SCREENSHOT]}
      highlightZoom={{
        x: 35,        // Target x position (percentage)
        y: 25,        // Target y position (percentage)
        preset: "dramatic",
        atFrame: 30,  // Start zoom at frame 30
      }}
    />
  );
};

export const PresetSubtle: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Preset: Subtle"
    subtitle="Gentle zoom for small UI elements"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 65,
      y: 40,
      preset: "subtle",
      atFrame: 25,
    }}
  />
);

export const PresetCinematic: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Preset: Cinematic"
    subtitle="Slow, smooth zoom for atmosphere"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 50,
      y: 50,
      preset: "cinematic",
      atFrame: 20,
    }}
  />
);

export const PresetSnappy: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Preset: Snappy"
    subtitle="Fast zoom for energy and quick transitions"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 70,
      y: 30,
      preset: "snappy",
      atFrame: 30,
    }}
  />
);

export const PresetSpotlight: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Preset: Spotlight"
    subtitle="Zoom with all cinematic effects enabled"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 40,
      y: 35,
      preset: "spotlight",
      atFrame: 25,
    }}
  />
);

// ============================================================================
// EXAMPLE 2: Custom Configuration
// ============================================================================

export const CustomZoomExample: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Custom Zoom"
    subtitle="Manually configured zoom parameters"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 60,
      y: 45,
      scale: 3.5,              // Custom zoom level
      atFrame: 30,
      duration: 40,            // Slower zoom in
      holdDuration: 90,        // Longer hold
      showRing: true,
      showVignette: true,
      showSpotlight: true,
      ringColor: "#FF6B6B",    // Custom ring color (red/pink)
    }}
  />
);

// ============================================================================
// EXAMPLE 3: Minimal Zoom (Ring Only)
// ============================================================================

export const MinimalZoomExample: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Minimal: Ring Only"
    subtitle="Just the highlight ring, no zoom"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 50,
      y: 50,
      scale: 1.0,              // No actual zoom
      atFrame: 30,
      duration: 20,
      holdDuration: 60,
      showRing: true,
      showVignette: false,
      showSpotlight: false,
    }}
  />
);

// ============================================================================
// EXAMPLE 4: Vignette Only (Subtle Focus)
// ============================================================================

export const VignetteOnlyExample: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Vignette Focus"
    subtitle="Subtle darkening around the target area"
    screenshots={[EXAMPLE_SCREENSHOT]}
    highlightZoom={{
      x: 50,
      y: 50,
      scale: 1.8,
      atFrame: 30,
      preset: "subtle",
      showRing: false,         // No ring
      showVignette: true,      // Just vignette
      showSpotlight: false,
    }}
  />
);

// ============================================================================
// EXAMPLE 5: Multiple Zooms in Sequence (Advanced)
// ============================================================================

/**
 * For multiple zooms in one scene, you can chain them by calculating
 * the timing. Here's an example pattern:
 */
export const SequentialZoomExample: React.FC = () => {
  // First zoom at frame 30, holds for 60 frames, zooms out for 24
  // = ends at frame 114, so start second zoom at ~120
  return (
    <FeatureSceneWithCinematicZoom
      title="Sequential Zooms"
      subtitle="Note: For true sequential zooms, use custom composition"
      screenshots={[EXAMPLE_SCREENSHOT]}
      highlightZoom={{
        x: 30,
        y: 30,
        preset: "cinematic",
        atFrame: 30,
      }}
    />
  );
};

// ============================================================================
// EXAMPLE 6: Direct CinematicZoomHighlight Usage
// ============================================================================

/**
 * You can also use CinematicZoomHighlight directly for complete control
 */
export const DirectZoomExample: React.FC = () => {
  const frame = 0; // This would come from useCurrentFrame() in a real component

  return (
    <CinematicZoomFromPreset
      preset="dramatic"
      target={{ x: 50, y: 50 }}
      atFrame={30}
    >
      {/* Your content here */}
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a2e",
        color: "white",
        fontSize: 48,
      }}>
        Your Content Here
      </div>
    </CinematicZoomFromPreset>
  );
};

// ============================================================================
// Composition Definitions (for Remotion Studio)
// ============================================================================

export const CinematicZoomExamples: React.FC = () => {
  return (
    <>
      <Composition
        id="Preset-Dramatic"
        component={PresetExample}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Preset-Subtle"
        component={PresetSubtle}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Preset-Cinematic"
        component={PresetCinematic}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Preset-Snappy"
        component={PresetSnappy}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Preset-Spotlight"
        component={PresetSpotlight}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Custom-Zoom"
        component={CustomZoomExample}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Minimal-Zoom"
        component={MinimalZoomExample}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Vignette-Only"
        component={VignetteOnlyExample}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

// ============================================================================
// Usage Documentation
// ============================================================================

/**
 * ## How to Use CinematicZoomHighlight
 *
 * ### Option 1: With FeatureScene (Recommended)
 *
 * ```tsx
 * import { FeatureSceneWithCinematicZoom } from "./components/FeatureSceneWithCinematicZoom";
 *
 * <FeatureSceneWithCinematicZoom
 *   featureNumber={1}
 *   title="AI Analytics"
 *   screenshots={["/analytics.png"]}
 *   highlightZoom={{
 *     x: 65,           // Target X position (0-100%)
 *     y: 30,           // Target Y position (0-100%)
 *     preset: "dramatic",
 *     atFrame: 40,     // When zoom starts
 *   }}
 * />
 * ```
 *
 * ### Option 2: Direct Component Usage
 *
 * ```tsx
 * import { CinematicZoomFromPreset } from "./components/CinematicZoomHighlight";
 *
 * <CinematicZoomFromPreset
 *   preset="cinematic"
 *   target={{ x: 50, y: 50 }}
 *   atFrame={30}
 * >
 *   <YourScreenshot />
 * </CinematicZoomFromPreset>
 * ```
 *
 * ### Option 3: Full Custom Configuration
 *
 * ```tsx
 * import { CinematicZoomHighlight } from "./components/CinematicZoomHighlight";
 *
 * <CinematicZoomHighlight
 *   target={{ x: 60, y: 40 }}
 *   scale={2.5}
 *   atFrame={30}
 *   holdDuration={90}
 *   showRing={true}
 *   showVignette={true}
 *   showSpotlight={true}
 *   ringColor="#FF6B6B"
 * >
 *   <YourScreenshot />
 * </CinematicZoomHighlight>
 * ```
 *
 * ## Presets Overview
 *
 * | Preset    | Scale | Duration | Hold  | Exit  | Ring | Vignette | Spotlight |
 * |-----------|-------|----------|-------|-------|------|----------|-----------|
 * | subtle    | 1.5x  | 24f      | 45f   | 18f   | ✓    | ✗        | ✗         |
 * | dramatic  | 3x    | 30f      | 60f   | 24f   | ✓    | ✓        | ✓         |
 * | cinematic | 2x    | 45f      | 90f   | 36f   | ✓    | ✓        | ✗         |
 * | snappy    | 2.5x  | 15f      | 30f   | 12f   | ✓    | ✓        | ✗         |
 * | spotlight | 2.2x  | 30f      | 60f   | 24f   | ✓    | ✓        | ✓         |
 *
 * ## Finding Target Coordinates
 *
 * The `x` and `y` values are percentages (0-100) relative to the screenshot:
 * - x=0, y=0 → Top-left corner
 * - x=100, y=0 → Top-right corner
 * - x=50, y=50 → Center
 * - x=50, y=100 → Bottom-center
 *
 * Pro tip: Use browser DevTools to inspect your screenshot and find the
 * element's position, then convert to percentage.
 */
