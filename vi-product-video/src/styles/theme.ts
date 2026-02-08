/**
 * Vibrant Intelligence Product Video Theme
 * Based on Manus AI "Introducing Skills" visual style with VI branding
 */

export const theme = {
  colors: {
    background: '#F8F8F8',        // cool light gray background
    dotGrid: '#E0DDD8',           // subtle dot color
    text: '#1A1A1A',              // near-black
    textSecondary: '#6B7280',     // gray
    accent: '#00436E',            // VI brand dark blue (from logo)
    accentLight: '#8BBDC7',       // VI brand light teal (from logo)
    accentBlue: '#3B82F6',        // utility blue for toggles/highlights
    card: '#FFFFFF',
    cardShadow: 'rgba(0,0,0,0.08)',
    success: '#10B981',           // green for checkmarks
    toggleOff: '#D1D5DB',
  },
  fonts: {
    heading: 'Inter, sans-serif',    // weight 700-800 for headlines
    body: 'Inter, sans-serif',       // weight 400-500 for body/UI text
    mono: 'SF Mono, monospace',
  },
  // Inter font specs from prototype:
  // UI tabs: Inter Medium 500, 18px, line-height 22px, letter-spacing 0.2px
  fontSizes: {
    heroTitle: 80,       // intro/outro "Vibrant Intelligence"
    sectionTitle: 72,    // section transition titles
    featureTitle: 48,    // feature name
    featureSubtitle: 24, // feature description
    uiText: 18,          // matches prototype UI text
    caption: 14,         // small labels
  },
  borderRadius: {
    card: 12,
    button: 8,
    input: 6,
  },
} as const;

/**
 * Animation timings (in frames @ 30fps)
 */
export const timing = {
  instant: 0,
  fast: 6,
  normal: 12,
  slow: 24,
  verySlow: 36,

  // Stagger delays for sequences
  stagger: {
    tight: 3,
    normal: 6,
    relaxed: 10,
  },

  // Transition durations
  transition: {
    fade: 15,
    slide: 18,
    scale: 21,
  },
} as const;

/**
 * Easing functions (using Remotion's Easing.bezier)
 * Material Design easing: bezier(0.4, 0, 0.2, 1)
 */
export const easing = {
  material: [0.4, 0, 0.2, 1] as const,
  easeOut: [0.25, 0.1, 0.25, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
} as const;
