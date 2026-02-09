#!/usr/bin/env node
/**
 * Get actual durations of voiceover audio files (MP3 format)
 */

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mp3Duration from "mp3-duration";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = join(__dirname, "../src/assets/audio");

async function main() {
  const files = readdirSync(AUDIO_DIR).filter(f => f.endsWith('.wav')).sort();

  console.log("Audio file durations (actual MP3 durations):");
  console.log("=".repeat(75));
  console.log("File Name".padEnd(45) + "Duration | Frames | Size (KB)");
  console.log("-".repeat(75));

  const results = [];

  for (const file of files) {
    const filePath = join(AUDIO_DIR, file);
    try {
      const buffer = readFileSync(filePath);
      const duration = await mp3Duration(buffer);
      const frames = Math.round(duration * 30); // 30fps
      const sizeKB = (buffer.length / 1024).toFixed(1);

      results.push({ file, duration, frames, sizeKB });

      console.log(`${file.padEnd(45)} ${duration.toFixed(2)}s    | ${frames.toString().padStart(4)}   | ${sizeKB.padStart(7)}`);
    } catch (e) {
      console.log(`${file.padEnd(45)} ERROR: ${e.message}`);
    }
  }

  console.log("=".repeat(75));

  // Total duration
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  console.log(`\nTotal voiceover duration: ${totalDuration.toFixed(2)}s (${Math.round(totalDuration * 30)} frames at 30fps)`);

  // Map to IDs
  const idMap = {
    "scene-00-intro-0.wav": "intro-0",
    "scene-00-intro-1.wav": "intro-1",
    "scene-00-intro-2.wav": "intro-2",
    "scene-01-chat-0.wav": "feature1-0",
    "scene-01-chat-1.wav": "feature1-1",
    "scene-01-chat-2.wav": "feature1-2",
    "scene-01-chat-3.wav": "feature1-3",
    "scene-02-health-0.wav": "feature2-0",
    "scene-02-health-1.wav": "feature2-1",
    "scene-02-health-2.wav": "feature2-2",
    "scene-03-calendar-0.wav": "feature3-0",
    "scene-03-calendar-1.wav": "feature3-1",
    "scene-03-calendar-2.wav": "feature3-2",
    "scene-03-calendar-3.wav": "feature3-3",
    "scene-03-calendar-4.wav": "feature3-4",
    "scene-04-pegboard-0.wav": "feature4-0",
    "scene-04-pegboard-1.wav": "feature4-1",
    "scene-04-pegboard-2.wav": "feature4-2",
    "scene-05-quickactions-0.wav": "feature5-0",
    "scene-05-quickactions-1.wav": "feature5-1",
    "scene-05-quickactions-2.wav": "feature5-2",
    "scene-05-quickactions-3.wav": "feature5-3",
    "scene-06-notes-0.wav": "feature6-0",
    "scene-06-notes-1.wav": "feature6-1",
    "scene-06-notes-2.wav": "feature6-2",
    "scene-06-notes-3.wav": "feature6-3",
    "scene-06-notes-4.wav": "feature6-4",
    "scene-07-workflows-0.wav": "feature7-0",
    "scene-07-workflows-1.wav": "feature7-1",
    "scene-07-workflows-2.wav": "feature7-2",
    "scene-07-workflows-3.wav": "feature7-3",
    "scene-07-workflows-4.wav": "feature7-4",
    "scene-07-workflows-5.wav": "feature7-5",
    "scene-07-workflows-6.wav": "feature7-6",
    "scene-08-forms-0.wav": "feature8-0",
    "scene-08-forms-1.wav": "feature8-1",
    "scene-08-forms-2.wav": "feature8-2",
    "scene-08-forms-3.wav": "feature8-3",
    "scene-08-forms-4.wav": "feature8-4",
    "scene-09-practice-0.wav": "feature9-0",
    "scene-09-practice-1.wav": "feature9-1",
    "scene-09-practice-2.wav": "feature9-2",
    "scene-09-practice-3.wav": "feature9-3",
    "scene-09-practice-4.wav": "feature9-4",
    "scene-10-transition-onemorething-0.wav": "transition1-0",
    "scene-10-collaborate-0.wav": "feature10-0",
    "scene-11-sign-0.wav": "feature11-0",
    "scene-12-approve-0.wav": "feature12-0",
    "scene-12-approve-1.wav": "feature12-1",
    "scene-13-transition-comingsoon-0.wav": "transition2-0",
    "scene-13-composer-0.wav": "feature13-0",
    "scene-13-composer-1.wav": "feature13-1",
    "scene-13-composer-2.wav": "feature13-2",
    "scene-13-composer-3.wav": "feature13-3",
    "scene-13-composer-4.wav": "feature13-4",
    "scene-13-composer-5.wav": "feature13-5",
    "scene-13-composer-6.wav": "feature13-6",
    "scene-14-outro-0.wav": "outro-0",
    "scene-14-outro-1.wav": "outro-1",
  };

  // Generate TypeScript config
  console.log("\n".repeat(70));
  console.log("COPY THIS INTO voiceover.ts:");
  console.log("=".repeat(70));

  let tsConfig = `  // Actual durations for each voiceover line (in frames at 30fps)\n`;
  tsConfig += `  // Measured from generated audio files\n`;
  tsConfig += `  const estimatedDurations: Record<string, number> = {\n`;

  for (const r of results) {
    const id = idMap[r.file] || r.file.replace('.wav', '');
    tsConfig += `    "${id}": ${r.frames},   // ${r.duration.toFixed(2)}s\n`;
  }

  tsConfig += `  };`;

  console.log(tsConfig);
}

main().catch(console.error);
