#!/usr/bin/env node
/**
 * Generate only the new outro voiceover files
 */

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = "sk_925e941b05191b6cb4b7164c0785a8bb182a52926704a463";

const VOICE_SETTINGS = {
  voice_id: "21m00Tcm4TlvDq8ikWAM",
  model_id: "eleven_multilingual_v2",
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    use_speaker_boost: true,
  },
};

const OUTPUT_DIR = join(__dirname, "../src/assets/audio");
mkdirSync(OUTPUT_DIR, { recursive: true });

const client = new ElevenLabsClient({ apiKey: API_KEY });

const OUTRO_LINES = [
  {
    id: "outro-0",
    filename: "scene-14-outro-0",
    text: "That's Vibrant Intelligence.",
  },
  {
    id: "outro-1",
    filename: "scene-14-outro-1",
    text: "Everything you need.",
  },
];

async function generateAudio(line, index) {
  try {
    console.log(`\n[${index + 1}/${OUTRO_LINES.length}] Generating: ${line.filename}`);
    console.log(`  Text: "${line.text}"`);

    const response = await client.textToSpeech.convert(VOICE_SETTINGS.voice_id, {
      text: line.text,
      model_id: VOICE_SETTINGS.model_id,
      voice_settings: VOICE_SETTINGS.voice_settings,
      output_format: "wav_44100",
    });

    const chunks = [];
    const reader = response.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);
    const outputPath = join(OUTPUT_DIR, `${line.filename}.wav`);
    writeFileSync(outputPath, buffer);

    console.log(`  ✓ Saved to: ${line.filename}.wav (${(buffer.length / 1024).toFixed(1)} KB)`);
    return { success: true, path: outputPath, size: buffer.length };
  } catch (error) {
    console.error(`  ✗ Error:`, error.message);
    return { success: false, error: error.message };
  }
}

async function generateOutroOnly() {
  console.log("=".repeat(60));
  console.log("Generating NEW outro files only");
  console.log("=".repeat(60));

  for (let i = 0; i < OUTRO_LINES.length; i++) {
    await generateAudio(OUTRO_LINES[i], i);
  }

  console.log("\n✓ Done! Check src/assets/audio/ for scene-14-outro-0.wav and scene-14-outro-1.wav");
}

generateOutroOnly();
