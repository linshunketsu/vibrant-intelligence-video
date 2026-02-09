/**
 * VoiceoverAudio Component
 *
 * A helper component for rendering voiceover audio within individual scenes.
 * This can be used when you want scene-specific voiceover control.
 *
 * Usage:
 *   <VoiceoverAudio sceneId="intro" />
 *
 * The component will automatically render all voiceover lines for that scene
 * at their designated start frames (relative to the scene start).
 */

import React from "react";
import { Audio, Sequence } from "remotion";
import { getVoiceoverForScene } from "../config/voiceover";

interface VoiceoverAudioProps {
  sceneId: string;
  volume?: number;
}

export const VoiceoverAudio: React.FC<VoiceoverAudioProps> = ({ sceneId, volume = 1.0 }) => {
  const sceneVoiceover = getVoiceoverForScene(sceneId);

  if (!sceneVoiceover || sceneVoiceover.lines.length === 0) {
    return null;
  }

  return (
    <>
      {sceneVoiceover.lines.map((line) => (
        <Sequence key={line.id} from={line.startFrame ?? 0}>
          <Audio src={line.audio} volume={volume} />
        </Sequence>
      ))}
    </>
  );
};

/**
 * Alternative: Render a single voiceover line by ID
 */
interface VoiceoverLineProps {
  audio: string;
  startFrame?: number;
  volume?: number;
}

export const VoiceoverLine: React.FC<VoiceoverLineProps> = ({
  audio,
  startFrame = 0,
  volume = 1.0,
}) => {
  return (
    <Sequence from={startFrame}>
      <Audio src={audio} volume={volume} />
    </Sequence>
  );
};
