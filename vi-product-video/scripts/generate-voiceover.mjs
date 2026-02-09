#!/usr/bin/env node
/**
 * Voiceover Audio Generator for Vibrant Intelligence Product Video
 *
 * This script generates TTS audio files using ElevenLabs API for each scene/line
 * in the video. Audio files are saved to src/assets/audio/
 *
 * Usage: node scripts/generate-voiceover.mjs
 */

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ElevenLabs API Configuration
const API_KEY = "8bdfdfc66327a40e9bea3cc878fa9d2ea77ac74cb38971c0f3ee8dd729f97f1d";

// Voice configuration - using a professional, calm, confident voice
const VOICE_SETTINGS = {
  voice_id: "21m00Tcm4TlvDq8ikWAM", // Rachel - professional female voice
  model_id: "eleven_multilingual_v2", // High quality multilingual model
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    use_speaker_boost: true,
  },
};

// Voiceover lines mapped to scene IDs and file names
// Format: { id, filename, text }
const VOICEOVER_LINES = [
  // INTRO (0:00-0:15)
  {
    id: "intro-0",
    filename: "scene-00-intro-0",
    text: "Running a modern practice means juggling patient care, communication, scheduling, and documentation—all at once.",
  },
  {
    id: "intro-1",
    filename: "scene-00-intro-1",
    text: "What if your EHR actually helped instead of getting in the way?",
  },
  {
    id: "intro-2",
    filename: "scene-00-intro-2",
    text: "Meet Vibrant Intelligence: an AI-powered platform built for how clinics actually work.",
  },

  // FEATURE 1: Every Message, One Inbox (0:15-0:25)
  {
    id: "feature1-0",
    filename: "scene-01-chat-0",
    text: "First up: unified communication.",
  },
  {
    id: "feature1-1",
    filename: "scene-01-chat-1",
    text: "Text messages, emails, and chat—all in one interface.",
  },
  {
    id: "feature1-2",
    filename: "scene-01-chat-2",
    text: "No more switching between apps.",
  },
  {
    id: "feature1-3",
    filename: "scene-01-chat-3",
    text: "Every interaction with a patient lives in one place, so your team always has the full picture.",
  },

  // FEATURE 2: Patient Context at a Glance (0:25-0:37)
  {
    id: "feature2-0",
    filename: "scene-02-health-0",
    text: "Click the Health tab to instantly access everything about this patient: medications, allergies, vitals, labs, encounter notes, and uploaded documents.",
  },
  {
    id: "feature2-1",
    filename: "scene-02-health-1",
    text: "Dynamic variables pull data directly from your records—no hunting through multiple screens.",
  },
  {
    id: "feature2-2",
    filename: "scene-02-health-2",
    text: "Tag important items, track program progress, and keep clinical context at your fingertips.",
  },

  // FEATURE 3: Scheduling That Thinks Ahead (0:37-0:49)
  {
    id: "feature3-0",
    filename: "scene-03-calendar-0",
    text: "The Calendar gives your team a complete scheduling dashboard.",
  },
  {
    id: "feature3-1",
    filename: "scene-03-calendar-1",
    text: "Color-coded appointments across all providers, so everyone knows what's happening at a glance.",
  },
  {
    id: "feature3-2",
    filename: "scene-03-calendar-2",
    text: "For patients, we offer a self-scheduling link—like Calendly, but built right in.",
  },
  {
    id: "feature3-3",
    filename: "scene-03-calendar-3",
    text: "Plus, seamless integration with Google Calendar, Outlook, and Zoom.",
  },
  {
    id: "feature3-4",
    filename: "scene-03-calendar-4",
    text: "Appointments sync automatically, and virtual visits launch with one click.",
  },

  // FEATURE 4: Pin What Matters Most (0:49-0:57)
  {
    id: "feature4-0",
    filename: "scene-04-pegboard-0",
    text: "See this panel on the right? That's the Peg Board.",
  },
  {
    id: "feature4-1",
    filename: "scene-04-pegboard-1",
    text: "Pin any important item—a lab result, a note, an upcoming appointment—right here for quick reference.",
  },
  {
    id: "feature4-2",
    filename: "scene-04-pegboard-2",
    text: "Think of it as your personal sticky note wall for each patient.",
  },

  // FEATURE 5: Act Fast, Skip the Clicks (0:57-1:07)
  {
    id: "feature5-0",
    filename: "scene-05-quickactions-0",
    text: "Right above the message input, you'll find Quick Actions.",
  },
  {
    id: "feature5-1",
    filename: "scene-05-quickactions-1",
    text: "One click to create an order, schedule an appointment, send documents, assign a workflow, or start an encounter note.",
  },
  {
    id: "feature5-2",
    filename: "scene-05-quickactions-2",
    text: "Everything happens in context—no navigating away, no lost time.",
  },
  {
    id: "feature5-3",
    filename: "scene-05-quickactions-3",
    text: "You stay focused on the patient.",
  },

  // FEATURE 6: Notes That Write Themselves (1:07-1:32)
  {
    id: "feature6-0",
    filename: "scene-06-notes-0",
    text: "Encounter Notes are where Vibrant Intelligence really shines.",
  },
  {
    id: "feature6-1",
    filename: "scene-06-notes-1",
    text: "Had a Zoom call with your patient? The platform captures the conversation and generates a summary—ready to insert directly into your note.",
  },
  {
    id: "feature6-2",
    filename: "scene-06-notes-2",
    text: "Insert action cards to order labs, schedule follow-ups, or prescribe—all without leaving the note.",
  },
  {
    id: "feature6-3",
    filename: "scene-06-notes-3",
    text: "Use smart blocks and templates that auto-populate with patient data.",
  },
  {
    id: "feature6-4",
    filename: "scene-06-notes-4",
    text: "Documentation that actually helps you work—not slow you down.",
  },

  // FEATURE 7: Workflows That Think With You (1:32-2:02)
  {
    id: "feature7-0",
    filename: "scene-07-workflows-0",
    text: "Now let's talk about Workflows—one of the most powerful features in the platform.",
  },
  {
    id: "feature7-1",
    filename: "scene-07-workflows-1",
    text: "Build custom care pathways using pre-built component nodes: send a message, wait for a response, schedule an appointment, check a condition, and more.",
  },
  {
    id: "feature7-2",
    filename: "scene-07-workflows-2",
    text: "Configure each step to match exactly how your practice operates.",
  },
  {
    id: "feature7-3",
    filename: "scene-07-workflows-3",
    text: "But here's where it gets exciting—just describe what you need in plain English, and our AI builds the workflow for you.",
  },
  {
    id: "feature7-4",
    filename: "scene-07-workflows-4",
    text: "Once a patient is enrolled, Guardian AI monitors their progress.",
  },
  {
    id: "feature7-5",
    filename: "scene-07-workflows-5",
    text: "It handles routine exceptions automatically—and when human judgment is needed, it brings you into the loop.",
  },
  {
    id: "feature7-6",
    filename: "scene-07-workflows-6",
    text: "Automation with oversight.",
  },

  // FEATURE 8: Build Forms in Seconds (2:02-2:22)
  {
    id: "feature8-0",
    filename: "scene-08-forms-0",
    text: "Need an intake form? A questionnaire? A waiver?",
  },
  {
    id: "feature8-1",
    filename: "scene-08-forms-1",
    text: "The Form Builder has you covered.",
  },
  {
    id: "feature8-2",
    filename: "scene-08-forms-2",
    text: "Drag and drop pre-built components, or describe what you need and let AI build it for you.",
  },
  {
    id: "feature8-3",
    filename: "scene-08-forms-3",
    text: "Here's the best part: map form fields to patient records, and when patients fill something out, that data flows directly into their chart.",
  },
  {
    id: "feature8-4",
    filename: "scene-08-forms-4",
    text: "No manual entry, no copy-paste errors.",
  },

  // FEATURE 9: Your Practice, One Dashboard (2:22-2:40)
  {
    id: "feature9-0",
    filename: "scene-09-practice-0",
    text: "My Practice is your command center.",
  },
  {
    id: "feature9-1",
    filename: "scene-09-practice-1",
    text: "Customizable metrics let you track what matters most to your clinic.",
  },
  {
    id: "feature9-2",
    filename: "scene-09-practice-2",
    text: "Our sentiment analysis scans patient communications to surface potential issues before they escalate—helping you improve satisfaction and catch concerns early.",
  },
  {
    id: "feature9-3",
    filename: "scene-09-practice-3",
    text: "And if you have a question about your data? Just ask.",
  },
  {
    id: "feature9-4",
    filename: "scene-09-practice-4",
    text: 'Type a natural language query like "Show me no-show rates for the past month"—and get your answer instantly.',
  },

  // TRANSITION: One More Thing (2:40-2:43)
  {
    id: "transition1-0",
    filename: "scene-10-transition-onemorething-0",
    text: "We've shown you a lot. But we've saved the best for last.",
  },

  // FEATURE 10: Collaborate in Real Time (2:43-2:48)
  {
    id: "feature10-0",
    filename: "scene-10-collaborate-0",
    text: "See your team working live in the chart—multiple providers, all in sync.",
  },

  // FEATURE 11: Sign and Finalize (2:48-2:53)
  {
    id: "feature11-0",
    filename: "scene-11-sign-0",
    text: "Sign notes with your finger. One tap, and it's finalized.",
  },

  // FEATURE 12: Approve With Confidence (2:53-2:58)
  {
    id: "feature12-0",
    filename: "scene-12-approve-0",
    text: "Review all pending changes in one place.",
  },
  {
    id: "feature12-1",
    filename: "scene-12-approve-1",
    text: "Approve, reject, or edit—you're always in control.",
  },

  // TRANSITION: Coming Soon (2:58-3:01)
  {
    id: "transition2-0",
    filename: "scene-13-transition-comingsoon-0",
    text: "Coming soon.",
  },

  // FEATURE 13: The AI Composer (3:01-3:18)
  {
    id: "feature13-0",
    filename: "scene-13-composer-0",
    text: "Introducing Composer—your AI-powered command center for Vibrant Intelligence.",
  },
  {
    id: "feature13-1",
    filename: "scene-13-composer-1",
    text: "Composer understands natural language and turns it into action.",
  },
  {
    id: "feature13-2",
    filename: "scene-13-composer-2",
    text: "Need to write a note? Just describe the visit.",
  },
  {
    id: "feature13-3",
    filename: "scene-13-composer-3",
    text: "Need to send a follow-up? Tell Composer what to say.",
  },
  {
    id: "feature13-4",
    filename: "scene-13-composer-4",
    text: "Review changes with a clear diff view—accept, modify, or reject.",
  },
  {
    id: "feature13-5",
    filename: "scene-13-composer-5",
    text: "Generate documents, update records, manage schedules—all through conversation.",
  },
  {
    id: "feature13-6",
    filename: "scene-13-composer-6",
    text: "Composer is the future of practice management.",
  },

  // OUTRO (3:18-3:28)
  {
    id: "outro-0",
    filename: "scene-14-outro-0",
    text: "That's Vibrant Intelligence: unified communication, instant clinical context, smart scheduling, AI-powered workflows, effortless documentation, and a practice dashboard that actually answers your questions.",
  },
  {
    id: "outro-1",
    filename: "scene-14-outro-1",
    text: "Built for the way you actually work.",
  },
];

// Output directory
const OUTPUT_DIR = join(__dirname, "../src/assets/audio");

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

// Initialize ElevenLabs client
const client = new ElevenLabsClient({
  apiKey: API_KEY,
});

// Rate limiting helper
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate audio for a single line
async function generateAudio(line, index) {
  try {
    console.log(`\n[${index + 1}/${VOICEOVER_LINES.length}] Generating: ${line.filename}`);
    console.log(`  Text: "${line.text}"`);

    const response = await client.textToSpeech.convert(VOICE_SETTINGS.voice_id, {
      text: line.text,
      model_id: VOICE_SETTINGS.model_id,
      voice_settings: VOICE_SETTINGS.voice_settings,
      output_format: "wav_44100", // High quality WAV
    });

    // The response is already a ReadableStream with the audio data
    // We need to convert it to a Buffer
    const chunks = [];
    const reader = response.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    // Write to file
    const outputPath = join(OUTPUT_DIR, `${line.filename}.wav`);
    writeFileSync(outputPath, buffer);

    console.log(`  ✓ Saved to: ${line.filename}.wav (${(buffer.length / 1024).toFixed(1)} KB)`);

    return { success: true, path: outputPath, size: buffer.length };
  } catch (error) {
    console.error(`  ✗ Error generating ${line.filename}:`, error.message);
    if (error.response) {
      console.error(`     Response: ${JSON.stringify(error.response)}`);
    }
    return { success: false, error: error.message };
  }
}

// Main generation function
async function generateAllVoiceovers() {
  console.log("=".repeat(60));
  console.log("Vibrant Intelligence - Voiceover Audio Generator");
  console.log("=".repeat(60));
  console.log(`Total lines to generate: ${VOICEOVER_LINES.length}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Voice: Rachel (21m00Tcm4TlvDq8ikWAM)`);
  console.log(`Model: ${VOICE_SETTINGS.model_id}`);
  console.log("=".repeat(60));

  const results = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < VOICEOVER_LINES.length; i++) {
    const result = await generateAudio(VOICEOVER_LINES[i], i);

    if (result.success) {
      results.success.push({ line: VOICEOVER_LINES[i], ...result });
    } else {
      results.failed.push({ line: VOICEOVER_LINES[i], ...result });
    }

    // Rate limiting - wait a bit between requests to avoid hitting rate limits
    if (i < VOICEOVER_LINES.length - 1) {
      await delay(500); // 500ms delay between requests
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("GENERATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`✓ Success: ${results.success.length}/${VOICEOVER_LINES.length}`);
  console.log(`✗ Failed: ${results.failed.length}/${VOICEOVER_LINES.length}`);

  if (results.failed.length > 0) {
    console.log("\nFailed files:");
    results.failed.forEach((f) => {
      console.log(`  - ${f.line.filename}: ${f.error}`);
    });
  }

  const totalSize = results.success.reduce((sum, r) => sum + r.size, 0);
  console.log(`\nTotal audio size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log("=".repeat(60));

  return results;
}

// Run the generator
generateAllVoiceovers().then((results) => {
  if (results.failed.length > 0) {
    process.exit(1);
  }
  console.log("\n✓ All voiceover files generated successfully!");
});
