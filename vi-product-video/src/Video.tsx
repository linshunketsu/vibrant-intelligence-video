import React from "react";
import { Composition, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { SectionTitleScene } from "./scenes/SectionTitleScene";
import { ComposerScene } from "./scenes/ComposerScene";
import { OutroScene } from "./scenes/OutroScene";

/**
 * Vibrant Intelligence Product Video
 * Total: ~3:28 (6240 frames @ 30fps)
 *
 * Scene Timeline:
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

      {/* 0:15 - 0:25   FEATURE 1: Chat + SMS + Email (300 frames, 10s) */}
      <Sequence from={450} durationInFrames={300}>
        <FeatureScene
          title="Chat + SMS + Email"
          label="Unified Communications"
          screenshots={[SCREENSHOTS.chatInbox, SCREENSHOTS.chatThread, SCREENSHOTS.chatTypes]}
          layout="carousel"
        />
      </Sequence>

      {/* 0:25 - 0:37   FEATURE 2: Health Tab (360 frames, 12s) */}
      <Sequence from={750} durationInFrames={360}>
        <FeatureScene
          title="Health Tab"
          label="Patient Overview"
          screenshots={[SCREENSHOTS.healthOverview, SCREENSHOTS.healthVariables]}
          layout="crossfade"
        />
      </Sequence>

      {/* 0:37 - 0:49   FEATURE 3: Calendar (360 frames, 12s) */}
      <Sequence from={1110} durationInFrames={360}>
        <FeatureScene
          title="Smart Calendar"
          label="Scheduling"
          screenshots={[SCREENSHOTS.calendarClinic, SCREENSHOTS.calendarBooking, SCREENSHOTS.calendarIntegrations, SCREENSHOTS.calendarZoom]}
          layout="carousel"
        />
      </Sequence>

      {/* 0:49 - 0:57   FEATURE 4: Peg Board (240 frames, 8s) */}
      <Sequence from={1470} durationInFrames={240}>
        <FeatureScene
          title="Peg Board"
          label="Patient Queue"
          screenshots={[SCREENSHOTS.pegboardPanel, SCREENSHOTS.pegboardPin]}
          layout="crossfade"
        />
      </Sequence>

      {/* 0:57 - 1:07   FEATURE 5: Quick Actions (300 frames, 10s) */}
      <Sequence from={1710} durationInFrames={300}>
        <FeatureScene
          title="Quick Actions"
          label="Workflow Shortcuts"
          screenshots={[SCREENSHOTS.quickBar, SCREENSHOTS.quickExpanded]}
          layout="crossfade"
        />
      </Sequence>

      {/* 1:07 - 1:32   FEATURE 6: Encounter Notes (750 frames, 25s) */}
      <Sequence from={2010} durationInFrames={750}>
        <FeatureScene
          title="Encounter Notes"
          label="Clinical Documentation"
          screenshots={[SCREENSHOTS.encounterEditor, SCREENSHOTS.encounterZoom, SCREENSHOTS.encounterBlocks, SCREENSHOTS.encounterVariables]}
          layout="carousel"
        />
      </Sequence>

      {/* 1:32 - 2:02   FEATURE 7: Workflow + AI (900 frames, 30s) */}
      <Sequence from={2760} durationInFrames={900}>
        <FeatureScene
          title="Workflow Automation"
          label="Powered by AI"
          screenshots={[SCREENSHOTS.workflowOverview, SCREENSHOTS.workflowNodes, SCREENSHOTS.workflowCompose, SCREENSHOTS.workflowGenerated, SCREENSHOTS.workflowGuardian]}
          layout="carousel"
        />
      </Sequence>

      {/* 2:02 - 2:22   FEATURE 8: Form Builder (600 frames, 20s) */}
      <Sequence from={3660} durationInFrames={600}>
        <FeatureScene
          title="Form Builder"
          label="Custom Forms"
          screenshots={[SCREENSHOTS.formComponents, SCREENSHOTS.formAiPrompt, SCREENSHOTS.formAiResult, SCREENSHOTS.formMapping]}
          layout="carousel"
        />
      </Sequence>

      {/* 2:22 - 2:40   FEATURE 9: My Practice (540 frames, 18s) */}
      <Sequence from={4260} durationInFrames={540}>
        <FeatureScene
          title="My Practice"
          label="Analytics & Insights"
          screenshots={[SCREENSHOTS.practiceDashboard, SCREENSHOTS.practiceSentiment, SCREENSHOTS.practiceAskAi]}
          layout="carousel"
        />
      </Sequence>

      {/* 2:40 - 2:43   TRANSITION: "One More Thing..." (90 frames, 3s) */}
      <Sequence from={4800} durationInFrames={90}>
        <SectionTitleScene title="One More Thing..." dramatic />
      </Sequence>

      {/* 2:43 - 2:48   FEATURE 10: Encounter Note Collaborate (150 frames, 5s) */}
      <Sequence from={4890} durationInFrames={150}>
        <FeatureScene
          title="Real-time Collaboration"
          label="Encounter Notes"
          screenshots={[SCREENSHOTS.encounterCollaborate]}
          layout="single"
        />
      </Sequence>

      {/* 2:48 - 2:53   FEATURE 11: Encounter Note Sign (150 frames, 5s) */}
      <Sequence from={5040} durationInFrames={150}>
        <FeatureScene
          title="Sign Anywhere"
          label="Encounter Notes"
          screenshots={[SCREENSHOTS.encounterSign]}
          layout="single"
        />
      </Sequence>

      {/* 2:53 - 2:58   FEATURE 12: Approval Center (150 frames, 5s) */}
      <Sequence from={5190} durationInFrames={150}>
        <FeatureScene
          title="Approval Center"
          label="Workflow"
          screenshots={[SCREENSHOTS.approvalCenter, SCREENSHOTS.approvalDetail]}
          layout="crossfade"
        />
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
