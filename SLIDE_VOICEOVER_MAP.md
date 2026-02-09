# Vibrant Intelligence EHR - Slide & Voiceover Reference Map

**Purpose**: This document binds each visual slide to its corresponding voiceover text. Use this when:
- Generating voiceover audio via ElevenLabs (each line gets one audio file)
- Re-timing slides after receiving actual audio durations
- Maintaining or editing the video after initial production

**Video Specs**: 3:28 total duration (~6240 frames at 30fps) | 1920x1080

**Naming Convention for Audio Files**: `scene-{sceneId}-{feature}-{lineIndex}.wav`

**Audio Location**: `vi-product-video/src/assets/audio/`

**Code Reference**: `vi-product-video/src/config/voiceover.ts`

---

## INTRO
| Field | Value |
|-------|-------|
| **Scene ID** | `intro` |
| **Time** | 0:00 - 0:15 (15s / 450 frames) |
| **Title** | Logo + Dashboard Flash |
| **Screenshots** | `intro-dashboard.png` |
| **Layout** | Logo animation → quick dashboard crossfade |
| **Voiceover Lines** | 3 lines |
| **Audio Files** | `scene-00-intro-0.wav`, `scene-00-intro-1.wav`, `scene-00-intro-2.wav` |

**Voiceover Text:**
1. "Running a modern practice means juggling patient care, communication, scheduling, and documentation—all at once."
2. "What if your EHR actually helped instead of getting in the way?"
3. "Meet Vibrant Intelligence: an AI-powered platform built for how clinics actually work."

---

## FEATURE 1: Chat + SMS + Email
| Field | Value |
|-------|-------|
| **Scene ID** | `feature1` |
| **Time** | 0:15 - 0:25 (10s / 300 frames) |
| **Title** | Chat + SMS + Email |
| **Screenshots** | `chat-multichannel-inbox.png`, `chat-multichannel-thread.png`, `chat-multichannel-types.png` |
| **Layout** | Carousel (~3.3s per screenshot) |
| **Subtitle** | "Unified Communication" |
| **Voiceover Lines** | 4 lines |
| **Audio Files** | `scene-01-chat-0.wav` through `scene-01-chat-3.wav` |

**Voiceover Text:**
1. "First up: unified communication."
2. "Text messages, emails, and chat—all in one interface."
3. "No more switching between apps."
4. "Every interaction with a patient lives in one place, so your team always has the full picture."

---

## FEATURE 2: Health Tab
| Field | Value |
|-------|-------|
| **Scene ID** | `feature2` |
| **Time** | 0:25 - 0:37 (12s / 360 frames) |
| **Title** | Health Tab |
| **Screenshots** | `health-tab-overview.png`, `health-tab-variables.png` |
| **Layout** | Crossfade with cinematic zoom |
| **Subtitle** | "Instant Clinical Context" |
| **Voiceover Lines** | 3 lines |
| **Audio Files** | `scene-02-health-0.wav` through `scene-02-health-2.wav` |

**Voiceover Text:**
1. "Click the Health tab to instantly access everything about this patient: medications, allergies, vitals, labs, encounter notes, and uploaded documents."
2. "Dynamic variables pull data directly from your records—no hunting through multiple screens."
3. "Tag important items, track program progress, and keep clinical context at your fingertips."

---

## FEATURE 3: Calendar
| Field | Value |
|-------|-------|
| **Scene ID** | `feature3` |
| **Time** | 0:37 - 0:49 (12s / 360 frames) |
| **Title** | Calendar |
| **Screenshots** | `calendar-clinic-view.png`, `calendar-booking-page.png`, `calendar-integrations.png`, `calendar-zoom-launch.png` |
| **Layout** | Carousel (~3s per slide) |
| **Subtitle** | "Smart Scheduling" |
| **Voiceover Lines** | 5 lines |
| **Audio Files** | `scene-03-calendar-0.wav` through `scene-03-calendar-4.wav` |

**Voiceover Text:**
1. "The Calendar gives your team a complete scheduling dashboard."
2. "Color-coded appointments across all providers, so everyone knows what's happening at a glance."
3. "For patients, we offer a self-scheduling link—like Calendly, but built right in."
4. "Plus, seamless integration with Google Calendar, Outlook, and Zoom."
5. "Appointments sync automatically, and virtual visits launch with one click."

---

## FEATURE 4: Peg Board
| Field | Value |
|-------|-------|
| **Scene ID** | `feature4` |
| **Time** | 0:49 - 0:57 (8s / 240 frames) |
| **Title** | Peg Board |
| **Screenshots** | `pegboard-panel.png`, `pegboard-pin-action.png` |
| **Layout** | Crossfade |
| **Subtitle** | "Your Personal Reference Board" |
| **Voiceover Lines** | 3 lines |
| **Audio Files** | `scene-04-pegboard-0.wav` through `scene-04-pegboard-2.wav` |

**Voiceover Text:**
1. "See this panel on the right? That's the Peg Board."
2. "Pin any important item—a lab result, a note, an upcoming appointment—right here for quick reference."
3. "Think of it as your personal sticky note wall for each patient."

---

## FEATURE 5: Quick Actions
| Field | Value |
|-------|-------|
| **Scene ID** | `feature5` |
| **Time** | 0:57 - 1:07 (10s / 300 frames) |
| **Title** | Quick Actions |
| **Screenshots** | `quick-actions-bar.png`, `quick-actions-expanded.png` |
| **Layout** | Crossfade with cinematic zoom |
| **Subtitle** | "One-Click Clinical Actions" |
| **Voiceover Lines** | 4 lines |
| **Audio Files** | `scene-05-quickactions-0.wav` through `scene-05-quickactions-3.wav` |

**Voiceover Text:**
1. "Right above the message input, you'll find Quick Actions."
2. "One click to create an order, schedule an appointment, send documents, assign a workflow, or start an encounter note."
3. "Everything happens in context—no navigating away, no lost time."
4. "You stay focused on the patient."

---

## FEATURE 6: Encounter Notes
| Field | Value |
|-------|-------|
| **Scene ID** | `feature6` |
| **Time** | 1:07 - 1:32 (25s / 750 frames) |
| **Title** | Encounter Notes |
| **Screenshots** | `encounter-note-editor.png`, `encounter-zoom-summary.png`, `encounter-smart-blocks.png`, `encounter-variables.png` |
| **Layout** | Carousel with side peeks (~5s per slide) |
| **Subtitle** | "AI-Powered Documentation" |
| **Voiceover Lines** | 5 lines |
| **Audio Files** | `scene-06-notes-0.wav` through `scene-06-notes-4.wav` |

**Voiceover Text:**
1. "Encounter Notes are where Vibrant Intelligence really shines."
2. "Had a Zoom call with your patient? The platform captures the conversation and generates a summary—ready to insert directly into your note."
3. "Insert action cards to order labs, schedule follow-ups, or prescribe—all without leaving the note."
4. "Use smart blocks and templates that auto-populate with patient data."
5. "Documentation that actually helps you work—not slow you down."

---

## FEATURE 7: Workflow + AI
| Field | Value |
|-------|-------|
| **Scene ID** | `feature7` |
| **Time** | 1:32 - 2:02 (30s / 900 frames) |
| **Title** | Workflow + AI |
| **Screenshots** | `workflow-builder-overview.png`, `workflow-builder-nodes.png`, `workflow-ai-compose.png`, `workflow-ai-generated.png`, `workflow-guardian-ai.png` |
| **Layout** | Carousel with side peeks (~6s per slide) |
| **Subtitle** | "Intelligent Care Pathways" |
| **Voiceover Lines** | 7 lines |
| **Audio Files** | `scene-07-workflows-0.wav` through `scene-07-workflows-6.wav` |

**Voiceover Text:**
1. "Now let's talk about Workflows—one of the most powerful features in the platform."
2. "Build custom care pathways using pre-built component nodes: send a message, wait for a response, schedule an appointment, check a condition, and more."
3. "Configure each step to match exactly how your practice operates."
4. "But here's where it gets exciting—just describe what you need in plain English, and our AI builds the workflow for you."
5. "Once a patient is enrolled, Guardian AI monitors their progress."
6. "It handles routine exceptions automatically—and when human judgment is needed, it brings you into the loop."
7. "Automation with oversight."

---

## FEATURE 8: Form Builder
| Field | Value |
|-------|-------|
| **Scene ID** | `feature8` |
| **Time** | 2:02 - 2:22 (20s / 600 frames) |
| **Title** | Form Builder |
| **Screenshots** | `form-builder-components.png`, `form-builder-ai-prompt.png`, `form-builder-ai-result.png`, `form-builder-mapping.png` |
| **Layout** | Carousel (~5s per slide) |
| **Subtitle** | "AI Form Creation" |
| **Voiceover Lines** | 5 lines |
| **Audio Files** | `scene-08-forms-0.wav` through `scene-08-forms-4.wav` |

**Voiceover Text:**
1. "Need an intake form? A questionnaire? A waiver?"
2. "The Form Builder has you covered."
3. "Drag and drop pre-built components, or describe what you need and let AI build it for you."
4. "Here's the best part: map form fields to patient records, and when patients fill something out, that data flows directly into their chart."
5. "No manual entry, no copy-paste errors."

---

## FEATURE 9: My Practice
| Field | Value |
|-------|-------|
| **Scene ID** | `feature9` |
| **Time** | 2:22 - 2:40 (18s / 540 frames) |
| **Title** | My Practice |
| **Screenshots** | `practice-dashboard.png`, `practice-sentiment.png`, `practice-ask-ai.png` |
| **Layout** | Carousel (~6s per slide) |
| **Subtitle** | "Your Command Center" |
| **Voiceover Lines** | 5 lines |
| **Audio Files** | `scene-09-practice-0.wav` through `scene-09-practice-4.wav` |

**Voiceover Text:**
1. "My Practice is your command center."
2. "Customizable metrics let you track what matters most to your clinic."
3. "Our sentiment analysis scans patient communications to surface potential issues before they escalate—helping you improve satisfaction and catch concerns early."
4. "And if you have a question about your data? Just ask."
5. 'Type a natural language query like "Show me no-show rates for the past month"—and get your answer instantly.'

---

## TRANSITION: One More Thing
| Field | Value |
|-------|-------|
| **Scene ID** | `transition1` |
| **Time** | 2:40 - 2:43 (3s / 90 frames) |
| **Title** | One More Thing... |
| **Screenshots** | None (text-only transition) |
| **Layout** | Large animated text with fade-in |
| **Voiceover Lines** | 1 line |
| **Audio Files** | `scene-10-transition-onemorething-0.wav` |

**Voiceover Text:**
1. "We've shown you a lot. But we've saved the best for last."

---

## FEATURE 10: Real-time Collaboration
| Field | Value |
|-------|-------|
| **Scene ID** | `feature10` |
| **Time** | 2:43 - 2:48 (5s / 150 frames) |
| **Title** | Real-time Collaboration |
| **Screenshots** | `encounter-collaborate.png` |
| **Layout** | Single, snappy entrance |
| **Subtitle** | "Work Together, Live" |
| **Voiceover Lines** | 1 line |
| **Audio Files** | `scene-10-collaborate-0.wav` |

**Voiceover Text:**
1. "See your team working live in the chart—multiple providers, all in sync."

---

## FEATURE 11: Sign Anywhere
| Field | Value |
|-------|-------|
| **Scene ID** | `feature11` |
| **Time** | 2:48 - 2:53 (5s / 150 frames) |
| **Title** | Sign Anywhere |
| **Screenshots** | `encounter-sign.png` |
| **Layout** | Single, snappy entrance |
| **Subtitle** | "E-Signatures Built In" |
| **Voiceover Lines** | 1 line |
| **Audio Files** | `scene-11-sign-0.wav` |

**Voiceover Text:**
1. "Sign notes with your finger. One tap, and it's finalized."

---

## FEATURE 12: Approval Center
| Field | Value |
|-------|-------|
| **Scene ID** | `feature12` |
| **Time** | 2:53 - 2:58 (5s / 150 frames) |
| **Title** | Approval Center |
| **Screenshots** | `approval-center.png`, `approval-center-detail.png` |
| **Layout** | Crossfade, fast entrance |
| **Subtitle** | "Streamlined Reviews" |
| **Voiceover Lines** | 2 lines |
| **Audio Files** | `scene-12-approve-0.wav`, `scene-12-approve-1.wav` |

**Voiceover Text:**
1. "Review all pending changes in one place."
2. "Approve, reject, or edit—you're always in control."

---

## TRANSITION: Coming Soon
| Field | Value |
|-------|-------|
| **Scene ID** | `transition2` |
| **Time** | 2:58 - 3:01 (3s / 90 frames) |
| **Title** | Coming Soon |
| **Screenshots** | None (text-only transition with badge) |
| **Layout** | "Coming Soon" badge overlay, animated |
| **Voiceover Lines** | 1 line |
| **Audio Files** | `scene-13-transition-comingsoon-0.wav` |

**Voiceover Text:**
1. "Coming soon."

---

## FEATURE 13: Composer (Finale)
| Field | Value |
|-------|-------|
| **Scene ID** | `feature13` |
| **Time** | 3:01 - 3:18 (17s / 510 frames) |
| **Title** | Composer |
| **Screenshots** | `composer-interface.png`, `composer-natural-language.png`, `composer-diff-view.png`, `composer-document.png` |
| **Layout** | Carousel (~4s per slide) with glow effect |
| **Subtitle** | "Your AI Command Center" |
| **Badge** | "Coming Soon" overlay |
| **Voiceover Lines** | 7 lines |
| **Audio Files** | `scene-13-composer-0.wav` through `scene-13-composer-6.wav` |

**Voiceover Text:**
1. "Introducing Composer—your AI-powered command center for Vibrant Intelligence."
2. "Composer understands natural language and turns it into action."
3. "Need to write a note? Just describe the visit."
4. "Need to send a follow-up? Tell Composer what to say."
5. "Review changes with a clear diff view—accept, modify, or reject."
6. "Generate documents, update records, manage schedules—all through conversation."
7. "Composer is the future of practice management."

---

## OUTRO
| Field | Value |
|-------|-------|
| **Scene ID** | `outro` |
| **Time** | 3:18 - 3:28 (10s / 300 frames) |
| **Title** | Closing / Outro |
| **Screenshots** | None (logo + text) |
| **Layout** | Logo → tagline → CTA |
| **Voiceover Lines** | 2 lines |
| **Audio Files** | `scene-14-outro-0.wav`, `scene-14-outro-1.wav` |

**Voiceover Text:**
1. "That's Vibrant Intelligence: unified communication, instant clinical context, smart scheduling, AI-powered workflows, effortless documentation, and a practice dashboard that actually answers your questions."
2. "Built for the way you actually work."

---

## Audio File Manifest

| Audio File | Scene ID | Scene Name | Lines |
|------------|----------|------------|-------|
| `scene-00-intro-{0-2}.wav` | intro | INTRO | 3 |
| `scene-01-chat-{0-3}.wav` | feature1 | Chat + SMS + Email | 4 |
| `scene-02-health-{0-2}.wav` | feature2 | Health Tab | 3 |
| `scene-03-calendar-{0-4}.wav` | feature3 | Calendar | 5 |
| `scene-04-pegboard-{0-2}.wav` | feature4 | Peg Board | 3 |
| `scene-05-quickactions-{0-3}.wav` | feature5 | Quick Actions | 4 |
| `scene-06-notes-{0-4}.wav` | feature6 | Encounter Notes | 5 |
| `scene-07-workflows-{0-6}.wav` | feature7 | Workflow + AI | 7 |
| `scene-08-forms-{0-4}.wav` | feature8 | Form Builder | 5 |
| `scene-09-practice-{0-4}.wav` | feature9 | My Practice | 5 |
| `scene-10-transition-onemorething-0.wav` | transition1 | One More Thing | 1 |
| `scene-10-collaborate-0.wav` | feature10 | Real-time Collaboration | 1 |
| `scene-11-sign-0.wav` | feature11 | Sign Anywhere | 1 |
| `scene-12-approve-{0-1}.wav` | feature12 | Approval Center | 2 |
| `scene-13-transition-comingsoon-0.wav` | transition2 | Coming Soon | 1 |
| `scene-13-composer-{0-6}.wav` | feature13 | Composer | 7 |
| `scene-14-outro-{0-1}.wav` | outro | OUTRO | 2 |

**Total Audio Files**: 59 files

---

## Code Reference

### Voiceover Configuration File
**Location**: `vi-product-video/src/config/voiceover.ts`

This file contains:
- All audio file imports
- Scene voiceover configuration with timing
- Helper functions to get voiceovers for scenes
- `getAllVoiceoverTracks()` - returns all tracks with global timeline positions

### VoiceoverAudio Component
**Location**: `vi-product-video/src/components/VoiceoverAudio.tsx`

Helper component for rendering voiceover audio within individual scenes:
```tsx
import { VoiceoverAudio } from "./components/VoiceoverAudio";

// In a scene:
<VoiceoverAudio sceneId="intro" volume={1.0} />
```

### Video Integration
**Location**: `vi-product-video/src/Video.tsx`

Voiceover tracks are rendered at the top level using `getAllVoiceoverTracks()`:
```tsx
const voiceoverTracks = getAllVoiceoverTracks();

{voiceoverTracks.map((track, index) => (
  <Sequence key={`vo-${index}`} from={track.startFrame}>
    <Audio src={track.audio} volume={1.0} />
  </Sequence>
))}
```

---

## Maintenance Notes

### After ElevenLabs Audio Generation
1. **Actual audio duration becomes the source of truth** — update `startFrame` values in `src/config/voiceover.ts` to match
2. If audio runs longer/shorter than estimated, adjust adjacent scenes or trim visual timing
3. Audio files are saved to `src/assets/audio/` using the naming convention above

### When Editing This Video
1. Update this document first — voiceover text must match visuals
2. Re-generate affected audio files via: `node scripts/generate-voiceover.mjs`
3. Update `startFrame` values in `src/config/voiceover.ts` based on new audio lengths
4. Update scene durations in `src/Video.tsx` if needed

### Screenshot File Locations
All screenshots are stored in: `src/assets/screenshots/`

Resolution: 3840×2160 (2x Retina) — scale down to 1920×1080 for display.

---

*This document is the single source of truth for binding voiceover to visuals. Keep it in sync with the video.*
