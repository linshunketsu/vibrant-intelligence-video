import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

export default {
  sets: [
    {
      name: "VI Product Video",
      format: "mp4",
    },
  ],
};
