/**
 * Cinematic Zoom Highlight Components
 *
 * A collection of components for creating cinematic, professional zoom effects
 * in Remotion videos. Perfect for highlighting specific UI elements in product videos.
 *
 * @example
 * ```tsx
 * import { FeatureSceneWithCinematicZoom } from "@/components/cinematic-zoom";
 *
 * <FeatureSceneWithCinematicZoom
 *   title="Analytics Dashboard"
 *   screenshots={["/dashboard.png"]}
 *   highlightZoom={{
 *     x: 65,
 *     y: 30,
 *     preset: "dramatic",
 *     atFrame: 40,
 *   }}
 * />
 * ```
 */

// Main cinematic zoom component
export {
  CinematicZoomHighlight,
  CinematicZoomFromPreset,
  ZOOM_PRESETS,
} from "./CinematicZoomHighlight";

// Types
export type {
  TargetPosition,
  CinematicZoomProps,
  ZoomPreset,
  ZoomPresetConfig,
} from "./CinematicZoomHighlight";

// Enhanced FeatureScene with cinematic zoom support
export {
  FeatureSceneWithCinematicZoom,
} from "./FeatureSceneWithCinematicZoom";

// Types for the enhanced scene
export type {
  HighlightZoom,
  CursorAnimation,
  ScreenshotLayout,
  FeatureSceneWithCinematicZoomProps,
} from "./FeatureSceneWithCinematicZoom";

// Example compositions (for Remotion Studio)
export {
  PresetExample,
  PresetSubtle,
  PresetCinematic,
  PresetSnappy,
  PresetSpotlight,
  CustomZoomExample,
  MinimalZoomExample,
  VignetteOnlyExample,
  SequentialZoomExample,
  DirectZoomExample,
  CinematicZoomExamples,
} from "./CinematicZoomExample";
