import React, { useEffect, useState } from "react";
import { Composition, Sequence, Audio, delayRender, continueRender, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import soundtrack from "./assets/screenshots/demo music/m4.mp3";
import introOutroMusic from "./assets/screenshots/demo music/raspberrymusic-feel-good-upbeat-percussion-logo-388050.mp3";
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
import { getAllVoiceoverTracks, SCENE_START_FRAMES, SCENE_DURATIONS, TOTAL_VIDEO_FRAMES } from "./config/voiceover";

/**
 * Vibrant Intelligence Product Video
 * Total: ~4:43 (8480 frames @ 30fps)
 *
 * Extended to accommodate actual voiceover durations.
 * Intro scene includes voiceover starting when dashboard appears.
 *
 * Scene Timeline:
 *
 * INTRO: 0:00 - 0:23 (700 frames) - VO starts at frame 220 when dashboard appears
 * FEATURE 1: 0:23 - 0:37 (420 frames, 14s) - Chat + SMS + Email
 * FEATURE 2: 0:37 - 0:59 (660 frames, 22s) - Health Tab
 * FEATURE 3: 0:59 - 1:21 (660 frames, 22s) - Calendar
 * FEATURE 4: 1:21 - 1:35 (400 frames, 13.3s) - Peg Board
 * FEATURE 5: 1:35 - 1:51 (500 frames, 16.7s) - Quick Actions
 * FEATURE 6: 1:51 - 2:16 (750 frames, 25s) - Encounter Notes
 * FEATURE 7: 2:16 - 2:53 (1110 frames, 37s) - Workflow + AI
 * FEATURE 8: 2:53 - 3:14 (620 frames, 20.7s) - Form Builder
 * FEATURE 9: 3:14 - 3:39 (740 frames, 24.7s) - My Practice
 * TRANSITION: 3:39 - 3:43 (120 frames, 4s) - "One More Thing..."
 * FEATURE 10: 3:43 - 3:48 (150 frames, 5s) - Encounter Collaborate
 * FEATURE 11: 3:48 - 3:53 (150 frames, 5s) - Encounter Sign
 * FEATURE 12: 3:53 - 3:59 (180 frames, 6s) - Approval Center
 * TRANSITION: 3:59 - 4:00 (60 frames, 2s) - "Coming Soon"
 * FEATURE 13: 4:00 - 4:27 (780 frames, 26s) - Composer (Finale)
 * OUTRO: 4:27 - 4:43 (480 frames, 16s)
 * TOTAL: 4:43 (8480 frames)
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

/**
 * MusicWithFade - Audio with fade in/out using Remotion's native volume prop
 */
const MusicWithFade: React.FC<{
  src: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}> = ({ src, fadeIn = false, fadeOut = false }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeInDuration = 60;  // 2 second fade for smoother transitions
  const fadeOutDuration = 90; // 3 second fade out for smoother transition to outro

  let volume = 0.08;

  if (fadeIn && frame < fadeInDuration) {
    volume = interpolate(frame, [0, fadeInDuration], [0, 0.08], {
      extrapolateRight: "clamp",
    });
  }

  if (fadeOut && frame > durationInFrames - fadeOutDuration) {
    volume = interpolate(
      frame,
      [durationInFrames - fadeOutDuration, durationInFrames],
      [0.08, 0],
      { extrapolateLeft: "clamp" }
    );
  }

  return <Audio src={src} volume={volume} />;
};

/**
 * IntroMusic - Higher volume intro sting
 */
const IntroMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeOutDuration = 60; // Longer fade out for smoother transition (2 seconds)

  let volume = 0.12;

  // Fade out at end
  if (frame > durationInFrames - fadeOutDuration) {
    volume = interpolate(
      frame,
      [durationInFrames - fadeOutDuration, durationInFrames],
      [0.12, 0],
      { extrapolateLeft: "clamp" }
    );
  }

  return <Audio src={introOutroMusic} volume={volume} />;
};

/**
 * OutroMusic - Higher volume outro sting
 */
const OutroMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeInDuration = 60; // Longer fade in for smoother transition (2 seconds)

  let volume = 0.12;

  // Fade in at start
  if (frame < fadeInDuration) {
    volume = interpolate(frame, [0, fadeInDuration], [0, 0.12], {
      extrapolateRight: "clamp",
    });
  }

  return <Audio src={introOutroMusic} volume={volume} />;
};

/**
 * CrossfadeMusic - Handles smooth transitions between music tracks
 *
 * Timeline:
 * - 0:00 - 0:07: Intro music (logo animation)
 * - 0:05 - 0:09: Crossfade period (2 second overlap)
 * - 0:07 - 4:25: Main music (dashboard shows through features)
 * - 4:23 - 4:27: Crossfade period (2 second overlap)
 * - 4:25 - 4:43: Outro music
 */
const CrossfadeMusic: React.FC = () => {
  return (
    <>
      {/* INTRO music (0:00 - 0:09) - plays during logo animation, fades out over 2 seconds */}
      <Sequence from={0} durationInFrames={270}>
        <IntroMusic />
      </Sequence>

      {/* MAIN CONTENT music (0:05 - 4:27) - starts 2 seconds early for smooth crossfade */}
      <Sequence from={150} durationInFrames={7520}>
        <MusicWithFade src={soundtrack} fadeIn={true} fadeOut={true} />
      </Sequence>

      {/* OUTRO music (4:27 - 4:43) - starts right when outro scene begins, matches logo slide */}
      <Sequence from={8000} durationInFrames={480}>
        <OutroMusic />
      </Sequence>
    </>
  );
};

export const Video: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // CRITICAL FIX: Delay rendering until all images are loaded to prevent flickering
  // Must be called inside the component, not at module level
  const delayHandle = delayRender();

  useEffect(() => {
    // CRITICAL FIX: Preload all images before allowing render to continue
    // This prevents flickering caused by images loading mid-render
    const preloadImages = async () => {
      const imageUrls = Object.values(SCREENSHOTS);

      // Create promises for all image loads
      const promises = imageUrls.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load: ${src}`));
          img.src = src;
        });
      });

      // Also preload the soundtrack (skip if Audio is not available)
      const audioPromise = new Promise<void>((resolve) => {
        try {
          if (typeof Audio !== 'undefined') {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve();
            audio.onerror = () => resolve(); // Don't block on audio errors
            audio.src = soundtrack;
          } else {
            // Audio not available in this context, skip preloading
            resolve();
          }
        } catch {
          // Audio constructor failed, skip preloading
          resolve();
        }
      });

      try {
        await Promise.all([...promises, audioPromise]);
        setIsLoaded(true);
        continueRender(delayHandle);
      } catch (error) {
        console.error("Error loading assets:", error);
        // Continue anyway to avoid hanging
        setIsLoaded(true);
        continueRender(delayHandle);
      }
    };

    preloadImages();
  }, [delayHandle]);

  if (!isLoaded) {
    return null;
  }

  // Get all voiceover tracks
  const voiceoverTracks = getAllVoiceoverTracks();

  return (
    <>
      {/* Music with smooth crossfades between sections */}
      <CrossfadeMusic />

      {/* Voiceover audio tracks - each starts at its designated frame and plays for its estimated duration */}
      {voiceoverTracks.map((track, index) => (
        <Sequence key={`vo-${index}`} from={track.startFrame} durationInFrames={track.durationInFrames}>
          <Audio src={track.audio} volume={1.0} />
        </Sequence>
      ))}

      {/* 0:00 - 0:15   INTRO (450 frames) - NO VOICEOVER */}
      <Sequence from={SCENE_START_FRAMES.intro} durationInFrames={SCENE_DURATIONS.intro}>
        <IntroScene />
      </Sequence>

      {/* 0:15 - 0:29   FEATURE 1: Chat + SMS + Email (420 frames, 14s) */}
      <Sequence from={SCENE_START_FRAMES.feature1} durationInFrames={SCENE_DURATIONS.feature1}>
        <ChatMultichannelFeature />
      </Sequence>

      {/* 0:29 - 0:51   FEATURE 2: Health Tab (660 frames, 22s) */}
      <Sequence from={SCENE_START_FRAMES.feature2} durationInFrames={SCENE_DURATIONS.feature2}>
        <HealthTabFeature />
      </Sequence>

      {/* 0:51 - 1:13   FEATURE 3: Calendar (660 frames, 22s) */}
      <Sequence from={SCENE_START_FRAMES.feature3} durationInFrames={SCENE_DURATIONS.feature3}>
        <CalendarFeature />
      </Sequence>

      {/* 1:13 - 1:26   FEATURE 4: Peg Board (400 frames, 13.3s) */}
      <Sequence from={SCENE_START_FRAMES.feature4} durationInFrames={SCENE_DURATIONS.feature4}>
        <PegBoardFeature />
      </Sequence>

      {/* 1:26 - 1:43   FEATURE 5: Quick Actions (500 frames, 16.7s) */}
      <Sequence from={SCENE_START_FRAMES.feature5} durationInFrames={SCENE_DURATIONS.feature5}>
        <QuickActionsFeature />
      </Sequence>

      {/* 1:43 - 2:08   FEATURE 6: Encounter Notes (750 frames, 25s) */}
      <Sequence from={SCENE_START_FRAMES.feature6} durationInFrames={SCENE_DURATIONS.feature6}>
        <EncounterNotesFeature />
      </Sequence>

      {/* 2:08 - 2:45   FEATURE 7: Workflow + AI (1110 frames, 37s) */}
      <Sequence from={SCENE_START_FRAMES.feature7} durationInFrames={SCENE_DURATIONS.feature7}>
        <WorkflowAIFeature />
      </Sequence>

      {/* 2:45 - 3:05   FEATURE 8: Form Builder (620 frames, 20.7s) */}
      <Sequence from={SCENE_START_FRAMES.feature8} durationInFrames={SCENE_DURATIONS.feature8}>
        <FormBuilderFeature />
      </Sequence>

      {/* 3:05 - 3:30   FEATURE 9: My Practice (740 frames, 24.7s) */}
      <Sequence from={SCENE_START_FRAMES.feature9} durationInFrames={SCENE_DURATIONS.feature9}>
        <MyPracticeFeature />
      </Sequence>

      {/* 3:30 - 3:34   TRANSITION: "One More Thing..." (120 frames, 4s) */}
      <Sequence from={SCENE_START_FRAMES.transition1} durationInFrames={SCENE_DURATIONS.transition1}>
        <SectionTitleScene title="One More Thing..." dramatic />
      </Sequence>

      {/* 3:34 - 3:39   FEATURE 10: Encounter Note Collaborate (150 frames, 5s) */}
      <Sequence from={SCENE_START_FRAMES.feature10} durationInFrames={SCENE_DURATIONS.feature10}>
        <EncounterCollaborateFeature />
      </Sequence>

      {/* 3:39 - 3:44   FEATURE 11: Encounter Note Sign (150 frames, 5s) */}
      <Sequence from={SCENE_START_FRAMES.feature11} durationInFrames={SCENE_DURATIONS.feature11}>
        <EncounterSignFeature />
      </Sequence>

      {/* 3:44 - 3:50   FEATURE 12: Approval Center (180 frames, 6s) */}
      <Sequence from={SCENE_START_FRAMES.feature12} durationInFrames={SCENE_DURATIONS.feature12}>
        <ApprovalCenterFeature />
      </Sequence>

      {/* 3:50 - 3:52   TRANSITION: "Coming Soon" (60 frames, 2s) */}
      <Sequence from={SCENE_START_FRAMES.transition2} durationInFrames={SCENE_DURATIONS.transition2}>
        <SectionTitleScene title="Coming Soon" />
      </Sequence>

      {/* 3:52 - 4:18   FEATURE 13: Composer — FINALE (780 frames, 26s) */}
      <Sequence from={SCENE_START_FRAMES.feature13} durationInFrames={SCENE_DURATIONS.feature13}>
        <ComposerScene
          screenshots={[SCREENSHOTS.composerInterface, SCREENSHOTS.composerNatural, SCREENSHOTS.composerDiff, SCREENSHOTS.composerDocument]}
        />
      </Sequence>

      {/* 4:18 - 4:34   CLOSING / OUTRO (480 frames, 16s) */}
      <Sequence from={SCENE_START_FRAMES.outro} durationInFrames={SCENE_DURATIONS.outro}>
        <OutroScene />
      </Sequence>
    </>
  );
};
