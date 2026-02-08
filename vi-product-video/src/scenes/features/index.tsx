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
 * Screenshots: 2 (note: health-tab-scroll.png doesn't exist, using 2)
 * Subtitle: "Instant Clinical Context"
 * Cursor: YES — animate cursor clicking the "Health" tab on first screenshot
 */
export const HealthTabFeature: React.FC = () => (
  <FeatureScene
    featureNumber={2}
    title="Health Tab"
    subtitle="Instant Clinical Context"
    screenshots={[healthOverview, healthVariables]}
    layout="carousel"
    durationInFrames={360}
    showCursor={{
      startPos: { x: 85, y: 15 }, // Near the Health tab
      endPos: { x: 85, y: 15 },
      startFrame: 30,
      moveDuration: 20,
      clickAtFrame: 50,
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
 * Screenshots: 2 (note: quick-actions-context.png doesn't exist)
 * Subtitle: "One-Click Clinical Actions"
 * Cursor: YES — animate cursor clicking a quick action button
 */
export const QuickActionsFeature: React.FC = () => (
  <FeatureScene
    featureNumber={5}
    title="Quick Actions"
    subtitle="One-Click Clinical Actions"
    screenshots={[quickBar, quickExpanded]}
    layout="crossfade"
    durationInFrames={300}
    showCursor={{
      startPos: { x: 20, y: 50 }, // Start from left
      endPos: { x: 25, y: 50 }, // Move to a quick action button
      startFrame: 40,
      moveDuration: 15,
      clickAtFrame: 55,
    }}
  />
);

/**
 * FEATURE 6: Encounter Notes (25s = 750 frames)
 * Layout: carousel with side peeks (~5s per slide) — Manus Scene 9 style
 * Screenshots: 4 (note: encounter-action-cards.png doesn't exist)
 * Subtitle: "AI-Powered Documentation"
 */
export const EncounterNotesFeature: React.FC = () => (
  <FeatureScene
    featureNumber={6}
    title="Encounter Notes"
    subtitle="AI-Powered Documentation"
    screenshots={[encounterEditor, encounterZoom, encounterBlocks, encounterVariables]}
    layout="carousel"
    durationInFrames={750}
  />
);

/**
 * FEATURE 7: Workflow + AI (30s = 900 frames)
 * Layout: carousel with side peeks (~6s per slide)
 * Screenshots: 5
 * Subtitle: "Intelligent Care Pathways"
 */
export const WorkflowAIFeature: React.FC = () => (
  <FeatureScene
    featureNumber={7}
    title="Workflow + AI"
    subtitle="Intelligent Care Pathways"
    screenshots={[workflowOverview, workflowNodes, workflowCompose, workflowGenerated, workflowGuardian]}
    layout="carousel"
    durationInFrames={900}
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
      startPos: { x: 50, y: 80 }, // Start from center bottom
      endPos: { x: 60, y: 60 }, // Move to AI prompt field
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
 */
export const MyPracticeFeature: React.FC = () => (
  <FeatureScene
    featureNumber={9}
    title="My Practice"
    subtitle="Your Command Center"
    screenshots={[practiceDashboard, practiceSentiment, practiceAskAi]}
    layout="carousel"
    durationInFrames={540}
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
 */
export const EncounterCollaborateFeature: React.FC = () => (
  <FeatureScene
    title="Real-time Collaboration"
    subtitle="Work Together, Live"
    screenshots={[encounterCollaborate]}
    layout="single"
    durationInFrames={150}
  />
);

/**
 * FEATURE 11: Encounter Note Sign (5s = 150 frames)
 * Layout: single — fast entrance, same rapid-fire style
 * Screenshots: 1
 */
export const EncounterSignFeature: React.FC = () => (
  <FeatureScene
    title="Sign Anywhere"
    subtitle="E-Signatures Built In"
    screenshots={[encounterSign]}
    layout="single"
    durationInFrames={150}
  />
);

/**
 * FEATURE 12: Approval Center (5s = 150 frames)
 * Layout: single — fast entrance
 * Screenshots: 2 (crossfade)
 */
export const ApprovalCenterFeature: React.FC = () => (
  <FeatureScene
    title="Approval Center"
    subtitle="Streamlined Reviews"
    screenshots={[approvalCenter, approvalDetail]}
    layout="crossfade"
    durationInFrames={150}
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
