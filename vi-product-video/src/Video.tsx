import React from "react";
import { Composition, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { SectionTitleScene } from "./scenes/SectionTitleScene";
import { ComposerScene } from "./scenes/ComposerScene";
import { OutroScene } from "./scenes/OutroScene";
import {
  ChatMultichannelFeature,
  HealthTabFeature,
  CalendarFeature,
  PegBoardFeature,
  QuickActionsFeature,
  EncounterNotesFeature,
  WorkflowAIFeature,
  FormBuilderFeature,
  MyPracticeFeature,
  EncounterCollaborateFeature,
  EncounterSignFeature,
  ApprovalCenterFeature,
} from "./scenes/features";

/**
 * Vibrant Intelligence Product Video
 * Total: ~3:28 (6240 frames @ 30fps)
 *
 * Scene Timeline:
 *
 * INTRO: 0:00 - 0:15 (450 frames)
 * FEATURE 1: 0:15 - 0:25 (300 frames, 10s) - Chat + SMS + Email
 * FEATURE 2: 0:25 - 0:37 (360 frames, 12s) - Health Tab
 * FEATURE 3: 0:37 - 0:49 (360 frames, 12s) - Calendar
 * FEATURE 4: 0:49 - 0:57 (240 frames, 8s) - Peg Board
 * FEATURE 5: 0:57 - 1:07 (300 frames, 10s) - Quick Actions
 * FEATURE 6: 1:07 - 1:32 (750 frames, 25s) - Encounter Notes
 * FEATURE 7: 1:32 - 2:02 (900 frames, 30s) - Workflow + AI
 * FEATURE 8: 2:02 - 2:22 (600 frames, 20s) - Form Builder
 * FEATURE 9: 2:22 - 2:40 (540 frames, 18s) - My Practice
 * TRANSITION: 2:40 - 2:43 (90 frames, 3s) - "One More Thing..."
 * FEATURE 10: 2:43 - 2:48 (150 frames, 5s) - Encounter Collaborate
 * FEATURE 11: 2:48 - 2:53 (150 frames, 5s) - Encounter Sign
 * FEATURE 12: 2:53 - 2:58 (150 frames, 5s) - Approval Center
 * TRANSITION: 2:58 - 3:01 (90 frames, 3s) - "Coming Soon"
 * FEATURE 13: 3:01 - 3:18 (510 frames, 17s) - Composer (Finale)
 * OUTRO: 3:18 - 3:28 (300 frames, 10s)
 * TOTAL: 3:28 (6240 frames)
 */

// Screenshot imports - using actual files from assets/screenshots/
import chatInbox from "./assets/screenshots/chat-multichannel-inbox.png";
import chatThread from "./assets/screenshots/chat-multichannel-thread.png";
import chatTypes from "./assets/screenshots/chat-multichannel-types.png";
import healthOverview from "./assets/screenshots/health-tab-overview.png";
import healthVariables from "./assets/screenshots/health-tab-variables.png";
import calendarClinic from "./assets/screenshots/calendar-clinic-view.png";
import calendarBooking from "./assets/screenshots/calendar-booking-page.png";
import calendarIntegrations from "./assets/screenshots/calendar-integrations.png";
import calendarZoom from "./assets/screenshots/calendar-zoom-launch.png";
import pegboardPanel from "./assets/screenshots/pegboard-panel.png";
import pegboardPin from "./assets/screenshots/pegboard-pin-action.png";
import quickBar from "./assets/screenshots/quick-actions-bar.png";
import quickExpanded from "./assets/screenshots/quick-actions-expanded.png";
import encounterEditor from "./assets/screenshots/encounter-note-editor.png";
import encounterZoom from "./assets/screenshots/encounter-zoom-summary.png";
import encounterBlocks from "./assets/screenshots/encounter-smart-blocks.png";
import encounterVariables from "./assets/screenshots/encounter-variables.png";
import encounterCollaborate from "./assets/screenshots/encounter-collaborate.png";
import encounterSign from "./assets/screenshots/encounter-sign.png";
import workflowOverview from "./assets/screenshots/workflow-builder-overview.png";
import workflowNodes from "./assets/screenshots/workflow-builder-nodes.png";
import workflowCompose from "./assets/screenshots/workflow-ai-compose.png";
import workflowGenerated from "./assets/screenshots/workflow-ai-generated.png";
import workflowGuardian from "./assets/screenshots/workflow-guardian-ai.png";
import formComponents from "./assets/screenshots/form-builder-components.png";
import formAiPrompt from "./assets/screenshots/form-builder-ai-prompt.png";
import formAiResult from "./assets/screenshots/form-builder-ai-result.png";
import formMapping from "./assets/screenshots/form-builder-mapping.png";
import practiceDashboard from "./assets/screenshots/practice-dashboard.png";
import practiceSentiment from "./assets/screenshots/practice-sentiment.png";
import practiceAskAi from "./assets/screenshots/practice-ask-ai.png";
import approvalCenter from "./assets/screenshots/approval-center.png";
import approvalDetail from "./assets/screenshots/approval-center-detail.png";
import composerInterface from "./assets/screenshots/composer-interface.png";
import composerNatural from "./assets/screenshots/composer-natural-language.png";
import composerDiff from "./assets/screenshots/composer-diff-view.png";
import composerDocument from "./assets/screenshots/composer-document.png";

const SCREENSHOTS = {
  // Feature 1: Chat + SMS + Email
  chatInbox,
  chatThread,
  chatTypes,

  // Feature 2: Health Tab
  healthOverview,
  healthVariables,

  // Feature 3: Calendar
  calendarClinic,
  calendarBooking,
  calendarIntegrations,
  calendarZoom,

  // Feature 4: Peg Board
  pegboardPanel,
  pegboardPin,

  // Feature 5: Quick Actions
  quickBar,
  quickExpanded,

  // Feature 6: Encounter Notes
  encounterEditor,
  encounterZoom,
  encounterBlocks,
  encounterVariables,

  // Feature 7: Workflow + AI
  workflowOverview,
  workflowNodes,
  workflowCompose,
  workflowGenerated,
  workflowGuardian,

  // Feature 8: Form Builder
  formComponents,
  formAiPrompt,
  formAiResult,
  formMapping,

  // Feature 9: My Practice
  practiceDashboard,
  practiceSentiment,
  practiceAskAi,

  // Feature 10: Encounter Collaborate
  encounterCollaborate,

  // Feature 11: Encounter Sign
  encounterSign,

  // Feature 12: Approval Center
  approvalCenter,
  approvalDetail,

  // Feature 13: Composer (Finale)
  composerInterface,
  composerNatural,
  composerDiff,
  composerDocument,
};

export const Video: React.FC = () => {
  return (
    <>
      {/* 0:00 - 0:15   INTRO (450 frames) */}
      <Sequence from={0} durationInFrames={450}>
        <IntroScene />
      </Sequence>

      {/* 0:15 - 0:25   FEATURE 1: Chat + SMS + Email (300 frames, 10s)
          Layout: carousel (~3.3s per screenshot)
          Subtitle: "Unified Communication"
      */}
      <Sequence from={450} durationInFrames={300}>
        <ChatMultichannelFeature />
      </Sequence>

      {/* 0:25 - 0:37   FEATURE 2: Health Tab (360 frames, 12s)
          Layout: carousel (~4s per slide)
          Subtitle: "Instant Clinical Context"
          Cursor: YES — animate cursor clicking the "Health" tab
      */}
      <Sequence from={750} durationInFrames={360}>
        <HealthTabFeature />
      </Sequence>

      {/* 0:37 - 0:49   FEATURE 3: Calendar (360 frames, 12s)
          Layout: carousel (~3s per slide)
          Subtitle: "Smart Scheduling"
      */}
      <Sequence from={1110} durationInFrames={360}>
        <CalendarFeature />
      </Sequence>

      {/* 0:49 - 0:57   FEATURE 4: Peg Board (240 frames, 8s)
          Layout: crossfade
          Subtitle: "Your Personal Reference Board"
      */}
      <Sequence from={1470} durationInFrames={240}>
        <PegBoardFeature />
      </Sequence>

      {/* 0:57 - 1:07   FEATURE 5: Quick Actions (300 frames, 10s)
          Layout: crossfade
          Subtitle: "One-Click Clinical Actions"
          Cursor: YES — animate cursor clicking a quick action button
      */}
      <Sequence from={1710} durationInFrames={300}>
        <QuickActionsFeature />
      </Sequence>

      {/* 1:07 - 1:32   FEATURE 6: Encounter Notes (750 frames, 25s)
          Layout: carousel with side peeks (~5s per slide) — Manus Scene 9 style
          Subtitle: "AI-Powered Documentation"
      */}
      <Sequence from={2010} durationInFrames={750}>
        <EncounterNotesFeature />
      </Sequence>

      {/* 1:32 - 2:02   FEATURE 7: Workflow + AI (900 frames, 30s)
          Layout: carousel with side peeks (~6s per slide)
          Subtitle: "Intelligent Care Pathways"
      */}
      <Sequence from={2760} durationInFrames={900}>
        <WorkflowAIFeature />
      </Sequence>

      {/* 2:02 - 2:22   FEATURE 8: Form Builder (600 frames, 20s)
          Layout: carousel (~5s per slide)
          Subtitle: "AI Form Creation"
          Cursor: YES — animate cursor typing in the AI prompt field
      */}
      <Sequence from={3660} durationInFrames={600}>
        <FormBuilderFeature />
      </Sequence>

      {/* 2:22 - 2:40   FEATURE 9: My Practice (540 frames, 18s)
          Layout: carousel (~6s per slide)
          Subtitle: "Your Command Center"
      */}
      <Sequence from={4260} durationInFrames={540}>
        <MyPracticeFeature />
      </Sequence>

      {/* 2:40 - 2:43   TRANSITION: "One More Thing..." (90 frames, 3s)
          WordStagger animation for each word
          Dotted background "breath" before and after
      */}
      <Sequence from={4800} durationInFrames={90}>
        <SectionTitleScene title="One More Thing..." dramatic />
      </Sequence>

      {/* 2:43 - 2:48   FEATURE 10: Encounter Note Collaborate (150 frames, 5s)
          Layout: single — FASTER entrance (10 frames) for rapid-fire energy
          No feature number badge
      */}
      <Sequence from={4890} durationInFrames={150}>
        <EncounterCollaborateFeature />
      </Sequence>

      {/* 2:48 - 2:53   FEATURE 11: Encounter Note Sign (150 frames, 5s)
          Layout: single — fast entrance, same rapid-fire style
      */}
      <Sequence from={5040} durationInFrames={150}>
        <EncounterSignFeature />
      </Sequence>

      {/* 2:53 - 2:58   FEATURE 12: Approval Center (150 frames, 5s)
          Layout: crossfade — fast entrance
      */}
      <Sequence from={5190} durationInFrames={150}>
        <ApprovalCenterFeature />
      </Sequence>

      {/* 2:58 - 3:01   TRANSITION: "Coming Soon" (90 frames, 3s) */}
      <Sequence from={5340} durationInFrames={90}>
        <SectionTitleScene title="Coming Soon" />
      </Sequence>

      {/* 3:01 - 3:18   FEATURE 13: Composer — FINALE (510 frames, 17s) */}
      <Sequence from={5430} durationInFrames={510}>
        <ComposerScene
          screenshots={[SCREENSHOTS.composerInterface, SCREENSHOTS.composerNatural, SCREENSHOTS.composerDiff, SCREENSHOTS.composerDocument]}
        />
      </Sequence>

      {/* 3:18 - 3:28   CLOSING / OUTRO (300 frames, 10s) */}
      <Sequence from={5940} durationInFrames={300}>
        <OutroScene />
      </Sequence>
    </>
  );
};
