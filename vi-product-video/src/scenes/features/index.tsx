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
 * FEATURE 1: Chat + SMS + Email (10s = 300 frames)
 * Layout: carousel (~3.3s per screenshot)
 * Screenshots: 3
 * Subtitle: "Unified Communication"
 */
export const ChatMultichannelFeature: React.FC = () => (
  <FeatureScene
    featureNumber={1}
    title="Chat + SMS + Email"
    subtitle="Unified Communication"
    screenshots={[chatInbox, chatThread, chatTypes]}
    layout="carousel"
    durationInFrames={300}
  />
);

/**
 * FEATURE 2: Health Tab (12s = 360 frames)
 * Layout: carousel (~4s per slide)
 * Screenshots: 2
 * Subtitle: "Instant Clinical Context"
 * Cursor: YES — animate cursor clicking the "Health" tab on first screenshot
 * Cinematic Zoom: YES — zoom into the health variables panel on second screenshot
 */
export const HealthTabFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    featureNumber={2}
    title="Health Tab"
    subtitle="Instant Clinical Context"
    screenshots={[healthOverview, healthVariables]}
    layout="crossfade"
    durationInFrames={360}
    showCursor={{
      startPos: { x: 50, y: 59 }, // At the zoom target (center of health variables)
      endPos: { x: 50, y: 59 },    // Stay there
      startFrame: 170,             // Start after zoom begins (second slide is visible)
      moveDuration: 10,            // Quick move into position
      clickAtFrame: 190,           // Click during zoom hold
    }}
    highlightZoom={{
      x: 50,              // Center
      y: 59,              // Slightly below center
      scale: 2.5,          // Higher zoom level
      preset: "subtle",
      atFrame: 150,       // Start zoom when second screenshot appears (~5s)
      holdDuration: 120,  // Hold for 4 seconds
      showCursor: false,  // Disable the built-in cursor, using the manual showCursor instead
    }}
  />
);

/**
 * FEATURE 3: Calendar (12s = 360 frames)
 * Layout: carousel (~3s per slide)
 * Screenshots: 4
 * Subtitle: "Smart Scheduling"
 */
export const CalendarFeature: React.FC = () => (
  <FeatureScene
    featureNumber={3}
    title="Calendar"
    subtitle="Smart Scheduling"
    screenshots={[calendarClinic, calendarBooking, calendarIntegrations, calendarZoom]}
    layout="carousel"
    durationInFrames={360}
  />
);

/**
 * FEATURE 4: Peg Board (8s = 240 frames)
 * Layout: crossfade
 * Screenshots: 2
 * Subtitle: "Your Personal Reference Board"
 */
export const PegBoardFeature: React.FC = () => (
  <FeatureScene
    featureNumber={4}
    title="Peg Board"
    subtitle="Your Personal Reference Board"
    screenshots={[pegboardPanel, pegboardPin]}
    layout="crossfade"
    durationInFrames={240}
  />
);

/**
 * FEATURE 5: Quick Actions (10s = 300 frames)
 * Layout: crossfade
 * Screenshots: 2
 * Subtitle: "One-Click Clinical Actions"
 * Cursor: YES — animate cursor clicking a quick action button
 * Cinematic Zoom: YES — zoom into the 4 action items (Encounter Notes, eRx, etc.)
 */
export const QuickActionsFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    featureNumber={5}
    title="Quick Actions"
    subtitle="One-Click Clinical Actions"
    screenshots={[quickBar, quickExpanded]}
    layout="crossfade"
    durationInFrames={300}
    highlightZoom={{
      x: 25,              // Slightly right of center on action icons
      y: 95,              // Bottom area above the chat input bar
      preset: "snappy",   // Quick, energetic zoom
      atFrame: 90,        // Start zoom at 3s
      holdDuration: 20,   // Hold for 0.67 seconds (total zoom ends by frame 137, before crossfade at 150)
      cursorStartOffset: { x: 60, y: 70 }, // Cursor starts from right side
    }}
  />
);

/**
 * FEATURE 6: Encounter Notes (25s = 750 frames)
 * Layout: carousel with side peeks (~5s per slide)
 * Screenshots: 4
 * Subtitle: "AI-Powered Documentation"
 * Cursor: YES — cursor in bottom left on second slide (encounterZoom), moves up and right
 */
export const EncounterNotesFeature: React.FC = () => (
  <FeatureScene
    featureNumber={6}
    title="Encounter Notes"
    subtitle="AI-Powered Documentation"
    screenshots={[encounterEditor, encounterZoom, encounterBlocks, encounterVariables]}
    layout="carousel"
    durationInFrames={750}
    showCursor={{
      startPos: { x: 15, y: 85 },   // Bottom left corner
      endPos: { x: 23, y: 83 },      // Move up by 2, right by 8
      startFrame: 125,               // Start very late in second slide (~4.2s)
      moveDuration: 5,               // Instant movement
      clickAtFrame: 135,             // Click at 4.5s, fully faded by 157
    }}
  />
);

/**
 * FEATURE 7: Workflow + AI (30s = 900 frames)
 * Layout: carousel with side peeks (~6s per slide)
 * Screenshots: 5
 * Subtitle: "Intelligent Care Pathways"
 * Cinematic Zoom: YES — zoom into the user and AI conversation panel on the right
 */
export const WorkflowAIFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    featureNumber={7}
    title="Workflow + AI"
    subtitle="Intelligent Care Pathways"
    screenshots={[workflowOverview, workflowNodes, workflowCompose, workflowGenerated, workflowGuardian]}
    layout="carousel"
    durationInFrames={900}
    highlightZoom={{
      x: 96,              // Far right where the user/AI conversation panel is
      y: 50,              // Middle of the conversation
      scale: 2.2,         // Moderate zoom level
      preset: "dramatic", // Strong zoom to emphasize AI integration
      atFrame: 200,       // Start zoom early (~6.7s)
      holdDuration: 180,  // Hold for 6 seconds
    }}
  />
);

/**
 * FEATURE 8: Form Builder (20s = 600 frames)
 * Layout: carousel (~5s per slide)
 * Screenshots: 4
 * Subtitle: "AI Form Creation"
 * Cursor: YES — animate cursor typing in the AI prompt field
 */
export const FormBuilderFeature: React.FC = () => (
  <FeatureScene
    featureNumber={8}
    title="Form Builder"
    subtitle="AI Form Creation"
    screenshots={[formComponents, formAiPrompt, formAiResult, formMapping]}
    layout="carousel"
    durationInFrames={600}
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
 * FEATURE 9: My Practice (18s = 540 frames)
 * Layout: carousel (~6s per slide)
 * Screenshots: 3
 * Subtitle: "Your Command Center"
 * Cinematic Zoom: YES — zoom into the sentiment analysis or Ask AI button
 */
export const MyPracticeFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    featureNumber={9}
    title="My Practice"
    subtitle="Your Command Center"
    screenshots={[practiceDashboard, practiceSentiment, practiceAskAi]}
    layout="carousel"
    durationInFrames={540}
    highlightZoom={{
      x: 30,              // Left side where the sentiment/analytics are
      y: 40,              // Upper middle of the dashboard
      preset: "subtle",
      atFrame: 140,       // Start zoom on first screenshot (~4.7s)
      holdDuration: 120,  // Hold for 4 seconds
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
 * FEATURE 12: Approval Center (5s = 150 frames)
 * Layout: crossfade — fast entrance
 * Screenshots: 2
 * Cinematic Zoom: YES — zoom into the approval buttons
 */
export const ApprovalCenterFeature: React.FC = () => (
  <FeatureSceneWithCinematicZoom
    title="Approval Center"
    subtitle="Streamlined Reviews"
    screenshots={[approvalCenter, approvalDetail]}
    layout="crossfade"
    durationInFrames={150}
    highlightZoom={{
      x: 70,              // Right side where approve/reject buttons are
      y: 60,              // Middle of the approval list
      preset: "snappy",
      atFrame: 50,
      holdDuration: 60,
    }}
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
