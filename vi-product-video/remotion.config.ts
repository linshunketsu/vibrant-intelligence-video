import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// CRITICAL FIX: Force sequential rendering to prevent flickering
// Parallel rendering can cause frame-to-frame inconsistencies in certain animations
Config.setConcurrency(1);

export default {
  sets: [
    {
      name: "VI Product Video",
      format: "mp4",
    },
  ],
};
