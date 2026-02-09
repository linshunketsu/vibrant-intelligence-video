/**
 * Feature Scene Configurations
 *
 * Individual configurations for each of the 13 features in the VI product video.
 * Each configuration exports a React component that wraps FeatureScene with the appropriate props.
 *
 * Motion Design Philosophy (Manus-style):
 * - CONSISTENT floating card presentation — almost every scene uses the same entrance
 * - Content has a HOLD — static display for 1-2 seconds before transitioning
 * - Variety comes from content/layout, not motion gimmicks
 * - All use the SAME default entrance (scale 0.95→1 + fade + slight translateY)
 * - Rapid-fire scenes 10-12 have FASTER entrance (10 frames) for energy
 */

import React from "react";
import { FeatureScene } from "../FeatureScene";
import { FeatureSceneWithCinematicZoom } from "../../components/FeatureSceneWithCinematicZoom";

// Import all screenshots
import chatInbox from "../../assets/screenshots/chat-multichannel-inbox.png";
import chatThread from "../../assets/screenshots/chat-multichannel-thread.png";
import chatTypes from "../../assets/screenshots/chat-multichannel-types.png";
import healthOverview from "../../assets/screenshots/health-tab-overview.png";
import healthVariables from "../../assets/screenshots/health-tab-variables.png";
import calendarClinic from "../../assets/screenshots/calendar-clinic-view.png";
import calendarBooking from "../../assets/screenshots/calendar-booking-page.png";
import calendarIntegrations from "../../assets/screenshots/calendar-integrations.png";
import calendarZoom from "../../assets/screenshots/calendar-zoom-launch.png";
import pegboardPanel from "../../assets/screenshots/pegboard-panel.png";
import pegboardPin from "../../assets/screenshots/pegboard-pin-action.png";
import quickBar from "../../assets/screenshots/quick-actions-bar.png";
import quickExpanded from "../../assets/screenshots/quick-actions-expanded.png";
import encounterEditor from "../../assets/screenshots/encounter-note-editor.png";
import encounterZoom from "../../assets/screenshots/encounter-zoom-summary.png";
import encounterBlocks from "../../assets/screenshots/encounter-smart-blocks.png";
import encounterVariables from "../../assets/screenshots/encounter-variables.png";
import encounterCollaborate from "../../assets/screenshots/encounter-collaborate.png";
import encounterSign from "../../assets/screenshots/encounter-sign.png";
import workflowOverview from "../../assets/screenshots/workflow-builder-overview.png";
import workflowNodes from "../../assets/screenshots/workflow-builder-nodes.png";
import workflowCompose from "../../assets/screenshots/workflow-ai-compose.png";
import workflowGenerated from "../../assets/screenshots/workflow-ai-generated.png";
import workflowGuardian from "../../assets/screenshots/workflow-guardian-ai.png";
import formComponents from "../../assets/screenshots/form-builder-components.png";
import formAiPrompt from "../../assets/screenshots/form-builder-ai-prompt.png";
import formAiResult from "../../assets/screenshots/form-builder-ai-result.png";
import formMapping from "../../assets/screenshots/form-builder-mapping.png";
import practiceDashboard from "../../assets/screenshots/practice-dashboard.png";
import practiceSentiment from "../../assets/screenshots/practice-sentiment.png";
import practiceAskAi from "../../assets/screenshots/practice-ask-ai.png";
import approvalCenter from "../../assets/screenshots/approval-center.png";
import approvalDetail from "../../assets/screenshots/approval-center-detail.png";
import composerInterface from "../../assets/screenshots/composer-interface.png";
import composerNatural from "../../assets/screenshots/composer-natural-language.png";
import composerDiff from "../../assets/screenshots/composer-diff-view.png";
import composerDocument from "../../assets/screenshots/composer-document.png";

/**
 * FEATURE 1: Chat + SMS + Email (14s = 420 frames)
 * Layout: carousel (~4.2s per screenshot)
 * Screenshots: 3
 * Subtitle: "Unified Communication"
 * slideDuration: 125 frames (~4.2s) - synced to voiceover timing
 */
export const ChatMultichannelFeature: React.FC = () => (
  <FeatureScene
    title="Chat + SMS + Email"
    subtitle="Unified Communication"
    screenshots={[chatInbox, chatThread, chatTypes]}
    layout="carousel"
    durationInFrames={420}
    slideDuration={125}
  />
);

/**
 * FEATURE 2: Health Tab (22s = 660 frames)
 * Layout: crossfade
 * Screenshots: 2
 * Subtitle: "Instant Clinical Context"
 * Cursor: YES — animate cursor clicking the "Health" tab on first screenshot
 * Cinematic Zoom: YES — zoom into the health variables panel on second screenshot
 */
export const HealthTabFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Health Tab"
    subtitle="Instant Clinical Context"
    screenshots={[healthOverview, healthVariables]}
    layout="crossfade"
    durationInFrames={660}
    showCursor={{
      startPos: { x: 38, y: 33 }, // At the zoom target
      endPos: { x: 38, y: 33 },    // Stay there
      startFrame: 30,              // Start at the beginning of the scene
      moveDuration: 10,            // Quick move into position
      clickAtFrame: 50,            // Click early in the scene
      zoomSync: {
        atFrame: 0,                // Sync with zoom start
        zoomDuration: 24,          // Matches "subtle" preset zoom duration
        minScale: 0.4,             // Start small
        maxScale: 2.5,             // Grow to match zoom
      },
    }}
    highlightZoom={{
      x: 38,              // Zoom target
      y: 33,              // Zoom target (down 1 from 32)
      scale: 2.5,         // Higher zoom level
      preset: "subtle",
      atFrame: 0,         // Start zoom at the very beginning
      holdDuration: 34,   // Hold until click finishes (click at 50 + 8 = 58, zoom reaches max at 24, so 58-24=34)
      exitDuration: 6,    // Very fast zoom out after click
      showCursor: false,  // Disable the built-in cursor, using the manual showCursor instead
    }}
  />
);

/**
 * FEATURE 3: Calendar (22s = 660 frames)
 * Layout: carousel (~5.3s per slide)
 * Screenshots: 4
 * Subtitle: "Smart Scheduling"
 * slideDuration: 159 frames (~5.3s) - synced to voiceover timing
 */
export const CalendarFeature: React.FC = () => (
  <FeatureScene
    title="Calendar"
    subtitle="Smart Scheduling"
    screenshots={[calendarClinic, calendarBooking, calendarIntegrations, calendarZoom]}
    layout="carousel"
    durationInFrames={660}
    slideDuration={159}
  />
);

/**
 * FEATURE 4: Peg Board (13.3s = 400 frames)
 * Layout: crossfade
 * Screenshots: 2
 * Subtitle: "Your Personal Reference Board"
 * Cinematic Zoom: YES — slight zoom to far right on first slide
 */
export const PegBoardFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Peg Board"
    subtitle="Your Personal Reference Board"
    screenshots={[pegboardPanel, pegboardPin]}
    layout="crossfade"
    durationInFrames={400}
    highlightZoom={{
      x: 85,              // Far right on first slide
      y: 35,              // Slightly up from center
      scale: 1.3,         // Slight zoom
      atFrame: 30,        // Start zoom after title appears
      holdDuration: 60,   // Hold for 2 seconds
      exitDuration: 24,   // Smooth exit
      showCursor: false,  // No cursor for first slide zoom
    }}
    showCursor={{
      startPos: { x: 50, y: 78 },   // Start below center
      endPos: { x: 50, y: 78 },     // Stay below center (clicking second slide)
      startFrame: 210,             // Start after crossfade to second slide (crossfade at ~200)
      moveDuration: 15,            // Move to position
      clickAtFrame: 235,           // Click at second slide
      zoomSync: {
        atFrame: 210,              // Start growing when cursor appears
        zoomDuration: 30,          // Grow over 30 frames
        minScale: 1,               // Start at normal size
        maxScale: 2.5,             // Grow to large size
      },
    }}
  />
);

/**
 * FEATURE 5: Quick Actions (16.7s = 500 frames)
 * Layout: crossfade
 * Screenshots: 2
 * Subtitle: "One-Click Clinical Actions"
 * Cursor: YES — animate cursor clicking a quick action button
 * Cinematic Zoom: YES — zoom into the 4 action items (Encounter Notes, eRx, etc.)
 */
export const QuickActionsFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Quick Actions"
    subtitle="One-Click Clinical Actions"
    screenshots={[quickBar, quickExpanded]}
    layout="crossfade"
    durationInFrames={500}
    highlightZoom={{
      x: 35,              // Left of center on action icons
      y: 85,              // Above the chat input bar
      preset: "snappy",   // Quick, energetic zoom
      atFrame: 90,        // Start zoom at 3s
      holdDuration: 20,   // Hold for 0.67 seconds (total zoom ends by frame 137, before crossfade at 150)
      cursorStartOffset: { x: 10, y: 70 }, // Cursor starts from left side
    }}
  />
);

/**
 * FEATURE 6: Encounter Notes (25s = 750 frames)
 * Layout: carousel with side peeks (~6s per slide)
 * Screenshots: 4
 * Subtitle: "AI-Powered Documentation"
 * Cursor: YES — cursor in bottom left on second slide (encounterZoom), moves up and right
 * slideDuration: 179 frames (~6s) - synced to voiceover timing
 */
export const EncounterNotesFeature: React.FC = () => (
  <FeatureScene
    title="Encounter Notes"
    subtitle="AI-Powered Documentation"
    screenshots={[encounterEditor, encounterZoom, encounterBlocks, encounterVariables]}
    layout="carousel"
    durationInFrames={750}
    slideDuration={179}
    showCursor={{
      startPos: { x: 15, y: 85 },   // Bottom left corner
      endPos: { x: 23, y: 83 },      // Move up by 2, right by 8
      startFrame: 304,               // Start on third slide (125 + 179)
      moveDuration: 5,               // Instant movement
      clickAtFrame: 314,             // Click on third slide
    }}
  />
);

/**
 * FEATURE 7: Workflow + AI (37s = 1110 frames)
 * Layout: carousel with side peeks (~7.3s per slide)
 * Screenshots: 5
 * Subtitle: "Intelligent Care Pathways"
 * slideDuration: 220 frames (~7.3s) - synced to voiceover timing
 * Cinematic Zoom: YES — zoom on third slide (AI compose)
 */
export const WorkflowAIFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Workflow + AI"
    subtitle="Intelligent Care Pathways"
    screenshots={[workflowOverview, workflowNodes, workflowCompose, workflowGenerated, workflowGuardian]}
    layout="carousel"
    durationInFrames={1110}
    slideDuration={220}
    highlightZoom={{
      x: 85,              // Far right
      y: 50,              // Center vertically
      scale: 1.5,         // Moderate zoom
      atFrame: 580,       // Start zoom ~4.7 seconds after third slide begins (440 + 140 frames = ~4.7s)
      holdDuration: 60,   // Hold for 2 seconds
      exitDuration: 24,   // Smooth exit
      showCursor: false,  // No cursor
    }}
  />
);

/**
 * FEATURE 8: Form Builder (20.7s = 620 frames)
 * Layout: carousel (~5s per slide)
 * Screenshots: 4
 * Subtitle: "AI Form Creation"
 * Cursor: YES — animate cursor typing in the AI prompt field
 * slideDuration: 149 frames (~5s) - synced to voiceover timing
 */
export const FormBuilderFeature: React.FC = () => (
  <FeatureScene
    title="Form Builder"
    subtitle="AI Form Creation"
    screenshots={[formComponents, formAiPrompt, formAiResult, formMapping]}
    layout="carousel"
    durationInFrames={620}
    slideDuration={149}
    showCursor={{
      startPos: { x: 50, y: 80 },
      endPos: { x: 60, y: 60 },
      startFrame: 50,
      moveDuration: 20,
      clickAtFrame: 70,
    }}
  />
);

/**
 * FEATURE 9: My Practice (24.7s = 740 frames)
 * Layout: carousel (~8s per slide)
 * Screenshots: 3
 * Subtitle: "Your Command Center"
 * Cinematic Zoom: YES — zoom into Ask AI button on last slide
 * Cursor: YES — cursor moves from far right to left across the Ask AI button
 * slideDuration: 240 frames (~8s) - synced to voiceover timing
 */
export const MyPracticeFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="My Practice"
    subtitle="Your Command Center"
    screenshots={[practiceDashboard, practiceSentiment, practiceAskAi]}
    layout="carousel"
    durationInFrames={740}
    slideDuration={240}
    highlightZoom={{
      x: 65,              // Moved left from 85 - still on the right side but more centered
      y: 80,              // Bottom right corner where Ask AI button is
      preset: "subtle",
      atFrame: 500,       // Start zoom on third/last screenshot (240 + 240 + 20 = ~500)
      holdDuration: 120,  // Hold for 4 seconds
      showCursor: true,    // Enable cursor animation
      cursorStartOffset: { x: 95, y: 80 },  // Cursor starts at far right
    }}
    showCursor={{
      startPos: { x: 85, y: 75 },   // Start at right side
      endPos: { x: 25, y: 75 },      // Move far left to point at Ask AI button
      startFrame: 520,               // Start cursor movement after zoom begins
      moveDuration: 40,              // Smooth movement across
      clickAtFrame: 555,             // Click on Ask AI button
    }}
  />
);

// === "ONE MORE THING" TRANSITION (3s = 90 frames) ===
// Uses SectionTitleScene with "One More Thing..." text
// Uses WordStagger animation for each word
// See Video.tsx for usage

/**
 * FEATURE 10: Encounter Note Collaborate (5s = 150 frames)
 * Layout: single — FASTER entrance (10 frames) for rapid-fire energy
 * Screenshots: 1
 * Subtitle only, no feature number badge
 * Cinematic Zoom: YES — zoom into the collaboration indicators
 */
export const EncounterCollaborateFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Real-time Collaboration"
    subtitle="Work Together, Live"
    screenshots={[encounterCollaborate]}
    layout="single"
    durationInFrames={150}
    fastEntrance={true} // Faster entrance for "One More Thing" rapid-fire section
    highlightZoom={{
      x: 80,              // Right side where collaboration avatars are
      y: 15,              // Top right corner
      preset: "snappy",   // Quick zoom for rapid-fire style
      atFrame: 40,        // Start zoom early
      holdDuration: 60,   // Hold for 2 seconds
    }}
  />
);

/**
 * FEATURE 11: Encounter Note Sign (5s = 150 frames)
 * Layout: single — fast entrance, same rapid-fire style
 * Screenshots: 1
 * Cinematic Zoom: YES — zoom into the signature area
 */
export const EncounterSignFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Sign Anywhere"
    subtitle="E-Signatures Built In"
    screenshots={[encounterSign]}
    layout="single"
    durationInFrames={150}
    fastEntrance={true} // Faster entrance for "One More Thing" rapid-fire section
    highlightZoom={{
      x: 50,              // Center where signature is
      y: 70,              // Bottom where the signature line is
      preset: "snappy",
      atFrame: 40,
      holdDuration: 60,
    }}
  />
);

/**
 * FEATURE 12: Approval Center (6s = 180 frames)
 * Layout: crossfade — fast entrance
 * Screenshots: 2
 */
export const ApprovalCenterFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Approval Center"
    subtitle="Streamlined Reviews"
    screenshots={[approvalCenter, approvalDetail]}
    layout="crossfade"
    durationInFrames={180}
    fastEntrance={true} // Faster entrance for "One More Thing" rapid-fire section
  />
);

// === "COMING SOON" TRANSITION (3s = 90 frames) ===
// Uses SectionTitleScene with "Coming Soon" text
// Uses WordStagger animation for each word
// See Video.tsx for usage

/**
 * FEATURE 13: Composer — FINALE (17s = 510 frames)
 * Layout: carousel
 * Screenshots: 4
 * Subtitle: "Your AI Command Center"
 * fullScreen: true — fills entire viewport, no floating card, no dotted bg
 * This is the ONE full-screen takeover (like Manus Scene 6) — creates dramatic contrast
 * "Coming Soon" badge floats top-right
 * Subtle teal glow (#8BBDC7) behind edges
 * Cursor: YES — animate cursor interacting with composer input
 *
 * NOTE: Uses ComposerScene component directly in Video.tsx for fullScreen support
 */
export const ComposerFeatureScreenshots = {
  screenshots: [composerInterface, composerNatural, composerDiff, composerDocument],
  title: "Composer",
  subtitle: "Your AI Command Center",
};

/**
 * Export all features as an array for easy iteration
 */
export const allFeatures = [
  { component: ChatMultichannelFeature, duration: 300, name: "Chat + SMS + Email" },
  { component: HealthTabFeature, duration: 360, name: "Health Tab" },
  { component: CalendarFeature, duration: 360, name: "Calendar" },
  { component: PegBoardFeature, duration: 240, name: "Peg Board" },
  { component: QuickActionsFeature, duration: 300, name: "Quick Actions" },
  { component: EncounterNotesFeature, duration: 750, name: "Encounter Notes" },
  { component: WorkflowAIFeature, duration: 900, name: "Workflow + AI" },
  { component: FormBuilderFeature, duration: 600, name: "Form Builder" },
  { component: MyPracticeFeature, duration: 540, name: "My Practice" },
  { component: EncounterCollaborateFeature, duration: 150, name: "Encounter Collaborate" },
  { component: EncounterSignFeature, duration: 150, name: "Encounter Sign" },
  { component: ApprovalCenterFeature, duration: 150, name: "Approval Center" },
] as const;
